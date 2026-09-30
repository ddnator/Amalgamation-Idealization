
/* =========================================
   ELEMENTEN
========================================= */

const fullscreenGame =
    document.getElementById(
        "game"
    );


const fullscreenButton =
    document.getElementById(
        "fullscreen-toggle"
    );


/* =========================================
   STATUS
========================================= */

let bossfightFullscreenMode =
    false;


/* =========================================
   BUTTON TEXT
========================================= */

function updateBossfightFullscreenButton() {

    if (
        !fullscreenButton
    ) {

        return;

    }


    if (
        bossfightFullscreenMode
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


/* =========================================
   FULLSCREEN LAYOUT AAN
========================================= */

function enableBossfightFullscreenLayout() {

    if (
        !fullscreenGame
    ) {

        return;

    }


    bossfightFullscreenMode =
        true;


    fullscreenGame.classList.add(
        "game-fullscreen-mode"
    );


    updateBossfightFullscreenButton();


    /*
        Browser layout opnieuw laten berekenen.
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


/* =========================================
   FULLSCREEN LAYOUT UIT
========================================= */

function disableBossfightFullscreenLayout() {

    if (
        !fullscreenGame
    ) {

        return;

    }


    bossfightFullscreenMode =
        false;


    fullscreenGame.classList.remove(
        "game-fullscreen-mode"
    );


    updateBossfightFullscreenButton();


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
   BROWSER FULLSCREEN AAN
========================================= */

async function enterBossfightBrowserFullscreen() {

    if (
        !fullscreenGame
    ) {

        return;

    }


    /*
        Chrome
        Edge
        Firefox
    */

    if (
        fullscreenGame.requestFullscreen
    ) {

        await fullscreenGame.requestFullscreen();


        return;

    }


    /*
        Safari fallback
    */

    if (
        fullscreenGame.webkitRequestFullscreen
    ) {

        fullscreenGame.webkitRequestFullscreen();

    }

}


/* =========================================
   BROWSER FULLSCREEN UIT
========================================= */

async function exitBossfightBrowserFullscreen() {

    /*
        Chrome
        Edge
        Firefox
    */

    if (
        document.fullscreenElement
        &&
        document.exitFullscreen
    ) {

        await document.exitFullscreen();


        return;

    }


    /*
        Safari fallback
    */

    if (
        document.webkitFullscreenElement
        &&
        document.webkitExitFullscreen
    ) {

        document.webkitExitFullscreen();

    }

}


/* =========================================
   ENTER FULLSCREEN
========================================= */

async function enterBossfightFullscreen() {

    /*
        Eerst interne layout aanpassen.

        Daardoor verdwijnt de TV meteen.
    */

    enableBossfightFullscreenLayout();


    try {

        await enterBossfightBrowserFullscreen();

    }

    catch (
        error
    ) {

        /*
            Sommige browsers kunnen echte
            browser-fullscreen blokkeren.

            In dat geval blijft de interne
            fullscreen-layout wel actief.
        */

        console.warn(
            "Browser fullscreen kon niet gestart worden:",
            error
        );

    }

}


/* =========================================
   EXIT FULLSCREEN
========================================= */

async function exitBossfightFullscreen() {

    /*
        Eerst normale monitor-layout terug.
    */

    disableBossfightFullscreenLayout();


    try {

        await exitBossfightBrowserFullscreen();

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

async function toggleBossfightFullscreen() {

    if (
        bossfightFullscreenMode
    ) {

        await exitBossfightFullscreen();

    }

    else {

        await enterBossfightFullscreen();

    }

}


/* =========================================
   BUTTON CLICK
========================================= */

fullscreenButton?.addEventListener(
    "click",

    async event => {

        /*
            Niet per ongeluk bossfight
            click-events activeren.
        */

        event.preventDefault();

        event.stopPropagation();


        await toggleBossfightFullscreen();

    }
);


/* =========================================
   FULLSCREEN CHANGE

   Wanneer gebruiker ESC indrukt,
   verlaat de browser fullscreen zelf.

   Dan zetten wij de monitor ook terug.
========================================= */

document.addEventListener(
    "fullscreenchange",

    () => {

        if (
            !document.fullscreenElement
        ) {

            disableBossfightFullscreenLayout();

        }

    }
);


/* =========================================
   SAFARI FULLSCREEN CHANGE
========================================= */

document.addEventListener(
    "webkitfullscreenchange",

    () => {

        if (
            !document.webkitFullscreenElement
        ) {

            disableBossfightFullscreenLayout();

        }

    }
);


/* =========================================
   INITIAL STATE
========================================= */

updateBossfightFullscreenButton();

