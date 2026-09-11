using System.Diagnostics;
using System.Runtime.InteropServices;

namespace TetrioEsPatcher.Core;

public sealed record ElevationResult(bool Ok, string Message);

/// <summary>Relanza este ejecutable con permisos elevados para hacer una acción concreta.</summary>
public static class Elevation
{
    /// <summary>
    /// Lanza <c>--worker --action &lt;apply|restore&gt; --asar &lt;ruta&gt;</c> con permisos de
    /// administrador y espera a que termine. Devuelve el resultado que escribe el worker.
    /// </summary>
    public static async Task<ElevationResult> RunElevatedAsync(string action, string asarPath)
    {
        var exe = Environment.ProcessPath
                  ?? throw new InvalidOperationException("No se pudo determinar la ruta del ejecutable.");
        var resultFile = Path.Combine(Path.GetTempPath(), "tetrio-es-patcher-result.json");
        if (File.Exists(resultFile)) File.Delete(resultFile);

        var args = new[] { "--worker", "--action", action, "--asar", asarPath, "--result", resultFile };

        try
        {
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                var psi = new ProcessStartInfo(exe) { UseShellExecute = true, Verb = "runas" };
                foreach (var a in args) psi.ArgumentList.Add(a);
                using var p = Process.Start(psi)!;
                await p.WaitForExitAsync();
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
            {
                string Q(string s) => "'" + s.Replace("'", "'\\''") + "'";
                var inner = string.Join(' ', new[] { exe }.Concat(args).Select(Q)) + " 2>&1";
                var script =
                    $"do shell script \"{inner.Replace("\\", "\\\\").Replace("\"", "\\\"")}\" " +
                    "with administrator privileges " +
                    "with prompt \"tetrio-es-patcher necesita permiso para modificar TETR.IO\"";
                var psi = new ProcessStartInfo("osascript") { RedirectStandardError = true, RedirectStandardOutput = true };
                psi.ArgumentList.Add("-e");
                psi.ArgumentList.Add(script);
                using var p = Process.Start(psi)!;
                string err = await p.StandardError.ReadToEndAsync();
                await p.WaitForExitAsync();
                if (p.ExitCode != 0 && (err.Contains("-128") || err.Contains("User canceled")))
                    return new ElevationResult(false, "Cancelaste la solicitud de contraseña.");
            }
            else
            {
                var runner = new[] { "pkexec", "sudo" }.FirstOrDefault(WhichExists);
                if (runner == null)
                    return new ElevationResult(false, "Instala pkexec o ejecútalo con sudo desde una terminal.");
                var psi = new ProcessStartInfo(runner);
                psi.ArgumentList.Add(exe);
                foreach (var a in args) psi.ArgumentList.Add(a);
                using var p = Process.Start(psi)!;
                await p.WaitForExitAsync();
                if (p.ExitCode != 0)
                    return new ElevationResult(false, "No se concedieron los permisos.");
            }
        }
        catch (Exception ex) when (IsCancel(ex))
        {
            return new ElevationResult(false, "Cancelaste la solicitud de permisos.");
        }
        catch (Exception ex)
        {
            return new ElevationResult(false, ex.Message);
        }

        if (File.Exists(resultFile))
        {
            try
            {
                var doc = System.Text.Json.JsonDocument.Parse(File.ReadAllText(resultFile));
                bool ok = doc.RootElement.GetProperty("ok").GetBoolean();
                string msg = doc.RootElement.TryGetProperty("message", out var m) ? m.GetString() ?? "" : "";
                return new ElevationResult(ok, msg);
            }
            catch
            {
                /* cae abajo */
            }
        }
        return new ElevationResult(false, "El proceso con permisos no devolvió un resultado.");
    }

    private static bool IsCancel(Exception ex)
    {
        var s = ex.Message.ToLowerInvariant();
        return s.Contains("cancel") || s.Contains("denied") ||
               (ex is System.ComponentModel.Win32Exception w && w.NativeErrorCode == 1223); // ERROR_CANCELLED
    }

    private static bool WhichExists(string cmd)
    {
        try
        {
            var psi = new ProcessStartInfo("/bin/sh") { RedirectStandardOutput = true };
            psi.ArgumentList.Add("-c");
            psi.ArgumentList.Add("command -v " + cmd);
            using var p = Process.Start(psi)!;
            p.WaitForExit();
            return p.ExitCode == 0;
        }
        catch
        {
            return false;
        }
    }
}
