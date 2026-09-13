# Detecta duplicados que JS acepta en silencio (la ultima declaracion gana,
# sin ningun error ni warning) y que por eso son faciles de introducir sin
# darse cuenta al copiar/pegar o mover codigo entre archivos:
#
#   - Dos entradas con la misma clave de nivel superior en el objeto
#     `translations` de 05-translations.js (una tapa a la otra: la que queda
#     "muerta" nunca se ejecuta).
#   - Dos `function nombre(...)` con el mismo nombre en cualquier archivo de
#     Assets/src/ (la segunda definicion reemplaza a la primera).
#
# Uso: ./check-duplicates.ps1   (exit 0 si no hay problemas, 1 si encuentra algo)
$ErrorActionPreference = "Stop"

$originalLocation = Get-Location
Set-Location "$PSScriptRoot/src"

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

Set-Location $originalLocation
exit $status
