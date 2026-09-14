# Genera el ejecutable de distribución: UN ÚNICO archivo, runtime .NET incluido.
#
#   ./build.ps1                       -> para este sistema
#   ./build.ps1 win-x64 linux-x64     -> para los RID indicados
#
# El resultado queda en dist\. Los 5 binarios oficiales los produce el workflow
# de GitHub Actions al publicar una etiqueta vX.Y.Z.
param([string[]]$Rids)

$ErrorActionPreference = 'Stop'
$originalLocation = Get-Location
Set-Location $PSScriptRoot

try {
    if (-not $Rids -or $Rids.Count -eq 0) {
        $Rids = if ($IsMacOS) {
            if ([Runtime.InteropServices.RuntimeInformation]::OSArchitecture -eq 'Arm64') { 'osx-arm64' } else { 'osx-x64' }
        } elseif ($IsLinux) {
            if ([Runtime.InteropServices.RuntimeInformation]::OSArchitecture -eq 'Arm64') { 'linux-arm64' } else { 'linux-x64' }
        } else { 'win-x64' }
    }

    ./browser-extension/sync.ps1   # mantiene la extensión con la misma traducción

    Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
    New-Item -ItemType Directory dist | Out-Null

    foreach ($rid in $Rids) {
        Write-Host "==> publicando $rid"
        dotnet publish TetrioEsPatcher.csproj -c Release -r $rid --self-contained `
            -p:PublishSingleFile=true -o "obj/pub/$rid"
        if ($LASTEXITCODE -ne 0) { throw "fallo publicando $rid" }
        $ext = if ($rid -like 'win-*') { '.exe' } else { '' }
        Copy-Item "obj/pub/$rid/tetrio-es-patcher$ext" "dist/tetrio-es-patcher-$rid$ext"
    }

    Write-Host "`nListo. En dist\:"
    Get-ChildItem dist | Format-Table Name, @{ Name = 'MB'; Expression = { [math]::Round($_.Length / 1MB, 1) } }
} finally {
    Set-Location $originalLocation
}
