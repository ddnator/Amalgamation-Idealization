const dateTimeContainer = document.getElementById('date-time');
const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');

const choiceContainer = document.querySelector('dialog');
const closeButton = choiceContainer.querySelector('.close');
const dialogContent = choiceContainer.querySelector('#dialog-content');

const moneyContainer = document.querySelector('#money-made');

closeButton.addEventListener('click', () => {
    choiceContainer.close();
});

function updateDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString('nl-NL', {month: 'numeric', day: 'numeric'});
    const time = now.toLocaleTimeString('nl-NL', {hour: '2-digit', minute: '2-digit'});

    dateElement.textContent = date;
    timeElement.textContent = time;
}

setInterval(updateDateTime, 1000);
updateDateTime();

async function updateMoney(amount) {
    const response = await fetch('minigame1.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({earned: amount})
    });
}


window.addEventListener('load', () => addMessage(0));
const messagesContainer = document.getElementById('messages');

function addMessage(messageIndex) {
    messagesContainer.innerHTML = ''
    choiceContainer.close();

    const messageText = document.createElement("p")
    if (messageIndex === 0) {
        messageText.textContent = '> Temperature is too high'
    } else if (messageIndex === 1) {
        messageText.textContent = '> The core is not getting enough power'
    }

    messagesContainer.appendChild(messageText);
}

window.addEventListener('load', () => addChoices(0));

function addChoices(choicesIndex) {
    const choice1 = document.getElementById('choice-1');
    const choice2 = document.getElementById('choice-2');
    const choice3 = document.getElementById('choice-3');
    const choice4 = document.getElementById('choice-4');

    if (choicesIndex === 0) {
        const choicesOne = [
            {text: 'Increase the power usage'},
            {text: 'Open a window'},
            {text: 'Increase the coolant flow',},
            {text: 'Increase the pressure'}
        ];
        choice1.textContent = '[A] ' + choicesOne[0].text;
        choice1.addEventListener('click', () => choicesReaction(0));

        choice2.textContent = '[B] ' + choicesOne[1].text;
        choice2.addEventListener('click', () => choicesReaction(1));

        choice3.textContent = '[C] ' + choicesOne[2].text;
        choice3.addEventListener('click', () => choicesReaction(2));

        choice4.textContent = '[D] ' + choicesOne[3].text;
        choice4.addEventListener('click', () => choicesReaction(3));
    } else if (choicesIndex === 1) {
        const choicesTwo = [
            {text: 'Increase the coolant flow'},
            {text: 'Open a window'},
            {text: 'Increase the power usage',},
            {text: 'Increase the pressure'}
        ];
        choice1.textContent = '[A] ' + choicesTwo[0].text;
        choice1.addEventListener('click', () => choicesReaction(4));

        choice2.textContent = '[B] ' + choicesTwo[1].text;
        choice2.addEventListener('click', () => choicesReaction(5));

        choice3.textContent = '[C] ' + choicesTwo[2].text;
        choice3.addEventListener('click', () => choicesReaction(6));

        choice4.textContent = '[D] ' + choicesTwo[3].text;
        choice4.addEventListener('click', () => choicesReaction(7));
    }
}

function choicesReaction(choiceIndex) {

    dialogContent.innerHTML = '';
    const message = document.createElement("h3");
    const button = document.createElement("button");
    const image = document.createElement('img')


    if (choiceIndex === 0) {
        message.innerText = 'You increased the power usage, the temperature is rising even more!'
        button.innerText = 'Go back';
        image.src = '../images/bad-job.png'
        button.addEventListener('click', () => {
            choiceContainer.close();
        });
    } else if (choiceIndex === 1) {
        message.innerText = 'You opened a window, this does nothing at all.'
        button.innerText = 'Go back';
        image.src = '../images/bad-job.png'
        button.addEventListener('click', () => {
        });
    } else if (choiceIndex === 2) {
        message.innerText = 'You increased the coolant flow, the temperature is dropping.'
        button.innerText = 'Proceed';
        image.src = '../images/good-job.png'
        button.addEventListener('click', async () => {
            await updateMoney(50);
            addMessage(1);
            addChoices(1);
        });
    } else if (choiceIndex === 3) {
        message.innerText = 'You increased the pressure, the temperature is rising even more.'
        button.innerText = 'Go back';
        image.src = '../images/bad-job.png';
        button.addEventListener('click', () => {
            choiceContainer.close();
        });
    } else if (choiceIndex === 4) {
        message.innerText = 'You increased the coolant flow, this does nothing.'
        button.innerText = 'Go back';
        image.src = '../images/bad-job.png'
        button.addEventListener('click', () => {
            choiceContainer.close();
        });
    } else if (choiceIndex === 5) {
        message.innerText = 'You opened a window, this does nothing.'
        button.innerText = 'Go back';
        image.src = '../images/bad-job.png'
        button.addEventListener('click', () => {
            choiceContainer.close();
        });
    } else if (choiceIndex === 6) {
        message.innerText = 'You increased the power usage, the core is now getting enough power.'
        button.innerText = 'Proceed';
        image.src = '../images/good-job.png'
        button.addEventListener('click', async () => {
            await updateMoney(50);
            window.location.href = "../minigame_reactor2/index.php?points=100";
        });
    } else if (choiceIndex === 7) {
        message.innerText = 'You increased the pressure, this does nothing.'
        button.innerText = 'Go back'
        image.src = '../images/bad-job.png';
        button.addEventListener('click', () => {
            choiceContainer.close();
        });
    }

    dialogContent.appendChild(message);
    dialogContent.appendChild(image);
    dialogContent.appendChild(button);
    choiceContainer.showModal();

}