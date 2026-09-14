using System.Reflection;
using System.Text;

namespace TetrioEsPatcher.Core;

/// <summary>La traducción incrustada y las constantes del parche. <c>Assets/translation.js</c> contiene SOLO el código inyectado, nada de TETR.IO.</summary>
public static class PatchAssets
{
    /// <summary>Marca única que delimita el bloque inyectado dentro de preload.js.</summary>
    public const string Sentinel = "TETRIO-ES-PATCH:INJECT-BOUNDARY";

    public static string Version { get; } =
        (Assembly.GetExecutingAssembly().GetName().Version ?? new Version(1, 0, 0))
        .ToString(3);

    private static string? _translation;

    /// <summary>El código de traducción (Assets/translation.js incrustado).</summary>
    public static string Translation
    {
        get
        {
            if (_translation != null) return _translation;
            var asm = Assembly.GetExecutingAssembly();
            using var s = asm.GetManifestResourceStream("translation.js")
                          ?? throw new InvalidOperationException("Recurso 'translation.js' no incrustado.");
            using var r = new StreamReader(s, Encoding.UTF8);
            return _translation = r.ReadToEnd();
        }
    }

    /// <summary>Líneas de comentario que separan el preload original de la traducción.</summary>
    public static string Banner =>
        $"// ===== {Sentinel} v{Version} =====\n" +
        "// Todo lo que está por encima de esta línea es el preload.js propio de TETR.IO, sin tocar.\n" +
        "// Todo lo que está por debajo es la traducción al español de la comunidad (tetrio-es-patcher).\n";
}
