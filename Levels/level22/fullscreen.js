
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

    }
    else {

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
}


/* =========================================================
   LAYOUT AAN
========================================================= */

function enableFullscreenLayout() {

    if (
        !game
    ) {
        return;
    }

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


/* =========================================================
   LAYOUT UIT
========================================================= */

function disableFullscreenLayout() {

    if (
        !game
    ) {
        return;
    }

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


/* =========================================================
   BROWSER FULLSCREEN AAN
========================================================= */

async function enterBrowserFullscreen() {

    if (
        !game
    ) {
        return;
    }

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


/* =========================================================
   BROWSER FULLSCREEN UIT
========================================================= */

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


/* =========================================================
   ENTER
========================================================= */

async function enterFullscreen() {

    enableFullscreenLayout();

    try {
        await enterBrowserFullscreen();
    }
    catch (error) {

        console.warn(
            "Browser fullscreen kon niet gestart worden:",
            error
        );
    }
}


/* =========================================================
   EXIT
========================================================= */

async function exitFullscreen() {

    disableFullscreenLayout();

    try {
        await exitBrowserFullscreen();
    }
    catch (error) {

        console.warn(
            "Browser fullscreen kon niet afgesloten worden:",
            error
        );
    }
}


/* =========================================================
   TOGGLE
========================================================= */

async function toggleFullscreen() {

    if (
        fullscreenMode
    ) {
        await exitFullscreen();
    }
    else {
        await enterFullscreen();
    }
}


fullscreenButton?.addEventListener(
    "click",
    async event => {

        event.preventDefault();
        event.stopPropagation();

        await toggleFullscreen();
    }
);


/* =========================================================
   ESC / BROWSER EXIT
========================================================= */

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
