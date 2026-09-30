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

    hotspotjim,

    restartButton, hotspotKitchen, hotspotBed, hotspotComputer, hotspotWork, hotspotBoss
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
            "There is someone waiting infront of your door",

        options: [
            {
                text:
                    "Hello? Who are you?",

                speak:
                    false,

                next:
                    "sticky"
            },
            {
                text:
                    "GO AWAY STRANGER!",

                speak:
                    false,

                next:
                    "calm"
            },
            {
                text:
                    "Are you the one that gave me the sticky note?",

                speak:
                    false,

                next:
                    "indeed"
            }
        ]
    },



    /* =====================================
       STICKY
    ====================================== */

    sticky: {

        speaker:
            "???",

        text:
            "I am the one who put the sticky note there, u should really start lockin youre door by the way.",

        options: [
            {
                text:
                    "What do you want?",

                speak:
                    false,

                next:
                    "intro"
            },
            {
                text:
                    "What is your name?",

                speak:
                    false,

                next:
                    "name"
            }
        ]
    },


    /* =====================================
       FOOD
    ====================================== */

    name: {

        speaker:
            "???",

        text:
            "O I never introduced myself did I?",

        options: [
            {
                text: "No u did not",
                speak: false,
                next: "intro",

            },
        ]
    },


    /* =====================================
       Computah
    ====================================== */

    intro: {

        speaker:
            "Stefanie",

        text:
            "I am Stefanie, leader of the rebels against the AI and I want you to join me.",

        options: [
            {
                text:
                    "Okay I will join you what is the plan?",

                speak:
                    false,

                next:
                    "plan"
            },
            {
                text:
                    "No thanks not interested.",

                speak:
                    false,

                next:
                    "really"
            }
        ]
    },


    /* =====================================
    LEAVE HOME
    ====================================== */

    plan: {

        speaker:
            "Stefanie",

        text:
            "Okay you wanna hear the idea it is simple.",

        options: [
            {
                text: "Listen to the plan",
                speak: false,
                next: "dissapoint"
            }
        ]
    },

    /* =====================================
       WALK TO WORK DAY
    ====================================== */

    dissapoint: {

        speaker:
            "Stefanie",

        text:
            "So do not dissapoint this al counts on if you are able to pull this of",

        options: [
            {
                text:
                    "Lets do this!",

                speak:
                    false,

                action: "level8",

            }
        ]
    },
    /* =====================================
           WINSTON NUCLEAR POWER PLANT
        ====================================== */

    calm: {

        speaker:
            "???",

        text:
            "Calm down you I come in peace",

        options: [
            {
                text:
                    "What do you want?",

                speak:
                    false,

                next:
                    "want"
            },
            {
                text:
                    "Leave",

                speak:
                    false,

                next:
                    "leave"
            }
        ]
    },

    want: {

        speaker:
            "???",

        text:
            "You got my sticky note correct?",

        options: [
            {
                text:
                    "No I did not",

                speak:
                    false,

                next:
                    "No"
            },
            {
                text:
                    "Yes I did",

                speak:
                    false,

                next:
                    "Yes"
            }
        ]
    },
    yes: {

        speaker:
            "???",

        text:
            "Great I hope you managed to decode the message.",

        options: [
            {
                text:
                    "Yes I did",

                speak:
                    false,

                next: "yesdid",

            },
            {
                text:
                    "No I did not",

                speak:
                    false,

                next: "nodid",

            },
        ]
    },

    indeed: {

        speaker:
            "???",

        text:
            "Yes I am indeed. I hope you managed to decode the message",

        options: [
            {
                text:
                    "Yes I did",

                speak:
                    false,

                next: "yesdid",

            },
            {
                text:
                    "No I did not",

                speak:
                    false,

                next: "nodid",

            },
        ]
    },
    yesdid: {

        speaker:
            "???",

        text:
            "I knew you would be able to decode it, I have been keeping a close eye on you you know.",

        options: [
            {
                text:
                    "Continu",

                speak:
                    false,

                next: "join",

            }
        ]
    },
    join: {

        speaker:
            "???",

        text:
            "So do you want to join.",

        options: [
            {
                text:
                    "Yes I want to join",

                speak:
                    false,

                next: "iwant",

            },
            {
                text:
                    "Join what?",

                speak:
                    false,

                next: "what",

            },
            {
                text:
                    "No I do not want to join so go away",

                speak:
                    false,

                next: "nonot",

            }
        ]
    },
    yesdid: {

        speaker:
            "???",

        text:
            "Great okay!.",

        options: [
            {
                text:
                    "Continu",

                speak:
                    false,

                next: "intro",

            }
        ]
    },
    what: {

        speaker:
            "???",

        text:
            "I thought u said that u decoded the message. U know that you could have just said no and I would have told you?.",

        options: [
            {
                text:
                    "Continu",

                speak:
                    false,

                next: "said",

            }
        ]
    },
    said: {

        speaker:
            "???",

        text:
            "It said: Are you not tired of the AI that is controlling us join the rebels. See you soon...",

        options: [
            {
                text:
                    "Continu",

                speak:
                    false,

                next: "intro",

            }
        ]
    },
    nonot: {

        speaker:
            "???",

        text:
            "O okay then not I guess have fun with the very little life you have left.",

        options: [
            {
                text:
                    "Continu",

                speak:
                    false,

                action: "level9",

            }
        ]
    },



    /* =====================================
       JIM INTRO
    ====================================== */

    No: {

        speaker:
            "???",

        text:
            "I put it there so I know u got it.",

        options: [
            {
                text:
                    "Okay I got it",

                speak:
                    false,

                action:
                    "Decode"
            },
            {
                text:
                    "I really did not see it",

                speak:
                    false,

                action:
                    "funny"
            }
        ]
    },

    funny: {

        speaker:
            "???",

        text:
            "Okay Mr funny pants then not. Enjoy youre last few moments while you can",

        options: [
            {
                text:
                    "Continu",

                speak:
                    false,

                action:
                    "level9"
            }
        ]
    },


    /* =====================================
       JIM UPGRADE
    ====================================== */

    jim_upgrade: {

        speaker:
            "JIM",

        text:
            "Well it got a crazy upgrade to its hearing so it might hear us right now. Oh by the way do not forget to hit your quota! You know what happened to Lisa when she didn't.",

        options: [
            {
                text:
                    "I don't recall, what happened?",

                action: "action_jimFour"
            },

            {
                text:
                    "Oh, I remember her sudden disappearance now ",

                next:
                    "jim_remember"
            },

            {
                text:
                    "Bye.",

                action:
                    "action_leave_jim"
            }
        ]
    },


    /* =====================================
       BAD SLEEP
    ====================================== */

    jim_bad_sleep: {

        speaker:
            "JIM",

        text:
            "That is shitty, even more important to not forget to hit your quota today then. You know what happened to Lisa when she fell behind.",

        options: [
            {
                text:
                    "Don't worry about it, but I don't recall what happened to her?",

                action: "action_jimFour"
            },

            {
                text:
                    "Oh, I remember her sudden disappearance now ",

                next:
                    "jim_remember"
            },

            {
                text:
                    "Bye",

                action:
                    "action_leave_jim"
            }
        ]
    },


    /* =====================================
       LISA
    ====================================== */

    jim_lisa: {

        speaker:
            "JIM",

        text:
            "You really do have problems remembering things don't you? She got taken away by them to some facility and we have not seen her since.",

        options: [
            {
                text:
                    "O yeah that is what happened.",

                next:
                    "jim_work_end"
            }
        ]
    },


    jim_work_end: {

        speaker:
            "JIM",

        text:
            "Well i better get to work before the same happens to me.",

        options: [
            {
                text:
                    "Bye.",

                action:
                    "action_leave_jim"
            }
        ]
    },


    jim_remember: {

        speaker:
            "JIM",

        text:
            "It is such a shame that that happened. Well I better get to work before I get the same fate",

        options: [
            {
                text:
                    "Bye.",

                action:
                    "action_leave_jim"
            }
        ]
    },


    /* =====================================
       BOSS
    ====================================== */

    boss_task: {

        speaker:
            "AI",

        type:
            "ai",

        text:
            "Morning Y/N, good to see you are on time today. The task for today is to manage the factory and put in the code, even you can manage that, right?",

        options: [
            {
                text:
                    "Start working",

                speak:
                    false,

                action:
                    "action_start_minigame"
            },

            {
                text:
                    "Leave",

                speak:
                    false,

                action:
                    "close"
            }
        ]
    },


    /* =====================================
       BOSS AFTER MINIGAME
    ====================================== */

    boss_after: {

        speaker:
            "AI",

        type:
            "ai",

        text:
            "...",

        options: [
            {
                text:
                    "Leave",

                speak:
                    false,

                action:
                    "close"
            }
        ]
    },


    /* =====================================
       GO HOME
    ====================================== */

    go_home: {

        speaker:
            "NARRATOR",

        text:
            "Go home.",

        options: [
            {
                text:
                    "Go to home",

                speak:
                    false,

                action:
                    "level2"
            },

            {
                text:
                    "Back",

                speak:
                    false,

                action:
                    "close"
            }
        ]
    },


    /* =====================================
       BAR
    ====================================== */

    go_bar: {

        speaker:
            "NARRATOR",

        text:
            "Go bar",

        options: [
            {
                text:
                    "Go to the bar",

                speak:
                    false,

                action:
                    "level3"
            },

            {
                text:
                    "Back",

                speak:
                    false,

                action:
                    "close"
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
/* =========================================
   WORK HOTSPOTS
========================================= */

hotspotjim.addEventListener(
    "click",
    () => {

        if (gameState.dialogueActive) {
            return;
        }

        runAction("action_jimOne")
    }
);

hotspotWork.addEventListener(
    "click",
    () => {

        if (gameState.dialogueActive) {
            return;
        }

        runAction("action_start_minigame")
    }
);

hotspotBoss.addEventListener(
    "click",
    () => {

        if (gameState.dialogueActive) {
            return;
        }

        runAction("action_boss")

        startDialogue("boss_task");
    }
);