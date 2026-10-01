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

                    <div id="hud">
                        <span>LEVEL 7</span>
                        <span id="location-label">OUTSIDE CARAVAN</span>
                        <span id="scene-name">OUTSIDE CARAVAN</span>
                    </div>

                    <div
                        id="outside-scene"
                        class="game-scene"
                    >

                        <img
                            class="Background"
                            src="../../Images/caravan_stephanie_base.png"
                            alt=""
                        >

                        <button
                            id="hotspot-stephanie"
                            type="button"
                            aria-label="Stefanie"
                        ></button>

                        <img
                            id="stephanie-hover"
                            src="../../Images/caravan_stephanie_hover.png"
                            alt=""
                        >

                    </div>

                    <div
                        id="stephanie1-scene"
                        class="game-scene hidden"
                    >

                        <img
                            class="Background"
                            src="../../Images/stephanie1.png"
                            alt=""
                        >

                    </div>

                    <div
                        id="stephanie2-scene"
                        class="game-scene hidden"
                    >

                        <img
                            class="Background"
                            src="../../Images/stephanie2.png"
                            alt=""
                        >

                    </div>

                </div>

            </div>

            <img
                id="monitor-frame"
                src="../../Images/EnshittifiedTV.png"
                alt=""
            >

        </div>

    </div>

    <div id="bottom-bar">

        <div id="normal-bar">

            <div id="bar-location">
                OUTSIDE CARAVAN
            </div>

            <div id="bar-hint">
                CLICK STEFANIE.
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
                SOMEONE IS WAITING OUTSIDE.
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