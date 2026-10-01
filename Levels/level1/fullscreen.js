/* =========================================================
   LEVEL 1 FULLSCREEN

   NORMAL:
   - monitor zichtbaar
   - dialogue buiten monitor

   FULLSCREEN:
   - browser fullscreen
   - monitor overlay verborgen
   - scene vult bovenste gedeelte
   - dialogue blijft zichtbaar onderaan
========================================================= */


/* =========================================================
   ELEMENTEN
========================================================= */

const game =
    document.getElementById(
        "game"
    );


const fullscreenButton =
    document.getElementById(
        "fullscreen-toggle"
    );


/* =========================================================
   STATUS
========================================================= */

let fullscreenMode =
    false;


/* =========================================================
   BUTTON TEKST
========================================================= */

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
   ENTER GAME FULLSCREEN LAYOUT
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


    /*
        Hotspot code rekent op basis van
        getBoundingClientRect().

        Resize event zorgt ervoor dat alle andere
        eventuele positioneringen ook opnieuw berekend worden.
    */

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
   EXIT GAME FULLSCREEN LAYOUT
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
   BROWSER FULLSCREEN IN
========================================================= */

async function enterBrowserFullscreen() {

    if (
        !game
    ) {

        return;

    }


    /*
        Normale moderne browsers.
    */

    if (
        game.requestFullscreen
    ) {

        await game.requestFullscreen();


        return;

    }


    /*
        Safari fallback.
    */

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


    /*
        Safari fallback.
    */

    if (
        document.webkitFullscreenElement &&
        document.webkitExitFullscreen
    ) {

        document.webkitExitFullscreen();

    }

}


/* =========================================================
   ENTER FULLSCREEN
========================================================= */

async function enterFullscreen() {

    /*
        Eerst layout veranderen.

        Daardoor ziet de transition meteen goed uit.
    */

    enableFullscreenLayout();


    try {

        await enterBrowserFullscreen();

    }

    catch (
        error
    ) {

        /*
            Sommige browsers kunnen browser fullscreen
            blokkeren.

            In dat geval blijft onze fullscreen-layout
            alsnog gewoon werken.
        */

        console.warn(
            "Browser fullscreen kon niet worden gestart:",
            error
        );

    }

}


/* =========================================================
   EXIT FULLSCREEN
========================================================= */

async function exitFullscreen() {

    disableFullscreenLayout();


    try {

        await exitBrowserFullscreen();

    }

    catch (
        error
    ) {

        console.warn(
            "Browser fullscreen kon niet worden afgesloten:",
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


/* =========================================================
   BUTTON CLICK
========================================================= */

fullscreenButton?.addEventListener(
    "click",

    async event => {

        event.preventDefault();


        event.stopPropagation();


        await toggleFullscreen();

    }
);


/* =========================================================
   BELANGRIJK:
   ESC WORDT DOOR DE BROWSER GEBRUIKT

   Als gebruiker ESC indrukt verlaat de browser fullscreen.

   fullscreenchange detecteert dat en zet vervolgens ook
   onze monitor-layout terug.
========================================================= */

document.addEventListener(
    "fullscreenchange",

    () => {

        /*
            Geen browser fullscreen-element meer.

            Dan moet de normale monitor terugkomen.
        */

        if (
            !document.fullscreenElement
        ) {

            disableFullscreenLayout();

        }

    }
);


/* =========================================================
   SAFARI FULLSCREEN CHANGE
========================================================= */

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


/* =========================================================
   INITIAL STATE
========================================================= */

updateFullscreenButton();


/* =========================================================
   GLOBALE TEST FUNCTIES

   Browserconsole:

   enterLevel1Fullscreen()
   exitLevel1Fullscreen()
   toggleLevel1Fullscreen()
========================================================= */

window.enterLevel1Fullscreen =
    enterFullscreen;


window.exitLevel1Fullscreen =
    exitFullscreen;


window.toggleLevel1Fullscreen =
    toggleFullscreen;