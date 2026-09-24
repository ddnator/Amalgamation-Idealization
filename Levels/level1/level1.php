<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">

    <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
    >

    <title>Level 1</title>

    <link
            href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap"
            rel="stylesheet"
    >

    <link rel="stylesheet" href="dialogue.css">
    <link rel="stylesheet" href="/css/PAC.css">
</head>

<body>

<div id="game">

    <!-- =========================================
         POINT AND CLICK AREA
    ========================================== -->

    <div id="point-click-area">

        <div id="hud">
            <span>LEVEL 1</span>

            <span id="location-label">
                HOME
            </span>
        </div>


        <!-- =====================================
              CARAVAN SCENE INSIDE
        ====================================== -->

        <div id="caravanScene" class="game-scene">

            <img
                    class="Background"
                    src="/Images/Home_Base.png"
                    alt=""
            >

            <button
                    id="hotspot-bed"
                    class="Bed"
                    type="button"
            ></button>

            <img
                    class="Overlay BedOverlay"
                    src="/Images/Home_bed.png"
                    alt=""
            >


            <button
                    id="hotspot-computer"
                    class="Computer"
                    type="button"
            ></button>

            <img
                    class="Overlay ComputerOverlay"
                    src="/Images/Home_Computer.png"
                    alt=""
            >


            <button
                    id="hotspot-kitchen"
                    class="Kitchen"
                    type="button"
            ></button>

            <img
                    class="Overlay KitchenOverlay"
                    src="/Images/Home_kitchen.png"
                    alt=""
            >

        </div>

        <!-- =====================================
            CARAVAN SCENE OUTSIDE (Only hotspot is the door)
      ====================================== -->
        <div id="caravanSceneOutside" class="game-scene hidden">

            <img
                    class="Background"
                    src="/Images/CAravan_Base.png"
                    alt=""
            >
        </div>

        <button
                id="hotspot-door"
                class="Door"
                type="button"
        ></button>

        <img
                class="Overlay DoorOverlay"
                src="/Images/CAravan_Door.png"
                alt=""
        >


    </div>


    <!-- =========================================
         BOTTOM BAR
    ========================================== -->

    <div id="bottom-bar">

        <div id="normal-bar">

            <div id="bar-location">
                HOME
            </div>

            <div id="bar-hint">
                CLICK SOMETHING.
            </div>

        </div>


        <!-- Dialogue -->

        <div
                id="dialogue-content"
                class="hidden"
        >

            <div id="dialogue-speaker">
                JIM
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


    <!-- =========================================
         START SCREEN
    ========================================== -->

    <div id="start-screen">

        <div class="screen">

            <div class="tiny">
                LEVEL_1.EXE
            </div>

            <h1>
                LEVEL 1
            </h1>

            <button
                    id="start-button"
                    type="button"
            >
                &gt; START GAME
            </button>

        </div>

    </div>


    <!-- =========================================
         REACTOR MINIGAME
    ========================================== -->

    <div
            id="minigame-screen"
            class="hidden"
    >

        <iframe
                id="reactor-minigame-frame"
                title="Reactor minigame"
                src="about:blank"
                allow="autoplay"
        ></iframe>

    </div>


    <!-- =========================================
         LEVEL END
    ========================================== -->

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
                &gt; RESTART LEVEL 1
            </button>

        </div>

    </div>

<script src="dialogue.js"></script>

</body>
</html>