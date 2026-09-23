const dateTimeContainer = document.getElementById('date-time');
const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');

const choiceContainer = document.querySelector('dialog');
const closeButton = choiceContainer.querySelector('.close');
const dialogContent = choiceContainer.querySelector('#dialog-content');

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

window.addEventListener('load', addMessage);
const messagesContainer = document.getElementById('messages');

function addMessage(message) {

    const messageText = document.createElement("p")
    messageText.textContent = '> Temperature is too high'

    messagesContainer.appendChild(messageText);
}

window.addEventListener('load', addChoices);

function addChoices() {
    const choice1 = document.getElementById('choice-1');
    const choice2 = document.getElementById('choice-2');
    const choice3 = document.getElementById('choice-3');
    const choice4 = document.getElementById('choice-4');

    const choices = [
        {text: 'Increase the power usage'},
        {text: 'Open a window'},
        {text: 'Increase the coolant flow',},
        {text: 'Increase the pressure'}
    ];

    choice1.textContent = '[A] ' + choices[0].text;
    choice1.addEventListener('click', () => choicesReaction(0));

    choice2.textContent = '[B] ' + choices[1].text;
    choice2.addEventListener('click', () => choicesReaction(1));

    choice3.textContent = '[C] ' + choices[2].text;
    choice3.addEventListener('click', () => choicesReaction(2));

    choice4.textContent = '[D] ' + choices[3].text;
    choice4.addEventListener('click', () => choicesReaction(3));
}

function choicesReaction(choiceIndex) {

    dialogContent.innerHTML = '';
    const message = document.createElement("h3");


    if (choiceIndex === 0) {
        message.innerText = 'You increased the power usage, the temperature is rising even more!'
    } else if (choiceIndex === 1) {
        message.innerText = 'You opened a window, this does nothing at all.'
    } else if (choiceIndex === 2) {
        message.innerText = 'You increased the coolant flow, the temperature is dropping.'
    } else if (choiceIndex === 3) {
        message.innerText = 'You increased the pressure, the temperature is rising even more.'
    }

    dialogContent.appendChild(message);
    choiceContainer.showModal();

}