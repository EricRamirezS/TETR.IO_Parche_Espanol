using Avalonia.Controls;
using Avalonia.Platform.Storage;
using Avalonia.Threading;
using TetrioEsPatcher.Core;

namespace TetrioEsPatcher.Views;

public partial class MainWindow : Window
{
    private string? _asarPath;
    private InstallInfo? _info;
    private bool _busy;

    public MainWindow()
    {
        InitializeComponent();

        Subtitle.Text = $"Asistente · v{PatchAssets.Version}";
        ChangeFolderBtn.Click += async (_, _) => await PickFolder();
        ApplyBtn.Click += async (_, _) => await RunAction("apply");
        RestoreBtn.Click += async (_, _) => await RunAction("restore");
        CloseBtn.Click += (_, _) => Close();
        BackBtn.Click += (_, _) => { ShowStep(1); Refresh(); };

        Opened += (_, _) =>
        {
            _asarPath = Locator.AutoDetect();
            Refresh();
        };
    }

    // --------------------------------------------------------------- navegación

    private void ShowStep(int n)
    {
        Step1.IsVisible = n == 1;
        Step2.IsVisible = n == 2;
        Step3.IsVisible = n == 3;
    }

    private void Refresh()
    {
        if (_asarPath == null || !File.Exists(_asarPath))
        {
            _info = null;
            PathText.Text = "No se encontró TETR.IO en las ubicaciones habituales.";
            StateText.Text = "";
            ActionButtons.IsVisible = false;
            NotFoundHelp.IsVisible = true;
            NotFoundHelp.Text =
                "Pulsa «Cambiar carpeta…» y elige la carpeta de TETR.IO (o su subcarpeta " +
                "«resources», donde está el archivo app.asar).\n\n" +
                (OperatingSystem.IsWindows()
                    ? "Para encontrarla: clic derecho en el acceso directo de TETR.IO → «Abrir ubicación del archivo»."
                    : OperatingSystem.IsMacOS()
                        ? "En Aplicaciones, clic derecho en TETR.IO → «Mostrar contenido del paquete» → Contents/Resources."
                        : "Suele estar en /opt/TETR.IO/resources/ o /usr/lib/tetrio-desktop/resources/.");
            return;
        }

        _info = Patcher.Inspect(_asarPath);
        NotFoundHelp.IsVisible = false;
        ActionButtons.IsVisible = true;
        PathText.Text = _info.InstallDir;

        if (!_info.IsTetrio)
        {
            StateText.Text = "⚠ Ese app.asar no parece ser de TETR.IO.";
            ApplyBtn.IsEnabled = false;
            RestoreBtn.IsEnabled = false;
            return;
        }

        StateText.Text = _info.State switch
        {
            InstallState.Patched => $"Estado:  en español (parche aplicado){VersionSuffix()}",
            InstallState.Stock => $"Estado:  en inglés (original){VersionSuffix()}",
            _ => "Estado:  desconocido",
        };
        ApplyBtn.IsEnabled = true;
        ApplyBtn.Content = _info.State == InstallState.Patched
            ? "Actualizar la traducción al español"
            : "Aplicar la traducción al español";
        RestoreBtn.IsEnabled = _info.State == InstallState.Patched || _info.BackupExists;

        string VersionSuffix() => _info.Version != null ? $"  ·  TETR.IO {_info.Version}" : "";
    }

    private async Task PickFolder()
    {
        var folders = await StorageProvider.OpenFolderPickerAsync(new FolderPickerOpenOptions
        {
            Title = "Elige la carpeta de TETR.IO",
            AllowMultiple = false,
        });
        var picked = folders.Count > 0 ? folders[0].TryGetLocalPath() : null;
        if (picked == null) return;

        try
        {
            _asarPath = Locator.ResolveUserPath(picked);
        }
        catch (Exception ex)
        {
            _asarPath = null;
            _info = null;
            Refresh();
            NotFoundHelp.IsVisible = true;
            NotFoundHelp.Text = ex.Message + "\n\nElige la carpeta que contiene «resources» (o el propio app.asar).";
            return;
        }
        Refresh();
    }

    // --------------------------------------------------------------- ejecución

    private async Task RunAction(string action)
    {
        if (_busy || _asarPath == null) return;
        _busy = true;

        ProgressTitle.Text = action == "restore" ? "Deshaciendo el parche…" : "Aplicando la traducción…";
        LogText.Text = "";
        ShowStep(2);

        bool ok;
        string message;
        string detail = "";

        try
        {
            var info = Patcher.Inspect(_asarPath);
            if (info.NeedsElevation)
            {
                AppendLog("Se necesitan permisos de administrador.");
                AppendLog(OperatingSystem.IsWindows()
                    ? "Acepta la ventana de Control de cuentas de usuario…"
                    : "Escribe tu contraseña en el diálogo del sistema…");
                var r = await Elevation.RunElevatedAsync(action, _asarPath);
                ok = r.Ok;
                message = r.Ok
                    ? (action == "restore" ? "TETR.IO volvió a su idioma original." : "¡Traducción aplicada!")
                    : "No se pudo completar.";
                detail = r.Message;
                if (r.Message.Length > 0) AppendLog(r.Message);
            }
            else
            {
                await Task.Run(() =>
                {
                    void L(string s) => Dispatcher.UIThread.Post(() => AppendLog(s));
                    if (action == "restore") Patcher.Restore(_asarPath!, L);
                    else Patcher.Apply(_asarPath!, L);
                });
                ok = true;
                message = action == "restore" ? "TETR.IO volvió a su idioma original." : "¡Traducción aplicada!";
            }
        }
        catch (Exception ex)
        {
            ok = false;
            message = "No se pudo completar.";
            detail = ex.Message;
            AppendLog("");
            AppendLog("ERROR: " + ex.Message);
        }

        ResultIcon.Text = ok ? "✓" : "✕";
        ResultText.Text = ok
            ? message + (action == "restore" ? "" : "\nAbre TETR.IO para verlo.")
            : message;
        ResultDetail.Text = detail;
        ResultDetail.IsVisible = !ok && detail.Length > 0;
        BackBtn.IsVisible = !ok;
        ShowStep(3);
        _busy = false;
    }

    private void AppendLog(string line)
    {
        LogText.Text += (LogText.Text!.Length == 0 ? "" : "\n") + line;
        LogScroll.ScrollToEnd();
    }
}
