#!/usr/bin/env bash
# Copia Assets/translation.js -> browser-extension/content.js.
# Es el mismo archivo que usa el parcheador de escritorio: una sola fuente de
# verdad para la traducción. Ejecutar tras editar Assets/src/*.js y antes
# de probar/empaquetar la extensión.
set -euo pipefail
cd "$(dirname "$0")/.."
./Assets/build-translation.sh   # regenera translation.js desde Assets/src/*.js
cp Assets/translation.js browser-extension/content.js
echo "content.js actualizado ($(wc -c < browser-extension/content.js) bytes)."
