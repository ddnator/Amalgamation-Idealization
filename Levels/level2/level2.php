<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Level 2</title>

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
                        <span>LEVEL 2</span>
                        <span id="location-label">HOME</span>
                        <span id="scene-name">HOME</span>
                    </div>

                    <div
                        id="caravanScene"
                        class="game-scene"
                    >
                        <img
                            class="Background"
                            src="../../Images/Home_Base.png"
                            alt=""
                        >

                        <button
                            id="hotspot-bed"
                            class="hotspot home-hotspot bed-hotspot"
                            type="button"
                            aria-label="Bed"
                        ></button>

                        <img
                            class="Overlay BedOverlay"
                            src="../../Images/Home_bed.png"
                            alt=""
                        >

                        <button
                            id="hotspot-computer"
                            class="hotspot home-hotspot computer-hotspot"
                            type="button"
                            aria-label="Computer"
                        ></button>

                        <img
                            class="Overlay ComputerOverlay"
                            src="../../Images/Home_Computer.png"
                            alt=""
                        >

                        <button
                            id="hotspot-kitchen"
                            class="hotspot home-hotspot kitchen-hotspot"
                            type="button"
                            aria-label="Kitchen"
                        ></button>

                        <img
                            class="Overlay KitchenOverlay"
                            src="../../Images/Home_kitchen.png"
                            alt=""
                        >

                        <button
                            id="hotspot-breakfast"
                            class="hotspot home-hotspot breakfast-hotspot"
                            type="button"
                            aria-label="Breakfast"
                        ></button>

                        <img
                            class="Overlay BreakfastOverlay hidden"
                            src="../../Images/Breakfast.png"
                            alt=""
                        >

                        <button
                            id="hotspot-exit"
                            class="hotspot home-hotspot exit-hotspot"
                            type="button"
                            aria-label="Leave home"
                        ></button>

                        <img
                            class="Overlay ExitOverlay"
                            src="../../Images/Home_Exit.png"
                            alt=""
                        >
                    </div>

                    <div
                        id="caravanSceneOutside"
                        class="game-scene hidden"
                    >
                        <img
                            class="Background"
                            src="../../Images/CAravan_Base.png"
                            alt=""
                        >

                        <button
                            id="hotspot-door"
                            class="hotspot outside-hotspot door-hotspot"
                            type="button"
                            aria-label="Door"
                        ></button>

                        <img
                            class="Overlay DoorOverlay"
                            src="../../Images/CAravan_Door.png"
                            alt=""
                        >
                    </div>

                    <div
                        id="walkingToWorkDay"
                        class="game-scene hidden"
                    >
                        <img
                            class="Background"
                            src="../../Images/StreetDay.png"
                            alt=""
                        >
                    </div>

                    <div
                        id="OutsideWorkDay"
                        class="game-scene hidden"
                    >
                        <img
                            class="Background"
                            src="../../Images/Work_Outside_D.png"
                            alt=""
                        >
                    </div>

                    <div
                        id="work"
                        class="game-scene hidden"
                    >
                        <img
                            class="Background"
                            src="../../Images/Work_Base.png"
                            alt=""
                        >

                        <button
                            id="hotspot-jim"
                            class="hotspot work-hotspot jim-hotspot"
                            type="button"
                            aria-label="Jim"
                        ></button>

                        <img
                            class="Overlay JimOverlay"
                            src="../../Images/Work_JimO.png"
                            alt=""
                        >

                        <button
                            id="hotspot-work"
                            class="hotspot work-hotspot work-terminal-hotspot"
                            type="button"
                            aria-label="Work"
                        ></button>

                        <img
                            class="Overlay WorkOverlay"
                            src="../../Images/Work_MinigameO.png"
                            alt=""
                        >

                        <button
                            id="hotspot-boss"
                            class="hotspot work-hotspot boss-hotspot"
                            type="button"
                            aria-label="Boss"
                        ></button>

                        <img
                            class="Overlay BossOverlay"
                            src="../../Images/Work_TalkToBossO.png"
                            alt=""
                        >

                        <button
                            id="hotspot-home"
                            class="after-work-hotspot hidden"
                            type="button"
                        >
                            GO HOME
                        </button>

                        <button
                            id="hotspot-bar"
                            class="after-work-hotspot hidden"
                            type="button"
                        >
                            GO BAR
                        </button>
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
                HOME
            </div>

            <div id="bar-hint">
                CLICK SOMETHING.
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

        <div class="screen">

            <div class="tiny">
                LEVEL_2.EXE
            </div>

            <h1>
                LEVEL 2
            </h1>

            <button
                id="start-button"
                type="button"
            >
                &gt; START GAME
            </button>

        </div>

    </div>

    <div
        id="minigame-screen"
        class="hidden"
    >

        <button
            id="minigame-close"
            type="button"
        >
            ✕ RETURN TO WORK
        </button>

        <iframe
            id="reactor-minigame-frame"
            src="about:blank"
            title="Reactor minigame"
        ></iframe>

    </div>

    <div
        id="end-screen"
        class="hidden"
    >

        <div class="screen">

            <h1 id="end-title">
                LEVEL COMPLETE
            </h1>

            <p id="end-text"></p>

            <button
                id="restart-button"
                type="button"
            >
                &gt; RESTART LEVEL 2
            </button>

        </div>

    </div>

</div>

<script
    type="module"
    src="dialogue.js"
></script>

<script src="fullscreen.js"></script>

</body>

</html>