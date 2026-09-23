<!DOCTYPE html>
<html lang="nl">

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


    <!-- ==================================================
         POINT AND CLICK SPEELVELD
    =================================================== -->

    <div id="point-click-area">


        <!-- HUD -->

        <div id="hud">

            <span>
                LEVEL 1
            </span>

            <span id="location-label">
                HOME
            </span>

        </div>


        <!-- SCENE -->

        <div id="scene">

            <!--
                Later kun je hier een echte achtergrond
                of afbeelding plaatsen.

                Bijvoorbeeld:

                <img
                    id="scene-background"
                    src="img/home.png"
                    alt=""
                >
            -->


            <div id="scene-name">
                HOME
            </div>


            <!-- ==========================================
                 HOME HOTSPOTS
            =========================================== -->

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



            <!-- ==========================================
                 WORK HOTSPOTS
            =========================================== -->

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



            <!-- ==========================================
                 AFTER MINIGAME
            =========================================== -->

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



    <!-- ==================================================
         BOTTOM BAR
    =================================================== -->

    <div id="bottom-bar">


        <!-- ==========================================
             NORMALE BAR
             Als niemand praat
        =========================================== -->

        <div id="normal-bar">

            <div id="bar-location">
                HOME
            </div>

            <div id="bar-hint">
                CLICK SOMETHING.
            </div>

        </div>



        <!-- ==========================================
             DIALOGUE
        =========================================== -->

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



    <!-- ==================================================
         START
    =================================================== -->

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



    <!-- ==================================================
         MINIGAME PLACEHOLDER
    =================================================== -->

    <div
        id="minigame-screen"
        class="hidden"
    >

        <div class="screen">

            <div class="tiny">
                WORK_TASK.EXE
            </div>

            <h1>
                [MINIGAME]
            </h1>

            <p>
                Hier komt jullie echte minigame.
            </p>

            <button
                id="finish-minigame"
                type="button"
            >
                &gt; COMPLETE MINIGAME
            </button>

        </div>

    </div>



    <!-- ==================================================
         LEVEL END
    =================================================== -->

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