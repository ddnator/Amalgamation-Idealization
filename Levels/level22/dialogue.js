const startScreen =
    document.getElementById(
        "start-screen"
    );

const startButton =
    document.getElementById(
        "start-button"
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

const bottomBar =
    document.getElementById(
        "bottom-bar"
    );

const locationLabel =
    document.getElementById(
        "location-label"
    );

const sceneName =
    document.getElementById(
        "scene-name"
    );

const barLocation =
    document.getElementById(
        "bar-location"
    );

const barHint =
    document.getElementById(
        "bar-hint"
    );

const minigameScreen =
    document.getElementById(
        "minigame-screen"
    );

const reactorMinigameFrame =
    document.getElementById(
        "reactor-minigame-frame"
    );

const minigameClose =
    document.getElementById(
        "minigame-close"
    );

const scenes = {

    home:
        document.getElementById(
            "caravanScene"
        ),

    outside:
        document.getElementById(
            "caravanSceneOutside"
        ),

    walkingHomeNight:
        document.getElementById(
            "walkingHomeNight"
        ),

    OutsideWorkNight:
        document.getElementById(
            "OutsideWorkNight"
        ),

    ErwinsBar:
        document.getElementById(
            "ErwinsBar"
        ),

    insideBarOne:
        document.getElementById(
            "insideBarOne"
        ),

    insideBarTwo:
        document.getElementById(
            "insideBarTwo"
        ),

    work:
        document.getElementById(
            "work"
        ),

    steven1:
        document.getElementById(
            "steven1"
        ),

    steven2:
        document.getElementById(
            "steven2"
        ),

    steven3:
        document.getElementById(
            "steven3"
        ),

    steven4:
        document.getElementById(
            "steven4"
        ),

    boss:
        document.getElementById(
            "boss"
        )

};

const hotspotBed =
    document.getElementById(
        "hotspot-bed"
    );

const hotspotKitchen =
    document.getElementById(
        "hotspot-kitchen"
    );

const hotspotComputer =
    document.getElementById(
        "hotspot-computer"
    );

const hotspotExit =
    document.getElementById(
        "hotspot-exit"
    );

const hotspotDoor =
    document.getElementById(
        "hotspot-door"
    );

const hotspotSteven =
    document.getElementById(
        "hotspot-steven"
    );

const hotspotDoorBar =
    document.getElementById(
        "hotspot-doorBar"
    );

const hotspotJim =
    document.getElementById(
        "hotspot-jim"
    );

const hotspotWork =
    document.getElementById(
        "hotspot-work"
    );

const hotspotBoss =
    document.getElementById(
        "hotspot-boss"
    );

const hotspotHome =
    document.getElementById(
        "hotspot-home"
    );

const hotspotBar =
    document.getElementById(
        "hotspot-bar"
    );

const breakfastOverlay =
    document.querySelector(
        ".BreakfastOverlay"
    );

let currentScene =
    "OutsideWorkNight";

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

const dialogueTree = {

    level_start: {

        speaker:
            "NARRATOR",

        text:
            "You've just left work, ",

        options: [

            {
                text:
                    "Continue",

                speak:
                    false,

                action:
                    "action_go_home"
            }

        ]

    },

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

    outside_caravan: {

        speaker:
            "NARRATOR",

        text:
            "You're outside your 'luxurious' home",

        options: [

            {
                text:
                    "Enter home",

                speak:
                    false,

                action:
                    "action_enter_home"
            }

        ]

    },

    walk_home: {

        speaker:
            "NARRATOR",

        text:
            "You're on your way home. Erwin's bar is just around the corner",

        options: [

            {
                text:
                    "Go home",

                speak:
                    false,

                action:
                    "action_Outside"
            },

            {
                text:
                    "Go to Erwin's bar",

                speak:
                    false,

                action:
                    "action_go_bar"
            }

        ]

    },

    steven_intro: {

        speaker:
            "STEVEN",

        text:
            "GIVE. ME. YOUR. LEGS. \n haha just kidding, but seriously could you spare a dime Y/N? ",

        options: [

            {
                text:
                    "I want to, but I'm kinda low on cash myself",

                action:
                    "action_stevenTwo"
            },

            {
                text:
                    "Sure Steven, it's going to getting your legs running again, right?",

                action:
                    "action_stevenThree"
            },

            {
                text:
                    "Bye.",

                action:
                    "action_leave_steven"
            }

        ]

    },

    steven_no_money: {

        speaker:
            "STEVEN",

        text:
            "Oh don't worry about it Y/N. I already have enough for my next bottle anyway",

        options: [

            {
                text:
                    "What about getting your legs working again?",

                next:
                    "steven_legs"
            },

            {
                text:
                    "Bye.",

                action:
                    "action_leave_steven"
            }

        ]

    },

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
                    "action_leave_steven"
            }

        ]

    },

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

    erwin_intro: {

        speaker:
            "ERWIN",

        text:
            "Yooo Y/N, how's it going?",

        options: [

            {
                text:
                    "Do you still have the good stuff?",

                next:
                    "erwin_goodstuff"
            },

            {
                text:
                    "Steven's outside again.",

                action:
                    "action_erwin_about_steven"
            }

        ]

    },

    erwin_goodstuff: {

        speaker:
            "ERWIN",

        text:
            "What kind of good stuff are we talking about here?",

        options: [

            {
                text:
                    "I want an upgrade",

                action:
                    "action_upgrade"
            },

            {
                text:
                    "You know, your home made specialty \n which, isn't a drink, if you catch my drift",

                action:
                    "action_drugs"
            },

            {
                text:
                    "I've changed my mind, bye",

                action:
                    "action_leave_erwin"
            }

        ]

    },
    /* =====================================
     erwin upgrade
  ====================================== */
    erwin_upgrade: {

        speaker:
            "ERWIN",

        text:
            "these are all used models, so the rate should be affordable, even for someone like you. \n So tell me, what do you want to upgrade?",

        options: [

            {
                text:
                    "My eyes",

                action: "action_upgrade_eyes"

            },

            {
                text:
                    "My legs",

                action: "action_upgrade_legs"
            },

            {
                text:
                    "my arms",

                action: "action_upgrade_arms"
            },

            {
                text:
                    "my HEART",

                action: "action_upgrade_heart"
            }

        ]

    },

    erwin_steven: {

        speaker:
            "ERWIN",

        text:
            "have you been giving him money again? I've really been getting sick of that guy. \n He sits outside here every night and bothers me when I refuse to serve him any more drinks",

        options: [

            {
                text:
                    "That's his only comfort right now",

                next:
                    "erwin_steven2"
            }

        ]

    },

    erwin_steven2: {

        speaker:
            "ERWIN",

        text:
            "I don't have it in me to force him to leave. \n besides, if he leaves, another one will crawl here, and I'm not sure if they will be as friendly as our Steven here",

        options: [

            {
                text:
                    "I hope he gets his shit together soon, anyhow, I'm here for the goodstuff",

                next:
                    "erwin_goodstuff"
            }

        ]

    },

    work: {

        speaker:
            "NARRATOR",

        text:
            "You have arrived at work,\n your favorite coworker Jim is waving at you",

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

    boss_task: {

        speaker: "AI",

        type: "ai",

        text: "Morning Y/N, good to see you are on time today. The task for today is to manage the factory and put in the code, even you can manage that, right?",

        options: [

            {
                text: "Start working",

                speak: false,

                action: "action_start_minigame"
            },

            {
                text: "Leave",

                speak: false,

                action:
                    "close"
            }

        ]

    },

    boss_after: {

        speaker: "AI",

        type: "ai",

        text:
            "...",

        options: [

            {
                text:
                    "Leave",

                speak:
                    false,

                action:
                    "action_leave_boss"
            }

        ]

    },

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
                    "action_go_home"
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
                    "action_go_bar"
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

function setScene(
    scene
) {

    currentScene =
        scene;

    Object
        .values(
            scenes
        )
        .forEach(
            element => {

                if (
                    element
                ) {

                    element.classList.add(
                        "hidden"
                    );

                }

            }
        );

    if (
        scenes[
            scene
        ]
    ) {

        scenes[
            scene
        ].classList.remove(
            "hidden"
        );

    }

    hotspotHome.classList.add(
        "hidden"
    );

    hotspotBar.classList.add(
        "hidden"
    );

    if (
        scene ===
        "home"
    ) {

        locationLabel.textContent =
            "HOME";

        sceneName.textContent =
            "HOME";

        barLocation.textContent =
            "HOME";

        barHint.textContent =
            "CLICK SOMETHING.";

    }

    else if (
        scene ===
        "outside"
    ) {

        locationLabel.textContent =
            "OUTSIDE";

        sceneName.textContent =
            "OUTSIDE";

        barLocation.textContent =
            "OUTSIDE";

        barHint.textContent =
            "CLICK THE DOOR.";

    }

    else if (
        scene ===
        "walkingHomeNight"
    ) {

        locationLabel.textContent =
            "ROUTE HOME";

        sceneName.textContent =
            "ROUTE HOME";

        barLocation.textContent =
            "ROUTE HOME";

        barHint.textContent =
            "ERWIN'S BAR IS NEARBY.";

    }

    else if (
        scene ===
        "OutsideWorkNight"
    ) {

        locationLabel.textContent =
            "OUTSIDE WORK";

        sceneName.textContent =
            "OUTSIDE WORK";

        barLocation.textContent =
            "OUTSIDE WORK";

        barHint.textContent =
            "YOU JUST LEFT WORK.";

    }

    else if (
        scene ===
        "ErwinsBar"
    ) {

        locationLabel.textContent =
            "ERWIN'S BAR";

        sceneName.textContent =
            "ERWIN'S BAR";

        barLocation.textContent =
            "ERWIN'S BAR";

        barHint.textContent =
            "CLICK STEVEN OR THE DOOR.";

    }

    else if (
        scene ===
        "insideBarOne"

        ||

        scene ===
        "insideBarTwo"
    ) {

        locationLabel.textContent =
            "ERWIN'S BAR";

        sceneName.textContent =
            "ERWIN'S BAR";

        barLocation.textContent =
            "ERWIN'S BAR";

        barHint.textContent =
            "ERWIN.";

    }

    else if (
        scene ===
        "work"
    ) {

        locationLabel.textContent =
            "WORK";

        sceneName.textContent =
            "WORK";

        barLocation.textContent =
            "WORK";

        barHint.textContent =
            minigameCompleted
                ? "WORK FINISHED."
                : "CLICK JIM, THE TERMINAL OR THE BOSS.";

        if (
            minigameCompleted
        ) {

            hotspotHome.classList.remove(
                "hidden"
            );

            hotspotBar.classList.remove(
                "hidden"
            );

        }

    }

    else if (
        scene.startsWith(
            "steven"
        )
    ) {

        locationLabel.textContent =
            "STEVEN";

        sceneName.textContent =
            "STEVEN";

        barLocation.textContent =
            "STEVEN";

        barHint.textContent =
            "STEVEN.";

    }

    else if (
        scene ===
        "boss"
    ) {

        locationLabel.textContent =
            "BOSS";

        sceneName.textContent =
            "BOSS";

        barLocation.textContent =
            "BOSS";

        barHint.textContent =
            "BOSS.";

    }

}

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

function showBreakfast(
    show
) {

    if (
        breakfastOverlay
    ) {

        breakfastOverlay.classList.toggle(
            "hidden",
            !show
        );

    }

}

function startDialogue(
    nodeId
) {

    dialogueActive =
        true;

    showBreakfast(
        nodeId ===
        "eat"
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
            "Dialogue node bestaat niet:",
            nodeId
        );

        showNormalBar();

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
        node.speaker ||
        "";

    dialogueText.textContent =
        node.text ||
        "";

    dialogueHelp.textContent =
        "↑ ↓ SELECT   ENTER / 1-4";

    renderOptions();

}

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
                        ||
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

function chooseOption(
    index
) {

    if (
        inputLocked
        ||
        waitingForContinue
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
        !node.options[
            index
        ]
    ) {

        return;

    }

    const option =
        node.options[
            index
        ];

    inputLocked =
        true;

    if (
        option.speak ===
        false
    ) {

        runOption(
            option
        );

        return;

    }

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

function continueDialogue() {

    if (
        !waitingForContinue
        ||
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

function closeDialogue() {

    showBreakfast(
        false
    );

    showNormalBar();

}

function runAction(
    action
) {

    if (
        action ===
        "close"
    ) {

        closeDialogue();

        return;

    }

    if (
        action ===
        "action_go_home"
    ) {

        setScene(
            "walkingHomeNight"
        );

        startDialogue(
            "walk_home"
        );

        return;

    }

    if (
        action ===
        "action_Outside"
    ) {

        setScene(
            "outside"
        );

        startDialogue(
            "outside_caravan"
        );

        return;

    }

    if (
        action ===
        "action_enter_home"
    ) {

        setScene(
            "home"
        );

        closeDialogue();

        return;

    }

    if (
        action ===
        "action_go_bar"
    ) {

        setScene(
            "ErwinsBar"
        );

        closeDialogue();

        return;

    }

    if (
        action ===
        "action_enter_bar"
    ) {

        setScene(
            "insideBarOne"
        );

        startDialogue(
            "erwin_intro"
        );

        return;

    }

    if (
        action ===
        "action_erwin_about_steven"
    ) {

        setScene(
            "insideBarTwo"
        );

        startDialogue(
            "erwin_steven"
        );

        return;

    }

    if (
        action ===
        "action_leave_erwin"
    ) {

        setScene(
            "ErwinsBar"
        );

        closeDialogue();

        return;

    }

    if (
        action ===
        "action_stevenTwo"
    ) {

        setScene(
            "steven2"
        );

        startDialogue(
            "steven_no_money"
        );

        return;

    }

    if (
        action ===
        "action_stevenThree"
    ) {

        setScene(
            "steven3"
        );

        startDialogue(
            "steven_yes_money"
        );

        return;

    }

    if (
        action ===
        "action_stevenFour"
    ) {

        setScene(
            "steven4"
        );

        startDialogue(
            "steven_explain"
        );

        return;

    }

    if (
        action ===
        "action_leave_steven"
    ) {

        setScene(
            "ErwinsBar"
        );

        closeDialogue();

        return;

    }

    if (
        action ===
        "action_upgrade"
    ) {

        startDialogue(
            "erwin_upgrade"
        );

        return;

    }

    if (
        action ===
        "action_drugs"

        ||

        action ===
        "action_upgrade"

        ||

        action ===
        "action_upgrade"

        ||

        action ===
        "action_upgrade"

        ||

        action ===
        "action_upgrade"
    ) {

        setScene(
            "ErwinsBar"
        );

        closeDialogue();

        return;

    }

    if (
        action ===
        "action_start_minigame"
    ) {

        startMinigame();

        return;

    }

    if (
        action ===
        "action_leave_boss"
    ) {

        setScene(
            "work"
        );

        closeDialogue();

        return;

    }

}

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

function startMinigame() {

    closeDialogue();

    reactorMinigameFrame.src =
        "../../minigame_reactor1/minigame1.php?run="
        +
        Date.now();

    minigameScreen.classList.remove(
        "hidden"
    );

}

function finishMinigame() {

    minigameCompleted =
        true;

    minigameScreen.classList.add(
        "hidden"
    );

    reactorMinigameFrame.src =
        "about:blank";

    setScene(
        "work"
    );

    showNormalBar();

}

startButton.addEventListener(
    "click",
    () => {

        startScreen.classList.add(
            "hidden"
        );

        minigameScreen.classList.add(
            "hidden"
        );

        reactorMinigameFrame.src =
            "about:blank";

        minigameCompleted =
            false;

        setScene(
            "OutsideWorkNight"
        );

        startDialogue(
            "level_start"
        );

    }
);

hotspotBed.addEventListener(
    "click",
    () => {

        if (
            !dialogueActive
        ) {

            startDialogue(
                "try_sleep"
            );

        }

    }
);

hotspotKitchen.addEventListener(
    "click",
    () => {

        if (
            !dialogueActive
        ) {

            startDialogue(
                "eat"
            );

        }

    }
);

hotspotComputer.addEventListener(
    "click",
    () => {

        if (
            !dialogueActive
        ) {

            startDialogue(
                "computer"
            );

        }

    }
);

hotspotExit.addEventListener(
    "click",
    () => {

        if (
            !dialogueActive
        ) {

            setScene(
                "outside"
            );

            startDialogue(
                "outside_caravan"
            );

        }

    }
);

hotspotDoor.addEventListener(
    "click",
    () => {

        if (
            !dialogueActive
        ) {

            setScene(
                "home"
            );

            closeDialogue();

        }

    }
);

hotspotSteven.addEventListener(
    "click",
    () => {

        if (
            !dialogueActive
        ) {

            setScene(
                "steven1"
            );

            startDialogue(
                "steven_intro"
            );

        }

    }
);

hotspotDoorBar.addEventListener(
    "click",
    () => {

        if (
            !dialogueActive
        ) {

            setScene(
                "insideBarOne"
            );

            startDialogue(
                "erwin_intro"
            );

        }

    }
);

hotspotJim.addEventListener(
    "click",
    () => {

        if (
            !dialogueActive
        ) {

            startDialogue(
                "work"
            );

        }

    }
);

hotspotWork.addEventListener(
    "click",
    () => {

        if (
            !dialogueActive
            &&
            !minigameCompleted
        ) {

            startMinigame();

        }

    }
);

hotspotBoss.addEventListener(
    "click",
    () => {

        if (
            !dialogueActive
        ) {

            setScene(
                "boss"
            );

            startDialogue(
                minigameCompleted
                    ? "boss_after"
                    : "boss_task"
            );

        }

    }
);

hotspotHome.addEventListener(
    "click",
    () => {

        if (
            !dialogueActive
        ) {

            startDialogue(
                "go_home"
            );

        }

    }
);

hotspotBar.addEventListener(
    "click",
    () => {

        if (
            !dialogueActive
        ) {

            startDialogue(
                "go_bar"
            );

        }

    }
);

minigameClose.addEventListener(
    "click",
    finishMinigame
);

window.addEventListener(
    "message",
    event => {

        if (
            event.data
            &&
            (
                event.data.type ===
                "level1-minigame-complete"

                ||

                event.data.type ===
                "level22-minigame-complete"
            )
        ) {

            finishMinigame();

        }

    }
);

dialogueContent.addEventListener(
    "click",
    event => {

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

document.addEventListener(
    "keydown",
    event => {

        if (
            !dialogueActive
        ) {

            return;

        }

        if (
            waitingForContinue
        ) {

            if (
                event.key ===
                "Enter"

                ||

                event.key ===
                " "
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
            dialogueTree[
                currentNodeId
            ];

        if (
            !node
            ||
            !node.options
            ||
            node.options.length ===
            0
        ) {

            return;

        }

        if (
            event.key >=
            "1"

            &&

            event.key <=
            "9"
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

                event.preventDefault();

                chooseOption(
                    index
                );

            }

            return;

        }

        if (
            event.key ===
            "ArrowDown"
        ) {

            event.preventDefault();

            selectedOption =
                (
                    selectedOption
                    +
                    1
                )
                %
                node.options.length;

            updateSelection();

            return;

        }

        if (
            event.key ===
            "ArrowUp"
        ) {

            event.preventDefault();

            selectedOption =
                (
                    selectedOption
                    -
                    1
                    +
                    node.options.length
                )
                %
                node.options.length;

            updateSelection();

            return;

        }

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

window.level22SetScene =
    setScene;

window.level22StartDialogue =
    startDialogue;

window.finishLevel22Minigame =
    finishMinigame;