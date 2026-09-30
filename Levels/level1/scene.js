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


/* =========================================
   SET SCENE
========================================= */

export function setScene(scene) {

    gameState.currentScene =
        scene;


    hideAllHotspots();


    /*
        Eerst alle scenes verbergen.
    */

    document
        .querySelectorAll(
            ".game-scene"
        )
        .forEach(
            sceneElement => {

                sceneElement.classList.add(
                    "hidden"
                );
            }
        );


    /* =====================================
       HOME
    ====================================== */

    if (
        scene ===
        "home"
    ) {

        document
            .getElementById(
                "caravanScene"
            )
            .classList.remove(
                "hidden"
            );


        locationLabel.textContent =
            "HOME";


        barLocation.textContent =
            "HOME";


        sceneName.textContent =
            "HOME";


        barHint.textContent =
            "CLICK SOMETHING.";


        document
            .querySelectorAll(
                homeHotspots
            )
            .forEach(
                hotspot => {

                    hotspot.classList.remove(
                        "hidden"
                    );
                }
            );
    }


    /* =====================================
       OUTSIDE HOME
    ====================================== */

    else if (
        scene ===
        "outside"
    ) {

        document
            .getElementById(
                "caravanSceneOutside"
            )
            .classList.remove(
                "hidden"
            );


        locationLabel.textContent =
            "OUTSIDE";


        barLocation.textContent =
            "OUTSIDE";


        sceneName.textContent =
            "OUTSIDE";


        barHint.textContent =
            "YOU ARE OUTSIDE YOUR HOME.";


        hotspotDoor.classList.remove(
            "hidden"
        );
    }


    /* =====================================
       WALKING TO WORK
    ====================================== */

    else if (
        scene ===
        "walkingToWorkDay"
    ) {

        document
            .getElementById(
                "walkingToWorkDay"
            )
            .classList.remove(
                "hidden"
            );


        locationLabel.textContent =
            "ROUTE TO WORK";


        barLocation.textContent =
            "ROUTE TO WORK";


        sceneName.textContent =
            "ROUTE TO WORK";


        barHint.textContent =
            "YOUR ROUTE TO WORK.";
    }


    /* =====================================
       OUTSIDE WORK
    ====================================== */

    else if (
        scene ===
        "OutsideWorkDay"
    ) {

        document
            .getElementById(
                "OutsideWorkDay"
            )
            .classList.remove(
                "hidden"
            );


        locationLabel.textContent =
            "WINSTON NUCLEAR POWERPLANT";


        barLocation.textContent =
            "WINSTON NUCLEAR POWERPLANT";


        sceneName.textContent =
            "WINSTON NUCLEAR POWERPLANT";


        barHint.textContent =
            "WINSTON NUCLEAR POWERPLANT.";
    }


    /* =====================================
       WORK
    ====================================== */

    else if (
        scene ===
        "work"
    ) {

        document
            .getElementById(
                "work"
            )
            .classList.remove(
                "hidden"
            );


        locationLabel.textContent =
            "WORK";


        barLocation.textContent =
            "WORK";


        sceneName.textContent =
            "AT WORK";


        barHint.textContent =
            "JIM IS WAVING AT U.";


        document
            .querySelectorAll(
                workHotspots
            )
            .forEach(
                hotspot => {

                    hotspot.classList.remove(
                        "hidden"
                    );
                }
            );
    }


    /* =====================================
       WORK AFTER MINIGAME
    ====================================== */

    else if (
        scene ===
        "work_after"
    ) {

        locationLabel.textContent =
            "WORK";


        barLocation.textContent =
            "WORK";


        sceneName.textContent =
            "WORK";


        barHint.textContent =
            "WORK FINISHED.";


        /*
            Jim en boss blijven beschikbaar.
        */

        hotspotjim.classList.remove(
            "hidden"
        );


        hotspotBoss.classList.remove(
            "hidden"
        );


        /*
            Go home / go bar zichtbaar.
        */

        document
            .querySelectorAll(
                ".after-work-hotspot"
            )
            .forEach(
                hotspot => {

                    hotspot.classList.remove(
                        "hidden"
                    );
                }
            );
    }


    /* =====================================
       JIM 1
    ====================================== */

    else if (
        scene ===
        "jim1"
    ) {

        document
            .getElementById(
                "jim1"
            )
            .classList.remove(
                "hidden"
            );


        locationLabel.textContent =
            "JIM1";


        barLocation.textContent =
            "JIM1";


        sceneName.textContent =
            "JIM1";


        barHint.textContent =
            "JIM1.";
    }


    /* =====================================
       JIM 2
    ====================================== */

    else if (
        scene ===
        "jim2"
    ) {

        document
            .getElementById(
                "jim2"
            )
            .classList.remove(
                "hidden"
            );


        locationLabel.textContent =
            "JIM2";


        barLocation.textContent =
            "JIM2";


        sceneName.textContent =
            "JIM2";


        barHint.textContent =
            "JIM2.";
    }


    /* =====================================
       JIM 3
    ====================================== */

    else if (
        scene ===
        "jim3"
    ) {

        document
            .getElementById(
                "jim3"
            )
            .classList.remove(
                "hidden"
            );


        locationLabel.textContent =
            "JIM3";


        barLocation.textContent =
            "JIM3";


        sceneName.textContent =
            "JIM3";


        barHint.textContent =
            "JIM3.";
    }


    /* =====================================
       JIM 4
    ====================================== */

    else if (
        scene ===
        "jim4"
    ) {

        document
            .getElementById(
                "jim4"
            )
            .classList.remove(
                "hidden"
            );


        locationLabel.textContent =
            "JIM4";


        barLocation.textContent =
            "JIM4";


        sceneName.textContent =
            "JIM4";


        barHint.textContent =
            "JIM4.";
    }


    /* =====================================
       BOSS
    ====================================== */

    else if (
        scene ===
        "boss"
    ) {

        document
            .getElementById(
                "boss"
            )
            .classList.remove(
                "hidden"
            );


        locationLabel.textContent =
            "BOSS";


        barLocation.textContent =
            "BOSS";


        sceneName.textContent =
            "BOSS";


        barHint.textContent =
            "BOSS";
    }


    /*
        Na iedere scene de normale balk tonen.
    */

    showNormalBar();
}


/* =========================================
   NORMAL BAR
========================================= */

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


    /*
        dialogue-open wordt hier verwijderd.

        Daardoor wordt de balk weer klein
        nadat de dialogue klaar is.
    */

    bottomBar.classList.remove(
        "player-speaking",
        "ai-speaking",
        "waiting",
        "dialogue-open"
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


/* =========================================
   HIDE HOTSPOTS
========================================= */

export function hideAllHotspots() {

    document
        .querySelectorAll(
            allHotspots
        )
        .forEach(
            hotspot => {

                hotspot.classList.add(
                    "hidden"
                );
            }
        );
}


/* =========================================
   BREAKFAST OVERLAY
========================================= */

export function showBreakfastOverlay(
    nodeId
) {

    if (
        !breakfastOverlay
    ) {

        return;
    }


    if (
        nodeId ===
        "eat"
    ) {

        breakfastOverlay.classList.remove(
            "hidden"
        );
    }

    else {

        breakfastOverlay.classList.add(
            "hidden"
        );
    }
}