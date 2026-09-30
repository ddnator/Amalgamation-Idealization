import {
    setScene, showBreakfastOverlay
} from "./scene.js";

import {
    startDialogue,
} from "./dialogue.js";

import {
    showNormalBar,
} from "./scene.js";

/*setScene("outside");
startDialogue("outside_caravan"); */
/* =========================================
   ACTIONS
========================================= */
import {gameState} from "./gameState.js";
import {minigameScreen, reactorMinigameFrame} from "./element.js";

export function runAction(action) {

    /* CLOSE */

    if (
        action === "close"
    ) {

        closeDialogue();

        return;
    }
    /* LEAVE BREAKFAST */

    if (
        action === "leave_breakfast"
    ) {

        hideBreakfastOverlay();

        setScene(
            "outside"
        );

        startDialogue(
            "outside_caravan"
        );

        return;
    }


    /* BACK FROM BREAKFAST */

    if (
        action === "back_breakfast"
    ) {

        hideBreakfastOverlay();

        closeDialogue();

        return;
    }

    if (action === "action_Outside") {

        setScene("outside");

        startDialogue("outside_caravan");

        return;
    }

    if (action === "action_go_home") {

        setScene("walkingHomeNight");

        startDialogue("walk_home");

        return;
    }

    if (action === "action_go_bar") {

        setScene("ErwinsBar");

        startDialogue("outside_bar");

        return;
    }

    /* Winston Nuclear PowerPlant outside*/

    if (action === "action_OutsideWorkDay") {

        setScene("OutsideWorkDay");

        startDialogue("winston_nuclear_powerplant");
        return;
    }
    /* ARRIVE AT WORK */

    if (
        action === "action_work"
    ) {

        startDialogue("work");

        setScene("work");

        return;
    }

    if (
        action === "action_stevenOne"
    ) {

        setScene("steven1");

        startDialogue("steven_intro");
        return;
    }

    if (
        action === "action_stevenTwo"
    ) {

        setScene("steven3");

        startDialogue("steven_no_money");
        return;
    }

    if (
        action === "action_stevenThree"
    ) {

        setScene("steven3");

        startDialogue("steven_yes_money");
        return;
    }

    if (
        action === "action_stevenFour"
    ) {

        setScene("steve4");

        startDialogue("steven_explain");
        return;
    }

    /* LEAVE STEVEN */

    if (
        action === "action_leave_steven"
    ) {

        closeDialogue();

        setScene("ErwinsBar");

        return;
    }

    if (
        action === "action_boss"
    ) {

        startDialogue("boss_task");

        setScene("boss");

        return;
    }

    if (
        action === "close"
    ) {

        closeDialogue();

        setScene("work");

        return;
    }



    /* START REACTOR */

    if (
        action === "action_start_minigame"
    ) {

        startMinigame();

        return;
    }


    /* LEVEL 2 */

    if (
        action === "level2"
    ) {

        goToLevel(
            2
        );

        return;
    }


    /* LEVEL 3 */

    if (
        action === "level3"
    ) {

        goToLevel(
            3
        );

        return;
    }
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
}


/* =========================================
   REACTOR MINIGAME
========================================= */

function startMinigame() {

    closeDialogue();


    /*
        level22.php zit in:

        Levels/level1/level22.php

        Reactor zit in:

        minigame_reactor1/mingame1.html

        Daarom:
        ../../
    */

    reactorMinigameFrame.src =
        "../../minigame_reactor1/mingame1.html?run="
        +
        Date.now();


    minigameScreen.classList.remove(
        "hidden"
    );
}


/* =========================================
   MINIGAME COMPLETE
========================================= */

function finishLevel1Minigame() {

    gameState.minigameCompleted = true;

    minigameScreen.classList.add("hidden");
    /*
        iframe stoppen/resetten
    */
    reactorMinigameFrame.src = "about:blank";

    /*
        Terug naar point-and-click.
    */
    setScene("work_after");
}


window.finishLevel1Minigame =
    finishLevel1Minigame;


/* =========================================
   LUISTER NAAR REACTOR 02

   Reactor 02 stuurt na completion:

   {
       type: "level1-minigame-complete"
   }
========================================= */

window.addEventListener(
    "message",
    event => {

        if (event.data && event.data.type === "level1-minigame-complete") {
            finishLevel1Minigame();
        }
    }
);
