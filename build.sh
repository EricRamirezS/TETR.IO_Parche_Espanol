#!/usr/bin/env bash
# Genera el ejecutable de distribución: UN ÚNICO archivo, runtime .NET incluido.
#
#   ./build.sh                -> para este sistema
#   ./build.sh linux-x64 osx-arm64   -> para los RID indicados
#
# El resultado queda en dist/. Los 5 binarios oficiales los produce el workflow
# de GitHub Actions al publicar una etiqueta vX.Y.Z.
set -euo pipefail
cd "$(dirname "$0")"

rids=("$@")
if [ ${#rids[@]} -eq 0 ]; then
  case "$(uname -s)" in
    Darwin) [ "$(uname -m)" = "arm64" ] && rids=(osx-arm64) || rids=(osx-x64) ;;
    Linux)  [ "$(uname -m)" = "aarch64" ] && rids=(linux-arm64) || rids=(linux-x64) ;;
    *)      rids=(win-x64) ;;
  esac
fi

./browser-extension/sync.sh   # mantiene la extensión con la misma traducción

rm -rf dist && mkdir -p dist
for rid in "${rids[@]}"; do
  echo "==> publicando $rid"
  dotnet publish TetrioEsPatcher.csproj -c Release -r "$rid" --self-contained \
    -p:PublishSingleFile=true -o "obj/pub/$rid"
  ext=""; [[ "$rid" == win-* ]] && ext=".exe"
  cp "obj/pub/$rid/tetrio-es-patcher$ext" "dist/tetrio-es-patcher-$rid$ext"
done

echo
echo "Listo. En dist/:"
ls -lh dist/
