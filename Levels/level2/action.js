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



    /* LEVEL 4 */
    if (
        action === "level4"
    ) {

        window.location.href = "../level4/level4.php";

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