#!/usr/bin/env bash
# Reconstruye Assets/translation.js (único archivo que consumen el parche de escritorio y la extensión) a partir de Assets/src/*.js.
set -euo pipefail
cd "$(dirname "$0")"

./check-duplicates.sh

parts_before_images=(
    src/00-header.js
    src/00b-asset-interception.js
    src/00c-appcode-string-patch.js
    src/01-data-countries.js
    src/02-data-achievements.js
    src/03-data-badges.js
    src/04-data-status.js
)

parts_after_images=(
    src/05-translations.js
    src/06-room-config.js
    src/07-messages.js
    src/08-dom-helpers.js
    src/09-observer.js
)

for part in "${parts_before_images[@]}" "${parts_after_images[@]}"; do
    if [ ! -f "$part" ]; then
        echo "Falta $part" >&2
        exit 1
    fi
done

# Clave = ruta relativa a images/res/ SIN extension (a proposito: el formato del reemplazo no tiene por que coincidir con el que pide tetrio.js).
images_block() {
    echo "const replacementImages = {"

    local entries=()
    local -A seen_keys=()
    if [ -d images/res ]; then
        while IFS= read -r f; do
            [ -z "$f" ] && continue

            local ext
            ext="$(echo "${f##*.}" | tr '[:upper:]' '[:lower:]')"
            local mime=""
            case "$ext" in
                png) mime="image/png" ;;
                jpg|jpeg) mime="image/jpeg" ;;
                webp) mime="image/webp" ;;
                svg) mime="image/svg+xml" ;;
            esac
            [ -z "$mime" ] && continue

            local rel="${f#images/res/}"
            rel="${rel%.*}"

            if [ -n "${seen_keys[$rel]:-}" ]; then
                echo "Dos imagenes distintas apuntan a la misma clave \"$rel\": ${seen_keys[$rel]} y $f" >&2
                exit 1
            fi
            seen_keys[$rel]=$f

            local b64
            b64="$(base64 "$f" | tr -d '\n')"   # sin -w0: portable entre GNU y BSD base64

            entries+=("    \"$rel\": \"data:$mime;base64,$b64\"")
        done < <(find images/res -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.webp" -o -iname "*.svg" \) | sort)
    fi

    if [ ${#entries[@]} -gt 0 ]; then
        local IFS=$',\n'
        printf '%s' "${entries[0]}"
        for ((i = 1; i < ${#entries[@]}; i++)); do
            printf ',\n%s' "${entries[$i]}"
        done
        printf '\n'
    fi

    echo "};"
    echo ""
}

assembled="$(mktemp)"
trap 'rm -f "$assembled"' EXIT

{
    cat "${parts_before_images[@]}"
    images_block
    cat "${parts_after_images[@]}"
} > "$assembled"

if ! command -v npx >/dev/null 2>&1; then
    echo "Hace falta Node.js (para \"npx terser\") para generar translation.js minificado: https://nodejs.org" >&2
    exit 1
fi

npx --yes terser@5 "$assembled" --compress --mangle --comments false -o translation.js

echo "translation.js regenerado y minificado ($(wc -c < translation.js) bytes)."
