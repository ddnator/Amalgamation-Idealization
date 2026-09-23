/* ==================================================
   ELEMENTS
================================================== */

const startScreen =
    document.getElementById(
        "start-screen"
    );

const minigameScreen =
    document.getElementById(
        "minigame-screen"
    );

const endScreen =
    document.getElementById(
        "end-screen"
    );


const startButton =
    document.getElementById(
        "start-button"
    );

const finishMinigameButton =
    document.getElementById(
        "finish-minigame"
    );

const restartButton =
    document.getElementById(
        "restart-button"
    );


const bottomBar =
    document.getElementById(
        "bottom-bar"
    );

const normalBar =
    document.getElementById(
        "normal-bar"
    );

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


/* ==================================================
   HOTSPOTS
================================================== */

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


/* ==================================================
   STATE
================================================== */

let currentScene =
    "home";


let currentNodeId =
    null;


let dialogueActive =
    false;


let selectedOption =
    0;


let inputLocked =
    false;


let minigameCompleted =
    false;


/* ==================================================
   DIALOGUE TREE
================================================== */

const dialogueTree = {


    /* ==================================================
       SLEEP
    ================================================== */

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
            "Your AI assistant warns you about the consequences of not working.",

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


    /* ==================================================
       EAT
    ================================================== */

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

                action:
                    "go_work"
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


    /* ==================================================
       BOARD

       De Miro-tree geeft hier geen verdere
       dialogue-tekst.
    ================================================== */

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
            },

            {
                text:
                    "Go to work",

                speak:
                    false,

                action:
                    "go_work"
            }

        ]

    },


    /* ==================================================
       WALK TO WORK
    ================================================== */

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

                action:
                    "arrive_work"
            }

        ]

    },


    /* ==================================================
       ARRIVE AT WORK
    ================================================== */

    arrive_work: {

        speaker:
            "NARRATOR",

        text:
            "You have arrived at work, your coworker Jim is waving at u",

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


    /* ==================================================
       JIM INTRO
    ================================================== */

    jim_intro: {

        speaker:
            "Jim",

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


    /* ==================================================
       JIM - UPGRADE
    ================================================== */

    jim_upgrade: {

        speaker:
            "Jim",

        text:
            "Well it got a crazy upgrade to its hearing so it might hear us right now, o by the way do not forget to hit ur quota u know what happend to Lisa when she didn't.",

        options: [

            {
                text:
                    "No I do not remember what did happen?",

                next:
                    "jim_lisa_explain"
            },

            {
                text:
                    "Bye",

                action:
                    "leave_jim"
            },

            {
                text:
                    "Yeah I do remember such a shame what happend.",

                next:
                    "jim_lisa_remember"
            }

        ]

    },


    /* ==================================================
       JIM - BAD SLEEP
    ================================================== */

    jim_bad_sleep: {

        speaker:
            "Jim",

        text:
            "O that is unfortunate but remember to hit ur quota today u know what happend to Lisa when she didn't.",

        options: [

            {
                text:
                    "No I do not remember what did happen?",

                next:
                    "jim_lisa_explain"
            },

            {
                text:
                    "Bye",

                action:
                    "leave_jim"
            },

            {
                text:
                    "Yeah I do remember such a shame what happend.",

                next:
                    "jim_lisa_remember"
            }

        ]

    },


    /* ==================================================
       LISA
    ================================================== */

    jim_lisa_explain: {

        speaker:
            "Jim",

        text:
            "U really do have problems remembering things don't u? She got taken away by them to some facility and we have not seen her since.",

        options: [

            {
                text:
                    "O yeah that is what happend.",

                next:
                    "jim_get_work"
            }

        ]

    },


    jim_get_work: {

        speaker:
            "Jim",

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


    jim_lisa_remember: {

        speaker:
            "Jim",

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


    /* ==================================================
       BOSS BEFORE MINIGAME
    ================================================== */

    boss_task: {

        speaker:
            "AI",

        type:
            "ai",

        text:
            "Hi Y/N good to see u are on time ur task for today is *minigame task* *minigame uitleg* goodluck and keep up the good work!",

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


    /* ==================================================
       BOSS AFTER MINIGAME

       Geen exacte extra tekst zichtbaar in Miro.
    ================================================== */

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


    /* ==================================================
       GO HOME
    ================================================== */

    go_home: {

        speaker:
            "NARRATOR",

        text:
            "You go home.",

        options: [

            {
                text:
                    "Go to level 2",

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


    /* ==================================================
       GO BAR
    ================================================== */

    go_bar: {

        speaker:
            "NARRATOR",

        text:
            "You go to the bar.",

        options: [

            {
                text:
                    "Go to level 3",

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


/* ==================================================
   START
================================================== */

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


    minigameCompleted =
        false;


    setScene(
        "home"
    );

}


window.startLevel1 =
    startLevel1;


/* ==================================================
   SCENE
================================================== */

function setScene(scene) {

    currentScene =
        scene;


    hideAllHotspots();


    if (
        scene ===
        "home"
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
                element => {

                    element.classList.remove(
                        "hidden"
                    );

                }
            );

    }


    if (
        scene ===
        "work"
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
                element => {

                    element.classList.remove(
                        "hidden"
                    );

                }
            );

    }


    if (
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


        hotspotJim.classList.remove(
            "hidden"
        );


        hotspotBoss.classList.remove(
            "hidden"
        );


        document
            .querySelectorAll(
                ".after-work-hotspot"
            )
            .forEach(
                element => {

                    element.classList.remove(
                        "hidden"
                    );

                }
            );

    }


    showNormalBar();

}


/* ==================================================
   HIDE HOTSPOTS
================================================== */

function hideAllHotspots() {

    document
        .querySelectorAll(
            ".hotspot"
        )
        .forEach(
            element => {

                element.classList.add(
                    "hidden"
                );

            }
        );

}


/* ==================================================
   NORMAL BAR
================================================== */

function showNormalBar() {

    dialogueActive =
        false;


    currentNodeId =
        null;


    selectedOption =
        0;


    inputLocked =
        false;


    bottomBar.classList.remove(
        "player-speaking",
        "ai-speaking"
    );


    normalBar.classList.remove(
        "hidden"
    );


    dialogueContent.classList.add(
        "hidden"
    );


    dialogueOptions.innerHTML =
        "";

}


/* ==================================================
   HOTSPOT EVENTS
================================================== */

hotspotBed.addEventListener(

    "click",

    () => {

        if (
            dialogueActive
        ) {

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

        if (
            dialogueActive
        ) {

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

        if (
            dialogueActive
        ) {

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

        if (
            dialogueActive
        ) {

            return;

        }


        startDialogue(
            "walk_to_work"
        );

    }

);


hotspotJim.addEventListener(

    "click",

    () => {

        if (
            dialogueActive
        ) {

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

        if (
            dialogueActive
        ) {

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

        if (
            dialogueActive
        ) {

            return;

        }


        startMinigame();

    }

);


hotspotHome.addEventListener(

    "click",

    () => {

        if (
            dialogueActive
        ) {

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

        if (
            dialogueActive
        ) {

            return;

        }


        startDialogue(
            "go_bar"
        );

    }

);


/* ==================================================
   START DIALOGUE
================================================== */

function startDialogue(
    nodeId
) {

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


/* ==================================================
   SHOW NODE
================================================== */

function showNode(
    nodeId
) {

    const node =
        dialogueTree[
            nodeId
        ];


    if (!node) {

        console.error(
            "Node bestaat niet:",
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
        "ai-speaking"
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
        node.speaker ||
        "NARRATOR";


    dialogueText.textContent =
        node.text ||
        "";


    renderOptions();

}


/* ==================================================
   RENDER OPTIONS
================================================== */

function renderOptions() {

    const node =
        dialogueTree[
            currentNodeId
        ];


    dialogueOptions.innerHTML =
        "";


    if (
        !node
        ||
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
                selectedOption
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
                        inputLocked
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


/* ==================================================
   CHOOSE OPTION
================================================== */

function chooseOption(
    index
) {

    if (
        inputLocked
    ) {

        return;

    }


    const node =
        dialogueTree[
            currentNodeId
        ];


    if (
        !node
        ||
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


    inputLocked =
        true;


    /*
        speak:false betekent:

        dit is een point-and-click/action-keuze
        en geen uitgesproken Y/N zin.
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


    /* ==================================================
       Y/N PRAAT
    ================================================== */

    bottomBar.classList.remove(
        "ai-speaking"
    );


    bottomBar.classList.add(
        "player-speaking"
    );


    dialogueSpeaker.textContent =
        "Y/N";


    dialogueText.textContent =
        option.text;


    dialogueOptions.innerHTML =
        "";


    /*
        Even Y/N antwoord laten zien
        voordat Jim/AI reageert.
    */

    setTimeout(

        () => {

            runOption(
                option
            );

        },

        650

    );

}


/* ==================================================
   RUN OPTION
================================================== */

function runOption(
    option
) {

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


/* ==================================================
   ACTIONS
================================================== */

function runAction(
    action
) {


    /* CLOSE */

    if (
        action ===
        "close"
    ) {

        closeDialogue();

        return;

    }


    /* GO TO WORK */

    if (
        action ===
        "go_work"
    ) {

        showNode(
            "walk_to_work"
        );

        return;

    }


    /* ARRIVE */

    if (
        action ===
        "arrive_work"
    ) {

        showNode(
            "arrive_work"
        );

        return;

    }


    /* SHOW WORK */

    if (
        action ===
        "show_work"
    ) {

        closeDialogue();


        setScene(
            "work"
        );

        return;

    }


    /* LEAVE JIM */

    if (
        action ===
        "leave_jim"
    ) {

        closeDialogue();

        return;

    }


    /* START MINIGAME */

    if (
        action ===
        "start_minigame"
    ) {

        startMinigame();

        return;

    }


    /* LEVEL 2 */

    if (
        action ===
        "level2"
    ) {

        goToLevel(
            2
        );

        return;

    }


    /* LEVEL 3 */

    if (
        action ===
        "level3"
    ) {

        goToLevel(
            3
        );

        return;

    }

}


/* ==================================================
   CLOSE DIALOGUE
================================================== */

function closeDialogue() {

    showNormalBar();

}


/* ==================================================
   MINIGAME
================================================== */

function startMinigame() {

    closeDialogue();


    minigameScreen.classList.remove(
        "hidden"
    );

}


/*
    Deze functie kun je later vanuit
    jullie echte minigame aanroepen:

    finishLevel1Minigame();
*/

function finishLevel1Minigame() {

    minigameCompleted =
        true;


    minigameScreen.classList.add(
        "hidden"
    );


    setScene(
        "work_after"
    );

}


window.finishLevel1Minigame =
    finishLevel1Minigame;


finishMinigameButton.addEventListener(

    "click",

    finishLevel1Minigame

);


/* ==================================================
   KEYBOARD DIALOGUE
================================================== */

document.addEventListener(

    "keydown",

    event => {


        if (
            !dialogueActive
            ||
            inputLocked
        ) {

            return;

        }


        const node =
            dialogueTree[
                currentNodeId
            ];


        if (
            !node
            ||
            !node.options
            ||
            node.options.length === 0
        ) {

            return;

        }


        /* ==========================================
           NUMBER 1 - 4
        ========================================== */

        if (
            event.key >= "1"
            &&
            event.key <= "4"
        ) {

            const index =
                Number(
                    event.key
                )
                -
                1;


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


        /* ==========================================
           DOWN
        ========================================== */

        if (
            event.key ===
            "ArrowDown"
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


        /* ==========================================
           UP
        ========================================== */

        if (
            event.key ===
            "ArrowUp"
        ) {

            event.preventDefault();


            selectedOption--;


            if (
                selectedOption < 0
            ) {

                selectedOption =
                    node.options.length
                    -
                    1;

            }


            updateSelection();


            return;

        }


        /* ==========================================
           ENTER
        ========================================== */

        if (
            event.key ===
            "Enter"
        ) {

            event.preventDefault();


            chooseOption(
                selectedOption
            );

        }

    }

);


/* ==================================================
   UPDATE SELECTION
================================================== */

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
                selectedOption

            );

        }

    );

}


/* ==================================================
   LEVEL TRANSITION
================================================== */

function goToLevel(
    level
) {

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
            "You went home.";


        /*
        Als level 2 klaar is:

        window.location.href =
            "../level2/level2.php";
        */

    }


    if (
        level === 3
    ) {

        endTitle.textContent =
            "GO TO LEVEL 3";


        endText.textContent =
            "You went to the bar.";


        /*
        Als level 3 klaar is:

        window.location.href =
            "../level3/level3.php";
        */

    }

}


/* ==================================================
   RESTART
================================================== */

restartButton.addEventListener(

    "click",

    () => {


        endScreen.classList.add(
            "hidden"
        );


        minigameScreen.classList.add(
            "hidden"
        );


        startScreen.classList.remove(
            "hidden"
        );


        minigameCompleted =
            false;


        currentScene =
            "home";


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