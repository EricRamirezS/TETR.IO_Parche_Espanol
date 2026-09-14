/* ======================================
===== INTERCEPCION DE ASSETS (/res/) ====
====================================== */

// Algunas imagenes de /res/ las carga tetrio.js directo a un <canvas>/WebGL
// en vez de un <img> del DOM -> hay que sustituirlas ANTES de que el juego
// las pida, interceptando fetch/XHR/Image igual que cualquier cargador de
// assets. Por eso corre lo antes posible (preload.js, o document_start en
// la extension).

// Sin extension a proposito: la clave es la RUTA que pide el juego, no el
// formato del reemplazo (asi un .webp puede reemplazar un .png). Solo quita
// el ULTIMO "punto+extension" (p.ej. "base.2x.png" -> "base.2x").
function stripExtension(path) {
    return path.replace(/\.[a-zA-Z0-9]+$/, "");
}

function resKeyFromUrl(url) {
    if (!url) return null;

    try {
        const marker = "/res/";
        const pathname = new URL(url, location.href).pathname;
        const idx = pathname.indexOf(marker);

        return idx === -1 ? null : stripExtension(pathname.slice(idx + marker.length));
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
