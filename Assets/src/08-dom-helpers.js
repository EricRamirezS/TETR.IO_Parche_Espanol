function attr(e, a, t) {
    if (e.getAttribute(a) == t) return;
    e.setAttribute(a, t);
}

function scroller_item(e, h, p = null) {
    text(e.querySelector("h1"), h);
    if (p) text(e.querySelector("p"), p);
}

function text(e, t) {
    if (e.innerHTML == t) return;
    e.innerHTML = t;
}

// Idiom repetido ~28 veces en 05-translations.js: buscar el texto actual en un
// diccionario y reemplazarlo si hay traduccion. `dict` nunca se llama
// "translations" aqui para no sombrear la constante global del mismo nombre.
// Devuelve true si tradujo algo, por si el llamador necesita encadenar un
// "si no, prueba otra cosa" (ver footer_text).
function translateByDict(e, dict) {
    const value = e.textContent.trim();
    const translated = dict[value];

    if (translated && translated !== value) {
        text(e, translated);
        return true;
    }

    return false;
}

// Igual que translateByDict, pero mirando un atributo (normalmente "title")
// en vez del texto visible.
function translateAttrByDict(e, attrName, dict) {
    const value = e.getAttribute(attrName);
    const translated = dict[value];

    if (translated && translated !== value) {
        attr(e, attrName, translated);
        return true;
    }

    return false;
}

// Para los sitios que solo necesitan sustituir un termino dentro de un texto
// mas largo (en vez de reemplazar el texto completo como translateByDict).
function replaceTerm(e, from, to) {
    const value = e.textContent;
    const translated = value.replace(from, to);

    if (translated !== value) {
        text(e, translated);
    }
}

// Repetido 3 veces de forma casi identica (carga inicial, cambios de texto en
// vivo, y el observer de respaldo): una sola fuente de verdad.
const GLOBAL_SHOUTS = {
    "GAME OVER": "FIN DEL JUEGO",
    "TWO-MINUTE BLITZ": "BLITZ DE DOS MINUTOS",
    "CLEAR 40 LINES!": "¡COMPLETA 40 LINEAS!",
    "CUSTOM GAME": "PARTIDA PERSONALIZADA",
    "TETRA LEAGUE": "LIGA TETRA"
};

function translateGlobalShouts() {
    document.querySelectorAll(".globalshouts .shout").forEach(shout => translateByDict(shout, GLOBAL_SHOUTS));
}

// Repetido en league_chat_container y room_chat_container con diferencias
// menores (a room_chat_container le faltaba una entrada y tenia un typo:
// "inicio" sin tilde en vez de "inicio" del verbo "iniciar"). Una sola copia,
// completa.
const CHAT_SYSTEM_MESSAGES = {
    "Welcome to chat! Please remember to be civil to your opponents.":
        "¡Bienvenido al chat! Recuerda respetar a tus oponentes.",

    "Welcome to Quick Play chat! Please remember to be civil to your opponents - chat is actively monitored.":
        "¡Bienvenido al chat de Partida Rapida! Recuerda respetar a tus oponentes - el chat es supervisado activamente.",

    "Please remember to be civil to your opponent.": "Recuerda respetar a tus oponentes.",

    "game finished": "partida terminada",
    "started the game": "inició la partida",
    "disconnected": "se ha desconectado",
    "joined the room": "se ha unido a la sala",
    "joined as spectator": "se ha unido como espectador",
    "left the room": "se ha ido de la sala"
};

// Compartido por "notifications" (el toast/snotify emergente) y
// "social_notifications_content" (el panel lateral de notificaciones): ambos
// muestran la misma estructura para "conseguiste un logro" (h1 + nombre del
// logro + descripcion + "Previous: X (Floor N) (hace Y)" / "New: Z"), pero
// el toast nunca tuvo esta logica -> los logros aparecian sin traducir ahi.
// De paso, "Floor" tampoco se traducia en ninguno de los dos sitios.
function applyAchievementNotification(notification) {
    const h1 = notification.querySelector("h1");

    if (h1) {
        translateByDict(h1, { "Achievement get!": "¡Logro obtenido!" });
    }

    const name = notification.querySelector("p > b:first-child");

    if (name) {
        const value = name.textContent.trim();
        const translated = achievementTranslations.names[value] || achievementTranslations.names[value.toUpperCase()];

        if (translated) {
            const formatted = matchCapitalization(value, translated);

            if (formatted !== value) {
                text(name, formatted);
            }
        }
    }

    const description = notification.querySelector("p > span");

    if (description) {
        translateByDict(description, achievementTranslations.descriptions);
    }

    notification.querySelectorAll("p").forEach(p => {
        p.childNodes.forEach(node => {
            if (node.nodeType !== Node.TEXT_NODE) {
                return;
            }

            const value = node.textContent;

            const translated = value
                .replace("Previous:", "Anterior:")
                .replace("New:", "Nuevo:")
                .replace("Floor", "Piso")
                .replace("days ago", "dias atras")
                .replace("day ago", "dia atras")
                .replace("hours ago", "horas atras")
                .replace("hour ago", "hora atras")
                .replace("minutes ago", "minutos atras")
                .replace("minute ago", "minuto atras");

            if (translated !== value) {
                node.textContent = translated;
            }
        });

        p.querySelectorAll("b").forEach(b => replaceTerm(b, "Floor", "Piso"));
    });
}

// Repetido 20 veces en 05-translations.js: el bloque "cuanto mas, cuanto
// menos" (name/lower/upper) que cuelga de .video_stat en el panel de video.
function video_stat(e, name, lower, upper, title) {
    const stat = e.closest(".video_stat");

    if (!stat) return;

    const nameEl = stat.querySelector(".stat_name");
    const lowerEl = stat.querySelector(".stat_range_lower");
    const upperEl = stat.querySelector(".stat_range_upper");

    if (nameEl) text(nameEl, name);
    if (lowerEl) text(lowerEl, lower);
    if (upperEl) text(upperEl, upper);

    if (title) attr(stat, "title", title);
}

