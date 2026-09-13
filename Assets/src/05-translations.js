const translations = {
    // scroller_item
    "play_returntoroom": (e) => scroller_item(e, "VOLVER A LA PARTIDA"),
    "play_multi": (e) => scroller_item(e, "MULTIJUGADOR", "juega en linea con amigos y rivales"),
    "play_solo": (e) => scroller_item(e, "SOLO", "ponte a prueba y alcanza los primeros puestos"),
    "sig_channel": (e) => scroller_item(e, "CANAL TETRA", "clasificaciones, logros, repeticiones y mas"),
    "sig_config": (e) => scroller_item(e, "CONFIGURACION", "ajusta tu&nbsp;<span class='cheeky'>TETRIO</span>"),
    "sig_about": (e) => scroller_item(e, "ACERCA DE", "todo sobre&nbsp;<span class='cheeky'>TETRIO</span>"),

    "game_40l": (e) => scroller_item(e, "40 LINEAS", "completa 40 lineas lo mas rapido posible"),
    "game_blitz": (e) => scroller_item(e, "BLITZ", "una carrera de dos minutos contra el reloj"),
    "game_zen": (e) => scroller_item(e, "ZEN", "relajate o entrena en este modo interminable"),
    "game_custom": (e) => scroller_item(e, "PERSONALIZADO", "juega, entrena y experimenta con tus propias reglas"),

    "multi_quickplay": (e) => scroller_item(e, "PARTIDA RAPIDA", "sube por la torre; hasta donde puedes llegar?"),
    "multi_league": (e) => scroller_item(e, "LIGA TETRA", "enfrentate a jugadores de tu nivel en duelos clasificatorios"),
    "multi_createroom": (e) => scroller_item(e, "PARTIDA PERSONALIZADA", "crea salas publicas y privadas para jugar con tus propias reglas"),
    "multi_listing": (e) => scroller_item(e, "LISTA DE SALAS", "unete a partidas publicas"),

    "sound_test": (e) => scroller_item(e, "PRUEBA DE SONIDO", "prueba el sistema de audio RADIANCE"),

    "about_supporter": (e) => scroller_item(e, "APOYAR&nbsp;<span class='cheeky'>TETRIO</span>", "apoya el desarrollo o regala el estado de supporter y obtén recompensas"),
    "about_merch": (e) => scroller_item(e, "TIENDA DE MERCHANDISING", "explora la coleccion de productos oficiales de&nbsp;<span class='cheeky'>TETRIO</span>"),
    "about_desktop": (e) => scroller_item(e, "<span class='cheeky'>TETRIO</span>&nbsp;DE ESCRITORIO", "obtén el cliente de escritorio para disfrutar de funciones adicionales y un mejor rendimiento"),
    "about_patchnotes": (e) => scroller_item(e, "NOTAS DEL PARCHE", "sigue el desarrollo y descubre las novedades"),
    "about_discord": (e) => scroller_item(e, "DISCORD DE LA COMUNIDAD", "sigue las novedades de&nbsp;<span class='cheeky'>TETRIO</span>, comparte tus opiniones y diviertete"),
    "about_blog": (e) => scroller_item(e, "BLOG DEL DESARROLLADOR", "sigue las novedades de&nbsp;<span class='cheeky'>TETRIO</span>&nbsp;y mucho mas"),
    "about_issues": (e) => scroller_item(e, "SEGUIMIENTO DE PROBLEMAS", "informa de errores y propón ideas para mejorar&nbsp;<span class='cheeky'>TETRIO</span>"),
    "about_music": (e) => scroller_item(e, "SALA DE MUSICA", "escucha la musica de fondo de&nbsp;<span class='cheeky'>TETRIO</span>"),
    "about_harddrop": (e) => scroller_item(e, "UNIRSE A HARD DROP", "unete a una extensa y activa comunidad dedicada a los juegos de bloques"),
    "about_legal": (e) => scroller_item(e, "LEGAL Y ACERCA DE", "lee la politica de privacidad, los terminos de servicio, las reglas y mas de&nbsp;<span class='cheeky'>TETRIO</span>"),
    "about_support": (e) => scroller_item(e, "OBTENER AYUDA", "obten ayuda, apela sanciones o ponte en contacto con el equipo"),

    "multi_royale": (e) => scroller_item(e, "ROYALE", "enfrentate a los mejores en una unica sala compartida por todos"),

    "config_account": (e) => scroller_item(e, "CUENTA", "cambia la configuracion de tu cuenta"),
    "config_electron": (e) => scroller_item(e, "<span class='cheeky'>TETRIO</span>&nbsp;DE ESCRITORIO", "cambia la configuracion de&nbsp;<span class='cheeky'>TETRIO</span>&nbsp;DE ESCRITORIO"),
    "config_export": (e) => scroller_item(e, "EXPORTAR CONFIGURACION", "descarga un archivo .TTC con tu configuracion que puedes arrastrar a&nbsp;<span class='cheeky'>TETRIO</span>&nbsp;para importarla"),
    "config_account_orders": (e) => scroller_item(e, "HISTORIAL DE PEDIDOS", "consulta tus pedidos anteriores"),

    // performance meter
    "performancemeter_header": (e) => text(e, `COMPILACION DE PRODUCCION - F8 para estadisticas`),
    "devbuildid": (e) => performance_build_info(e),

    "perf_fps": (e) => performance_meter(e, "FPS", "fps peor"),
    "perf_f": (e) => performance_meter(e, "F", "% maximo"),
    "perf_gamef": (e) => performance_meter(e, "gameF", "%R"),
    "perf_drawf": (e) => performance_meter(e, "drawF", "%R"),
    "perf_gamem": (e) => performance_meter(e, "gameM", "/m"),
    "perf_drawm": (e) => performance_meter(e, "drawM", "/m"),
    "perf_ping": (e) => performance_meter(e, "LATENCIA TOTAL", "ms peor"),
    "perf_ping_spool": (e) => performance_meter(e, "LATENCIA DEL SPOOL", "ms peor"),
    "perf_ping_backhaul": (e) => performance_meter(e, "LATENCIA DE BACKHAUL", "ms peor"),

    "performancemeter_sigliatrip": (e) => e.textContent = "CLIENTE MODIFICADO",

    "sigliatrip_idiot_message": (e) => sigliatrip_message(
        e,
        "ESTE CLIENTE DE TETR.IO HA SIDO MODIFICADO",
        [
            "Las modificaciones de terceros no son compatibles con el equipo de TETR.IO y pueden causar problemas de compatibilidad, rendimiento y seguridad.",
            "No informes de problemas mientras uses modificaciones de terceros. Las modificaciones que alteren la jugabilidad estan estrictamente prohibidas."
        ],
        "Este mensaje desaparecera despues de 10 segundos"
    ),

    // me
    "me_anon": (e) => text(e, "ANONIMO"),
    "me_restricted": (e) => text(e, "RESTRINGIDO"),
    "me_bot": (e) => text(e, "BOT"),

    "back": (e) => text(e, "ATRAS"),
    "exit_electron": (e) => text(e, "SALIR"),
    "footer_text": (e) => {
        /* TEXTOS FIJOS */

        const translated = translateByDict(e, {
            "welcome to TETRIO!": "¡bienvenido a TETRIO!",
            "welcome to TETRA CHANNEL!": "¡bienvenido a TETRA CHANNEL!",
            "pick a game mode": "¡elige un modo de juego!",
            "scale the tower!": "¡sube por la torre!",
            "face off against others and rise up through the ranks!": "¡enfrentate a otros y sube por los rangos!",
            "pick a room to join!": "¡elige una sala para unirte!",
            "tweak your settings for a better TETRIO experience": "ajusta tu configuracion para una mejor experiencia en TETRIO",
            "thank you for playing TETRIO!": "¡gracias por jugar TETRIO!",
            "press START to begin playing": "pulsa INICIAR para comenzar a jugar",
            "the results are in!": "¡Ya estan los resultados!",
            "top the global leaderboards!": "¡Encabeza las clasificaciones mundiales!",
            "track your progression!": "¡Haz un seguimiento de tu progreso!",
            "view other players and their achievements!": "¡Consulta a otros jugadores y sus logros!",
            "view your achievement progress!": "¡Consulta tu progreso en los logros!",
            "change settings in your TETRIO account": "cambiar la configuración de tu cuenta de TETRIO"
        });

        if (translated) {
            return;
        }

        /* TEXTOS DINAMICOS */

        e.childNodes.forEach(node => {
            if (node.nodeType !== Node.TEXT_NODE) {
                return;
            }

            const nodeValue = node.textContent;

            const nodeTranslated = nodeValue
                .replace("EXPERT QUICK PLAY played by", "PARTIDA RAPIDA EXPERTO jugada por")
                .replace("QUICK PLAY played by", "PARTIDA RAPIDA jugada por")
                .replace("40 LINES played by", "40 LINEAS jugadas por")
                .replace("played on", "jugaron el")
                .replace("on", "el");

            if (nodeTranslated !== nodeValue) {
                node.textContent = nodeTranslated;
            }
        });
    },
    "footer_twitter": (e) => attr(e, "title", "Sigue a TETR.IO en X - enterate primero de las novedades"),
    "footer_discord": (e) => attr(e, "title", "Unete al Discord de TETR.IO - sigue las novedades, da tu opinion y diviertete"),
    "footer_github": (e) => attr(e, "title", "Visita el rastreador de problemas de TETR.IO - informa de errores y propone ideas para mejorar TETR.IO"),
    "footer_desktop": (e) => attr(e, "title", "Obten TETR.IO Desktop - el cliente oficial para escritorio"),
    "footer_supporter": (e) => attr(e, "title", "Apoya a TETR.IO o regala supporter y obten beneficios geniales"),

    "insiders_upsell": (e) => insiders_upsell(e),

    "outdated_warning": (e) => text(e.querySelector("p"), "se requiere una actualizacion para conectarse a los servidores multijugador. haz clic aqui para actualizar!"),
    "electron_ota_busy": (e) => text(e.querySelector("p"), "Se esta descargando una nueva version de TETR.IO Desktop. Se te avisara cuando este lista."),
    "electron_ota_info_left": (e) => text(e, "Iniciando descarga..."),
    "electron_ota_info_right": (e) => text(e, "Actualizando TETR.IO Desktop..."),
    "electron_ota_done": (e) => text(e.querySelector("p"), "Una nueva version de TETR.IO Desktop esta lista. Haz clic aqui para actualizar!"),

    "about_line": (e) => text(e, "POR <a href=\"https://osk.sh/\" target=\"_blank\"><img id=\"about_line_logo\" src=\"res/osk.svg\"></a>"),

    "about_logo": (e) => {
        const container = e.parentElement;

        if (!container) {
            return;
        }

        const aboutBlock = container.querySelector(".about_block");

        if (aboutBlock) {
            const value = aboutBlock.textContent.trim();

            const translated =
                "arma rompecabezas en este apilador online moderno pero familiar. juega contra amigos y enemigos de todo el mundo, o consigue un lugar en las clasificaciones - el futuro del apilado es tuyo!";

            if (value !== translated) {
                text(aboutBlock, translated);
            }
        }

        const creditTranslations = {
            "THE TEAM": "EL EQUIPO",
            "GLOBAL MODERATION & COMMUNITY MANAGEMENT TEAM": "EQUIPO DE MODERACION GLOBAL Y GESTION DE LA COMUNIDAD",
            "ALUMNI": "EXMIEMBROS",
            "QUICK PLAY ART BY": "ARTE DE PARTIDA RAPIDA POR",
            "ADDITIONAL MUSIC BY": "MUSICA ADICIONAL POR",
            "DEFAULT WALLPAPERS PROVIDED BY": "FONDOS DE PANTALLA PREDETERMINADOS PROPORCIONADOS POR",
            "SPECIAL THANKS": "AGRADECIMIENTOS ESPECIALES",
            "THANK YOU FOR PLAYING.": "GRACIAS POR JUGAR."
        };

        container.querySelectorAll(".credit_title").forEach(el => {
            const value = el.textContent.trim();
            const translated = creditTranslations[value];

            if (translated && translated !== value) {
                text(el, translated);
            }
        });

        const roleTranslations = {
            "FOUNDER & LEAD DIRECTOR": "FUNDADOR Y DIRECTOR PRINCIPAL",
            "programming, graphics design, production, general development": "programacion, diseno grafico, produccion, desarrollo general",
            "ENGINE, NETWORKING, SYSTEMS": "MOTOR, REDES, SISTEMAS",
            "AUDIO, MUSIC, PROGRAMMING": "AUDIO, MUSICA, PROGRAMACION",
            "assisting PROGRAMMING": "asistencia en PROGRAMACION",
            "GAME & WORLD DESIGN": "DISENO DEL JUEGO Y DEL MUNDO",
            "assisting GRAPHICS DESIGN": "asistencia en DISENO GRAFICO",
            "GLOBAL MODERATOR": "MODERADOR GLOBAL",
            "ADMINISTRATOR": "ADMINISTRADOR",
            "community moderator": "moderador de la comunidad",
            "assisting global moderator": "asistencia en moderacion global",
            "FLOORS 1-5": "PISOS 1-5",
            "FLOORS 6-8": "PISOS 6-8",
            "FLOORS 9-10": "PISOS 9-10",
            "CARD ART": "ARTE DE CARTAS"
        };

        container.querySelectorAll(".jp_kana").forEach(el => {
            const value = el.textContent.trim();
            const translated = roleTranslations[value];

            if (translated && translated !== value) {
                text(el, translated);
            }
        });
    },
    "version_line": (e) =>
        text(e, "version 1.7.8-PRODUCTION (presiona F8 para mas informacion)"),

    "about_disclaimer": (e) =>
        text(e, "© 2019 - 2026 OSK.<br>" +
            "TETR.IO, EL LOGO DE TETR.IO, TETRA LEAGUE, OSK Y EL LOGO DE OSK SON MARCAS REGISTRADAS DE OSK.<br>" +
            "TODAS LAS DEMAS MARCAS SON PROPIEDAD DE SUS RESPECTIVOS DUEÑOS. SE APLICAN LAS DOCTRINAS DE USO JUSTO DE MARCAS."),

    // Room View
    "leaveroom": (e) => e.textContent = "SALIR",

    "roomid_container": (e) => {
        const copy = e.querySelector(":scope > div:first-child");
        if (copy) copy.textContent = "haz clic para copiar la url";
    },

    "roomlisting_refresh": (e) => text(e, "ACTUALIZAR"),

    "roomid_change": (e) => e.textContent = "EDITAR",
    "room_players_container": (e) => { e.querySelector("h1").firstChild.textContent = "JUGADORES ("; },

    "ownstats": (e) => {
        const dict = {
            "TIME SURVIVED": "TIEMPO SOBREVIVIDO",
            "KO'S": "KOs",
            "LINES SENT": "LINEAS ENVIADAS",
            "LINES RECEIVED": "LINEAS RECIBIDAS",
            "ATTACK per MINUTE": "ATAQUE POR MINUTO",
            "PIECES per SECOND": "PIEZAS POR SEGUNDO",
            "VERSUS SCORE": "PUNTUACION VERSUS"
        };

        e.querySelectorAll("td").forEach(td => translateByDict(td, dict));
    },
    //"room_content_name": (e) => text(e, "NOMBRE DE LA SALA"),

    "room_opts_welcome": (e) => text(e, "BIENVENIDA"),
    "room_opts_room": (e) => text(e, "SALA"),
    "room_opts_match": (e) => text(e, "PARTIDA"),
    "room_opts_game": (e) => text(e, "JUEGO"),

    "room_content_welcome": (e) => room_welcome(e),
    "room_content_room": (e) => room_room(e),
    "room_content_match": (e) => room_match(e),
    "room_content_game": (e) => room_game(e),
    "finish_guide_room": (e) => text(e, "¡ENTENDIDO!"),
    "room_opts_save": (e) => text(e, "GUARDAR"),

    "room_maintenance_warning": (e) => text(e, "AVISO: el servidor se reiniciara pronto!"),

    "sys_guide": (e) => sys_guide(e),
    "finish_guide_sys": (e) => text(e, "ENTENDIDO!"),

    "chat_input": (e) => attr(e, "placeholder", "mensaje..."),

    "room_switchbracket": (e) => {
        if (e.firstChild) {
            e.firstChild.textContent = "JUGANDO";
        }
    },
    "swb_addendum": (e) => text(e, "haz clic para cambiar a ESPECTADORES"),
    "room_auto_info": (e) => text(e, "esperando jugadores"),
    "room_ingame_warning": (e) => text(e, 'EN PARTIDA<div id="igw_addendum"><div id="igw_spectate" data-hover="hover" data-hit="confirm">ESPECTAR</div> O <div id="igw_zen" data-hover="hover" data-hit="confirm">ZEN</div></div>'),
    "startroom": (e) => text(e, 'INICIAR<div id="sr_playercount">0 JUGADORES</div>'),

    // ZENITH
    "leavezenith": (e) => text(e, "SALIR"),

    // victory view
    "backtoroom": (e) => text(e, "SIGUIENTE"),
    "victory_downloadreplay": (e) => text(e, "Ǿ GUARDAR REPETICION"),

    // end league view
    "backtoleague": (e) => text(e, "SIGUIENTE"),
    "viewreplay_endleague": (e) => {
        text(e, "REPETICION");
        e.style.width = "6.5em";
    },
    "league_chat_input": (e) => attr(e, "placeholder", "mensaje..."),
    "league_chat_container": (e) => {
        e.querySelectorAll(
            ".chat_banner p, .chat_message.system p"
        ).forEach(p => translateByDict(p, CHAT_SYSTEM_MESSAGES));
    },
    "referee_top": (e) => replaceTerm(e, "TETRA LEAGUE", "LIGA TETRA"),

    "scoreslide_header": (e) => replaceTerm(e, "TETRA LEAGUE", "LIGA TETRA"),

    "leagueresult": (e) => translateByDict(e, {
        "DEFEAT": "DERROTA",
        "VICTORY": "VICTORIA"
    }),
    "league_standing_container": (e) => {
        const h1 = e.querySelector("h1");
        if (h1) text(h1, "CLASIFICACION DE LIGA TETRA");
    },

    "league_ticker": (e) => {
        const spans = e.querySelectorAll("span");

        if (spans[0]) spans[0].setAttribute("title", "Tu puntuacion sin procesar en el sistema Glicko-2. Un valor mayor es mejor.");
        if (spans[1]) spans[1].setAttribute("title", "Nivel de incertidumbre del sistema Glicko-2 sobre tu puntuacion. Un valor menor es mejor.");

        const nodes = e.childNodes;
        nodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.textContent = node.textContent
                    .replace(" - games won:", " - partidas ganadas:")
                    .replace("games won:", "partidas ganadas:");
            }
        });
    },
    "league_warning": (e) => {
        text(e, "juega mas partidas para recibir un rango");
        attr(e, "title", "Para recibir un rango y aparecer en las clasificaciones, tu desviacion de rating debe ser menor que 100.");
    },
    "mm_playercount": (e) => {
        e.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.textContent = node.textContent
                    .replace("IN QUEUE", "EN COLA")
                    .replace("IN GAME", "EN PARTIDA");
            }
        });
    },
    "mm_avgtime": (e) => {
        if (e.firstChild) {
            e.firstChild.textContent = "tiempo estimado de cola: ";
        }
    },

    "enter_matchmaking": (e) => {
        const h1 = e.querySelector("h1");
        const p = e.querySelector("p");

        if (h1) text(h1, "ENTRAR EN MATCHMAKING");
        if (p) text(p, "ABANDONAR ANTES DE TIEMPO ES PENALIZADO");
    },

    "tetra_jump_tl": (e) => {
        text(e, "Ǳ CLASIFICACIONES");
        attr(e, "title", "Abrir en el sitio independiente de TETRA CHANNEL");

        const block = e.closest(".scroller_block");

        if (block) {
            const h1 = block.querySelector("h1");
            const p = block.querySelector("p");

            if (h1) text(h1, "COMO FUNCIONA?");

            if (p) text(p,
                "entra en matchmaking y se te emparejara con un jugador de habilidad similar en una partida 1v1 VERSUS.<br>" +
                "gana partidas para obtener TR y subir de rango! debes jugar al menos 10 partidas para ver tu TR. para obtener un RANGO y entrar en las CLASIFICACIONES GLOBALES, sigue jugando de forma constante.<br>" +
                "si abandonas la partida antes de tiempo, debes volver a unirte inmediatamente o seras penalizado. conquista los rangos!"
            );
        }
    },

    // 40 lines
    "tetra_jump_40l": (e) => {
        text(e, "Ǳ CLASIFICACIONES");
        attr(e, "title", "Abrir en el sitio independiente de TETRA CHANNEL");

        const block = e.closest(".scroller_block");

        if (block) {
            const h1 = block.querySelector("h1");
            const p = block.querySelector("p");
            const pb = block.querySelector("#pbdisplay_40l");
            const pbInner = block.querySelector("#pbdisplay_40l_inner");

            if (h1) text(h1, "40 LINEAS");

            if (p) text(p,
                "completa 40 lineas en el menor tiempo posible.<br>" +
                "la puntuacion no importa aqui, busca el record mundial!"
            );

            if (pb) text(pb, "MEJOR MARCA PERSONAL");

            if (pbInner) {
                // Conserva el tiempo y su span dinamico
                const span = pbInner.querySelector("span");
                if (span) {
                    const time = pbInner.firstChild.textContent;
                    pbInner.innerHTML = "";
                    pbInner.appendChild(document.createTextNode(time));
                    pbInner.appendChild(span);
                }
            }
        }
    },

    "start_40l": (e) => text(e, "INICIAR"),
    "pro_40l": (e) => {
        text(e, "modo pro");
        attr(e, "title", "Muestra informacion adicional y organiza parte de la informacion para jugadores pro.");
        const h1 = e.parentElement.querySelector("h1");
        if (h1) text(h1, "OPCIONES");

    },
    "pro_40l_alert": (e) => {
        text(e, "avisar por error de precision");
        attr(e, "title", "Avisarme cuando cometa un error de precision.");
    },
    "pro_40l_retry": (e) => {
        text(e, "reintentar por error de precision");
        attr(e, "title", "Reiniciar la partida cuando cometa un error de precision.");
    },
    "stride_40l": (e) => {
        text(e, "modo agil");
        attr(e, "title", "Acelera las animaciones, desactiva mantener para reintentar y evita que la primera pieza sea S, Z u O.");
    },
    "slot_40l_counter1": (e) => slot_40l_counter(e, 1, "left"),
    "slot_40l_counter2": (e) => slot_40l_counter(e, 2, "left"),
    "slot_40l_counter3": (e) => slot_40l_counter(e, 3, "left"),
    "slot_40l_counter4": (e) => slot_40l_counter(e, 4, "left"),
    "slot_40l_counter5": (e) => slot_40l_counter(e, 5, "right"),

    // blitz
    "tetra_jump_blitz": (e) => {
        text(e, "Ǳ CLASIFICACIONES");
        attr(e, "title", "Abrir en el sitio independiente de TETRA CHANNEL");

        const block = e.closest(".scroller_block");

        if (block) {
            const h1 = block.querySelector("h1");
            const p = block.querySelector("p");
            const pb = block.querySelector("#pbdisplay_blitz");
            const pbInner = block.querySelector("#pbdisplay_blitz_inner");

            if (h1) text(h1, "BLITZ");
            if (p) text(p, "consigue tantos puntos como puedas en 2 minutos!<br>limpia lineas para subir de nivel y conseguir mas puntos y velocidad!");
            if (pb) text(pb, "MEJOR MARCA PERSONAL");
            if (pbInner) text(pbInner, pbInner.textContent);

        }
    },
    "start_blitz": (e) => text(e, "INICIAR"),

    "pro_blitz": (e) => {
        text(e, "modo pro");
        attr(e, "title", "Muestra informacion adicional y organiza parte de la informacion para jugadores pro.");

        const h1 = e.parentElement.querySelector("h1");
        if (h1) text(h1, "OPCIONES");
    },

    "pro_blitz_alert": (e) => {
        text(e, "avisar por error de precision");
        attr(e, "title", "Avisarme cuando cometa un error de precision.");
    },

    "pro_blitz_retry": (e) => {
        text(e, "reintentar por error de precision");
        attr(e, "title", "Reiniciar la partida cuando cometa un error de precision.");
    },

    "stride_blitz": (e) => {
        text(e, "modo agil");
        attr(e, "title", "Acelera las animaciones, desactiva mantener para reintentar y evita que la primera pieza sea S, Z u O.");
    },

    "slot_blitz_counter1": (e) => slot_blitz_counter(e, 1, "left"),
    "slot_blitz_counter2": (e) => slot_blitz_counter(e, 2, "left"),
    "slot_blitz_counter3": (e) => slot_blitz_counter(e, 3, "left"),
    "slot_blitz_counter4": (e) => slot_blitz_counter(e, 4, "left"),
    "slot_blitz_counter5": (e) => slot_blitz_counter(e, 5, "right"),

    // zen
    "zen_destroy": (e) => {
        text(e, "REINICIAR");
        attr(e, "title", "Eliminar todo el progreso de ZEN.");
        const block = e.closest(".scroller_block");

        if (block) {
            const p = block.querySelector("p");
            if (p) {
                text(
                    p,
                    "relajate o entrena en un modo interminable! tu progreso se guarda entre partidas.<br>" +
                    "ajusta la experiencia o entrena usando la BARRA LATERAL DE ZEN.<br>" +
                    "puedes deshacer y rehacer colocaciones con CTRL+Z y CTRL+Y!"
                );
            }
        }
    },
    "start_zen": (e) => text(e, "INICIAR"),

    // solo custom
    "custom_export": (e) => {
        text(e, "EXPORTAR CONFIGURACION");
        const block = e.closest(".scroller_block");
        if (block) {
            const p = block.querySelector("p");
            if (p) {
                text(p, "juega como quieras! las repeticiones no se envian.");
            }
        }
    },
    "start_custom": (e) => text(e, "INICIAR"),
    "custom_opts_game": (e) => text(e, "JUEGO"),
    "custom_opts_objective": (e) => text(e, "OBJETIVO"),
    "custom_opts_meta": (e) => text(e, "META"),
    "custom_content_game": (e) => custom_game(e),
    "custom_content_objective": (e) => custom_objective(e),
    "custom_content_meta": (e) => custom_meta(e),

    // Results
    "result_header": (e) => text(e, "RESULTADO FINAL"),
    "personalrank_results": (e) => {
        const p = e.querySelector("p");
        if (p) text(p, "RANGO PERSONAL");
    },
    "personalrank_results_sub": (e) => {
        e.childNodes.forEach(node => {
            if (node.nodeType !== Node.TEXT_NODE) return;

            const value = node.textContent;

            const translated = value
                .replace(" points ", " puntos ")
                .replace(" behind", " de retraso")
                .replace("last PB was ", "la ultima marca personal fue hace ")
                .replace(/\bSECOND\b/g, "SEGUNDO")
                .replace(/\bSECONDS\b/g, "SEGUNDOS")
                .replace(/\bMINUTE\b/g, "MINUTO")
                .replace(/\bMINUTES\b/g, "MINUTOS")
                .replace(/\bHOUR\b/g, "HORA")
                .replace(/\bHOURS\b/g, "HORAS")
                .replace(/\bDAY\b/g, "DIA")
                .replace(/\bDAYS\b/g, "DIAS")
                .replace(/\bMONTH\b/g, "MES")
                .replace(/\bMONTHS\b/g, "MESES")
                .replace(/\bYEAR\b/g, "ANO")
                .replace(/\bYEARS\b/g, "ANOS")
                .replace("ago", "atras");

            if (translated !== value) {
                node.textContent = translated;
            }
        });
    },
    "countryrank_results": (e) => {
        const p = e.querySelector("p");
        if (p) text(p, "RANGO NACIONAL");
    },
    "globalrank_results": (e) => {
        const p = e.querySelector("p");
        if (p) text(p, "RANGO GLOBAL");
    },
    "playerresults": (e) => {
        e.querySelectorAll(".record_extra").forEach(element => {
            element.childNodes.forEach(node => {
                if (node.nodeType !== Node.TEXT_NODE) return;

                const value = node.textContent;
                const translated = value
                    .replace("ko's", "KO")
                    .replace("sent", "enviadas")
                    .replace("received", "recibidas");

                if (translated !== value) {
                    node.textContent = translated;
                }
            });
        });

        e.querySelectorAll(".record_result").forEach(result => {
            if (result.textContent === "SURVIVOR") {
                text(result, "SUPERVIVIENTE");
            }
        });
    },
    "results": (e) => {
        const disputed = e.querySelector(".disputed_submission");
        const retry = e.querySelector(".retry_submission");

        if (disputed) {
            const h1 = disputed.querySelector("h1");
            const p = disputed.querySelector("p");

            if (h1) {
                text(h1, "ESTA REPETICION ESTA EN DISPUTA");
            }

            if (p) {
                text(
                    p,
                    "esta repeticion ha sido marcada automaticamente como sospechosa por los sistemas anti-trampas y sera revisada por el personal. " +
                    "si esta repeticion es legitima, este mensaje desaparecera automaticamente."
                );
            }
        }
        if (retry) {
            const error = retry.querySelector(".submissionerror");
            const retryButton = retry.querySelector("#resubmitreplay_results");

            if (error) {
                const span = error.querySelector("#submissionerror_results");

                if (span) {
                    error.firstChild.textContent = "fallo el envio de la repeticion: ";
                }
            }

            if (retryButton) text(retryButton, "REINTENTAR");
        }

        e.querySelectorAll("h1").forEach(h1 => {
            const value = h1.textContent.trim();

            if (value === "STATS") {
                text(h1, "ESTADISTICAS");
            }

            if (value === "HANDLING") {
                text(h1, "MANEJO");
            }
        });
    },

    "start_results": (e) => {
        text(e, "OTRA VEZ");
        e.style.width = "6.25em";
    },

    "watchreplay_results": (e) => text(e, "REPETICION"),

    "results_stats_set_overview": (e) => text(e, "RESUMEN"),

    "results_stats_set_full": (e) => text(e, "COMPLETO"),

    "results_replayinfo_anchor": (e) => {
        const watch = e.querySelector("#watchreplay_results");

        if (watch) {
            text(watch, "REPETICION");
        }
    },

    "handling_item_arr": (e) => {
        const parent = e.closest(".handling_item");

        if (parent) {
            attr(
                parent,
                "title",
                "Automatic Repeat Rate: velocidad a la que se mueven los tetrominos al mantener pulsadas las teclas de movimiento, medida en frames por movimiento."
            );
        }
    },

    "handling_item_das": (e) => {
        const parent = e.closest(".handling_item");

        if (parent) {
            attr(
                parent,
                "title",
                "Delayed Auto Shift: tiempo entre la pulsacion inicial de una tecla y el comienzo de su movimiento automatico repetido, medido en frames."
            );
        }
    },

    "handling_item_sdf": (e) => {
        const parent = e.closest(".handling_item");

        if (parent) {
            attr(
                parent,
                "title",
                "Soft Drop Factor: factor por el que el descenso rapido modifica la velocidad de gravedad."
            );
        }
    },

    // Tetra
    "tetra_find": (e) => {
        attr(
            e,
            "placeholder",
            "introduce el id de la repeticion, url o nombre de usuario y pulsa enter..."
        );
    },

    "tetra_standalone": (e) => {
        const h1 = e.querySelector("h1");
        const p = e.querySelector("p");

        if (h1) text(h1, "VISITAR EL SITIO DE TETRA CHANNEL");
        if (p) text(p, "VER CLASIFICACIONES GLOBALES, CLASIFICACIONES NACIONALES, PAGINAS DE USUARIOS Y MAS");
    },

    "tetra_leaderboards": (e) => {
        const h1 = e.querySelector("h1");
        const p = e.querySelector("p");

        if (h1) text(h1, "CLASIFICACIONES");
        if (p) text(p, "CLASIFICACIONES GLOBALES DE 40 LINEAS, BLITZ Y PARTIDA RAPIDA");
    },

    "tetra_me": (e) => {
        const h1 = e.querySelector("h1");
        const p = e.querySelector("p");

        if (h1) text(h1, "YO");
        if (p) text(p, "VER TUS PROPIOS RECORDS Y PARTIDAS RECIENTES");

        attr(
            e,
            "data-block-reason",
            "LOS USUARIOS ANONIMOS NO PUEDEN ESTABLECER RECORDS"
        );
    },
    "tetra_myrecords": (e) => {
        const heading = e.closest('[data-menuview="tetra_me"]')?.querySelector("h1");

        if (heading && heading.textContent !== "YO") {
            text(heading, "YO");
        }

        const gameModes = {
            "RECENT": "RECIENTES",
            "40 LINES": "40 LINEAS",
            "BLITZ": "BLITZ",
            "QUICK PLAY": "PARTIDA RAPIDA",
            "expert quick play": "partida rapida experta",
            "TETRA LEAGUE": "LIGA TETRA"
        };

        const menu = e.closest('[data-menuview="tetra_me"]');

        if (menu) {
            menu.querySelectorAll(".tetra_myrecords_gamemode").forEach(el => {
                const value = el.textContent.trim();
                const translated = gameModes[value];

                if (translated && translated !== value) {
                    text(el, translated);
                }
            });

            const myPage = menu.querySelector("#tetra_jump_mypage");

            if (myPage) {
                const value = myPage.textContent;
                const translated = value.replace("MI PAGINA", "MI PAGINA");

                if (translated !== value) {
                    text(myPage, translated);
                }
            }
        }

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

        e.querySelectorAll('.record_result img[title]').forEach(img => {
            const value = img.getAttribute("title");

            if (value === "Gravity") {
                attr(img, "title", "Gravedad");
            }
        });
    },
    "tetra_players": (e) => {
        const h1 = e.querySelector("h1");
        const p = e.querySelector("p");

        if (h1) text(h1, "JUGADORES");
        if (p) text(p, "CLASIFICACIONES DE TETRA LEAGUE Y XP");
    },
    "tetra_players_content": (e) => {
        e.querySelectorAll(".record_ts").forEach(el => {
            el.childNodes.forEach(node => {
                if (node.nodeType !== Node.TEXT_NODE) return;

                const value = node.textContent;
                const translated = value
                    .replace("games won", "partidas ganadas")
                    .replace("achievements", "logros")
                    .replace("TOWARDS NEXT LEVEL", "PARA EL SIGUIENTE NIVEL");

                if (translated !== value) {
                    node.textContent = translated;
                }
            });
        });

        e.querySelectorAll(".record_owner img[title]").forEach(img => {
            const title = img.getAttribute("title");

            if (title === "This person is supporting TETR.IO ♥") {
                attr(img, "title", "Esta persona apoya a TETR.IO ♥");
                return;
            }

            const translated = countryTranslations[title];

            if (translated && translated !== title) {
                attr(img, "title", translated);
            }
        });

        const achievementTranslations = {
            "Issued-Once (+1AR)": "Otorgado una vez (+1AR)",
            "Bronze (+1AR)": "Bronce (+1AR)",
            "Silver (+2AR)": "Plata (+2AR)",
            "Gold (+3AR)": "Oro (+3AR)",
            "Platinum (+5AR)": "Platino (+5AR)",
            "Diamond (+8AR)": "Diamante (+8AR)",
            "Top 100 in Competitive Achievements (+1AR)": "Top 100 en logros competitivos (+1AR)",
            "Top 50 in Competitive Achievements (+2AR)": "Top 50 en logros competitivos (+2AR)",
            "Top 25 in Competitive Achievements (+3AR)": "Top 25 en logros competitivos (+3AR)",
            "Top 10 in Competitive Achievements (+4AR)": "Top 10 en logros competitivos (+4AR)",
            "Top 5 in Competitive Achievements (+5AR)": "Top 5 en logros competitivos (+5AR)",
            "Top 3 in Competitive Achievements (+6AR)": "Top 3 en logros competitivos (+6AR)"
        };

        e.querySelectorAll(".record_extra img[title]").forEach(img => {
            const title = img.getAttribute("title");
            const translated = achievementTranslations[title];

            if (translated && translated !== title) {
                attr(img, "title", translated);
            }
        });

        e.querySelectorAll(".leveltag[title]").forEach(el => {
            const title = el.getAttribute("title");

            if (!title) return;

            const translated = title.replace(
                "% towards next level",
                "% para el siguiente nivel"
            );

            if (translated !== title) {
                attr(el, "title", translated);
            }
        });
    },
    "tetra_achievements": (e) => {
        const h1 = e.querySelector("h1");
        const p = e.querySelector("p");

        if (h1) text(h1, "LOGROS");
        if (p) text(p, "VER TUS LOGROS Y SU PROGRESO");

        attr(
            e,
            "data-block-reason",
            "LOS USUARIOS ANONIMOS NO PUEDEN OBTENER LOGROS"
        );
    },

    "tetra_live": (e) => {
        const h1 = e.querySelector("h1");

        if (h1) text(h1, "EN DIRECTO");
    },

    "tetra_news": (e) => {
        const h1 = e.querySelector("h1");

        if (h1) text(h1, "NOTICIAS DE TETRA");
    },

    // tetra records view
    "tetra_records_view": (e) => {
        const h1 = e.querySelector(".scroller_block > h1");
        const jump = e.querySelector("#tetra_jump_leaderboards");
        const timer = e.querySelector("#tetra_zenithtimer");

        if (h1) {
            text(h1, "CLASIFICACIONES");
        }

        if (jump) {
            text(jump, "Ǳ VER TODO");
            attr(
                jump,
                "title",
                "Abrir en el sitio independiente de TETRA CHANNEL"
            );
        }

        const gamemode = {
            "40 LINES": "40 LINEAS",
            "BLITZ": "BLITZ",
            "QUICK PLAY": "PARTIDA RAPIDA",
            "expert quick play": "PARTIDA RAPIDA EXPERTA"
        };

        e.querySelectorAll(".tetra_records_gamemode").forEach(button => {
            const translation = gamemode[button.textContent.trim()];

            if (translation) {
                text(button, translation);
            }
        });

        const scale = {
            "WORLD": "MUNDO",
            "COUNTRY": "PAIS",
            "FRIENDS": "AMIGOS"
        };

        e.querySelectorAll(".tetra_records_scale").forEach(button => {
            const translation = scale[button.textContent.trim()];

            if (translation) {
                text(button, translation);
            }
        });

        if (timer) {
            const bold = timer.querySelector("b");

            if (bold) {
                timer.firstChild.textContent = "LAS CLASIFICACIONES SE ACTUALIZAN EN ";
            } else {
                text(timer, "LAS CLASIFICACIONES SE ACTUALIZAN PRONTO");
            }
        }
    },

    // tetra me
    "tetra_myrecords_gamemode": (e) => translateByDict(e, {
        "RECENT": "RECIENTES",
        "40 LINES": "40 LINEAS",
        "BLITZ": "BLITZ",
        "QUICK PLAY": "PARTIDA RAPIDA",
        "expert quick play": "PARTIDA RAPIDA EXPERTA",
        "TETRA LEAGUE": "TETRA LEAGUE"
    }),

    "tetra_jump_mypage": (e) => {
        text(e, "Ǳ MI PAGINA");
        attr(
            e,
            "title",
            "Abrir en el sitio independiente de TETRA CHANNEL"
        );
    },

    // tetra players view
    "tetra_players_view": (e) => {
        const h1 = e.querySelector(".scroller_block > h1");
        const p = e.querySelector(".scroller_block > p");
        const jump = e.querySelector("#tetra_jump_players");

        if (h1) {
            text(h1, "JUGADORES");
        }

        if (p) {
            text(
                p,
                "solo se muestran los primeros 100. para ver la clasificacion completa, haz clic en VER TODO arriba."
            );
        }

        if (jump) {
            text(jump, "Ǳ VER TODO");
            attr(
                jump,
                "title",
                "Abrir en el sitio independiente de TETRA CHANNEL"
            );
        }

        const leaderboardTranslations = {
            "BY LEAGUE RATING": "POR RATING DE LIGA",
            "BY ACHIEVEMENT RATING": "POR RATING DE LOGROS",
            "BY XP": "POR XP"
        };

        e.querySelectorAll(".tetra_players_lb").forEach(button => {
            const translation = leaderboardTranslations[button.textContent.trim()];

            if (translation) {
                text(button, translation);
            }
        });

        const scaleTranslations = {
            "WORLD": "MUNDO",
            "COUNTRY": "PAIS",
            "FRIENDS": "AMIGOS"
        };

        e.querySelectorAll(".tetra_players_scale").forEach(button => {
            const translation = scaleTranslations[button.textContent.trim()];

            if (translation) {
                text(button, translation);
            }
        });
    },

    // tetra achievements page
    "tetra_achievements_page": (e) => {
        const helpA = e.querySelector("#tetra_achievement_header_help_a");
        const helpB = e.querySelector("#tetra_achievement_header_help_b");

        if (helpA) {
            text(helpA, "selecciona un espacio para mostrar un logro en tu perfil");
        }

        if (helpB) {
            text(
                helpB,
                "selecciona un logro para mostrarlo, o selecciona el espacio nuevamente para cancelar"
            );
        }

        e.querySelectorAll(".achievement_case_icon span").forEach(span => {
            if (span.textContent.trim() === "EMPTY") {
                text(span, "VACIO");
            }
        });
    },

    // config
    "controls_keybinds_style_guideline": (e) => {
        text(e, "ESTANDAR");

        attr(
            e,
            "title",
            "Los controles estandar, como los que se ven en muchos juegos de bloques."
        );

        const block = e.closest(".scroller_block");

        if (!block) {
            return;
        }

        const h1 = block.querySelector("h1.collapse_target");

        if (h1) {
            const value = h1.textContent.trim();

            if (value === "CONTROLS") {
                text(h1, "CONTROLES");
            }

            const title = h1.getAttribute("title");

            if (title === "Change the way you control TETR.IO") {
                attr(
                    h1,
                    "title",
                    "Cambia la forma en que controlas TETR.IO"
                );
            }
        }
    },
    "controls_keybinds_style_wasd": (e) => {
        text(e, "WASD");
        attr(
            e,
            "title",
            "Distribucion basada en WASD, que asigna el movimiento de las piezas a la mano izquierda y la rotacion a la derecha."
        );
    },

    "controls_keybinds_style_custom": (e) => {
        text(e, "PERSONALIZADO");
        attr(
            e,
            "title",
            "Controles personalizados - configurarlos como quieras."
        );
    },

    "controls_keybinds_list_guideline": (e) => {
        const translations = [
            "mover la pieza que cae a la izquierda",
            "mover la pieza que cae a la derecha",
            "descenso rapido",
            "descenso instantaneo",
            "rotar en sentido antihorario",
            "rotar en sentido horario",
            "rotar 180",
            "intercambiar pieza en HOLD",
            "abandonar partida",
            "reintentar partida",
            "abrir chat",
            "elegir estrategia de objetivos",
            "moverse por los menus",
            "confirmar en los menus",
            "volver en los menus",
            "abrir panel social"
        ];

        const rows = e.querySelectorAll("tbody tr");

        rows.forEach((row, index) => {
            const label = row.querySelector("td:first-child");

            if (label && translations[index]) {
                text(label, translations[index]);
            }
        });
    },
    "controls_keybinds_list_wasd": (e) => {
        const translations = [
            "mover la pieza que cae a la izquierda",
            "mover la pieza que cae a la derecha",
            "descenso rapido",
            "descenso instantaneo",
            "rotar en sentido antihorario",
            "rotar en sentido horario",
            "rotar 180",
            "intercambiar pieza en HOLD",
            "abandonar partida",
            "reintentar partida",
            "abrir chat",
            "elegir estrategia de objetivos",
            "moverse por los menus",
            "confirmar en los menus",
            "volver en los menus",
            "abrir panel social"
        ];

        const rows = e.querySelectorAll("tbody tr");

        rows.forEach((row, index) => {
            const label = row.querySelector("td:first-child");

            if (label && translations[index]) {
                text(label, translations[index]);
            }
        });
    },
    "controls_keybinds_list_custom": (e) => {
        const translations = [
            "mover la pieza que cae a la izquierda",
            "mover la pieza que cae a la derecha",
            "descenso rapido",
            "descenso instantaneo",
            "rotar en sentido antihorario",
            "rotar en sentido horario",
            "rotar 180",
            "intercambiar pieza en HOLD",
            "abandonar partida",
            "reintentar partida",
            "abrir chat",
            "estrategia de objetivos: equilibrada",
            "estrategia de objetivos: eliminaciones",
            "estrategia de objetivos: aleatoria",
            "estrategia de objetivos: represalia",
            "menus: arriba",
            "menus: abajo",
            "menus: izquierda",
            "menus: derecha",
            "menus: confirmar",
            "menus: volver",
            "abrir panel social"
        ];

        const titles = {
            "targeting strategy even":
                "Tiende a seleccionar como objetivo a quienes han recibido menos basura durante esta ronda.",
            "targeting strategy eliminations":
                "Tiende a seleccionar como objetivo a quienes tienen la pila mas alta en ese momento.",
            "targeting strategy random":
                "Selecciona objetivos al azar, sin ningun criterio.",
            "targeting strategy payback":
                "Selecciona al jugador que te envio basura mas recientemente, o a un jugador al azar si no has recibido basura o el objetivo fue eliminado."
        };

        const rows = e.querySelectorAll("tbody tr");

        rows.forEach((row, index) => {
            const label = row.querySelector("td:first-child");

            if (!label) {
                return;
            }

            const originalTitle = label.getAttribute("title");

            if (translations[index]) {
                text(label, translations[index]);
            }

            if (originalTitle && titles[originalTitle]) {
                attr(label, "title", titles[originalTitle]);
            }
        });
    },
    "header_text": (e) => {
        const dict = {
            "HOME": "INICIO",
            "MULTIPLAYER": "MULTIJUGADOR",
            "MULTIPLAYER / ROOM LISTING": "MULTIJUGADOR / LISTA DE SALAS",
            "TETRA LEAGUE": "LIGA TETRA",
            "TETRA LEAGUE / RESULTS": "LIGA TETRA / RESULTADOS",
            "QUICK PLAY": "PARTIDA RAPIDA",
            "SOLO": "SOLO",
            "40 LINES": "40 LINEAS",
            "BLITZ": "BLITZ",
            "ZEN": "ZEN",
            "CUSTOM": "PERSONALIZADO",
            "TETRA CHANNEL": "CANAL TETRA",
            "TETRA CHANNEL / LEADERBOARDS": "CANAL TETRA / CLASIFICACIONES",
            "TETRA CHANNEL / ME": "CANAL TETRA / YO",
            "TETRA CHANNEL / PLAYERS": "CANAL TETRA / JUGADORES",
            "TETRA CHANNEL / ACHIEVEMENTS": "CANAL TETRA / LOGROS",
            "CONFIG": "CONFIGURACION",
            "CONFIG / TETRIO DESKTOP": "CONFIGURACION / TETRIO DESKTOP",
            "CONFIG / ACCOUNT": "CONFIGURACION / CUENTA",
            "ABOUT": "ACERCA DE",
            "RESULTS": "RESULTADOS"
        };

        const value = e.textContent.trim();
        const translated = dict[value];

        if (translated && translated !== value) {
            const cheeky = e.querySelector(".cheeky");

            if (cheeky && value === "CONFIG / TETRIO DESKTOP") {
                const textNode = Array.from(e.childNodes).find(
                    node =>
                        node.nodeType === Node.TEXT_NODE &&
                        node.textContent.trim() === "CONFIG /"
                );

                if (textNode) {
                    textNode.textContent = "CONFIGURACION / ";
                }
            } else {
                text(e, translated);
            }
        }
    },
    "controls_sensitivity": (e) => {
        const container = e.closest('[data-menuview="config"]');

        if (!container) {
            return;
        }

        const subtitle = container.querySelector(".csub");

        if (subtitle) {
            text(
                subtitle,
                "los controles pueden configurarse en CONTROLES PERSONALIZADOS; solo pulsa los botones del control que quieras asignar."
            );
        }

        const sensitivity = container.querySelector("#controls_sensitivity");

        if (sensitivity) {
            const stat = sensitivity.closest(".stat");

            if (stat) {
                const name = stat.querySelector(".stat_name");
                const lower = stat.querySelector(".stat_range_lower");
                const upper = stat.querySelector(".stat_range_upper");

                if (name) text(name, "sensibilidad del control");
                if (lower) text(lower, "BAJA");
                if (upper) text(upper, "ALTA");

                attr(
                    stat,
                    "title",
                    "Para sticks analogicos y botones, indica que tan sensibles son los controles."
                );
            }
        }

        const vibration = container.querySelector("#controls_vibration");

        if (vibration) {
            const stat = vibration.closest(".stat");

            if (stat) {
                const name = stat.querySelector(".stat_name");
                const lower = stat.querySelector(".stat_range_lower");
                const upper = stat.querySelector(".stat_range_upper");

                if (name) text(name, "intensidad de vibracion");
                if (lower) text(lower, "DEBIL");
                if (upper) text(upper, "FUERTE");

                attr(
                    stat,
                    "title",
                    "Para controles, indica que tan intensa es la vibracion. No todos los dispositivos y navegadores son compatibles."
                );
            }
        }
    },

    "handling_reset": (e) => {
        text(e, "RESTABLECER");
        attr(e, "title", "Restablecer estas opciones a sus valores predeterminados.");

        const block = e.closest(".scroller_block");

        if (block) {
            const headings = block.querySelectorAll("h1");

            headings.forEach(h1 => {
                const value = h1.textContent.trim();

                if (value === "HANDLING") {
                    text(h1, "MANEJO");
                    attr(h1, "title", "Cambia la forma en que se comportan los controles de TETR.IO");
                }

                if (value === "ROTATION BUFFERING (IRS)") {
                    text(h1, "BUFFER DE ROTACION (IRS)");
                }

                if (value === "HOLD BUFFERING (IHS)") {
                    text(h1, "BUFFER DE HOLD (IHS)");
                }
            });
        }
    },

    "handling_test": (e) => {
        text(e, "PROBAR");
        attr(e, "title", "Probar estas opciones.");
    },

    "handling_arr": (e) => {
        const stat = e.closest(".handling_stat");

        if (stat) {
            const name = stat.querySelector(".stat_name");
            const lower = stat.querySelector(".stat_range_lower");
            const upper = stat.querySelector(".stat_range_upper");

            if (name) text(name, "ARR");
            if (lower) text(lower, "LENTO");
            if (upper) text(upper, "RAPIDO");

            attr(
                stat,
                "title",
                "Automatic Repeat Rate: velocidad a la que se mueven los tetrominos al mantener pulsadas las teclas de movimiento, medida en frames por movimiento."
            );
        }
    },

    "handling_das": (e) => {
        const stat = e.closest(".handling_stat");

        if (stat) {
            const name = stat.querySelector(".stat_name");
            const lower = stat.querySelector(".stat_range_lower");
            const upper = stat.querySelector(".stat_range_upper");

            if (name) text(name, "DAS");
            if (lower) text(lower, "LENTO");
            if (upper) text(upper, "RAPIDO");

            attr(
                stat,
                "title",
                "Delayed Auto Shift: tiempo entre la pulsacion inicial de una tecla y el comienzo de su movimiento automatico repetido, medido en frames."
            );
        }
    },

    "handling_dcd": (e) => {
        const stat = e.closest(".handling_stat");

        if (stat) {
            const name = stat.querySelector(".stat_name");
            const lower = stat.querySelector(".stat_range_lower");
            const upper = stat.querySelector(".stat_range_upper");

            if (name) text(name, "DCD");
            if (lower) text(lower, "LENTO");
            if (upper) text(upper, "RAPIDO");

            attr(
                stat,
                "title",
                "DAS Cut Delay: si no es 0, cualquier movimiento DAS en curso se pausara durante un tiempo determinado despues de soltar o rotar una pieza, medido en frames."
            );
        }
    },

    "handling_sdf": (e) => {
        const stat = e.closest(".handling_stat");

        if (stat) {
            const name = stat.querySelector(".stat_name");
            const lower = stat.querySelector(".stat_range_lower");
            const upper = stat.querySelector(".stat_range_upper");

            if (name) text(name, "SDF");
            if (lower) text(lower, "LENTO");
            if (upper) text(upper, "RAPIDO");

            attr(
                stat,
                "title",
                "Soft Drop Factor: factor por el que el descenso rapido modifica la velocidad de gravedad."
            );
        }
    },

    "handling_safelock": (e) => {
        text(e, "evitar descensos instantaneos accidentales");
        attr(
            e,
            "title",
            "Si esta activado, cuando una pieza se bloquea por si sola, la tecla de descenso instantaneo no estara disponible durante unos frames. Esto evita descensos instantaneos accidentales."
        );
    },

    "handling_cancel": (e) => {
        text(e, "cancelar DAS al cambiar de direccion");
        attr(
            e,
            "title",
            "Si esta activado, la carga de DAS se cancela al cambiar de direccion."
        );
    },

    "handling_may20g": (e) => {
        text(e, "preferir descenso rapido sobre movimiento");
        attr(
            e,
            "title",
            "Si esta activado, a velocidades muy altas el descenso rapido siempre tendra prioridad sobre el movimiento horizontal, para conseguir una sensacion de juego mas consistente."
        );
    },

    "handling_irs_off": (e) => {
        text(e, "DESACTIVADO");
        attr(e, "title", "No permitir entradas de rotacion entre piezas.");
    },

    "handling_irs_hold": (e) => {
        text(e, "MANTENER");
        attr(
            e,
            "title",
            "La siguiente pieza rota si la tecla se mantiene pulsada cuando aparece la pieza."
        );
    },

    "handling_irs_tap": (e) => {
        text(e, "PULSAR");
        attr(
            e,
            "title",
            "La siguiente pieza rota si se introduce cualquier rotacion entre piezas. Las entradas multiples se acumulan."
        );
    },

    "handling_ihs_off": (e) => {
        text(e, "DESACTIVADO");
        attr(e, "title", "No permitir pulsar HOLD entre piezas.");
    },

    "handling_ihs_hold": (e) => {
        text(e, "MANTENER");
        attr(
            e,
            "title",
            "La siguiente pieza se guarda en HOLD si la tecla se mantiene pulsada cuando aparece la pieza."
        );
    },

    "handling_ihs_tap": (e) => {
        text(e, "PULSAR");
        attr(
            e,
            "title",
            "La siguiente pieza se guarda en HOLD si se introduce cualquier entrada de HOLD entre piezas."
        );
    },

    "volume_tweak": (e) => {
        text(e, "AJUSTAR MUSICA");
        attr(e, "title", "Ajusta el aleatorizador de musica a tu gusto.");

        const block = e.closest(".scroller_block");

        if (!block) {
            return;
        }

        const heading = block.querySelector("h1");

        if (heading) {
            text(heading, "VOLUMEN Y AUDIO");
            attr(heading, "title", "Cambia la forma en que suena TETR.IO");
        }

        const moreInfo = block.closest('[data-menuview="config"]')?.querySelector(".rc_moreinfo");

        if (moreInfo) {
            text(moreInfo, "pasa el cursor sobre una opcion para mas informacion");
        }
    },

    "volume_music": (e) => {
        const stat = e.closest(".volume_stat");

        if (stat) {
            const name = stat.querySelector(".stat_name");
            const lower = stat.querySelector(".stat_range_lower");
            const upper = stat.querySelector(".stat_range_upper");

            if (name) text(name, "MUSICA");
            if (lower) text(lower, "BAJO");
            if (upper) text(upper, "ALTO");

            attr(
                stat,
                "title",
                "Volumen al que se reproducen la musica y los jingles."
            );
        }
    },

    "volume_sfx": (e) => {
        const stat = e.closest(".volume_stat");

        if (stat) {
            const name = stat.querySelector(".stat_name");
            const lower = stat.querySelector(".stat_range_lower");
            const upper = stat.querySelector(".stat_range_upper");

            if (name) text(name, "EFECTOS");
            if (lower) text(lower, "BAJO");
            if (upper) text(upper, "ALTO");

            attr(
                stat,
                "title",
                "Volumen al que se reproducen los efectos de sonido."
            );
        }
    },

    "volume_stereo": (e) => {
        const stat = e.closest(".volume_stat");

        if (stat) {
            const name = stat.querySelector(".stat_name");
            const lower = stat.querySelector(".stat_range_lower");
            const upper = stat.querySelector(".stat_range_upper");

            if (name) text(name, "ESTEREO");
            if (lower) text(lower, "SIN ESTEREO");
            if (upper) text(upper, "SUPER ESTEREO");

            attr(
                stat,
                "title",
                "Cantidad de efecto estereo aplicado. 0% significa que todo el sonido esta centrado, mientras que 100% reproduce en distintos oidos los sonidos que ocurren a los lados de tu tablero."
            );
        }
    },

    "volume_scrollable": (e) => {
        text(e, "desplazarse para cambiar el volumen");
        attr(
            e,
            "title",
            "Permite desplazarse durante la partida, o mantener ALT y desplazarse en cualquier lugar, para cambiar el volumen."
        );
    },

    "volume_oof": (e) => {
        text(e, "silenciar musica al ocultar");
        attr(
            e,
            "title",
            "Si esta activado, la musica de fondo se silenciara cuando TETR.IO este minimizado o cambies de pestaña."
        );
    },

    "volume_next": (e) => {
        text(e, "escuchar piezas siguientes");
        attr(
            e,
            "title",
            "Indica si se reproduce un efecto de sonido que señala cual sera la siguiente pieza."
        );
    },

    "volume_others": (e) => {
        text(e, "escuchar a otros jugadores");
        attr(
            e,
            "title",
            "Indica si se escuchan los sonidos de otros jugadores durante el multijugador."
        );
    },

    "volume_attacks": (e) => {
        text(e, "escuchar ataques");
        attr(
            e,
            "title",
            "Indica si se escuchan los sonidos de los ataques que recibes y envias."
        );
    },

    "volume_zenithrank": (e) => {
        text(e, "escuchar cambios de velocidad de ascenso");
        attr(
            e,
            "title",
            "Indica si se reproduce un sonido cuando cambia tu velocidad de ascenso en PARTIDA RAPIDA."
        );
    },

    "volume_noreset": (e) => {
        text(e, "no reiniciar musica al reintentar");
        attr(
            e,
            "title",
            "Si esta activado, la musica de fondo no se reiniciara al reintentar una partida."
        );
    },

    "volume_disable": (e) => {
        text(e, "desactivar sonido por completo");
        attr(
            e,
            "title",
            "Si esta activado, nunca se reproducira ningun audio. Esto acelera el juego, pero tiene una desventaja bastante evidente."
        );
    },

    "video_actiontext_off": (e) => {
        text(e, "DESACTIVADO");
        attr(
            e,
            "title",
            "No mostrar texto de accion al realizar ataques especiales."
        );

        const block = e.closest(".scroller_block");

        if (block) {
            const heading = block.querySelector("h1");

            if (heading) {
                text(heading, "JUGABILIDAD");
                attr(
                    heading,
                    "title",
                    "Cambia la forma en que funciona TETR.IO"
                );
            }

            const actionHeading = block.querySelector(".control_group h1");

            if (actionHeading) {
                text(actionHeading, "TEXTO DE ACCION");
            }
        }
    },

    "video_actiontext_some": (e) => {
        text(e, "ALGUNO");
        attr(
            e,
            "title",
            "Mostrar solo texto de accion que no distraiga al realizar ataques especiales."
        );
    },

    "video_actiontext_all": (e) => {
        text(e, "TODO");
        attr(
            e,
            "title",
            "Mostrar todo el texto de accion al realizar ataques especiales."
        );
    },

    "video_bounciness": (e) => video_stat(
        e, "rebote del tablero", "RIGIDO", "ELASTICO",
        "Indica cuanto reacciona el tablero cuando mueves las piezas."
    ),

    "video_shakiness": (e) => video_stat(
        e, "sacudida por dano", "RIGIDO", "INQUIETO",
        "Indica cuanto reacciona el tablero cuando recibes dano."
    ),

    "video_gridopacity": (e) => video_stat(
        e, "visibilidad de la cuadricula", "TRANSPARENTE", "OPACA",
        "Indica que tan visible es la cuadricula. 0% hace que la cuadricula sea invisible."
    ),

    "video_boardopacity": (e) => video_stat(
        e, "visibilidad del tablero", "TRANSPARENTE", "OPACO",
        "Indica que tan visible es el tablero. 0% hace que el tablero sea invisible."
    ),

    "video_shadowopacity": (e) => video_stat(
        e, "visibilidad de la pieza fantasma", "TRANSPARENTE", "OPACA",
        "Indica que tan visible es la pieza fantasma. 0% hace que la pieza fantasma sea invisible."
    ),

    "video_zoom": (e) => video_stat(
        e, "zoom del tablero", "LEJOS", "CERCA",
        "Indica el tamano con el que se muestra el tablero. Los valores superiores a 100% pueden hacer que algunos elementos no sean visibles."
    ),

    "video_sidebyside": (e) => {
        text(e, "mostrar duelos lado a lado");
        attr(
            e,
            "title",
            "Indica si se muestra un duelo lado a lado. Esto hace que tu propio tablero se mueva ligeramente hacia la izquierda."
        );
    },

    "video_spin": (e) => {
        text(e, "girar tablero al hacer T-SPIN");
        attr(
            e,
            "title",
            "Al activarlo, el tablero reacciona a los T-SPINS girando ligeramente con la pieza."
        );
    },

    "video_kos": (e) => {
        text(e, "avisarme cuando elimine a alguien");
        attr(
            e,
            "title",
            "Si esta activado, muestra una ventana emergente cuando eliminas a alguien o te eliminan."
        );
    },

    "video_fire": (e) => {
        text(e, "activar medidor de fuego");
        attr(
            e,
            "title",
            "Si esta activado, llena un medidor de fuego cuando juegas bien e ilumina los tableros que tienen mucho fuego."
        );
    },

    "video_siren": (e) => {
        text(e, "avisarme cuando estoy en peligro");
        attr(
            e,
            "title",
            "Si esta activado, el tablero se vuelve rojo y reproduce un sonido de advertencia cuando estas en peligro."
        );
    },

    "video_colorshadow": (e) => {
        text(e, "pieza fantasma coloreada");
        attr(
            e,
            "title",
            "Si esta activado, la pieza fantasma tendra color."
        );
    },

    "video_holdlocked": (e) => {
        text(e, "atenuar pieza de HOLD bloqueada");
        attr(
            e,
            "title",
            "Si esta activado, la pieza de HOLD aparecera atenuada si no puede utilizarse."
        );
    },
    "video_graphics_minimal": (e) => {
        text(e, "MINIMO");
        attr(
            e,
            "title",
            "Ignora todas las opciones graficas y desactiva practicamente todo para obtener el maximo rendimiento, pero con la peor calidad visual."
        );

        const block = e.closest(".scroller_block");

        if (block) {
            const h1 = block.querySelector("h1");

            if (h1) {
                text(h1, "VIDEO E INTERFAZ");
                attr(h1, "title", "Cambia la apariencia de TETR.IO");
            }

            const headings = block.querySelectorAll(".control_group h1");

            if (headings[0]) text(headings[0], "GRAFICOS");
            if (headings[1]) text(headings[1], "CACHE");
            if (headings[2]) text(headings[2], "MODO WEBGL");
        }
    },

    "video_graphics_low": (e) => {
        text(e, "BAJO");
        attr(
            e,
            "title",
            "Sin particulas ni efectos. Usalo en computadores de bajas prestaciones, si quieres asegurar un rendimiento optimo o si simplemente no te gustan los efectos."
        );
    },

    "video_graphics_medium": (e) => {
        text(e, "MEDIO");
        attr(e, "title", "Menos particulas y efectos.");
    },

    "video_graphics_high": (e) => {
        text(e, "ALTO");
        attr(e, "title", "La mayoria de las particulas y efectos.");
    },

    "video_graphics_ultra": (e) => {
        text(e, "ULTRA");
        attr(
            e,
            "title",
            "TODOS LOS EFECTOS. Usalo en computadores de alta gama."
        );
    },

    "video_caching_low": (e) => {
        text(e, "DESACTIVADO");
        attr(
            e,
            "title",
            "No almacenar nada en cache. Puede ser mas rapido en algunos dispositivos."
        );
    },

    "video_caching_medium": (e) => {
        text(e, "EQUILIBRADO");
        attr(
            e,
            "title",
            "Almacenar en cache solo cuando sea necesario. Opcion predeterminada."
        );
    },

    "video_webgl_legacy": (e) => {
        text(e, "LEGACY");
        attr(
            e,
            "title",
            "Usar un modo de compatibilidad para WebGL. Si experimentas parpadeos inexplicables, prueba este modo."
        );
    },

    "video_webgl_webgl1": (e) => {
        text(e, "WEBGL 1");
        attr(
            e,
            "title",
            "Usar WebGL 1. Si aparecen errores visuales en pantalla, prueba este modo."
        );
    },

    "video_webgl_webgl2": (e) => {
        text(e, "WEBGL 2");
        attr(
            e,
            "title",
            "Usar el WebGL 2 mas reciente. Es la mejor opcion y la predeterminada, pero puede no ser compatible correctamente con todos los dispositivos. Algunos dispositivos y navegadores ignoran esta opcion y usan WebGL 1. Comprueba la consola (F12 -> Consola) para ver cual se esta utilizando."
        );
    },

    "video_particles": (e) => video_stat(
        e, "cantidad de particulas", "POCAS", "MUCHAS",
        "Cantidad de particulas que se muestran."
    ),

    "video_background": (e) => video_stat(
        e, "visibilidad del fondo", "TRANSPARENTE", "OPACO",
        "Indica que tan visibles son las imagenes de fondo. 0% hace que el fondo sea completamente negro."
    ),

    "video_bloom": (e) => video_stat(
        e, "potencia del filtro Bloom", "DEBIL", "FUERTE",
        "Indica la potencia del filtro Bloom."
    ),

    "video_chroma": (e) => video_stat(
        e, "aberracion cromatica", "DEBIL", "FUERTE",
        "Indica la potencia del filtro de aberracion cromatica."
    ),

    "video_flashwave": (e) => video_stat(
        e, "potencia de flashwave", "DEBIL", "FUERTE",
        "Indica la potencia del efecto flashwave al provocar grandes picos."
    ),

    "video_powersave": (e) => {
        text(
            e,
            "hacer que TETRIO funcione lentamente para mantener otros programas fluidos"
        );
        attr(
            e,
            "title",
            "Si esta activado, prioriza el ahorro de energia sobre el rendimiento."
        );
    },

    "video_lowres": (e) => {
        text(e, "renderizar a baja resolucion");
        attr(
            e,
            "title",
            "Si esta activado, renderiza graficos mas borrosos. No es muy bonito, pero mejora el rendimiento."
        );
    },

    "video_lowrescounters": (e) => {
        text(e, "menos precision en los contadores");
        attr(
            e,
            "title",
            "Si esta activado, muestra menos precision en los contadores durante la partida. Acelera considerablemente el juego."
        );
    },

    "video_alwaystiny": (e) => {
        text(e, "simplificar siempre las miniaturas del multijugador");
        attr(
            e,
            "title",
            "Si esta activado, siempre muestra las miniaturas simplificadas de otros jugadores. Esto mejora el rendimiento en partidas de 2 a 8 jugadores, pero se ve menos bonito."
        );
    },

    "video_nosuperlobbyanim": (e) => {
        text(e, "no animar el fondo en super salas");
        attr(
            e,
            "title",
            "Si esta activado, el fondo de las super salas (salas de 100 jugadores o mas) no se anima, excepto durante la introduccion."
        );
    },

    "video_nozenithanim": (e) => {
        text(e, "no animar el fondo en partida rapida");
        attr(
            e,
            "title",
            "Si esta activado, el fondo de PARTIDA RAPIDA no se anima."
        );
    },

    "video_nobg": (e) => {
        text(e, "sin fondo en los menus");
        attr(
            e,
            "title",
            "Si esta activado, no muestra el fondo en los menus. Esto mejora considerablemente el rendimiento en los menus, pero ya no veras el fondo."
        );
    },

    "video_chatfilter": (e) => {
        text(e, "filtrar insultos en el chat");
        attr(
            e,
            "title",
            "Si esta activado, los insultos del chat seran filtrados. Ten en cuenta que estos filtros nunca son perfectos."
        );
    },

    "video_nochat": (e) => {
        text(e, "ocultar chat durante la partida");
        attr(
            e,
            "title",
            "Si esta activado, el chat se ocultara durante la partida."
        );
    },

    "video_hideroomids": (e) => {
        text(e, "ocultar ID de salas");
        attr(
            e,
            "title",
            "Si esta activado, no se mostraran los ID de las salas para protegerte del streamsniping."
        );
    },

    "video_emotes": (e) => {
        text(e, "mostrar emotes en el chat");
        attr(
            e,
            "title",
            "Si esta activado, muestra emotes en el chat."
        );
    },

    "video_emotes_anim": (e) => {
        text(e, "mostrar emotes animados en el chat");
        attr(
            e,
            "title",
            "Si esta activado, muestra emotes animados en el chat."
        );
    },

    "video_invert": (e) => {
        text(e, "invertir colores del chat");
        attr(
            e,
            "title",
            "Si esta activado, el texto del chat se muestra en negro (ideal para fondos claros)."
        );
    },

    "video_chatbg": (e) => {
        text(e, "oscurecer pantalla detras del chat");
        attr(
            e,
            "title",
            "Si esta activado, muestra un fondo detras de los mensajes del chat al escribir."
        );
    },

    "video_replaytoolsnocollapse": (e) => {
        text(e, "mantener abiertas las herramientas de repeticion");
        attr(
            e,
            "title",
            "Si esta activado, las herramientas de repeticion no se contraen cuando no las estas utilizando."
        );
    },

    "video_hidenetwork": (e) => {
        text(e, "ocultar iconos de advertencia de red");
        attr(
            e,
            "title",
            "Si esta activado, no se mostraran los iconos de advertencia de red."
        );
    },

    "video_focuswarning": (e) => {
        text(e, "avisarme cuando el juego no tenga el foco");
        attr(
            e,
            "title",
            "Si esta activado, muestra una advertencia cuando TETR.IO pierde el foco."
        );
    },

    "video_guide": (e) => {
        text(e, "mostrar guia de bienvenida");
        attr(
            e,
            "title",
            "Si esta activado, muestra la guia sencilla con los controles en las salas multijugador."
        );
    },

    "video_desktopnotifications": (e) => {
        text(e, "mostrar notificaciones de escritorio");
        attr(
            e,
            "title",
            "Si esta activado, muestra notificaciones fuera del juego."
        );

        const block = e.closest(".scroller_block");

        if (block) {
            const heading = block.querySelector("h1");

            if (heading) {
                text(heading, "NOTIFICACIONES");
                attr(
                    heading,
                    "title",
                    "Cambia la forma en que TETR.IO te notifica"
                );
            }

            const groups = block.querySelectorAll(".control_group");

            const headings = [
                "AVISARME CUANDO UN AMIGO SE CONECTE",
                "AVISARME CUANDO UN AMIGO SE DESCONECTE",
                "AVISARME CUANDO UN AMIGO ME ENVIE UN MENSAJE DIRECTO",
                "AVISARME CUANDO ALGUIEN QUE NO ES AMIGO ME ENVIE UN MENSAJE DIRECTO",
                "AVISARME CUANDO ALGUIEN ME INVITE A UNA SALA",
                "OTRAS NOTIFICACIONES"
            ];

            groups.forEach((group, index) => {
                const h1 = group.querySelector("h1");

                if (h1 && headings[index]) {
                    text(h1, headings[index]);
                }
            });
        }
    },

    "notifications_suppress": (e) => {
        text(e, "suprimir notificaciones durante la partida");
        attr(
            e,
            "title",
            "Si esta activado, las notificaciones poco importantes no se muestran durante la partida, pero se mostraran despues."
        );
    },

    "notifications_forcesound": (e) => {
        text(e, "reproducir siempre los sonidos de notificacion al maximo volumen");
        attr(
            e,
            "title",
            "Si esta activado, los sonidos de notificacion siempre se reproducen al maximo volumen."
        );
    },

    "notifications_online_off": (e) => {
        text(e, "DESACTIVADO");
        attr(e, "title", "No avisarme.");
    },

    "notifications_online_ingame": (e) => {
        text(e, "EN PARTIDA");
        attr(e, "title", "Avisarme solo durante la partida.");
    },

    "notifications_online_both": (e) => {
        text(e, "EN PARTIDA Y ESCRITORIO");
        attr(
            e,
            "title",
            "Avisarme durante la partida y mediante una notificacion de escritorio."
        );
    },

    "notifications_offline_off": (e) => {
        text(e, "DESACTIVADO");
        attr(e, "title", "No avisarme.");
    },

    "notifications_offline_ingame": (e) => {
        text(e, "EN PARTIDA");
        attr(e, "title", "Avisarme solo durante la partida.");
    },

    "notifications_offline_both": (e) => {
        text(e, "EN PARTIDA Y ESCRITORIO");
        attr(
            e,
            "title",
            "Avisarme durante la partida y mediante una notificacion de escritorio."
        );
    },

    "notifications_dm_off": (e) => {
        text(e, "DESACTIVADO");
        attr(e, "title", "No avisarme.");
    },

    "notifications_dm_ingame": (e) => {
        text(e, "EN PARTIDA");
        attr(e, "title", "Avisarme solo durante la partida.");
    },

    "notifications_dm_both": (e) => {
        text(e, "EN PARTIDA Y ESCRITORIO");
        attr(
            e,
            "title",
            "Avisarme durante la partida y mediante una notificacion de escritorio."
        );
    },

    "notifications_dm_pending_off": (e) => {
        text(e, "DESACTIVADO");
        attr(e, "title", "No avisarme.");
    },

    "notifications_dm_pending_ingame": (e) => {
        text(e, "EN PARTIDA");
        attr(e, "title", "Avisarme solo durante la partida.");
    },

    "notifications_dm_pending_both": (e) => {
        text(e, "EN PARTIDA Y ESCRITORIO");
        attr(
            e,
            "title",
            "Avisarme durante la partida y mediante una notificacion de escritorio."
        );
    },

    "notifications_invite_ingame": (e) => {
        text(e, "EN PARTIDA");
        attr(e, "title", "Avisarme solo durante la partida.");
    },

    "notifications_invite_both": (e) => {
        text(e, "EN PARTIDA Y ESCRITORIO");
        attr(
            e,
            "title",
            "Avisarme durante la partida y mediante una notificacion de escritorio."
        );
    },

    "notifications_other_ingame": (e) => {
        text(e, "EN PARTIDA");
        attr(e, "title", "Avisarme solo durante la partida.");
    },

    "notifications_other_both": (e) => {
        text(e, "EN PARTIDA Y ESCRITORIO");
        attr(
            e,
            "title",
            "Avisarme durante la partida y mediante una notificacion de escritorio."
        );
    },

    "config_background_usecustom": (e) => {
        text(e, "usar imagen de fondo personalizada");
        attr(
            e,
            "title",
            "Si esta activado, muestra una imagen de fondo personalizada. Si esta desactivado, usa el fondo predeterminado."
        );

        const block = e.closest(".scroller_block");

        if (block) {
            const heading = block.querySelector("h1");

            if (heading) {
                text(heading, "PERSONALIZACION");
                attr(
                    heading,
                    "title",
                    "Anade tu propio estilo personal a TETR.IO"
                );
            }
        }
    },

    "config_background_url": (e) => {
        attr(
            e,
            "placeholder",
            "URL del fondo (usa varias separandolas con comas, confirma con ENTER)"
        );
    },

    "pmLink": (e) => {
        text(e, "gestion de privacidad");
        attr(
            e,
            "title",
            "Administra tus opciones de privacidad."
        );
    },

    "bgmtweak": (e) => {
        const block = e.closest(".scroller_block");

        if (block) {
            const heading = block.querySelector("h2");
            const subtitle = block.querySelector("p.sub");

            if (heading) {
                text(heading, "AJUSTE DE MUSICA");
            }

            if (subtitle) {
                text(
                    subtitle,
                    "selecciona con que frecuencia quieres que aparezca cada cancion, o prohibe canciones si lo deseas. haz clic en el titulo de una cancion para reproducirla."
                );
            }
        }

        const titles = {
            "Never play this song.": "No reproducir nunca esta cancion.",
            "Play this song far less often.": "Reproducir esta cancion mucho menos.",
            "Play this song less often.": "Reproducir esta cancion menos.",
            "Play this song a normal amount.": "Reproducir esta cancion con frecuencia normal.",
            "Play this song more often.": "Reproducir esta cancion mas.",
            "Play this song far more often.": "Reproducir esta cancion mucho mas."
        };

        e.querySelectorAll(".bgmtweak_option").forEach(option => {
            const originalTitle = option.getAttribute("title");

            if (originalTitle && titles[originalTitle]) {
                attr(option, "title", titles[originalTitle]);
            }
        });
    },

    // config account
    "config_account_supporter_bar": (e) => text(e, "Actualmente no eres Supporter."),
    "config_account_supporter_details": (e) => text(e, "Conviertete en Supporter o regala estado Supporter hoy y apoya directamente el desarrollo de TETR.IO."),
    "config_account_logoutall": (e) => {
        text(e, "CERRAR TODAS LAS SESIONES");
        attr(e, "title", "Cerrar sesion en todos los dispositivos.");
    },
    "config_account_logout": (e) => {
        text(e, "CERRAR SESION");
        attr(e, "title", "Cerrar sesion en este dispositivo.");
    },

    "config_account_avatar_remove": (e) => {
        text(e, "ELIMINAR");
        attr(e, "title", "Eliminar tu avatar.");
    },
    "config_account_avatar_change": (e) => {
        text(e, "CAMBIAR");
        attr(e, "title", "Establecer un nuevo avatar.");
    },
    "config_account_avatar": (e) => {
        e.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.textContent = node.textContent.replace("No avatar set", "No hay avatar establecido");
            }
        });

        const block = e.closest(".scroller_block");

        if (block) {
            const subtitle = block.querySelector("p.sub");
            if (subtitle) {
                text(
                    subtitle,
                    "una imagen agradable, de maximo 2 MB, para representarte, o un identicon generico si no eliges ninguna."
                );
            }
        }
    },

    "config_account_banner_remove": (e) => {
        text(e, "ǹ ELIMINAR");
        attr(e, "title", "Eliminar tu banner.");
    },
    "config_account_banner_change": (e) => {
        text(e, "ǹ CAMBIAR");
        attr(e, "title", "Establecer un nuevo banner.");
    },
    "config_account_banner_link": (e) => text(e, "pagina de usuario"),
    "config_account_banner": (e) => {
        e.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                const value = node.textContent;
                const translated = value.replace(
                    "No banner set",
                    "No hay banner establecido"
                );

                if (translated !== value) {
                    node.textContent = translated;
                }
            }
        });

        const block = e.closest(".scroller_block");

        if (block) {
            const subtitle = block.querySelector("p.sub");

            if (subtitle) {
                subtitle.childNodes.forEach(node => {
                    if (node.nodeType !== Node.TEXT_NODE) {
                        return;
                    }

                    const value = node.textContent;
                    const translated = value
                        .replace(
                            "a nice, 2MB max. image to display behind your profile and",
                            "una imagen agradable, de maximo 2 MB, para mostrar detras de tu perfil y"
                        )
                        .replace(
                            "target resolution is 1920x240.",
                            "la resolucion objetivo es 1920x240."
                        );

                    if (translated !== value) {
                        node.textContent = translated;
                    }
                });
            }
        }
    },
    "config_account_bio_link": (e) => text(e, "tu pagina de usuario"),
    "config_account_bio_save": (e) => {
        text(e, "ǹ GUARDAR");
        attr(e, "title", "Guardar tu nueva biografia.");
    },
    "config_account_bio": (e) => {
        attr(e, "placeholder", "Escribe algo...");

        const block = e.closest(".scroller_block");

        if (block) {
            const heading = block.querySelector("h2.ns");

            if (heading && heading.textContent !== "SOBRE MI") {
                text(heading, "SOBRE MI");
            }

            const subtitle = block.querySelector("p.sub");

            if (subtitle) {
                subtitle.childNodes.forEach(node => {
                    if (node.nodeType !== Node.TEXT_NODE) {
                        return;
                    }

                    const value = node.textContent;

                    const translated = value
                        .replace(
                            "write a little something about yourself to display on",
                            "escribe algo sobre ti para mostrarlo en"
                        )
                        .replace(
                            "or leave this blank to disable. simple markdown allowed.",
                            "o dejalo en blanco para desactivarlo. se permite markdown simple."
                        );

                    if (translated !== value) {
                        node.textContent = translated;
                    }
                });
            }
        }
    },
    "config_account_country_change": (e) => {
        text(e, "ǹ CAMBIAR");
        attr(e, "title", "Cambiar el pais mostrado.");
        const heading = e.closest(".scroller_block")?.querySelector("h2.ns");

        if (heading && heading.textContent !== "PAIS") {
            text(heading, "PAIS");
        }

        e.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.textContent = node.textContent.replace("unknown", "desconocido");
            }
        });
    },
    "config_account_country": (e) => {
        e.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.textContent = node.textContent.replace("unknown", "desconocido");
            }
        });
    },
    "config_account_privacy_save": (e) => {
        text(e, "GUARDAR");
        attr(e, "title", "Guardar tus nuevas opciones de privacidad.");
    },
    "config_account_privacy_showgametime": (e) => {
        text(e, "mostrar el tiempo total jugado en mi perfil");
        attr(e, "title", "Si esta activado, muestra cuanto tiempo has jugado TETR.IO.");
    },
    "config_account_privacy_showwon": (e) => {
        text(e, "mostrar el numero de partidas online ganadas en mi perfil");
        attr(e, "title", "Si esta activado, muestra el numero de partidas online que has ganado en tu perfil.");
    },
    "config_account_privacy_showplayed": (e) => {
        text(e, "mostrar el numero de partidas online jugadas en mi perfil");
        attr(e, "title", "Si esta activado, muestra el numero de partidas online que has jugado en tu perfil.");
    },
    "config_account_privacy_showcountry": (e) => {
        text(e, "mostrar mi pais en mi perfil");
        attr(e, "title", "Si esta activado, muestra tu pais como una bandera en tu perfil.");
    },
    "config_account_privacy_mmchat": (e) => {
        text(e, "activar el chat de TETRA LEAGUE");
        attr(e, "title", "Si esta activado, permite chatear entre tu y otros jugadores en Tetra League.");
    },
    "config_account_privacy_privatemode_private": (e) => {
        text(e, "MIS AMIGOS");
        attr(e, "title", "Solo las personas que hayas agregado como amigos pueden agregarte como amigo.");
    },
    "config_account_privacy_privatemode_public": (e) => {
        text(e, "TODOS");
        attr(e, "title", "Cualquiera puede agregarte como amigo.");
    },
    "config_account_privacy_status_shallow_nobody": (e) => {
        text(e, "NADIE");
        attr(e, "title", "Nadie puede ver si estas conectado. No recomendado.");
    },
    "config_account_privacy_status_shallow_friends": (e) => {
        text(e, "MIS AMIGOS");
        attr(e, "title", "Solo las personas que hayas agregado como amigos pueden ver si estas conectado.");
    },
    "config_account_privacy_status_shallow_everyone": (e) => {
        text(e, "TODOS");
        attr(e, "title", "Cualquiera puede ver si estas conectado.");
    },
    "config_account_privacy_status_deep_nobody": (e) => {
        text(e, "NADIE");
        attr(e, "title", "Nadie puede ver lo que estas haciendo.");
    },
    "config_account_privacy_status_deep_friends": (e) => {
        text(e, "MIS AMIGOS");
        attr(e, "title", "Solo las personas que hayas agregado como amigos pueden ver lo que estas haciendo.");
    },
    "config_account_privacy_status_deep_everyone": (e) => {
        text(e, "TODOS");
        attr(e, "title", "Cualquiera puede ver lo que estas haciendo.");
    },
    "config_account_privacy_status_exact_nobody": (e) => {
        text(e, "NADIE");
        attr(e, "title", "Nadie puede ver en que sala estas.");
    },
    "config_account_privacy_status_exact_friends": (e) => {
        text(e, "MIS AMIGOS");
        attr(e, "title", "Solo las personas que hayas agregado como amigos pueden ver en que sala estas.");
    },
    "config_account_privacy_status_exact_everyone": (e) => {
        text(e, "TODOS");
        attr(e, "title", "Cualquiera puede ver en que sala estas.");
    },
    "config_account_privacy_dm_nobody": (e) => {
        text(e, "NADIE");
        attr(e, "title", "Nadie puede enviarte mensajes directos.");
    },
    "config_account_privacy_dm_friends": (e) => {
        text(e, "MIS AMIGOS");
        attr(e, "title", "Solo las personas que hayas agregado como amigos pueden enviarte mensajes directos.");
    },
    "config_account_privacy_dm_everyone": (e) => {
        text(e, "TODOS");
        attr(e, "title", "Cualquiera puede enviarte mensajes directos.");
    },
    "config_account_privacy_invite_nobody": (e) => {
        text(e, "NADIE");
        attr(e, "title", "Nadie puede enviarte invitaciones.");
    },
    "config_account_privacy_invite_friends": (e) => {
        text(e, "MIS AMIGOS");
        attr(e, "title", "Solo las personas que hayas agregado como amigos pueden enviarte invitaciones.");
    },
    "config_account_privacy_invite_everyone": (e) => {
        text(e, "TODOS");
        attr(e, "title", "Cualquiera puede enviarte invitaciones.");
    },
    "config_account_username_save": (e) => {
        text(e, "GUARDAR");
        attr(e, "title", "Guardar tu nuevo nombre de usuario.");
    },
    "config_account_username": (e) => {
        attr(e, "placeholder", "NOMBRE DE USUARIO");
    },
    "config_account_email_warning": (e) => {
        text(e, "actualmente no tienes un correo electronico configurado. si pierdes tu contrasena, tu cuenta no podra recuperarse!");
    },
    "config_account_email_save": (e) => {
        text(e, "GUARDAR");
        attr(e, "title", "Guardar tu nuevo correo electronico.");
    },
    "config_account_email": (e) => {
        attr(e, "placeholder", "CORREO ELECTRONICO");
    },
    "config_account_password_save": (e) => {
        text(e, "GUARDAR");
        attr(e, "title", "Guardar tu nueva contrasena.");
    },
    "config_account_password": (e) => {
        attr(e, "placeholder", "tu nueva contrasena");
    },
    "config_account_password_again": (e) => {
        attr(e, "placeholder", "tu nueva contrasena, nuevamente");
    },
    "config_account_totp_enable": (e) => {
        text(e, "ACTIVAR");
        attr(e, "title", "Activar la autenticacion de dos factores.");
    },
    "config_account_totp_resetrecovery": (e) => {
        text(e, "RESTABLECER CODIGOS DE RECUPERACION");
        attr(e, "title", "Obtener ocho nuevos codigos de recuperacion.");
    },
    "config_account_totp_disable": (e) => {
        text(e, "DESACTIVAR");
        attr(e, "title", "Desactivar la autenticacion de dos factores.");
    },
    "account_connection_discord_link": (e) => {
        text(e, "VINCULAR");
        attr(e, "title", "Vincular tu cuenta de Discord.");
    },
    "account_connection_discord_remove": (e) => {
        text(e, "ELIMINAR");
        attr(e, "title", "Desvincular tu cuenta de Discord.");
    },
    "account_connection_discord_show": (e) => {
        text(e, "mostrar publicamente");
        attr(e, "title", "Si esta activado, muestra esta conexion en tu perfil.");
    },
    "account_connection_twitch_link": (e) => {
        text(e, "VINCULAR");
        attr(e, "title", "Vincular tu cuenta de Twitch.");
    },
    "account_connection_twitch_remove": (e) => {
        text(e, "ELIMINAR");
        attr(e, "title", "Desvincular tu cuenta de Twitch.");
    },
    "account_connection_twitch_show": (e) => {
        text(e, "mostrar publicamente");
        attr(e, "title", "Si esta activado, muestra esta conexion en tu perfil.");
    },

    "account_connection_youtube_link": (e) => {
        text(e, "VINCULAR");
        attr(e, "title", "Vincular tu cuenta de Youtube.");
    },
    "account_connection_youtube_remove": (e) => {
        text(e, "ELIMINAR");
        attr(e, "title", "Desvincular tu cuenta de Youtube.");
    },
    "account_connection_youtube_show": (e) => {
        text(e, "mostrar publicamente");
        attr(e, "title", "Si esta activado, muestra esta conexion en tu perfil.");
    },

    "account_connection_twitter_link": (e) => {
        text(e, "VINCULAR");
        attr(e, "title", "Vincular tu cuenta de Twitter.");
    },
    "account_connection_twitter_remove": (e) => {
        text(e, "ELIMINAR");
        attr(e, "title", "Desvincular tu cuenta de Twitter.");
    },
    "account_connection_twitter_show": (e) => {
        text(e, "mostrar publicamente");
        attr(e, "title", "Si esta activado, muestra esta conexion en tu perfil.");
    },

    "account_connection_steam_link": (e) => {
        text(e, "VINCULAR");
        attr(e, "title", "Vincular tu cuenta de Steam.");
    },
    "account_connection_steam_remove": (e) => {
        text(e, "ELIMINAR");
        attr(e, "title", "Desvincular tu cuenta de Steam.");
    },
    "account_connection_steam_show": (e) => {
        text(e, "mostrar publicamente");
        attr(e, "title", "Si esta activado, muestra esta conexion en tu perfil.");
    },

    "account_connection_reddit_link": (e) => {
        text(e, "VINCULAR");
        attr(e, "title", "Vincular tu cuenta de Reddit.");
    },
    "account_connection_reddit_remove": (e) => {
        text(e, "ELIMINAR");
        attr(e, "title", "Desvincular tu cuenta de Reddit.");
    },
    "account_connection_reddit_show": (e) => {
        text(e, "mostrar publicamente");
        attr(e, "title", "Si esta activado, muestra esta conexion en tu perfil.");
    },
    "config_account_delete": (e) => {
        text(e, "ELIMINAR MI CUENTA");
        attr(e, "title", "Eliminar tu cuenta y todo lo relacionado con ella.");
    },
    "config_account_totp_label": (e) => {
        if (e.textContent.trim() === "NOT ENABLED") {
            text(e, "NO ACTIVADO");
        }
    },
    "config_order_list": (e) => {
        const dict = {
            "Need help?": "¿Necesitas ayuda?",
            "This page will guide you through the most common problems": "Esta pagina te guiara con los problemas mas comunes",
            "See something out of the ordinary?": "¿Ves algo fuera de lo normal?",
            "Request a refund": "Solicitar un reembolso",
            "or": "o",
            "view our refund policy": "ver nuestra politica de reembolso",
            "Status": "Estado",
            "PENDING": "PENDIENTE",
            "Description": "Descripcion",
            "Price (excluding taxes and fees)": "Precio (sin incluir impuestos ni cargos)",
            "Payment total (including taxes and fees)": "Total del pago (incluyendo impuestos y cargos)",
            "Transaction number": "Numero de transaccion",
            "Merchant": "Comerciante",
            "Created": "Creado",
            "Last updated": "Ultima actualizacion",
            "(unknown)": "(desconocido)",
            "(not paid yet)": "(aun no pagado)"
        };

        e.querySelectorAll("b, a, td, p").forEach(el => {
            if (el.children.length > 0) {
                return;
            }

            translateByDict(el, dict);
        });

        e.querySelectorAll(".order_listing_item i").forEach(el => {
            const value = el.textContent;

            const translated = value
                .replace("Supporter for", "Supporter para")
                .replace("recipients", "destinatarios")
                .replace("(mega gift)", "(regalo masivo)")
                .replace("(gift)", "(regalo)");

            if (translated !== value) {
                text(el, translated);
            }
        });

        e.querySelectorAll("td").forEach(td => {
            const value = td.textContent.trim();

            if (value === "EUR") {
                return;
            }

            const translated = value
                .replace("2 recipients", "2 destinatarios")
                .replace("1 recipient", "1 destinatario");

            if (translated !== value && !td.querySelector("b")) {
                text(td, translated);
            }
        });
    },
    "config_account_supporter_support": (e) => {
        text(e, "AGREGAR MESES O REGALAR");

        const container = e.closest('[data-menuview="config_account"]');
        if (!container) return;

        const dict = {
            "PRIVACY": "PRIVACIDAD",
            "WHO CAN ADD ME AS FRIEND": "QUIEN PUEDE AGREGARME COMO AMIGO",
            "WHO CAN SEE WHETHER I'M ONLINE": "QUIEN PUEDE VER SI ESTOY CONECTADO",
            "WHO CAN SEE WHAT I'M DOING": "QUIEN PUEDE VER LO QUE ESTOY HACIENDO",
            "WHO CAN SEE WHAT ROOM I'M IN": "QUIEN PUEDE VER EN QUE SALA ESTOY",
            "WHO CAN SEND ME DIRECT MESSAGES": "QUIEN PUEDE ENVIARME MENSAJES DIRECTOS",
            "WHO CAN SEND ME INVITES TO ROOMS": "QUIEN PUEDE ENVIARME INVITACIONES A SALAS",
            "USERNAME": "NOMBRE DE USUARIO",
            "EMAIL": "CORREO ELECTRONICO",
            "PASSWORD": "CONTRASENA",
            "TWO-FACTOR AUTHENTICATION": "AUTENTICACION DE DOS FACTORES",
            "CONNECTIONS": "CONEXIONES"
        };

        const paragraphs = {
            "This does not apply retroactively.": "Esto no se aplica de forma retroactiva.",
            'e.g. "Online", "Away", "Offline". People who cannot see whether you\'re online cannot invite you to rooms either.':
                'por ejemplo: "Conectado", "Ausente", "Desconectado". Las personas que no pueden ver si estas conectado tampoco pueden invitarte a salas.',
            'e.g. "Playing 40 LINES", "In TETRA LEAGUE queue", "In Menus"':
                'por ejemplo: "Jugando 40 LINEAS", "En cola de TETRA LEAGUE", "En menus".',
            'e.g. "In QUICK PLAY lobby", "In a public custom room". People who can see what room you\'re in can also quickly join said room. Private rooms are always hidden.':
                'por ejemplo: "En la sala de PARTIDA RAPIDA", "En una sala personalizada publica". Las personas que pueden ver en que sala estas tambien pueden unirse rapidamente a ella. Las salas privadas siempre estan ocultas.',
            "Direct messages from non-friends show up on the NON-FRIENDS tab in the social overlay.":
                "Los mensajes directos de personas que no son tus amigos aparecen en la pestana NO AMIGOS del panel social.",
            "To be able to send you an invite, others will also need to be able to see whether you're online.":
                "Para poder enviarte una invitacion, los demas tambien deben poder ver si estas conectado.",
            "this is the name you will show up to others as.":
                "este es el nombre con el que apareces ante los demas.",
            "this email account will be used for secure account actions, like account recovery.":
                "esta cuenta de correo se utilizara para acciones seguras de la cuenta, como la recuperacion de la cuenta.",
            "you can change the password used to log in here.":
                "aqui puedes cambiar la contrasena utilizada para iniciar sesion.",
            "link other accounts with TETR.IO here, or remove them at any time.":
                "vincula otras cuentas con TETR.IO aqui, o eliminalas en cualquier momento."
        };

        container.querySelectorAll("h2, h1").forEach(heading => translateByDict(heading, dict));
        container.querySelectorAll("p").forEach(p => translateByDict(p, paragraphs));
    },

    // config electron
    "electron_ver": (e) => {
        const block = e.closest('[data-menuview="config_electron"]');

        if (!block) return;

        const subtitle = block.querySelector("p.sub");
        if (subtitle) {
            text(
                subtitle,
                "estas utilizando el cliente de escritorio! puedes ajustar sus opciones adicionales en esta pagina."
            );
        }

        const warning = block.querySelector("#config_electron_emergency");
        if (warning) {
            text(
                warning,
                "EL MODO SEGURO ESTA ACTIVADO - la mayoria de la integracion con el sistema esta desactivada hasta el proximo reinicio"
            );
        }

        const options = block.querySelector("h2");
        if (options) {
            text(options, "OPCIONES");
        }

        const groups = block.querySelectorAll(".control_group h1");

        groups.forEach(h1 => {
            if (h1.textContent.trim() === "SKIP LOGIN SCREEN") {
                text(h1, "OMITIR PANTALLA DE INICIO DE SESION");
            }
        });
    },
    "electron_loginskip_never": (e) => {
        text(e, "NUNCA");
        attr(e, "title", "Nunca omitir la pantalla de inicio de sesion.");
    },
    "electron_loginskip_quickjoin": (e) => {
        text(e, "CUANDO SEA NECESARIO");
        attr(e, "title", "Omitir la pantalla de inicio de sesion al usar una URL para unirse a una sala o ver una repeticion.");
    },
    "electron_loginskip_always": (e) => {
        text(e, "SIEMPRE");
        attr(e, "title", "Omitir siempre la pantalla de inicio de sesion.");
    },
    "config_electron_vsync": (e) => {
        text(e, "VSYNC (limitar FPS a la frecuencia de pantalla)");
        attr(
            e,
            "title",
            "Si esta activado, limita la velocidad de fotogramas a la frecuencia de actualizacion de la pantalla. Es mas fiable, pero puede dejar rendimiento sin aprovechar segun tu configuracion."
        );
    },
    "config_electron_vsync_warning": (e) => {
        text(
            e,
            "desactivar VSYNC puede dar resultados diferentes segun la configuracion de hardware y software, y utilizara mas recursos del sistema."
        );
    },
    "electron_frameratelimit_1x": (e) => {
        text(e, "1x");
        attr(e, "title", "Usar la frecuencia de actualizacion de la pantalla.");
    },
    "electron_frameratelimit_2x": (e) => {
        text(e, "2x");
        attr(e, "title", "Usar el doble de la frecuencia de actualizacion de la pantalla.");
    },
    "electron_frameratelimit_4x": (e) => {
        text(e, "4x");
        attr(e, "title", "Usar cuatro veces la frecuencia de actualizacion de la pantalla.");
    },
    "electron_frameratelimit_off": (e) => {
        text(e, "∞");
        attr(e, "title", "No limitar la velocidad de fotogramas. Esto puede ralentizar otros programas de tu computador.");
    },
    "config_electron_frameratelimit": (e) => {
        const heading = e.querySelector("h1");

        if (heading) {
            text(heading, "LIMITADOR DE FPS");
        }
    },
    "config_electron_autoupdate": (e) => {
        text(e, "instalar actualizaciones automaticamente si es posible");
        attr(e, "title", "Si esta activado, descarga e instala las actualizaciones automaticamente.");
    },
    "config_electron_presence": (e) => {
        text(e, "activar DISCORD RICH PRESENCE");
        attr(e, "title", "Si esta activado, muestra tu actividad actual en Discord.");
    },
    "config_electron_taskbarflash": (e) => {
        text(e, "hacer parpadear el icono de la barra de tareas");
        attr(e, "title", "Si esta activado, el icono de la barra de tareas parpadeara cuando ocurra algo importante.");
    },
    "config_electron_anglecompat": (e) => {
        text(e, "modo de compatibilidad para streamers (lento!)");
        attr(
            e,
            "title",
            "Si esta activado, ANGLE funcionara en modo de compatibilidad GL. Usalo si tu software de streaming no funciona con TETR.IO de forma predeterminada. Esto puede afectar el rendimiento!"
        );
    },
    "config_electron_adblock": (e) => {
        text(e, "desactivar anuncios de terceros");
        attr(e, "title", "Si esta activado, no se mostrara la mayoria o todos los anuncios de terceros.");
    },
    "config_electron_devtools": (e) => {
        text(e, "activar herramientas de desarrollador");
        attr(e, "title", "Si esta activado, se habilitaran las herramientas de desarrollador.");
    },
    "keybind_request": (e) => {
        const paragraphs = e.querySelectorAll("p");

        if (paragraphs[0]) text(paragraphs[0], "pulsa cualquier tecla o boton");
        if (paragraphs[1]) text(paragraphs[1], "haz clic en cualquier lugar para eliminar la asignacion");
    },
    "list_request_back": (e) => text(e, "VOLVER"),
    "forfeit": (e) => text(e, "MANTEN PULSADO PARA ABANDONAR"),
    "retry": (e) => text(e, "MANTEN PULSADO PARA REINTENTAR"),
    "enter_spectate": (e) => text(e, "JUGAR!"),
    "zen_spectate": (e) => text(e, "ZEN"),
    "spectate": (e) => {
        const keystone = e.querySelector(".keystone");
        if (keystone) text(keystone, "EN VIVO");
    },
    "data_spectate": (e) => {
        const textNode = e.childNodes[0];

        if (
            textNode &&
            textNode.nodeType === Node.TEXT_NODE &&
            textNode.textContent !== "espectando a "
        ) {
            textNode.textContent = "espectando a ";
        }

        const players = Array.from(e.childNodes).find(
            node =>
                node.nodeType === Node.TEXT_NODE &&
                node.textContent.includes("PLAYERS")
        );

        if (players) {
            const value = players.textContent;
            const translated = value.replace("PLAYERS", "JUGADORES");

            if (translated !== value) {
                players.textContent = translated;
            }
        }
    },
    "waterfall": (e) => {
        e.querySelectorAll(".waterfall_item p").forEach(p => {
            const value = p.textContent;

            if (value.includes("ko'd")) {
                const translated = value
                    .replace("you ko'd yourself", "te eliminaste a ti mismo")
                    .replace(" ko'd by ", " eliminado por ")
                    .replace("ko'd by ", "eliminado por ")
                    .replace(" ko'd ", " elim   ino a ")
                    .replace("ko'd ", "eliminaste a ");

                if (translated !== value) {
                    text(p, translated);
                }
            }
        });
    },
    "grid_spectate": (e) => {
        text(e, "cuadricula");
        e.style.width = "5em";

        const zen = document.getElementById("zen_spectate");
        if (zen) {
            zen.style.right = "14em";
        }

        const follow = document.getElementById("follow_spectate");
        if (follow) {
            follow.style.right = "8em";
        }

        const prev = document.getElementById("prev_spectate");
        if (prev) {
            prev.style.right =
                zen && getComputedStyle(zen).display === "none"
                    ? "6.75em"
                    : "12.50em";
        }
    },
    "exit_spectate": (e) => text(e, "SALIR"),

    // zenith menu
    "zenithmenu": (e) => {
        const dict = {
            "QUICK PLAY": "PARTIDA RAPIDA",
            "SPECTATE": "ESPECTAR",
            "THIS WEEK'S PERSONAL BEST": "MEJOR MARCA PERSONAL DE ESTA SEMANA",
            "JOINED": "SE UNIO HACE",
            "MONTHS AGO": "MESES",
            "MONTH AGO": "MES",
            "MUTUAL FRIENDS": "AMIGOS EN COMUN"
        };

        e.querySelectorAll("h1, h2, p, .menuslide_rollup").forEach(element => {
            element.childNodes.forEach(node => {
                if (node.nodeType !== Node.TEXT_NODE) return;

                let value = node.textContent;

                Object.entries(dict).forEach(([original, translated]) => {
                    value = value.replaceAll(original, translated);
                });

                if (value !== node.textContent) {
                    node.textContent = value;
                }
            });
        });

        e.querySelectorAll(".leveltag").forEach(level => {
            const title = level.getAttribute("title");

            if (title && title.includes("% towards next level")) {
                attr(
                    level,
                    "title",
                    title.replace(
                        "% towards next level",
                        "% para el siguiente nivel"
                    )
                );
            }
        });
    },
    "zenith_zenithtimer": (e) => {
        const bold = e.querySelector("b");

        if (!bold) {
            return;
        }

        const textNode = e.firstChild;

        if (
            textNode &&
            textNode.textContent !== "LA CLASIFICACION SE ACTUALIZA EN "
        ) {
            textNode.textContent = "LA CLASIFICACION SE ACTUALIZA EN ";
        }

        const value = bold.textContent;

        if (value.includes(" DAYS")) {
            bold.textContent = value.replace(" DAYS", " DIAS");
        }
    },
    "zenith_contribution": (e) => {
        const block = e.closest(".scroller_block");
        if (!block) return;

        const rollup = block.querySelector(".menuslide_rollup");
        if (rollup) text(rollup, "ESPECTAR");

        const headings = block.querySelectorAll("h1");

        headings.forEach(h1 => {
            const value = h1.textContent.trim();

            if (value === "YOUR FINAL ALTITUDE") {
                text(h1, "TU ALTITUD FINAL");
            }
        });

        const ranks = {
            "THIS WEEK'S PERSONAL RANK": "RANGO PERSONAL DE ESTA SEMANA",
            "THIS WEEK'S COUNTRY RANK": "RANGO NACIONAL DE ESTA SEMANA",
            "THIS WEEK'S GLOBAL RANK": "RANGO GLOBAL DE ESTA SEMANA"
        };

        block.querySelectorAll(".rank > p:first-child").forEach(p => {
            const value = p.textContent.trim();

            if (ranks[value]) {
                text(p, ranks[value]);
            }
        });
    },
    "chatreplay_zenith": (e) => {
        text(e, "ENVIAR AL CHAT");
    },
    "start_zenith_label": (e) => {
        text(e, "INICIAR");
    },
    "zenith_party_self_supporter": (e) => {
        attr(e, "title", "Gracias por apoyar a TETR.IO!");
    },
    "zenith_party_self_level": (e) => {
        attr(e, "title", e.getAttribute("title")?.replace(
            "% towards next level",
            "% para el siguiente nivel"
        ) || "");
    },

    "zenith_party_other_username": (e) => {
        if (e.textContent.trim() === "waiting for player") {
            text(e, "esperando jugador");
        }
    },

    "zenith_party_other_supporter": (e) => {
        attr(e, "title", "Gracias por apoyar a TETR.IO!");
    },

    "zenith_party_self": (e) => {
        const ready = e.querySelector(".zenith_party_member_ready");
        if (ready) text(ready, "LISTO!");
    },

    "zenith_party_other": (e) => {
        const invite = e.querySelector(".zenith_party_member_invite");
        const ready = e.querySelector(".zenith_party_member_ready");

        if (invite) text(invite, "HAZ CLIC PARA INVITAR A UN AMIGO");
        if (ready) text(ready, "LISTO!");
    },

    "zenith_party_ready_label": (e) => {
        text(e, "LISTO");
    },
    "zenith_deck_nag": (e) => {
        const inner = e.querySelector("#zenith_deck_nag_inner");

        if (inner) {
            e.firstChild.textContent = "registra una cuenta";
            inner.nextSibling.textContent = "\u00a0para guardar tu progreso!";
        }
    },
    "zenith_deck_infos": (e) => {
        const names = {
            "ADD OR REMOVE MODS": "AGREGAR O QUITAR MODS",
            "EXPERT MODE": "MODO EXPERTO",
            "DOUBLE HOLE GARBAGE": "BASURA DE DOBLE AGUJERO",
            "VOLATILE GARBAGE": "BASURA VOLATIL",
            "GRAVITY": "GRAVEDAD",
            "NO HOLD": "SIN HOLD",
            "MESSIER GARBAGE": "BASURA MAS DESORDENADA",
            "INVISIBLE": "INVISIBLE",
            "ALL-SPIN": "TODOS LOS SPINS",
            "DUO": "DUO"
        };

        const descriptions = {
            "a less lenient challenge, for those who dare":
                "un desafio menos permisivo, para quienes se atrevan",
            "reach floor 9 to unlock":
                "alcanza el piso 9 para desbloquear",
            "garbage may sometimes spawn with two holes":
                "la basura puede aparecer a veces con dos agujeros",
            "reach floor 6 to unlock":
                "alcanza el piso 6 para desbloquear",
            "receive double the garbage, cancel double the garbage":
                "recibe el doble de basura, cancela el doble de basura",
            "reach floor 5 to unlock":
                "alcanza el piso 5 para desbloquear",
            "gravity scales up harshly by floor":
                "la gravedad aumenta considerablemente con cada piso",
            "reach floor 4 to unlock":
                "alcanza el piso 4 para desbloquear",
            "hold piece is disabled":
                "la pieza de HOLD esta desactivada",
            "reach floor 2 to unlock":
                "alcanza el piso 2 para desbloquear",
            "garbage is significantly messier":
                "la basura es considerablemente mas desordenada",
            "reach floor 3 to unlock":
                "alcanza el piso 3 para desbloquear",
            "non-garbage minos are only visible once every five seconds":
                "los minos que no son basura solo son visibles una vez cada cinco segundos",
            "reach floor 7 to unlock":
                "alcanza el piso 7 para desbloquear",
            "all-spins are rewarded, but doing the same clear twice is penalized":
                "todos los spins son recompensados, pero repetir el mismo despeje dos veces es penalizado",
            "reach floor 8 to unlock":
                "alcanza el piso 8 para desbloquear",
            "scale the tower together with someone you hold close":
                "sube por la torre junto a alguien cercano a ti",
            "register an account to unlock":
                "registra una cuenta para desbloquear"
        };

        e.querySelectorAll(".zenith_deck_info").forEach(info => {
            const heading = info.querySelector("h1");
            const paragraph = info.querySelector("p");

            if (heading) translateByDict(heading, names);
            if (paragraph) translateByDict(paragraph, descriptions);
        });
    },
    "zenith_deck_reset": (e) => {
        text(e, "RESTABLECER");
        attr(e, "title", "Eliminar todos los mods.");
        e.style.width = "7em";
    },
    "zenith_deck_cards": (e) => {
        e.querySelectorAll(".zenith_card[data-card]").forEach(card => {
            const front = card.querySelector(".zenith_card_front");
            const key = `zenith-mods/${card.dataset.card}.png`;

            if (front && replacementImages[key]) {
                attr(front, "src", replacementImages[key]);
            }
        });
    },

    "zenith_results_stats_set_overview": (e) => text(e, "RESUMEN"),

    "zenith_results_stats_set_full": (e) => text(e, "COMPLETO")
    ,
    "zenith_results_stats_overview": (e) => {
        const block = e.closest(".scroller_block");

        if (block) {
            const heading = block.querySelector("h1.ns");
            if (heading) text(heading, "ESTADISTICAS");
        }

        const dict = {
            "TIME": "TIEMPO",
            "FLOOR": "PISO",
            "KO's": "KO",
            "PEAK POSITION": "POSICION MAXIMA",
            "FINAL POSITION": "POSICION FINAL",
            "average CLIMB SPEED": "VELOCIDAD DE ASCENSO PROMEDIO",
            "peak CLIMB SPEED": "VELOCIDAD DE ASCENSO MAXIMA",
            "ALTITUDE per SECOND": "ALTITUD POR SEGUNDO",
            "ATTACK": "ATAQUE",
            "ATTACK PER PIECE": "ATAQUE POR PIEZA",
            "ATTACK per MINUTE": "ATAQUE POR MINUTO",
            "PIECES per SECOND": "PIEZAS POR SEGUNDO",
            "VERSUS SCORE": "PUNTUACION VERSUS",
            "maximum COMBO": "COMBO MAXIMO",
            "maximum back-to-back chain": "CADENA BACK-TO-BACK MAXIMA",
            "KEYS per PIECE": "TECLAS POR PIEZA"
        };

        e.querySelectorAll("tr td:first-child").forEach(td => translateByDict(td, dict));
    },
    "results_stats_overview": (e) => {
        const dict = {
            "PIECES PLACED": "PIEZAS COLOCADAS",
            "PIECES per SECOND": "PIEZAS POR SEGUNDO",
            "KEYS PRESSED": "TECLAS PULSADAS",
            "KEYS per PIECE": "TECLAS POR PIEZA",
            "KEYS per SECOND": "TECLAS POR SEGUNDO",
            "HOLDS": "HOLDS",
            "SCORE": "PUNTUACION",
            "TIME": "TIEMPO",
            "LINES": "LINEAS",
            "LINES per MINUTE": "LINEAS POR MINUTO",
            "spins": "spins",
            "maximum COMBO": "COMBO MAXIMO",
            "maximum back-to-back chain": "CADENA BACK-TO-BACK MAXIMA",
            "ALL CLEARS": "DESPEJES PERFECTOS",
            "finesse %": "PRECISION %",
            "finesse faults": "ERRORES DE PRECISION"
        };

        e.querySelectorAll("tr td:first-child").forEach(td => translateByDict(td, dict));
    },

    "results_stats_full": (e) => {
        const dict = {
            "SINGLES": "SINGLES",
            "DOUBLES": "DOBLES",
            "TRIPLES": "TRIPLES",
            "QUADS": "CUADRUPLES",
            "spins": "spins",
            "spin MINIS": "MINIS DE SPIN",
            "spin MINI SINGLES": "SINGLES MINI DE SPIN",
            "spin SINGLES": "SINGLES DE SPIN",
            "spin MINI DOUBLES": "DOBLES MINI DE SPIN",
            "spin DOUBLES": "DOBLES DE SPIN",
            "spin MINI TRIPLES": "TRIPLES MINI DE SPIN",
            "spin TRIPLES": "TRIPLES DE SPIN",
            "spin MINI QUADS": "CUADRUPLES MINI DE SPIN",
            "spin QUADS": "CUADRUPLES DE SPIN",
            "ALL CLEARS": "DESPEJES PERFECTOS"
        };

        e.querySelectorAll("tr td:first-child").forEach(td => translateByDict(td, dict));
    },
    "replaytools_button_backward_round": (e) => attr(e, "title", "Ir a la ronda anterior"),
    "replaytools_button_backward_large": (e) => attr(e, "title", "Retroceder 5 segundos [ctrl-izquierda o j]"),
    "replaytools_button_backward_piece": (e) => attr(e, "title", "Ir a la pieza anterior [izquierda]"),
    "replaytools_button_backward_frame": (e) => attr(e, "title", "Ir al frame anterior [shift-izquierda o coma]"),
    "replaytools_button_playpause": (e) => attr(e, "title", "Reproducir/pausar [espacio o k]"),
    "replaytools_button_forward_frame": (e) => attr(e, "title", "Ir al siguiente frame [shift-derecha o punto]"),
    "replaytools_button_forward_piece": (e) => attr(e, "title", "Ir a la siguiente pieza [derecha]"),
    "replaytools_button_forward_large": (e) => attr(e, "title", "Avanzar 5 segundos [ctrl-derecha o l]"),
    "replaytools_button_forward_round": (e) => attr(e, "title", "Ir a la siguiente ronda"),

    "replaytools_button_end": (e) => attr(e, "title", "Salir de la repeticion al terminar"),
    "replaytools_button_stop": (e) => attr(e, "title", "Pausar la repeticion al terminar"),
    "replaytools_button_loop": (e) => attr(e, "title", "Repetir la repeticion al terminar"),
    "replaytools_button_nextround": (e) => attr(e, "title", "Ir a la siguiente ronda al terminar"),
    "replaytools_button_10x": (e) => attr(e, "title", "Reproducir a velocidad 10x [usa arriba/abajo para aumentar/disminuir la velocidad]"),
    "replaytools_button_5x": (e) => attr(e, "title", "Reproducir a velocidad 5x [usa arriba/abajo para aumentar/disminuir la velocidad]"),
    "replaytools_button_2x": (e) => attr(e, "title", "Reproducir a velocidad 2x [usa arriba/abajo para aumentar/disminuir la velocidad]"),
    "replaytools_button_1x": (e) => attr(e, "title", "Reproducir a velocidad 1x [usa arriba/abajo para aumentar/disminuir la velocidad]"),
    "replaytools_button_50x": (e) => attr(e, "title", "Reproducir a velocidad 0.5x [usa arriba/abajo para aumentar/disminuir la velocidad]"),
    "replaytools_button_25x": (e) => attr(e, "title", "Reproducir a velocidad 0.25x [usa arriba/abajo para aumentar/disminuir la velocidad]"),

    // preload
    "preload_msgs": (e) => {
        const dict = {
            "loading SFX...": "cargando efectos de sonido...",
            "configuring client...": "configurando cliente...",
            "loading home banner data...": "cargando datos del banner principal...",
            "checking for game updates...": "comprobando actualizaciones del juego..."
        };

        e.querySelectorAll("p").forEach(p => translateByDict(p, dict));
    },
    "preload_header": (e) => {
        const items = e.querySelectorAll(".preload_item");

        items.forEach(item => {
            const value = item.textContent.trim();

            if (value === "PLAY") text(item, "JUGAR");
            if (value === "TETRA CHANNEL") text(item, "TETRA CHANNEL");
            if (value === "MERCH") text(item, "TIENDA");
            if (value === "ABOUT") text(item, "ACERCA DE");
        });

        const titles = {
            "Support TETR.IO or gift supporter status and get cool benefits!":
                "Apoya a TETR.IO o regala estado supporter y obtén beneficios geniales!",
            "View the TETR.IO issue tracker - report bugs and pitch ideas to improve TETR.IO":
                "Ver el registro de problemas de TETR.IO - reporta errores y propone ideas para mejorar TETR.IO",
            "Join the TETR.IO Discord - follow updates, give feedback and have fun":
                "Unete al Discord de TETR.IO - sigue las novedades, da tu opinion y diviertete",
            "Follow TETR.IO on X - be the first to hear about updates":
                "Sigue a TETR.IO en X - enterate primero de las novedades",
            "Get TETR.IO Desktop":
                "Obtener TETR.IO Desktop"
        };

        e.querySelectorAll(".preload_item_r[title]").forEach(item => {
            const title = item.getAttribute("title");
            if (titles[title]) attr(item, "title", titles[title]);
        });
    },
    "devbuildwarning": (e) => {
        const h1 = e.querySelector("h1");
        const p = e.querySelector("p");
        if (h1) text(h1, "VERSION DE DESARROLLO");
        if (p) text(p, "si sientes que no deberias estar aqui, sal");
    },
    "nojs_error": (e) => {
        const h1 = e.querySelector("h1");
        const paragraphs = e.querySelectorAll("p");

        if (h1) text(h1, "TETR.IO REQUIERE JAVASCRIPT");
        if (paragraphs[0]) text(paragraphs[0], "parece que JAVASCRIPT esta desactivado en tu navegador.");
        if (paragraphs[1]) text(paragraphs[1], "comprueba la configuracion de tu navegador para asegurarte de que JAVASCRIPT este activado y vuelve a intentarlo.");
        if (paragraphs[2]) text(paragraphs[2], "si eso no funciona, intenta actualizar tu navegador.");
    },
    "js_load_error": (e) => {
        const h1 = e.querySelector("h1");
        const paragraphs = e.querySelectorAll("p");
        const retry = e.querySelector("#js_load_retry_button");

        if (h1) text(h1, "ERROR AL CARGAR TETR.IO");
        if (paragraphs[0]) text(paragraphs[0], "ha ocurrido un error al intentar cargar TETR.IO. esto normalmente significa que tu navegador no es compatible con TETR.IO.");
        if (paragraphs[1]) text(paragraphs[1], "compatibilidad con los siguientes navegadores:");
        if (paragraphs[2]) text(paragraphs[2], "• CHROME 83 o superior");
        if (paragraphs[3]) text(paragraphs[3], "• FIREFOX 75 o superior");
        if (paragraphs[4]) text(paragraphs[4], "• EDGE 83 o superior");
        if (paragraphs[5]) text(paragraphs[5], "• OPERA 83 o superior");
        if (paragraphs[6]) text(paragraphs[6], "• TETR.IO DESKTOP");
        if (paragraphs[7]) text(paragraphs[7], "usas TETR.IO Desktop? esto normalmente significa que algo esta muy mal (generalmente por parte de TETR.IO). pulsa el boton de abajo para recargar.");
        if (retry) text(retry, "RECARGAR");
    },
    "no_webgl_error": (e) => {
        const h1 = e.querySelector("h1");
        const paragraphs = e.querySelectorAll("p");
        const button = e.querySelector("#no_webgl_error_goto");

        if (h1) text(h1, "TETR.IO REQUIERE WEBGL");
        if (paragraphs[0]) text(paragraphs[0], "parece que WEBGL esta desactivado en tu navegador. WEBGL es necesario para que el juego se renderice correctamente.");
        if (paragraphs[1]) text(paragraphs[1], "comprueba la configuracion de tu navegador para asegurarte de que la ACELERACION POR HARDWARE este activada y vuelve a intentarlo. si eso no funciona, intenta actualizar tu navegador.");
        if (paragraphs[2]) text(paragraphs[2], "TETR.IO DESKTOP se configura automaticamente para ofrecer la experiencia mas fluida, con mucho mejor rendimiento y menos complicaciones de configuracion. instalalo con el boton de abajo!");
        if (paragraphs[3]) text(paragraphs[3], "ya estas en Desktop? puede que necesites reiniciar tu dispositivo.");
        if (button) text(button, "OBTENER TETR.IO DESKTOP!");
    },
    "banned_warning": (e) => {
        const ipOnly = e.querySelector("#banned_warning_iponly");
        const warning = e.querySelector(".modal_warning");
        const button = e.querySelector("#ban_skip_button");

        if (ipOnly) text(ipOnly, "esta suspension solo afecta a tu red (IP). tu cuenta <u>no esta suspendida</u>! desactiva cualquier VPN/proxy y/o intenta desde otra red. en la mayoria de los casos, <u>soporte no puede ayudarte aqui.</u>");
        if (warning) warning.innerHTML = 'si crees que tu suspension fue un error, <a href="/about/support/" target="_blank">contacta con soporte</a>';
        if (button) text(button, "ACEPTAR");
    },
    "block_header": (e) => text(e, "HAS SIDO BLOQUEADO DE TETR.IO"),
    "blocked_warning_iponly": (e) => text(e, "esta suspension solo afecta a tu red (IP). tu cuenta <u>no esta suspendida</u>! desactiva cualquier VPN/proxy y/o intenta desde otra red. en la mayoria de los casos, <u>soporte no puede ayudarte aqui.</u>"),
    "blocked_warning": (e) => {
        const warning = e.querySelector(".modal_warning");
        if (warning) warning.innerHTML = 'si crees que tu suspension fue un error, <a href="/about/support/" target="_blank">contacta con soporte</a>';
    },

    // OOB modals
    "entry_form": (e) => {
        const preform = e.querySelector(".preform");

        if (preform) {
            const paragraphs = preform.querySelectorAll("p");

            if (paragraphs[0]) {
                text(paragraphs[0], "jugadores totales");
            }

            if (paragraphs[1]) {
                text(paragraphs[1], "partidas jugadas");
            }

            if (paragraphs[2]) {
                text(paragraphs[2], "horas jugadas");
            }
        }

        const welcome = Array.from(
            e.querySelectorAll(":scope > h1")
        ).find(
            h => h.textContent.trim() === "welcome to TETR.IO"
        );

        if (welcome) {
            text(welcome, "bienvenido a TETR.IO");
        }

        const paragraphs = e.querySelectorAll(":scope > p");

        if (paragraphs[0]) {
            text(
                paragraphs[0],
                "resuelve puzzles junto a otros en este moderno pero familiar juego de bloques online. juega contra amigos y rivales de todo el mundo, o consigue un puesto en las clasificaciones - el futuro de los juegos de bloques es tuyo!"
            );
        }

        if (paragraphs[1]) {
            text(
                paragraphs[1],
                "introduce un nombre de usuario para unirte, o dejalo en blanco para obtener uno aleatorio"
            );
        }

        const terms = paragraphs[2];

        if (terms) {
            terms.childNodes.forEach(node => {
                if (node.nodeType !== Node.TEXT_NODE) {
                    return;
                }

                const value = node.textContent;

                const translated = value.replace(
                    "by joining, you accept the",
                    "al unirte, aceptas los"
                );

                if (translated !== value) {
                    node.textContent = translated;
                }
            });

            const links = terms.querySelectorAll("a");

            if (links[0] && links[0].textContent !== "terminos de uso") {
                text(links[0], "terminos de uso");
            }

            if (
                links[1] &&
                links[1].textContent !== "politica de privacidad"
            ) {
                text(links[1], "politica de privacidad");
            }

            if (links[2] && links[2].textContent !== "reglas") {
                text(links[2], "reglas");
            }

            const textNodes = Array.from(terms.childNodes).filter(
                node => node.nodeType === Node.TEXT_NODE
            );

            const lastTextNode = textNodes[textNodes.length - 1];

            if (lastTextNode) {
                const value = lastTextNode.textContent;

                const translated = value.replace(
                    "and",
                    "y"
                );

                if (translated !== value) {
                    lastTextNode.textContent = translated;
                }
            }
        }

        const username = e.querySelector("#entry_username");

        if (username) {
            attr(
                username,
                "placeholder",
                "NOMBRE DE USUARIO"
            );
        }

        const join = e.querySelector("#entry_button");

        if (join) {
            text(join, "UNIRSE");
        }

        const desktop = e.querySelector(".electron_jump");

        if (desktop) {
            desktop.childNodes.forEach(node => {
                if (node.nodeType !== Node.TEXT_NODE) {
                    return;
                }

                const value = node.textContent;

                const translated = value.replace(
                    "open in",
                    "abrir en"
                );

                if (translated !== value) {
                    node.textContent = translated;
                }
            });
        }

        const desktopAlso = e.querySelector(".electron_jump_also");

        if (desktopAlso) {
            desktopAlso.childNodes.forEach(node => {
                if (node.nodeType !== Node.TEXT_NODE) {
                    return;
                }

                const value = node.textContent;

                const translated = value.replace(
                    "GET",
                    "OBTENER"
                );

                if (translated !== value) {
                    node.textContent = translated;
                }
            });
        }
    },

    "askregister_form": (e) => {
        const h1 = e.querySelector("h1");
        const p = e.querySelector("p");
        const back = e.querySelector("#askregister_back");
        const anon = e.querySelector("#askregister_anon");
        const register = e.querySelector("#askregister_register");

        if (h1) text(h1, "QUIERES UNIRTE?");
        if (p) p.innerHTML = 'el apodo&nbsp;<span class="inline_self" id="askregister_is"></span>&nbsp;no esta registrado. quieres reclamarlo como tuyo o jugar de forma anonima? no podras enviar puntuaciones a las clasificaciones ni jugar en matchmaking de forma anonima.';
        if (back) text(back, "VOLVER");
        if (anon) text(anon, "SEGUIR COMO ANONIMO");
        if (register) text(register, "REGISTRARSE");
    },

    "register_form": (e) => {
        const h1 = e.querySelector("h1");
        const p = e.querySelector("p");
        const email = e.querySelector("#register_password_email_field");
        const password = e.querySelector("#register_password");
        const passwordAgain = e.querySelector("#register_password_confirmation");
        const back = e.querySelector("#register_back");
        const register = e.querySelector("#register_button");

        if (h1) text(h1, "HAGAMOSLO OFICIAL");
        if (p) text(p, "para registrarte, elige una contrasena");
        if (email) attr(email, "placeholder", "correo electronico (opcional)");
        if (password) attr(password, "placeholder", "CONTRASENA");
        if (passwordAgain) attr(passwordAgain, "placeholder", "CONTRASENA DE NUEVO");
        if (back) text(back, "VOLVER");
        if (register) text(register, "REGISTRARSE");
    },
    "login_form": (e) => {
        const h1 = e.querySelector("h1");
        const p = e.querySelector("p");
        const password = e.querySelector("#login_password");
        const back = e.querySelector("#login_back");
        const reset = e.querySelector("#login_reset");
        const login = e.querySelector("#login_button");

        if (h1) text(h1, "QUE BUENO VERTE DE NUEVO!");
        if (p) p.innerHTML = 'el nombre de usuario&nbsp;<span class="inline_self" id="login_is"></span>&nbsp;esta registrado. introduce tu contrasena para iniciar sesion';
        if (password) attr(password, "placeholder", "CONTRASENA");
        if (back) text(back, "VOLVER");
        if (reset) text(reset, "LA OLVIDE");
        if (login) text(login, "INICIAR SESION");
    },
    "request_reset_form": (e) => {
        const h1 = e.querySelector("h1");
        const p = e.querySelector("p");
        const email = e.querySelector("#request_reset_email");
        const back = e.querySelector("#request_reset_back");
        const reset = e.querySelector("#request_reset_button");

        if (h1) text(h1, "OLVIDASTE TU CONTRASENA?");
        if (p) text(p, "si tienes una direccion de correo asociada a tu cuenta, puedes restablecer tu contrasena introduciendo tu correo.");
        if (email) attr(email, "placeholder", "correo electronico");
        if (back) text(back, "VOLVER");
        if (reset) text(reset, "SOLICITAR RESTABLECIMIENTO");
    },
    "registeralt_form": (e) => {
        const h1 = e.querySelector("h1");
        const paragraphs = e.querySelectorAll("p");
        const back = e.querySelector("#registeralt_back");
        const continueButton = e.querySelector("#registeralt_continue");
        const img = e.querySelector("img");

        if (img && replacementImages["altpolicy.png"]) {
            attr(img, "src", replacementImages["altpolicy.png"]);
        }

        if (h1) {
            h1.innerHTML = 'ERES&nbsp;<span id="registeralt_username"></span>?';
        }

        if (paragraphs[0]) {
            paragraphs[0].innerHTML =
                'TETR.IO tiene una politica de&nbsp;<b>una cuenta por persona (excepto cuentas anonimas)</b>. ' +
                'crear varias cuentas puede resultar en la restriccion permanente de todas tus cuentas.';
        }

        if (paragraphs[1]) {
            paragraphs[1].innerHTML =
                'lee la&nbsp;<a href="/about/rules/#ap" target="_blank">politica completa</a>&nbsp;para obtener mas informacion. ' +
                'si tienes dudas, o crees que el uso de una segunda cuenta esta justificado, ' +
                'por favor&nbsp;<a href="/about/support/" target="_blank">contacta con soporte</a>.';
        }

        if (back) text(back, "VOLVER");
        if (continueButton) text(continueButton, "NO ESTOY USANDO VARIAS CUENTAS");
    },
    "captcha_form": (e) => {
        const h1 = e.querySelector("h1");
        const input = e.querySelector("#captcha");
        const button = e.querySelector("#captcha_button");

        if (h1) text(h1, "SOLO PARA ASEGURARNOS...");
        if (input) attr(input, "placeholder", "introduce los caracteres de arriba");
        if (button) text(button, "ENVIAR");
    },
    "totp_form": (e) => {
        const h1 = e.querySelector("h1");
        const p = e.querySelector("p");
        const input = e.querySelector("#totp");
        const button = e.querySelector("#totp_button");

        if (h1) text(h1, "AUTENTICACION DE DOS FACTORES");
        if (p) text(p, "usa tu aplicacion de autenticacion para obtener un codigo de seis digitos, o utiliza uno de tus codigos de recuperacion.");
        if (input) attr(input, "placeholder", "seis digitos");
        if (button) text(button, "ENVIAR");
    },
    "reset_step2_form": (e) => {
        const h1 = e.querySelector("h1");
        const p = e.querySelector("p");
        const password = e.querySelector("#reset_step2_password");
        const passwordAgain = e.querySelector("#reset_step2_password_confirmation");
        const reset = e.querySelector("#reset_step2_button");

        if (h1) text(h1, "RESTABLECE TU CONTRASENA");
        if (p) text(p, "introduce una nueva contrasena para recuperar el acceso a tu cuenta");
        if (password) attr(password, "placeholder", "CONTRASENA");
        if (passwordAgain) attr(passwordAgain, "placeholder", "CONTRASENA DE NUEVO");
        if (reset) text(reset, "RESTABLECER");
    },

    "deletion_step1_form": (e) => {
        const h1 = e.querySelector("h1");
        const paragraphs = e.querySelectorAll("p");
        const cancel = e.querySelector("#deletion_step1_cancel");
        const deleteButton = e.querySelector("#deletion_step1_button");

        if (h1) text(h1, "ELIMINA TU CUENTA");

        if (paragraphs[0]) {
            text(paragraphs[0],
                "estas seguro de que quieres eliminar tu cuenta? perderas TODO, incluyendo, entre otras cosas..."
            );
        }

        if (paragraphs[1]) {
            paragraphs[1].innerHTML =
                "• todas tus repeticiones<br>" +
                "• todo tu XP<br>" +
                "• todos tus logros<br>" +
                "• todas tus insignias<br>" +
                "• tu rango de TETRA LEAGUE<br>" +
                "• y mucho mas...";
        }

        if (paragraphs[2]) {
            text(paragraphs[2], "esto no se puede deshacer.");
        }

        if (cancel) text(cancel, "CANCELAR");
        if (deleteButton) text(deleteButton, "ELIMINAR");
    },

    "deletion_step2_form": (e) => {
        const h1 = e.querySelector("h1");
        const p = e.querySelector("p");
        const cancel = e.querySelector("#deletion_step2_cancel");
        const deleteButton = e.querySelector("#deletion_step2_button");

        if (h1) text(h1, "ELIMINA TU CUENTA");
        if (p) text(p, "estas absolutamente, 100% seguro de que no te arrepentiras de ELIMINAR TU CUENTA PARA SIEMPRE?");
        if (cancel) text(cancel, "CANCELAR");
        if (deleteButton) text(deleteButton, "SIN ARREPENTIMIENTOS!");
    },
    "deletion_final_form": (e) => {
        const header = e.querySelector("#deletion_header");
        const cancel = e.querySelector("#deletion_final_cancel");

        if (header) text(header, "ELIMINANDO EN");
        if (cancel) text(cancel, "CANCELAR");
    },
    "electron_form": (e) => {
        const h1 = e.querySelector("h1");
        const p = e.querySelector("p");

        if (h1) text(h1, "TETR.IO DESKTOP deberia abrirse pronto!");
        if (p) text(p, "puedes cerrar esta pestaña una vez que se haya abierto");
    },
    "return_form": (e) => {
        const headings = e.querySelectorAll("h1");
        const paragraphs = e.querySelectorAll("p");
        const username = e.querySelector("#return_is");
        const logout = e.querySelector("#return_logout");
        const join = e.querySelector("#return_button");

        if (paragraphs[0]) text(paragraphs[0], "jugadores totales");
        if (paragraphs[1]) text(paragraphs[1], "partidas jugadas");
        if (paragraphs[2]) text(paragraphs[2], "horas jugadas");

        const welcome = [...headings].find(
            h1 => h1.textContent.trim() === "welcome back to TETR.IO!"
        );

        if (welcome) text(welcome, "bienvenido de nuevo a TETR.IO!");

        if (paragraphs[3]) text(paragraphs[3], "¿eres tu?");

        if (logout) text(logout, "CERRAR SESION");
        if (join) text(join, "UNIRSE");

        const desktop = e.querySelector(".electron_jump");
        if (desktop) {
            desktop.innerHTML = 'abrir en&nbsp;<span class="cheeky">TETRIO</span>&nbsp;DESKTOP';
        }

        const desktopAlso = e.querySelector(".electron_jump_also");
        if (desktopAlso) {
            desktopAlso.innerHTML = 'OBTENER&nbsp;<span class="cheeky">TETRIO</span>&nbsp;DESKTOP';
        }
    },

    // Global overlays
    "nofocus": (e) => {
        const span = e.querySelector("span");

        e.firstChild.textContent = "SIN FOCO";
        if (span) text(span, "haz clic para volver a TETR.IO");
    },
    "noreplay": (e) => text(e, "la repeticion no se guardara"),
    "victory_header": (e) => text(e, "¡GANADOR!"),
    "victory_sub": (e) => {
        const value = e.textContent;
        const translated = value.replace("ALIVE FOR", "VIVO DURANTE");
        text(e, translated);
    },

    "diyusi_enemies": (e) => text(e.querySelector("h1"), "¡CUIDADO!"),
    "scoreslide_leader_info": (e) => text(e, "GANADOR DE ESTA RONDA"),
    "upsell_zen-try-sidebar": (e) => text(e.querySelector("p"), "pasa el cursor para cambiar la configuracion"),

    "zen_panel": (e) => {
        const headings = {
            "MISC": "VARIOS",
            "SPINS": "SPINS",
            "COMBO TABLE": "TABLA DE COMBOS",
            "KICK TABLE": "TABLA DE KICKS",
            "GRAVITY": "GRAVEDAD",
            "DISPLAY": "PANTALLA",
            "GARBAGE": "BASURA"
        };

        const labels = {
            "LEVELING": "SUBIR DE NIVEL",
            "INFINITE HOLD": "HOLD INFINITO",
            "UNDO/REDO": "DESHACER/REHACER",
            "static gravity": "gravedad estatica",
            "cheese messiness %": "desorden de la basura %"
        };

        const options = {
            "ON": "ACTIVADO",
            "DISCREET": "DISCRETO",
            "OFF": "DESACTIVADO",
            "T-SPINS": "T-SPINS",
            "T-SPINS+": "T-SPINS+",
            "ALL-SPINS+": "TODOS LOS SPINS+",
            "ALL-SPINS": "TODOS LOS SPINS",
            "ALL-MINI+": "TODOS-MINI+",
            "ALL-MINI": "TODOS-MINI",
            "MINI-ONLY": "SOLO-MINI",
            "HANDHELD": "PORTATIL",
            "STUPID": "ESTUPIDO",
            "NONE": "NINGUNO",
            "MULTIPLIER": "MULTIPLICADOR",
            "CLASSIC GUIDELINE": "GUIA CLASICA",
            "MODERN GUIDELINE": "GUIA MODERNA",
            "SRS": "SRS",
            "SRS-X": "SRS-X",
            "TETRA-X": "TETRA-X",
            "NRS": "NRS",
            "ARS": "ARS",
            "ASC": "ASC",
            "SUBZERO": "SUBZERO",
            "RELAXED": "RELAJADA",
            "ENGAGING": "INTENSA",
            "SPICY": "PICANTE",
            "STATIC": "ESTATICA",
            "VERSUS": "VERSUS",
            "TIME": "TIEMPO",
            "SPEED": "VELOCIDAD",
            "EFFICIENCY": "EFICIENCIA",
            "BACKFIRE 0.5X": "REBOTE 0.5X",
            "BACKFIRE 1X": "REBOTE 1X",
            "BACKFIRE 2X": "REBOTE 2X",
            "UNCLEAR 0.5X": "DESPEJE 0.5X",
            "UNCLEAR 1X": "DESPEJE 1X",
            "UNCLEAR 2X": "DESPEJE 2X",
            "CHEESE LAYER": "CAPA DE BASURA",
            "CHEESE TIMER": "TEMPORIZADOR DE BASURA"
        };

        const titles = {
            "Level up every now and then.": "Subir de nivel de vez en cuando.",
            "Level up every now and then without interrupting gameplay.": "Subir de nivel de vez en cuando sin interrumpir la partida.",
            "Do not level up.": "No subir de nivel.",
            "Allow infinite holding": "Permitir HOLD infinito.",
            "Do not allow infinite hold": "No permitir HOLD infinito.",
            "Receive bonuses for spinning T-pieces.": "Recibir bonificaciones por hacer spins con piezas T.",
            "Receive bonuses for spinning T-pieces. Allows immobile T-piece to count as a Mini.": "Recibir bonificaciones por hacer spins con piezas T. Permite que una pieza T inmovil cuente como Mini.",
            "Receive bonuses for spinning all pieces. Allows immobile T-piece to count as a Mini.": "Recibir bonificaciones por hacer spins con todas las piezas. Permite que una pieza T inmovil cuente como Mini.",
            "Receive bonuses for spinning all pieces.": "Recibir bonificaciones por hacer spins con todas las piezas.",
            "Receive bonuses for spinning T-pieces, receive Back-to-Back for spinning all other pieces. Allows immobile T-piece to count as a Mini.": "Recibir bonificaciones por hacer spins con piezas T y Back-to-Back por hacer spins con las demas piezas. Permite que una pieza T inmovil cuente como Mini.",
            "Receive bonuses for spinning T-pieces, receive Back-to-Back for spinning all other pieces.": "Recibir bonificaciones por hacer spins con piezas T y Back-to-Back por hacer spins con las demas piezas.",
            "Receive Back-to-Back for spinning all other pieces.": "Recibir Back-to-Back por hacer spins con las demas piezas.",
            "Receive bonuses for spinning all pieces. Non T-Spin attacks are halved. Pieces use 4-corner detection.": "Recibir bonificaciones por hacer spins con todas las piezas. Los ataques que no sean T-Spin se reducen a la mitad. Las piezas usan deteccion de 4 esquinas.",
            "Everything is a spin because YEAH WHY NOT (O-spin SUPPORTED!).": "Todo es un spin porque SI, POR QUE NO (O-spin COMPATIBLE!).",
            "Receive no spin bonuses.": "No recibir bonificaciones por spins.",
            "TETR.IO's combo multiplier.": "Multiplicador de combos de TETR.IO.",
            "Classic guideline combo table.": "Tabla de combos de la guia clasica.",
            "Modern guideline combo table.": "Tabla de combos de la guia moderna.",
            "Disable combo chaining.": "Desactivar las cadenas de combos.",
            "The default natural rotation system with symmetric I-piece rotation.": "El sistema de rotacion natural predeterminado con rotacion simetrica de la pieza I.",
            "The standard natural rotation system.": "El sistema de rotacion natural estandar.",
            "SRS with more powerful 180 spins.": "SRS con spins de 180 mas potentes.",
            "Novel rotation system by DR OCELOT.": "Sistema de rotacion creado por DR OCELOT.",
            "The classic rotation system.": "El sistema de rotacion clasico.",
            "Rotation system used in arcade games.": "Sistema de rotacion utilizado en juegos arcade.",
            "Permissive rotation system by WINTERNEBS.": "Sistema de rotacion permisivo creado por WINTERNEBS.",
            "No kicks possible.": "No se permiten kicks.",
            "No gravity and infinite movement.": "Sin gravedad y movimiento infinito.",
            "No gravity.": "Sin gravedad.",
            "Relaxing, low gravity that increases a little throughout the level.": "Gravedad baja y relajada que aumenta un poco durante el nivel.",
            "Engaging, medium level gravity that increases throughout the level.": "Gravedad media e intensa que aumenta durante el nivel.",
            "Fast gravity that increases throughout the level.": "Gravedad rapida que aumenta durante el nivel.",
            "Static custom gravity.": "Gravedad personalizada estatica.",
            "No counters show up.": "No se muestran contadores.",
            "Tools for Versus play show up.": "Se muestran herramientas para jugar en Versus.",
            "A timer shows up.": "Se muestra un temporizador.",
            "Tools to measure your speed show up.": "Se muestran herramientas para medir tu velocidad.",
            "Tools to measure your efficiency show up.": "Se muestran herramientas para medir tu eficiencia.",
            "No garbage.": "Sin basura.",
            "Half your attack power is sent back to you.": "La mitad de tu poder de ataque se devuelve hacia ti.",
            "All your attack power is sent back to you.": "Todo tu poder de ataque se devuelve hacia ti.",
            "Double your attack power is sent back to you.": "El doble de tu poder de ataque se devuelve hacia ti.",
            "Half your attack power is immediately pushed onto your board.": "La mitad de tu poder de ataque se envia inmediatamente a tu tablero.",
            "All your attack power is immediately pushed onto your board.": "Todo tu poder de ataque se envia inmediatamente a tu tablero.",
            "Double your attack power is immediately pushed onto your board.": "El doble de tu poder de ataque se envia inmediatamente a tu tablero.",
            "A static layer of cheese is added onto your board.": "Se agrega una capa estatica de basura a tu tablero.",
            "One line of cheese is sent periodically.": "Se envia una linea de basura periodicamente."
        };

        e.querySelectorAll("h1").forEach(h1 => {
            const value = h1.textContent.trim();
            if (headings[value]) text(h1, headings[value]);
        });

        e.querySelectorAll("label").forEach(label => {
            const value = label.textContent.trim();
            if (labels[value]) text(label, labels[value]);
        });

        e.querySelectorAll(".panel_option").forEach(option => {
            const value = option.textContent.trim();

            if (options[value]) {
                text(option, options[value]);
            }

            const title = option.getAttribute("title");
            if (title && titles[title]) {
                attr(option, "title", titles[title]);
            }
        });
    },
    "ongoing": (e) => {
        const dict = {
            "ZEN WHILE WAITING": "ZEN MIENTRAS ESPERAS",
            "BACK TO ROOM": "VOLVER A LA SALA",
            "TETRA LEAGUE": "LIGA TETRA",
            "FINDING MATCH": "BUSCANDO PARTIDA",
            "CANCEL MATCHMAKING": "CANCELAR BUSQUEDA",
        };

        e.querySelectorAll(".ongoing_header, .ongoing_sub, .ongoing_button").forEach(el => translateByDict(el, dict));
    },
    "mm_avgtime_time": (e) => {
        const span = e.querySelector("span");

        if (span) {
            translateByDict(span, {
                "SECOND": "SEGUNDO",
                "SECONDS": "SEGUNDOS",
                "MINUTE": "MINUTO",
                "MINUTES": "MINUTOS",
                "HOUR": "HORA",
                "HOURS": "HORAS"
            });
        }
    },
    "pair_intro_p1": (e) => text(e, "PREPARATE PARA"),
    "pair_intro_p2": (e) => text(e, "LA PROXIMA BATALLA"),

    "waitstate_forfeit_shade": (e) => text(e, "ABANDONAR PARTIDA"),
    "waitstate_forfeit_true": (e) => {
        const p = e.querySelector("p");
        const button = e.querySelector("#waitstate_forfeit");

        if (p) p.innerHTML = "la partida sera declarada SIN RESULTADO.<br>ningun jugador sera penalizado ni ganara o perdera TR.";
        if (button) text(button, "ESTOY DE ACUERDO");
    },
    "roomprepare": (e) => {
        e.firstChild.textContent = "PREPARANDO PARTIDA";
    },
    "roomprepare_detail": (e) => {
        e.firstChild.textContent = e.firstChild.textContent.replace("players loaded", "jugadores cargados");
    },

    // NOTA: hasta la limpieza de este archivo, "social_status" estaba
    // definido dos veces; la segunda (una copia local incompleta de
    // statusTranslations, sin "BLOCKED" y sin negrita en varios estados)
    // ganaba silenciosamente. Se unifico en una sola version, usando el
    // diccionario completo.
    "social_status": (e) => {
        const original = e.textContent.trim();
        const translated = statusTranslations[original];

        if (!translated) {
            return;
        }

        if (Array.isArray(translated)) {
            if (!e.querySelector("b")) {
                return;
            }

            text(e, `${translated[0]}<b>${translated[1]}</b>`);
        } else {
            text(e, translated);
        }
    },

    "social_dm_status": (e) => {
        const original = e.textContent.trim();

        const translated = statusTranslations[original];

        if (!translated) {
            return;
        }

        if (Array.isArray(translated)) {
            const textNode = Array.from(e.childNodes).find(
                node =>
                    node.nodeType === Node.TEXT_NODE &&
                    node.textContent.trim() !== ""
            );

            if (textNode) {
                const value = textNode.textContent;
                const leadingWhitespace =
                    value.match(/^\s*/)?.[0] || "";
                const trailingWhitespace =
                    value.match(/\s*$/)?.[0] || "";

                const expectedText =
                    leadingWhitespace +
                    translated[0] +
                    trailingWhitespace;

                if (value !== expectedText) {
                    textNode.textContent = expectedText;
                }
            }

            const bold = e.querySelector("b");

            if (bold && bold.textContent !== translated[1]) {
                bold.textContent = translated[1];
            }

            return;
        }

        const textNode = Array.from(e.childNodes).find(
            node =>
                node.nodeType === Node.TEXT_NODE &&
                node.textContent.trim() !== ""
        );

        if (textNode) {
            const value = textNode.textContent;
            const leadingWhitespace =
                value.match(/^\s*/)?.[0] || "";
            const trailingWhitespace =
                value.match(/\s*$/)?.[0] || "";

            const expectedText =
                leadingWhitespace +
                translated +
                trailingWhitespace;

            if (value !== expectedText) {
                textNode.textContent = expectedText;
            }
        }
    },

    "replay": (e) => {
        const keystone = e.querySelector(".keystone");
        const data = e.querySelector("#data_replay");
        const exit = e.querySelector("#exit_replay");

        if (keystone) {
            const value = keystone.textContent;

            if (value !== "REPETICION") {
                text(keystone, "REPETICION");
            }
        }

        if (exit) {
            const value = exit.textContent;

            if (value !== "SALIR") {
                text(exit, "SALIR");
            }
        }

        if (!data) {
            return;
        }

        data.childNodes.forEach(node => {
            if (node.nodeType !== Node.TEXT_NODE) {
                return;
            }

            const value = node.textContent;
            let translated = value
                .replace("watching", "viendo")
                .replace("Watching", "Viendo")
                .replace("play", "jugar")
                .replace("Play", "Jugar");

            if (translated !== value) {
                node.textContent = translated;
            }
        });

        const spans = data.querySelectorAll("span");

        if (spans.length >= 2) {
            translateByDict(spans[1], {
                "QUICK PLAY": "PARTIDA RAPIDA",
                "40 LINES": "40 LINEAS",
                "TETRA LEAGUE": "LIGA TETRA",
                "ZEN": "ZEN",
                "BLITZ": "BLITZ"
            });
        }
    },
    "social_relationships": (e) => {
        e.querySelectorAll(".social_relationship").forEach(friend => {

            /* =========================
               ESTADO VISIBLE
            ========================= */

            const status = friend.querySelector("p");

            if (status) {
                const original = status.textContent.trim();
                const translated = statusTranslations[original];

                if (translated) {

                    if (Array.isArray(translated)) {
                        status.childNodes.forEach(node => {

                            if (node.nodeType === Node.TEXT_NODE) {
                                const value = node.textContent;

                                if (
                                    value.includes(original.split(" ")[0])
                                ) {
                                    const leading =
                                        value.match(/^\s*/)?.[0] || "";

                                    const trailing =
                                        value.match(/\s*$/)?.[0] || "";

                                    const expected =
                                        leading +
                                        translated[0] +
                                        trailing;

                                    if (value !== expected) {
                                        node.textContent = expected;
                                    }
                                }
                            }

                            if (
                                node.nodeType === Node.ELEMENT_NODE &&
                                node.tagName === "B"
                            ) {
                                if (
                                    node.textContent !==
                                    translated[1]
                                ) {
                                    node.textContent =
                                        translated[1];
                                }
                            }
                        });
                    } else {
                        const textNode = Array.from(
                            status.childNodes
                        ).find(
                            node =>
                                node.nodeType === Node.TEXT_NODE &&
                                node.textContent.trim() !== ""
                        );

                        if (textNode) {
                            const value = textNode.textContent;
                            const leading =
                                value.match(/^\s*/)?.[0] || "";
                            const trailing =
                                value.match(/\s*$/)?.[0] || "";

                            const expected =
                                leading +
                                translated +
                                trailing;

                            if (value !== expected) {
                                textNode.textContent = expected;
                            }
                        }
                    }
                }
            }

            /* =========================
               TITLE DEL USUARIO
            ========================= */

            const title = friend.getAttribute("title");

            if (title) {
                const lines = title.split("\n");

                if (lines.length >= 2) {
                    const statusLine = lines
                        .slice(1)
                        .join("\n");

                    const translated =
                        statusTranslations[statusLine];

                    if (translated) {
                        const translatedText =
                            Array.isArray(translated)
                                ? translated[0] + translated[1]
                                : translated;

                        const newTitle =
                            lines[0] +
                            "\n" +
                            translatedText;

                        if (newTitle !== title) {
                            attr(
                                friend,
                                "title",
                                newTitle
                            );
                        }
                    }
                }
            }

            /* =========================
               BOTONES
            ========================= */

            friend.querySelectorAll(
                ".social_relationship_button"
            ).forEach(button => {

                const title =
                    button.getAttribute("title");

                if (title === "Join room") {
                    attr(
                        button,
                        "title",
                        "Unirse a la sala"
                    );
                }

                if (title === "Invite to your game") {
                    attr(
                        button,
                        "title",
                        "Invitar a tu partida"
                    );
                }
            });
        });
    },
    "social_relationships_find": (e) => {
        attr(e, "placeholder", "Ǖ buscar a alguien...");
    },

    "social_relationships_tabs_online": (e) => {
        const p = e.querySelector("p");

        if (p) {
            const value = p.textContent;
            const translated = value.replace("ONLINE", "EN LINEA");

            if (translated !== value) {
                p.firstChild.textContent = "EN LINEA";
            }
        }

        const title = e.getAttribute("title");

        if (title === "Online friends only.") {
            attr(e, "title", "Solo amigos conectados.");
        }
    }, "social_relationships_tabs_friends": (e) => {
        const p = e.querySelector("p");

        if (p) {
            const value = p.textContent;
            const translated = value.replace("ALL", "TODOS");

            if (translated !== value) {
                p.firstChild.textContent = "TODOS";
            }
        }

        const title = e.getAttribute("title");

        if (title === "All friends.") {
            attr(e, "title", "Todos los amigos.");
        }
    },

    "social_relationships_tabs_blocked": (e) => {
        const p = e.querySelector("p");

        if (p) {
            const value = p.textContent;
            const translated = value.replace("BLOCKED", "BLOQUEADOS");

            if (translated !== value) {
                p.firstChild.textContent = "BLOQUEADOS";
            }
        }

        const title = e.getAttribute("title");

        if (title === "Players you have blocked.") {
            attr(
                e,
                "title",
                "Jugadores que has bloqueado."
            );
        }
    },

    "social_dm": (e) => {
        const offlineImg = e.querySelector(".social_offline img");

        if (offlineImg && replacementImages["social_offline.png"]) {
            attr(offlineImg, "src", replacementImages["social_offline.png"]);
        }

        const offline = e.querySelector(".social_offline p");

        if (offline) {
            const value = offline.textContent.trim();

            if (
                value ===
                "Not connected to online servers. Sit tight, we'll try to reconnect you in the background."
            ) {
                text(
                    offline,
                    "No conectado a los servidores online. Espera un momento, intentaremos reconectarte en segundo plano."
                );
            }
        }

        const chatBanner = e.querySelector(
            ".dm_chat_message.chat_banner p"
        );

        if (chatBanner) {
            const value = chatBanner.textContent.trim();

            if (
                value ===
                "Please be civil. Staff will never ask for your credentials."
            ) {
                text(
                    chatBanner,
                    "Por favor, se respetuoso. El personal nunca te pedira tus credenciales."
                );
            }
        }
    },

    "social_dm_button_profile": (e) => {
        const img = e.querySelector("img");

        if (img) {
            const title = e.getAttribute("title");

            if (title === "Open profile card") {
                attr(e, "title", "Abrir tarjeta de perfil");
            }
        }

        const textNode = Array.from(e.childNodes).find(
            node => node.nodeType === Node.TEXT_NODE
        );

        if (textNode && textNode.textContent.trim() === "PROFILE") {
            textNode.textContent = "PERFIL";
        }
    },
    "social_dm_button_gift": (e) => {
        const title = e.getAttribute("title");

        if (title === "Gift TETR.IO Supporter") {
            attr(e, "title", "Regalar TETR.IO Supporter");
        }

        const textNode = Array.from(e.childNodes).find(
            node => node.nodeType === Node.TEXT_NODE
        );

        if (textNode && textNode.textContent.trim() === "GIFT") {
            textNode.textContent = "REGALAR";
        }
    },
    "social_dm_button_invite": (e) => {
        const title = e.getAttribute("title");

        if (title === "Invite to your room") {
            attr(e, "title", "Invitar a tu sala");
        }

        const textNode = Array.from(e.childNodes).find(
            node => node.nodeType === Node.TEXT_NODE
        );

        if (textNode && textNode.textContent.trim() === "INVITE") {
            textNode.textContent = "INVITAR";
        }
    },
    "social_dm_button_snipe": (e) => {
        const title = e.getAttribute("title");

        if (title === "Join room") {
            attr(e, "title", "Unirse a la sala");
        }

        const textNode = Array.from(e.childNodes).find(
            node => node.nodeType === Node.TEXT_NODE
        );

        if (textNode && textNode.textContent.trim() === "JOIN") {
            textNode.textContent = "UNIRSE";
        }
    },

    "social_dm_input": (e) => {
        attr(e, "placeholder", "mensaje...");
    },

    "social_top_sessiontime": (e) => {
        e.childNodes.forEach(node => {
            if (node.nodeType !== Node.TEXT_NODE) {
                return;
            }

            const value = node.textContent;

            if (!value.includes("seconds this session")) {
                return;
            }

            const translated = value.replace(
                "seconds this session",
                "segundos en esta sesion"
            );

            if (translated !== value) {
                node.textContent = translated;
            }
        });
    },

    "social_notifications": (e) => {
        const header = e.querySelector(".social_bar_header");

        if (header) {
            const value = header.textContent.trim();

            if (value === "NOTIFICATIONS") {
                text(header, "NOTIFICACIONES");
            }
        }

        const offlineImg = e.querySelector(".social_offline img");

        if (offlineImg && replacementImages["social_offline.png"]) {
            attr(offlineImg, "src", replacementImages["social_offline.png"]);
        }
    },
    "social_people": (e) => {
        const offlineImg = e.querySelector(".social_offline img");

        if (offlineImg && replacementImages["social_offline.png"]) {
            attr(offlineImg, "src", replacementImages["social_offline.png"]);
        }
    },
    "social_notifications_content": (e) => {

        e.querySelectorAll(".social_notification").forEach(notification => {
            applyAchievementNotification(notification);

            /* TITULO (si no es un logro) */
            const h1 = notification.querySelector("h1");

            if (h1) {
                translateByDict(h1, {
                    "You forfeited a ranked match": "Has abandonado una partida clasificatoria"
                });
            }

            /* DESCRIPCION (si no es un logro) */
            const p = notification.querySelector("p");

            if (p) {
                translateByDict(p, {
                    "You have been awarded a loss for this match. Please ensure you have the time and internet connection to play! Repeated forfeits are punished (and will be automatically punished in the future). Thank you for understanding!":
                        "Se te ha asignado una derrota en esta partida. Asegurate de tener tiempo y una conexion a internet para jugar! Los abandonos repetidos son sancionados (y seran sancionados automaticamente en el futuro). Gracias por tu comprension!"
                });
            }

            /* TEXTO DINAMICO DE NOTIFICACIONES DE AMISTAD */
            notification.querySelectorAll("p").forEach(p => {

                p.childNodes.forEach(node => {

                    if (node.nodeType !== Node.TEXT_NODE) {
                        return;
                    }

                    const value = node.textContent;
                    const translated = value.replace("has", "ha");

                    if (translated !== value) {
                        node.textContent = translated;
                    }
                });

                p.querySelectorAll("b").forEach(b => {

                    const value = b.textContent.trim();

                    if (value === "friended you back") {
                        const translated = " acepto tu solicitud de amistad.";

                        if (translated !== value) {
                            text(b, translated);
                        }
                    }
                });
            });
        });
    },

    "list_request_scroller": (e) => {
        const dict = {
            "ONLINE": "EN LINEA",
            "AWAY": "AUSENTE",
            "BUSY": "OCUPADO",
            "INVISIBLE": "INVISIBLE",

            "appear as usual": "aparecer normalmente",
            "appear away, unless you're offline or busy": "aparecer ausente, excepto si estas desconectado u ocupado",
            "appear busy, unless you're offline. receive no notifications. always enabled in TETRA LEAGUE (unless you're invisible)": "aparecer ocupado, excepto si estas desconectado. no recibir notificaciones. siempre activado en TETRA LEAGUE (excepto si eres invisible)",
            "appear offline at all times": "aparecer desconectado en todo momento",

            "DEFAULT": "PREDETERMINADO",
            "use the default option": "usar la opcion predeterminada",
            "EMPTY": "VACIO",
            "leave this slot empty": "dejar este espacio vacio",
            "SCORE": "PUNTUACION",
            "display the score in this slot": "mostrar la puntuacion en este espacio",
            "SCORE (per piece)": "PUNTUACION (por pieza)",
            "display the score and score per piece in this slot": "mostrar la puntuacion y la puntuacion por pieza en este espacio",
            "STOPWATCH": "CRONOMETRO",
            "display the time passed in this slot": "mostrar el tiempo transcurrido en este espacio",
            "LINES": "LINEAS",
            "display the amount of cleared lines in this slot": "mostrar la cantidad de lineas despejadas en este espacio",
            "PIECES": "PIEZAS",
            "display the amount of placed pieces and speed in this slot": "mostrar la cantidad de piezas colocadas y la velocidad en este espacio",
            "INPUTS": "ENTRADAS",
            "display the amount of buttonpresses in this slot": "mostrar la cantidad de pulsaciones de botones en este espacio",
            "FINESSE": "PRECISION",
            "display your finesse in this slot": "mostrar tu precision en este espacio",
            "FINESSE (SMALLER)": "PRECISION (MAS PEQUENA)",
            "display your finesse in this slot (for use on the left-hand side)": "mostrar tu precision en este espacio (para usar en el lado izquierdo)",
            "HOLD": "HOLD",
            "display the amount of held pieces in this slot": "mostrar la cantidad de piezas guardadas en este espacio",
            "ALL CLEARS": "TODOS LOS DESPEJES",
            "display the amount of ALL CLEARS in this slot": "mostrar la cantidad de TODOS LOS DESPEJES en este espacio",

            "PUBLIC ROOM": "SALA PUBLICA",
            "PRIVATE ROOM": "SALA PRIVADA",
            "create a public room anyone can join": "crear una sala publica a la que cualquiera puede unirse",
            "create a private room your you and friends": "crea una sala privada para ti y tus amigos",

            "RETRY": "REINTENTAR",
            "BACK TO TITLE": "VOLVER AL INICIO",
            "": "",
        };

        e.querySelectorAll(".scroller_item").forEach(item => {
            const h1 = item.querySelector("h1");
            const p = item.querySelector("p");

            if (h1) {
                h1.childNodes.forEach(node => {
                    if (node.nodeType !== Node.TEXT_NODE) {
                        return;
                    }

                    const value = node.textContent.trim();
                    const translated = dict[value];

                    if (translated && translated !== value) {
                        node.textContent = node.textContent.replace(
                            value,
                            translated
                        );
                    }
                });
            }

            if (p) translateByDict(p, dict);
        });
    },
    "social_bottom_online": (e) => {
        const value = e.textContent;
        const translated = value.replace("ONLINE", "EN LINEA");

        if (translated !== value) {
            e.textContent = translated;
        }
    },
    "majorshouts": (e) => {
        const shoutTranslations = {
            "FINISH!": "¡SE ACABO!",
            "GAME!": "¡FIN DE LA PARTIDA!",
            "TIEBREAKER": "¡FIN DE LA PARTIDA!",
        };

        e.querySelectorAll(".shout").forEach(shout => {
            const value = shout.textContent.trim();
            const translated = shoutTranslations[value];

            if (translated && translated !== value) {
                text(shout, translated);
            }
        });
    },
    "notifications": (e) => {
        const dict = {
            "this game's replay has expired": "la repeticion de esta partida ha expirado",
            "this name has been used before - please consider registering a full account!": "este nombre ha sido usado antes - por favor considera registrar una cuenta completa!",
            "This replay is no longer available.": "Esta repeticion ya no esta disponible.",
            "this room is full, so you are joining as a spectator": "esta sala esta llena, por lo que te uniras como espectador",
            "you were moved to spectators for being AFK": "te movimos a espectadores por estar AFK",
            "this room doesn't allows players with a rank higher than D, so you are joining as an observer": "esta sala no permite jugadores con un rango superior a D, por lo que te uniras como observador",
            "this room doesn't allows players with a rank higher than D+, so you are joining as an observer": "esta sala no permite jugadores con un rango superior a D+, por lo que te uniras como observador",
            "this room doesn't allows players with a rank higher than C-, so you are joining as an observer": "esta sala no permite jugadores con un rango superior a C-, por lo que te uniras como observador",
            "this room doesn't allows players with a rank higher than C, so you are joining as an observer": "esta sala no permite jugadores con un rango superior a C, por lo que te uniras como observador",
            "this room doesn't allows players with a rank higher than C+, so you are joining as an observer": "esta sala no permite jugadores con un rango superior a C+, por lo que te uniras como observador",
            "this room doesn't allows players with a rank higher than B-, so you are joining as an observer": "esta sala no permite jugadores con un rango superior a B-, por lo que te uniras como observador",
            "this room doesn't allows players with a rank higher than B, so you are joining as an observer": "esta sala no permite jugadores con un rango superior a B, por lo que te uniras como observador",
            "this room doesn't allows players with a rank higher than B+, so you are joining as an observer": "esta sala no permite jugadores con un rango superior a B+, por lo que te uniras como observador",
            "this room doesn't allows players with a rank higher than A-, so you are joining as an observer": "esta sala no permite jugadores con un rango superior a A-, por lo que te uniras como observador",
            "this room doesn't allows players with a rank higher than A, so you are joining as an observer": "esta sala no permite jugadores con un rango superior a A, por lo que te uniras como observador",
            "this room doesn't allows players with a rank higher than A+, so you are joining as an observer": "esta sala no permite jugadores con un rango superior a A+, por lo que te uniras como observador",
            "this room doesn't allows players with a rank higher than S-, so you are joining as an observer": "esta sala no permite jugadores con un rango superior a S-, por lo que te uniras como observador",
            "this room doesn't allows players with a rank higher than S, so you are joining as an observer": "esta sala no permite jugadores con un rango superior a S, por lo que te uniras como observador",
            "this room doesn't allows players with a rank higher than S+, so you are joining as an observer": "esta sala no permite jugadores con un rango superior a S+, por lo que te uniras como observador",
            "this room doesn't allows players with a rank higher than SS, so you are joining as an observer": "esta sala no permite jugadores con un rango superior a SS, por lo que te uniras como observador",
            "this room doesn't allows players with a rank higher than U, so you are joining as an observer": "esta sala no permite jugadores con un rango superior a U, por lo que te uniras como observador",
            "this room doesn't allows players with a rank higher than X, so you are joining as an observer": "esta sala no permite jugadores con un rango superior a X, por lo que te uniras como observador",
            "rank is too high to play in this room": "tu rango es demasiado alto para jugar en esta sala",
            "this room is full": "Esta sala esta llena",
            "recipient not found": "No se ha encontrado el destinatario",
            "changing VSYNC MODE requires a full restart to go in effect. close TETR.IO, then reopen it.": "cambiar el MODO VSYNC requiere reiniciar completamente para aplicar el cambio. cierra TETR.IO y vuelve a abrirlo.",
            "changing STREAMER COMPATIBILITY MODE requires a full restart to go in effect. close TETR.IO, then reopen it.": "cambiar el MODO DE COMPATIBILIDAD PARA STREAMERS requiere reiniciar completamente para aplicar el cambio. cierra TETR.IO y vuelve a abrirlo.",
            "changing GRAPHICS LEVEL requires a restart to fully go in effect. hit F5 on your keyboard to restart.": "cambiar el NIVEL DE GRAFICOS requiere reiniciar para aplicar completamente el cambio. pulsa F5 en tu teclado para reiniciar.",
            "changing CACHING LEVEL requires a restart to fully go in effect. hit F5 on your keyboard to restart.": "cambiar el NIVEL DE CACHE requiere reiniciar para aplicar completamente el cambio. pulsa F5 en tu teclado para reiniciar.",
            "changing WEBGL MODE requires a restart to fully go in effect. hit F5 on your keyboard to restart.": "cambiar el MODO WEBGL requiere reiniciar para aplicar completamente el cambio. pulsa F5 en tu teclado para reiniciar.",
            "changing POWER SAVE requires a restart to go in effect. hit F5 on your keyboard to restart.": "cambiar el AHORRO DE ENERGIA requiere reiniciar para aplicar el cambio. pulsa F5 en tu teclado para reiniciar.",
            "changing LOW RESOLUTION MODE requires a restart to go in effect. hit F5 on your keyboard to restart.": "cambiar el MODO DE BAJA RESOLUCION requiere reiniciar para aplicar el cambio. pulsa F5 en tu teclado para reiniciar.",
            "password incorrect": "contrasena incorrecta",
            "you must enter a valid email address": "debes ingresar una direccion de correo electronico valida",
            "a connection error has occurred": "se ha producido un error de conexion",
            "game submitted!": "partida enviada",
            "": "",
        };

        e.querySelectorAll(".notification").forEach(applyAchievementNotification);

        e.querySelectorAll(".notification p").forEach(p => {

            /* =========================
               TEXTO COMPLETO
            ========================= */

            if (translateByDict(p, dict)) return;

            /* =========================
               TEXTO DINAMICO
            ========================= */

            p.childNodes.forEach(node => {
                if (node.nodeType !== Node.TEXT_NODE) {
                    return;
                }

                const value = node.textContent;

                const translated = value
                    .replace("online now", "en linea ahora")
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
        });
    },
    // Prelaunch
    "prelaunch": (e) => {
        const buttons = e.querySelectorAll(".prelaunch_button");

        if (buttons[0]) text(buttons[0], "SEGUIR EL DESARROLLO");
        if (buttons[1]) text(buttons[1], "UNIRSE AL DISCORD");
    },
    "zenith_rollup_main": (e) => {
        if (e.textContent.trim() === "SPECTATE") {
            text(e, "ESPECTAR");
        }

        if (e.textContent.trim() === "PLAY") {
            text(e, "JUGAR");
        }

        const block = e.closest(".scroller_block");
        if (!block) return;

        block.querySelector(":scope > h1")?.textContent === "QUICK PLAY" &&
            text(block.querySelector(":scope > h1"), "PARTIDA RAPIDA");

        const paragraphs = block.querySelectorAll(":scope > p");

        if (paragraphs[0]) {
            const value = paragraphs[0].textContent.trim();

            if (value.startsWith("welcome to the ZENITH TOWER!")) {
                paragraphs[0].innerHTML =
                    "bienvenido a la TORRE ZENITH! envia lineas y elimina enemigos para subir por la torre.<br>" +
                    "cuanto mas alto subas por la torre, mas fuertes seran los oponentes!";
            }
        }

        if (paragraphs[1]) {
            const value = paragraphs[1].textContent.trim();

            if (value.startsWith("leaderboards reset every week")) {
                text(
                    paragraphs[1],
                    "las clasificaciones se reinician cada semana, hasta donde puedes llegar?"
                );
            }
        }
    },

    "room_chat_container": (e) => {
        e.querySelectorAll(
            ".chat_banner p, .chat_message.system p"
        ).forEach(p => translateByDict(p, CHAT_SYSTEM_MESSAGES));
    },

    "afterloader_text": (e) => translateByDict(e, {
        "joining room…": "uniendose a la sala…",
        "getting ready to spectate…": "preparandose para espectar…",
        "leaving room…": "saliendo de la sala…",
        "fetching TETRA LEAGUE data…": "obteniendo datos de TETRA LEAGUE…",
        "connecting to live servers…": "conectando a los servidores en vivo…",
        "requesting account data…": "solicitando datos de la cuenta…"
    }),
    "dialogs": (e) => {
        const translate = (selector, translations) => {
            e.querySelectorAll(selector).forEach(el => {
                const value = el.textContent.trim();

                if (!translations) {
                    const key = `${selector}|${value}`;

                    if (value && !reportedMissingTranslations.has(key)) {
                        reportedMissingTranslations.add(key);
                        console.warn("[TETRIO ES] Diccionario no definido:", value, "| selector:", selector);
                    }

                    return;
                }

                let translated = translations[value] || translations[value.toUpperCase()];

                if (!translated) {
                    return;
                }

                translated = matchCapitalization(value, translated);

                if (translated !== value) {
                    text(el, translated);
                }
            });
        };

        e.querySelectorAll(".supporter_modal").forEach(modal => {
            const dict = {
                "SUPPORT TETR.IO": "APOYAR TETR.IO",
                "free-to-win": "gratis-para-ganar",
                "play ": "jugar ",
                ", a co-op quick play climb (only one player needs supporter)": ", una subida cooperativa de Partida Rapida (solo un jugador necesita Supporter)",
                "show off with a very special ": "presume de una ",
                "customize your profile with a ": "personaliza tu perfil con un ",
                " section": " y una seccion",
                "easily ": "cambia facilmente ",
                " once a month and ": " una vez al mes y ",
                " on demand": " cuando quieras",
                "get access to ": "obtiene acceso a ",
                "set a ": "establece un ",
                " on your public and private rooms": " en tus salas publicas y privadas",
                "have up to ": "ten hasta ",
                ", up from 50": ", en lugar de 50",
                "get an exclusive ": "obtiene un ",
                " in the discord": " en Discord",
                "hide all ": "oculta todos los ",
                " from the game and tetra channel": " del juego y del canal tetra",
                "and get that warm feeling of ": "y disfruta de esa agradable sensacion de ",
                "TETR.IO Supporter is a ": "TETR.IO Supporter es un ",
                "If you buy it while still being a supporter, it will extend the duration of your existing supporter status.": "Si lo compras mientras sigues siendo Supporter, extendera la duracion de tu estado actual de Supporter.",
                "...or pick a custom length (up to 1200 meses)": "...o elige una duracion personalizada (hasta 1200 meses)",
                "save 17% by buying in bulk": "ahorra un 17% comprando al por mayor",
                "3RD PARTY ADS DISABLED": "ANUNCIOS DE TERCEROS DESACTIVADOS",
                "this toggle made possible by these generous supporters:": "esta opcion es posible gracias a estos generosos supporters:",
                "please, consider supporting TETR.IO development!": "por favor, considera apoyar el desarrollo de TETR.IO!"
            };

            const bumper = modal.querySelector(".supporter_bumper");

            if (bumper) {
                const textNodes = Array.from(bumper.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);

                textNodes.forEach(node => {
                    let value = node.textContent;

                    value = value.replace(
                        "Ever since starting TETR.IO back in February of 2019, I've always tried running it in a way I feel is fair. While it may be an .io-game, I don't want to go down the path of other such games. I want to pride myself on my game, not on my bottom line.",
                        "Desde que comence TETR.IO en febrero de 2019, siempre he intentado hacerlo de una manera que considero justa. Aunque sea un juego .io, no quiero seguir el camino de otros juegos similares. Quiero sentirme orgulloso de mi juego, no de mis ingresos."
                    );

                    value = value.replace("TETR.IO will always be ", "TETR.IO siempre sera ");

                    value = value.replace(
                        ", with monetization being optional for all players. Please help me sustain this goal, by supporting me, and get some cool benefits! While they won't improve your skill, they might make you stand out among friends, and rep your support!",
                        ", y la monetizacion siempre sera opcional para todos los jugadores. Ayudame a mantener este objetivo apoyandome y obten algunos beneficios geniales. Aunque no mejoraran tu habilidad, pueden ayudarte a destacar entre tus amigos y mostrar tu apoyo."
                    );

                    if (value !== node.textContent) {
                        node.textContent = value;
                    }
                });

                const footer = bumper.querySelector(".supporter_bumper_footer");

                if (footer) {
                    const value = footer.textContent;
                    const translated = "— osk, fundador y desarrollador de TETR.IO";

                    if (value !== translated) {
                        text(footer, translated);
                    }
                }
            }

            modal.querySelectorAll(".supporter-perk").forEach(perk => {
                perk.childNodes.forEach(node => {
                    if (node.nodeType !== Node.TEXT_NODE) {
                        return;
                    }

                    let value = node.textContent;

                    Object.entries(dict).forEach(([original, translated]) => {
                        value = value.replaceAll(original, translated);
                    });

                    if (value !== node.textContent) {
                        node.textContent = value;
                    }
                });
            });

            const payment = modal.querySelector(".supporter_payment_block");

            if (payment) {
                payment.querySelectorAll("p").forEach(p => {
                    const value = p.textContent;

                    if (value.startsWith("TETR.IO Supporter is a ")) {
                        const translated = "TETR.IO Supporter es un pago unico. Si lo compras mientras sigues siendo Supporter, extendera la duracion de tu estado actual de Supporter.";

                        if (value !== translated) {
                            text(p, translated);
                        }
                    }
                });

                const custom = payment.querySelector(".supporter_payment_custom");

                if (custom) {
                    const value = custom.textContent;
                    const translated = value.replace("...or pick a custom length", "...o elige una duracion personalizada");

                    if (translated !== value) {
                        text(custom, translated);
                    }
                }
            }
        });

        e.querySelectorAll(".vault_modal").forEach(modal => {
            const dict = {
                "Checkout": "PAGO",
                "Supporter for": "Supporter para",
                "recipients": "destinatarios",
                "months": "meses",
                "(gift)": "(regalo)",
                "(mega gift)": "(regalo masivo)",
                "unit": "unidad",
                "TOTAL": "TOTAL",
                "Your transaction will be completed using Xsolla.": "Tu transaccion se completara usando Xsolla.",
                "Some of Xsolla's payment partners:": "Algunos de los socios de pago de Xsolla:",
                "and many more.": "y muchos mas.",
                "Xsolla is an authorized global distributor of TETR.IO": "Xsolla es un distribuidor global autorizado de TETR.IO",
                "Pay with Xsolla": "Pagar con Xsolla"
            };

            const replaceTextNodes = root => {
                root.childNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        let value = node.textContent;

                        Object.entries(dict).forEach(([original, translated]) => {
                            value = value.replaceAll(original, translated);
                        });

                        if (value !== node.textContent) {
                            node.textContent = value;
                        }

                        return;
                    }

                    if (node.nodeType === Node.ELEMENT_NODE) {
                        replaceTextNodes(node);
                    }
                });
            };

            replaceTextNodes(modal);
        });

        const attrTranslate = (selector, translations) => {
            e.querySelectorAll(selector).forEach(el => {
                const value = el.getAttribute("title");

                if (!value) {
                    return;
                }

                if (!translations) {
                    const key = `${selector}|${value}`;

                    if (!reportedMissingTranslations.has(key)) {
                        reportedMissingTranslations.add(key);
                        console.warn("[TETRIO ES] Diccionario no definido:", value, "| selector:", selector);
                    }

                    return;
                }

                const translated = translations[value] || translations[value.toUpperCase()];

                if (!translated) {
                    if (/^[\d.,+\-/%#\s]+$/.test(value.trim())) {
                        return;
                    }

                    const key = `${selector}|${value}`;

                    if (!reportedMissingTranslations.has(key)) {
                        reportedMissingTranslations.add(key);
                        console.warn("[TETRIO ES] Traduccion no definida:", value, "| selector:", selector);
                    }

                    return;
                }

                if (translated !== value) {
                    attr(el, "title", translated);
                }
            });
        };

        /* DIALOGOS */

        translate(".oob_modal h1", {
            "EXIT TETR.IO?": "¿SALIR DE TETR.IO?",
            "KICKED BY ROOM OWNER": "EXPULSADO POR EL DUENO DE LA SALA",
            "CONNECTION ERROR": "ERROR DE CONEXION"
        });

        translate(".oob_button", {
            "CANCEL": "CANCELAR",
            "EXIT": "SALIR",
            "OK": "ACEPTAR"
        });

        e.querySelectorAll(".tetra_modal_close").forEach(el => {
            const value = el.textContent;

            if (value !== "CERRAR") {
                text(el, "CERRAR");
            }
        });

        e.querySelectorAll("img.flag[title]").forEach(flag => {
            const value = flag.getAttribute("title");
            const translated = countryTranslations[value];

            if (translated && translated !== value) {
                attr(flag, "title", translated);
            }
        });

        e.querySelectorAll(".tetra_distinguishment").forEach(el => {
            const heading = el.querySelector("h1");

            if (heading) {
                const value = heading.textContent.trim();

                const translated = value.replace(
                    /^TETR\.IO WORLD CHAMPION$/,
                    "CAMPEON MUNDIAL DE TETR.IO"
                );

                if (translated !== value) {
                    text(heading, translated);
                }
            }

            const subtitle = el.querySelector("p");

            if (subtitle) {
                const value = subtitle.textContent.trim();

                const translated = value.replace(
                    /^(\d{4}) TETR\.IO WORLD CHAMPIONSHIP$/,
                    "CAMPEONATO MUNDIAL DE TETR.IO $1"
                );

                if (translated !== value) {
                    text(subtitle, translated);
                }
            }
        });
        /* FECHA DE REGISTRO */

        e.querySelectorAll(".tetra_modal h3").forEach(el => {
            el.childNodes.forEach(node => {
                if (node.nodeType !== Node.TEXT_NODE) {
                    return;
                }

                const value = node.textContent;

                const translated = value
                    .replace("JOINED", "SE UNIO HACE")
                    .replace("YEARS AGO", "ANOS")
                    .replace("YEAR AGO", "ANO")
                    .replace("MONTHS AGO", "MESES")
                    .replace("MONTH AGO", "MES")
                    .replace("DAYS AGO", "DIAS")
                    .replace("DAY AGO", "DIA")
                    .replace("MUTUAL FRIENDS", "AMIGOS EN COMUN");

                if (translated !== value) {
                    node.textContent = translated;
                }
            });
        });

        e.querySelectorAll(".tetra_modal h3 span[title]").forEach(el => {
            const title = el.getAttribute("title");

            if (title === "Amount of players who have friended this person") {
                attr(el, "title", "Cantidad de jugadores que han agregado a esta persona como amigo");
            }
        });

        /* NIVEL */

        e.querySelectorAll(".leveltag").forEach(el => {
            const title = el.getAttribute("title");

            if (!title) {
                return;
            }

            const translated = title.replace("% towards next level", "% para el siguiente nivel");

            if (translated !== title) {
                attr(el, "title", translated);
            }
        });

        /* TIEMPO Y PARTIDAS */

        e.querySelectorAll(".tetra_tag_gametime").forEach(el => {
            const title = el.getAttribute("title");
            const translated = "Tiempo total jugado";

            if (title !== translated) {
                attr(el, "title", translated);
            }
        });

        e.querySelectorAll(".tetra_tag_record").forEach(el => {
            const title = el.getAttribute("title");
            const translated = "Partidas online ganadas / partidas online jugadas";

            if (title !== translated) {
                attr(el, "title", translated);
            }
        });

        /* BOTONES DEL PERFIL */

        e.querySelectorAll(".tetra_topbutton").forEach(button => {
            const title = button.getAttribute("title");

            const translatedTitle = {
                "Report user": "Reportar usuario",
                "Block user": "Bloquear usuario",
                "More options...": "Mas opciones...",
                "Gift TETR.IO Supporter": "Regalar TETR.IO Supporter",
                "Send a direct message": "Enviar un mensaje directo",
                "Add as friend": "Agregar como amigo",
                "Unfriend? (click twice)": "Eliminar de amigos? (haz clic dos veces)",
                "Unblock user": "Desbloquear usuario"
            }[title];

            if (translatedTitle && translatedTitle !== title) {
                attr(button, "title", translatedTitle);
            }

            const node = [...button.childNodes].find(node => node.nodeType === Node.TEXT_NODE);

            if (!node) {
                return;
            }

            const translatedText = {
                "Send a direct message": "MENSAJE",
                "Add as friend": "AMIGO",
                "Unblock user": "DESBLOQUEAR"
            }[title];

            if (translatedText && translatedText !== node.textContent) {
                node.textContent = translatedText;
            }
        });

        /* LOGROS */

        translate(".achievement_info_name", achievementTranslations.names);
        translate(".achievement_info_object", achievementTranslations.objects);
        translate(".achievement_info_desc", achievementTranslations.descriptions);

        e.querySelectorAll(".achievement_info_rank").forEach(rank => {
            rank.childNodes.forEach(node => {
                if (node.nodeType !== Node.TEXT_NODE) {
                    return;
                }

                const value = node.textContent;
                const translated = value.replace(/\bof\b/, "de");

                if (translated !== value) {
                    node.textContent = translated;
                }
            });
        });

        attrTranslate(".achievement_info_icons img", {
            ...(achievementTranslations.titles || {}),
            "This achievement grants extra Achievement Rating to those who place in its Top 100 leaderboard.": "Este logro otorga puntuacion de logro adicional a quienes quedan en el Top 100 de su clasificacion.",
            "This achievement is only visible to the worthy.": "Este logro solo es visible para los dignos."
        });

        /* DISTINCIONES */

        translate(".tetra_distinguishment h1", {
            "40 LINES CHAMPION": "CAMPEON DE 40 LINEAS",
            "BLITZ CHAMPION": "CAMPEON DE BLITZ",
            "TETRA LEAGUE CHAMPION": "CAMPEON DE TETRA LEAGUE"
        });

        /* BADGES */

        e.querySelectorAll(".tetra_badge").forEach(badge => {
            const title = badge.getAttribute("title");

            if (!title) {
                return;
            }

            let translated = title;

            badgeTranslations.forEach(([original, replacement]) => {
                translated = translated.replace(original, replacement);
            });

            translated = translated.replace("Achieved on ", "Conseguido el ");
            translated = translated.replace("Awarded for ", "Otorgado por ");

            if (translated !== title) {
                attr(badge, "title", translated);
            }
        });

        /* PERFIL */

        translate(".tetra_modal_bio h1", {
            "ABOUT ME": "SOBRE MI"
        });

        /* BOTONES DE PERFIL / CLASIFICACION */

        e.querySelectorAll(".tetra_modal_jump").forEach(el => {
            const value = el.textContent.trim();

            const translated = {
                "Ǳ VIEW FULL PROFILE": "Ǳ VER PERFIL COMPLETO",
                "Ǳ VIEW FULL LEADERBOARD": "Ǳ VER CLASIFICACION COMPLETA"
            }[value];

            if (translated && translated !== value) {
                text(el, translated);
            }
        });

        /* REGISTROS */

        e.querySelectorAll(".tetra_modal_record").forEach(record => {
            const header = record.querySelector(".tetra_modal_record_header h6");
            const info = record.querySelector("h3");

            if (header) {
                const value = header.textContent.trim();

                const translated = {
                    "TETRA LEAGUE": "LIGA TETRA",
                    "40 LINES": "40 LINEAS",
                    "40 LINEAS": "40 LINEAS",
                    "BLITZ": "BLITZ",
                    "QUICK PLAY": "PARTIDA RAPIDA",
                    "PARTIDA RAPIDA": "PARTIDA RAPIDA",
                    "EXPERT QUICK PLAY": "PARTIDA RAPIDA EXPERTO"
                }[value];

                if (translated && translated !== value) {
                    text(header, translated);
                }
            }

            if (info) {
                info.childNodes.forEach(node => {
                    if (node.nodeType !== Node.TEXT_NODE) {
                        return;
                    }

                    const value = node.textContent;

                    const translated = value
                        .replace(" HOURS", " HORAS")
                        .replace(" HOUR", " HORA")
                        .replace(" MONTHS", " MESES")
                        .replace(" MONTH", " MES")
                        .replace(" DAYS", " DIAS")
                        .replace(" DAY", " DIA")
                        .replace(" ago", " atras")
                        .replace("career best", "mejor marca")
                        .replace("FLOOR", "PISO");

                    if (translated !== value) {
                        node.textContent = translated;
                    }
                });
            }
        });

        /* UNIDADES */

        e.querySelectorAll(".tetra_modal_record span").forEach(span => {
            const value = span.textContent.trim();

            const translated = {
                "HOURS": "HORAS",
                "HOUR": "HORA",
                "MONTHS": "MESES",
                "MONTH": "MES",
                "DAYS": "DIAS",
                "DAY": "DIA",
                "FLOOR": "PISO"
            }[value];

            if (translated && translated !== value) {
                text(span, translated);
            }
        });

        /* TITULOS DE REGISTROS */

        attrTranslate(".tetra_modal_record h5, .tetra_modal_record h3", {
            "This week": "Esta semana",
            "Updates every week": "Se actualiza cada semana",
            "Not this week - player has not played this week": "No esta semana - el jugador no ha jugado esta semana"
        });

        /* SUPPORTER */

        attrTranslate(".supporter_badge", {
            "This person is supporting TETR.IO ♥": "Esta persona apoya a TETR.IO ♥"
        });

        /* USUARIO ANONIMO */

        const anonymousWarning = e.querySelector(".tetra_modal_warning");

        if (anonymousWarning) {
            const value = anonymousWarning.textContent.trim();
            const translated = "este usuario esta jugando anonimamente";

            if (value !== translated) {
                text(anonymousWarning, translated);
            }
        }

        /* ELIMINAR CUENTA */

        e.querySelectorAll(".oob_modal h1").forEach(h1 => {
            const value = h1.textContent.trim();

            if (value === "DELETE YOUR ACCOUNT?") {
                text(h1, "¿ELIMINAR TU CUENTA?");
            }
        });

        e.querySelectorAll(".crash_modal").forEach(dialog => {
            const title = dialog.querySelector("h1");

            if (!title || title.textContent.trim() !== "¿ELIMINAR TU CUENTA?") {
                return;
            }

            const paragraphs = dialog.querySelectorAll(":scope > p");

            if (paragraphs[0]) {
                paragraphs[0].childNodes.forEach(node => {
                    if (node.nodeType !== Node.TEXT_NODE) {
                        return;
                    }

                    const value = node.textContent;

                    const translated = value
                        .replace("delete your account", "eliminar tu cuenta")
                        .replace("and all attached data?", "y todos los datos asociados?");

                    if (translated !== value) {
                        node.textContent = translated;
                    }
                });
            }

            const modalAlso = dialog.querySelector(":scope > p.modal_also");

            if (modalAlso && modalAlso.textContent.trim() === "this cannot be undone.") {
                text(modalAlso, "esto no se puede deshacer.");
            }

            dialog.querySelectorAll(".oob_button").forEach(button => {
                const value = button.textContent.trim();

                if (value === "DELETE!") {
                    text(button, "¡ELIMINAR!");
                }
            });
        });

        e.querySelectorAll(".crash_modal").forEach(dialog => {
            const title = dialog.querySelector("h1");

            if (!title || title.textContent.trim() !== "¿ELIMINAR TU CUENTA?") {
                return;
            }

            const paragraphs = dialog.querySelectorAll(":scope > p");

            if (paragraphs[0]) {
                paragraphs[0].childNodes.forEach(node => {
                    if (node.nodeType !== Node.TEXT_NODE) {
                        return;
                    }

                    const value = node.textContent;

                    const translated = value
                        .replace("no seriously, are you sure you want to delete", "no, en serio, ¿estas seguro de que quieres eliminar")
                        .replace("and EVERYTHING INVOLVED, like your replays, badges, XP, rating, etc?", "y TODO LO RELACIONADO, como tus repeticiones, insignias, XP, puntuacion, etc.?");

                    if (translated !== value) {
                        node.textContent = translated;
                    }
                });
            }

            const modalAlso = dialog.querySelector(":scope > p.modal_also");

            if (modalAlso && modalAlso.textContent.trim() === "you can never get it back!!!") {
                text(modalAlso, "¡¡¡nunca podras recuperarla!!!");
            }

            dialog.querySelectorAll(".oob_button").forEach(button => {
                const value = button.textContent.trim();

                if (value === "DELETE!!!") {
                    text(button, "¡ELIMINAR!");
                }
            });
        });

        /* ELIMINANDO SKYLUR */

        e.querySelectorAll(".oob_modal").forEach(dialog => {
            const title = dialog.querySelector("h1");

            if (!title || title.textContent.trim() !== "DELETING SKYLUR") {
                return;
            }

            text(title, "ELIMINANDO SKYLUR");

            const paragraph = dialog.querySelector("p");

            if (paragraph) {
                paragraph.childNodes.forEach(node => {
                    if (node.nodeType !== Node.TEXT_NODE) {
                        return;
                    }

                    const value = node.textContent;
                    const translated = value.replace("please type your username", "escribe tu nombre de usuario");

                    if (translated !== value) {
                        node.textContent = translated;
                    }
                });
            }

            const input = dialog.querySelector("#account_delete");

            if (input) {
                attr(input, "placeholder", "TU NOMBRE DE USUARIO");
            }

            const submit = dialog.querySelector("#account_delete_submit");

            if (submit && submit.textContent.trim() === "SUBMIT") {
                text(submit, "ENVIAR");
            }
        });
    },
    "tetra_achievement_data": (e) => {
        const headings = {
            "GENERAL": "GENERAL",
            "SOLO": "SOLO",
            "TETRA LEAGUE": "TETRA LEAGUE",
            "QUICK PLAY": "PARTIDA RAPIDA"
        };

        e.querySelectorAll("h1").forEach(h1 => {
            const value = h1.textContent.trim();
            const translated = headings[value];

            if (translated && translated !== value) {
                text(h1, translated);
            }
        });

        e.querySelectorAll(".achievement_info_name").forEach(el => {
            const value = el.textContent.trim();
            const translated = achievementTranslations.names[value];

            if (translated && translated !== value) {
                text(el, translated);
            }
        });

        e.querySelectorAll(".achievement_info_object").forEach(el => {
            const value = el.textContent.trim();
            const translated = achievementTranslations.objects[value];

            if (translated && translated !== value) {
                text(el, translated);
            }
        });

        e.querySelectorAll(".achievement_info_desc").forEach(el => {
            const value = el.textContent.trim();
            const translated = achievementTranslations.descriptions[value];

            if (translated && translated !== value) {
                text(el, translated);
            }
        });

        e.querySelectorAll(".achievement_info_icons img[title]").forEach(img => {
            const value = img.getAttribute("title");
            const translated = achievementTranslations.titles[value];

            if (translated && translated !== value) {
                attr(img, "title", translated);
            }
        });

        e.querySelectorAll(".achievement_info_value span").forEach(span => {
            const value = span.textContent.trim();

            if (value === "FLOOR") {
                text(span, "PISO");
            }
        });
    },
    "multi_menu": (e) => {
        const input = e.querySelector("#multi_join");

        if (input) {
            attr(input, "placeholder", "introduce el id o url de la sala y pulsa enter...");
        }
    },
    "me_level": (e) => {
        const translateTitle = () => {
            const title = e.getAttribute("title");

            if (
                title &&
                title.includes("% towards next level")
            ) {
                e.setAttribute(
                    "title",
                    title.replace(
                        "% towards next level",
                        "% para el siguiente nivel"
                    )
                );
            }
        };

        translateTitle();

        if (!e.__meLevelObserver) {
            const observer = new MutationObserver(() => {
                translateTitle();
            });

            observer.observe(e, {
                attributes: true,
                attributeFilter: ["title"]
            });

            e.__meLevelObserver = observer;
        }
    },
    "tetra_news_content": (e) => {
        e.querySelectorAll(".tetra_news_item").forEach(item => {

            const username = item.querySelector(".tetra_pop");
            const replay = item.querySelector(".replay_pop");

            /* TEXTO ALREDEDOR DEL USUARIO */

            if (username) {
                let node = username.nextSibling;

                while (node) {
                    if (node.nodeType === Node.TEXT_NODE) {
                        const value = node.textContent;

                        const translated = value
                            .replace(
                                " reached #",
                                " alcanzo el #"
                            )
                            .replace(
                                " in EXPERT QUICK PLAY with an altitude of ",
                                " en PARTIDA RAPIDA EXPERTO con una altitud de "
                            )
                            .replace(
                                " in QUICK PLAY with an altitude of ",
                                " en PARTIDA RAPIDA con una altitud de "
                            )
                            .replace(
                                " in BLITZ with a score of ",
                                " en BLITZ con una puntuacion de "
                            )
                            .replace(
                                " played on ",
                                " jugaron el "
                            )
                            .replace(
                                " received the ",
                                " recibio la insignia "
                            )
                            .replace(
                                " badge",
                                ""
                            );

                        if (translated !== value) {
                            node.textContent = translated;
                        }
                    }

                    node = node.nextSibling;
                }
            }

            /* CASO VERSUS */

            item.childNodes.forEach(node => {
                if (node.nodeType !== Node.TEXT_NODE) {
                    return;
                }

                const value = node.textContent;

                const translated = value.replace(
                    " versus ",
                    " contra "
                );

                if (translated !== value) {
                    node.textContent = translated;
                }
            });

            /* TIEMPO */

            const timestamp = item.querySelector(".tetra_news_ts");

            if (timestamp) {
                const value = timestamp.textContent.trim();

                const translated = value
                    .replace("days ago", "dias atras")
                    .replace("day ago", "dia atras")
                    .replace("hours ago", "horas atras")
                    .replace("hour ago", "hora atras")
                    .replace("minutes ago", "minutos atras")
                    .replace("minute ago", "minuto atras");

                if (translated !== value) {
                    text(timestamp, translated);
                }
            }
        });
    },
    "room_count": (e) => {
        const styleId = "room-count-translation";

        if (document.getElementById(styleId)) {
            return;
        }

        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
        .player_count.room_count::after {
            content: "salas";
            margin-left: .2em;
        }
    `;

        document.head.appendChild(style);
    },
    "room_players": (e) => {
        const dict = {
            "HOST": "ANFITRION",
            "OBSERVER": "ESPECTADOR",
            "Games won / Games played": "Partidas ganadas / partidas jugadas",
            "Win streak": "Racha de victorias"
        };

        e.querySelectorAll(".host, .observer").forEach(el => translateByDict(el, dict));
        e.querySelectorAll(".precord, .pstreak").forEach(el => translateAttrByDict(el, "title", dict));

        e.querySelectorAll(".leveltag").forEach(el => {
            const title = el.getAttribute("title");

            if (!title) {
                return;
            }

            const translated = title.replace(
                "% towards next level",
                "% para el siguiente nivel"
            );

            if (translated !== title) {
                attr(el, "title", translated);
            }
        });
    },
}

