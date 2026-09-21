window.addEventListener('load', init)




function init() {
    VarCreator()

}

function VarCreator() {
    let endButton = document.querySelector('#endGameButton')
    endButton.addEventListener('click', EndButtonEventHandler(event))
}


function EndButtonEventHandler() {
    event.preventDefault()
}