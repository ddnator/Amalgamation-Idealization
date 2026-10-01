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

async function updateMoney(amount) {
    const response = await fetch('minigame2.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ earned: amount })
    });
}


function startGame() {

    gameBoard.innerHTML = "";
    nextNumber = 1;
    gameFinished = false;
    nextNumberText.textContent = nextNumber;

    const numbers = [];
    for (let i = 1; i <= 10; i++) { numbers.push(i); }

    numbers.sort(() => Math.random() - 0.5);
    numbers.forEach(number => {
        const button = document.createElement("button");
        button.classList.add("number");
        button.textContent = number;
        button.addEventListener("click", () => {
            handleNumberClick(number, button);
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

    button.classList.add("incorrect");

    setTimeout(() => {
        button.classList.remove(
            "incorrect"
        );
    }, 500
    );
}

function showWinDialog() {
    const dialog = document.querySelector('dialog');
    const dialogContent = document.querySelector('#dialog-content');

    dialogContent.innerHTML = `
        <h2>Completed!</h2>
        <p>You found all the numbers!</p>
        <img src="../images/good-job.png" alt="">
        <button class="done-button">Done</button>
    `;

    const doneButton = dialogContent.querySelector('.done-button');

    doneButton.addEventListener('click', () => {
        window.location.href = '../levels/level1/level1.php?gameWon=1';
    });

    dialog.showModal();
}

function finishReactor2() {
    if (gameFinished) {
        return;
    }

    gameFinished = true;
    nextNumberText.textContent = "Done!";

    showWinDialog();
}

function returnToLevel5() {
    window.location.href = "../Levels/level5/level5.php?reactorComplete=1&points=100";
}

restartButton.addEventListener("click", startGame);
startGame();