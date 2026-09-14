using System.Buffers.Binary;
using System.Text;
using System.Text.Json.Nodes;
using TetrioEsPatcher.Core;

namespace TetrioEsPatcher.Tests;

/// <summary>
/// Construye un .asar válido a mano (independiente de Asar.RewriteSingleFile) para usar como
/// fixture en los tests: así el escritor de los tests no comparte código con el lector que se prueba.
/// </summary>
internal static class AsarFixture
{
    public static void Build(
        string asarPath,
        IReadOnlyDictionary<string, byte[]> files,
        IReadOnlyCollection<string>? unpacked = null,
        string? unpackedDir = null)
    {
        unpacked ??= Array.Empty<string>();
        var header = new JsonObject { ["files"] = new JsonObject() };
        var bodies = new List<byte[]>();
        long running = 0;

        foreach (var (relPath, content) in files)
        {
            JsonObject entry;
            if (unpacked.Contains(relPath))
            {
                entry = new JsonObject { ["size"] = content.Length, ["unpacked"] = true };
            }
            else
            {
                entry = new JsonObject
                {
                    ["size"] = content.Length,
                    ["offset"] = running.ToString(),
                    ["integrity"] = Asar.IntegrityFor(content)
                };
                bodies.Add(content);
                running += content.Length;
            }
            AddEntry(header, relPath, entry);
        }

        var jsonBytes = Encoding.UTF8.GetBytes(header.ToJsonString());
        int pad = (4 - (jsonBytes.Length % 4)) % 4;
        int headerPayload = 4 + jsonBytes.Length + pad;
        int headerBufLen = 4 + headerPayload;

        Directory.CreateDirectory(Path.GetDirectoryName(Path.GetFullPath(asarPath))!);
        using (var fs = File.Create(asarPath))
        {
            Span<byte> u32 = stackalloc byte[4];
            BinaryPrimitives.WriteUInt32LittleEndian(u32, 4); fs.Write(u32);
            BinaryPrimitives.WriteUInt32LittleEndian(u32, (uint)headerBufLen); fs.Write(u32);
            BinaryPrimitives.WriteUInt32LittleEndian(u32, (uint)headerPayload); fs.Write(u32);
            BinaryPrimitives.WriteUInt32LittleEndian(u32, (uint)jsonBytes.Length); fs.Write(u32);
            fs.Write(jsonBytes);
            for (int i = 0; i < pad; i++) fs.WriteByte(0);
            foreach (var body in bodies) fs.Write(body);
        }

        if (unpacked.Count > 0)
        {
            var dir = unpackedDir ?? (asarPath + ".unpacked");
            foreach (var rel in unpacked)
            {
                var dst = Path.Combine(dir, rel.Replace('/', Path.DirectorySeparatorChar));
                Directory.CreateDirectory(Path.GetDirectoryName(dst)!);
                File.WriteAllBytes(dst, files[rel]);
            }
        }
    }

    private static void AddEntry(JsonObject header, string relPath, JsonObject entry)
    {
        var segs = relPath.Split('/', StringSplitOptions.RemoveEmptyEntries);
        var dir = (JsonObject)header["files"]!;
        for (int i = 0; i < segs.Length - 1; i++)
        {
            if (dir[segs[i]] is not JsonObject sub)
            {
                sub = new JsonObject { ["files"] = new JsonObject() };
                dir[segs[i]] = sub;
            }
            dir = (JsonObject)sub["files"]!;
        }
        dir[segs[^1]] = entry;
    }
}
