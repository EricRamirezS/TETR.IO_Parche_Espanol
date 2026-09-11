using System.Text;
using System.Text.Json;
using System.Threading;

namespace TetrioEsPatcher.Core;

public enum InstallState { Unknown, Stock, Patched }

public sealed record InstallInfo(
    string AsarPath,
    string ResourcesDir,
    string InstallDir,
    string? Version,
    InstallState State,
    bool IsTetrio,
    bool BackupExists,
    bool NeedsElevation);

/// <summary>
/// Aplica / deshace la traducción sobre el app.asar de TETR.IO.
/// Portado de la versión Node (legacy/src/patch.js).
/// </summary>
public static class Patcher
{
    public delegate void Log(string line);

    private static string BackupPath(string asarPath) =>
        Path.Combine(Path.GetDirectoryName(asarPath)!, "app.original.asar");

    // ------------------------------------------------------------------ inspect

    public static InstallInfo Inspect(string asarPath)
    {
        var resDir = Path.GetDirectoryName(asarPath)!;
        var installDir = Path.GetDirectoryName(resDir) ?? resDir;
        string? version = null;
        bool isTetrio = false;
        var state = InstallState.Unknown;

        try
        {
            using var r = Asar.Open(asarPath);
            var pkgBytes = r.ReadFile("package.json");
            using var doc = JsonDocument.Parse(pkgBytes);
            isTetrio = doc.RootElement.TryGetProperty("name", out var n) && n.GetString() == "tetrio-desktop";
            if (doc.RootElement.TryGetProperty("version", out var v)) version = v.GetString();

            var preload = Encoding.UTF8.GetString(r.ReadFile("preload.js"));
            state = preload.Contains(PatchAssets.Sentinel) ? InstallState.Patched : InstallState.Stock;
        }
        catch
        {
            // se queda como Unknown
        }

        return new InstallInfo(
            asarPath, resDir, installDir, version, state, isTetrio,
            File.Exists(BackupPath(asarPath)),
            NeedsElevation: !CanWrite(resDir));
    }

    public static bool CanWrite(string dir)
    {
        var probe = Path.Combine(dir, ".tetrio-es-write-test-" + Environment.ProcessId);
        try
        {
            File.WriteAllText(probe, "x");
            File.Delete(probe);
            return true;
        }
        catch
        {
            return false;
        }
    }

    // -------------------------------------------------------------------- apply

    public static void Apply(string asarPath, Log log)
    {
        var resDir = Path.GetDirectoryName(asarPath)!;
        var backup = BackupPath(asarPath);
        var unpackedDir = asarPath + ".unpacked";
        var backupUnpacked = backup + ".unpacked";

        EnsureTetrioClosed(Path.GetDirectoryName(resDir) ?? resDir, log);

        using (var r = Asar.Open(asarPath))
        {
            var pkg = JsonDocument.Parse(r.ReadFile("package.json"));
            if (!(pkg.RootElement.TryGetProperty("name", out var n) && n.GetString() == "tetrio-desktop"))
                throw new InvalidOperationException("Ese app.asar no parece de TETR.IO.");
            if (Asar.UnpackedEntries(r.Header).Count > 0 && !Directory.Exists(unpackedDir))
                throw new InvalidOperationException(
                    $"Falta la carpeta \"{Path.GetFileName(unpackedDir)}\". La instalación parece incompleta; reinstala TETR.IO.");
        }

        string liveVersion = ReadVersion(asarPath) ?? "";
        string livePreload = ReadPreload(asarPath);
        var (liveStock, liveWasPatched) = StockPortion(livePreload);

        // ¿La copia de seguridad existente sirve como base limpia?
        bool backupExists = File.Exists(backup);
        string? backupVersion = backupExists ? ReadVersion(backup) : null;
        bool backupStale = backupExists && !liveWasPatched && backupVersion != null &&
                           liveVersion.Length > 0 && backupVersion != liveVersion;
        bool writeBackup = !backupExists || backupStale;

        // Aísla el preload.js propio de TETR.IO.
        string stockText;
        if (backupExists && !backupStale)
        {
            var backupPreload = ReadPreload(backup);
            stockText = StockPortion(backupPreload).stock;
        }
        else
        {
            stockText = liveStock;
        }

        if (ContainsInjection(stockText, PatchAssets.Translation))
            throw new InvalidOperationException(
                "No se pudo aislar el preload.js propio de TETR.IO: ya contiene una traducción\n" +
                "inyectada sin línea divisoria (¿un parche hecho a mano?).\n" +
                "Solución: reinstala TETR.IO (o usa \"Deshacer\") y vuelve a aplicar la traducción.");

        // Copia de seguridad (una vez, coherente con su .unpacked).
        if (writeBackup)
        {
            CopyWithRetry(asarPath, backup);
            if (Directory.Exists(backupUnpacked)) Directory.Delete(backupUnpacked, true);
            log(backupExists ? $"Copia de seguridad actualizada ({backupVersion} → {liveVersion})."
                             : "Copia de seguridad creada: app.original.asar");
        }
        else
        {
            log($"Copia de seguridad ya presente (v{backupVersion ?? "?"}).");
        }
        if (Directory.Exists(unpackedDir) && !Directory.Exists(backupUnpacked))
        {
            Asar.CopyDir(unpackedDir, backupUnpacked);
        }

        var injected = TrimEnd(stockText) + "\n\n\n" + PatchAssets.Banner + "\n" + PatchAssets.Translation;
        var injectedBytes = Encoding.UTF8.GetBytes(injected);
        log($"preload.js: {Encoding.UTF8.GetByteCount(stockText)} B (original) + {Encoding.UTF8.GetByteCount(PatchAssets.Translation)} B (traducción)");

        log("Reconstruyendo app.asar…");
        var staged = Path.Combine(resDir, ".app.asar.staged");
        SafeDelete(staged);
        if (Directory.Exists(staged + ".unpacked")) Directory.Delete(staged + ".unpacked", true);

        // La base define el diseño (qué va "unpacked"): la copia pristina si la
        // tenemos, si no el propio app.asar. Los archivos "unpacked" reales se
        // toman de la carpeta .unpacked del app.asar en vivo.
        var baseAsar = (File.Exists(backup) && !backupStale) ? backup : asarPath;
        Asar.RewriteSingleFile(baseAsar, "preload.js", injectedBytes, staged,
            unpackedSourceDir: Directory.Exists(unpackedDir) ? unpackedDir : null);
        SwapIntoPlace(staged, asarPath, unpackedDir);
        log("Hecho.");
    }

    // ------------------------------------------------------------------ restore

    public static void Restore(string asarPath, Log log)
    {
        var backup = BackupPath(asarPath);
        var unpackedDir = asarPath + ".unpacked";
        var backupUnpacked = backup + ".unpacked";
        var resDir = Path.GetDirectoryName(asarPath)!;

        EnsureTetrioClosed(Path.GetDirectoryName(resDir) ?? resDir, log);

        string livePreload = ReadPreload(asarPath);
        var (stock, wasPatched) = StockPortion(livePreload);

        if (File.Exists(backup))
        {
            string? bv = ReadVersion(backup);
            string lv = ReadVersion(asarPath) ?? "";
            if (bv == null || lv.Length == 0 || bv == lv)
            {
                CopyWithRetry(backup, asarPath);
                if (Directory.Exists(backupUnpacked))
                {
                    if (Directory.Exists(unpackedDir)) Directory.Delete(unpackedDir, true);
                    Asar.CopyDir(backupUnpacked, unpackedDir);
                }
                log("Restaurado desde app.original.asar.");
                return;
            }
            log($"La copia de seguridad es de otra versión ({bv}); quitando el bloque inyectado…");
        }

        if (!wasPatched)
        {
            log("TETR.IO ya está en su idioma original; no hay nada que deshacer.");
            return;
        }

        var staged = Path.Combine(resDir, ".app.asar.staged");
        SafeDelete(staged);
        if (Directory.Exists(staged + ".unpacked")) Directory.Delete(staged + ".unpacked", true);

        Asar.RewriteSingleFile(asarPath, "preload.js",
            Encoding.UTF8.GetBytes(TrimEnd(stock) + "\n"), staged,
            unpackedSourceDir: Directory.Exists(unpackedDir) ? unpackedDir : null);
        SwapIntoPlace(staged, asarPath, unpackedDir);
        log("Parche quitado; TETR.IO vuelve al idioma original.");
    }

    // ------------------------------------------------------------------ helpers

    public static (string stock, bool wasPatched) StockPortion(string preload)
    {
        var lines = preload.Replace("\r\n", "\n").Split('\n');
        int idx = Array.FindIndex(lines, l => l.Contains(PatchAssets.Sentinel));
        if (idx < 0) return (preload, false);
        return (TrimEnd(string.Join("\n", lines.Take(idx))), true);
    }

    /// <summary>True si <paramref name="candidate"/> ya contiene trozos textuales de la traducción.</summary>
    public static bool ContainsInjection(string candidate, string translation)
    {
        string Norm(string s) => string.Join(" ", s.Split((char[]?)null, StringSplitOptions.RemoveEmptyEntries));
        var hay = Norm(candidate);
        var t = Norm(translation);
        foreach (var frac in new[] { 0.15, 0.5, 0.85 })
        {
            int start = (int)(t.Length * frac);
            int len = Math.Min(240, t.Length - start);
            if (len > 120 && hay.Contains(t.Substring(start, len))) return true;
        }
        return false;
    }

    private static string TrimEnd(string s) => s.TrimEnd(' ', '\t', '\r', '\n');

    private static string ReadPreload(string asarPath)
    {
        using var r = Asar.Open(asarPath);
        return Encoding.UTF8.GetString(r.ReadFile("preload.js"));
    }

    private static string? ReadVersion(string asarPath)
    {
        try
        {
            using var r = Asar.Open(asarPath);
            using var doc = JsonDocument.Parse(r.ReadFile("package.json"));
            return doc.RootElement.TryGetProperty("version", out var v) ? v.GetString() : null;
        }
        catch
        {
            return null;
        }
    }

    /// <summary>
    /// Detecta si TETR.IO sigue en ejecución (bloquearía app.asar) y lo cierra.
    /// Primero con delicadeza, luego a la fuerza si no responde.
    /// </summary>
    private static void EnsureTetrioClosed(string installDir, Log log)
    {
        var running = TetrioProcess.FindRunning(installDir);
        if (running.Count == 0) return;

        log($"TETR.IO está abierto ({running.Count} proceso(s)); cerrándolo…");
        bool closed = TetrioProcess.TryCloseAllAsync(running).GetAwaiter().GetResult();
        if (!closed)
        {
            throw new InvalidOperationException(
                "No se pudo cerrar TETR.IO automáticamente. Ciérralo manualmente (revisa también el " +
                "Administrador de tareas en Windows, o el Monitor de Actividad en macOS) y vuelve a intentarlo.");
        }
        log("TETR.IO cerrado.");
        Thread.Sleep(400); // deja que el sistema operativo libere los archivos
    }

    private static void SafeDelete(string path)
    {
        if (File.Exists(path)) File.Delete(path);
    }

    /// <summary>
    /// Copia reintentando unos segundos: un antivirus puede tener el archivo recién
    /// escrito bloqueado un instante, o TETR.IO puede tardar en soltarlo tras cerrarse.
    /// Si sigue bloqueado, lanza un error explicando qué hacer.
    /// </summary>
    private static void CopyWithRetry(string src, string dst, int attempts = 10, int delayMs = 300)
    {
        for (int i = 1; i <= attempts; i++)
        {
            try
            {
                File.Copy(src, dst, true);
                return;
            }
            catch (IOException) when (i < attempts)
            {
                Thread.Sleep(delayMs);
            }
            catch (IOException ex)
            {
                throw new IOException(
                    $"No se pudo escribir \"{Path.GetFileName(dst)}\" porque otro programa lo tiene abierto.\n" +
                    "Cierra TETR.IO por completo (revisa también el Administrador de tareas / la bandeja " +
                    "del sistema) y vuelve a intentarlo.\n" +
                    $"Detalle: {ex.Message}", ex);
            }
            catch (UnauthorizedAccessException ex)
            {
                // En Windows, "acceso denegado" al sobrescribir suele ser el mismo caso
                // (archivo bloqueado) disfrazado de otro tipo de excepción.
                if (i == attempts)
                    throw new IOException(
                        $"No se pudo escribir \"{Path.GetFileName(dst)}\" (acceso denegado). " +
                        "Cierra TETR.IO por completo y vuelve a intentarlo.", ex);
                Thread.Sleep(delayMs);
            }
        }
    }

    private static void SwapIntoPlace(string stagedAsar, string targetAsar, string targetUnpacked)
    {
        CopyWithRetry(stagedAsar, targetAsar);
        File.Delete(stagedAsar);

        var stagedUnpacked = stagedAsar + ".unpacked";
        if (Directory.Exists(stagedUnpacked))
        {
            if (Directory.Exists(targetUnpacked)) Directory.Delete(targetUnpacked, true);
            Asar.CopyDir(stagedUnpacked, targetUnpacked);
            Directory.Delete(stagedUnpacked, true);
        }
    }
}
