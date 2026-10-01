const game =
    document.getElementById(
        "game"
    );

const fullscreenButton =
    document.getElementById(
        "fullscreen-toggle"
    );

let fullscreenMode =
    false;

function updateFullscreenButton() {

    if (
        !fullscreenButton
    ) {
        return;
    }

    if (
        fullscreenMode
    ) {

        fullscreenButton.textContent =
            "✕ EXIT FULLSCREEN";

        fullscreenButton.setAttribute(
            "title",
            "Exit fullscreen"
        );

        fullscreenButton.setAttribute(
            "aria-label",
            "Exit fullscreen"
        );

        return;
    }

    fullscreenButton.textContent =
        "⛶ FULLSCREEN";

    fullscreenButton.setAttribute(
        "title",
        "Fullscreen"
    );

    fullscreenButton.setAttribute(
        "aria-label",
        "Enter fullscreen"
    );
}

function enableFullscreenLayout() {

    fullscreenMode =
        true;

    game.classList.add(
        "game-fullscreen-mode"
    );

    updateFullscreenButton();

    requestAnimationFrame(
        () => {

            window.dispatchEvent(
                new Event(
                    "resize"
                )
            );
        }
    );
}

function disableFullscreenLayout() {

    fullscreenMode =
        false;

    game.classList.remove(
        "game-fullscreen-mode"
    );

    updateFullscreenButton();

    requestAnimationFrame(
        () => {

            window.dispatchEvent(
                new Event(
                    "resize"
                )
            );
        }
    );
}

async function enterBrowserFullscreen() {

    if (
        game.requestFullscreen
    ) {

        await game.requestFullscreen();

        return;
    }

    if (
        game.webkitRequestFullscreen
    ) {

        game.webkitRequestFullscreen();
    }
}

async function exitBrowserFullscreen() {

    if (
        document.fullscreenElement &&
        document.exitFullscreen
    ) {

        await document.exitFullscreen();

        return;
    }

    if (
        document.webkitFullscreenElement &&
        document.webkitExitFullscreen
    ) {

        document.webkitExitFullscreen();
    }
}

async function enterFullscreen() {

    enableFullscreenLayout();

    try {

        await enterBrowserFullscreen();

    }
    catch (
        error
    ) {

        console.warn(
            "Browser fullscreen kon niet gestart worden:",
            error
        );
    }
}

async function exitFullscreen() {

    disableFullscreenLayout();

    try {

        await exitBrowserFullscreen();

    }
    catch (
        error
    ) {

        console.warn(
            "Browser fullscreen kon niet afgesloten worden:",
            error
        );
    }
}

async function toggleFullscreen() {

    if (
        fullscreenMode
    ) {

        await exitFullscreen();

        return;
    }

    await enterFullscreen();
}

fullscreenButton.addEventListener(
    "click",
    async event => {

        event.preventDefault();

        event.stopPropagation();

        await toggleFullscreen();
    }
);

document.addEventListener(
    "fullscreenchange",
    () => {

        if (
            !document.fullscreenElement
        ) {

            disableFullscreenLayout();
        }
    }
);

document.addEventListener(
    "webkitfullscreenchange",
    () => {

        if (
            !document.webkitFullscreenElement
        ) {

            disableFullscreenLayout();
        }
    }
);

updateFullscreenButton();

window.enterLevel2Fullscreen =
    enterFullscreen;

window.exitLevel2Fullscreen =
    exitFullscreen;

window.toggleLevel2Fullscreen =
    toggleFullscreen;