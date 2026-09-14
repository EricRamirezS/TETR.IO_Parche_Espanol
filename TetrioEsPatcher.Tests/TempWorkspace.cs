namespace TetrioEsPatcher.Tests;

/// <summary>Directorio temporal que se borra solo al terminar el test.</summary>
internal sealed class TempWorkspace : IDisposable
{
    public string Path { get; }

    public TempWorkspace()
    {
        Path = Directory.CreateTempSubdirectory("tetrio-es-patcher-tests-").FullName;
    }

    public string Combine(params string[] parts) =>
        System.IO.Path.Combine(new[] { Path }.Concat(parts).ToArray());

    public void Dispose()
    {
        try { Directory.Delete(Path, recursive: true); } catch { /* best effort */ }
    }
}
