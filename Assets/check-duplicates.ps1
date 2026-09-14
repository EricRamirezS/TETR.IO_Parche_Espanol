# Detecta claves/funciones duplicadas que JS acepta en silencio (gana la ultima, sin error ni warning).
$ErrorActionPreference = "Stop"

$originalLocation = Get-Location
Set-Location "$PSScriptRoot/src"

try {
    $status = 0

    $keys = Select-String -Path "05-translations.js" -Pattern '^    "([^"\\]|\\.)*"' |
        ForEach-Object { $_.Matches[0].Value }
    $dupKeys = $keys | Group-Object | Where-Object { $_.Count -gt 1 } | Select-Object -ExpandProperty Name

    if ($dupKeys) {
        Write-Host "Claves duplicadas en 05-translations.js (la ultima definicion gana, las anteriores quedan muertas):"
        $dupKeys | ForEach-Object { Write-Host "    $_" }
        $status = 1
    }

    $fns = Get-ChildItem -Filter "*.js" | ForEach-Object {
        Select-String -Path $_.FullName -Pattern '^function [a-zA-Z0-9_]+' |
            ForEach-Object { $_.Matches[0].Value }
    }
    $dupFns = $fns | Group-Object | Where-Object { $_.Count -gt 1 } | Select-Object -ExpandProperty Name

    if ($dupFns) {
        Write-Host "Funciones declaradas mas de una vez en Assets/src/*.js:"
        $dupFns | ForEach-Object { Write-Host "    $_" }
        $status = 1
    }

    if ($status -eq 0) {
        Write-Host "Sin duplicados."
    }
} finally {
    Set-Location $originalLocation
}

exit $status
