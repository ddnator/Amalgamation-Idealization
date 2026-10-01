/* =========================================
   LEVEL 1 SCENES

   BELANGRIJKE FIX:

   setScene() verandert nu ALLEEN de scene.

   setScene() roept NIET meer automatisch
   showNormalBar() aan.

   Daardoor gebeurt dit correct:

   setScene("jim4");
   startDialogue("jim_lisa");

   en wordt de Jim-dialogue niet direct
   opnieuw gesloten.
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
    hotspotWork,

    locationLabel,
    normalBar,
    sceneName,

    breakfastOverlay
} from "./element.js";


import {
    gameState
} from "./gameState.js";


/* =========================================
   HOTSPOT SELECTORS
========================================= */

const homeHotspots =
    ".Bed, .Computer, .Breakfast, .Kitchen";


const workHotspots =
    ".jim, .work, .boss";


const allHotspots =
    ".Bed, " +
    ".Computer, " +
    ".Breakfast, " +
    ".Kitchen, " +
    ".Door, " +
    ".jim, " +
    ".work, " +
    ".boss, " +
    ".after-work-hotspot";


/* =========================================
   SHOW SCENE ELEMENT
========================================= */

function showSceneElement(
    id
) {

    const element =
        document.getElementById(
            id
        );


    if (
        !element
    ) {

        console.warn(
            `Scene element bestaat niet: #${id}`
        );


        return;
    }


    element.classList.remove(
        "hidden"
    );
}


/* =========================================
   LABELS
========================================= */

function setLabels(
    location,
    scene,
    hint
) {

    if (
        locationLabel
    ) {

        locationLabel.textContent =
            location;

    }


    if (
        barLocation
    ) {

        barLocation.textContent =
            location;

    }


    if (
        sceneName
    ) {

        sceneName.textContent =
            scene;

    }


    if (
        barHint
    ) {

        barHint.textContent =
            hint;

    }
}


/* =========================================
   SHOW HOTSPOTS
========================================= */

function showHotspots(
    selector
) {

    document
        .querySelectorAll(
            selector
        )
        .forEach(
            hotspot => {

                hotspot.classList.remove(
                    "hidden"
                );

            }
        );
}


/* =========================================
   SET SCENE

   LET OP:

   GEEN showNormalBar() meer onderaan.

   Scene-management en dialogue-management
   zijn nu van elkaar gescheiden.
========================================= */

export function setScene(
    scene
) {

    gameState.currentScene =
        scene;


    /* =====================================
       ALLE HOTSPOTS UIT
    ====================================== */

    hideAllHotspots();


    /* =====================================
       BREAKFAST OVERLAY UIT
    ====================================== */

    showBreakfastOverlay(
        null
    );


    /* =====================================
       ALLE SCENES UIT
    ====================================== */

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

        showSceneElement(
            "caravanScene"
        );


        setLabels(
            "HOME",
            "HOME",
            "CLICK SOMETHING."
        );


        showHotspots(
            homeHotspots
        );


        return;
    }


    /* =====================================
       OUTSIDE HOME
    ====================================== */

    if (
        scene ===
        "outside"
    ) {

        showSceneElement(
            "caravanSceneOutside"
        );


        setLabels(
            "OUTSIDE",
            "OUTSIDE",
            "YOU ARE OUTSIDE YOUR HOME."
        );


        if (
            hotspotDoor
        ) {

            hotspotDoor.classList.remove(
                "hidden"
            );

        }


        return;
    }


    /* =====================================
       WALKING TO WORK
    ====================================== */

    if (
        scene ===
        "walkingToWorkDay"
    ) {

        showSceneElement(
            "walkingToWorkDay"
        );


        setLabels(
            "ROUTE TO WORK",
            "ROUTE TO WORK",
            "YOUR ROUTE TO WORK."
        );


        return;
    }


    /* =====================================
       OUTSIDE WORK
    ====================================== */

    if (
        scene ===
        "OutsideWorkDay"
    ) {

        showSceneElement(
            "OutsideWorkDay"
        );


        setLabels(
            "WINSTON NUCLEAR POWERPLANT",
            "WINSTON NUCLEAR POWERPLANT",
            "WINSTON NUCLEAR POWERPLANT."
        );


        return;
    }


    /* =====================================
       WORK
    ====================================== */

    if (
        scene ===
        "work"
    ) {

        showSceneElement(
            "work"
        );


        setLabels(
            "WORK",
            "AT WORK",
            "JIM IS WAVING AT U."
        );


        showHotspots(
            workHotspots
        );


        /*
            Als minigame al klaar is mag
            Start Work niet terugkomen.
        */

        if (
            gameState.minigameCompleted &&
            hotspotWork
        ) {

            hotspotWork.classList.add(
                "hidden"
            );

        }


        return;
    }


    /* =====================================
       WORK AFTER MINIGAME

       BELANGRIJK:

       De normale work-afbeelding wordt hier
       ook werkelijk zichtbaar gemaakt.
    ====================================== */

    if (
        scene ===
        "work_after"
    ) {

        showSceneElement(
            "work"
        );


        setLabels(
            "WORK",
            "WORK",
            "WORK FINISHED."
        );


        /*
            Jim blijft beschikbaar.
        */

        if (
            hotspotjim
        ) {

            hotspotjim.classList.remove(
                "hidden"
            );

        }


        /*
            Boss blijft beschikbaar.
        */

        if (
            hotspotBoss
        ) {

            hotspotBoss.classList.remove(
                "hidden"
            );

        }


        /*
            Start Work weg.
        */

        if (
            hotspotWork
        ) {

            hotspotWork.classList.add(
                "hidden"
            );

        }


        /*
            Eventuele Go Home / Go Bar
            hotspots zichtbaar maken.
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


        return;
    }


    /* =====================================
       JIM 1
    ====================================== */

    if (
        scene ===
        "jim1"
    ) {

        showSceneElement(
            "jim1"
        );


        setLabels(
            "JIM",
            "JIM",
            "TALKING TO JIM."
        );


        return;
    }


    /* =====================================
       JIM 2
    ====================================== */

    if (
        scene ===
        "jim2"
    ) {

        showSceneElement(
            "jim2"
        );


        setLabels(
            "JIM",
            "JIM",
            "TALKING TO JIM."
        );


        return;
    }


    /* =====================================
       JIM 3
    ====================================== */

    if (
        scene ===
        "jim3"
    ) {

        showSceneElement(
            "jim3"
        );


        setLabels(
            "JIM",
            "JIM",
            "TALKING TO JIM."
        );


        return;
    }


    /* =====================================
       JIM 4
    ====================================== */

    if (
        scene ===
        "jim4"
    ) {

        showSceneElement(
            "jim4"
        );


        setLabels(
            "JIM",
            "JIM",
            "TALKING TO JIM."
        );


        return;
    }


    /* =====================================
       BOSS
    ====================================== */

    if (
        scene ===
        "boss"
    ) {

        showSceneElement(
            "boss"
        );


        setLabels(
            "BOSS",
            "BOSS",
            "TALKING TO BOSS."
        );


        return;
    }


    /* =====================================
       UNKNOWN
    ====================================== */

    console.warn(
        "Onbekende Level 1 scene:",
        scene
    );
}


/* =========================================
   NORMAL BAR

   Dit is nu de ENIGE functie die bewust
   de dialogue sluit/reset.
========================================= */

export function showNormalBar() {

    /* =====================================
       STATE RESET
    ====================================== */

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


    /* =====================================
       BOTTOM BAR CLASSES
    ====================================== */

    if (
        bottomBar
    ) {

        bottomBar.classList.remove(
            "player-speaking",
            "ai-speaking",
            "waiting",
            "dialogue-open"
        );

    }


    /* =====================================
       NORMAL UI TONEN
    ====================================== */

    if (
        normalBar
    ) {

        normalBar.classList.remove(
            "hidden"
        );

    }


    /* =====================================
       DIALOGUE VERBERGEN
    ====================================== */

    if (
        dialogueContent
    ) {

        dialogueContent.classList.add(
            "hidden"
        );

    }


    /* =====================================
       OPTIONS LEEGMAKEN
    ====================================== */

    if (
        dialogueOptions
    ) {

        dialogueOptions.innerHTML =
            "";

    }


    /* =====================================
       HELP RESET
    ====================================== */

    if (
        dialogueHelp
    ) {

        dialogueHelp.textContent =
            "↑ ↓ SELECT   ENTER / 1-4";

    }
}


/* =========================================
   HIDE ALL HOTSPOTS

   Nu worden OOK de Work-hotspots
   verborgen als je naar Jim/Boss/etc gaat.
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


    /*
        Alleen tijdens de eat-dialogue
        laten zien.
    */

    if (
        nodeId ===
        "eat"
    ) {

        breakfastOverlay.classList.remove(
            "hidden"
        );


        return;
    }


    breakfastOverlay.classList.add(
        "hidden"
    );
}