function sys_guide(e) {
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
        text(paragraphs[1], "pasa el cursor para mas informacion!");
    }

    if (paragraphs[2]) {
        text(paragraphs[2], "tus teclas configuradas actualmente son:");
    }

    const keyTranslations = [
        "mover la pieza que cae a la izquierda",
        "mover la pieza que cae a la derecha",
        "descenso rapido",
        "descenso instantaneo",
        "rotar en sentido antihorario",
        "rotar en sentido horario",
        "rotar 180",
        "intercambiar pieza en RESERVA"
    ];

    rows.forEach((row, i) => {
        const label = row.querySelector("td:first-child");

        if (label && keyTranslations[i]) {
            text(label, keyTranslations[i]);
        }
    });

    if (paragraphs[3]) {
        text(
            paragraphs[3],
            "puedes cambiar estas y muchas otras opciones en CONFIGURACION. diviertete!"
        );
    }
}

function insiders_upsell(e) {
    const textNodes = [];

    const walker = document.createTreeWalker(
        e,
        NodeFilter.SHOW_TEXT
    );

    let node;
    while (node = walker.nextNode()) {
        if (node.parentElement?.id === "insiders_upsell_hide") continue;
        textNodes.push(node);
    }

    const mainText = textNodes.find(n =>
        n.nodeValue.includes("interested in playtesting")
    );

    if (mainText) {
        mainText.nodeValue =
            "\u00A0— te interesa probar algo nuevo para TETR.IO? (nuevo formulario desde febrero)";
    }

    const link = e.querySelector("a");
    if (link) {
        text(link, "Solicitar ahora");
    }
}

function sigliatrip_message(e, title, paragraphs, footer) {
    const h1 = e.querySelector("h1");
    const ps = e.querySelectorAll("p");
    const h2 = e.querySelector("h2");

    if (h1) h1.textContent = title;

    ps.forEach((p, i) => {
        if (paragraphs[i] !== undefined) {
            p.innerHTML = paragraphs[i];
        }
    });

    if (h2) h2.textContent = footer;
}

function performance_build_info(e) {
    const html = e.innerHTML;

    e.innerHTML = html
        .replace("browser |", "navegador |")
        .replace("low |", "bajo |")
        .replace("compat off |", "compatibilidad desactivada |")
        .replace("gfx ", "graficos ")
        .replace(" | net ", " | red ")
        .replace(" | state ", " | estado ")
        .replace(" | client ", " | cliente ")
        .replace(" | gl ", " | GL ")
        .replace("server: ", "servidor: ");
}

function performance_meter(e, title, suffix) {
    e.querySelector("p").textContent = title;

    const h2 = e.querySelector("h2");
    const span = h2.querySelector("span");

    h2.innerHTML = "";
    h2.appendChild(span);
    h2.appendChild(document.createTextNode(suffix));
}

