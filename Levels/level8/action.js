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
    console.log("runAction: " + action);
    /* CLOSE */

    if (action === "close") {

        closeDialogue();

        return;
    }

    if ( action === "start_bossfight") {

        window.location.href = "../../bossfight/bossfight.php";

        return;
    }

    if (action === "ending") {
        console.log("ending");
        window.location.href = "../../endingscreen.html";

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