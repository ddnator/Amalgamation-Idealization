
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
    hotspotjim,
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

const workHotspots =
    ".jim, .work, .boss";
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
    else if (scene === "walkingHomeNight") {

        document
            .getElementById("walkingHomeNight")
            .classList.remove("hidden");

        locationLabel.textContent = "ROUTE HOME";
        barLocation.textContent = "ROUTE HOME";
        sceneName.textContent = "ROUTE HOME";
        barHint.textContent = "YOUR ROUTE HOME";

    }

    else if (scene === "ErwinsBar") {

        document
            .getElementById("ErwinsBar")
            .classList.remove("hidden");

        locationLabel.textContent = "Erwin's Bar";
        barLocation.textContent = "Erwin's Bar";
        sceneName.textContent = "Erwin's Bar";
        barHint.textContent = "Erwin's Bar";

    }
// when you're outside your work

    else if (scene === "OutsideWorkNight") {

        document
            .getElementById("OutsideWorkNight")
            .classList.remove("hidden");

        locationLabel.textContent = "WINSTON NUCLEAR POWERPLANT";
        barLocation.textContent = "WINSTON NUCLEAR POWERPLANT";
        sceneName.textContent = "WINSTON NUCLEAR POWERPLANT";
        barHint.textContent = "WINSTON NUCLEAR POWERPLANT.";

    }

    else if ( scene === "work" )
    {


        document
            .getElementById("work")
            .classList.remove("hidden");
        locationLabel.textContent = "WORK";
        barLocation.textContent = "WORK";
        sceneName.textContent = "AT WORK";
        barHint.textContent = "JIM IS WAVING AT U.";

        const workHotspots =
        ".jim, .work, .boss";

        document .querySelectorAll( workHotspots )

            .forEach( hotspot =>
            { hotspot.classList.remove( "hidden" ); } ); }

    else if (scene === "work_after") {

        locationLabel.textContent = "WORK";
        barLocation.textContent = "WORK";
        sceneName.textContent = "WORK";
        barHint.textContent = "WORK FINISHED.";

        /* Jim en boss blijven beschikbaar. */

        hotspotJim.classList.remove( "hidden" );
        hotspotBoss.classList.remove( "hidden" );

        /* Nu verschijnen ook:
         - Go home
          - Go bar */
        document .querySelectorAll( ".after-work-hotspot" )
            .forEach( hotspot =>
                { hotspot.classList.remove( "hidden" );
                }
            ); }

    else if (scene === "steven1") {

        document
            .getElementById("steven1")
            .classList.remove("hidden");

        locationLabel.textContent = "STEVEN1";
        barLocation.textContent = "STEVEN1";
        sceneName.textContent = "STEVEN1";
        barHint.textContent = "STEVEN1.";

    }

    else if (scene === "steven2") {

        document
            .getElementById("STEVEN2")
            .classList.remove("hidden");

        locationLabel.textContent = "STEVEN2";
        barLocation.textContent = "STEVEN2";
        sceneName.textContent = "STEVEN2";
        barHint.textContent = "STEVEN2.";

    }
    else if (scene === "steven3") {

        document
            .getElementById("steven3")
            .classList.remove("hidden");

        locationLabel.textContent = "STEVEN3";
        barLocation.textContent = "STEVEN3";
        sceneName.textContent = "STEVEN3";
        barHint.textContent = "STEVEN3.";

    }
    else if (scene === "steven4") {

        document
            .getElementById("steven4")
            .classList.remove("hidden");

        locationLabel.textContent = "STEVEN4";
        barLocation.textContent = "STEVEN4";
        sceneName.textContent = "STEVEN4";
        barHint.textContent = "STEVEN4.";

    }

    else if (scene === "insideBarOne") {

        document
            .getElementById("insideBarOne")
            .classList.remove("hidden");

        locationLabel.textContent = "Erwin's Bar";
        barLocation.textContent = "Erwin's Bar";
        sceneName.textContent = "Erwin's Bar";
        barHint.textContent = "Erwin's Bar";

    }
    else if (scene === "insideBarTwo") {

        document
            .getElementById("insideBarTwo")
            .classList.remove("hidden");

        locationLabel.textContent = "Erwin's Bar";
        barLocation.textContent = "Erwin's Bar";
        sceneName.textContent = "Erwin's Bar";
        barHint.textContent = "Erwin's Bar";
    }
    else if (scene === "boss") {

        document
            .getElementById("boss")
            .classList.remove("hidden");

        locationLabel.textContent = "BOSS";
        barLocation.textContent = "BOSS";
        sceneName.textContent = "BOSS";
        barHint.textContent = "BOSS";

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