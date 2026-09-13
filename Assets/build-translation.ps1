# Reconstruye Assets/translation.js a partir de las piezas en Assets/src/*.js.
#
# translation.js sigue siendo el UNICO archivo que consumen tanto el parche de
# escritorio (EmbeddedResource en TetrioEsPatcher.csproj) como la extension de
# navegador (browser-extension/sync.ps1 lo copia tal cual a content.js). Este
# script no cambia esos consumidores: solo genera ese mismo archivo a partir
# de fuentes mas manejables.
#
# Editar en Assets/src/, correr este script, y luego seguir el flujo de
# siempre (browser-extension/sync.ps1, build.ps1, etc).
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

./check-duplicates.ps1
if ($LASTEXITCODE -ne 0) { throw "check-duplicates.ps1 encontro duplicados; revisa el detalle de arriba." }

$partsBeforeImages = @(
    "src/00-header.js",
    "src/00b-asset-interception.js",
    "src/01-data-countries.js",
    "src/02-data-achievements.js",
    "src/03-data-badges.js",
    "src/04-data-status.js"
)

$partsAfterImages = @(
    "src/05-translations.js",
    "src/06-room-config.js",
    "src/07-messages.js",
    "src/08-dom-helpers.js",
    "src/09-observer.js"
)

foreach ($part in ($partsBeforeImages + $partsAfterImages)) {
    if (-not (Test-Path $part)) {
        Write-Error "Falta $part"
    }
}

# Convierte cada imagen en Assets/images/res/ (creadas por el proyecto, ver
# images/README.md) a una entrada "ruta/relativa.png": "data:...;base64,...".
# La clave es la ruta relativa a images/res/, igual que la sirve TETR.IO bajo
# /res/ (necesario porque /res/ repite nombres de archivo en carpetas distintas).
function Get-ImagesBlock {
    $mimeByExt = @{ ".png" = "image/png"; ".jpg" = "image/jpeg"; ".jpeg" = "image/jpeg"; ".svg" = "image/svg+xml" }
    $entries = @()

    if (Test-Path "images/res") {
        $imagesRoot = (Resolve-Path "images/res").Path
        $files = Get-ChildItem -Path "images/res" -File -Recurse |
            Where-Object { $mimeByExt.ContainsKey($_.Extension.ToLower()) } |
            Sort-Object FullName
        foreach ($f in $files) {
            $mime = $mimeByExt[$f.Extension.ToLower()]
            $rel = $f.FullName.Substring($imagesRoot.Length + 1) -replace "\\", "/"
            $b64 = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes($f.FullName))
            $entries += "    `"$rel`": `"data:$mime;base64,$b64`""
        }
    }

    $body = if ($entries.Count -gt 0) { ($entries -join ",`n") + "`n" } else { "" }
    return "const replacementImages = {`n$body};`n`n"
}

# translation.js se inyecta tal cual (ver .gitattributes: -text) -> se escribe
# con LF y sin BOM, nunca con los saltos de linea/BOM por defecto de PowerShell.
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$content = ($partsBeforeImages | ForEach-Object { Get-Content -Raw -Path $_ }) -join ""
$content += Get-ImagesBlock
$content += ($partsAfterImages | ForEach-Object { Get-Content -Raw -Path $_ }) -join ""
$content = $content -replace "`r`n", "`n"

$assembled = [System.IO.Path]::GetTempFileName()
[System.IO.File]::WriteAllText($assembled, $content, $utf8NoBom)

try {
    # translation.js es el archivo que se distribuye (incrustado en el .exe y
    # copiado a la extension); minificarlo ahorra ~50% del PESO DEL CODIGO. Las
    # imagenes en base64 ya son la mayor parte del archivo y no se pueden
    # minificar mas, asi que el ahorro total suele ser pequeno en proporcion.
    if (-not (Get-Command npx -ErrorAction SilentlyContinue)) {
        throw 'Hace falta Node.js (para "npx terser") para generar translation.js minificado: https://nodejs.org'
    }

    npx --yes terser@5 $assembled --compress --mangle --comments false -o "$PSScriptRoot/translation.js"
    if ($LASTEXITCODE -ne 0) { throw "terser fallo (exit $LASTEXITCODE)" }
} finally {
    Remove-Item $assembled -ErrorAction SilentlyContinue
}

$bytes = (Get-Item "$PSScriptRoot/translation.js").Length
Write-Host "translation.js regenerado y minificado ($bytes bytes)."
