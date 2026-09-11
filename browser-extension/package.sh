#!/usr/bin/env bash
# Genera el .zip de la extensión (manifest.json + content.js + icons/) para
# subirlo a mano al panel de Chrome Web Store / Edge Add-ons, o para probar
# localmente lo que hace el workflow de GitHub Actions.
set -euo pipefail
cd "$(dirname "$0")"

./sync.sh   # por si Assets/translation.js cambió y no se ha sincronizado

rm -rf dist && mkdir -p dist
if [ -d icons ]; then
  zip -r dist/tetrio-es-extension.zip manifest.json content.js icons
else
  zip -r dist/tetrio-es-extension.zip manifest.json content.js
fi

echo "Listo: dist/tetrio-es-extension.zip"
ls -lh dist/tetrio-es-extension.zip
