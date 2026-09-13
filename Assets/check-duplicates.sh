#!/usr/bin/env bash
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
# Uso: ./check-duplicates.sh   (exit 0 si no hay problemas, 1 si encuentra algo)
set -euo pipefail
cd "$(dirname "$0")/src"

status=0

dup_keys="$(grep -oE '^    "([^"\\]|\\.)*"' 05-translations.js | sort | uniq -d)"
if [ -n "$dup_keys" ]; then
    echo "Claves duplicadas en 05-translations.js (la ultima definicion gana, las anteriores quedan muertas):"
    echo "$dup_keys"
    status=1
fi

dup_fns="$(grep -hoE '^function [a-zA-Z0-9_]+' *.js | sort | uniq -c | sort -rn | awk '$1>1 {print $2}')"
if [ -n "$dup_fns" ]; then
    echo "Funciones declaradas mas de una vez en Assets/src/*.js:"
    echo "$dup_fns"
    status=1
fi

if [ "$status" -eq 0 ]; then
    echo "Sin duplicados."
fi

exit $status
