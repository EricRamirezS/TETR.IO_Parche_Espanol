using System.Buffers.Binary;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace TetrioEsPatcher.Core;

/// <summary>
/// Lector / reescritor mínimo del formato ".asar" de Electron.
///
/// Formato:
///   [Pickle tamaño: uint32(4) | uint32(largoCabecera)]        (8 bytes)
///   [Pickle cabecera: uint32(payload) | uint32(largoJson) | json UTF-8 | padding a 4]
///   [cuerpos de archivos concatenados, sin alineación entre ellos]
/// Los "offset" del JSON son decimales (string) relativos al fin de la cabecera.
/// </summary>
public static class Asar
{
    private const int BlockSize = 4 * 1024 * 1024; // 4 MiB, igual que @electron/asar

    /// <summary>Lee un número de un JsonNode sin depender del tipo CLR con el que se parseó.</summary>
    internal static long NumLong(JsonNode? n)
    {
        if (n is null) return 0;
        var v = n.AsValue();
        if (v.TryGetValue<long>(out var l)) return l;
        if (v.TryGetValue<int>(out var i)) return i;
        if (v.TryGetValue<double>(out var d)) return (long)d;
        return v.GetValue<JsonElement>().GetInt64();
    }

    internal static bool IsUnpacked(JsonObject node)
    {
        if (node["unpacked"] is not JsonNode u) return false;
        var v = u.AsValue();
        if (v.TryGetValue<bool>(out var b)) return b;
        try { return v.GetValue<JsonElement>().GetBoolean(); } catch { return false; }
    }

    // --------------------------------------------------------------------- read

    public sealed class Reader : IDisposable
    {
        private readonly FileStream _fs;
        public string Path { get; }
        public long DataOffset { get; }
        public JsonObject Header { get; }

        internal Reader(string path, FileStream fs, long dataOffset, JsonObject header)
        {
            Path = path;
            _fs = fs;
            DataOffset = dataOffset;
            Header = header;
        }

        public void Dispose() => _fs.Dispose();

        public bool TryGetNode(string entryPath, out JsonObject node)
        {
            JsonObject cur = Header;
            foreach (var seg in entryPath.Split('/', StringSplitOptions.RemoveEmptyEntries))
            {
                if (cur["files"] is not JsonObject files || files[seg] is not JsonObject child)
                {
                    node = null!;
                    return false;
                }
                cur = child;
            }
            node = cur;
            return !ReferenceEquals(cur, Header);
        }

        public byte[] ReadFile(string entryPath)
        {
            if (!TryGetNode(entryPath, out var node))
                throw new FileNotFoundException($"'{entryPath}' no está en {System.IO.Path.GetFileName(Path)}");

            if (IsUnpacked(node))
                return File.ReadAllBytes(Path + ".unpacked/" + entryPath);

            long size = NumLong(node["size"]);
            long offset = long.Parse((string)node["offset"]!);
            var buf = new byte[size];
            _fs.Seek(DataOffset + offset, SeekOrigin.Begin);
            _fs.ReadExactly(buf);
            return buf;
        }

        internal void CopyBodyTo(long offset, long size, Stream dest, byte[] scratch)
        {
            _fs.Seek(DataOffset + offset, SeekOrigin.Begin);
            long left = size;
            while (left > 0)
            {
                int n = _fs.Read(scratch, 0, (int)Math.Min(left, scratch.Length));
                if (n <= 0) throw new EndOfStreamException();
                dest.Write(scratch, 0, n);
                left -= n;
            }
        }

        /// <summary>Extrae TODO el árbol a un directorio (empaquetados y "unpacked").</summary>
        public void ExtractAll(string destDir)
        {
            Directory.CreateDirectory(destDir);
            Walk(Header, "");

            void Walk(JsonObject dir, string prefix)
            {
                if (dir["files"] is not JsonObject files) return;
                foreach (var kv in files)
                {
                    var child = (JsonObject)kv.Value!;
                    var rel = prefix.Length == 0 ? kv.Key : prefix + "/" + kv.Key;
                    if (child["files"] is JsonObject)
                    {
                        Directory.CreateDirectory(System.IO.Path.Combine(destDir, rel));
                        Walk(child, rel);
                    }
                    else
                    {
                        var outPath = System.IO.Path.Combine(destDir, rel);
                        Directory.CreateDirectory(System.IO.Path.GetDirectoryName(outPath)!);
                        File.WriteAllBytes(outPath, ReadFile(rel));
                    }
                }
            }
        }
    }

    public static Reader Open(string asarPath)
    {
        var fs = File.OpenRead(asarPath);
        Span<byte> head = stackalloc byte[16];
        fs.ReadExactly(head);

        uint headerBufLen = BinaryPrimitives.ReadUInt32LittleEndian(head[4..8]);
        uint jsonLen = BinaryPrimitives.ReadUInt32LittleEndian(head[12..16]);

        var jsonBytes = new byte[jsonLen];
        fs.Seek(16, SeekOrigin.Begin);
        fs.ReadExactly(jsonBytes);

        var header = JsonNode.Parse(jsonBytes)?.AsObject()
                     ?? throw new InvalidDataException("Cabecera asar inválida.");
        return new Reader(asarPath, fs, 8 + headerBufLen, header);
    }

    // -------------------------------------------------------------------- write

    /// <summary>
    /// Reescribe <paramref name="baseAsar"/> reemplazando el contenido de un único
    /// archivo. Todo lo demás (orden, entradas "unpacked", integridad de los otros
    /// archivos) se conserva exactamente. Escribe <paramref name="outAsar"/> y su
    /// carpeta <c>.unpacked</c> (tomada de <paramref name="unpackedSourceDir"/>, o
    /// de <c>baseAsar + ".unpacked"</c> si es null).
    /// </summary>
    public static void RewriteSingleFile(
        string baseAsar, string entryPath, byte[] newContent, string outAsar,
        string? unpackedSourceDir = null)
    {
        using var reader = Open(baseAsar);
        var header = (JsonObject)reader.Header.DeepClone();

        var segs = entryPath.Split('/', StringSplitOptions.RemoveEmptyEntries);
        JsonObject dirNode = header;
        for (int i = 0; i < segs.Length - 1; i++)
            dirNode = (JsonObject)((JsonObject)dirNode["files"]!)[segs[i]]!;
        var targetNode = ((JsonObject)dirNode["files"]!)[segs[^1]] as JsonObject
                         ?? throw new FileNotFoundException($"'{entryPath}' no está en el asar base.");
        if (IsUnpacked(targetNode))
            throw new NotSupportedException($"'{entryPath}' está 'unpacked' en el asar base; no soportado.");

        // Hojas empaquetadas en orden de documento (= orden de los cuerpos = offsets ascendentes).
        var leaves = new List<JsonObject>();
        Collect(header);
        void Collect(JsonObject dir)
        {
            if (dir["files"] is not JsonObject files) return;
            foreach (var kv in files)
            {
                var child = (JsonObject)kv.Value!;
                if (child["files"] is JsonObject) Collect(child);
                else if (!IsUnpacked(child)) leaves.Add(child);
            }
        }

        var origOffset = leaves.ToDictionary(n => n, n => long.Parse((string)n["offset"]!));
        var origSize = leaves.ToDictionary(n => n, n => NumLong(n["size"]));

        targetNode["size"] = newContent.Length;
        targetNode["integrity"] = IntegrityFor(newContent);

        long running = 0;
        foreach (var node in leaves)
        {
            node["offset"] = running.ToString();
            running += NumLong(node["size"]);
        }

        var jsonBytes = Encoding.UTF8.GetBytes(header.ToJsonString());
        int pad = (4 - (jsonBytes.Length % 4)) % 4;
        int headerPayload = 4 + jsonBytes.Length + pad;
        int headerBufLen = 4 + headerPayload;

        var full = System.IO.Path.GetFullPath(outAsar);
        Directory.CreateDirectory(System.IO.Path.GetDirectoryName(full)!);

        using (var outFs = File.Create(full))
        {
            Span<byte> u32 = stackalloc byte[4];
            BinaryPrimitives.WriteUInt32LittleEndian(u32, 4); outFs.Write(u32);
            BinaryPrimitives.WriteUInt32LittleEndian(u32, (uint)headerBufLen); outFs.Write(u32);
            BinaryPrimitives.WriteUInt32LittleEndian(u32, (uint)headerPayload); outFs.Write(u32);
            BinaryPrimitives.WriteUInt32LittleEndian(u32, (uint)jsonBytes.Length); outFs.Write(u32);
            outFs.Write(jsonBytes);
            for (int i = 0; i < pad; i++) outFs.WriteByte(0);

            var scratch = new byte[1 << 20];
            foreach (var node in leaves)
            {
                if (ReferenceEquals(node, targetNode))
                    outFs.Write(newContent);
                else
                    reader.CopyBodyTo(origOffset[node], origSize[node], outFs, scratch);
            }
        }

        var srcUnpacked = unpackedSourceDir ?? (baseAsar + ".unpacked");
        var outUnpacked = full + ".unpacked";
        if (Directory.Exists(outUnpacked)) Directory.Delete(outUnpacked, true);
        if (Directory.Exists(srcUnpacked))
        {
            // Copia solo lo que la cabecera del asar de salida marca como "unpacked".
            var wanted = new HashSet<string>(
                UnpackedEntries(header).Select(p => p.Replace('/', Path.DirectorySeparatorChar)));
            foreach (var file in Directory.GetFiles(srcUnpacked, "*", SearchOption.AllDirectories))
            {
                var rel = Path.GetRelativePath(srcUnpacked, file);
                if (wanted.Count == 0 || wanted.Contains(rel))
                {
                    var dst = Path.Combine(outUnpacked, rel);
                    Directory.CreateDirectory(Path.GetDirectoryName(dst)!);
                    File.Copy(file, dst, true);
                }
            }
        }
    }

    // ------------------------------------------------------------------ helpers

    public static JsonObject IntegrityFor(byte[] data)
    {
        string whole = Convert.ToHexString(SHA256.HashData(data)).ToLowerInvariant();
        var blocks = new JsonArray();
        if (data.Length == 0)
        {
            blocks.Add(whole);
        }
        else
        {
            for (int i = 0; i < data.Length; i += BlockSize)
            {
                int len = Math.Min(BlockSize, data.Length - i);
                blocks.Add(Convert.ToHexString(SHA256.HashData(data.AsSpan(i, len))).ToLowerInvariant());
            }
        }
        return new JsonObject
        {
            ["algorithm"] = "SHA256",
            ["hash"] = whole,
            ["blockSize"] = BlockSize,
            ["blocks"] = blocks,
        };
    }

    public static List<string> UnpackedEntries(JsonObject header)
    {
        var result = new List<string>();
        Walk(header, "");
        void Walk(JsonObject dir, string prefix)
        {
            if (dir["files"] is not JsonObject files) return;
            foreach (var kv in files)
            {
                var child = (JsonObject)kv.Value!;
                var rel = prefix.Length == 0 ? kv.Key : prefix + "/" + kv.Key;
                if (child["files"] is JsonObject) Walk(child, rel);
                else if (IsUnpacked(child)) result.Add(rel);
            }
        }
        return result;
    }

    public static void CopyDir(string src, string dst)
    {
        Directory.CreateDirectory(dst);
        foreach (var dir in Directory.GetDirectories(src, "*", SearchOption.AllDirectories))
            Directory.CreateDirectory(dir.Replace(src, dst));
        foreach (var file in Directory.GetFiles(src, "*", SearchOption.AllDirectories))
        {
            var target = file.Replace(src, dst);
            Directory.CreateDirectory(System.IO.Path.GetDirectoryName(target)!);
            File.Copy(file, target, true);
        }
    }
}
