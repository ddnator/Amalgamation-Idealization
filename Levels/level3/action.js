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

    if (action === "close") {

        closeDialogue();

        return;
    }

    if (action === "level2") {

        window.location.href = "../level2/level2.php";
        console.log('going')
        return;
    }

    if ( action === "level4") {

        window.location.href = "../level4/level4.php";

        return;
    }
};

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