const gameBoard = document.getElementById("gameBoard");
const nextNumberText = document.getElementById("nextNumber");
const restartButton = document.getElementById("restartButton");

let nextNumber = 1;

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