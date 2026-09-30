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

    restartButton,
    hotspotKitchen,
    hotspotBed,
    hotspotComputer,
    hotspotWork,
    hotspotBoss
} from "./element.js";


import {
    setScene,
    hideAllHotspots,
    showNormalBar,
    showBreakfastOverlay
} from "./scene.js";


import {
    gameState
} from "./gameState.js";


import {
    closeDialogue,
    runAction
} from "./action.js";

const hidden = document.getElementById('hidden');
let gameComplete = 'not done';
if (hidden) {
    gameComplete = hidden.dataset.myValue;
}

/* =========================================
   DIALOGUE TREE
========================================= */

let breakfast =
    false;


const dialogueTree = {

    /* =====================================
       START
    ====================================== */

    level_start: {

        speaker:
            "NARRATOR",

        text:
            "You wake up alone in ur home",

        options: [
            {
                text:
                    "Continue",

                speak:
                    false,

                action:
                    "close"
            }
        ]
    },


    /* =====================================
       SLEEP
    ====================================== */

    try_sleep: {

        speaker:
            "NARRATOR",

        text:
            "You just woke up so u are not tired yet",

        options: [
            {
                text:
                    "Continue sleeping",

                speak:
                    false,

                next:
                    "continue_sleeping"
            },

            {
                text:
                    "Get up",

                speak:
                    false,

                action:
                    "close"
            }
        ]
    },


    continue_sleeping: {

        speaker:
            "AI",

        type:
            "ai",

        text:
            "Your AI assistant warns you about the consequences of not working",

        options: [
            {
                text:
                    "Continue sleeping",

                speak:
                    false,

                next:
                    "ai_shock"
            },

            {
                text:
                    "Get up",

                speak:
                    false,

                action:
                    "close"
            }
        ]
    },


    ai_shock: {

        speaker:
            "SYSTEM",

        type:
            "ai",

        text:
            "AI chip shocks you awake",

        options: [
            {
                text:
                    "Get up",

                speak:
                    false,

                action:
                    "close"
            }
        ]
    },


    /* =====================================
       FOOD
    ====================================== */

    eat: {

        speaker:
            "NARRATOR",

        text:
            "You bake some eggs",

        options: [
            {
                text:
                    "leave",

                speak:
                    false,

                action:
                    "action_Outside"
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
       COMPUTER
    ====================================== */

    computer: {

        speaker:
            "NARRATOR",

        text:
            "Computer no workie today :(.",

        options: [
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
       LEAVE HOME
    ====================================== */

    outside_caravan: {

        speaker:
            "NARRATOR",

        text:
            "You're outside your 'luxurious' home",

        options: [
            {
                text:
                    "Head to work",

                speak:
                    false,

                action:
                    "action_go_to_work"
            }
        ]
    },


    /* =====================================
       WALK TO WORK DAY
    ====================================== */

    walk_to_work: {

        speaker:
            "NARRATOR",

        text:
            "You're enroute to work, shame you couldn't keep your car",

        options: [
            {
                text:
                    "Continue",

                speak:
                    false,

                action:
                    "action_OutsideWorkDay"
            }
        ]
    },


    /* =====================================
       WINSTON NUCLEAR POWER PLANT
    ====================================== */

    winston_nuclear_powerplant: {

        speaker:
            "NARRATOR",

        text:
            "Operational since the discovery of oil in Serstan in 2035",

        options: [
            {
                text:
                    "Enter building",

                speak:
                    false,

                action:
                    "action_work"
            }
        ]
    },


    work: {

        speaker:
            "NARRATOR",

        text:
            "You have arrived at work,\nyour favorite coworker Jim is waving at you",

        options: [
            {
                text:
                    "Continue",

                speak:
                    false,

                action:
                    "action_work"
            }
        ]
    },


    /* =====================================
       JIM INTRO
    ====================================== */

    jim_intro: {

        speaker:
            "JIM",

        text:
            "Hi Y/N how are you doing; Did you hear that they upgraded our boss last night? I think he's trying to suck up to our new 'overlords' by looking less human",

        options: [
            {
                text:
                    "First time I'm hearing about it.",

                action:
                    "action_jimTwo"
            },

            {
                text:
                    "I slept like shit last night.",

                action:
                    "action_jimThree"
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

                action:
                    "action_jimFour"
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

                action:
                    "action_jimFour"
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

    gameState.dialogueActive =
        true;


    /*
        Hierdoor wordt de onderste balk
        groter tijdens dialogue.
    */

    bottomBar.classList.add(
        "dialogue-open"
    );


    showBreakfastOverlay(
        nodeId
    );


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

    const node =
        dialogueTree[
        nodeId
        ];


    if (!node) {

        console.error(
            "Dialogue node bestaat niet:",
            nodeId
        );


        closeDialogue();

        return;
    }


    gameState.currentNodeId =
        nodeId;


    gameState.selectedOption =
        0;


    gameState.inputLocked =
        false;


    gameState.waitingForContinue =
        false;


    gameState.pendingOption =
        null;


    gameState.dialogueActive =
        true;


    /*
        Zorg dat de balk groot blijft
        wanneer we naar de volgende
        dialogue-node gaan.
    */

    bottomBar.classList.add(
        "dialogue-open"
    );


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
        node.type ===
        "ai"
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
        dialogueTree[
        gameState.currentNodeId
        ];


    dialogueOptions.innerHTML =
        "";


    if (
        !node ||
        !node.options
    ) {

        return;
    }


    node.options.forEach(
        (
            option,
            index
        ) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "dialogue-option";


            if (
                index ===
                gameState.selectedOption
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


                    gameState.selectedOption =
                        index;


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
        dialogueTree[
        gameState.currentNodeId
        ];


    if (
        !node ||
        !node.options
    ) {

        return;
    }


    const option =
        node.options[
        index
        ];


    if (!option) {

        return;
    }


    gameState.inputLocked =
        true;


    /*
        speak:false betekent dat iets
        een actie is en niet wordt
        uitgesproken door Y/N.
    */

    if (
        option.speak ===
        false
    ) {

        runOption(
            option
        );


        return;
    }


    /* =====================================
       Y/N PRAAT
    ====================================== */

    gameState.pendingOption =
        option;


    gameState.waitingForContinue =
        true;


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


    const option =
        gameState.pendingOption;


    gameState.pendingOption =
        null;


    gameState.waitingForContinue =
        false;


    gameState.inputLocked =
        false;


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
            Als je op een antwoord klikt,
            moet die klik niet meteen
            ook de dialogue doorgaan.
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
                event.key ===
                "Enter" ||
                event.key ===
                " "
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
            dialogueTree[
            gameState.currentNodeId
            ];


        if (
            !node ||
            !node.options ||
            node.options.length === 0
        ) {

            return;
        }


        /* =================================
           NUMBER KEYS
        ================================== */

        if (
            event.key >= "1" &&
            event.key <= "9"
        ) {

            const index =
                Number(
                    event.key
                ) - 1;


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


        /* =================================
           DOWN
        ================================== */

        if (
            event.key ===
            "ArrowDown"
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


        /* =================================
           UP
        ================================== */

        if (
            event.key ===
            "ArrowUp"
        ) {

            event.preventDefault();


            gameState.selectedOption--;


            if (
                gameState.selectedOption <
                0
            ) {

                gameState.selectedOption =
                    node.options.length - 1;
            }


            updateSelection();


            return;
        }


        /* =================================
           ENTER
        ================================== */

        if (
            event.key ===
            "Enter"
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
        (
            button,
            index
        ) => {

            button.classList.toggle(
                "selected",
                index ===
                gameState.selectedOption
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

        endScreen.classList.add(
            "hidden"
        );


        minigameScreen.classList.add(
            "hidden"
        );


        reactorMinigameFrame.src =
            "about:blank";


        startScreen.classList.remove(
            "hidden"
        );


        gameState.minigameCompleted =
            false;


        gameState.currentScene =
            "home";


        gameState.waitingForContinue =
            false;


        gameState.pendingOption =
            null;
    }
);


/* =========================================
   HOME HOTSPOTS
========================================= */

hotspotKitchen.addEventListener(
    "click",
    () => {

        if (
            gameState.dialogueActive
        ) {

            return;
        }


        showBreakfastOverlay();


        startDialogue(
            "eat"
        );
    }
);


hotspotBed.addEventListener(
    "click",
    () => {

        if (
            gameState.dialogueActive
        ) {

            return;
        }


        startDialogue(
            "try_sleep"
        );
    }
);


hotspotComputer.addEventListener(
    "click",
    () => {

        if (
            gameState.dialogueActive
        ) {

            return;
        }


        startDialogue(
            "computer"
        );
    }
);


/* =========================================
   WORK HOTSPOTS
========================================= */

hotspotjim.addEventListener(
    "click",
    () => {

        if (
            gameState.dialogueActive
        ) {

            return;
        }


        runAction(
            "action_jimOne"
        );
    }
);


hotspotWork.addEventListener(
    "click",
    () => {

        if (
            gameState.dialogueActive
        ) {

            return;
        }


        runAction(
            "action_start_minigame"
        );
    }
);


hotspotBoss.addEventListener(
    "click",
    () => {

        if (
            gameState.dialogueActive
        ) {

            return;
        }


        runAction(
            "action_boss"
        );


        startDialogue(
            "boss_task"
        );
    }
);