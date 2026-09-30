<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Level 3</title>
<link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&amp;display=swap" rel="stylesheet"/>
<link href="dialogue.css" rel="stylesheet"/>
<link href="../../css/PAC.css" rel="stylesheet"/>
</head>
<body>
<div id="game"><button aria-label="Toggle fullscreen" id="fullscreen-toggle" title="Fullscreen" type="button">⛶ FULLSCREEN</button>
<!-- =========================================
         POINT AND CLICK AREA
    ========================================== -->
<div id="monitor-area"><div id="monitor-shell"><div id="monitor-viewport"><div id="point-click-area">
<div id="hud">
<span>LEVEL 3</span>
<span id="location-label">
                HOME
            </span>
<span id="scene-name">
                HOME
            </span>
</div>
<!-- =====================================
              CARAVAN SCENE INSIDE
        ====================================== -->
<div class="game-scene" id="caravanScene">
<img alt="" class="Background" src="../../images/Home_Base.png"/>
<button class="Bed" id="hotspot-bed" type="button"></button>
<img alt="" class="Overlay BedOverlay" src="../../images/Home_bed.png"/>
<button class="Computer" id="hotspot-computer" type="button"></button>
<img alt="" class="Overlay ComputerOverlay" src="../../images/Home_Computer.png"/>
<button class="Breakfast" id="hotspot-breakfast" type="button"></button>
<img alt="" class="Overlay BreakfastOverlay hidden" src="../../images/Breakfast.png"/>
<button class="Kitchen" id="hotspot-kitchen" type="button"></button>
<img alt="" class="Overlay KitchenOverlay" src="../../images/Home_kitchen.png"/>
</div>
<!-- =====================================
            CARAVAN SCENE OUTSIDE during DAY (Only hotspot is the door)
      ====================================== -->
<div class="game-scene hidden" id="caravanSceneOutside">
<img alt="" class="Background" src="../../images/CAravan_Base.png"/>
</div>
<button class="Door" id="hotspot-door" type="button"></button>
<img alt="" class="Overlay DoorOverlay" src="../../images/CAravan_Door.png"/>
<!-- =====================================
                Walking to Work Scene DAY
          ====================================== -->
<div class="game-scene hidden" id="walkingToWorkDay">
<img alt="" class="Background" src="../../images/StreetDay.png"/>
</div>
<!-- =====================================
               Outside work scene day
         ====================================== -->
<div class="game-scene hidden" id="OutsideWorkDay">
<img alt="" class="Background" src="../../images/Work_Outside_D.png"/>
</div>
<!-- =====================================
              AT work scene day
        ====================================== -->
<div class="game-scene hidden" id="work">
<img alt="" class="Background" src="../../images/Work_Base.png"/>
</div>
</div></div><img alt="" id="monitor-frame" src="../../images/Computer_UI.png"/></div></div>
<!-- =====================================
                Walking to Work Scene
          ====================================== -->

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
<div class="hidden" id="dialogue-content">
<div id="dialogue-speaker">
                JIM
            </div>
<div id="dialogue-text">
                ...
            </div>
<div id="dialogue-options"></div>
<div id="dialogue-help">
                ↑ ↓ SELECT    ENTER / 1-4
            </div>
</div>
</div><div id="start-screen">
<div class="screen">
<div class="tiny">LEVEL_3.EXE</div>
<h1>LEVEL 3</h1>
<button id="start-button" type="button">
                &gt; START GAME
            </button>
</div>
</div><div class="hidden" id="minigame-screen">
<iframe allow="autoplay" id="reactor-minigame-frame" src="about:blank" title="Reactor minigame"></iframe>
</div><div class="hidden" id="end-screen">
<div class="screen">
<h1 id="end-title">
                LEVEL COMPLETE
            </h1>
<p id="end-text"></p>
<button id="restart-button" type="button">&gt; RESTART LEVEL 3</button>
</div>
</div></div>
<!-- =========================================
         BOTTOM BAR
    ========================================== -->

<!-- =========================================
         START SCREEN
    ========================================== -->

<!-- =========================================
         REACTOR MINIGAME
    ========================================== -->

<!-- =========================================
         LEVEL END
    ========================================== -->

<script src="dialogue.js" type="module"></script><script src="hotspots.js"></script><script src="fullscreen.js"></script>
</body>
</html>