/* =========================================
   LEVEL 7 FULLSCREEN
========================================= */


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


/* =========================================
   BUTTON
========================================= */

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


/* =========================================
   ENABLE LAYOUT
========================================= */

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


/* =========================================
   DISABLE LAYOUT
========================================= */

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


/* =========================================
   ENTER BROWSER FULLSCREEN
========================================= */

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


/* =========================================
   EXIT BROWSER FULLSCREEN
========================================= */

async function exitBrowserFullscreen() {

    if (
        document.fullscreenElement
        &&
        document.exitFullscreen
    ) {

        await document.exitFullscreen();


        return;

    }


    if (
        document.webkitFullscreenElement
        &&
        document.webkitExitFullscreen
    ) {

        document.webkitExitFullscreen();

    }

}


/* =========================================
   ENTER
========================================= */

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


/* =========================================
   EXIT
========================================= */

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


/* =========================================
   TOGGLE
========================================= */

async function toggleFullscreen() {

    if (
        fullscreenMode
    ) {

        await exitFullscreen();


        return;

    }


    await enterFullscreen();

}


/* =========================================
   BUTTON CLICK
========================================= */

fullscreenButton.addEventListener(
    "click",

    async event => {

        event.preventDefault();

        event.stopPropagation();


        await toggleFullscreen();

    }
);


/* =========================================
   ESC
========================================= */

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


/* =========================================
   SAFARI
========================================= */

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


/* =========================================
   START STATE
========================================= */

updateFullscreenButton();
