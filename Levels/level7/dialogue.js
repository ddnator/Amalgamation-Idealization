
const startScreen =
    document.getElementById(
        "start-screen"
    );


const startButton =
    document.getElementById(
        "start-button"
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


const dialogueHelp =
    document.getElementById(
        "dialogue-help"
    );


const homeBackground =
    document.getElementById(
        "home-background"
    );


const monitorFrame =
    document.getElementById(
        "monitor-frame"
    );


function installImageFallback(
    image,
    paths
) {

    if (
        !image
        ||
        !paths.length
    ) {

        return;

    }


    let index =
        0;


    function tryPath() {

        if (
            index >=
            paths.length
        ) {

            console.error(
                "Kon afbeelding niet laden:",
                paths
            );


            return;

        }


        image.src =
            paths[
            index
            ];


        index++;

    }


    image.addEventListener(
        "error",
        tryPath
    );


    if (
        !image.complete
        ||
        image.naturalWidth === 0
    ) {

        tryPath();

    }

}


installImageFallback(

    homeBackground,

    [
        "/Images/Home_Base.png",
        "../../Images/Home_Base.png",
        "/images/Home_Base.png",
        "../../images/Home_Base.png"
    ]

);



installImageFallback(

    monitorFrame,

    [
        "/Images/EnshittifiedTV.png",
        "../../Images/EnshittifiedTV.png",
        "/images/EnshittifiedTV.png",
        "../../images/EnshittifiedTV.png"
    ]

);


let currentNodeId =
    null;


let selectedOption =
    0;


let dialogueActive =
    false;


let inputLocked =
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
            "There is someone waiting infront of your door",

        options: [

            {

                text:
                    "Hello? Who are you?",

                next:
                    "sticky"

            },

            {

                text:
                    "GO AWAY STRANGER!",

                next:
                    "calm"

            },

            {

                text:
                    "Are you the one that gave me the sticky note?",

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
            "I am the one who send u the message there, u should really start lockin youre door by the way.",

        options: [

            {

                text:
                    "What do you want?",

                next:
                    "intro"

            },

            {

                text:
                    "What is your name?",

                next:
                    "name"

            }

        ]

    },


    /* =====================================
       NAME
    ====================================== */

    name: {

        speaker:
            "???",

        text:
            "O I never introduced myself did I?",

        options: [

            {

                text:
                    "No u did not",

                next:
                    "intro"

            }

        ]

    },


    /* =====================================
       INTRO
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

                next:
                    "plan"

            },

            {

                text:
                    "No thanks not interested.",

                next:
                    "nonot"

            }

        ]

    },


    /* =====================================
       PLAN
    ====================================== */

    plan: {

        speaker:
            "Stefanie",

        text:
            "Okay you wanna hear the idea it is simple.",

        options: [

            {

                text:
                    "Listen to the plan",

                next:
                    "dissapoint"

            }

        ]

    },


    /* =====================================
       GO TO LEVEL 8
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

                action:
                    "level8"

            }

        ]

    },


    /* =====================================
       ANGRY RESPONSE
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

                next:
                    "want"

            },

            {

                text:
                    "Leave",

                action:
                    "level9"

            }

        ]

    },


    /* =====================================
       STICKY QUESTION
    ====================================== */

    want: {

        speaker:
            "???",

        text:
            "You got my message correct?",

        options: [

            {

                text:
                    "No I did not",

                next:
                    "no_note"

            },

            {

                text:
                    "Yes I did",

                next:
                    "yes"

            }

        ]

    },


    /* =====================================
       YES
    ====================================== */

    yes: {

        speaker:
            "???",

        text:
            "Great I hope you managed to decode the message.",

        options: [

            {

                text:
                    "Yes I did",

                next:
                    "yesdid"

            },

            {

                text:
                    "No I did not",

                next:
                    "said"

            }

        ]

    },


    /* =====================================
       DIRECT STICKY
    ====================================== */

    indeed: {

        speaker:
            "???",

        text:
            "Yes I am indeed. I hope you managed to decode the message",

        options: [

            {

                text:
                    "Yes I did",

                next:
                    "yesdid"

            },

            {

                text:
                    "No I did not",

                next:
                    "said"

            }

        ]

    },


    /* =====================================
       DECODED
    ====================================== */

    yesdid: {

        speaker:
            "???",

        text:
            "I knew you would be able to decode it, I have been keeping a close eye on you you know.",

        options: [

            {

                text:
                    "Continue",

                next:
                    "join"

            }

        ]

    },


    /* =====================================
       JOIN?
    ====================================== */

    join: {

        speaker:
            "???",

        text:
            "So do you want to join.",

        options: [

            {

                text:
                    "Yes I want to join",

                next:
                    "iwant"

            },

            {

                text:
                    "Join what?",

                next:
                    "what"

            },

            {

                text:
                    "No I do not want to join so go away",

                next:
                    "nonot"

            }

        ]

    },


    /* =====================================
       JOIN YES
    ====================================== */

    iwant: {

        speaker:
            "Stefanie",

        text:
            "Great okay!.",

        options: [

            {

                text:
                    "Continue",

                next:
                    "plan"

            }

        ]

    },


    /* =====================================
       JOIN WHAT?
    ====================================== */

    what: {

        speaker:
            "???",

        text:
            "I thought u said that u decoded the message. U know that you could have just said no and I would have told you?.",

        options: [

            {

                text:
                    "Continue",

                next:
                    "said"

            }

        ]

    },


    /* =====================================
       MESSAGE
    ====================================== */

    said: {

        speaker:
            "???",

        text:
            "It said: Are you not tired of the AI that is controlling us join the rebels. See you soon...",

        options: [

            {

                text:
                    "Continue",

                next:
                    "intro"

            }

        ]

    },


    /* =====================================
       REFUSE
    ====================================== */

    nonot: {

        speaker:
            "???",

        text:
            "O okay then not I guess have fun with the very little life you have left.",

        options: [

            {

                text:
                    "Continue",

                action:
                    "level9"

            }

        ]

    },


    /* =====================================
       NO NOTE
    ====================================== */

    no_note: {

        speaker:
            "???",

        text:
            "I put it there so I know u got it.",

        options: [

            {

                text:
                    "Okay I got it",

                next:
                    "yes"

            },

            {

                text:
                    "I really did not see it",

                next:
                    "funny"

            }

        ]

    },


    /* =====================================
       FUNNY
    ====================================== */

    funny: {

        speaker:
            "???",

        text:
            "Okay Mr funny pants then not. Enjoy youre last few moments while you can",

        options: [

            {

                text:
                    "Continue",

                action:
                    "level9"

            }

        ]

    }

};


/* =========================================
   START BUTTON
========================================= */

startButton.addEventListener(
    "click",

    () => {

        startScreen.classList.add(
            "hidden"
        );


        startDialogue(
            "level_start"
        );

    }
);


/* =========================================
   START DIALOGUE
========================================= */

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


/* =========================================
   SHOW NODE
========================================= */

function showNode(
    nodeId
) {

    const node =
        dialogueTree[
        nodeId
        ];


    if (
        !node
    ) {

        console.error(
            "Level 7 dialogue node bestaat niet:",
            nodeId
        );


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


    dialogueSpeaker.textContent =
        node.speaker;


    dialogueText.textContent =
        node.text;


    renderOptions();

}


/* =========================================
   OPTIONS
========================================= */

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


            const text =
                document.createElement(
                    "span"
                );


            text.textContent =
                option.text;


            button.appendChild(
                number
            );


            button.appendChild(
                text
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


/* =========================================
   SELECT
========================================= */

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


    if (
        !option
    ) {

        return;

    }


    inputLocked =
        true;


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


    inputLocked =
        false;

}


/* =========================================
   ACTIONS
========================================= */

function runAction(
    action
) {

    if (
        action ===
        "level8"
    ) {

        window.location.href =
            "../level8/level8.php";


        return;

    }


    if (
        action ===
        "level9"
    ) {

        window.location.href =
            "../level9/level9.php";


        return;

    }


    console.warn(
        "Unknown Level 7 action:",
        action
    );


    inputLocked =
        false;

}


/* =========================================
   KEYBOARD
========================================= */

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


        /* =================================
           1 - 9
        ================================= */

        if (
            event.key >= "1"
            &&
            event.key <= "9"
        ) {

            const index =
                Number(
                    event.key
                ) -
                1;


            if (
                index <
                node.options.length
            ) {

                event.preventDefault();


                chooseOption(
                    index
                );

            }


            return;

        }


        /* =================================
           DOWN
        ================================= */

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


        /* =================================
           UP
        ================================= */

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
                    node.options.length -
                    1;

            }


            updateSelection();


            return;

        }


        /* =================================
           ENTER
        ================================= */

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


/* =========================================
   UPDATE SELECTION
========================================= */

function updateSelection() {

    const buttons =
        dialogueOptions.querySelectorAll(
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


/* =========================================
   DEBUG

   In console:
   level7Start()
========================================= */

window.level7Start =
    () => {

        startScreen.classList.add(
            "hidden"
        );


        startDialogue(
            "level_start"
        );

    };