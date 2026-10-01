<?php
$backgroundimage = "../../images/Home_Base.png";
$gamecomplete = false;
if (isset($_GET['gameWon'])) {
    if ($_GET['gameWon'] === '1') {
        $gamecomplete = true;
        $backgroundimage = "../../images/Work_Outside.png";
    }
}
?>


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
        href="../../css/PAC.css"
    >


    <link
        rel="stylesheet"
        href="dialogue.css"
    >

</head>


<body>
<body>
    <?php if ($gamecomplete) { ?>
    <div id="hidden" data-my-value="done"></div>
    <?php } ?>
<div id="game">

<div id="game">


    <!-- =====================================================
         FULLSCREEN BUTTON

         Blijft rechtsboven zichtbaar.
    ====================================================== -->

    <button
        id="fullscreen-toggle"
        type="button"
        aria-label="Toggle fullscreen"
        title="Fullscreen"
    >
        ⛶ FULLSCREEN
    </button>



    <!-- =====================================================
         BOVENSTE GAME AREA
    ====================================================== -->

    <div id="monitor-area">


        <!-- =================================================
             DE MONITOR
        ================================================== -->

        <div id="monitor-shell">


            <!-- =============================================
                 SCHERM BINNEN DE MONITOR
            ============================================== -->

            <div id="monitor-viewport">


                <!-- =========================================
                     POINT AND CLICK AREA
                ========================================== -->

                <div id="point-click-area">


                    <!-- =====================================
                         HUD
                    ====================================== -->

                    <div id="hud">

                        <span>
                            LEVEL 1
                        </span>


                        <span id="scene-name">
                            HOME
                        </span>


                        <span id="location-label">
                            HOME
                        </span>

                    </div>



                    <!-- =====================================
                         HOME
                    ====================================== -->

                    <div
                        id="caravanScene"
                        class="game-scene"
                    >

                        <img
                            class="Background"
                            src="<?= $backgroundimage ?>"
                            alt=""
                        >


                        <!-- BED -->

                        <button
                            id="hotspot-bed"
                            class="Bed"
                            type="button"
                            aria-label="Bed"
                        ></button>


                        <img
                            class="Overlay BedOverlay"
                            src="../../images/Home_bed.png"
                            alt=""
                        >



                        <!-- COMPUTER -->

                        <button
                            id="hotspot-computer"
                            class="Computer"
                            type="button"
                            aria-label="Computer"
                        ></button>


                        <img
                            class="Overlay ComputerOverlay"
                            src="../../images/Home_Computer.png"
                            alt=""
                        >



                        <!-- BREAKFAST -->

                        <button
                            id="hotspot-breakfast"
                            class="Breakfast"
                            type="button"
                            aria-label="Breakfast"
                        ></button>


                        <img
                            class="Overlay BreakfastOverlay hidden"
                            src="../../images/Breakfast.png"
                            alt=""
                        >



                        <!-- KITCHEN / FRIDGE -->

                        <button
                            id="hotspot-kitchen"
                            class="Kitchen"
                            type="button"
                            aria-label="Kitchen"
                        ></button>


                        <img
                            class="Overlay KitchenOverlay"
                            src="../../images/Home_kitchen.png"
                            alt=""
                        >

                    </div>



                    <!-- =====================================
                         OUTSIDE HOME
                    ====================================== -->

                    <div
                        id="caravanSceneOutside"
                        class="game-scene hidden"
                    >

                        <img
                            class="Background"
                            src="../../images/CAravan_Base.png"
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
                        src="../../images/CAravan_Door.png"
                        alt=""
                    >



                    <!-- =====================================
                         WALKING TO WORK
                    ====================================== -->

                    <div
                        id="walkingToWorkDay"
                        class="game-scene hidden"
                    >

                        <img
                            class="Background"
                            src="../../images/StreetDay.png"
                            alt=""
                        >

                    </div>



                    <!-- =====================================
                         OUTSIDE WORK
                    ====================================== -->

                    <div
                        id="OutsideWorkDay"
                        class="game-scene hidden"
                    >

                        <img
                            class="Background"
                            src="../../images/Work_Outside_D.png"
                            alt=""
                        >

                    </div>



                    <!-- =====================================
                         WORK
                    ====================================== -->

                    <div
                        id="work"
                        class="game-scene hidden"
                    >

                        <img
                            class="Background"
                            src="../../images/Work_Base.png"
                            alt=""
                        >


                        <!-- JIM -->

                        <button
                            id="hotspot-jim"
                            class="jim"
                            type="button"
                            aria-label="Jim"
                        ></button>


                        <img
                            class="Overlay jimOverlay"
                            src="../../images/Work_JimO.png"
                            alt=""
                        >



                        <!-- START WORK -->

                        <button
                            id="hotspot-work"
                            class="work"
                            type="button"
                            aria-label="Start working"
                        ></button>


                        <img
                            class="Overlay workOverlay"
                            src="../../images/Work_MinigameO.png"
                            alt=""
                        >



                        <!-- BOSS -->

                        <button
                            id="hotspot-boss"
                            class="boss"
                            type="button"
                            aria-label="Boss"
                        ></button>


                        <img
                            class="Overlay bossOverlay"
                            src="../../images/Work_TalkToBossO.png"
                            alt=""
                        >

                    </div>



                    <!-- =====================================
                         JIM HAPPY
                    ====================================== -->

                    <div
                        id="jim1"
                        class="game-scene hidden"
                    >

                        <img
                            class="Background"
                            src="../../images/jimHappy.png"
                            alt=""
                        >

                    </div>



                    <!-- =====================================
                         JIM SPEAKING
                    ====================================== -->

                    <div
                        id="jim2"
                        class="game-scene hidden"
                    >

                        <img
                            class="Background"
                            src="../../images/jimSpeaking.png"
                            alt=""
                        >

                    </div>



                    <!-- =====================================
                         JIM NEUTRAL
                    ====================================== -->

                    <div
                        id="jim3"
                        class="game-scene hidden"
                    >

                        <img
                            class="Background"
                            src="../../images/jimNeutral.png"
                            alt=""
                        >

                    </div>



                    <!-- =====================================
                         JIM ANGRY
                    ====================================== -->

                    <div
                        id="jim4"
                        class="game-scene hidden"
                    >

                        <img
                            class="Background"
                            src="../../images/jimAngry.png"
                            alt=""
                        >

                    </div>



                    <!-- =====================================
                         BOSS
                    ====================================== -->

                    <div
                        id="boss"
                        class="game-scene hidden"
                    >

                        <img
                            class="Background"
                            src="../../images/boss.png"
                            alt=""
                        >

                    </div>


                </div>

            </div>



            <!-- =============================================
                 MONITOR OVERLAY
            ============================================== -->

            <img
                id="monitor-frame"
                src="../../images/Computer_UI.png"
                alt=""
            >


        </div>

    </div>



    <!-- =====================================================
         DIALOGUE BUITEN DE MONITOR
    ====================================================== -->

    <div id="bottom-bar">


        <!-- NORMAL BAR -->

        <div id="normal-bar">

            <div id="bar-location">
                HOME
            </div>


            <div id="bar-hint">
                CLICK SOMETHING.
            </div>

        </div>



        <!-- DIALOGUE -->

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



    <!-- =====================================================
         START SCREEN
    ====================================================== -->

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



    <!-- =====================================================
         MINIGAME
    ====================================================== -->

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



    <!-- =====================================================
         END SCREEN
    ====================================================== -->

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



<!-- =========================================================
     GAME
========================================================= -->

<script
    type="module"
    src="dialogue.js"
></script>


<!-- =========================================================
     HOTSPOTS
========================================================= -->

<script
    src="hotspots.js"
></script>


<!-- =========================================================
     FULLSCREEN
========================================================= -->

<script
    src="fullscreen.js"
></script>


</body>

</html>