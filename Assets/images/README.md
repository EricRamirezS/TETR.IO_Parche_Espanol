# Assets/images/

Imágenes de reemplazo en español.

**Convención: la misma ruta que el archivo original, dentro de `Assets/images/res/`.**
Si el juego sirve `https://tetr.io/res/altpolicy.png`, la traducción va en
`Assets/images/res/altpolicy.png`. Si sirve `https://tetr.io/res/zenith-mods/allspin.png`,
va en `Assets/images/res/zenith-mods/allspin.png` (mismas subcarpetas, mismo nombre).
Esto es necesario porque `/res/` reutiliza nombres de archivo en carpetas distintas
(por ejemplo `particles/spark.png` y `particles/beams/spark.png` son imágenes
distintas) — la ruta completa es la única clave sin ambigüedad.

**La extensión del archivo puede ser cualquiera de `.png`, `.jpg`/`.jpeg`, `.webp`
o `.svg`, independientemente de la extensión original.** Por ejemplo, `tetrio.js`
pide `skins/board/zenith/base.2x.png`, pero el reemplazo puede guardarse como
`Assets/images/res/skins/board/zenith/base.2x.webp` si conviene por tamaño — la
clave que usamos para encontrarlo es la ruta *sin* extensión, así que el formato
no tiene que coincidir con el original. Solo debe existir un único archivo por
clave: si hubiera a la vez `base.2x.png` y `base.2x.webp`, el build falla con un
error en vez de elegir uno en silencio.

`build-translation.sh` / `.ps1` recorren esta carpeta de forma recursiva, convierten
cada archivo a base64 y generan en `translation.js` la constante:

```js
const replacementImages = {
    "altpolicy": "data:image/png;base64,....",
    "zenith-mods/allspin": "data:image/png;base64,....",
    "skins/board/zenith/base.2x": "data:image/webp;base64,...."
};
```

## Dos formas de conectarlo, según cómo cargue la imagen el juego

**Si el juego la pone en una etiqueta `<img>` normal del DOM** (como `altpolicy.png`
o las cartas de `zenith-mods/`), se usa el helper `attr()` en el handler
correspondiente de `Assets/src/05-translations.js`:

```js
const img = e.querySelector("img");
if (img && replacementImages["altpolicy"]) {
    attr(img, "src", replacementImages["altpolicy"]);
}
```

**Si el juego la carga directo a un `<canvas>`/WebGL** (fondos de tablero, skins,
`tutorial.png`) — nunca pasa por el DOM, así que lo anterior no la alcanza. Para
estos casos, `Assets/src/00b-asset-interception.js` intercepta `fetch`/`XMLHttpRequest`/
`Image.src` y sustituye la petición por el reemplazo local *antes* de que el juego
la pida, usando la misma clave (ruta sin extensión) de forma automática — no hace
falta tocar ese archivo para que una imagen nueva funcione, basta con ponerla en
`Assets/images/res/` con la ruta correcta.

Tras añadir o cambiar una imagen aquí, corre `Assets/build-translation.sh` (o
`.ps1`) para regenerar `translation.js`.
