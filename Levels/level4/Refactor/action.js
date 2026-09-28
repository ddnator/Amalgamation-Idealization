/* =========================================
                    ACTIONS
========================================= */
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

        /*  GO TO WORK */
        case "go_to_work":
            setScene("walkingToWorkDay");
            startDialogue("walk_to_work");
            break;

        /*  ARRIVE AT POWERPLANT  */
        case "OutsideWorkDay":
            setScene("OutsideWorkDay");
            startDialogue("winston_nuclear_powerplant");
            break;

        /*  ARRIVE AT WORK  */
        case "show_work":
            setScene("work");
            startDialogue("jim_intro");
            break;

        /*  LEAVE JIM  */
        case "leave_jim":
            closeDialogue();
            break;

        /*  START MINIGAME  */
        case "start_minigame":
            startMinigame();
            break;

            /* MINIGAME*/
        function startMinigame() {
            closeDialogue();
            reactorMinigameFrame.src = "../../minigame_reactor1/mingame1.html?run=" + Date.now();
            minigameScreen.classList.remove("hidden");
        }

            /* MINIGAME COMPLETE */
        function finishLevel1Minigame() {
            game.minigameCompleted = true;
            minigameScreen.classList.add("hidden");
            reactorMinigameFrame.src = "about:blank";
            setScene("work_after");
        }

            window.finishLevel1Minigame = finishLevel1Minigame;

            /* MINIGAME MESSAGE */

            window.addEventListener("message", event => {
                    if (event.data && event.data.type === "level1-minigame-complete") {
                        finishLevel1Minigame();
                    }
                }
            );
    }}