const gameBoard =
    document.getElementById("gameBoard");

const nextNumberText =
    document.getElementById("nextNumber");

const restartButton =
    document.getElementById("restartButton");

const dateElement =
    document.getElementById("date");

const timeElement =
    document.getElementById("time");


let nextNumber = 1;

let gameFinished = false;


/* =========================================
   CLOCK
========================================= */

function updateDateTime() {

    const now =
        new Date();


    const date =
        now.toLocaleDateString(
            "nl-NL",
            {
                month: "numeric",
                day: "numeric"
            }
        );


    const time =
        now.toLocaleTimeString(
            "nl-NL",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    dateElement.textContent =
        date;

    timeElement.textContent =
        time;
}


setInterval(
    updateDateTime,
    1000
);

updateDateTime();


/* =========================================
   START GAME
========================================= */

function startGame() {

    gameBoard.innerHTML =
        "";


    nextNumber =
        1;


    gameFinished =
        false;


    nextNumberText.textContent =
        nextNumber;


    const numbers =
        [];


    for (
        let i = 1;
        i <= 10;
        i++
    ) {

        numbers.push(i);
    }


    /* SHUFFLE */

    numbers.sort(
        () =>
            Math.random() - 0.5
    );


    numbers.forEach(
        number => {

            const button =
                document.createElement(
                    "button"
                );


            button.classList.add(
                "number"
            );


            button.textContent =
                number;


            button.addEventListener(
                "click",
                () => {

                    handleNumberClick(
                        number,
                        button
                    );

                }
            );


            gameBoard.appendChild(
                button
            );

        }
    );
}


/* =========================================
   NUMBER CLICK
========================================= */

function handleNumberClick(
    number,
    button
) {

    if (
        gameFinished
    ) {

        return;
    }


    /* =====================================
       CORRECT
    ====================================== */

    if (
        number === nextNumber
    ) {

        button.classList.add(
            "correct"
        );


        button.disabled =
            true;


        nextNumber++;


        /*
            10 was het laatste nummer.
        */

        if (
            nextNumber > 10
        ) {

            finishReactor2();

            return;
        }


        nextNumberText.textContent =
            nextNumber;


        return;
    }


    /* =====================================
       WRONG
    ====================================== */

    button.classList.add(
        "incorrect"
    );


    setTimeout(
        () => {

            button.classList.remove(
                "incorrect"
            );

        },

        500
    );

}


/* =========================================
   REACTOR 2 COMPLETE
========================================= */

function finishReactor2() {

    if (
        gameFinished
    ) {

        return;
    }


    gameFinished =
        true;


    nextNumberText.textContent =
        "Done!";


    /*
        Geef speler heel even tijd
        om DONE te zien.
    */

    setTimeout(
        returnToLevel1,
        700
    );

}


/* =========================================
   RETURN TO LEVEL 1
========================================= */

function returnToLevel1() {

    console.log(
        "Reactor 2 complete - returning to Level 1"
    );


    /*
        METHODE 1

        Als Level 1 de minigame in een iframe
        heeft geopend en dezelfde website/origin
        gebruikt, kunnen we de Level 1 functie
        direct aanroepen.

        Dit is de belangrijkste methode.
    */

    try {

        if (
            window.parent &&
            window.parent !== window &&
            typeof window.parent.finishLevel1Minigame === "function"
        ) {

            window.parent.finishLevel1Minigame();

            return;
        }

    }

    catch (error) {

        console.warn(
            "Direct parent call failed:",
            error
        );

    }


    /*
        METHODE 2

        Fallback via postMessage.
    */

    if (
        window.parent &&
        window.parent !== window
    ) {

        window.parent.postMessage(
            {
                type:
                    "level1-minigame-complete"
            },
            "*"
        );


        return;
    }


    /*
        METHODE 3

        Als Reactor 2 per ongeluk los is geopend,
        ga terug naar Level 1.

        Deze route klopt bij:

        project/
        ├── Levels/
        │   └── level1/
        │       └── level1.php
        │
        └── minigame_reactor2/
            └── index.html
    */

    window.location.href =
        "../Levels/level1/level1.php?reactorComplete=1";
}


/* =========================================
   RESTART BUTTON
========================================= */

restartButton.addEventListener(
    "click",
    startGame
);


/* =========================================
   START
========================================= */

startGame();