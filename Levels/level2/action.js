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
    barHint
} from "./element.js";

export function runAction(
    action
) {

    if (
        action === "close"
    ) {

        closeDialogue();

        return;
    }

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

    if (
        action === "back_breakfast"
    ) {

        showBreakfastOverlay(
            null
        );

        closeDialogue();

        return;
    }

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

    if (
        action === "OutsideWorkDay" ||
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

    if (
        action === "show_work"
    ) {

        closeDialogue();

        setScene(
            "work"
        );

        return;
    }

    if (
        action === "leave_jim"
    ) {

        closeDialogue();

        setScene(
            gameState.minigameCompleted
                ? "work_after"
                : "work"
        );

        return;
    }

    if (
        action === "start_minigame"
    ) {

        startMinigame();

        return;
    }

    if (
        action === "finish_minigame"
    ) {

        finishMinigame();

        return;
    }

    if (
        action === "level2"
    ) {

        window.location.href =
            "../level2/level2.php";

        return;
    }

    if (
        action === "level3"
    ) {

        window.location.href =
            "../level3/level3.php";

        return;
    }

    if (
        action === "level4"
    ) {

        window.location.href =
            "../level4/level4.php";

        return;
    }

    console.warn(
        "Unknown Level 2 action:",
        action
    );
}

export function closeDialogue() {

    gameState.pendingOption =
        null;

    gameState.waitingForContinue =
        false;

    gameState.inputLocked =
        false;

    showBreakfastOverlay(
        null
    );

    showNormalBar();
}

export function startMinigame() {

    closeDialogue();

    const minigameUrl =
        new URL(
            "../../minigame_reactor1/minigame1.php",
            import.meta.url
        );

    minigameUrl.searchParams.set(
        "run",
        Date.now().toString()
    );

    reactorMinigameFrame.src =
        minigameUrl.href;

    minigameScreen.classList.remove(
        "hidden"
    );
}

export function finishMinigame() {

    gameState.minigameCompleted =
        true;

    minigameScreen.classList.add(
        "hidden"
    );

    reactorMinigameFrame.src =
        "about:blank";

    setScene(
        "work_after"
    );

    showNormalBar();

    if (
        barHint
    ) {

        barHint.textContent =
            "WORK FINISHED.";
    }
}

window.finishLevel2Minigame =
    finishMinigame;

window.addEventListener(
    "message",
    event => {

        if (
            event.origin !==
            window.location.origin
        ) {
            return;
        }

        if (
            event.data?.type ===
            "level2-minigame-complete"
            ||
            event.data?.type ===
            "level1-minigame-complete"
        ) {

            finishMinigame();
        }
    }
);