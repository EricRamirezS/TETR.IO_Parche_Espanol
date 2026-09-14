using System.Diagnostics;

namespace TetrioEsPatcher.Core;

/// <summary>Detecta y cierra procesos de TETR.IO que puedan tener app.asar abierto.</summary>
public static class TetrioProcess
{
    /// <summary>Procesos que parecen ser de TETR.IO, por nombre o por correr desde la carpeta de instalación.</summary>
    public static List<Process> FindRunning(string? installDir)
    {
        var self = Environment.ProcessId;
        var root = installDir != null ? Path.GetFullPath(installDir) : null;
        var matches = new List<Process>();

        foreach (var p in Process.GetProcesses())
        {
            if (p.Id == self)
            {
                p.Dispose();
                continue;
            }

            bool match = p.ProcessName.Contains("tetr", StringComparison.OrdinalIgnoreCase);
            if (!match && root != null)
            {
                var path = SafeMainModulePath(p);
                match = path != null && Path.GetFullPath(path).StartsWith(root, StringComparison.OrdinalIgnoreCase);
            }

            if (match) matches.Add(p);
            else p.Dispose();
        }
        return matches;
    }

    private static string? SafeMainModulePath(Process p)
    {
        try { return p.MainModule?.FileName; }
        catch { return null; } // procesos de otros usuarios / sistema: sin acceso, se ignoran
    }

    /// <summary>Cierra los procesos indicados: primero con delicadeza, después a la fuerza.</summary>
    public static async Task<bool> TryCloseAllAsync(IReadOnlyList<Process> procs, int timeoutMs = 4000)
    {
        foreach (var p in procs)
        {
            try { p.CloseMainWindow(); } catch { /* puede no tener ventana */ }
        }

        var deadline = Environment.TickCount64 + timeoutMs;
        while (Environment.TickCount64 < deadline && procs.Any(p => !SafeHasExited(p)))
            await Task.Delay(200);

        bool allClosed = true;
        foreach (var p in procs)
        {
            if (!SafeHasExited(p))
            {
                try
                {
                    p.Kill(entireProcessTree: true);
                    p.WaitForExit(2000);
                }
                catch { /* ya habrá terminado, o sin permiso */ }
            }
            if (!SafeHasExited(p)) allClosed = false;
            p.Dispose();
        }
        return allClosed;
    }

    private static bool SafeHasExited(Process p)
    {
        try { return p.HasExited; }
        catch { return true; }
    }
}
