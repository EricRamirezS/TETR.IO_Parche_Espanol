# Reconstruye Assets/translation.js (único archivo que consumen el parche de escritorio y la extensión) a partir de Assets/src/*.js.
$ErrorActionPreference = "Stop"
$originalLocation = Get-Location
Set-Location $PSScriptRoot

try {

./check-duplicates.ps1
if ($LASTEXITCODE -ne 0) { throw "check-duplicates.ps1 encontro duplicados; revisa el detalle de arriba." }

$partsBeforeImages = @(
    "src/00-header.js",
    "src/00b-asset-interception.js",
    "src/00c-appcode-string-patch.js",
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

# Clave = ruta relativa a images/res/ SIN extension (a proposito: el formato del reemplazo no tiene por que coincidir con el que pide tetrio.js).
function Get-ImagesBlock {
    $mimeByExt = @{ ".png" = "image/png"; ".jpg" = "image/jpeg"; ".jpeg" = "image/jpeg"; ".webp" = "image/webp"; ".svg" = "image/svg+xml" }
    $entries = @()
    $seenKeys = @{}

    if (Test-Path "images/res") {
        $imagesRoot = (Resolve-Path "images/res").Path
        $files = Get-ChildItem -Path "images/res" -File -Recurse |
            Where-Object { $mimeByExt.ContainsKey($_.Extension.ToLower()) } |
            Sort-Object FullName
        foreach ($f in $files) {
            $mime = $mimeByExt[$f.Extension.ToLower()]
            $relFull = $f.FullName.Substring($imagesRoot.Length + 1) -replace "\\", "/"
            $rel = $relFull.Substring(0, $relFull.Length - $f.Extension.Length)

            if ($seenKeys.ContainsKey($rel)) {
                throw "Dos imagenes distintas apuntan a la misma clave `"$rel`": $($seenKeys[$rel]) y $relFull"
            }
            $seenKeys[$rel] = $relFull

            $b64 = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes($f.FullName))
            $entries += "    `"$rel`": `"data:$mime;base64,$b64`""
        }
    }

    $body = if ($entries.Count -gt 0) { ($entries -join ",`n") + "`n" } else { "" }
    return "const replacementImages = {`n$body};`n`n"
}

# Se inyecta tal cual (ver .gitattributes: -text): LF y sin BOM, no los de PowerShell por defecto.
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$content = ($partsBeforeImages | ForEach-Object { Get-Content -Raw -Path $_ }) -join ""
$content += Get-ImagesBlock
$content += ($partsAfterImages | ForEach-Object { Get-Content -Raw -Path $_ }) -join ""
$content = $content -replace "`r`n", "`n"

$assembled = [System.IO.Path]::GetTempFileName()
[System.IO.File]::WriteAllText($assembled, $content, $utf8NoBom)

try {
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

} finally {
    Set-Location $originalLocation
}
