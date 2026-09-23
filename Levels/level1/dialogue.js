/* =========================================
   ELEMENTS
========================================= */

const startScreen =
    document.getElementById("start-screen");

const minigameScreen =
    document.getElementById("minigame-screen");

const endScreen =
    document.getElementById("end-screen");

const startButton =
    document.getElementById("start-button");

const reactorMinigameFrame =
    document.getElementById(
        "reactor-minigame-frame"
    );

const restartButton =
    document.getElementById("restart-button");


const bottomBar =
    document.getElementById("bottom-bar");

const normalBar =
    document.getElementById("normal-bar");

const dialogueContent =
    document.getElementById(
        "dialogue-content"
    );

const dialogueSpeaker =
    document.getElementById(
        "dialogue-speaker"
    );

const dialogueText =
    document.getElementById(
        "dialogue-text"
    );

const dialogueOptions =
    document.getElementById(
        "dialogue-options"
    );

const dialogueHelp =
    document.getElementById(
        "dialogue-help"
    );


const locationLabel =
    document.getElementById(
        "location-label"
    );

const barLocation =
    document.getElementById(
        "bar-location"
    );

const barHint =
    document.getElementById(
        "bar-hint"
    );

const sceneName =
    document.getElementById(
        "scene-name"
    );


const endTitle =
    document.getElementById(
        "end-title"
    );

const endText =
    document.getElementById(
        "end-text"
    );


/* =========================================
   HOTSPOTS
========================================= */

const hotspotBed =
    document.getElementById(
        "hotspot-bed"
    );

const hotspotFood =
    document.getElementById(
        "hotspot-food"
    );

const hotspotBoard =
    document.getElementById(
        "hotspot-board"
    );

const hotspotDoor =
    document.getElementById(
        "hotspot-door"
    );

const hotspotJim =
    document.getElementById(
        "hotspot-jim"
    );

const hotspotBoss =
    document.getElementById(
        "hotspot-boss"
    );

const hotspotWork =
    document.getElementById(
        "hotspot-work"
    );

const hotspotHome =
    document.getElementById(
        "hotspot-home"
    );

const hotspotBar =
    document.getElementById(
        "hotspot-bar"
    );


/* =========================================
   STATE
========================================= */

let currentScene =
    "home";

let currentNodeId =
    null;

let selectedOption =
    0;

let dialogueActive =
    false;

let inputLocked =
    false;

let waitingForContinue =
    false;

let pendingOption =
    null;

let minigameCompleted =
    false;


/* =========================================
   DIALOGUE TREE
========================================= */

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
                    "Go to work",

                speak:
                    false,

                next:
                    "walk_to_work"
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
       BOARD
    ====================================== */

    board: {

        speaker:
            "NARRATOR",

        text:
            "You check your board.",

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
       WALK TO WORK
    ====================================== */

    walk_to_work: {

        speaker:
            "NARRATOR",

        text:
            "You walk to work",

        options: [
            {
                text:
                    "Continue",

                speak:
                    false,

                next:
                    "arrive_work"
            }
        ]
    },


    arrive_work: {

        speaker:
            "NARRATOR",

        text:
            "You have arrived at work,\nyour coworker Jim is waving at u",

        options: [
            {
                text:
                    "Continue",

                speak:
                    false,

                action:
                    "show_work"
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
            "Hi Y/N how are you doing; Did you hear that they upgraded our boss last night?",

        options: [
            {
                text:
                    "No I have not heard it.",

                next:
                    "jim_upgrade"
            },

            {
                text:
                    "I slept like shit last night.",

                next:
                    "jim_bad_sleep"
            },

            {
                text:
                    "Bye.",

                action:
                    "leave_jim"
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
            "Well it got a crazy upgrade to its hearing so it might hear us right now, o by the way do not forget to hit ur quota u know what happend to Lisa when she didn't.",

        options: [
            {
                text:
                    "No I do not remeber what did happen?",

                next:
                    "jim_lisa"
            },

            {
                text:
                    "O yeah that is what happend.",

                next:
                    "jim_remember"
            },

            {
                text:
                    "Bye.",

                action:
                    "leave_jim"
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
            "O that is unfortunate but remember to hit ur quota today u know what happend to Lisa when she didn't.",

        options: [
            {
                text:
                    "No I do not remeber what did happen?",

                next:
                    "jim_lisa"
            },

            {
                text:
                    "Yeah I do remeber such a shame what happend.",

                next:
                    "jim_remember"
            },

            {
                text:
                    "Bye",

                action:
                    "leave_jim"
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
            "U really do have problems remembering things don't u? She got taken away by them to some facility and we have not seen her since.",

        options: [
            {
                text:
                    "O yeah that is what happend.",

                next:
                    "jim_work_end"
            }
        ]
    },


    jim_work_end: {

        speaker:
            "JIM",

        text:
            "Well i beter get to work before the same happens to me.",

        options: [
            {
                text:
                    "Bye.",

                action:
                    "leave_jim"
            }
        ]
    },


    jim_remember: {

        speaker:
            "JIM",

        text:
            "It is such a shame that that happend. Well I better get to work before I get the same fate",

        options: [
            {
                text:
                    "Bye.",

                action:
                    "leave_jim"
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
            "Hi Y/N good to see u are on time ur task for today is just to manage the factory and put in the code, goodluck and keep up the good work.",

        options: [
            {
                text:
                    "Start working",

                speak:
                    false,

                action:
                    "start_minigame"
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

    minigameCompleted =
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
   SCENES
========================================= */

function setScene(scene) {

    currentScene =
        scene;

    hideAllHotspots();


    /* HOME */

    if (
        scene === "home"
    ) {

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
                ".home-hotspot"
            )
            .forEach(
                hotspot => {
                    hotspot.classList.remove(
                        "hidden"
                    );
                }
            );
    }


    /* WORK */

    else if (
        scene === "work"
    ) {

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
                ".work-hotspot"
            )
            .forEach(
                hotspot => {
                    hotspot.classList.remove(
                        "hidden"
                    );
                }
            );
    }


    /* WORK AFTER MINIGAME */

    else if (
        scene === "work_after"
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

        hotspotJim.classList.remove(
            "hidden"
        );

        hotspotBoss.classList.remove(
            "hidden"
        );


        /*
            Nu verschijnen ook:
            - Go home
            - Go bar
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


    showNormalBar();
}


/* =========================================
   HIDE HOTSPOTS
========================================= */

function hideAllHotspots() {

    document
        .querySelectorAll(
            ".hotspot"
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
   NORMAL BAR
========================================= */

function showNormalBar() {

    dialogueActive =
        false;

    currentNodeId =
        null;

    selectedOption =
        0;

    inputLocked =
        false;

    waitingForContinue =
        false;

    pendingOption =
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


/* =========================================
   HOME HOTSPOTS
========================================= */

hotspotBed.addEventListener(
    "click",
    () => {

        if (dialogueActive) {
            return;
        }

        startDialogue(
            "try_sleep"
        );
    }
);


hotspotFood.addEventListener(
    "click",
    () => {

        if (dialogueActive) {
            return;
        }

        startDialogue(
            "eat"
        );
    }
);


hotspotBoard.addEventListener(
    "click",
    () => {

        if (dialogueActive) {
            return;
        }

        startDialogue(
            "board"
        );
    }
);


hotspotDoor.addEventListener(
    "click",
    () => {

        if (dialogueActive) {
            return;
        }

        startDialogue(
            "walk_to_work"
        );
    }
);


/* =========================================
   WORK HOTSPOTS
========================================= */

hotspotJim.addEventListener(
    "click",
    () => {

        if (dialogueActive) {
            return;
        }

        startDialogue(
            "jim_intro"
        );
    }
);


hotspotBoss.addEventListener(
    "click",
    () => {

        if (dialogueActive) {
            return;
        }


        if (
            minigameCompleted
        ) {

            startDialogue(
                "boss_after"
            );

        }

        else {

            startDialogue(
                "boss_task"
            );

        }
    }
);


hotspotWork.addEventListener(
    "click",
    () => {

        if (dialogueActive) {
            return;
        }

        startMinigame();
    }
);


/* =========================================
   AFTER WORK
========================================= */

hotspotHome.addEventListener(
    "click",
    () => {

        if (dialogueActive) {
            return;
        }

        startDialogue(
            "go_home"
        );
    }
);


hotspotBar.addEventListener(
    "click",
    () => {

        if (dialogueActive) {
            return;
        }

        startDialogue(
            "go_bar"
        );
    }
);


/* =========================================
   START DIALOGUE
========================================= */

function startDialogue(nodeId) {

    dialogueActive =
        true;


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
        dialogueTree[nodeId];


    if (!node) {

        console.error(
            "Dialogue node bestaat niet:",
            nodeId
        );

        closeDialogue();

        return;
    }


    currentNodeId =
        nodeId;

    selectedOption =
        0;

    inputLocked =
        false;

    waitingForContinue =
        false;

    pendingOption =
        null;

    dialogueActive =
        true;


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
        dialogueTree[currentNodeId];


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
                index === selectedOption
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
                        inputLocked ||
                        waitingForContinue
                    ) {
                        return;
                    }

                    selectedOption =
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
        inputLocked ||
        waitingForContinue
    ) {
        return;
    }


    const node =
        dialogueTree[currentNodeId];


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


    inputLocked =
        true;


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

    pendingOption =
        option;

    waitingForContinue =
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
        !waitingForContinue ||
        !pendingOption
    ) {
        return;
    }


    const option =
        pendingOption;


    pendingOption =
        null;

    waitingForContinue =
        false;

    inputLocked =
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
            waitingForContinue
        ) {

            continueDialogue();
        }
    }
);


/* =========================================
   RUN OPTION
========================================= */

function runOption(option) {

    inputLocked =
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
   ACTIONS
========================================= */

function runAction(action) {

    /* CLOSE */

    if (
        action === "close"
    ) {

        closeDialogue();

        return;
    }


    /* ARRIVE AT WORK */

    if (
        action === "show_work"
    ) {

        closeDialogue();

        setScene(
            "work"
        );

        return;
    }


    /* LEAVE JIM */

    if (
        action === "leave_jim"
    ) {

        closeDialogue();

        return;
    }


    /* START REACTOR */

    if (
        action === "start_minigame"
    ) {

        startMinigame();

        return;
    }


    /* LEVEL 2 */

    if (
        action === "level2"
    ) {

        goToLevel(
            2
        );

        return;
    }


    /* LEVEL 3 */

    if (
        action === "level3"
    ) {

        goToLevel(
            3
        );

        return;
    }
}


/* =========================================
   CLOSE DIALOGUE
========================================= */

function closeDialogue() {

    pendingOption =
        null;

    waitingForContinue =
        false;

    inputLocked =
        false;


    showNormalBar();
}


/* =========================================
   REACTOR MINIGAME
========================================= */

function startMinigame() {

    closeDialogue();


    /*
        level1.php zit in:

        Levels/level1/level1.php

        Reactor zit in:

        minigame_reactor1/mingame1.html

        Daarom:
        ../../
    */

    reactorMinigameFrame.src =
        "../../minigame_reactor1/mingame1.html?run="
        +
        Date.now();


    minigameScreen.classList.remove(
        "hidden"
    );
}


/* =========================================
   MINIGAME COMPLETE
========================================= */

function finishLevel1Minigame() {

    minigameCompleted =
        true;


    minigameScreen.classList.add(
        "hidden"
    );


    /*
        iframe stoppen/resetten
    */

    reactorMinigameFrame.src =
        "about:blank";


    /*
        Terug naar point-and-click.
    */

    setScene(
        "work_after"
    );
}


window.finishLevel1Minigame =
    finishLevel1Minigame;


/* =========================================
   LUISTER NAAR REACTOR 02

   Reactor 02 stuurt na completion:

   {
       type: "level1-minigame-complete"
   }
========================================= */

window.addEventListener(
    "message",
    event => {

        if (
            event.data &&
            event.data.type ===
            "level1-minigame-complete"
        ) {

            finishLevel1Minigame();
        }
    }
);


/* =========================================
   KEYBOARD
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            !dialogueActive
        ) {
            return;
        }


        /* =================================
           WAITING FOR CONTINUE
        ================================== */

        if (
            waitingForContinue
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
            inputLocked
        ) {
            return;
        }


        const node =
            dialogueTree[currentNodeId];


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

            selectedOption++;


            if (
                selectedOption >=
                node.options.length
            ) {

                selectedOption =
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

            selectedOption--;


            if (
                selectedOption < 0
            ) {

                selectedOption =
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
                selectedOption
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
                index === selectedOption
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


        minigameCompleted =
            false;

        currentScene =
            "home";

        waitingForContinue =
            false;

        pendingOption =
            null;


        hideAllHotspots();


        locationLabel.textContent =
            "HOME";

        barLocation.textContent =
            "HOME";

        sceneName.textContent =
            "HOME";

        barHint.textContent =
            "CLICK SOMETHING.";


        showNormalBar();
    }
);