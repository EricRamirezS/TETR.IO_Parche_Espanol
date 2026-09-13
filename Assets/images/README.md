# Assets/images/

Imágenes de reemplazo en español.

**Convención: la misma ruta que el archivo original, dentro de `Assets/images/res/`.**
Si el juego sirve `https://tetr.io/res/altpolicy.png`, la traducción va en
`Assets/images/res/altpolicy.png`. Si sirve `https://tetr.io/res/zenith-mods/allspin.png`,
va en `Assets/images/res/zenith-mods/allspin.png` (mismas subcarpetas, mismo nombre).
Esto es necesario porque `/res/` reutiliza nombres de archivo en carpetas distintas
(por ejemplo `particles/spark.png` y `particles/beams/spark.png` son imágenes
distintas) — la ruta completa es la única clave sin ambigüedad.

`build-translation.sh` / `.ps1` recorren esta carpeta de forma recursiva (`*.png`,
`*.jpg`, `*.jpeg`, `*.svg`), convierten cada archivo a base64 y generan en
`translation.js` la constante:

```js
const replacementImages = {
    "altpolicy.png": "data:image/png;base64,....",
    "zenith-mods/allspin.png": "data:image/png;base64,...."
};
```

La clave es la ruta relativa a `Assets/images/`, con extensión y siempre con `/`.
Se usa con el helper `attr()` existente:

```js
const img = e.querySelector("img");
if (img && replacementImages["altpolicy.png"]) {
    attr(img, "src", replacementImages["altpolicy.png"]);
}
```

**Importante:** esto solo funciona con imágenes que el juego pone en una etiqueta
`<img>` normal del DOM (como `altpolicy.png` o las cartas de `zenith-mods/`). Las
texturas que `tetrio.js` carga directo a un canvas/WebGL (fondos de tablero,
partículas, skins) no pasan por el DOM y este mecanismo no las alcanza — necesitan
un enfoque distinto (interceptar la carga antes de que ocurra).

Tras añadir o cambiar una imagen aquí, corre `Assets/build-translation.sh` (o
`.ps1`) para regenerar `translation.js`.
