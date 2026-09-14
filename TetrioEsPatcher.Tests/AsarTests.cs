using System.Text;
using TetrioEsPatcher.Core;
using Xunit;

namespace TetrioEsPatcher.Tests;

public class AsarTests
{
    [Fact]
    public void ReadFile_ReturnsCorrectBytes_ForEachPackedFile()
    {
        using var ws = new TempWorkspace();
        var asarPath = ws.Combine("app.asar");
        var files = new Dictionary<string, byte[]>
        {
            ["package.json"] = Encoding.UTF8.GetBytes("""{"name":"tetrio-desktop","version":"1.2.3"}"""),
            ["preload.js"] = Encoding.UTF8.GetBytes("console.log('stock');\n"),
            ["empty.txt"] = Array.Empty<byte>()
        };
        AsarFixture.Build(asarPath, files);

        using var reader = Asar.Open(asarPath);

        Assert.Equal(files["package.json"], reader.ReadFile("package.json"));
        Assert.Equal(files["preload.js"], reader.ReadFile("preload.js"));
        Assert.Equal(files["empty.txt"], reader.ReadFile("empty.txt"));
    }

    [Fact]
    public void ReadFile_MissingEntry_ThrowsFileNotFound()
    {
        using var ws = new TempWorkspace();
        var asarPath = ws.Combine("app.asar");
        AsarFixture.Build(asarPath, new Dictionary<string, byte[]> { ["a.txt"] = "x"u8.ToArray() });

        using var reader = Asar.Open(asarPath);

        Assert.Throws<FileNotFoundException>(() => reader.ReadFile("no-existe.txt"));
    }

    [Fact]
    public void ReadFile_UnpackedEntry_ReadsFromUnpackedDirNotFromBody()
    {
        using var ws = new TempWorkspace();
        var asarPath = ws.Combine("app.asar");
        var unpackedContent = Encoding.UTF8.GetBytes("contenido real en disco");
        AsarFixture.Build(
            asarPath,
            new Dictionary<string, byte[]> { ["node_modules/native.node"] = unpackedContent },
            unpacked: ["node_modules/native.node"]);

        using var reader = Asar.Open(asarPath);

        Assert.Equal(unpackedContent, reader.ReadFile("node_modules/native.node"));
    }

    [Fact]
    public void ExtractAll_WritesNestedFilesWithCorrectContent()
    {
        using var ws = new TempWorkspace();
        var asarPath = ws.Combine("app.asar");
        var files = new Dictionary<string, byte[]>
        {
            ["a.txt"] = "raiz"u8.ToArray(),
            ["sub/b.txt"] = "anidado"u8.ToArray()
        };
        AsarFixture.Build(asarPath, files);
        var destDir = ws.Combine("extracted");

        using (var reader = Asar.Open(asarPath))
        {
            reader.ExtractAll(destDir);
        }

        Assert.Equal(files["a.txt"], File.ReadAllBytes(Path.Combine(destDir, "a.txt")));
        Assert.Equal(files["sub/b.txt"], File.ReadAllBytes(Path.Combine(destDir, "sub", "b.txt")));
    }

    [Fact]
    public void RewriteSingleFile_ReplacesOnlyTargetContent_PreservesOtherFiles()
    {
        using var ws = new TempWorkspace();
        var asarPath = ws.Combine("app.asar");
        var otherContent = Encoding.UTF8.GetBytes("no debe cambiar");
        AsarFixture.Build(asarPath, new Dictionary<string, byte[]>
        {
            ["preload.js"] = Encoding.UTF8.GetBytes("original"),
            ["other.txt"] = otherContent
        });
        var outAsar = ws.Combine("out.asar");
        var newContent = Encoding.UTF8.GetBytes("contenido nuevo, mas largo que el original");

        Asar.RewriteSingleFile(asarPath, "preload.js", newContent, outAsar);

        using var reader = Asar.Open(outAsar);
        Assert.Equal(newContent, reader.ReadFile("preload.js"));
        Assert.Equal(otherContent, reader.ReadFile("other.txt"));
    }

    [Fact]
    public void RewriteSingleFile_SetsIntegrityMatchingNewContent()
    {
        using var ws = new TempWorkspace();
        var asarPath = ws.Combine("app.asar");
        AsarFixture.Build(asarPath, new Dictionary<string, byte[]> { ["preload.js"] = "x"u8.ToArray() });
        var outAsar = ws.Combine("out.asar");
        var newContent = Encoding.UTF8.GetBytes("contenido para verificar integridad");

        Asar.RewriteSingleFile(asarPath, "preload.js", newContent, outAsar);

        using var reader = Asar.Open(outAsar);
        reader.TryGetNode("preload.js", out var node);
        var expectedHash = Asar.IntegrityFor(newContent)["hash"]!.ToString();
        Assert.Equal(expectedHash, node["integrity"]!["hash"]!.ToString());
    }

    [Fact]
    public void RewriteSingleFile_MissingEntry_ThrowsFileNotFound()
    {
        using var ws = new TempWorkspace();
        var asarPath = ws.Combine("app.asar");
        AsarFixture.Build(asarPath, new Dictionary<string, byte[]> { ["a.txt"] = "x"u8.ToArray() });

        Assert.Throws<FileNotFoundException>(() =>
            Asar.RewriteSingleFile(asarPath, "preload.js", "y"u8.ToArray(), ws.Combine("out.asar")));
    }

    [Fact]
    public void RewriteSingleFile_UnpackedEntry_ThrowsNotSupported()
    {
        using var ws = new TempWorkspace();
        var asarPath = ws.Combine("app.asar");
        AsarFixture.Build(
            asarPath,
            new Dictionary<string, byte[]> { ["native.node"] = "x"u8.ToArray() },
            unpacked: ["native.node"]);

        Assert.Throws<NotSupportedException>(() =>
            Asar.RewriteSingleFile(asarPath, "native.node", "y"u8.ToArray(), ws.Combine("out.asar")));
    }

    [Fact]
    public void RewriteSingleFile_CopiesOnlyWantedUnpackedFilesToOutput()
    {
        using var ws = new TempWorkspace();
        var asarPath = ws.Combine("app.asar");
        var keepContent = Encoding.UTF8.GetBytes("se mantiene");
        AsarFixture.Build(
            asarPath,
            new Dictionary<string, byte[]>
            {
                ["preload.js"] = "original"u8.ToArray(),
                ["node_modules/native.node"] = keepContent
            },
            unpacked: ["node_modules/native.node"]);
        var outAsar = ws.Combine("out.asar");

        Asar.RewriteSingleFile(asarPath, "preload.js", "nuevo"u8.ToArray(), outAsar,
            unpackedSourceDir: asarPath + ".unpacked");

        var copied = Path.Combine(outAsar + ".unpacked", "node_modules", "native.node");
        Assert.True(File.Exists(copied));
        Assert.Equal(keepContent, File.ReadAllBytes(copied));
    }

    [Fact]
    public void IntegrityFor_EmptyData_ProducesSingleBlockMatchingWholeHash()
    {
        var integrity = Asar.IntegrityFor(Array.Empty<byte>());
        var blocks = integrity["blocks"]!.AsArray();

        Assert.Single(blocks);
        Assert.Equal(integrity["hash"]!.ToString(), blocks[0]!.ToString());
    }

    [Fact]
    public void UnpackedEntries_ReturnsRelativePathsOfUnpackedFilesOnly()
    {
        using var ws = new TempWorkspace();
        var asarPath = ws.Combine("app.asar");
        AsarFixture.Build(
            asarPath,
            new Dictionary<string, byte[]>
            {
                ["packed.txt"] = "a"u8.ToArray(),
                ["node_modules/native.node"] = "b"u8.ToArray()
            },
            unpacked: ["node_modules/native.node"]);

        using var reader = Asar.Open(asarPath);
        var unpacked = Asar.UnpackedEntries(reader.Header);

        Assert.Equal(new[] { "node_modules/native.node" }, unpacked);
    }
}
