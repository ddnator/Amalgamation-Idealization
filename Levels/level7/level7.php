<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Level 7</title>

    <link
        href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap"
        rel="stylesheet"
    >

    <link
        rel="stylesheet"
        href="dialogue.css"
    >

</head>

<body>


<div id="game">




    <button
        id="fullscreen-toggle"
        type="button"
        aria-label="Toggle fullscreen"
        title="Fullscreen"
    >
        ⛶ FULLSCREEN
    </button>


  

    <div id="monitor-area">


        <div id="monitor-shell">



            <div id="monitor-viewport">


                <div id="point-click-area">



                    <img
                        id="home-background"
                        class="Background"
                        src="/Images/Home_Base.png"
                        alt=""
                    >



                    <div id="hud">

                        <span>
                            LEVEL 7
                        </span>

                        <span id="location-label">
                            HOME
                        </span>

                        <span id="scene-name">
                            HOME
                        </span>

                    </div>


                </div>


            </div>




            <img
                id="monitor-frame"
                src="/Images/EnshittifiedTV.png"
                alt=""
            >


        </div>


    </div>


    <div id="bottom-bar">


        <div id="normal-bar">

            <div id="bar-location">
                HOME
            </div>

            <div id="bar-hint">
                SOMEONE IS WAITING AT YOUR DOOR.
            </div>

        </div>



        <div
            id="dialogue-content"
            class="hidden"
        >

            <div id="dialogue-speaker">
                NARRATOR
            </div>


            <div id="dialogue-text">
                ...
            </div>


            <div id="dialogue-options"></div>


            <div id="dialogue-help">
                ↑ ↓ SELECT &nbsp;&nbsp; ENTER / 1-4
            </div>


        </div>


    </div>


    <div id="start-screen">


        <div class="start-menu">


            <div class="tiny">
                LEVEL_7.EXE
            </div>


            <h1>
                LEVEL 7
            </h1>


            <p>
                SOMEONE IS WAITING.
            </p>


            <button
                id="start-button"
                type="button"
            >
                &gt; START GAME
            </button>


        </div>


    </div>


</div>


<script src="dialogue.js"></script>
<script src="fullscreen.js"></script>


</body>

</html>