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
    reactorMinigameFrame,
    hotspotWork,
    barHint
} from "./element.js";


/* =========================================
   ACTIONS
========================================= */

export function runAction(action) {

    /* =====================================
       CLOSE
    ====================================== */

    if (
        action === "close"
    ) {

        closeDialogue();

        return;
    }


    /* =====================================
       LEAVE BREAKFAST
    ====================================== */

    if (
        action === "leave_breakfast"
    ) {

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

    if (
        action === "back_breakfast"
    ) {

        showBreakfastOverlay(
            null
        );


        closeDialogue();


        return;
    }


    /* =====================================
       OUTSIDE HOME
    ====================================== */

    if (
        action === "action_Outside"
    ) {

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
       WALK TO WORK
    ====================================== */

    if (
        action === "action_go_to_work"
    ) {

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

    if (
        action === "action_OutsideWorkDay"
    ) {

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

       In je huidige dialogue.js gebruikt
       de Continue-knop van de work intro
       OOK action_work.

       Daarom:

       Eerste action_work:
       -> naar Work
       -> intro tonen

       Tweede action_work:
       -> Continue
       -> dialogue sluiten
    ====================================== */

    if (
        action === "action_work"
    ) {

        /*
            We zijn al op Work en de work-intro
            is zichtbaar.

            Dit is dus de Continue-knop.
        */

        if (
            gameState.currentScene ===
                "work" &&

            gameState.currentNodeId ===
                "work" &&

            gameState.dialogueActive
        ) {

            closeDialogue();


            return;
        }


        /*
            Eerste keer dat speler
            het gebouw binnengaat.
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

    if (
        action === "action_jimOne"
    ) {

        /*
            Eerst de afbeelding veranderen.

            Daarna pas de dialogue openen.
        */

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

    if (
        action === "action_jimTwo"
    ) {

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

    if (
        action === "action_jimThree"
    ) {

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

    if (
        action === "action_jimFour"
    ) {

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

    if (
        action === "action_leave_jim"
    ) {

        /*
            Dialogue eerst sluiten.
        */

        closeDialogue();


        /*
            Daarna terug naar normale
            Work scene.
        */

        setScene(
            "work"
        );


        return;
    }


    /* =====================================
       BOSS
    ====================================== */

    if (
        action === "action_boss"
    ) {

        /*
            Eerst Boss-afbeelding.
        */

        setScene(
            "boss"
        );


        /*
            Daarna Boss dialogue.
        */

        startDialogue(
            "boss_task"
        );


        return;
    }


    /* =====================================
       START REACTOR
    ====================================== */

    if (
        action === "action_start_minigame"
    ) {

        startMinigame();


        return;
    }


    /* =====================================
       LEVEL 2
    ====================================== */

    if (
        action === "level2"
    ) {

        goToLevel(
            2
        );


        return;
    }


    /* =====================================
       LEVEL 3
    ====================================== */

    if (
        action === "level3"
    ) {

        goToLevel(
            3
        );


        return;
    }


    /* =====================================
       UNKNOWN ACTION
    ====================================== */

    console.warn(
        "Unknown Level 1 action:",
        action
    );
}


/* =========================================
   CLOSE DIALOGUE
========================================= */

export function closeDialogue() {

    /*
        Onthouden waar we waren voordat
        showNormalBar() de dialogue state reset.
    */

    const sceneBeforeClose =
        gameState.currentScene;


    gameState.pendingOption =
        null;


    gameState.waitingForContinue =
        false;


    gameState.inputLocked =
        false;


    /*
        Eventuele breakfast overlay weg.
    */

    showBreakfastOverlay(
        null
    );


    /*
        Dialogue daadwerkelijk sluiten.
    */

    showNormalBar();


    /* =====================================
       BOSS LEAVE

       De Boss-node heeft:

       action: "close"

       Als je Boss verlaat moet je terug
       naar de normale Work-afbeelding.
    ====================================== */

    if (
        sceneBeforeClose ===
        "boss"
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

    /*
        Dialogue sluiten voordat iframe
        wordt geopend.
    */

    closeDialogue();


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
       JUISTE FILE

       action.js:
       /Levels/level1/action.js

       Reactor:
       /minigame_reactor1/minigame1.php
    ====================================== */

    const reactorUrl =
        new URL(
            "../../minigame_reactor1/minigame1.php",
            import.meta.url
        );


    /*
        Voorkom dat Chrome een oude versie
        van het iframe uit cache gebruikt.
    */

    reactorUrl.searchParams.set(
        "run",
        Date.now().toString()
    );


    /* =====================================
       IFRAME LADEN
    ====================================== */

    reactorMinigameFrame.src =
        reactorUrl.href;


    /* =====================================
       MINIGAME TONEN
    ====================================== */

    minigameScreen.classList.remove(
        "hidden"
    );
}


/* =========================================
   MINIGAME COMPLETE
========================================= */

function finishLevel1Minigame() {

    /*
        Niet meerdere keren afronden.
    */

    if (
        gameState.minigameCompleted
    ) {

        return;
    }


    gameState.minigameCompleted =
        true;


    /* =====================================
       MINIGAME SCHERM VERBERGEN
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
       NORMALE UI TERUG
    ====================================== */

    showNormalBar();


    /* =====================================
       WORK AFTER MINIGAME
    ====================================== */

    setScene(
        "work_after"
    );


    /*
        Start Work hotspot verbergen.
    */

    if (
        hotspotWork
    ) {

        hotspotWork.classList.add(
            "hidden"
        );

    }


    /*
        Onderste hint aanpassen.
    */

    if (
        barHint
    ) {

        barHint.textContent =
            "WORK FINISHED.";

    }
}


/* =========================================
   GLOBAL TEST
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
            Alleen berichten van dezelfde site.
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