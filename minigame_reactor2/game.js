const gameBoard = document.getElementById("gameBoard");
const nextNumberText = document.getElementById("nextNumber");
const restartButton = document.getElementById("restartButton");
const dateElement = document.getElementById("date");
const timeElement = document.getElementById("time");

let nextNumber = 1;
let gameFinished = false;


function updateDateTime() {

    const now = new Date();
    const date =
        now.toLocaleDateString("nl-NL", {
                month: "numeric", day: "numeric"
            });

    const time =
        now.toLocaleTimeString("nl-NL", {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    dateElement.textContent = date;
    timeElement.textContent = time;
}


setInterval(updateDateTime, 1000);
updateDateTime();


function startGame() {

    gameBoard.innerHTML = "";
    nextNumber = 1;
    gameFinished = false;
    nextNumberText.textContent = nextNumber;

    const numbers = [];
    for (let i = 1; i <= 10; i++) {numbers.push(i);}

    numbers.sort(() => Math.random() - 0.5);
    numbers.forEach(number => {
            const button = document.createElement("button");
            button.classList.add("number");
            button.textContent = number;
            button.addEventListener("click", () => { handleNumberClick(number, button);
                }
            );
            gameBoard.appendChild(button);
        }
    );
}

function handleNumberClick(number, button) {

    if (gameFinished) {
        return;
    }

    if (number === nextNumber) {
        button.classList.add(
            "correct"
        );


        button.disabled = true;
        nextNumber++;

        if (nextNumber > 10) {
            finishReactor2();
            return;
        }

        nextNumberText.textContent = nextNumber;
        return;
    }

    button.classList.add(
        "incorrect"
    );

    setTimeout(() => {
            button.classList.remove(
                "incorrect"
            );
        }, 500
    );
}

function finishReactor2() {

    if (
        gameFinished
    ) {

        return;
    }

    gameFinished = true;
    nextNumberText.textContent = "Done!";
    setTimeout(
        returnToLevel1,
        700
    );

}

function returnToLevel1() {

    console.log(
        "Reactor 2 complete - returning to Level 1"
    );

    try {

        if (
            window.parent &&
            window.parent !== window &&
            typeof window.parent.finishLevel1Minigame === "function"
        ) {

            window.parent.finishLevel1Minigame();
            return;
        }
    }

    catch (error) {
        console.warn(
            "Direct parent call failed:",
            error
        );
    }

    if (
        window.parent &&
        window.parent !== window
    ) {

        window.parent.postMessage({
                type:
                    "level1-minigame-complete"
            },
            "*"
        );


        return;
    }
    window.location.href =
        "../Levels/level1/level1.php?reactorComplete=1";
}

restartButton.addEventListener(
    "click",
    startGame
);

startGame();