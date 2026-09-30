const dateTimeContainer = document.getElementById('date-time');
const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');

function updateDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString('nl-NL', {month: 'numeric', day: 'numeric'});
    const time = now.toLocaleTimeString('nl-NL', {hour: '2-digit', minute: '2-digit'});

    dateElement.textContent = date;
    timeElement.textContent = time;
}

setInterval(updateDateTime, 1000);
updateDateTime();

function updateMoney(amount) {
    const response = fetch('minigame4.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({earned: amount})
    });
}

const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let headlineText = document.querySelector("#level-title")
const choiceContainer = document.querySelector('dialog');
const closeButton = choiceContainer.querySelector('.close');
const dialogContent = choiceContainer.querySelector('#dialog-content');

document.querySelectorAll(".btn").forEach(button => button.addEventListener('click', function () {
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
}));
document.querySelector('.start-button').addEventListener('click', function () {
    if (started === false) {
        nextSequence();
        started = true;
    }
});

function startOver() {
    gamePattern = [];
    started = false;
}

function nextSequence() {
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor)
    lightUp(randomChosenColor)

    function lightUp(randomChosenColor) {
        const button = document.getElementById(randomChosenColor);
        button.classList.add('lit');

        setTimeout(() => {
            button.classList.remove('lit');
        }, 300);
    }
}

function animatePress(currentColor) {
    const button = document.querySelector("#" + currentColor)
    button.classList.add("pressed");
    setTimeout(function () {
        button.classList.remove("pressed")
    }, 300);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (currentLevel === 4) {
            headlineText.innerText = "Memory training succes!";
            dialogContent.innerHTML = '';
            const message = document.createElement("h3");
            const dialogButton = document.createElement("button");
            const image = document.createElement('img')

            message.innerText = 'Memory training succesfull!'
            dialogButton.innerText = 'Leave work'
            image.src = '../images/good-job.png'
            dialogContent.appendChild(message);
            dialogContent.appendChild(image);
            dialogContent.appendChild(dialogButton);
            choiceContainer.showModal();

            dialogButton.addEventListener('click', async () => {
                await updateMoney(50);
                window.location.href = '../levels/level5/level5.php?reactorComplete=1&points=100'
            });
        }
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        document.querySelector("body").classList.add("game-over");
        setTimeout(function () {
            document.querySelector("body").classList.remove("game-over");
        }, 200);
        headlineText.innerText = "Memory training failed!";
        startOver();
    }
}


