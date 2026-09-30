window.addEventListener('load', init)

function init() {
    let titleOption = Math.floor(Math.random() * 6) + 1
    VarCreator()
    fillWindow()
    textCreator(titleOption)
    eventCreator()




}

function VarCreator() {
    let endButton = document.querySelector('#endGameButton')

    if (endButton) {
        endButton.addEventListener('click', EndButtonEventHandler)
    }
}

function eventCreator() {
    let visionButton = document.querySelector('.ourVision')

    if (visionButton) {
        visionButton.addEventListener('click', visionButtonEventHandler)
    }
}

function visionButtonEventHandler(event) {
    event.preventDefault()
    const visionText = document.querySelector('.visionText')
    visionText.hidden = !visionText.hidden
}

function EndButtonEventHandler(event) {
    history.back()
    event.preventDefault()
}




function textCreator(number) {
    let randomNumber = number
    const headerTitle = document.querySelector('#homeHeader h1')
    console.log(randomNumber)
    if (!headerTitle) {
        return
    }
    const sidewaysText = document.createElement('span')

    if (randomNumber == 1) {
        sidewaysText.textContent = 'Try now!'
    } else if (randomNumber == 2) {
        sidewaysText.textContent = 'Also try Cyberpunk!'
    } else if (randomNumber == 3) {
        sidewaysText.textContent = 'Leon Kennedy?'
    } else if (randomNumber == 4) {
        sidewaysText.textContent = 'Use your brain!'
    } else if (randomNumber == 5) {
        sidewaysText.textContent = 'Is this AI?'
    } else {
        sidewaysText.textContent = 'Can you stop the AI?'

    }


    sidewaysText.classList.add('tilted')

    headerTitle.appendChild(sidewaysText)
}

function fillWindow() {
}