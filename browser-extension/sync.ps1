# Copia Assets/translation.js -> browser-extension/content.js.
# Es el mismo archivo que usa el parcheador de escritorio: una sola fuente de
# verdad para la traducción. Ejecutar tras editar Assets/src/*.js y antes
# de probar/empaquetar la extensión.
$ErrorActionPreference = 'Stop'
Set-Location "$PSScriptRoot/.."
./Assets/build-translation.ps1   # regenera translation.js desde Assets/src/*.js
Copy-Item Assets/translation.js browser-extension/content.js -Force
$bytes = (Get-Item browser-extension/content.js).Length
Write-Host "content.js actualizado ($bytes bytes)."
