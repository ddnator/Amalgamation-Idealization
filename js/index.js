window.addEventListener('load', init)


function init() {
    VarCreator()
    fillWindow()
    textCreator()
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




function textCreator() {
    const headerTitle = document.querySelector('#homeHeader h1')

    if (!headerTitle) return

    const sidewaysText = document.createElement('span')
    sidewaysText.textContent = 'Try now!'
    sidewaysText.classList.add('tilted')
    sidewaysText.style.display = 'inline-block'
    sidewaysText.style.marginLeft = '5px'
    sidewaysText.style.marginBottom = '30x'
    sidewaysText.style.verticalAlign = 'middle'

    headerTitle.appendChild(sidewaysText)
}

function fillWindow() {
}