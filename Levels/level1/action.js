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
import { gameState } from "./gameState.js";
import { minigameScreen, reactorMinigameFrame } from "./element.js";

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

    if (action === "action_go_to_work") {

        setScene("walkingToWorkDay");

        startDialogue("walk_to_work");

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
        action === "action_jimOne"
    ) {

        setScene("jim1");

        startDialogue("jim_intro");
        return;
    }

    if (
        action === "action_jimTwo"
    ) {

        setScene("jim2");

        startDialogue("jim_upgrade");
        return;
    }

    if (
        action === "action_jimThree"
    ) {

        setScene("jim3");

        startDialogue("jim_bad_sleep");
        return;
    }

    if (
        action === "action_jimFour"
    ) {

        setScene("jim4");

        startDialogue("jim_lisa");
        return;
    }

    /* LEAVE JIM */

    if (
        action === "action_leave_jim"
    ) {

        closeDialogue();

        setScene("work");

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

        window.location.href = "../level2/level2.php";

        return;
    }


    /* LEVEL 3 */

    if (
        action === "level3"
    ) {

        window.location.href = "../level3/level3.php";


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
        level1.php zit in:

        Levels/level1/level1.php

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
