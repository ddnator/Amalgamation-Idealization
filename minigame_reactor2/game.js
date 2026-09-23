const gameBoard = document.getElementById("gameBoard");
const nextNumberText = document.getElementById("nextNumber");
const restartButton = document.getElementById("restartButton");

const dateTimeContainer = document.getElementById('date-time');
const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');

let nextNumber = 1;


function updateDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString('nl-NL', {month: 'numeric', day: 'numeric'});
    const time = now.toLocaleTimeString('nl-NL', {hour: '2-digit', minute: '2-digit'});

    dateElement.textContent = date;
    timeElement.textContent = time;
}

setInterval(updateDateTime, 1000);
updateDateTime();
function startGame() {
    gameBoard.innerHTML = "";

    nextNumber = 1;
    nextNumberText.textContent = nextNumber;

    let numbers = [];
    for (let i = 1; i <= 10; i++) {
        numbers.push(i)
    }

    numbers.sort(() => Math.random() - 0.5);
    numbers.forEach(function (number) {


        const button = document.createElement("button");

        button.classList.add("number")
        button.textContent = number;

        button.addEventListener("click", function () {
            if (number === nextNumber) {
                button.classList.add("correct")
                nextNumber++;
                nextNumberText.textContent = nextNumber;

                if (nextNumber > 10) {
                    nextNumberText.textContent = "Done!";
                    alert("You completed the game");
                }

            } else {
                button.classList.add("incorrect");
                setTimeout(() => {
                    button.classList.remove("incorrect");
                }, 500);
            }
        });
        gameBoard.appendChild(button);
    });

    restartButton.addEventListener("click", startGame);
}
startGame();