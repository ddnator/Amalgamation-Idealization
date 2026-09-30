import {
    setScene,
    showBreakfastOverlay,
    showNormalBar
} from "./scene.js";

import {
    startDialogue
} from "./dialogue.js";

import {
    gameState
} from "./gameState.js";

import {
    minigameScreen,
    reactorMinigameFrame
} from "./element.js";


/* =========================================
   ACTIONS
========================================= */


export function runAction(action) {

    /* =====================================
       CLOSE
    ====================================== */

    if (action === "close") {

        closeDialogue();

        return;
    }


    /* =====================================
       LEAVE BREAKFAST
    ====================================== */

    if (action === "leave_breakfast") {

        showBreakfastOverlay(
            null
        );

        setScene(
            "outside"
        );

        startDialogue(
            "outside_caravan"
        );

        return;
    }


    /* =====================================
       BACK FROM BREAKFAST
    ====================================== */

    if (action === "back_breakfast") {

        showBreakfastOverlay(
            null
        );

        closeDialogue();

        return;
    }


    /* =====================================
       OUTSIDE HOME
    ====================================== */

    if (action === "action_Outside") {

        setScene(
            "outside"
        );

        startDialogue(
            "outside_caravan"
        );

        return;
    }


    /* =====================================
       WALK TO WORK
    ====================================== */

    if (action === "action_go_to_work") {

        setScene(
            "walkingToWorkDay"
        );

        startDialogue(
            "walk_to_work"
        );

        return;
    }


    /* =====================================
       OUTSIDE WORK
    ====================================== */

    if (action === "action_OutsideWorkDay") {

        setScene(
            "OutsideWorkDay"
        );

        startDialogue(
            "winston_nuclear_powerplant"
        );

        return;
    }


    /* =====================================
       ARRIVE AT WORK

       BELANGRIJK:

       In jouw bestaande dialogue.js staat bij:

       WORK -> Continue

       action: "action_work"

       Dat hoeft niet veranderd te worden.

       Eerste keer:
       OutsideWorkDay -> Work

       Tweede keer:
       Work dialogue -> Continue

       Dan sluiten we alleen de dialogue.
    ====================================== */

    if (action === "action_work") {

        /*
            Dit is de Continue-knop van de
            Work intro.

            We zijn al op Work, dus NIET
            opnieuw dezelfde dialogue starten.
        */

        if (
            gameState.currentScene === "work" &&
            gameState.currentNodeId === "work" &&
            gameState.dialogueActive
        ) {

            closeDialogue();

            return;
        }


        /*
            Eerste keer dat speler het gebouw
            binnenkomt.
        */

        setScene(
            "work"
        );

        startDialogue(
            "work"
        );

        return;
    }


    /* =====================================
       JIM 1
    ====================================== */

    if (action === "action_jimOne") {

        setScene(
            "jim1"
        );

        startDialogue(
            "jim_intro"
        );

        return;
    }


    /* =====================================
       JIM 2
    ====================================== */

    if (action === "action_jimTwo") {

        setScene(
            "jim2"
        );

        startDialogue(
            "jim_upgrade"
        );

        return;
    }


    /* =====================================
       JIM 3
    ====================================== */

    if (action === "action_jimThree") {

        setScene(
            "jim3"
        );

        startDialogue(
            "jim_bad_sleep"
        );

        return;
    }


    /* =====================================
       JIM 4
    ====================================== */

    if (action === "action_jimFour") {

        setScene(
            "jim4"
        );

        startDialogue(
            "jim_lisa"
        );

        return;
    }


    /* =====================================
       LEAVE JIM
    ====================================== */

    if (action === "action_leave_jim") {

        closeDialogue();

        setScene(
            "work"
        );

        return;
    }

    if (
        action === "close"
    ) {

        closeDialogue();

        setScene("work");

        return;
    }


    /* =====================================
       START WORK / REACTOR
    ====================================== */

    if (action === "action_start_minigame") {

        startMinigame();

        return;
    }


    /* =====================================
       LEVEL 2
    ====================================== */

    if (action === "level2") {

        window.location.href = "../level2/level2.php";

        return;
    }


    /* =====================================
       LEVEL 3
    ====================================== */

    if (action === "level3") {

        window.location.href = "../level3/level3.php";


        return;
    }


    console.warn(
        "Unknown Level 1 action:",
        action
    );
}


/* =========================================
   CLOSE DIALOGUE
========================================= */

export function closeDialogue() {

    gameState.pendingOption =
        null;


    gameState.waitingForContinue =
        false;


    gameState.inputLocked =
        false;

    showBreakfastOverlay(null);

    showNormalBar();


    /* =====================================
       BOSS CLOSE-UP

       Als speler bij boss op Leave klikt,
       terug naar normale Work scene.
    ====================================== */

    if (
        sceneBeforeClose === "boss"
    ) {

        setScene(
            "work"
        );

    }
}


/* =========================================
   START REACTOR MINIGAME
========================================= */

function startMinigame() {
    console.log('ge')
    

    /* =====================================
       ELEMENT CHECK
    ====================================== */

    if (
        !minigameScreen
    ) {

        console.error(
            "#minigame-screen bestaat niet."
        );

        return;
    }


    if (
        !reactorMinigameFrame
    ) {

        console.error(
            "#reactor-minigame-frame bestaat niet."
        );

        return;
    }


    /* =====================================
       JUISTE REACTOR FILE

       action.js:
       /Levels/level1/action.js

       minigame:
       /minigame_reactor1/minigame1.php
    ====================================== */

    const reactorUrl =
        new URL(
            "../../minigame_reactor1/minigame1.php",
            import.meta.url
        );


    /*
        Browsercache voorkomen.
    */

    reactorUrl.searchParams.set(
        "run",
        Date.now().toString()
    );


    reactorMinigameFrame.src =
        reactorUrl.href;


    minigameScreen.classList.remove(
        "hidden"
    );
}


/* =========================================
   MINIGAME COMPLETE
========================================= */

function finishLevel1Minigame() {

    /*
        Niet twee keer afronden.
    */

    if (
        gameState.minigameCompleted
    ) {

        return;
    }


    gameState.minigameCompleted =
        true;


    /* =====================================
       MINIGAME WEG
    ====================================== */

    if (
        minigameScreen
    ) {

        minigameScreen.classList.add(
            "hidden"
        );

    }


    /* =====================================
       IFRAME STOPPEN
    ====================================== */

    if (
        reactorMinigameFrame
    ) {

        reactorMinigameFrame.src =
            "about:blank";

    }


    /* =====================================
       TERUG NAAR WORK
    ====================================== */

    setScene(
        "work"
    );


    /* =====================================
       START WORK NIET NOGMAALS
    ====================================== */

    const workHotspot =
        document.getElementById(
            "hotspot-work"
        );


    const workOverlay =
        document.querySelector(
            ".workOverlay"
        );


    if (
        workHotspot
    ) {

        workHotspot.classList.add(
            "hidden"
        );

    }


    if (
        workOverlay
    ) {

        workOverlay.style.opacity =
            "0";

    }


    /* =====================================
       BOTTOM TEXT
    ====================================== */

    const barHint =
        document.getElementById(
            "bar-hint"
        );


    if (
        barHint
    ) {

        barHint.textContent =
            "WORK FINISHED.";

    }
}


/* =========================================
   TEST FUNCTION
========================================= */

window.finishLevel1Minigame =
    finishLevel1Minigame;


/* =========================================
   REACTOR COMPLETE MESSAGE
========================================= */

window.addEventListener(
    "message",

    event => {

        /*
            Alleen berichten van dezelfde website.
        */

        if (
            event.origin !==
            window.location.origin
        ) {

            return;
        }


        if (
            event.data &&
            event.data.type ===
            "level1-minigame-complete"
        ) {

            finishLevel1Minigame();

        }

    }
);


/* =========================================
   LEVEL NAVIGATION
========================================= */

function goToLevel(
    levelNumber
) {

    const levelUrl =
        new URL(
            `../level${levelNumber}/level${levelNumber}.php`,
            import.meta.url
        );


    window.location.href =
        levelUrl.href;
}