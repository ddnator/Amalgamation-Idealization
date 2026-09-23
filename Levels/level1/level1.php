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

    <link
        rel="stylesheet"
        href="dialogue.css"
    >
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


        <div id="scene">

            <div id="scene-name">
                HOME
            </div>


            <!-- ===============================
                 HOME
            ================================ -->

            <button
                id="hotspot-bed"
                class="hotspot home-hotspot"
                type="button"
            >
                BED
            </button>


            <button
                id="hotspot-food"
                class="hotspot home-hotspot"
                type="button"
            >
                FOOD
            </button>


            <button
                id="hotspot-board"
                class="hotspot home-hotspot"
                type="button"
            >
                BOARD
            </button>


            <button
                id="hotspot-door"
                class="hotspot home-hotspot"
                type="button"
            >
                GO TO WORK
            </button>


            <!-- ===============================
                 WORK
            ================================ -->

            <button
                id="hotspot-jim"
                class="hotspot work-hotspot hidden"
                type="button"
            >
                JIM
            </button>


            <button
                id="hotspot-boss"
                class="hotspot work-hotspot hidden"
                type="button"
            >
                BOSS
            </button>


            <button
                id="hotspot-work"
                class="hotspot work-hotspot hidden"
                type="button"
            >
                START WORKING
            </button>


            <!-- ===============================
                 AFTER MINIGAME
            ================================ -->

            <button
                id="hotspot-home"
                class="hotspot after-work-hotspot hidden"
                type="button"
            >
                GO HOME
            </button>


            <button
                id="hotspot-bar"
                class="hotspot after-work-hotspot hidden"
                type="button"
            >
                GO BAR
            </button>

        </div>

    </div>


    <!-- =========================================
         BOTTOM BAR
    ========================================== -->

    <div id="bottom-bar">

        <!-- Normale point-and-click bar -->

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
         START
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

         Het iframe opent eerst Reactor 01.
         Reactor 01 gaat daarna naar Reactor 02.
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

</div>


<script src="dialogue.js"></script>

</body>
</html>