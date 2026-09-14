/* ======================================
============= OBSERVADOR ================
====================================== */

const translatedState = new WeakMap();

function translateElement(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        return;
    }

    const translator = translations[element.id];

    if (!translator) {
        return;
    }

    const currentHTML = element.innerHTML;

    if (translatedState.get(element) === currentHTML) {
        return;
    }

    translator(element);

    translatedState.set(element, element.innerHTML);
}

function translateExistingElements() {
    document.querySelectorAll("[id]").forEach(translateElement);
}

function startTranslationObserver() {
    if (!document.body) {
        setTimeout(startTranslationObserver, 50);
        return;
    }

    let translating = false;

    translateExistingElements();

    const observer = new MutationObserver((mutations) => {
        if (translating) {
            return;
        }

        const elementsToTranslate = new Set();

        for (const mutation of mutations) {

            // Elementos nuevos
            if (mutation.type === "childList") {

                for (const node of mutation.addedNodes) {
                    if (node.nodeType !== Node.ELEMENT_NODE) {
                        if (
                            node.matches?.(".globalshouts") ||
                            node.matches?.(".globalshouts .shout") ||
                            node.querySelector?.(".globalshouts .shout")
                        ) {
                            translateGlobalShouts();
                        }
                        continue;
                    }

                    if (node.id && translations[node.id]) {
                        elementsToTranslate.add(node);
                    }

                    node.querySelectorAll("[id]").forEach((element) => {
                        if (translations[element.id]) {
                            elementsToTranslate.add(element);
                        }
                    });

                    const dialogs = node.closest("#dialogs");
                    if (dialogs) {
                        elementsToTranslate.add(dialogs);
                    }
                    const leagueChat = node.closest("#league_chat_container");
                    if (leagueChat) {
                        elementsToTranslate.add(leagueChat);
                    }
                    const notifications = node.closest("#notifications");
                    if (notifications) {
                        elementsToTranslate.add(notifications);
                    }

                    const matchmaking = node.closest("#enter_matchmaking");
                    if (matchmaking) {
                        elementsToTranslate.add(matchmaking);
                    }

                }

                const target = mutation.target;

                if (
                    target &&
                    target.nodeType === Node.ELEMENT_NODE
                ) {
                    if (
                        target.id &&
                        translations[target.id]
                    ) {
                        elementsToTranslate.add(target);
                    }

                    let parent = target;

                    while (parent) {
                        if (
                            parent.id &&
                            translations[parent.id]
                        ) {
                            elementsToTranslate.add(parent);
                            break;
                        }

                        parent = parent.parentElement;
                    }

                    const dialogs = target.closest("#dialogs");
                    if (dialogs) {
                        elementsToTranslate.add(dialogs);
                    }

                    const notifications = target.closest("#notifications");
                    if (notifications) {
                        elementsToTranslate.add(notifications);
                    }

                    const matchmaking = target.closest("#enter_matchmaking");
                    if (matchmaking) {
                        elementsToTranslate.add(matchmaking);
                    }

                    const leagueChat = target.closest("#league_chat_container");
                    if (leagueChat) {
                        elementsToTranslate.add(leagueChat);
                    }
                }
            }

            // Cambio de texto
            if (mutation.type === "characterData") {
                const shout = mutation.target.parentElement?.closest(".globalshouts .shout");

                if (shout) {
                    translateByDict(shout, GLOBAL_SHOUTS);
                }

                let parent = mutation.target.parentElement;

                while (parent) {

                    if (
                        parent.id &&
                        translations[parent.id]
                    ) {
                        elementsToTranslate.add(parent);
                        break;
                    }

                    parent = parent.parentElement;
                }

                const matchmaking =
                    mutation.target.parentElement?.closest("#enter_matchmaking");

                if (matchmaking) {
                    elementsToTranslate.add(matchmaking);
                }

                const dialogs =
                    mutation.target.parentElement?.closest("#dialogs");

                if (dialogs) {
                    elementsToTranslate.add(dialogs);
                }

                const notifications =
                    mutation.target.parentElement?.closest("#notifications");

                if (notifications) {
                    elementsToTranslate.add(notifications);
                }

                const leagueChat =
                    mutation.target.parentElement?.closest("#league_chat_container");

                if (leagueChat) {
                    elementsToTranslate.add(leagueChat);
                }
            }

            // Cambio de atributos
            if (mutation.type === "attributes") {
                const target = mutation.target;

                if (
                    target &&
                    target.nodeType === Node.ELEMENT_NODE &&
                    target.id &&
                    translations[target.id]
                ) {
                    elementsToTranslate.add(target);
                }
            }
        }

        if (elementsToTranslate.size === 0) {
            return;
        }

        translating = true;

        try {
            elementsToTranslate.forEach((element) => {
                translateElement(element);
            });
        } finally {
            translating = false;
        }
    });

    const globalShoutObserver = new MutationObserver(() => {
        document.querySelectorAll(".globalshouts .shout").forEach(shout => translateByDict(shout, GLOBAL_SHOUTS));
    });
    globalShoutObserver.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ["title"]
    });

}

startTranslationObserver();

