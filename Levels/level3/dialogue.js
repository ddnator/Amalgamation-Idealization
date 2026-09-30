import {
    barHint,
    barLocation,
    bottomBar,
    normalBar,

    dialogueContent,
    dialogueSpeaker,
    dialogueText,
    dialogueHelp,
    dialogueOptions,

    locationLabel,
    sceneName,

    startButton,
    startScreen,

    minigameScreen,
    reactorMinigameFrame,

    endScreen,
    endTitle,
    endText,

    restartButton, hotspotKitchen, hotspotBed, hotspotComputer
} from "./element.js";
import {
    setScene,
    hideAllHotspots,
    showNormalBar,
    showBreakfastOverlay,
} from "./scene.js";

import {
    gameState
} from "./gameState.js";

import {
    closeDialogue,
    runAction
} from "./action.js";
/* =========================================
   DIALOGUE TREE
========================================= */
let breakfast = false;
const dialogueTree = {

    /* =====================================
       START
    ====================================== */

    level_start: {

        speaker:
            "NARRATOR",

        text:
            "You arrive at the bar",

        options: [
            {
                text:
                    "Chat with bartender",

                speak:
                    false,

                next:
                    "erwin_yo" //check
            },
            {
                text:
                    "Go home",

                speak:
                    false,

                action:
                    "level2"
            }
        ]
        },

    erwin_yo: {
        speaker:
        "Erwin",

        text:"Yo whats up Y/N, what do you want?",

        options: [
            {
                text:
                    "Do you still have the good stuff?",

                speak:
                    false,

                next:
                    "what_kind" //check
            },
            {
                text:
                    "Can I get the usual?",

                speak:
                    false,

                next: //check
                    "which_usual",
            },
            {
                text:
                    "Tell me a joke Erwin",

                speak: 
                    false,

                next:
                    "your_mom" //check
            }
        ]
    },

    what_kind: {
        speaker:
        "Erwin",

        text:"What kind of good stuff do you want?",

        options: [
            {
                text:
                    "I want a body part upgrade",
                
                speak:
                    false,

                next:
                    "what_upgrade" //check
            },
            {
                text:
                    "Drugs",
                
                speak:
                    false,

                action:
                    "level4" //check
            }
        ]
    },

    which_usual: {
        speaker:
        "Erwin",

        text: "Which usual do you want?",
        
        options: [
            {
                text:
                    "I want a body part upgrade",
                
                speak:
                    false,

                next:
                    "what_upgrade" //check
            },
            {
                text:
                    "Drugs",
                
                speak:
                    false,

                action:
                    "level4" //check
            }
        ]
    }, 

    your_mom: {
        speaker:
        "Erwin",

        text: "Your mom",

        options: [
            {
                text:
                    "...",

                speak:
                    false,

                next:
                    "erwin_yo"
            }
        ]
    },

    what_upgrade: {
        speaker:
        "Erwin",

        text: "What upgrade do you want this time?",

        options: [
            {
                text:
                    "I want to upgrade my eye",

                speak:
                    false,

                next:
                    "eye_upgrade"
            },
            {
                text:
                    "I want to upgrade my leg",

                speak:
                    false,

                next:
                    "leg_upgrade"
            },
            {
                text:
                    "I want to upgrade my arm",

                speak:
                    false,

                next:
                    "arm_upgrade"
            },
            {
                text:
                    "I want to upgrade my heart",

                speak:
                    false,

                next:
                    "heart_upgrade"
            }
        ]
    },

    eye_upgrade: {
        speaker:
        "Narrator",

        text: "Upgrading eyes",

        options: [
            {
                text: "Continue",

                speak:
                    false,

                next:
                    "upgrade_done"
            }
        ]
    },

    leg_upgrade: {
        speaker:
        "Narrator",

        text: "Upgrading leg",

        options: [
            {
                text: "Continue",

                speak:
                    false,

                next:
                    "upgrade_done"
            }
        ]
    },

    arm_upgrade: {
        speaker:
        "Narrator",

        text: "Upgrading arms",

        options: [
            {
                text: "Continue",

                speak:
                    false,

                next:
                    "upgrade_done"
            }
        ]
    },

    heart_upgrade: {
        speaker:
        "Narrator",

        text: "Sorry bro it's out of stock",

        options: [
            {
                text: "Continue",

                speak:
                    false,

                next:
                    "what_upgrade"
            }
        ]
    },

    upgrade_done: {
        speaker:
        "Erwin",

        text: "All done now, enjoy and be carefull with it",

        options: [
            {
                text: "Continue",

                speak:
                    false,

                action:
                    "level4"
            }
        ]
    }
}
/* =========================================
   START LEVEL
========================================= */

startButton.addEventListener(
    "click",
    startLevel1
);


function startLevel1() {

    startScreen.classList.add(
        "hidden"
    );

    minigameScreen.classList.add(
        "hidden"
    );

    endScreen.classList.add(
        "hidden"
    );

    reactorMinigameFrame.src =
        "about:blank";

    gameState.minigameCompleted =
        false;

    setScene(
        "home"

    );

    startDialogue(
        "level_start"
    );
}


window.startLevel1 =
    startLevel1;

/* =========================================
   START DIALOGUE
========================================= */

export function startDialogue(nodeId) {

    gameState.dialogueActive = true;

    showBreakfastOverlay(nodeId);

    normalBar.classList.add(
        "hidden"
    );

    dialogueContent.classList.remove(
        "hidden"
    );


    showNode(
        nodeId
    );
}


/* =========================================
   SHOW NODE
========================================= */

function showNode(nodeId) {

    const node = dialogueTree[nodeId];

    if (!node) {

        console.error(
            "Dialogue node bestaat niet:",
            nodeId
        );

        closeDialogue();

        return;
    }

    gameState.currentNodeId = nodeId;

    gameState.selectedOption = 0;

    gameState.inputLocked =
        false;

    gameState.waitingForContinue =
        false;

    gameState.pendingOption = null;

    gameState.dialogueActive = true;


    normalBar.classList.add(
        "hidden"
    );

    dialogueContent.classList.remove(
        "hidden"
    );


    bottomBar.classList.remove(
        "player-speaking",
        "ai-speaking",
        "waiting"
    );


    if (
        node.type === "ai"
    ) {

        bottomBar.classList.add(
            "ai-speaking"
        );
    }


    dialogueSpeaker.textContent =
        node.speaker || "";

    dialogueText.textContent =
        node.text || "";

    dialogueHelp.textContent =
        "↑ ↓ SELECT   ENTER / 1-4";


    renderOptions();
}


/* =========================================
   RENDER OPTIONS
========================================= */

function renderOptions() {

    const node =
        dialogueTree[gameState.currentNodeId];


    dialogueOptions.innerHTML =
        "";


    if (
        !node ||
        !node.options
    ) {
        return;
    }


    node.options.forEach(
        (option, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";

            button.className =
                "dialogue-option";


            if (
                index === gameState.selectedOption
            ) {

                button.classList.add(
                    "selected"
                );
            }


            const number =
                document.createElement(
                    "span"
                );

            number.className =
                "option-number";

            number.textContent =
                `${index + 1}.`;


            const label =
                document.createElement(
                    "span"
                );

            label.textContent =
                option.text;


            button.appendChild(
                number
            );

            button.appendChild(
                label
            );


            button.addEventListener(
                "mouseenter",
                () => {

                    if (
                        gameState.inputLocked ||
                        gameState.waitingForContinue
                    ) {
                        return;
                    }

                    gameState.selectedOption = index;

                    updateSelection();
                }
            );


            button.addEventListener(
                "click",
                () => {

                    chooseOption(
                        index
                    );
                }
            );


            dialogueOptions.appendChild(
                button
            );
        }
    );
}


/* =========================================
   CHOOSE OPTION
========================================= */

function chooseOption(index) {

    if (
        gameState.inputLocked ||
        gameState.waitingForContinue
    ) {
        return;
    }


    const node =
        dialogueTree[gameState.currentNodeId];


    if (
        !node ||
        !node.options
    ) {
        return;
    }


    const option =
        node.options[index];


    if (!option) {
        return;
    }


    gameState.inputLocked = true;


    /*
        speak:false betekent dat de keuze
        een ACTION is.

        Bijvoorbeeld:
        - Start working
        - Go to work
        - Get up

        Die worden niet als Y/N dialogue
        weergegeven.
    */

    if (
        option.speak === false
    ) {

        runOption(
            option
        );

        return;
    }


    /* =====================================
       Y/N PRAAT

       GEEN AUTOMATISCHE TIMER.

       De zin blijft staan totdat de speler
       klikt, ENTER of SPACE indrukt.
    ====================================== */

    gameState.pendingOption =
        option;

    gameState.waitingForContinue = true;


    bottomBar.classList.remove(
        "ai-speaking"
    );

    bottomBar.classList.add(
        "player-speaking",
        "waiting"
    );


    dialogueSpeaker.textContent =
        "Y/N";

    dialogueText.textContent =
        option.text;

    dialogueOptions.innerHTML =
        "";

    dialogueHelp.textContent =
        "ENTER / SPACE / CLICK TO CONTINUE";
}


/* =========================================
   CONTINUE DIALOGUE
========================================= */

function continueDialogue() {

    if (
        !gameState.waitingForContinue ||
        !gameState.pendingOption
    ) {
        return;
    }

    const option = gameState.pendingOption;

    gameState.pendingOption = null;

    gameState.waitingForContinue = false;

    gameState.inputLocked = false;


    bottomBar.classList.remove(
        "player-speaking",
        "waiting"
    );


    dialogueHelp.textContent =
        "↑ ↓ SELECT   ENTER / 1-4";


    runOption(
        option
    );
}


/* =========================================
   CLICK DIALOGUE TO CONTINUE
========================================= */

dialogueContent.addEventListener(
    "click",
    event => {

        /*
            Klik op een keuze moet niet
            onmiddellijk ook verdergaan.
        */

        if (
            event.target.closest(
                ".dialogue-option"
            )
        ) {
            return;
        }


        if (
            gameState.waitingForContinue
        ) {

            continueDialogue();
        }
    }
);


/* =========================================
   RUN OPTION
========================================= */

function runOption(option) {

    gameState.inputLocked =
        false;


    if (
        option.next
    ) {

        showNode(
            option.next
        );

        return;
    }


    if (
        option.action
    ) {

        runAction(
            option.action
        );

        return;
    }

    closeDialogue();
}



/* =========================================
   KEYBOARD
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            !gameState.dialogueActive
        ) {
            return;
        }


        /* =================================
           WAITING FOR CONTINUE
        ================================== */

        if (
            gameState.waitingForContinue
        ) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                continueDialogue();
            }

            return;
        }


        if (
            gameState.inputLocked
        ) {
            return;
        }


        const node =
            dialogueTree[gameState.currentNodeId];


        if (
            !node ||
            !node.options ||
            node.options.length === 0
        ) {
            return;
        }


        /* NUMBER KEYS */

        if (
            event.key >= "1" &&
            event.key <= "9"
        ) {

            const index =
                Number(event.key) - 1;


            if (
                index <
                node.options.length
            ) {

                chooseOption(
                    index
                );
            }

            return;
        }


        /* DOWN */

        if (
            event.key === "ArrowDown"
        ) {

            event.preventDefault();

            gameState.selectedOption++;


            if (
                gameState.selectedOption >=
                node.options.length
            ) {

                gameState.selectedOption =
                    0;
            }


            updateSelection();

            return;
        }


        /* UP */

        if (
            event.key === "ArrowUp"
        ) {

            event.preventDefault();

            gameState.selectedOption--;


            if (
                gameState.selectedOption < 0
            ) {

                gameState.selectedOption =
                    node.options.length - 1;
            }


            updateSelection();

            return;
        }


        /* ENTER */

        if (
            event.key === "Enter"
        ) {

            event.preventDefault();

            chooseOption(
                gameState.selectedOption
            );
        }
    }
);


/* =========================================
   UPDATE SELECTION
========================================= */

function updateSelection() {

    const buttons =
        document.querySelectorAll(
            ".dialogue-option"
        );


    buttons.forEach(
        (button, index) => {

            button.classList.toggle(
                "selected",
                index === gameState.selectedOption
            );
        }
    );
}


/* =========================================
   LEVEL TRANSITION
========================================= */

function goToLevel(level) {

    closeDialogue();

    endScreen.classList.remove(
        "hidden"
    );


    if (
        level === 2
    ) {

        endTitle.textContent =
            "GO TO LEVEL 2";

        endText.textContent =
            "Level 1 complete.";


        /*
        Later:

        window.location.href =
            "../level2/level2.php";
        */
    }


    else if (
        level === 3
    ) {

        endTitle.textContent =
            "GO TO LEVEL 3";

        endText.textContent =
            "Level 1 complete.";


        /*
        Later:

        window.location.href =
            "../level3/level3.php";
        */
    }
}


/* =========================================
   RESTART
========================================= */

restartButton.addEventListener(
    "click",
    () => {

        endScreen.classList.add("hidden");

        minigameScreen.classList.add("hidden");

        reactorMinigameFrame.src = "about:blank";

        startScreen.classList.remove("hidden");

        gameState.minigameCompleted = false;

        gameState.currentScene = "home";

        gameState.waitingForContinue = false;

        gameState.pendingOption = null;


    }
);

/* =========================================
   HOME HOTSPOTS
========================================= */

hotspotKitchen.addEventListener(
    "click",
    () => {

        if (gameState.dialogueActive) {
            return;
        }
        showBreakfastOverlay();
        startDialogue("eat");
    }
);

hotspotBed.addEventListener(
    "click",
    () => {

        if (gameState.dialogueActive) {
            return;
        }

        startDialogue("try_sleep");
    }
);

hotspotComputer.addEventListener(
    "click",
    () => {

        if (gameState.dialogueActive) {
            return;
        }

        startDialogue("computer");
    }
);


