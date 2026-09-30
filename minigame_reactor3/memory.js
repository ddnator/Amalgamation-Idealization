const cards = document.querySelectorAll('.memory-card');


let matchedPairs = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    matchedPairs++;

    resetBoard();

    if (matchedPairs === cards.length / 2) {
        showWinDialog();
    }
}

function showWinDialog() {
    const dialog = document.querySelector('dialog');
    const dialogContent = document.querySelector('#dialog-content');

    dialogContent.innerHTML = `
        <h2>Completed!</h2>
        <p>You found all the cards!</p>
        <img src="../images/good-job.png" alt="">
        <button class="done-button">Done</button>
    `;

    const doneButton = dialogContent.querySelector('.done-button');

    doneButton.addEventListener('click', () => {
        window.location.href = 'memory.php?points=100';
    });

    dialog.showModal();
}
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

const dialog = document.querySelector('dialog');
const closeButton = document.querySelector('.close');

closeButton.addEventListener('click', () => {
    dialog.close();
});
