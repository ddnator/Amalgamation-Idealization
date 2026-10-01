<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Level 22</title>
    <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="dialogue.css">
</head>
<body>

<div id="game">

    <button id="fullscreen-toggle" type="button" aria-label="Toggle fullscreen" title="Fullscreen">
        ⛶ FULLSCREEN
    </button>

    <div id="monitor-area">

        <div id="monitor-shell">

            <div id="monitor-viewport">

                <div id="point-click-area">

                    <div id="hud">
                        <span>LEVEL 22</span>
                        <span id="location-label">OUTSIDE WORK</span>
                        <span id="scene-name">OUTSIDE WORK</span>
                    </div>

                    <div id="caravanScene" class="game-scene hidden">

                        <img
                            class="Background"
                            src="../../Images/Home_Base.png"
                            alt=""
                        >

                        <button
                            id="hotspot-bed"
                            class="hotspot bed-hotspot"
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
                            class="hotspot computer-hotspot"
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
                            class="hotspot kitchen-hotspot"
                            type="button"
                            aria-label="Kitchen"
                        ></button>

                        <img
                            class="Overlay KitchenOverlay"
                            src="../../Images/Home_kitchen.png"
                            alt=""
                        >

                        <button
                            id="hotspot-exit"
                            class="hotspot exit-hotspot"
                            type="button"
                            aria-label="Leave home"
                        ></button>

                        <img
                            class="Overlay ExitOverlay"
                            src="../../Images/Home_Exit.png"
                            alt=""
                        >

                        <img
                            class="Overlay BreakfastOverlay hidden"
                            src="../../Images/Breakfast.png"
                            alt=""
                        >

                    </div>

                    <div id="caravanSceneOutside" class="game-scene hidden">

                        <img
                            class="Background"
                            src="../../Images/CAravan_Base_N.png"
                            alt=""
                        >

                        <button
                            id="hotspot-door"
                            class="hotspot door-hotspot"
                            type="button"
                            aria-label="Door"
                        ></button>

                        <img
                            class="Overlay DoorOverlay"
                            src="../../Images/CAravan_Door.png"
                            alt=""
                        >

                    </div>

                    <div id="walkingHomeNight" class="game-scene hidden">

                        <img
                            class="Background"
                            src="../../Images/StreetNight.png"
                            alt=""
                        >

                    </div>

<<<<<<< HEAD
=======

                    <div id="upgrade" class="game-scene hidden">

                        <img
                                class="Background"
                                src="../../Images/upgrade.png"
                                alt=""
                        >
                    </div>

                    <!-- =====================================
                         OUTSIDE WORK NIGHT
                    ====================================== -->

>>>>>>> 58bb39cdd435fda2992e27ff02c9360df7fbcad2
                    <div id="OutsideWorkNight" class="game-scene hidden">

                        <img
                            class="Background"
                            src="../../Images/Work_Outside.png"
                            alt=""
                        >

                    </div>

                    <div id="ErwinsBar" class="game-scene hidden">

                        <img
                            class="Background"
                            src="../../Images/ErwinBar_Base.png"
                            alt=""
                        >

                        <button
                            id="hotspot-steven"
                            class="hotspot steven-hotspot"
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
                            class="hotspot bar-door-hotspot"
                            type="button"
                            aria-label="Bar door"
                        ></button>

                        <img
                            class="Overlay doorBarOverlay"
                            src="../../Images/ErwinBar_Door.png"
                            alt=""
                        >

                    </div>

                    <div id="insideBarOne" class="game-scene hidden">

                        <img
                            class="Background"
                            src="../../Images/Erwin1.png"
                            alt=""
                        >

                    </div>

                    <div id="insideBarTwo" class="game-scene hidden">

                        <img
                            class="Background"
                            src="../../Images/Erwin2.png"
                            alt=""
                        >

                    </div>

                    <div id="work" class="game-scene hidden">

                        <img
                            class="Background"
                            src="../../Images/Work_Base.png"
                            alt=""
                        >

                        <button
                            id="hotspot-jim"
                            class="hotspot jim-hotspot"
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
                            class="hotspot work-terminal-hotspot"
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
                            class="hotspot boss-hotspot"
                            type="button"
                            aria-label="Boss"
                        ></button>

                        <img
                            class="Overlay bossOverlay"
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

                    <div id="boss" class="game-scene hidden">

                        <img
                            class="Background"
                            src="../../Images/boss.png"
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
                OUTSIDE WORK
            </div>

            <div id="bar-hint">
                ...
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
            allow="autoplay"
        ></iframe>

    </div>

</div>

<script src="dialogue.js"></script>
<script src="fullscreen.js"></script>

</body>
</html>