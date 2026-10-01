const startScreen =
    document.getElementById("start-screen");

const startButton =
    document.getElementById("start-button");

const normalBar =
    document.getElementById("normal-bar");

const dialogueContent =
    document.getElementById("dialogue-content");

const dialogueSpeaker =
    document.getElementById("dialogue-speaker");

const dialogueText =
    document.getElementById("dialogue-text");

const dialogueOptions =
    document.getElementById("dialogue-options");

const dialogueHelp =
    document.getElementById("dialogue-help");

const hotspotStephanie =
    document.getElementById("hotspot-stephanie");

const outsideScene =
    document.getElementById("outside-scene");

const stephanie1Scene =
    document.getElementById("stephanie1-scene");

const stephanie2Scene =
    document.getElementById("stephanie2-scene");

const locationLabel =
    document.getElementById("location-label");

const sceneName =
    document.getElementById("scene-name");

const barLocation =
    document.getElementById("bar-location");

const barHint =
    document.getElementById("bar-hint");

let currentNodeId =
    null;

let selectedOption =
    0;

let dialogueActive =
    false;

let inputLocked =
    false;

const dialogueTree = {

    level_start: {
        speaker: "NARRATOR",
        text: "There is someone waiting infront of your door",
        options: [
            {
                text: "Hello? Who are you?",
                next: "sticky"
            },
            {
                text: "GO AWAY STRANGER!",
                next: "calm"
            },
            {
                text: "Are you the one that gave me the sticky note?",
                next: "indeed"
            }
        ]
    },

    sticky: {
        speaker: "???",
        text: "I am the one who put the sticky note there, u should really start lockin youre door by the way.",
        options: [
            {
                text: "What do you want?",
                next: "intro"
            },
            {
                text: "What is your name?",
                next: "name"
            }
        ]
    },

    name: {
        speaker: "???",
        text: "O I never introduced myself did I?",
        options: [
            {
                text: "No u did not",
                next: "intro"
            }
        ]
    },

    intro: {
        speaker: "Stefanie",
        text: "I am Stefanie, leader of the rebels against the AI and I want you to join me.",
        options: [
            {
                text: "Okay I will join you what is the plan?",
                next: "plan"
            },
            {
                text: "No thanks not interested.",
                next: "nonot"
            }
        ]
    },

    plan: {
        speaker: "Stefanie",
        text: "Okay you wanna hear the idea it is simple.",
        options: [
            {
                text: "Listen to the plan",
                next: "dissapoint"
            }
        ]
    },

    dissapoint: {
        speaker: "Stefanie",
        text: "So do not dissapoint this al counts on if you are able to pull this of",
        options: [
            {
                text: "Lets do this!",
                action: "level8"
            }
        ]
    },

    calm: {
        speaker: "???",
        text: "Calm down you I come in peace",
        options: [
            {
                text: "What do you want?",
                next: "want"
            },
            {
                text: "Leave",
                action: "level9"
            }
        ]
    },

    want: {
        speaker: "???",
        text: "You got my sticky note correct?",
        options: [
            {
                text: "No I did not",
                next: "no_note"
            },
            {
                text: "Yes I did",
                next: "yes"
            }
        ]
    },

    yes: {
        speaker: "???",
        text: "Great I hope you managed to decode the message.",
        options: [
            {
                text: "Yes I did",
                next: "yesdid"
            },
            {
                text: "No I did not",
                next: "said"
            }
        ]
    },

    indeed: {
        speaker: "???",
        text: "Yes I am indeed. I hope you managed to decode the message",
        options: [
            {
                text: "Yes I did",
                next: "yesdid"
            },
            {
                text: "No I did not",
                next: "said"
            }
        ]
    },

    yesdid: {
        speaker: "???",
        text: "I knew you would be able to decode it, I have been keeping a close eye on you you know.",
        options: [
            {
                text: "Continue",
                next: "join"
            }
        ]
    },

    join: {
        speaker: "???",
        text: "So do you want to join.",
        options: [
            {
                text: "Yes I want to join",
                next: "iwant"
            },
            {
                text: "Join what?",
                next: "what"
            },
            {
                text: "No I do not want to join so go away",
                next: "nonot"
            }
        ]
    },

    iwant: {
        speaker: "Stefanie",
        text: "Great okay!.",
        options: [
            {
                text: "Continue",
                next: "plan"
            }
        ]
    },

    what: {
        speaker: "???",
        text: "I thought u said that u decoded the message. U know that you could have just said no and I would have told you?.",
        options: [
            {
                text: "Continue",
                next: "said"
            }
        ]
    },

    said: {
        speaker: "???",
        text: "It said: Are you not tired of the AI that is controlling us join the rebels. See you soon...",
        options: [
            {
                text: "Continue",
                next: "intro"
            }
        ]
    },

    nonot: {
        speaker: "???",
        text: "O okay then not I guess have fun with the very little life you have left.",
        options: [
            {
                text: "Continue",
                action: "level9"
            }
        ]
    },

    no_note: {
        speaker: "???",
        text: "I put it there so I know u got it.",
        options: [
            {
                text: "Okay I got it",
                next: "yes"
            },
            {
                text: "I really did not see it",
                next: "funny"
            }
        ]
    },

    funny: {
        speaker: "???",
        text: "Okay Mr funny pants then not. Enjoy youre last few moments while you can",
        options: [
            {
                text: "Continue",
                action: "level9"
            }
        ]
    }
};

startButton.addEventListener(
    "click",
    () => {

        startScreen.classList.add(
            "hidden"
        );

        showOutside();
    }
);

hotspotStephanie.addEventListener(
    "click",
    () => {

        if (
            dialogueActive
        ) {
            return;
        }

        showStephanie1();

        startDialogue(
            "level_start"
        );
    }
);

function showOutside() {

    outsideScene.classList.remove(
        "hidden"
    );

    stephanie1Scene.classList.add(
        "hidden"
    );

    stephanie2Scene.classList.add(
        "hidden"
    );

    locationLabel.textContent =
        "OUTSIDE CARAVAN";

    sceneName.textContent =
        "OUTSIDE CARAVAN";

    barLocation.textContent =
        "OUTSIDE CARAVAN";

    barHint.textContent =
        "CLICK STEFANIE.";

    dialogueActive =
        false;

    normalBar.classList.remove(
        "hidden"
    );

    dialogueContent.classList.add(
        "hidden"
    );
}

function showStephanie1() {

    outsideScene.classList.add(
        "hidden"
    );

    stephanie1Scene.classList.remove(
        "hidden"
    );

    stephanie2Scene.classList.add(
        "hidden"
    );

    locationLabel.textContent =
        "STEFANIE";

    sceneName.textContent =
        "STEFANIE";

    barLocation.textContent =
        "STEFANIE";
}

function showStephanie2() {

    outsideScene.classList.add(
        "hidden"
    );

    stephanie1Scene.classList.add(
        "hidden"
    );

    stephanie2Scene.classList.remove(
        "hidden"
    );

    locationLabel.textContent =
        "STEFANIE";

    sceneName.textContent =
        "STEFANIE";

    barLocation.textContent =
        "STEFANIE";
}

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

        return;
    }

    currentNodeId =
        nodeId;

    selectedOption =
        0;

    inputLocked =
        false;

    dialogueSpeaker.textContent =
        node.speaker;

    dialogueText.textContent =
        node.text;

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

    inputLocked =
        true;

    if (
        currentNodeId ===
        "level_start"
    ) {

        showStephanie2();
    }

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

    inputLocked =
        false;
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

document.addEventListener(
    "keydown",
    event => {

        if (
            !dialogueActive ||
            inputLocked
        ) {
            return;
        }

        const node =
            dialogueTree[
                currentNodeId
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
                ) - 1;

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
                    node.options.length - 1;
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
                selectedOption
            );
        }
    }
);