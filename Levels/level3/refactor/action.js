function runAction(action) {
    switch (action) {
        /*  CLOSE DIALOGUE  */
        case "close":
            closeDialogue();
            break;

        /*  LEAVE HOME  */
        case "go_outside":
            setScene("outside");
            startDialogue("outside_caravan");
            break;

        case "go_home":
            location.replace("http://amalgamation-idealization.test/Levels/level4/level4.php")
        

            /* MINIGAME*/
        // function startMinigame() {
        //     closeDialogue();
        //     reactorMinigameFrame.src = "../../minigame_reactor1/mingame1.html?run=" + Date.now();
        //     minigameScreen.classList.remove("hidden");
        // }

        //     /* MINIGAME COMPLETE */
        // function finishLevel1Minigame() {
        //     game.minigameCompleted = true;
        //     minigameScreen.classList.add("hidden");
        //     reactorMinigameFrame.src = "about:blank";
        //     setScene("work_after");
        // }

        //     window.finishLevel1Minigame = finishLevel1Minigame;

        //     /* MINIGAME MESSAGE */

        //     window.addEventListener("message", event => {
        //             if (event.data && event.data.type === "level1-minigame-complete") {
        //                 finishLevel1Minigame();
        //             }
        //         }
        //     );
    }}