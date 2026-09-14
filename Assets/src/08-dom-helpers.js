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

// La tecla "Meta" es Windows en Windows/Linux, pero CMD (⌘) en Mac.
const IS_MAC_PLATFORM = /Mac/.test(navigator.platform || "");

// "REASON: X" del modal de error de conexion; vienen de it._CLOSE_CODES en tetrio.js. Un motivo fuera de este diccionario (texto libre del servidor) se deja tal cual.
const CONNECTION_CLOSE_REASONS = {
    "ribbon closed normally": "conexion cerrada normalmente",
    "client closed ribbon": "el cliente cerro la conexion",
    "protocol error": "error de protocolo",
    "protocol violation": "violacion de protocolo",
    "no error provided": "no se proporciono un error",
    "ribbon lost": "conexion perdida",
    "payload data corrupted": "datos corruptos",
    "too much data": "demasiados datos",
    "negotiation error": "error de negociacion",
    "server error": "error del servidor",
    "server restarting": "el servidor se esta reiniciando",
    "temporary error": "error temporal",
    "bad gateway": "error de gateway",
    "TLS error": "error de TLS",
    "ping timeout": "tiempo de espera agotado",
    "failed to connect": "no se pudo conectar"
};

// Claves = KeyboardEvent.code en mayusculas (ARROWLEFT, SHIFTLEFT, KEYZ...); cubre todo el layout estandar, no solo las teclas por defecto.
const KEYBOARD_CODE_NAMES = {
    "SPACE": "ESPACIO",
    "TAB": "TABULADOR",
    "ENTER": "INTRO",
    "NUMPADENTER": "INTRO NUMPAD",
    "BACKSPACE": "RETROCESO",
    "ESCAPE": "ESCAPE",
    "CAPSLOCK": "BLOQ MAYUS",
    "DELETE": "SUPR",
    "INSERT": "INSERTAR",
    "HOME": "INICIO",
    "END": "FIN",
    "PAGEUP": "RE PAG",
    "PAGEDOWN": "AV PAG",
    "PRINTSCREEN": "IMPR PANT",
    "SCROLLLOCK": "BLOQ DESPL",
    "PAUSE": "PAUSA",
    "CONTEXTMENU": "MENU CONTEXTUAL",
    "NUMLOCK": "BLOQ NUM",

    "ARROWLEFT": "IZQUIERDA",
    "ARROWRIGHT": "DERECHA",
    "ARROWUP": "ARRIBA",
    "ARROWDOWN": "ABAJO",

    "SHIFTLEFT": "MAYUS IZQUIERDA",
    "SHIFTRIGHT": "MAYUS DERECHA",
    "CONTROLLEFT": "CTRL IZQUIERDO",
    "CONTROLRIGHT": "CTRL DERECHO",
    "ALTLEFT": "ALT IZQUIERDO",
    "ALTRIGHT": "ALT DERECHO",
    "METALEFT": IS_MAC_PLATFORM ? "COMANDO IZQUIERDA" : "WINDOWS IZQUIERDA",
    "METARIGHT": IS_MAC_PLATFORM ? "COMANDO DERECHA" : "WINDOWS DERECHA",

    "BACKQUOTE": "ACENTO GRAVE",
    "MINUS": "GUION",
    "EQUAL": "IGUAL",
    "BRACKETLEFT": "CORCHETE IZQUIERDO",
    "BRACKETRIGHT": "CORCHETE DERECHO",
    "BACKSLASH": "BARRA INVERTIDA",
    "SEMICOLON": "PUNTO Y COMA",
    "QUOTE": "COMILLA",
    "COMMA": "COMA",
    "PERIOD": "PUNTO",
    "SLASH": "BARRA",
    "INTLBACKSLASH": "MENOR QUE",

    "NUMPADADD": "SUMAR",
    "NUMPADSUBTRACT": "RESTAR",
    "NUMPADMULTIPLY": "MULTIPLICAR",
    "NUMPADDIVIDE": "DIVIDIR",
    "NUMPADDECIMAL": "DECIMAL",
    "NUMPADEQUAL": "IGUAL NUMPAD",
    "NUMPADCOMMA": "COMA NUMPAD",

    "AUDIOVOLUMEUP": "SUBIR VOLUMEN",
    "AUDIOVOLUMEDOWN": "BAJAR VOLUMEN",
    "AUDIOVOLUMEMUTE": "SILENCIAR",
    "MEDIAPLAYPAUSE": "REPRODUCIR/PAUSA",
    "MEDIASTOP": "DETENER",
    "MEDIATRACKNEXT": "SIGUIENTE PISTA",
    "MEDIATRACKPREVIOUS": "PISTA ANTERIOR"
};

function normalizeKeybindName(value) {
    if (value === "[NOT SET]") return "[SIN DEFINIR]";
    if (KEYBOARD_CODE_NAMES[value]) return KEYBOARD_CODE_NAMES[value];
    if (/^KEY[A-Z]$/.test(value)) return value.slice(3);
    if (/^DIGIT[0-9]$/.test(value)) return value.slice(5);
    return value;
}

// Formato corto de home.html ("LEFT, NUMPAD4", "UP (or W)..."), no KeyboardEvent.code: se traduce palabra por palabra en vez de normalizeKeybindName.
const KEYBIND_REFERENCE_WORDS = {
    "LEFT": "IZQUIERDA",
    "RIGHT": "DERECHA",
    "UP": "ARRIBA",
    "DOWN": "ABAJO",
    "SPACE": "ESPACIO",
    "SHIFT": "MAYUS",
    "ENTER": "INTRO",
    "BACKSPACE": "RETROCESO",
    "TAB": "TABULADOR",
    "or": "o"
};

function translateKeybindReference(value) {
    return Object.entries(KEYBIND_REFERENCE_WORDS).reduce(
        (text, [en, es]) => text.replace(new RegExp(`\\b${en}\\b`, "g"), es),
        value
    );
}

// tetrio.js usa dos plantillas: "CYCLED <b>X</b> AGO" (pasado) o "CYCLES IN <b>X</b>" (futuro); se distinguen por si hay texto "AGO" despues del <b>.
function translateZenithTimer(timer, futureText, pastText) {
    if (!timer) return;

    const bold = timer.querySelector("b");
    if (!bold) return;

    const afterBold = bold.nextSibling;
    const isPast = afterBold && afterBold.nodeType === Node.TEXT_NODE && afterBold.textContent.includes("AGO");

    const prefixNode = timer.firstChild;
    if (prefixNode && prefixNode.nodeType === Node.TEXT_NODE) {
        const newPrefix = isPast ? pastText : futureText;
        if (prefixNode.textContent !== newPrefix) {
            prefixNode.textContent = newPrefix;
        }
    }

    if (isPast) {
        const newSuffix = afterBold.textContent.replace(/\s*AGO\s*/, "");
        if (newSuffix !== afterBold.textContent) {
            afterBold.textContent = newSuffix;
        }
    }

    const value = bold.textContent;
    const translated = value
        .replace(/\bYEARS\b/, "ANOS")
        .replace(/\bMONTHS\b/, "MESES")
        .replace(/\bWEEKS\b/, "SEMANAS")
        .replace(/\bDAYS\b/, "DIAS")
        .replace(/\bHOURS\b/, "HORAS")
        .replace(/\bMINUTES\b/, "MINUTOS")
        .replace(/\bSECONDS\b/, "SEGUNDOS");

    if (translated !== value) {
        bold.textContent = translated;
    }
}

// Devuelve true si tradujo algo (para encadenar "si no, prueba otra cosa").
function translateByDict(e, dict) {
    const value = e.textContent.trim();
    const translated = dict[value];

    if (translated && translated !== value) {
        text(e, translated);
        return true;
    }

    return false;
}

// Igual que translateByDict, pero sobre un atributo (normalmente "title").
function translateAttrByDict(e, attrName, dict) {
    const value = e.getAttribute(attrName);
    const translated = dict[value];

    if (translated && translated !== value) {
        attr(e, attrName, translated);
        return true;
    }

    return false;
}

// Sustituye un termino dentro del texto, en vez de reemplazarlo completo como translateByDict.
function replaceTerm(e, from, to) {
    const value = e.textContent;
    const translated = value.replace(from, to);

    if (translated !== value) {
        text(e, translated);
    }
}

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

// Compartido por zenith_deck_infos y notifications ("desbloqueaste el mod X").
const ZENITH_MOD_NAMES = {
    "ADD OR REMOVE MODS": "AGREGAR O QUITAR MODS",
    "EXPERT MODE": "MODO EXPERTO",
    "DOUBLE HOLE GARBAGE": "BASURA DE DOBLE AGUJERO",
    "VOLATILE GARBAGE": "BASURA VOLATIL",
    "GRAVITY": "GRAVEDAD",
    "NO HOLD": "SIN RESERVA",
    "MESSIER GARBAGE": "BASURA MAS DESORDENADA",
    "INVISIBLE": "INVISIBLE",
    "ALL-SPIN": "TODOS LOS SPINS",
    "DUO": "DUO"
};

// Mismos mods en Title Case (asi va el atributo "title" de tetrio.js); claves distintas de ZENITH_MOD_NAMES (en MAYUSCULAS) porque JS distingue mayus/minus.
const ZENITH_MOD_TITLES = {
    "Invisible": "Invisible",
    "Messier Garbage": "Basura Mas Desordenada",
    "Volatile Garbage": "Basura Volatil",
    "No Hold": "Sin Reserva",
    "Double Hole Garbage": "Basura de Doble Agujero",
    "All-Spin": "Todos los Spins",
    "Gravity": "Gravedad",
    "Expert Mode": "Modo Experto",
    "Duo": "Duo",
    "Snowball Board": "Tablero de Bola de Nieve",
    "Permafrost Board": "Tablero de Permafrost",
    "The Exile": "El Exiliado",
    "Loaded Dice": "Dados Cargados",
    "Last Stand": "Ultima Resistencia",
    "Asceticism": "Ascetismo",
    "Damnation": "Condenacion",
    "The Warlock": "El Brujo",
    "Freefall": "Caida Libre",
    "The Tyrant": "El Tirano",
    "Bleeding Hearts": "Corazones Sangrantes"
};

// Cubre resultados, records, party y embeds de chat.
function translateModTitles(root) {
    root.querySelectorAll("img[title]").forEach(img => translateAttrByDict(img, "title", ZENITH_MOD_TITLES));
}

const RECORD_LIST_GAMEMODES = {
    "RECENT": "RECIENTES",
    "40 LINES": "40 LINEAS",
    "BLITZ": "BLITZ",
    "QUICK PLAY": "PARTIDA RAPIDA",
    "expert quick play": "partida rapida experta",
    "TETRA LEAGUE": "LIGA TETRA"
};

// Compartido por tetra_myrecords y tetra_records (leaderboard): misma estructura.
function translateRecordList(e) {
    e.querySelectorAll(".scroller_block.nothing").forEach(el => {
        if (el.textContent.trim() === "NO RECORDS") {
            text(el, "SIN REGISTROS");
        }
    });

    e.querySelectorAll(".record_owner").forEach(el => {
        el.childNodes.forEach(node => {
            if (node.nodeType !== Node.TEXT_NODE) {
                return;
            }

            const value = node.textContent;

            const translated = value
                .replace(/\b40 LINES\b/g, "40 LINEAS")
                .replace(/\bQUICK PLAY\b/g, "PARTIDA RAPIDA")
                .replace(/\btetra league\b/g, "liga tetra")
                .replace(/\bTETRA LEAGUE\b/g, "LIGA TETRA");

            if (translated !== value) {
                node.textContent = translated;
            }
        });
    });

    e.querySelectorAll(".record_extra").forEach(el => {
        el.childNodes.forEach(node => {
            if (node.nodeType !== Node.TEXT_NODE) {
                return;
            }

            const value = node.textContent;

            const translated = value
                .replace(/\bpieces\b/g, "piezas")
                .replace(/\bavg\. speed\b/g, "velocidad media")
                .replace(/\bpeak\b/g, "maximo")
                .replace(/\bKO's\b/g, "KO");

            if (translated !== value) {
                node.textContent = translated;
            }
        });
    });

    e.querySelectorAll(".record_result").forEach(el => {
        el.childNodes.forEach(node => {
            if (node.nodeType !== Node.TEXT_NODE) {
                return;
            }

            const value = node.textContent;

            const translated = value
                .replace("íîïîêý", "íîûûøýê")
                .replace("ÿòìýøûĂ", "ÿòìýøûòê");

            if (translated !== value) {
                node.textContent = translated;
            }
        });
    });

    translateModTitles(e);
}

// Compartido por el toast de notificaciones y el panel lateral: misma estructura.
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

// Bloque name/lower/upper de .video_stat en el panel de video.
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

