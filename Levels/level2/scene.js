import {
    barHint,
    barLocation,
    bottomBar,
    dialogueContent,
    dialogueHelp,
    dialogueOptions,
    locationLabel,
    normalBar,
    sceneName,
    breakfastOverlay,
    hotspotHome,
    hotspotBar
} from "./element.js";

import {
    gameState
} from "./gameState.js";

export function setScene(scene) {

    gameState.currentScene =
        scene;

    document
        .querySelectorAll(".game-scene")
        .forEach(element => {
            element.classList.add("hidden");
        });

    hotspotHome?.classList.add("hidden");
    hotspotBar?.classList.add("hidden");

    showBreakfastOverlay(null);

    if (
        scene === "home"
    ) {

        document
            .getElementById("caravanScene")
            .classList.remove("hidden");

        locationLabel.textContent =
            "HOME";

        barLocation.textContent =
            "HOME";

        sceneName.textContent =
            "HOME";

        barHint.textContent =
            "CLICK SOMETHING.";

        return;
    }

    if (
        scene === "outside"
    ) {

        document
            .getElementById("caravanSceneOutside")
            .classList.remove("hidden");

        locationLabel.textContent =
            "OUTSIDE";

        barLocation.textContent =
            "OUTSIDE";

        sceneName.textContent =
            "OUTSIDE";

        barHint.textContent =
            "YOU ARE OUTSIDE YOUR HOME.";

        return;
    }

    if (
        scene === "walkingToWorkDay"
    ) {

        document
            .getElementById("walkingToWorkDay")
            .classList.remove("hidden");

        locationLabel.textContent =
            "ROUTE TO WORK";

        barLocation.textContent =
            "ROUTE TO WORK";

        sceneName.textContent =
            "ROUTE TO WORK";

        barHint.textContent =
            "YOUR ROUTE TO WORK.";

        return;
    }

    if (
        scene === "OutsideWorkDay"
    ) {

        document
            .getElementById("OutsideWorkDay")
            .classList.remove("hidden");

        locationLabel.textContent =
            "WINSTON NUCLEAR POWERPLANT";

        barLocation.textContent =
            "WINSTON NUCLEAR POWERPLANT";

        sceneName.textContent =
            "WINSTON NUCLEAR POWERPLANT";

        barHint.textContent =
            "ENTER THE BUILDING.";

        return;
    }

    if (
        scene === "work"
    ) {

        document
            .getElementById("work")
            .classList.remove("hidden");

        locationLabel.textContent =
            "WORK";

        barLocation.textContent =
            "WORK";

        sceneName.textContent =
            "AT WORK";

        barHint.textContent =
            "JIM IS WAVING AT U.";

        return;
    }

    if (
        scene === "work_after"
    ) {

        document
            .getElementById("work")
            .classList.remove("hidden");

        locationLabel.textContent =
            "WORK";

        barLocation.textContent =
            "WORK";

        sceneName.textContent =
            "WORK";

        barHint.textContent =
            "WORK FINISHED.";

        hotspotHome?.classList.remove("hidden");
        hotspotBar?.classList.remove("hidden");
    }
}

export function showNormalBar() {

    gameState.dialogueActive =
        false;

    gameState.currentNodeId =
        null;

    gameState.selectedOption =
        0;

    gameState.inputLocked =
        false;

    gameState.waitingForContinue =
        false;

    gameState.pendingOption =
        null;

    bottomBar.classList.remove(
        "player-speaking",
        "ai-speaking",
        "waiting"
    );

    normalBar.classList.remove(
        "hidden"
    );

    dialogueContent.classList.add(
        "hidden"
    );

    dialogueOptions.innerHTML =
        "";

    dialogueHelp.textContent =
        "↑ ↓ SELECT   ENTER / 1-4";
}

export function showBreakfastOverlay(
    nodeId
) {

    if (
        !breakfastOverlay
    ) {
        return;
    }

    breakfastOverlay.classList.toggle(
        "hidden",
        nodeId !== "eat"
    );
}