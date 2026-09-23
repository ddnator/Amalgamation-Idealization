<!DOCTYPE html>
<html lang="nl">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>The Operator</title>

    <link
        href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap"
        rel="stylesheet"
    >

    <link
        rel="stylesheet"
        href="style.css"
    >

</head>

<body>


<div
    id="game"
    class="phase-1"
>

    <!-- ALLEEN DEZE PNG IS DE ACHTERGROND -->
    <img
        id="background-image"
        src="img/bg-phase1.png"
        alt=""
    >


    <!-- HUD -->
    <div id="hud">

        <div id="hud-top">

            <span>
                THE OPERATOR
            </span>

            <span id="phase-text">
                PHASE 1
            </span>

        </div>


        <div id="health-bar">

            <div id="boss-health"></div>

            <div id="player-health"></div>

        </div>


        <div id="stats">

            <span id="score">
                SCORE 000000
            </span>

            <span id="combo">
                COMBO 0
            </span>

            <span id="misses">
                MISS 0
            </span>

            <span id="accuracy">
                ACC 100%
            </span>

        </div>

    </div>


    <!-- TURN -->
    <div id="turn-text">
        ...
    </div>


    <!-- CHARACTERS -->
    <div id="stage">


        <!-- BOSS -->
        <div id="boss-area">

            <img
                id="boss"
                src="img/boss.png"
                alt="Boss"
            >

        </div>


        <!-- SPEAKER -->
        <div id="speaker">

            <div class="speaker-small"></div>

            <div class="speaker-big"></div>

        </div>


        <!-- PLAYER -->
        <div id="player">

            <div id="player-head">
                ._.
            </div>

            <div id="player-body">
                YOU
            </div>

        </div>

    </div>


    <!-- BOSS ARROWS -->
    <div
        id="boss-lanes"
        class="lane-group"
    >

        <div class="lane">
            <div class="receptor">←</div>
        </div>

        <div class="lane">
            <div class="receptor">↓</div>
        </div>

        <div class="lane">
            <div class="receptor">↑</div>
        </div>

        <div class="lane">
            <div class="receptor">→</div>
        </div>

    </div>


    <!-- PLAYER ARROWS -->
    <div
        id="player-lanes"
        class="lane-group"
    >

        <div class="lane">
            <div class="receptor">←</div>
        </div>

        <div class="lane">
            <div class="receptor">↓</div>
        </div>

        <div class="lane">
            <div class="receptor">↑</div>
        </div>

        <div class="lane">
            <div class="receptor">→</div>
        </div>

    </div>


    <!-- PERFECT / GOOD / MISS -->
    <div id="judgement"></div>


    <!-- START SCREEN -->
    <div id="start-screen">

        <div class="menu">

            <div class="tiny">
                PERFORMANCE_TEST.EXE
            </div>

            <h1>
                THE OPERATOR
            </h1>

            <p>
                WATCH
                <br>
                REMEMBER
                <br>
                COPY
            </p>

            <p class="help">
                PHASE 2+: DON'T TRUST EVERYTHING YOU SEE.
            </p>


            <div id="controls">

                <div>
                    <b>←</b>
                    <span>A</span>
                </div>

                <div>
                    <b>↓</b>
                    <span>S</span>
                </div>

                <div>
                    <b>↑</b>
                    <span>W</span>
                </div>

                <div>
                    <b>→</b>
                    <span>D</span>
                </div>

            </div>


            <button id="start-button">
                START
            </button>

        </div>

    </div>


    <!-- END SCREEN -->
    <div
        id="end-screen"
        class="hidden"
    >

        <div class="menu">

            <h1 id="end-title">
                COMPLETE
            </h1>

            <div id="end-stats"></div>

            <button id="restart-button">
                RETRY
            </button>

        </div>

    </div>


    <!-- MUSIC -->
    <audio
        id="music"
        src="audio/red-sun.mp3"
        preload="auto"
    ></audio>


</div>


<script src="game.js"></script>


</body>
</html>