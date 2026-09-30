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

    restartButton, hotspotKitchen, hotspotBed, hotspotComputer, hotspotWork, hotspotBoss, hotspotsteven, hotspotsbar
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

        speaker: "NARRATOR",
        text: "You've just left work, ",
        options: [
            {
                text: "Continue",
                speak: false,
                action: "action_go_home"
            }
        ]
    },

    /* =====================================
       SLEEP
    ====================================== */
    try_sleep: {

        speaker: "NARRATOR",

        text: "You just woke up so u are not tired yet",

        options: [
            {
                text: "Continue sleeping",
                speak: false,
                next: "continue_sleeping"
            },

            {
                text: "Get up",
                speak: false,
                action: "close"
            }
        ]
    },


    continue_sleeping: {

        speaker: "AI",

        type: "ai",

        text: "Your AI assistant warns you about the consequences of not working",

        options: [
            {
                text: "Continue sleeping",

                speak: false,

                next: "ai_shock"
            },

            {
                text: "Get up",
                speak: false,
                action: "close"
            }
        ]
    },


    ai_shock: {

        speaker: "SYSTEM",
        type: "ai",
        text: "AI chip shocks you awake",

        options: [
            {
                text: "Get up",
                speak: false,
                action: "close"
            }
        ]
    },


    /* =====================================
       FOOD
    ====================================== */

    eat: {

        speaker: "NARRATOR",

        text: "You bake some eggs",

        options: [
            {
                text: "leave",
                speak: false,
                action: "action_Outside",

            },

            {
                text: "Back",
                speak: false,
                action: "close"
            }
        ]
    },


    /* =====================================
       Computah
    ====================================== */

    computer: {

        speaker: "NARRATOR",

        text: "Computer no workie today :(.",

        options: [
            {
                text: "Back",
                speak: false,
                action: "close"
            }
        ]
    },


    /* =====================================
    LEAVE HOME
    ====================================== */

    outside_caravan: {

        speaker: "NARRATOR",
        text: "You're outside your 'luxurious' home",

        options: [
            {
                text: "Enter home",
                speak: false,
                action: "action_enter_home"
            }
        ]
    },

    /* =====================================
       WALK TO WORK DAY
    ====================================== */

    walk_home: {

        speaker: "NARRATOR",

        text: "You're on your way home. Erwin's bar is just around the corner",

        options: [
            {
                text: "Go home",
                speak: false,
                action: "action_Outside"
            },

            {
                text: "Go to Erwin's bar",
                speak: false,
                action: "action_go_bar"
            }
        ]
    },
    /* =====================================
      Outside bar
    ====================================== */

    outside_bar: {

        speaker: "NARRATOR",

        text: "Successful since I'm of drinking age",

        options: [
            {
                text: "go back",
                speak: false,
                action: "action_go_home"
            }
        ]
    },
    /* =====================================
           WINSTON NUCLEAR POWER PLANT
        ====================================== */

    winston_nuclear_powerplant: {

        speaker: "NARRATOR",

        text: "Operational since the discovery of oil in Serstan in 2035",

        options: [
            {
                text: "Enter building",
                speak: false,
                action: "action_work"
            }
        ]
    },

    work: {

        speaker: "NARRATOR",
        text: "You have arrived at work,\n your favorite coworker Jim is waving at you",

        options: [
            {
                text: "Continue",
                speak: false,
                action: "action_work"
            }
        ]
    },
    /* =====================================
       steven INTRO
    ====================================== */
    steven_intro: {

        speaker: "STEVEN",
        text: "GIVE. ME. YOUR. LEGS. \n haha just kidding, but seriously could you spare a dime Y/N? ",
        options: [
            {
                text: "I want to, but I'm kinda low on cash myself",

                action: "action_stevenTwo"

            },

            {
                text: "Sure Steven, it's going to getting your legs running again, right?",

                action: "action_stevenThree"
            },

            {
                text: "Bye.",

                action: "action_leave_steven"
            }
        ]
    },
    /* =====================================
       steven no money
    ====================================== */

    steven_no_money: {

        speaker: "STEVEN",
        text: "Oh don't worry about it Y/N. I already have enough for my next bottle anyway",

        options: [
            {
                text: "What about getting your legs working again?",

                next: "steven_legs",
            },

            {
                text:
                    "Bye.",

                action:
                    "action_leave_steven"
            }
        ]
    },


    /* =====================================
Steven will talk about his shutdown legs
    ====================================== */

    steven_legs: {

        speaker:
            "STEVEN",

        text:
            "Do you know how much it cost to get these guys working? I need to pay 1.5 times as much now \n which is 450 a month. \n even when these legs allowed me to work, I would only make 900 ",

        options: [

            {
                text:
                    "why did you get these legs to begin with anyway?",

                action:
                    "action_stevenFour"
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
       Steven will explain why he got the legs
    ====================================== */

    steven_explain: {

        speaker:
            "STEVEN",

        text:
            "Look man, this is all stupid in hindsight, but with bionic legs, they said they would pay me quadruple. \n I didn't like the idea, but you know I need to put my girls through college. \n guess what, after the surgery, they said their rates changed and could only pay 10% more. \n that increase doesn't even cover the monthly subscription on these tin cans.",

        options: [
            {
                text:
                    "That sucks man, I hope you can crawl out of this mess",

                next:
                    "steven_end"
            }
        ]
    },


    steven_end: {

        speaker:
            "STEVEN",

        text:
            "Sorry to bother you with my mess again Y/N.",

        options: [
            {
                text:
                    "Don't worry about it, I'll see you again soon.",

                action:
                    "action_leave_steven"
            }
        ]
    },


    steven_yes_money: {

        speaker:
            "STEVEN",

        text:
            "Excellent my friend, really excellent, this will get me one more glass",

        options: [
            {
                text:
                    "What about your clanker legs then?",

                next:
                    "steven_explain"
            }
        ]
    },


    /* =====================================
       Erwin 1
    ====================================== */

    erwin_intro: {

        speaker: "ERWIN",
        text: "Yooo Y/N, how's it going?",

        options: [
            {
                text: "Do you still have the good stuff?",

                next: "erwin_goodstuff",
            },

            {
                text: "Steven's outside again.",

                action: "action_erwin_about_steven"
            }
        ]
    },
    /* =====================================
      erwin GOODSTUFF
   ====================================== */
    erwin_goodstuff: {

        speaker: "ERWIN",
        text: "What kind of good stuff are we talking about here?",
        options: [
            {
                text: "I want an upgrade",

                action: "action_upgrade"

            },

            {
                text: "You know, your home made specialty \n which, isn't a drink, if you catch my drift",

                action: "action_drugs"
            },

            {
                text: "I've changed my mind, bye",

                action: "action_leave_erwin"
            }
        ]
    },
    /* =====================================
     erwin upgrade
  ====================================== */
    erwin_upgrade: {

        speaker: "ERWIN",
        text: "these are all used models, so the rate should be affordable, even for someone like you. \n So tell me, what do you want to upgrade?",
        options: [
            {
                text: "My eyes",

                action: "action_upgrade_eyes"

            },

            {
                text: "My legs",

                action: "action_upgrade_legs"
            },

            {
                text: "my arms",

                action: "action_upgrade_arms"
            },

            {
                text: "my HEART",

                action: "action_upgrade_heart"
            }
        ]
    },
    /* =====================================
      Erwin 2 about steven
   ====================================== */

    erwin_steven: {

        speaker: "ERWIN",
        text: "have you been giving him money again? I've really been getting sick of that guy. \n He sits outside here every night and bothers me when I refuse to serve him any more drinks",

        options: [
            {
                text: "That's his only comfort right now",

                next: "erwin_steven2",
            },


        ]
    },
    /* =====================================
      Erwin about steven
   ====================================== */

    erwin_steven2: {

        speaker: "ERWIN",
        text: "I don't have it in me to force him to leave. \n besides, if he leaves, another one will crawl here, and I'm not sure if they will be as friendly as our Steven here",

        options: [
            {
                text: "I hope he gets his shit together soon, anyhow, I'm here for the goodstuff",

                next: "erwin_goodstuff",
            },


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
    startLevel2
);


function startLevel2() {

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
        "OutsideWorkNight"

    );

    startDialogue(
        "level_start"
    );
}


window.startLevel2 =
    startLevel2;

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


            const label = document.createElement("span");

            label.textContent = option.text;

            button.appendChild(number);

            button.appendChild(label);

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
                    chooseOption(index);
                }
            );

            dialogueOptions.appendChild(button);
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


    const node = dialogueTree[gameState.currentNodeId];

    if (
        !node ||
        !node.options
    ) {
        return;
    }

    const option = node.options[index];


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

    if (option.speak === false) {
        runOption(option);
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
hotspotsteven.addEventListener(
    "click",
    () => {



        runAction("action_stevenOne")

    }


);
hotspotsbar.addEventListener(
    "click",
    () => {


        runAction("action_enter_bar")

    });