using System.Text.Json;
using Avalonia;
using TetrioEsPatcher.Core;

namespace TetrioEsPatcher;

internal sealed class CliOptions
{
    public bool Worker;
    public string Action = "apply"; // apply | restore
    public string? Asar;
    public string? ResultFile;
}

internal static class Program
{
    [STAThread]
    public static int Main(string[] args)
    {
        var o = Parse(args);
        return o.Worker ? RunWorker(o) : RunGui(args);
    }

    private static int RunGui(string[] args)
    {
        BuildAvaloniaApp().StartWithClassicDesktopLifetime(args);
        return 0;
    }

    public static AppBuilder BuildAvaloniaApp() =>
        AppBuilder.Configure<App>()
            .UsePlatformDetect()
            .WithInterFont()
            .LogToTrace();

    // Modo interno: lo lanza la instancia con permisos elevados. Sin interfaz.
    private static int RunWorker(CliOptions o)
    {
        bool ok;
        string message;
        try
        {
            if (string.IsNullOrEmpty(o.Asar) || !File.Exists(o.Asar))
                throw new FileNotFoundException("No se encontró app.asar: " + o.Asar);

            void L(string s) => Console.WriteLine(s);
            if (o.Action == "restore") Patcher.Restore(o.Asar, L);
            else Patcher.Apply(o.Asar, L);

            ok = true;
            message = o.Action == "restore"
                ? "TETR.IO volvió a su idioma original."
                : "¡Traducción aplicada!";
        }
        catch (Exception ex)
        {
            ok = false;
            message = ex.Message;
            Console.Error.WriteLine(ex);
        }

        if (o.ResultFile != null)
        {
            try { File.WriteAllText(o.ResultFile, JsonSerializer.Serialize(new { ok, message })); }
            catch { /* ignora */ }
        }
        return ok ? 0 : 1;
    }

    private static CliOptions Parse(string[] args)
    {
        var o = new CliOptions();
        for (int i = 0; i < args.Length; i++)
        {
            switch (args[i])
            {
                case "--worker": o.Worker = true; break;
                case "--action" when i + 1 < args.Length: o.Action = args[++i]; break;
                case "--asar" when i + 1 < args.Length: o.Asar = args[++i]; break;
                case "--result" when i + 1 < args.Length: o.ResultFile = args[++i]; break;
            }
        }
        return o;
    }
}
