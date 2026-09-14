/* ======================================
==== PARCHE DE STRINGS EN tetrio.js =====
====================================== */

// Texto de HUD dibujado con bitmap font (sin DOM que interceptar): se reemplaza el string literal en tetrio.js antes de ejecutarlo.
// tetrio.js se carga por fetch/XHR (bootstrap.js arma un Blob), igual que las imagenes en 00b-asset-interception.js.
const APP_CODE_URL_SUFFIX = "/js/tetrio.js";

const APP_CODE_STRING_REPLACEMENTS = [
    ['"GO!"', '"¡YA!"'],

    // Cuenta regresiva de zenithex: "ready"/"set" antes del "GO!" de arriba.
    ['"ready"', '"preparados"'],
    ['"set"', '"listos"'],

    // Aviso de auto-XSS que TETR.IO imprime en la consola del navegador.
    [
        "Please be careful when pasting anything in the console. Attackers may be out to steal your login information.",
        "Ten cuidado al pegar cualquier cosa en la consola. Los atacantes podrian intentar robar tu informacion de inicio de sesion."
    ],

    // Traducido en el fuente (no en 05-translations.js) para evitar el parpadeo en ingles: tetrio.js lo rellena async tras mostrar el modal.
    [
        "<br>this disconnect was detected to be caused by your network connection.",
        "<br>este corte se detecto como causado por tu conexion de red."
    ],
    [
        "<br>due to browser limitations, tabbing out of TETR.IO midgame may cause disconnects.",
        "<br>por limitaciones del navegador, cambiar de pestaña durante una partida de TETR.IO puede causar desconexiones."
    ],
    [
        "<br>if you are certain this error is not on your side, please report it.",
        "<br>si estas seguro de que este error no es de tu lado, por favor reportalo."
    ],

    // Easter egg anti-devtools (arte ASCII al pausar en el depurador) ancho fijo de 98 columnas.
    ["Press F12 to close this screen.", "Presiona F12 para cerrar esta pantalla."],
    [
        " ▄                IF SOMEONE TOLD YOU TO OPEN THIS PANEL, YOU ARE BEING SCAMMED!                 ▄",
        " ▄                SI ALGUIEN TE DIJO QUE ABRIERAS ESTE PANEL, TE ESTAN ESTAFANDO!                ▄"
    ],
    [
        "█▀   The Developer Tools panel can allow an attacker to steal your login information and more.  █▀",
        "█▀           Las Herramientas de Desarrollador permiten robar tu info de sesion y mas.          █▀"
    ],
    [
        " ▄                  This program is proprietary software. It is licensed                         ▄\\n█▀                  to you (the player) for the purpose of playing TETR.IO.                     █▀\\n ▄                  Without express written permission, you may not copy,                        ▄\\n█▀                  reproduce, distribute, publish, display, perform, modify,                   █▀\\n ▄                  create derivative works, transmit, or in any way exploit                     ▄\\n█▀                  this software, unless as strictly necessary for the given                   █▀\\n ▄                  purpose of the software.                                                     ▄",
        " ▄                  Este programa es software propietario.                                       ▄\\n█▀                  Tiene licencia (para ti, el jugador) para jugar TETR.IO.                    █▀\\n ▄                  Sin permiso expreso por escrito, no puedes copiar,                           ▄\\n█▀                  reproducir, distribuir, publicar, mostrar, ejecutar,                        █▀\\n ▄                  modificar, crear trabajos derivados, transmitir,                             ▄\\n█▀                  ni explotar de ninguna manera este software, salvo                          █▀\\n ▄                  que sea estrictamente necesario para dicho proposito.                        ▄"
    ],
    [
        " ▄                     ████▀▀████    Modifications to gameplay   ████▀▀████                      ▄",
        " ▄                     ████▀▀████    Modificar la jugabilidad   ████▀▀████                       ▄"
    ],
    [
        "█▀                    █████▄▄█████    are strictly forbidden!   █████▄▄█████                    █▀",
        "█▀                    █████▄▄█████    esta prohibido!         █████▄▄█████                      █▀"
    ],

    // TRIPLE y PENTA+ ("KAGARIS") se escriben igual en español, sin traducir.
    ['"VOID"', '"VACIO"'],
    ['"SINGLE"', '"SIMPLE"'],
    ['"DOUBLE"', '"DOBLE"'],
    ['"QUAD"', '"CUADRUPLE"'],

    // Sin comillas: aparece solo, combinado o con contador de racha.
    ['CLUTCH', 'SALVADA'],

    // Pisos de la Torre Zenith + la etiqueta "FLOOR".
    ['FLOOR ', 'PISO '],
    ['"HALL OF BEGINNINGS"', '"SALON DE LOS INICIOS"'],
    ['"THE HOTEL"', '"EL HOTEL"'],
    ['"THE CASINO"', '"EL CASINO"'],
    ['"THE ARENA"', '"LA ARENA"'],
    ['"THE MUSEUM"', '"EL MUSEO"'],
    ['"ABANDONED OFFICES"', '"OFICINAS ABANDONADAS"'],
    ['"THE LABORATORY"', '"EL LABORATORIO"'],
    ['"THE CORE"', '"EL NUCLEO"'],
    ['"CORRUPTION"', '"CORRUPCION"'],
    ['"PLATFORM OF THE GODS"', '"PLATAFORMA DE LOS DIOSES"'],

    // "\n" es literal del bitmap font (2 bytes), por eso "\\n" aqui. btb/btb_short se dejan sin traducir: jerga de Tetris igual en español.
    ["ALL\\nCLEAR", "DESPEJE\\nPERFECTO"],
    ["COLOR\\nCLEAR", "DESPEJE\\nDE COLOR"],
    ["LEVEL\\nCOMPLETE", "NIVEL\\nCOMPLETO"],

    // Solo para el texto de compartir en X/Twitter (nunca llega al DOM); codigos de 2 letras, se reemplaza el objeto completo (ver ZENITH_MOD_TITLES en 08-dom-helpers.js para el nombre largo, que si es DOM).
    [
        'zenithModsShort:{invisible:"IN",messy:"MS",volatile:"VL",nohold:"NH",doublehole:"DH",allspin:"AS",gravity:"GV",expert:"EX",duo:"2P",snowman:"SNOWBALL",snowman_reversed:"SNOWBALL-R",invisible_reversed:"IN-R",messy_reversed:"MS-R",volatile_reversed:"VL-R",nohold_reversed:"NH-R",doublehole_reversed:"DH-R",allspin_reversed:"AS-R",gravity_reversed:"GV-R",expert_reversed:"EX-R",duo_reversed:"2P-R"}',
        'zenithModsShort:{invisible:"IN",messy:"BD",volatile:"BV",nohold:"SR",doublehole:"DA",allspin:"TS",gravity:"GR",expert:"EX",duo:"2P",snowman:"NIEVE",snowman_reversed:"NIEVE-R",invisible_reversed:"IN-R",messy_reversed:"BD-R",volatile_reversed:"BV-R",nohold_reversed:"SR-R",doublehole_reversed:"DA-R",allspin_reversed:"TS-R",gravity_reversed:"GR-R",expert_reversed:"EX-R",duo_reversed:"2P-R"}'
    ],

    // Etiquetas de los contadores del tablero (canvas), distinto del dict de list_request_scroller (el MENU, que si es DOM); valores muy cortos/comunes, se reemplaza el objeto completo.
    [
        'static DisplayCounters={timer:"time",stopwatch:"time",level:"level",lines:"lines",allclears:"all clears",hold:"hold",pieces:"pieces",pieces_duo:"pieces",finesse_l:"finesse",finesse:"finesse",keys:"inputs",score:"score",spp:"score",garbage:"garbage",attack:"attack",attack_duo:"attack",vs:"VS score",kills:"KO\'s",kills_duo:"KO\'s",placement:"placement"}',
        'static DisplayCounters={timer:"tiempo",stopwatch:"tiempo",level:"nivel",lines:"lineas",allclears:"despejes perfectos",hold:"reserva",pieces:"piezas",pieces_duo:"piezas",finesse_l:"precision",finesse:"precision",keys:"entradas",score:"puntuacion",spp:"puntuacion",garbage:"basura",attack:"ataque",attack_duo:"ataque",vs:"puntuacion VS",kills:"eliminados",kills_duo:"eliminados",placement:"posicion"}'
    ],

    // Las 3 llamadas de "X PLAYERS LEFT" (100/30/10) comparten sufijo.
    ["\\fc3PLAYERS LEFT", "\\fc3JUGADORES RESTANTES"],
    ["\\fc3PLAYING NOW", "\\fc3JUGANDO AHORA"],

    // Los 79 desafios de "revivir" en Duo
    // + (frases cortas son prefijo de otras mas largas).
    ["Perform a 3-Combo", "Realiza un Combo de 3"],
    ["Clear 2 Doubles", "Despeja 2 Dobles"],
    ["Clear a Quad", "Despeja un Cuadruple"],
    ["Clear 6 Lines", "Despeja 6 Lineas"],
    ["Clear a Single\\nusing an O-Piece", "Despeja un Simple\\nusando una pieza O"],
    ["Clear a Double\\nusing an O-Piece", "Despeja un Doble\\nusando una pieza O"],
    ["Clear a Double\\nusing an S or Z-Piece", "Despeja un Doble\\nusando una pieza S o Z"],
    ["Clear a Triple\\nusing an L or J-Piece", "Despeja un Triple\\nusando una pieza L o J"],
    ["Clear 3 lines\\nwhile holding an I-Piece", "Despeja 3 lineas\\nmanteniendo una pieza I en RESERVA"],
    ["Use Hold 8 times", "Usa RESERVA 8 veces"],
    ["Rotate 20 times", "Rota 20 veces"],
    ["Clear 2 Singles in a row", "Despeja 2 Simples seguidos"],
    ["Perform any Spin", "Realiza cualquier Spin"],
    ["Clear a T-Spin Single", "Despeja un T-Spin Simple"],
    ["Clear a T-Spin Double", "Despeja un T-Spin Doble"],
    ["Clear an S/Z-Spin", "Despeja un S/Z-Spin"],
    ["Clear an L/J-Spin", "Despeja un L/J-Spin"],
    ["Perform a 5-Combo", "Realiza un Combo de 5"],
    ["Clear 2 Lines using\\nhorizontal I-Pieces", "Despeja 2 Lineas usando\\npiezas I horizontales"],
    ["Place 20 pieces", "Coloca 20 piezas"],
    ["Send 6 Attack", "Envia 6 de Ataque"],
    ["Place 2 O-Pieces\\nin a row", "Coloca 2 piezas O\\nseguidas"],
    ["Place 12 pieces while only\\nrotating counterclockwise", "Coloca 12 piezas rotando\\nsolo en sentido antihorario"],
    ["Clear 6 Singles without\\nstarting a combo", "Despeja 6 Simples sin\\niniciar un combo"],
    ["Clear 4 Doubles", "Despeja 4 Dobles"],
    ["Place 3 pieces in a row\\nwithout moving or rotating", "Coloca 3 piezas seguidas\\nsin mover ni rotar"],
    ["Place 14 pieces in a row\\nwithout clearing any lines", "Coloca 14 piezas seguidas\\nsin despejar ninguna linea"],
    ["Clear 2 Doubles\\nusing S or Z-Pieces", "Despeja 2 Dobles\\nusando piezas S o Z"],
    ["Clear 2 Triples\\nusing L or J-Pieces", "Despeja 2 Triples\\nusando piezas L o J"],
    ["Clear an I-Spin", "Despeja un I-Spin"],
    ["Clear a Quad in the\\nupper half of the board", "Despeja un Cuadruple en\\nla mitad superior del tablero"],
    ["Rotate 80 times", "Rota 80 veces"],
    ["Clear a Quad\\nwhile on a 2+-Combo", "Despeja un Cuadruple\\nen un Combo de 2 o mas"],
    ["Clear 2 Singles in a row\\nusing S or Z-Pieces", "Despeja 2 Simples seguidos\\nusando piezas S o Z"],
    ["Perform a 3-Combo\\nwithout using Hold", "Realiza un Combo de 3\\nsin usar RESERVA"],
    ["Perform 3 Spins\\nthat don't clear any lines", "Realiza 3 Spins\\nque no despejen lineas"],
    ["Perform 2\\nS/Z/L/J-Spins", "Realiza 2\\nS/Z/L/J-Spins"],
    ["Clear a T-Spin Triple", "Despeja un T-Spin Triple"],
    ["Place 25 pieces in a row\\nwithout using Hold", "Coloca 25 piezas seguidas\\nsin usar RESERVA"],
    ["Clear 3 Triples", "Despeja 3 Triples"],
    ["Reach B2B x4", "Alcanza un BACK-TO-BACK x4"],
    ["Clear a Quad in\\n2 different columns", "Despeja un Cuadruple en\\n2 columnas diferentes"],
    ["Use Hold on\\n12 pieces in a row", "Usa RESERVA en\\n12 piezas seguidas"],
    ["Place 10 pieces without\\nreleasing Soft Drop", "Coloca 10 piezas sin\\nsoltar el descenso rapido"],
    ["Have part of your stack in\\nthe top 3 rows for 3 seconds", "Ten parte de tu pila en\\nlas 3 filas superiores por 3 segundos"],
    ["Clear 10 Lines without\\nclearing with T or I-pieces", "Despeja 10 Lineas sin\\ndespejar con piezas T o I"],
    ["Clear an S/Z-Spin Triple", "Despeja un S/Z-Spin Triple"],
    ["Clear 2 Doubles consecutively\\nusing two O-Pieces", "Despeja 2 Dobles consecutivos\\nusando dos piezas O"],
    ["Clear 4 T-Spin Minis", "Despeja 4 T-Spin Minis"],
    ["Send 14 Attack", "Envia 14 de Ataque"],
    ["Clear 3 Doubles\\nwith the same type of piece", "Despeja 3 Dobles\\ncon el mismo tipo de pieza"],
    ["Clear Garbage\\nusing a L/J-Spin", "Despeja Basura\\nusando un L/J-Spin"],
    ["Clear Garbage\\nusing a S/Z-Spin", "Despeja Basura\\nusando un S/Z-Spin"],
    ["Place 3 O-Pieces\\nin column 1", "Coloca 3 piezas O\\nen la columna 1"],
    ["Clear 2 Spins\\nin one combo", "Despeja 2 Spins\\nen un combo"],
    ["Clear a Single with an I-Piece\\nwithout moving or rotating", "Despeja un Simple con una pieza I\\nsin mover ni rotar"],
    ["Place 6 Pieces\\nwithout releasing DAS", "Coloca 6 piezas\\nsin soltar el DAS"],
    ["Clear 6 Lines\\nusing O-Pieces", "Despeja 6 Lineas\\nusando piezas O"],
    ["Clear Spin-Clears\\nwith 3 different pieces", "Despeja Spins\\ncon 3 piezas diferentes"],
    ["Clear 4 Quads", "Despeja 4 Cuadruples"],
    ["Place 5 pieces in a row\\nwithout moving or rotating", "Coloca 5 piezas seguidas\\nsin mover ni rotar"],
    ["Clear an L/J-Spin Triple", "Despeja un L/J-Spin Triple"],
    ["Clear 2 Quads in a row", "Despeja 2 Cuadruples seguidos"],
    ["Clear 8 Singles without doing\\nother clears or using Hold", "Despeja 8 Simples sin hacer\\notros despejes ni usar RESERVA"],
    ["Have no Garbage Lines on\\nyour board for 4 seconds", "No tengas Lineas de Basura en\\ntu tablero por 4 segundos"],
    ["Rotate 300 times", "Rota 300 veces"],
    ["Don't cancel any\\ngarbage for 8 seconds", "No canceles nada de\\nbasura por 8 segundos"],
    ["Clear a T-Spin Double\\nwith the Piece pointing up", "Despeja un T-Spin Doble\\ncon la pieza apuntando hacia arriba"],
    ["Clear a Double with an O-Piece\\nwithout moving or rotating", "Despeja un Doble con una pieza O\\nsin mover ni rotar"],
    ["Place 3 T-Pieces\\nwithout rotating any", "Coloca 3 piezas T\\nsin rotar ninguna"],
    ["Clear a T-Spin Double\\nwhile on a 2+-Combo", "Despeja un T-Spin Doble\\nen un Combo de 2 o mas"],
    ["Perform a 7-Combo", "Realiza un Combo de 7"],
    ["Clear an I-Spin Double", "Despeja un I-Spin Doble"],
    ["Clear two S/Z-Spin\\nDoubles consecutively", "Despeja dos Dobles\\nde S/Z-Spin seguidos"],
    ["Clear two L/J-Spin\\nDoubles consecutively", "Despeja dos Dobles\\nde L/J-Spin seguidos"],
    ["Perform a Color Clear", "Realiza un Despeje de Color"],
    ["Clear 40 Lines", "Despeja 40 Lineas"],
    ["Clear 4 Spins\\nin one Combo", "Despeja 4 Spins\\nen un Combo"],
    ["Clear a T-Spin Double/Triple\\ncentered in column 1 or 10", "Despeja un T-Spin Doble/Triple\\ncentrado en la columna 1 o 10"],

    // HTML embebido en cada string: se traduce el texto, el marcado queda igual. %p1/%p2 son placeholders de nombre de jugador, sin traducir.
    ['FATIGUE SETS IN…<br><span style="font-size: 0.8em;">+2 PERMANENT LINES</span>', 'LA FATIGA SE HACE PRESENTE…<br><span style="font-size: 0.8em;">+2 LINEAS PERMANENTES</span>'],
    ['YOUR BODY GROWS WEAK…<br><span style="font-size: 0.8em;">receive 25% more garbage</span>', 'TU CUERPO SE DEBILITA…<br><span style="font-size: 0.8em;">recibe 25% mas basura</span>'],
    ['ALL SENSES BLUR TOGETHER…<br><span style="font-size: 0.8em;">+3 PERMANENT LINES</span>', 'TODOS TUS SENTIDOS SE NUBLAN…<br><span style="font-size: 0.8em;">+3 LINEAS PERMANENTES</span>'],
    ['YOUR CONSCIOUSNESS FADES…<br><span style="font-size: 0.8em;">receive 25% more garbage</span>', 'TU CONCIENCIA SE DESVANECE…<br><span style="font-size: 0.8em;">recibe 25% mas basura</span>'],
    ['THIS IS THE END.<br><span style="font-size: 0.8em;">+5 PERMANENT LINES</span>', 'ESTE ES EL FIN.<br><span style="font-size: 0.8em;">+5 LINEAS PERMANENTES</span>'],
    ['YOUR POWER SLIPS…<br><span style="font-size: 0.8em;">garbage received becomes messier</span>', 'TU PODER SE ESCAPA…<br><span style="font-size: 0.8em;">la basura recibida se vuelve mas desordenada</span>'],
    ['WHISPERS OF DISCONTENT SPREAD…<br><span style="font-size: 0.8em;">receive 25% more garbage</span>', 'SUSURROS DE DESCONTENTO SE PROPAGAN…<br><span style="font-size: 0.8em;">recibe 25% mas basura</span>'],
    ['PROTESTERS LINE THE STREETS…<br><span style="font-size: 0.8em;">+3 PERMANENT LINES</span>', 'MANIFESTANTES LLENAN LAS CALLES…<br><span style="font-size: 0.8em;">+3 LINEAS PERMANENTES</span>'],
    ['YOUR CLOSEST ALLIES DEFECT…<br><span style="font-size: 0.8em;">receive 25% more garbage</span>', 'TUS ALIADOS MAS CERCANOS DESERTAN…<br><span style="font-size: 0.8em;">recibe 25% mas basura</span>'],
    ['PARANOIA CLOUDS YOUR JUDGEMENT…<br><span style="font-size: 0.8em;">+5 PERMANENT LINES</span>', 'LA PARANOIA NUBLA TU JUICIO…<br><span style="font-size: 0.8em;">+5 LINEAS PERMANENTES</span>'],
    ['THE REVOLUTION HAS BEGUN…<br><span style="font-size: 0.8em;">garbage received becomes much messier</span>', 'LA REVOLUCION HA COMENZADO…<br><span style="font-size: 0.8em;">la basura recibida se vuelve mucho mas desordenada</span>'],
    ['THE END OF AN ERA.<br><span style="font-size: 0.8em;">+12 PERMANENT LINES</span>', 'EL FIN DE UNA ERA.<br><span style="font-size: 0.8em;">+12 LINEAS PERMANENTES</span>'],
    ['THE RELATIONSHIP STAGNATES…<br><span style="font-size: 0.8em;">garbage becomes a bit messier</span>', 'LA RELACION SE ESTANCA…<br><span style="font-size: 0.8em;">la basura se vuelve un poco mas desordenada</span>'],
    ['INSECURITIES GROW STRONGER…<br><span style="font-size: 0.8em;">garbage becomes messier</span>', 'LAS INSEGURIDADES CRECEN…<br><span style="font-size: 0.8em;">la basura se vuelve mas desordenada</span>'],
    ['%p2 FEELS NEGLECTED…<br><span style="font-size: 0.8em;">garbage becomes much messier</span>', '%p2 SE SIENTE IGNORADO…<br><span style="font-size: 0.8em;">la basura se vuelve mucho mas desordenada</span>'],
    ['%p1 SUCCESSFULLY APOLOGIZES…?<br><span style="font-size: 0.8em;">garbage becomes a bit cleaner</span>', '%p1 SE DISCULPA EXITOSAMENTE…?<br><span style="font-size: 0.8em;">la basura se vuelve un poco mas limpia</span>'],
    ['THINGS ARE BACK TO HOW THEY SHOULD BE…!<br><span style="font-size: 0.8em;">garbage becomes much cleaner</span>', 'TODO VUELVE A SER COMO DEBERIA…!<br><span style="font-size: 0.8em;">la basura se vuelve mucho mas limpia</span>'],
    ['THE WEIGHT OF WORDS UNSPOKEN…<br><span style="font-size: 0.8em;">garbage becomes messier</span>', 'EL PESO DE LAS PALABRAS NO DICHAS…<br><span style="font-size: 0.8em;">la basura se vuelve mas desordenada</span>'],
    ['"WHY CAN\\\'T YOU JUST LISTEN TO ME?"<br><span style="font-size: 0.8em;">garbage becomes much messier</span>', '"POR QUE NO PUEDES SIMPLEMENTE ESCUCHARME?"<br><span style="font-size: 0.8em;">la basura se vuelve mucho mas desordenada</span>'],
    ['"THIS IS ALL YOUR FAULT".<br><span style="font-size: 0.8em;">revive difficulty increased</span>', '"ESTO ES TODA TU CULPA".<br><span style="font-size: 0.8em;">dificultad de revivir aumentada</span>'],
    ['%p2 MAKES THE SAME PROMISE AGAIN…<br><span style="font-size: 0.8em;">garbage becomes cleaner</span>', '%p2 HACE LA MISMA PROMESA OTRA VEZ…<br><span style="font-size: 0.8em;">la basura se vuelve mas limpia</span>'],
    ['"THIS TIME WILL BE DIFFERENT."<br><span style="font-size: 0.8em;">+4 PERMANENT GARBAGE</span>', '"ESTA VEZ SERA DIFERENTE."<br><span style="font-size: 0.8em;">+4 BASURA PERMANENTE</span>'],
    ['SOME HABITS CAN\\\'T BE BROKEN…<br><span style="font-size: 0.8em;">garbage becomes much messier</span>', 'ALGUNOS HABITOS NO SE PUEDEN ROMPER…<br><span style="font-size: 0.8em;">la basura se vuelve mucho mas desordenada</span>'],
    ['ALL TRUST HAS WITHERED AWAY…<br><span style="font-size: 0.8em;">garbage becomes messier</span>', 'TODA LA CONFIANZA SE HA MARCHITADO…<br><span style="font-size: 0.8em;">la basura se vuelve mas desordenada</span>'],
    ['%p1 SETS AN ULTIMATUM…<br><span style="font-size: 0.8em;">garbage becomes messier</span>', '%p1 IMPONE UN ULTIMATUM…<br><span style="font-size: 0.8em;">la basura se vuelve mas desordenada</span>'],
    ['%p2 CONTEMPLATES THEIR WASTED EFFORT…<br><span style="font-size: 0.8em;">garbage becomes messier</span>', '%p2 CONTEMPLA SU ESFUERZO DESPERDICIADO…<br><span style="font-size: 0.8em;">la basura se vuelve mas desordenada</span>'],
    ['ONE LAST PAINFUL ARGUMENT…<br><span style="font-size: 0.8em;">receive 25% more garbage</span>', 'UNA ULTIMA DISCUSION DOLOROSA…<br><span style="font-size: 0.8em;">recibe 25% mas basura</span>'],
    ['GOODBYE.<br><span style="font-size: 0.8em;">you can no longer revive</span>', 'ADIOS.<br><span style="font-size: 0.8em;">ya no puedes revivir</span>'],
    ['"I MISS YOU"<br><span style="font-size: 0.8em;">garbage becomes much cleaner</span>', '"TE ECHO DE MENOS"<br><span style="font-size: 0.8em;">la basura se vuelve mucho mas limpia</span>'],
    ['WHAT IF…?<br><span style="font-size: 0.8em;">garbage becomes a bit cleaner</span>', 'Y SI…?<br><span style="font-size: 0.8em;">la basura se vuelve un poco mas limpia</span>'],
    ['…<br><span style="font-size: 0.8em;">+12 PERMANENT LINES</span>', '…<br><span style="font-size: 0.8em;">+12 LINEAS PERMANENTES</span>']
];

function isAppCodeUrl(url) {
    if (!url) return false;

    try {
        return new URL(url, location.href).pathname === APP_CODE_URL_SUFFIX;
    } catch {
        return false;
    }
}

// Mas largo primero: evita que un reemplazo corto consuma el prefijo de
// una frase mas larga antes de que le toque su turno.
const APP_CODE_STRING_REPLACEMENTS_BY_LENGTH =
    [...APP_CODE_STRING_REPLACEMENTS].sort((a, b) => b[0].length - a[0].length);

function patchAppCodeSource(source) {
    let patched = source;

    for (const [from, to] of APP_CODE_STRING_REPLACEMENTS_BY_LENGTH) {
        patched = patched.split(from).join(to);
    }

    return patched;
}

(() => {
    const previousFetch = window.fetch;

    if (!previousFetch) return;

    window.fetch = function (input, init) {
        const url = typeof input === "string" ? input : input?.url;

        if (!isAppCodeUrl(url)) {
            return previousFetch.call(this, input, init);
        }

        return previousFetch.call(this, input, init).then(response =>
            response.text().then(text => new Response(patchAppCodeSource(text), {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers
            }))
        );
    };
})();

(() => {
    const originalOpen = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function (method, url, ...rest) {
        this.__isAppCodeUrl = isAppCodeUrl(url);
        return originalOpen.call(this, method, url, ...rest);
    };

    for (const prop of ["responseText", "response"]) {
        const original = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, prop);

        if (!original || !original.get) continue;

        Object.defineProperty(XMLHttpRequest.prototype, prop, {
            configurable: true,
            enumerable: original.enumerable,
            get() {
                const value = original.get.call(this);
                return this.__isAppCodeUrl && typeof value === "string" ? patchAppCodeSource(value) : value;
            }
        });
    }
})();
