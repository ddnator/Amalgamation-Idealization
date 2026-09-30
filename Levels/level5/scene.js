
/* =========================================
   SCENES
========================================= */

import {
    barHint,
    barLocation,
    bottomBar,
    dialogueContent,
    dialogueHelp,
    dialogueOptions,
    hotspotBoss,
    hotspotDoor,
    hotspotJim,
    locationLabel,
    normalBar,
    sceneName,
    breakfastOverlay
} from "./element.js";

import {
    gameState
} from "./gameState.js";

const homeHotspots =
    ".Bed, .Computer, .Breakfast, .Kitchen";

const allHotspots =
    ".Bed, .Computer, .Breakfast, .Kitchen, .Door";
export function setScene(scene) {

    gameState.currentScene = scene;

    hideAllHotspots();

    // Hide every scene
    document
        .querySelectorAll(".game-scene")
        .forEach(sceneElement => {
            sceneElement.classList.add("hidden");
        });

    // Show the requested scene
    if (scene === "home") {

        document
            .getElementById("caravanScene")
            .classList.remove("hidden");

        locationLabel.textContent = "HOME";
        barLocation.textContent = "HOME";
        sceneName.textContent = "HOME";
        barHint.textContent = "CLICK SOMETHING.";

        const homeHotspots =
            ".Bed, .Computer, .Breakfast, .Kitchen";

        const allHotspots =
            ".Bed, .Computer, .Breakfast, .Kitchen, .Door";

        document
            .querySelectorAll(homeHotspots)
            .forEach(hotspot => {
                hotspot.classList.remove("hidden");
            });


    }

    else if (scene === "outside") {

        document
            .getElementById("caravanSceneOutside")
            .classList.remove("hidden");

        locationLabel.textContent = "OUTSIDE";
        barLocation.textContent = "OUTSIDE";
        sceneName.textContent = "OUTSIDE";
        barHint.textContent = "YOU ARE OUTSIDE YOUR HOME.";

        hotspotDoor.classList.remove("hidden");
    }
    else if (scene === "walkingToWorkDay") {

        document
            .getElementById("walkingToWorkDay")
            .classList.remove("hidden");

        locationLabel.textContent = "ROUTE TO WORK";
        barLocation.textContent = "ROUTE TO WORK";
        sceneName.textContent = "ROUTE TO WORK";
        barHint.textContent = "YOUR ROUTE TO WORK.";

    }
    // when you're outside your work

    else if (scene === "OutsideWorkDay") {

        document
            .getElementById("OutsideWorkDay")
            .classList.remove("hidden");

        locationLabel.textContent = "WINSTON NUCLEAR POWERPLANT";
        barLocation.textContent = "WINSTON NUCLEAR POWERPLANT";
        sceneName.textContent = "WINSTON NUCLEAR POWERPLANT";
        barHint.textContent = "WINSTON NUCLEAR POWERPLANT.";

    }

    else if (scene === "work") {
        document
            .getElementById("work")
            .classList.remove("hidden");

        locationLabel.textContent = "WORK";
        barLocation.textContent = "WORK";
        sceneName.textContent = "AT WORK";
        barHint.textContent = "JIM IS WAVING AT U.";
        document.querySelectorAll(".work-hotspot")

            .forEach(hotspot => { hotspot.classList.remove("hidden"); });
    }

    else if (scene === "work_after") {

        locationLabel.textContent = "WORK";
        barLocation.textContent = "WORK";
        sceneName.textContent = "WORK";
        barHint.textContent = "WORK FINISHED.";

        /* Jim en boss blijven beschikbaar. */

        hotspotJim.classList.remove("hidden");
        hotspotBoss.classList.remove("hidden");

        /* Nu verschijnen ook:
         - Go home
          - Go bar */
        document.querySelectorAll(".after-work-hotspot")
            .forEach(hotspot => {
                hotspot.classList.remove("hidden");
            }
            );
    }


    showNormalBar();
}

/* =========================================
   NORMAL BAR
========================================= */

export function showNormalBar() {

    gameState.dialogueActive = false;
    gameState.currentNodeId = null;
    gameState.selectedOption = 0;
    gameState.inputLocked = false;
    gameState.waitingForContinue = false;
    gameState.pendingOption = null;

    bottomBar.classList.remove(
        "player-speaking",
        "ai-speaking",
        "waiting"
    );

    normalBar.classList.remove("hidden");

    dialogueContent.classList.add("hidden");

    dialogueOptions.innerHTML = "";

    dialogueHelp.textContent =
        "↑ ↓ SELECT   ENTER / 1-4";
}
export function hideAllHotspots() {

    document
        .querySelectorAll(allHotspots)
        .forEach(hotspot => {
            hotspot.classList.add("hidden");
        });
}
export function showBreakfastOverlay(nodeId) {

    if (!breakfastOverlay) {
        return;
    }

    if (nodeId === "eat") {
        breakfastOverlay.classList.remove("hidden");
    }
    else {
        breakfastOverlay.classList.add("hidden");
    }
}