# Genera el .zip de la extensión (manifest.json + content.js + icons/) para
# subirlo a mano al panel de Chrome Web Store / Edge Add-ons, o para probar
# localmente lo que hace el workflow de GitHub Actions.
$ErrorActionPreference = 'Stop'
$originalLocation = Get-Location
Set-Location $PSScriptRoot

try {
    ./sync.ps1   # por si Assets/translation.js cambió y no se ha sincronizado
    Set-Location $PSScriptRoot   # sync.ps1 se mueve a la raíz del repo; volvemos aquí

    $dist = "dist"
    Remove-Item -Recurse -Force $dist -ErrorAction SilentlyContinue
    New-Item -ItemType Directory $dist | Out-Null

    $paths = @('manifest.json', 'content.js')
    if (Test-Path 'icons') { $paths += 'icons' }

    $zipPath = Join-Path $dist 'tetrio-es-extension.zip'
    Compress-Archive -Path $paths -DestinationPath $zipPath -Force

    Write-Host "Listo: $zipPath"
    Get-Item $zipPath | Select-Object @{N='MB';E={[math]::Round($_.Length/1MB,2)}}, FullName
} finally {
    Set-Location $originalLocation
}
