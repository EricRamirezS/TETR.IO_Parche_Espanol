using System.Runtime.InteropServices;

namespace TetrioEsPatcher.Core;

/// <summary>Encuentra el <c>app.asar</c> de TETR.IO.</summary>
public static class Locator
{
    /// <summary>Rutas candidatas, en orden de preferencia. La primera que exista gana.</summary>
    public static IReadOnlyList<string> Candidates()
    {
        var list = new List<string>();

        // 1) Junto al propio ejecutable (lo ideal: copiarlo a la carpeta de TETR.IO).
        var exeDir = Path.GetDirectoryName(Environment.ProcessPath ?? "") ?? "";
        if (exeDir.Length > 0)
        {
            list.Add(Path.Combine(exeDir, "resources", "app.asar"));
            list.Add(Path.Combine(exeDir, "app.asar"));
            list.Add(Path.Combine(exeDir, "Contents", "Resources", "app.asar"));
            list.Add(Path.Combine(exeDir, "..", "Resources", "app.asar"));
            list.Add(Path.Combine(exeDir, "TETR.IO.app", "Contents", "Resources", "app.asar"));
        }

        var home = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);

        if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
        {
            foreach (var b in new[]
                     {
                         Environment.GetEnvironmentVariable("LOCALAPPDATA"),
                         Environment.GetEnvironmentVariable("ProgramFiles"),
                         Environment.GetEnvironmentVariable("ProgramFiles(x86)"),
                     })
            {
                if (!string.IsNullOrEmpty(b))
                {
                    list.Add(Path.Combine(b, "Programs", "tetrio-desktop", "resources", "app.asar"));
                    list.Add(Path.Combine(b, "tetrio-desktop", "resources", "app.asar"));
                }
            }
        }
        else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
        {
            list.Add("/Applications/TETR.IO.app/Contents/Resources/app.asar");
            list.Add(Path.Combine(home, "Applications/TETR.IO.app/Contents/Resources/app.asar"));
        }
        else
        {
            list.Add("/opt/TETR.IO/resources/app.asar");
            list.Add("/opt/tetrio-desktop/resources/app.asar");
            list.Add("/usr/lib/tetrio-desktop/resources/app.asar");
            list.Add("/usr/lib64/tetrio-desktop/resources/app.asar");
            list.Add("/usr/share/tetrio-desktop/resources/app.asar");
            list.Add(Path.Combine(home, ".local/share/tetrio-desktop/resources/app.asar"));
        }

        return list.Select(Path.GetFullPath).Distinct().ToList();
    }

    /// <summary>Devuelve la ruta a app.asar o null si no se encontró automáticamente.</summary>
    public static string? AutoDetect() => Candidates().FirstOrDefault(File.Exists);

    /// <summary>
    /// Resuelve una ruta indicada por el usuario: acepta el propio app.asar, la
    /// carpeta resources, la raíz de la instalación o un bundle .app de macOS.
    /// </summary>
    public static string ResolveUserPath(string input)
    {
        var p = Path.GetFullPath(input.Trim().Trim('"', '\''));

        if (File.Exists(p))
            return p;

        if (Directory.Exists(p))
        {
            foreach (var candidate in new[]
                     {
                         Path.Combine(p, "app.asar"),
                         Path.Combine(p, "resources", "app.asar"),
                         Path.Combine(p, "Contents", "Resources", "app.asar"),
                     })
            {
                if (File.Exists(candidate)) return candidate;
            }
            throw new FileNotFoundException($"No se encontró app.asar dentro de:\n{p}");
        }

        throw new FileNotFoundException($"No existe la ruta:\n{p}");
    }
}
