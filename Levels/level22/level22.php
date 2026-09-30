<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Level 22</title>

    <link
        href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap"
        rel="stylesheet"
    >

    <link rel="stylesheet" href="../../css/PAC.css">
    <link rel="stylesheet" href="dialogue.css">
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
                        <span>LEVEL 22</span>

                        <span id="location-label">
                            OUTSIDE WORK
                        </span>

                        <span id="scene-name">
                            OUTSIDE WORK
                        </span>
                    </div>


                    <!-- =====================================
                         CARAVAN SCENE INSIDE
                    ====================================== -->

                    <div id="caravanScene" class="game-scene">

                        <img
                            class="Background"
                            src="../../Images/Home_Base.png"
                            alt=""
                        >

                        <button
                            id="hotspot-bed"
                            class="Bed"
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
                            class="Computer"
                            type="button"
                            aria-label="Computer"
                        ></button>

                        <img
                            class="Overlay ComputerOverlay"
                            src="../../Images/Home_Computer.png"
                            alt=""
                        >

                        <button
                            id="hotspot-breakfast"
                            class="Breakfast"
                            type="button"
                            aria-label="Breakfast"
                        ></button>

                        <img
                            class="Overlay BreakfastOverlay hidden"
                            src="../../Images/Breakfast.png"
                            alt=""
                        >

                        <button
                            id="hotspot-kitchen"
                            class="Kitchen"
                            type="button"
                            aria-label="Kitchen"
                        ></button>

                        <img
                            class="Overlay KitchenOverlay"
                            src="../../Images/Home_kitchen.png"
                            alt=""
                        >

                    </div>


                    <!-- =====================================
                         CARAVAN OUTSIDE NIGHT
                    ====================================== -->

                    <div id="caravanSceneOutside" class="game-scene hidden">

                        <img
                            class="Background"
                            src="../../Images/CAravan_Base_N.png"
                            alt=""
                        >

                    </div>

                    <button
                        id="hotspot-door"
                        class="Door"
                        type="button"
                        aria-label="Door"
                    ></button>

                    <img
                        class="Overlay DoorOverlay"
                        src="../../Images/CAravan_Door.png"
                        alt=""
                    >


                    <!-- =====================================
                         WALKING HOME NIGHT
                    ====================================== -->

                    <div id="walkingHomeNight" class="game-scene hidden">

                        <img
                            class="Background"
                            src="../../Images/StreetNight.png"
                            alt=""
                        >

                    </div>


                    <!-- =====================================
                         OUTSIDE WORK NIGHT
                    ====================================== -->

                    <div id="OutsideWorkNight" class="game-scene hidden">

                        <img
                            class="Background"
                            src="../../Images/Work_Outside.png"
                            alt=""
                        >

                    </div>


                    <!-- =====================================
                         ERWIN'S BAR
                    ====================================== -->

                    <div id="ErwinsBar" class="game-scene hidden">

                        <img
                            class="Background"
                            src="../../Images/ErwinBar_Base.png"
                            alt=""
                        >

                        <button
                            id="hotspot-steven"
                            class="steven"
                            type="button"
                            aria-label="Steven"
                        ></button>

                        <img
                            class="Overlay stevenOverlay"
                            src="../../Images/ErwinBar_Steven.png"
                            alt=""
                        >

                        <button
                            id="hotspot-doorBar"
                            class="bar"
                            type="button"
                            aria-label="Bar door"
                        ></button>

                        <img
                            class="Overlay doorBarOverlay"
                            src="../../Images/ErwinBar_Door.png"
                            alt=""
                        >

                    </div>


                    <!-- =====================================
                         WORK
                    ====================================== -->

                    <div id="work" class="game-scene hidden">

                        <img
                            class="Background"
                            src="../../Images/Work_Base.png"
                            alt=""
                        >

                        <button
                            id="hotspot-jim"
                            class="jim"
                            type="button"
                            aria-label="Jim"
                        ></button>

                        <img
                            class="Overlay jimOverlay"
                            src="../../Images/Work_JimO.png"
                            alt=""
                        >

                        <button
                            id="hotspot-work"
                            class="work"
                            type="button"
                            aria-label="Start work"
                        ></button>

                        <img
                            class="Overlay workOverlay"
                            src="../../Images/Work_MinigameO.png"
                            alt=""
                        >

                        <button
                            id="hotspot-boss"
                            class="boss"
                            type="button"
                            aria-label="Boss"
                        ></button>

                        <img
                            class="Overlay bossOverlay"
                            src="../../Images/Work_TalkToBossO.png"
                            alt=""
                        >

                    </div>


                    <!-- =====================================
                         STEVEN CLOSEUPS
                    ====================================== -->

                    <div id="steven1" class="game-scene hidden">
                        <img
                            class="Background"
                            src="../../Images/steven1.png"
                            alt=""
                        >
                    </div>

                    <div id="steven2" class="game-scene hidden">
                        <img
                            class="Background"
                            src="../../Images/steven2.png"
                            alt=""
                        >
                    </div>

                    <div id="steven3" class="game-scene hidden">
                        <img
                            class="Background"
                            src="../../Images/steven3.png"
                            alt=""
                        >
                    </div>

                    <div id="steven4" class="game-scene hidden">
                        <img
                            class="Background"
                            src="../../Images/steven3.png"
                            alt=""
                        >
                    </div>


                    <!-- =====================================
                         BOSS
                    ====================================== -->

                    <div id="boss" class="game-scene hidden">
                        <img
                            class="Background"
                            src="../../Images/boss.png"
                            alt=""
                        >
                    </div>

                </div>

            </div>

            <!-- Monitor overlay -->
            <img
                id="monitor-frame"
                src="../../Images/EnshittifiedTV.png"
                alt=""
            >

        </div>

    </div>


    <!-- =========================================
         BOTTOM BAR OUTSIDE MONITOR
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
                LEVEL_22.EXE
            </div>

            <h1>
                LEVEL 22
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
                &gt; RESTART LEVEL 22
            </button>

        </div>

    </div>

</div>

<script type="module" src="dialogue.js"></script>
<script src="hotspots.js"></script>
<script src="fullscreen.js"></script>

</body>
</html>