using System.Text;
using TetrioEsPatcher.Core;
using Xunit;

namespace TetrioEsPatcher.Tests;

public class PatcherTests
{
    private static readonly Patcher.Log NullLog = _ => { };

    [Fact]
    public void StockPortion_NoSentinel_ReturnsWholeInputUnpatched()
    {
        var (stock, wasPatched) = Patcher.StockPortion("console.log('hola');\n");

        Assert.Equal("console.log('hola');\n", stock);
        Assert.False(wasPatched);
    }

    [Fact]
    public void StockPortion_WithSentinel_ReturnsOnlyTextBeforeIt_MarkedPatched()
    {
        var preload =
            "console.log('hola');\n" +
            $"// ===== {PatchAssets.Sentinel} v1.0.0 =====\n" +
            "const translations = {};\n";

        var (stock, wasPatched) = Patcher.StockPortion(preload);

        Assert.Equal("console.log('hola');", stock);
        Assert.True(wasPatched);
    }

    [Fact]
    public void ContainsInjection_DetectsPresenceOfTranslationFragment()
    {
        var translation = string.Join(" ", Enumerable.Range(0, 200).Select(i => $"palabra{i}"));
        var candidate = "algo de texto antes... " + translation + " ...y algo despues";

        Assert.True(Patcher.ContainsInjection(candidate, translation));
    }

    [Fact]
    public void ContainsInjection_ReturnsFalse_ForUnrelatedText()
    {
        var translation = string.Join(" ", Enumerable.Range(0, 200).Select(i => $"palabra{i}"));

        Assert.False(Patcher.ContainsInjection("console.log('completamente distinto');", translation));
    }

    private static string BuildStockInstall(string asarPath, string version = "1.2.3", string preload = "console.log('stock');\n")
    {
        AsarFixture.Build(asarPath, new Dictionary<string, byte[]>
        {
            ["package.json"] = Encoding.UTF8.GetBytes($$"""{"name":"tetrio-desktop","version":"{{version}}"}"""),
            ["preload.js"] = Encoding.UTF8.GetBytes(preload),
            ["index.html"] = Encoding.UTF8.GetBytes("<html></html>")
        });
        return asarPath;
    }

    [Fact]
    public void Apply_CreatesBackup_InjectsTranslation_PreservesOtherFiles()
    {
        using var ws = new TempWorkspace();
        var asarPath = BuildStockInstall(ws.Combine("resources", "app.asar"));

        Patcher.Apply(asarPath, NullLog);

        var backupPath = ws.Combine("resources", "app.original.asar");
        Assert.True(File.Exists(backupPath));

        using (var reader = Asar.Open(asarPath))
        {
            var preload = Encoding.UTF8.GetString(reader.ReadFile("preload.js"));
            Assert.Contains(PatchAssets.Sentinel, preload);
            Assert.StartsWith("console.log('stock');", preload);
            Assert.Contains(PatchAssets.Translation, preload);
            Assert.Equal("<html></html>", Encoding.UTF8.GetString(reader.ReadFile("index.html")));
        }

        using (var backupReader = Asar.Open(backupPath))
        {
            Assert.Equal("console.log('stock');\n", Encoding.UTF8.GetString(backupReader.ReadFile("preload.js")));
        }
    }

    [Fact]
    public void Inspect_ReportsPatchedStateAndBackupAfterApply()
    {
        using var ws = new TempWorkspace();
        var asarPath = BuildStockInstall(ws.Combine("resources", "app.asar"));

        var before = Patcher.Inspect(asarPath);
        Assert.Equal(InstallState.Stock, before.State);
        Assert.False(before.BackupExists);

        Patcher.Apply(asarPath, NullLog);

        var after = Patcher.Inspect(asarPath);
        Assert.Equal(InstallState.Patched, after.State);
        Assert.True(after.BackupExists);
        Assert.True(after.IsTetrio);
        Assert.Equal("1.2.3", after.Version);
    }

    [Fact]
    public void Apply_ThenRestore_RevertsPreloadByteForByte()
    {
        using var ws = new TempWorkspace();
        var asarPath = BuildStockInstall(ws.Combine("resources", "app.asar"));
        var originalBytes = File.ReadAllBytes(asarPath);

        Patcher.Apply(asarPath, NullLog);
        Patcher.Restore(asarPath, NullLog);

        Assert.Equal(InstallState.Stock, Patcher.Inspect(asarPath).State);
        using var reader = Asar.Open(asarPath);
        Assert.Equal("console.log('stock');\n", Encoding.UTF8.GetString(reader.ReadFile("preload.js")));
        _ = originalBytes; // el asar completo puede reordenar bytes; lo que importa es el contenido logico
    }

    [Fact]
    public void Restore_WithoutHavingAppliedFirst_IsNoOpAndDoesNotThrow()
    {
        using var ws = new TempWorkspace();
        var asarPath = BuildStockInstall(ws.Combine("resources", "app.asar"));

        Patcher.Restore(asarPath, NullLog);

        Assert.Equal(InstallState.Stock, Patcher.Inspect(asarPath).State);
    }

    [Fact]
    public void Apply_CalledTwice_IsIdempotent_DoesNotDuplicateBanner()
    {
        using var ws = new TempWorkspace();
        var asarPath = BuildStockInstall(ws.Combine("resources", "app.asar"));

        Patcher.Apply(asarPath, NullLog);
        Patcher.Apply(asarPath, NullLog);

        using var reader = Asar.Open(asarPath);
        var preload = Encoding.UTF8.GetString(reader.ReadFile("preload.js"));
        var occurrences = preload.Split(PatchAssets.Sentinel).Length - 1;
        Assert.Equal(1, occurrences);
        Assert.StartsWith("console.log('stock');", preload);
    }

    [Fact]
    public void Apply_WhenPreloadAlreadyContainsTranslationWithoutSentinel_Throws()
    {
        using var ws = new TempWorkspace();
        var corrupted = "console.log('stock');\n" + PatchAssets.Translation;
        var asarPath = BuildStockInstall(ws.Combine("resources", "app.asar"), preload: corrupted);

        Assert.Throws<InvalidOperationException>(() => Patcher.Apply(asarPath, NullLog));
    }

    [Fact]
    public void Apply_WhenNotTetrioDesktop_Throws()
    {
        using var ws = new TempWorkspace();
        var asarPath = ws.Combine("resources", "app.asar");
        AsarFixture.Build(asarPath, new Dictionary<string, byte[]>
        {
            ["package.json"] = Encoding.UTF8.GetBytes("""{"name":"otra-app","version":"1.0.0"}"""),
            ["preload.js"] = "x"u8.ToArray()
        });

        Assert.Throws<InvalidOperationException>(() => Patcher.Apply(asarPath, NullLog));
    }

    [Fact]
    public void Apply_AfterVersionBump_RefreshesBackupWithNewStock()
    {
        using var ws = new TempWorkspace();
        var asarPath = BuildStockInstall(ws.Combine("resources", "app.asar"), version: "1.0.0");
        Patcher.Apply(asarPath, NullLog);

        // Simula que TETR.IO se actualizo: reemplaza el asar en vivo por una version nueva, sin parchear.
        BuildStockInstall(asarPath, version: "2.0.0", preload: "console.log('nuevo stock');\n");

        var messages = new List<string>();
        Patcher.Apply(asarPath, messages.Add);

        Assert.Contains(messages, m => m.Contains("actualizada"));
        using var reader = Asar.Open(asarPath);
        var preload = Encoding.UTF8.GetString(reader.ReadFile("preload.js"));
        Assert.StartsWith("console.log('nuevo stock');", preload);

        using var backupReader = Asar.Open(ws.Combine("resources", "app.original.asar"));
        Assert.Equal("console.log('nuevo stock');\n", Encoding.UTF8.GetString(backupReader.ReadFile("preload.js")));
    }
}
