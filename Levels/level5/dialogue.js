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
const hidden = document.getElementById('hidden');
let gameComplete = 'not done';
if (hidden) {
    gameComplete = hidden.dataset.myValue;
}
const dialogueTree = {
    level_start: {
        speaker:
            "NARRATOR",
        text:
            "You arrive at work.",

        options: [
            {
                text:
                    "Talk to your boss",

                speak:
                    false,

                next:
                    "boss"
            },
            {
                text:
                    "Work",

                speak:
                    false,

                action:
                    "start_minigame"//check
            }
        ]
    },

    boss: {
        speaker: "boss",
        text: "Hi Y/N ready for a day full of work? The others are gone now so no more distractions for you. You know what the task is for today?",

        options: [
            {
                text:
                    "Where is everyone?",

                speak:
                    false,

                next: "quota"
            },
            {
                text:
                    "What is my task today",

                speak:
                    false,

                next: "minigame_explanation"
            },
            {
                text:
                    "I got a strange letter, do you know what it is?",

                speak:
                    false,

                next: "strange_letter"
            },
            {
                text:
                    "bye",

                speak:
                    false,

                next: "level_start"
            }
        ]
    },

    quota: {
        speaker:
            "AI",
        text: "They did not meet their quota yesterday.",

        options: [
            {
                text: "Continue",

                speak: false,

                next:
                    "boss"
            }
        ]
    },

    minigame_explanation: {
        speaker:
            "AI",
        text: "Today I want you to fix reactor 2. The system of that reactor has recently crashed and nobody has fixed it yet. \n The way you fix the system is by pressing the numbers in the right order.",

        options: [
            {
                text: "Continue",

                speak: false,

                next: "boss"
            }
        ]
    },

    strange_letter: {
        speaker:
            "AI",
        text: "Can you show me?",

        options: [
            {
                text: "Yes, it's here in my pocket.",

                speak: false,

                next: "show_it"
            },
            {
                text: "No I left it at home",

                speak: false,

                next: "okay"
            }
        ]
    },

    show_it: {
        speaker:
            "AI",
        text: "I am so dissapointed in you, have a good life rotting in hell",

        options: [
            {
                text: "Game over",

                speak: false,

                action: "game_over"
            }
        ]
    },

    okay: {
        speaker:
            "AI",
        text: "Okay",

        options: [
            {
                text: "Continue",

                speak: false,

                next: "boss"
            }
        ]
    },

    okay: {
        speaker:
            "AI",
        text: "Okay",

        options: [
            {
                text: "Continue",

                speak: false,

                next: "game_over"
            }
        ]
    },

    minigame_done: {
        speaker: "AI",
        text: "Goodjob! Tomorow after work we got something for you!",

        options: [
            {
                text: "Ok thanks!",
                speak: false,
                next: "finish_work"
            }
        ]
    },

    finish_work: {
        speaker: "Narrator",
        text: "",

        options: [
            {
                text: "Go to bar",
                speak: false,
                action: "level6"
            },
            {
                text: "Go home",
                speak: false,
                action: "level7"
            }
        ]
    }
};


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

    if (gameComplete === "done") {
        startDialogue(
            "minigame_done"
        );
    } else {
        startDialogue(
            "level_start"
        );
    }
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

// hotspotKitchen.addEventListener(
//     "click",
//     () => {

//         if (gameState.dialogueActive) {
//             return;
//         }
//         showBreakfastOverlay();
//         startDialogue("eat");
//     }
// );

// hotspotBed.addEventListener(
//     "click",
//     () => {

//         if (gameState.dialogueActive) {
//             return;
//         }

//         startDialogue("try_sleep");
//     }
// );

// hotspotComputer.addEventListener(
//     "click",
//     () => {

//         if (gameState.dialogueActive) {
//             return;
//         }

//         startDialogue("computer");
//     }
// );

