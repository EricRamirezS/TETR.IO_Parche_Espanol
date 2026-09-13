/* ======================================
===== INTERCEPCION DE ASSETS (/res/) ====
====================================== */

// Algunas imagenes de /res/ las carga tetrio.js directo a un <canvas>/WebGL
// (fondos de tablero, particulas, skins) en vez de insertarlas como <img> del
// DOM -> no se pueden traducir despues (una vez cargadas ya quedaron "horneadas"
// en una textura), hay que sustituirlas ANTES de que el juego las pida.
//
// Por eso este bloque tiene que ejecutarse lo antes posible: preload.js
// siempre corre antes que el script de la pagina, y en la extension el
// manifest usa "run_at": "document_start" para llegar a tiempo.
//
// Nunca tocamos el codigo de tetrio.js: solo interceptamos APIs estandar del
// navegador (fetch, XMLHttpRequest, Image/HTMLImageElement) que cualquier
// cargador de assets tiene que usar. Si una imagen se carga por otra via
// (por ejemplo un "background-image" de CSS) esto no la alcanza.

function resKeyFromUrl(url) {
    if (!url) return null;

    try {
        const marker = "/res/";
        const pathname = new URL(url, location.href).pathname;
        const idx = pathname.indexOf(marker);

        return idx === -1 ? null : pathname.slice(idx + marker.length);
    } catch {
        return null;
    }
}

function localReplacementFor(url) {
    const key = resKeyFromUrl(url);
    return key ? replacementImages[key] : undefined;
}

(() => {
    const originalFetch = window.fetch?.bind(window);

    if (!originalFetch) return;

    window.fetch = function (input, init) {
        const url = typeof input === "string" ? input : input?.url;
        const local = localReplacementFor(url);

        return local ? originalFetch(local) : originalFetch(input, init);
    };
})();

(() => {
    const originalOpen = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function (method, url, ...rest) {
        const local = localReplacementFor(url);
        return originalOpen.call(this, method, local || url, ...rest);
    };
})();

(() => {
    const descriptor =
        Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src") ||
        Object.getOwnPropertyDescriptor(Object.getPrototypeOf(HTMLImageElement.prototype), "src");

    if (!descriptor || !descriptor.set) return;

    Object.defineProperty(HTMLImageElement.prototype, "src", {
        configurable: true,
        enumerable: descriptor.enumerable,
        get: descriptor.get,
        set(value) {
            const local = localReplacementFor(value);
            descriptor.set.call(this, local || value);
        }
    });
})();
