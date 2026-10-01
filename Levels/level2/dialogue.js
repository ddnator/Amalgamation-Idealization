import {
    bottomBar,
    normalBar,
    dialogueContent,
    dialogueSpeaker,
    dialogueText,
    dialogueHelp,
    dialogueOptions,
    startButton,
    startScreen,
    minigameScreen,
    reactorMinigameFrame,
    endScreen,
    restartButton,
    hotspotKitchen,
    hotspotBed,
    hotspotComputer,
    hotspotBreakfast,
    hotspotExit,
    hotspotDoor,
    hotspotJim,
    hotspotBoss,
    hotspotWork,
    hotspotHome,
    hotspotBar,
    minigameClose
} from "./element.js";

import {
    setScene,
    showBreakfastOverlay
} from "./scene.js";

import {
    gameState
} from "./gameState.js";

import {
    closeDialogue,
    runAction,
    finishMinigame
} from "./action.js";

const dialogueTree = {

    level_start: {
        speaker: "NARRATOR",
        text: "You arrive home after a long day of work. You have a message on youre laptop",
        options: [
            {
                text: "Continue",
                speak: false,
                action: "close"
            }
        ]
    },

    try_sleep: {
        speaker: "NARRATOR",
        text: "Do you want to sleep?",
        options: [
            {
                text: "Go to sleep",
                speak: false,
                next: "continue_sleeping"
            },
            {
                text: "Not yet",
                speak: false,
                action: "close"
            }
        ]
    },

    continue_sleeping: {
        speaker: "AI",
        type: "ai",
        text: "Okay",
        options: [
            {
                text: "Goodnight",
                speak: false,
                action: "level4"
            }
        ]
    },

    eat: {
        speaker: "NARRATOR",
        text: "You make some instant ramen",
        options: [
            {
                text: "Back",
                speak: false,
                action: "close"
            }
        ]
    },

    computer: {
        speaker: "NARRATOR",
        text: "You recieved one mysterious message.",
        options: [
            {
                text: "Look at the message",
                speak: false,
                next: "computer_message"
            },
            {
                text: "Back",
                speak: false,
                action: "close"
            }
        ]
    },

    computer_message: {
        speaker: "NARRATOR",
        text: "They messages reads as follows: Bsf zpv opu ujsfe pg uif BJ uibu jt dpouspmmjoh vt kpjo uif sfcfmt. Tff zpv tppo...",
        options: [
            {
                text: "Back",
                speak: false,
                action: "close"
            }
        ]
    },

    outside_caravan: {
        speaker: "NARRATOR",
        text: "You're outside your 'luxurious' home",
        options: [
            {
                text: "Head to work",
                speak: false,
                action: "action_go_to_work"
            }
        ]
    },

    walk_to_work: {
        speaker: "NARRATOR",
        text: "You're enroute to work, shame you couldn't keep your car",
        options: [
            {
                text: "Continue",
                speak: false,
                action: "OutsideWorkDay"
            }
        ]
    },

    winston_nuclear_powerplant: {
        speaker: "NARRATOR",
        text: "Operational since the discovery of oil in Serstan in 2035",
        options: [
            {
                text: "Enter building",
                speak: false,
                next: "arrive_work"
            }
        ]
    },

    arrive_work: {
        speaker: "NARRATOR",
        text: "You have arrived at work,\nyour coworker Jim is waving at u",
        options: [
            {
                text: "Continue",
                speak: false,
                action: "show_work"
            }
        ]
    },

    jim_intro: {
        speaker: "JIM",
        text: "Hi Y/N how are you doing; Did you hear that they upgraded our boss last night?",
        options: [
            {
                text: "No I have not heard it.",
                next: "jim_upgrade"
            },
            {
                text: "I slept like shit last night.",
                next: "jim_bad_sleep"
            },
            {
                text: "Bye.",
                action: "leave_jim"
            }
        ]
    },

    jim_upgrade: {
        speaker: "JIM",
        text: "Well it got a crazy upgrade to its hearing so it might hear us right now, o by the way do not forget to hit ur quota u know what happend to Lisa when she didn't.",
        options: [
            {
                text: "No I do not remeber what did happen?",
                next: "jim_lisa"
            },
            {
                text: "O yeah that is what happened.",
                next: "jim_remember"
            },
            {
                text: "Bye.",
                action: "leave_jim"
            }
        ]
    },

    jim_bad_sleep: {
        speaker: "JIM",
        text: "O that is unfortunate but remember to hit ur quota today u know what happend to Lisa when she didn't.",
        options: [
            {
                text: "No I do not remeber what did happen?",
                next: "jim_lisa"
            },
            {
                text: "Yeah I do remeber such a shame what happend.",
                next: "jim_remember"
            },
            {
                text: "Bye",
                action: "leave_jim"
            }
        ]
    },

    jim_lisa: {
        speaker: "JIM",
        text: "U really do have problems remembering things don't u? She got taken away by them to some facility and we have not seen her since.",
        options: [
            {
                text: "O yeah that is what happened.",
                next: "jim_work_end"
            }
        ]
    },

    jim_work_end: {
        speaker: "JIM",
        text: "Well i better get to work before the same happens to me.",
        options: [
            {
                text: "Bye.",
                action: "leave_jim"
            }
        ]
    },

    jim_remember: {
        speaker: "JIM",
        text: "It is such a shame that that happened. Well I better get to work before I get the same fate",
        options: [
            {
                text: "Bye.",
                action: "leave_jim"
            }
        ]
    },

    boss_task: {
        speaker: "AI",
        type: "ai",
        text: "Hi Y/N good to see u are on time ur task for today is just to manage the factory and put in the code, goodluck and keep up the good work.",
        options: [
            {
                text: "Start working",
                speak: false,
                action: "start_minigame"
            },
            {
                text: "Leave",
                speak: false,
                action: "close"
            }
        ]
    },

    boss_after: {
        speaker: "AI",
        type: "ai",
        text: "...",
        options: [
            {
                text: "Leave",
                speak: false,
                action: "close"
            }
        ]
    },

    go_home: {
        speaker: "NARRATOR",
        text: "Go home.",
        options: [
            {
                text: "Go to home",
                speak: false,
                action: "level2"
            },
            {
                text: "Back",
                speak: false,
                action: "close"
            }
        ]
    },

    go_bar: {
        speaker: "NARRATOR",
        text: "Go bar",
        options: [
            {
                text: "Go to the bar",
                speak: false,
                action: "level3"
            },
            {
                text: "Back",
                speak: false,
                action: "close"
            }
        ]
    }
};

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
        "home"
    );

    startDialogue(
        "level_start"
    );
}

window.startLevel2 =
    startLevel2;

export function startDialogue(
    nodeId
) {

    gameState.dialogueActive =
        true;

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

function chooseOption(
    index
) {

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

    if (
        !option
    ) {
        return;
    }

    gameState.inputLocked =
        true;

    if (
        option.speak === false
    ) {

        runOption(
            option
        );

        return;
    }

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
            gameState.waitingForContinue
        ) {

            continueDialogue();
        }
    }
);

function runOption(
    option
) {

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

document.addEventListener(
    "keydown",
    event => {

        if (
            !gameState.dialogueActive
        ) {
            return;
        }

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

        if (
            event.key >= "1" &&
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
                    node.options.length -
                    1;
            }

            updateSelection();

            return;
        }

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

hotspotKitchen.addEventListener(
    "click",
    () => {

        if (
            gameState.dialogueActive
        ) {
            return;
        }

        showBreakfastOverlay(
            "eat"
        );

        startDialogue(
            "eat"
        );
    }
);

hotspotBreakfast.addEventListener(
    "click",
    () => {

        if (
            gameState.dialogueActive
        ) {
            return;
        }

        showBreakfastOverlay(
            "eat"
        );

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

hotspotExit.addEventListener(
    "click",
    () => {

        if (
            gameState.dialogueActive
        ) {
            return;
        }

        runAction(
            "action_Outside"
        );
    }
);

hotspotDoor.addEventListener(
    "click",
    () => {

        if (
            gameState.dialogueActive
        ) {
            return;
        }

        setScene(
            "home"
        );

        closeDialogue();
    }
);

hotspotJim.addEventListener(
    "click",
    () => {

        if (
            gameState.dialogueActive
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
            gameState.dialogueActive
        ) {
            return;
        }

        startDialogue(
            gameState.minigameCompleted
                ? "boss_after"
                : "boss_task"
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

        if (
            gameState.minigameCompleted
        ) {
            return;
        }

        runAction(
            "start_minigame"
        );
    }
);

hotspotHome.addEventListener(
    "click",
    () => {

        if (
            gameState.dialogueActive
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
            gameState.dialogueActive
        ) {
            return;
        }

        startDialogue(
            "go_bar"
        );
    }
);

minigameClose.addEventListener(
    "click",
    () => {

        finishMinigame();
    }
);

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

        setScene(
            "home"
        );
    }
);