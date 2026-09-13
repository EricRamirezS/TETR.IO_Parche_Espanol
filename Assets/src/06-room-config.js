/* ======================================
========= HELPERS DE TRADUCCIÓN =========
====================================== */

function matchCapitalization(original, translated) {
    if (!original || !translated) { return translated; }
    if (original === original.toUpperCase()) { return translated.toUpperCase(); }
    if (original === original.toLowerCase()) { return translated.toLowerCase(); }
    if (original === original.replace(/\b\w/g, char => char.toUpperCase())) { return translated.replace(/\b\w/g, char => char.toUpperCase()); }
    if (original[0] === original[0].toUpperCase() && original.slice(1) === original.slice(1).toLowerCase()) { return (translated.charAt(0).toUpperCase() + translated.slice(1).toLowerCase()); }
    return translated;
}

// Repetido en custom_game, custom_objective y custom_meta: recorre las filas
// de configuracion de sala y traduce su etiqueta (por data-index) y su title.
function applyRoomConfigLabels(e, labels, titles) {
    e.querySelectorAll(".room_config_row").forEach(row => {
        const item = row.querySelector("[data-index]");
        const label = row.querySelector(".room_config_label");

        if (!item) {
            return;
        }

        const index = item.getAttribute("data-index");

        if (labels[index] && label) {
            text(label, labels[index]);
        }

        if (titles[index]) {
            attr(row, "title", titles[index]);
        }
    });
}

// Repetido en custom_game, custom_objective y custom_meta: aplica las listas
// de opciones (formato "valor,ETIQUETA,descripcion;...") por data-index.
function applyDataItems(e, dataItems) {
    Object.entries(dataItems).forEach(([index, value]) => {
        const item = e.querySelector(`[data-index="${index}"]`);

        if (item) {
            attr(item, "data-items", value);
        }
    });
}

// Repetido en room_room, room_match y room_game: traduce las etiquetas de
// .room_config_label buscando por su texto actual (en vez de por data-index).
function applyLabelsByText(e, labels) {
    e.querySelectorAll(".room_config_label").forEach(label => translateByDict(label, labels));
}

// Repetido en room_room, room_match y room_game: traduce el atributo title de
// cualquier elemento que lo tenga, buscando por su valor actual.
function applyTitlesByAttr(e, titles) {
    e.querySelectorAll("[title]").forEach(element => translateAttrByDict(element, "title", titles));
}

// Repetido en custom_game, custom_objective, custom_meta, room_room,
// room_match y room_game: el texto de ayuda al pie del panel de opciones.
function applyMoreInfoHint(e) {
    const moreInfo = e.querySelector(".rc_moreinfo");

    if (moreInfo) {
        text(moreInfo, "pasa el cursor sobre una opcion para mas informacion");
    }
}

function custom_game(e) {
    const labels = {
        "bagtype": "tipo de bolsa aleatoria",
        "spinbonuses": "giros permitidos",
        "combotable": "tabla de combos",
        "allclears": "activar all clears",
        "seed_random": "usar semilla aleatoria (anula \"semilla\")",
        "seed": "semilla",
        "can_retry": "permitir reintentar",
        "stock": "vidas",
        "clutch": "activar clutch clears",
        "nolockout": "desactivar lockout",
        "boardwidth": "ancho del tablero",
        "boardheight": "alto del tablero",

        "survivalmode": "modo",
        "survival_messiness": "desorden de basura %",
        "survival_cap": "limite de basura",
        "survival_layer_amt": "altura de capa",
        "survival_layer_non": "capa fija",
        "survival_layer_min": "altura minima de capa",
        "survival_timer_itv": "intervalo del temporizador",

        "allow180": "permitir giros de 180",
        "kickset": "tabla de kicks",
        "allow_harddrop": "usar descenso instantaneo",
        "display_next": "usar cola NEXT",
        "display_hold": "usar cola HOLD",
        "nextcount": "piezas siguientes",
        "infinite_movement": "movimiento infinito",
        "infinite_hold": "HOLD infinito",
        "display_shadow": "mostrar pieza fantasma",
        "are": "ARE",
        "lineclear_are": "ARE al limpiar linea",

        "g": "gravedad",
        "levels": "usar niveles (anula \"gravedad\")",
        "masterlevels": "usar niveles MASTER",
        "startinglevel": "nivel inicial",
        "levelspeed": "velocidad de nivel",
        "levelstatic": "usar niveles estaticos (anula \"velocidad de nivel\")",
        "levelstaticspeed": "velocidad de nivel estatico",
        "levelgbase": "gravedad base",
        "levelgspeed": "aumento de gravedad",
        "locktime": "retraso de bloqueo"
    };

    const titles = {
        "bagtype": "Tipo de sistema utilizado para generar piezas aleatorias.",
        "spinbonuses": "Tipo de piezas que pueden realizar giros.",
        "combotable": "Tabla de combos que se utilizara.",
        "allclears": "Indica si se recompensa limpiar todo el tablero.",
        "seed_random": "Indica si se utilizara una semilla aleatoria. Anula \"semilla\".",
        "seed": "Semilla que se utilizara si no esta activada la semilla aleatoria.",
        "can_retry": "Indica si se permite reintentar.",
        "stock": "Cantidad de vidas adicionales.",
        "clutch": "Si esta activado, otorga inmunidad a la muerte justo despues de limpiar una linea.",
        "nolockout": "Si esta activado, evita la eliminacion por apilar piezas por encima del limite del tablero.",
        "boardwidth": "Ancho del campo de juego.",
        "boardheight": "Alto del campo de juego.",

        "survivalmode": "Tipo de basura de supervivencia que aparecera.",
        "survival_messiness": "Que tan desordenada es la basura de supervivencia, si esta activada. 0 = completamente limpia, 100 = completamente desordenada.",
        "survival_cap": "Cantidad maxima de basura de supervivencia que puede aparecer. La basura adicional no aparecera. 0 = infinito.",
        "survival_layer_amt": "Si el modo de supervivencia esta configurado como capa, altura de dicha capa.",
        "survival_layer_non": "Si esta activado, no aumenta la capa de basura mientras haya un combo.",
        "survival_layer_min": "Si el modo de supervivencia esta configurado como capa, altura minima de dicha capa. El limite de basura tiene prioridad.",
        "survival_timer_itv": "Si el modo de supervivencia esta configurado como temporizador, intervalo en frames entre apariciones.",

        "allow180": "Indica si se permite utilizar la tecla de rotacion de 180.",
        "kickset": "Tipo de kicks que pueden realizar las piezas.",
        "allow_harddrop": "Indica si se permite utilizar el boton de descenso instantaneo.",
        "display_next": "Indica si se muestra la cola NEXT.",
        "display_hold": "Indica si se utiliza la cola HOLD.",
        "nextcount": "Cantidad de piezas mostradas en la cola NEXT, si esta activada.",
        "infinite_movement": "Indica si la pieza nunca se bloquea mientras sigas moviendola.",
        "infinite_hold": "Si esta activado, HOLD no se desactiva despues de utilizarlo.",
        "display_shadow": "Indica si se muestra la pieza fantasma.",
        "are": "Cantidad de frames entre colocar una pieza y generar la siguiente.",
        "lineclear_are": "Cantidad de frames entre colocar una pieza y generar la siguiente si se limpio una linea.",

        "g": "Gravedad (que tan rapido caen los bloques). Un valor mayor es mas rapido.",
        "levels": "Indica si se permite subir de nivel. Anula la gravedad normal.",
        "masterlevels": "Si esta activado, permite que los niveles superiores a 20 se conviertan en NIVELES MASTER.",
        "startinglevel": "Nivel con el que se comienza.",
        "levelspeed": "Velocidad a la que se superan los niveles.",
        "levelstatic": "Utiliza una cantidad fija de lineas para subir de nivel.",
        "levelstaticspeed": "Si se utilizan niveles estaticos, cantidad de lineas necesarias para superar un nivel.",
        "levelgbase": "Al utilizar niveles, gravedad inicial.",
        "levelgspeed": "Al utilizar niveles, velocidad a la que aumenta la gravedad.",
        "locktime": "Si no se utilizan niveles MASTER, cantidad de frames hasta que una pieza se bloquee."
    };

    applyRoomConfigLabels(e, labels, titles);

    const dataItems = {
        "bagtype":
            "7-bag,7-BAG,mantener barajando una bolsa de los 7 tetrominos;" +
            "14-bag,14-BAG,mantener barajando una bolsa de 2x los 7 tetrominos;" +
            "7+1-bag,7+1-BAG,mantener barajando una bolsa de los 7 tetrominos con un tetromino extra aleatorio;" +
            "7+2-bag,7+2-BAG,mantener barajando una bolsa de los 7 tetrominos con dos tetrominos extra aleatorios;" +
            "7+x-bag,7+X-BAG,mantener barajando una bolsa de los 7 tetrominos. Las primeras bolsas contienen algunos extras.;" +
            "classic,CLASSIC,aleatorio con proteccion contra repeticiones;" +
            "pairs,PAIRS,alternar entre 2 tetrominos;" +
            "total mayhem,TOTAL MAYHEM,generacion completamente aleatoria",

        "spinbonuses":
            "T-spins,T-SPINS,recibir bonificaciones por girar piezas T;" +
            "T-spins+,T-SPINS+,recibir bonificaciones por girar piezas T (se permiten piezas inmoviles);" +
            "all+,ALL-SPIN+,recibir bonificaciones por girar todas las piezas (se permiten piezas inmoviles);" +
            "all,ALL-SPIN,recibir bonificaciones por girar todas las piezas;" +
            "all-mini+,ALL-MINI+,recibir bonificaciones por girar piezas T (se permiten piezas inmoviles) y recibir back-to-back al girar otras piezas;" +
            "all-mini,ALL-MINI,recibir bonificaciones por girar piezas T y recibir back-to-back al girar otras piezas;" +
            "mini-only,MINI-ONLY,recibir back-to-back al girar todas las piezas;" +
            "handheld,HANDHELD,recibir bonificaciones por girar todas las piezas. Los ataques que no sean T-SPINS se reducen a la mitad. Las piezas usan deteccion de 4 esquinas;" +
            "stupid,STUPID,todo es un giro porque SI POR QUE NO (O-spin COMPATIBLE!);" +
            "none,NONE,no recibir bonificaciones por giros",

        "combotable":
            "none,NONE,desactivar cadenas de combo;" +
            "multiplier,MULTIPLIER,multiplicador de combos de TETR.IO;" +
            "classic guideline,CLASSIC GUIDELINE,tabla de combos del guideline clasico;" +
            "modern guideline,MODERN GUIDELINE,tabla de combos del guideline moderno",

        "survivalmode":
            "none,NONE,no generar basura;" +
            "layer,LAYER,mantener una capa de basura en el tablero;" +
            "timer,TIMER,generar basura mediante un temporizador",

        "kickset":
            "SRS+,SRS+,sistema de rotacion natural predeterminado con rotacion simetrica de la pieza I;" +
            "SRS,SRS,sistema de rotacion natural estandar;" +
            "SRS-X,SRS-X,SRS con giros de 180 mas potentes;" +
            "TETRA-X,TETRA-X,sistema de rotacion creado por DR OCELOT;" +
            "NRS,NRS,sistema de rotacion clasico;" +
            "ARS,ARS,sistema de rotacion utilizado en juegos arcade;" +
            "ASC,ASC,sistema de rotacion permisivo de WINTERNEBS;" +
            "none,NONE,sin kicks posibles"
    };

    applyDataItems(e, dataItems);

    e.querySelectorAll("h2").forEach(h2 => translateByDict(h2, {
        "GENERAL": "GENERAL",
        "SURVIVAL": "SUPERVIVENCIA",
        "CONTROLS": "CONTROLES",
        "GRAVITY & LEVELLING": "GRAVEDAD Y NIVELES"
    }));

    applyMoreInfoHint(e);
}

function custom_objective(e) {
    const labels = {
        "objective_type": "objetivo",
        "objective_count": "cantidad",
        "objective_time": "tiempo",
        "objective_result": "criterio",
        "topoutisclear": "esta bien llegar al limite",
        "pro": "mostrar objetivo detras del tablero"
    };

    const titles = {
        "objective_type": "Modo de juego.",
        "objective_count": "Cantidad del objetivo principal que se debe alcanzar. Por ejemplo, en modo LINEAS es la cantidad de lineas que se deben limpiar.",
        "objective_time": "Cantidad de tiempo en milisegundos. Por ejemplo, en modo TEMPORIZADO es el tiempo hasta que termina la partida.",
        "objective_result": "Contador que se utilizara para evaluar tu resultado al final de la partida.",
        "topoutisclear": "Si esta activado, muestra la pantalla de resultados aunque el jugador llegue al limite del tablero.",
        "pro": "Si esta activado, muestra el objetivo en el tablero. (modo pro)"
    };

    applyRoomConfigLabels(e, labels, titles);

    applyDataItems(e, {
        "objective_type":
            "none,NINGUNO,jugar indefinidamente;" +
            "lines,LINEAS,alcanzar una cantidad determinada de lineas;" +
            "timed,TEMPORIZADO,jugar durante una cantidad determinada de tiempo;" +
            "garbage,BASURA,alcanzar una cantidad determinada de lineas de basura",

        "objective_result":
            "score,PUNTOS,se mostrara la puntuacion final;" +
            "time,TIEMPO,se mostrara el tiempo final;" +
            "lines,LINEAS,se mostrara la cantidad final de lineas"
    });

    e.querySelectorAll("h2").forEach(h2 => translateByDict(h2, { "GENERAL": "GENERAL" }));

    applyMoreInfoHint(e);
}

function custom_meta(e) {
    const labels = {
        "mission": "mision",
        "stride": "modo agil",
        "countdown": "mostrar cuenta regresiva",
        "countdown_count": "cantidad de cuenta regresiva",
        "countdown_interval": "intervalo de cuenta regresiva",
        "precountdown": "tiempo antes de la cuenta regresiva",
        "prestart": "tiempo antes del inicio",
        "zoominto": "animacion de zoom",

        "slot_counter1": "espacio izquierdo 1",
        "slot_counter2": "espacio izquierdo 2",
        "slot_counter3": "espacio izquierdo 3",
        "slot_counter4": "espacio izquierdo 4",
        "slot_counter5": "espacio derecho",
        "absolute_lines": "aplicar conteo absoluto de lineas",
        "slot_bar2": "mostrar barra de progreso"
    };

    const titles = {
        "mission":
            "Texto que se mostrara antes de iniciar la partida.",

        "stride":
            "Acelera las animaciones y desactiva algunas de las opciones siguientes.",

        "countdown":
            "Indica si se mostrara una cuenta regresiva.",

        "countdown_count":
            "Cantidad de pasos de la cuenta regresiva.",

        "countdown_interval":
            "Cantidad de milisegundos entre cada paso de la cuenta regresiva.",

        "precountdown":
            "Cantidad de milisegundos antes de iniciar la cuenta regresiva.",

        "prestart":
            "Cantidad de milisegundos antes de crear la partida.",

        "zoominto":
            "Tipo de animacion que se reproducira al iniciar.",

        "slot_counter1":
            "Tipo de metrica que se mostrara en el primer espacio del lado izquierdo.",

        "slot_counter2":
            "Tipo de metrica que se mostrara en el segundo espacio del lado izquierdo.",

        "slot_counter3":
            "Tipo de metrica que se mostrara en el tercer espacio del lado izquierdo.",

        "slot_counter4":
            "Tipo de metrica que se mostrara en el cuarto espacio del lado izquierdo.",

        "slot_counter5":
            "Tipo de metrica que se mostrara en el espacio del lado derecho.",

        "absolute_lines":
            "No mostrar el progreso del nivel en el conteo de lineas.",

        "slot_bar2":
            "Indica si se mostrara la barra de progreso a la derecha."
    };

    applyRoomConfigLabels(e, labels, titles);

    // Los 5 espacios de contador (izquierdos 1-4 y derecho) ofrecen exactamente
    // las mismas opciones; antes este bloque de 12 lineas estaba copiado 5
    // veces sin ninguna diferencia entre copias.
    const slotCounterDataItems =
        "---empty---,Vacio,dejar este espacio vacio;" +
        "score,SCORE,mostrar la puntuacion en este espacio;" +
        "spp,SCORE (por pieza),mostrar la puntuacion y la puntuacion por pieza en este espacio;" +
        "stopwatch,CRONOMETRO,mostrar el tiempo transcurrido en este espacio;" +
        "timer,TEMPORIZADOR,mostrar el tiempo restante en este espacio (para objetivos TEMPORIZADOS);" +
        "lines,LINEAS,mostrar la cantidad de lineas limpiadas en este espacio;" +
        "level,NIVEL,mostrar el nivel actual en este espacio;" +
        "pieces,PIEZAS,mostrar la cantidad de piezas colocadas y la velocidad en este espacio;" +
        "keys,ENTRADAS,mostrar la cantidad de pulsaciones de botones en este espacio;" +
        "hold,HOLD,mostrar la cantidad de piezas en HOLD en este espacio;" +
        "allclears,ALL CLEARS,mostrar la cantidad de ALL CLEARS en este espacio;" +
        "garbage,BASURA LIMPIADA,mostrar la cantidad de lineas de basura limpiadas en este espacio";

    applyDataItems(e, {
        "zoominto":
            "none,SIN ANIMACION,no mostrar ninguna animacion;" +
            "fast,RAPIDA,mostrar una animacion rapida;" +
            "slow,LENTA,mostrar una animacion lenta;" +
            "cinematic,CINEMATICA,mostrar una animacion muy lenta",

        "slot_counter1": slotCounterDataItems,
        "slot_counter2": slotCounterDataItems,
        "slot_counter3": slotCounterDataItems,
        "slot_counter4": slotCounterDataItems,
        "slot_counter5": slotCounterDataItems
    });

    e.querySelectorAll("h2").forEach(h2 => translateByDict(h2, {
        "INTRO": "INTRO",
        "COUNTERS": "CONTADORES"
    }));

    applyMoreInfoHint(e);
}

// slot_blitz_counter y slot_40l_counter son identicas salvo por la lista de
// metricas disponibles (BLITZ tiene "timer" + "level"; 40 LINEAS tiene
// "stopwatch" y no tiene "level"). Una sola implementacion parametrizada.
function slot_counter(e, position, side, dataItems) {
    const labels = {
        1: "espacio izquierdo 1",
        2: "espacio izquierdo 2",
        3: "espacio izquierdo 3",
        4: "espacio izquierdo 4",
        5: "espacio derecho"
    };

    attr(e, "data-items", dataItems);

    const row = e.closest(".room_config_row");

    if (row) {
        const label = row.querySelector(".room_config_label");

        if (label) {
            text(label, labels[position]);
        }

        attr(
            row,
            "title",
            side === "left"
                ? `Tipo de metrica que se mostrara en el ${position} espacio del lado izquierdo.`
                : "Tipo de metrica que se mostrara en el espacio del lado derecho."
        );
    }

    const section = e.closest(".scroller_block");

    if (section) {
        const h1 = section.querySelector("h1");

        if (h1) {
            text(h1, "AVANZADO");
            attr(h1, "title", "Personaliza aun mas este modo");
        }
    }
}

function slot_blitz_counter(e, position, side) {
    slot_counter(e, position, side,
        "---default---,PREDETERMINADO,usar la opcion predeterminada;" +
        "---empty---,VACIO,dejar este espacio vacio;" +
        "score,PUNTOS,mostrar la puntuacion en este espacio;" +
        "spp,PUNTOS (por pieza),mostrar la puntuacion y la puntuacion por pieza en este espacio;" +
        "timer,CRONOMETRO,mostrar el tiempo restante en este espacio;" +
        "lines,LINEAS,mostrar la cantidad de lineas limpiadas en este espacio;" +
        "level,NIVEL,mostrar el nivel actual en este espacio;" +
        "pieces,PIEZAS,mostrar la cantidad de piezas colocadas y la velocidad en este espacio;" +
        "keys,ENTRADAS,mostrar la cantidad de pulsaciones de botones en este espacio;" +
        "finesse,PRECISION,mostrar tu precision en este espacio;" +
        "finesse_l,PRECISION (MAS PEQUENO),mostrar tu precision en este espacio (para usar en el lado izquierdo);" +
        "hold,HOLD,mostrar la cantidad de piezas en HOLD en este espacio;" +
        "allclears,ALL CLEARS,mostrar la cantidad de ALL CLEARS en este espacio"
    );
}

function slot_40l_counter(e, position, side) {
    slot_counter(e, position, side,
        "---default---,PREDETERMINADO,usar la opcion predeterminada;" +
        "---empty---,VACIO,dejar este espacio vacio;" +
        "score,PUNTOS,mostrar la puntuacion en este espacio;" +
        "spp,PUNTOS (por pieza),mostrar la puntuacion y la puntuacion por pieza en este espacio;" +
        "stopwatch,CRONOMETRO,mostrar el tiempo transcurrido en este espacio;" +
        "lines,LINEAS,mostrar la cantidad de lineas limpiadas en este espacio;" +
        "pieces,PIEZAS,mostrar la cantidad de piezas colocadas y la velocidad en este espacio;" +
        "keys,ENTRADAS,mostrar la cantidad de pulsaciones de botones en este espacio;" +
        "finesse,PRECISION,mostrar tu precision en este espacio;" +
        "finesse_l,PRECISION (MAS PEQUENO),mostrar tu precision en este espacio (para usar en el lado izquierdo);" +
        "hold,HOLD,mostrar la cantidad de piezas en HOLD en este espacio;" +
        "allclears,ALL CLEARS,mostrar la cantidad de ALL CLEARS en este espacio"
    );
}
function room_welcome(e) {
    const h2 = e.querySelector("h2");
    const paragraphs = e.querySelectorAll("p");
    const rows = e.querySelectorAll("tbody tr");

    if (h2) {
        h2.innerHTML = 'bienvenido a&nbsp;<span class="cheeky">TETRIO</span>!';
    }

    if (paragraphs[0]) {
        paragraphs[0].innerHTML =
            '<span class="cheeky">TETRIO</span>&nbsp;es un juego de bloques online gratuito, familiar y de ritmo rapido, del mismo genero que tetris, jugado por millones en todo el mundo.<br>' +
            '<span class="room_guide_addendum">juega partidas multijugador contra amigos y rivales de todo el mundo, o consigue un puesto en las clasificaciones; el futuro de los juegos de bloques es tuyo!</span>';
    }

    if (paragraphs[1]) {
        text(paragraphs[1], "tus teclas configuradas actualmente son:");
    }

    const keyTranslations = [
        "mover la pieza que cae a la izquierda",
        "mover la pieza que cae a la derecha",
        "descenso rapido",
        "descenso instantaneo",
        "rotar en sentido antihorario",
        "rotar en sentido horario",
        "rotar 180",
        "intercambiar pieza en HOLD"
    ];

    rows.forEach((row, i) => {
        const label = row.querySelector("td:first-child");

        if (label && keyTranslations[i]) {
            text(label, keyTranslations[i]);
        }
    });

    if (paragraphs[2]) {
        text(paragraphs[2], "puedes cambiar estas y muchas otras opciones en CONFIGURACION.");
    }

    if (paragraphs[3]) {
        text(
            paragraphs[3],
            "haz clic en las pestañas de arriba para explorar o cambiar las opciones de la sala. diviertete!"
        );
    }
}

function room_room(e) {
    const labels = {
        "room name": "nombre de la sala",
        "player limit": "limite de jugadores",
        "auto start": "inicio automatico",
        "public room": "sala publica",
        "allow anonymous users to join": "permitir que usuarios anonimos se unan",
        "allow users who are in matchmaking to join": "permitir que usuarios en matchmaking se unan",
        "allow unranked users to play": "permitir jugar a usuarios sin rango",
        "rank limit": "limite de rango",
        "limit by top rank": "limitar por mejor rango",
        "music": "musica"
    };

    applyLabelsByText(e, labels);

    applyTitlesByAttr(e, {
        "Name this room will display in the listing as":
            "Nombre con el que esta sala aparecera en la lista",

        "Maximum players in this room. 0 = no limit. Does not apply retroactively.":
            "Maximo de jugadores en esta sala. 0 = sin limite. No se aplica de forma retroactiva.",

        "Countdown until the room start. 0 = to disable.":
            "Cuenta regresiva hasta el inicio de la sala. 0 = desactivado.",

        "When enabled, broadcast the room and its info to the public room listing.":
            "Al activarlo, muestra la sala y su informacion en la lista publica de salas.",

        "Whether to allow anonymous users to enter this room. Does not apply retroactively.":
            "Indica si se permite entrar a usuarios anonimos. No se aplica de forma retroactiva.",

        "Whether to allow users who are in a matchmaking queue to enter this room. Does not apply retroactively.":
            "Indica si se permite entrar a usuarios que estan en una cola de matchmaking. No se aplica de forma retroactiva.",

        "Whether to allow unranked users to play in this room.":
            "Indica si se permite jugar a usuarios sin rango en esta sala.",

        "The maximum TETRA LEAGUE rank players may have to play in this room.":
            "Rango maximo de TETRA LEAGUE que pueden tener los jugadores para jugar en esta sala.",

        "If a rank limit is set, use the players' top ranks instead of their current ranks.":
            "Si se establece un limite de rango, usa los mejores rangos de los jugadores en lugar de sus rangos actuales.",

        "Background song to play. If random, not everyone will hear the same song.":
            "Cancion de fondo que se reproducira. Si es aleatoria, no todos escucharan la misma cancion."
    });

    applyMoreInfoHint(e);

    const heading = e.querySelector("h2");
    if (heading) {
        text(heading, "GENERAL");
    }
}

function room_match(e) {
    const labels = {
        "gamemode": "modo de juego",
        "first to (FT)": "primero en (FT)",
        "win by (WB)": "ganar por (WB)",
        "golden point (GP)": "punto de oro (GP)",
        "stock": "vidas"
    };

    applyLabelsByText(e, labels);

    applyTitlesByAttr(e, {
        "Game mode.":
            "Modo de juego.",

        "Amount of rounds one must win to win the game.":
            "Cantidad de rondas que se deben ganar para ganar la partida.",

        "Amount of rounds one must win over the second place to secure the win.":
            "Cantidad de rondas que se deben ganar sobre el segundo puesto para asegurar la victoria.",

        "When not 0, winning this amount of rounds always secures the win regardless of Win By. Only applies when Win By is greater than 1.":
            "Si no es 0, ganar esta cantidad de rondas asegura siempre la victoria sin importar Ganar Por. Solo se aplica cuando Ganar Por es mayor que 1.",

        "Amount of extra lives one has.":
            "Cantidad de vidas adicionales."
    });

    applyMoreInfoHint(e);

    const heading = e.querySelector("h2");
    if (heading) {
        text(heading, "GENERAL");
    }

    const gamemode = e.querySelector('[data-index="match.gamemode"]');

    if (gamemode) {
        gamemode.setAttribute(
            "data-items",
            "versus,VERSUS,[2 - ∞ jugadores] ideal para 1v1 y salas pequenas!;" +
            "royale,BATTLE ROYALE,[2 - ∞ jugadores] un modo battle royale completo ideal para salas grandes!;" +
            "practice,PRACTICE,[2 jugadores] ideal para entrenar en vivo con un amigo! permite deshacer y reiniciar tu tablero, igual que en el modo ZEN"
        );
    }
}

function room_game(e) {
    const labels = {
        "game presets": "preajustes de juego",
        "random bag type": "tipo de bolsa aleatoria",
        "allowed spins": "giros permitidos",
        "garbage special bonus": "bonificacion especial de basura",
        "combo table": "tabla de combos",
        "allow 180 spins": "permitir giros de 180",
        "kick table": "tabla de kicks",
        "bombs-style garbage": "basura estilo bombas",
        "use hard drop": "usar descenso instantaneo",
        "use NEXT queue": "usar cola NEXT",
        "use HOLD queue": "usar cola HOLD",
        "next pieces": "piezas siguientes",
        "infinite movement": "movimiento infinito",
        "infinite HOLD": "HOLD infinito",
        "show shadow piece": "mostrar pieza fantasma",
        "ARE": "ARE",
        "line clear ARE": "ARE al limpiar linea",
        "enforce below handling settings": "aplicar las siguientes opciones de manejo",
        "enforced ARR": "ARR aplicado",
        "enforced DAS": "DAS aplicado",
        "enforced SDF": "SDF aplicado",
        "disable lockout": "desactivar lockout",
        "board width": "ancho del tablero",
        "board height": "alto del tablero",
        "gravity": "gravedad",
        "gravity increase": "aumento de gravedad",
        "gravity margin time": "tiempo de margen de gravedad",
        "garbage multiplier": "multiplicador de basura",
        "garbage margin time": "tiempo de margen de basura",
        "garbage increase": "aumento de basura",
        "messiness on change": "desorden al cambiar",
        "messiness within attack": "desorden durante el ataque",
        "avoid same column RNG": "evitar misma columna RNG",
        "messiness timeout": "tiempo limite de desorden",
        "lock delay": "retraso de bloqueo",
        "garbage travel speed": "velocidad de desplazamiento de basura",
        "garbage cap": "limite de basura",
        "garbage cap margin": "margen del limite de basura",
        "garbage cap increase": "aumento del limite de basura",
        "garbage cap max": "maximo del limite de basura",
        "garbage absolute cap": "limite absoluto de basura",
        "garbage phase": "fase de basura",
        "garbage target bonus": "bonificacion por objetivos de basura",
        "opener phase": "fase inicial",
        "garbage entry": "entrada de basura",
        "garbage are": "ARE de basura",
        "garbage are hesitation": "pausa ARE de basura",
        "garbage queue": "cola de basura",
        "garbage blocking": "bloqueo de basura",
        "allow manual targeting": "permitir seleccion manual de objetivos",
        "enable back-to-back chaining": "activar cadenas back-to-back",
        "enable back-to-back charging": "activar carga back-to-back",
        "enable all clears": "activar all clears",
        "all clear garbage": "basura de all clear",
        "all clear back-to-back": "back-to-back de all clear",
        "enable clutch clears": "activar clutch clears",
        "garbage passthrough": "paso de basura",
        "rounding mode": "modo de redondeo"
    };

    applyLabelsByText(e, labels);

    applyTitlesByAttr(e, {
        "Presets to apply to this room":
            "Preajustes que se aplicaran a esta sala",

        "The type of system used to generate random pieces.":
            "Tipo de sistema usado para generar piezas aleatorias.",

        "The type of pieces allowed to do spins.":
            "Tipo de piezas que pueden realizar giros.",

        "Add +1 to special clears (Quads and (All-)Spins) that clear garbage.":
            "Anade +1 a los clears especiales (Quads y (All-)Spins) que limpien basura.",

        "What combo table to use.":
            "Tabla de combos que se usara.",

        "Whether to allow the 180 rotation key to be used.":
            "Indica si se permite usar la tecla de rotacion de 180.",

        "The type of kicks that pieces can do.":
            "Tipo de kicks que pueden realizar las piezas.",

        "If enabled, use Bombs-style garbage (stack on top to clear) as opposed to the standard.":
            "Si esta activado, usa basura estilo Bombs (se apila encima para limpiarla) en lugar de la estandar.",

        "Whether to allow use of the Hard Drop button.":
            "Indica si se permite usar el boton Hard Drop.",

        "Whether to show the NEXT queue.":
            "Indica si se muestra la cola NEXT.",

        "Whether to use the HOLD queue.":
            "Indica si se usa la cola HOLD.",

        "Amount of pieces shown in the NEXT queue, if said queue is enabled.":
            "Cantidad de piezas mostradas en la cola NEXT, si esta habilitada.",

        "Whether to never lock, as long as you keep moving the piece.":
            "Indica si nunca se bloquea la pieza mientras sigas moviendola.",

        "If enabled, do not disable HOLD after using it.":
            "Si esta activado, no desactiva HOLD despues de usarlo.",

        "Whether to show the shadow piece.":
            "Indica si se muestra la pieza fantasma.",

        "Amount of time in frames in between a piece being placed and the next one spawning.":
            "Cantidad de tiempo en frames entre colocar una pieza y que aparezca la siguiente.",

        "Amount of time in frames in between a piece being placed and the next one spawning, if a line was cleared.":
            "Cantidad de tiempo en frames entre colocar una pieza y que aparezca la siguiente, si se limpio una linea.",

        "Whether to enforce the handling settings below.":
            "Indica si se aplican las opciones de manejo siguientes.",

        "Auto Repeat Rate, enforced if 'enforce below handling settings' is enabled.":
            "Auto Repeat Rate, aplicado si 'aplicar las siguientes opciones de manejo' esta activado.",

        "Delayed Auto Shift, enforced if 'enforce below handling settings' is enabled.":
            "Delayed Auto Shift, aplicado si 'aplicar las siguientes opciones de manejo' esta activado.",

        "Soft Drop Factor, enforced if 'enforce below handling settings' is enabled. Use 41 for MAX.":
            "Soft Drop Factor, aplicado si 'aplicar las siguientes opciones de manejo' esta activado. Usa 41 para MAX.",

        "If checked, disables being eliminated from stacking above the skyline.":
            "Si esta marcado, evita la eliminacion por apilar por encima del skyline.",

        "The width of the playing field.":
            "Ancho del campo de juego.",

        "The height of the playing field.":
            "Alto del campo de juego.",

        "Starting gravity (how fast blocks drop). Higher is faster.":
            "Gravedad inicial (velocidad a la que caen los bloques). Un valor mayor es mas rapido.",

        "The amount of gravity increase per second.":
            "Cantidad de aumento de gravedad por segundo.",

        "Amount of time in frames until the gravity starts to increase.":
            "Cantidad de tiempo en frames hasta que la gravedad empiece a aumentar.",

        "Starting garbage multiplier. 1 means normal amount of garbage, 2 means double.":
            "Multiplicador inicial de basura. 1 significa cantidad normal de basura, 2 significa el doble.",

        "Amount of time in frames until the garbage multiplier starts to increase.":
            "Cantidad de tiempo en frames hasta que el multiplicador de basura empiece a aumentar.",

        "The amount of garbage multiplier increase per second.":
            "Cantidad de aumento del multiplicador de basura por segundo.",

        "The chance (from 0 to 1) that the garbage column changes per attack.":
            "Probabilidad (de 0 a 1) de que cambie la columna de basura por ataque.",

        "The chance (from 0 to 1) that the garbage column changes per garbage row.":
            "Probabilidad (de 0 a 1) de que cambie la columna de basura por fila de basura.",

        "If checked, RNG may not roll the same garbage column twice.":
            "Si esta marcado, el RNG no puede seleccionar la misma columna de basura dos veces seguidas.",

        "Amount of time in frames until garbage will always pick a different column.":
            "Cantidad de tiempo en frames hasta que la basura elija siempre una columna diferente.",

        "If not using master levels, the amount of frames until a piece locks down.":
            "Si no se usan niveles maestro, cantidad de frames hasta que una pieza se bloquee.",

        "The time it takes in frames for garbage to travel.":
            "Tiempo en frames que tarda la basura en desplazarse.",

        "Amount of garbage that may enter the screen at once.":
            "Cantidad de basura que puede entrar en pantalla de una vez.",

        "Amount of time in frames until the garbage cap starts to increase.":
            "Cantidad de tiempo en frames hasta que el limite de basura empiece a aumentar.",

        "The amount of garbage cap increase per second.":
            "Cantidad de aumento del limite de basura por segundo.",

        "Maximum amount the garbage cap may reach.":
            "Cantidad maxima que puede alcanzar el limite de basura.",

        "Maximum amount of garbage the pending queue can hold. Any received garbage beyond this limit is nullified.":
            "Cantidad maxima de basura que puede contener la cola pendiente. Cualquier basura recibida por encima de este limite se anula.",

        "Amount of time in frames between each garbage phase. Each pending garbage segment has three phases before activation.":
            "Cantidad de tiempo en frames entre cada fase de basura. Cada segmento de basura pendiente tiene tres fases antes de activarse.",

        "Adds a bonus to sent garbage depending on the amount of players targeting you.":
            "Anade una bonificacion a la basura enviada segun la cantidad de jugadores que te tengan como objetivo.",

        "Amount of pieces of the opener phase. During the opener phase, if your total lines sent is less than the amount pending, you cancel double.":
            "Cantidad de piezas de la fase inicial. Durante esta fase, si tus lineas enviadas son menores que la cantidad pendiente, cancelas el doble.",

        "Whether garbage should enter instantly or continuously.":
            "Indica si la basura debe entrar instantaneamente o de forma continua.",

        "Amount of time in frames to wait during garbage spawning. Not applicable to instantaneous entry.":
            "Cantidad de tiempo en frames que se debe esperar durante la aparicion de basura. No se aplica a la entrada instantanea.",

        "Amount of extra time in frames to wait during garbage spawning if a line is cleared during the process. Not applicable to instantaneous entry.":
            "Cantidad de tiempo adicional en frames que se debe esperar durante la aparicion de basura si se limpia una linea durante el proceso. No se aplica a la entrada instantanea.",

        "Whether to only activate the first garbage segment in the queue.":
            "Indica si solo se activa el primer segmento de basura de la cola.",

        "The type of blocking to use.":
            "Tipo de bloqueo que se usara.",

        "Whether to allow users to click boards to manually target them.":
            "Indica si se permite a los usuarios hacer clic en los tableros para seleccionarlos manualmente como objetivo.",

        "Whether to make long Back-to-Back chains become more powerful.":
            "Indica si las cadenas Back-to-Back largas se vuelven mas potentes.",

        "Whether to charge up a large spike with Back-to-Back, sent by breaking the chain.":
            "Indica si se carga un gran spike con Back-to-Back enviado al romper la cadena.",

        "Whether to reward clearing the entire board":
            "Indica si se recompensa limpiar todo el tablero.",

        "Amount of garbage sent when performing an All Clear.":
            "Cantidad de basura enviada al realizar un All Clear.",

        "Amount of Back-To-Back chains applied when performing an All Clear.":
            "Cantidad de cadenas Back-To-Back aplicadas al realizar un All Clear.",

        "If checked, grants immunity to death right after clearing a line.":
            "Si esta marcado, otorga inmunidad a la muerte justo despues de limpiar una linea.",

        "Whether attacks can be canceled while in transit or during latency.":
            "Indica si los ataques pueden cancelarse mientras estan en transito o durante la latencia.",

        "The type of rounding mode to use for garbage.":
            "Tipo de redondeo que se usara para la basura."
    });

    applyMoreInfoHint(e);

    e.querySelectorAll("h2").forEach(h2 => translateByDict(h2, {
        "GENERAL": "GENERAL",
        "GRAVITY & MARGIN TIME": "GRAVEDAD Y TIEMPO DE MARGEN"
    }));
}

