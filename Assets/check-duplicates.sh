#!/usr/bin/env bash
# Detecta claves/funciones duplicadas que JS acepta en silencio (gana la ultima, sin error ni warning).
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
