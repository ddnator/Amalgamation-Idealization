const game =
    document.getElementById("game");

const background =
    document.getElementById("background-image");

const music =
    document.getElementById("music");

const boss =
    document.getElementById("boss");

const bossLanes =
    document.querySelectorAll(
        "#boss-lanes .lane"
    );

const playerLanes =
    document.querySelectorAll(
        "#player-lanes .lane"
    );

const phaseText =
    document.getElementById("phase-text");

const turnText =
    document.getElementById("turn-text");

const judgement =
    document.getElementById("judgement");

const startScreen =
    document.getElementById("start-screen");

const endScreen =
    document.getElementById("end-screen");

const startButton =
    document.getElementById("start-button");

const restartButton =
    document.getElementById("restart-button");

const endTitle =
    document.getElementById("end-title");

const endStats =
    document.getElementById("end-stats");

const scoreText =
    document.getElementById("score");

const comboText =
    document.getElementById("combo");

const missesText =
    document.getElementById("misses");

const accuracyText =
    document.getElementById("accuracy");

const bossHealth =
    document.getElementById("boss-health");

const playerHealth =
    document.getElementById("player-health");


/* =====================================
   CONTROLS
===================================== */

const controls = {

    KeyA: 0,
    ArrowLeft: 0,

    KeyS: 1,
    ArrowDown: 1,

    KeyW: 2,
    ArrowUp: 2,

    KeyD: 3,
    ArrowRight: 3

};


const symbols = [
    "←",
    "↓",
    "↑",
    "→"
];


const noteClasses = [
    "note-left",
    "note-down",
    "note-up",
    "note-right"
];


const bossClasses = [
    "left",
    "down",
    "up",
    "right"
];


/* =====================================
   GAME STATE
===================================== */

let chart =
    null;


let rounds =
    [];


let notes =
    [];


let running =
    false;


let frame =
    null;


let currentRound =
    -1;


let nextBeat =
    0;


let score =
    0;


let combo =
    0;


let misses =
    0;


let hits =
    0;


let bossHP =
    100;


let playerHP =
    100;


let totalPlayerNotes =
    0;


let judgementTimer =
    null;


let bossTimer =
    null;


/* =====================================
   GHOST TOUCH STATE
===================================== */

let ghostTouches =
    [];


let ghostRoundIndex =
    -1;


let nextGhostTouchAt =
    Infinity;


const GHOST_WINDOW =
    0.17;


/* =====================================
   LOAD CHART
===================================== */

async function loadChart() {

    const response =
        await fetch(
            "chart.json"
        );


    if (
        !response.ok
    ) {

        throw new Error(
            "chart.json kan niet geladen worden"
        );

    }


    chart =
        await response.json();

}


/* =====================================
   BEAT -> TIME
===================================== */

function beatToTime(beat) {

    const anchors =
        chart.anchors;


    if (
        beat <=
        anchors[0][0]
    ) {

        return anchors[0][1];

    }


    for (
        let i = 0;
        i < anchors.length - 1;
        i++
    ) {

        const previous =
            anchors[i];


        const next =
            anchors[i + 1];


        if (
            beat >= previous[0]
            &&
            beat <= next[0]
        ) {

            const progress =
                (
                    beat -
                    previous[0]
                )
                /
                (
                    next[0] -
                    previous[0]
                );


            return (
                previous[1]
                +
                (
                    next[1] -
                    previous[1]
                )
                *
                progress
            );

        }

    }


    const previous =
        anchors[
            anchors.length - 2
        ];


    const last =
        anchors[
            anchors.length - 1
        ];


    const secondsPerBeat =
        (
            last[1] -
            previous[1]
        )
        /
        (
            last[0] -
            previous[0]
        );


    return (
        last[1]
        +
        (
            beat -
            last[0]
        )
        *
        secondsPerBeat
    );

}


/* =====================================
   PIXELATE BOSS

   48px = expres shitty
===================================== */

function pixelateBoss(
    resolution = 48
) {

    if (
        boss.dataset.pixelated ===
        "true"
    ) {

        return;

    }


    if (
        !boss.complete
        ||
        !boss.naturalWidth
    ) {

        boss.addEventListener(

            "load",

            () => {

                pixelateBoss(
                    resolution
                );

            },

            {
                once: true
            }

        );


        return;

    }


    const ratio =
        boss.naturalWidth
        /
        boss.naturalHeight;


    const canvas =
        document.createElement(
            "canvas"
        );


    if (
        ratio >= 1
    ) {

        canvas.width =
            resolution;


        canvas.height =
            Math.max(
                1,
                Math.round(
                    resolution
                    /
                    ratio
                )
            );

    }

    else {

        canvas.height =
            resolution;


        canvas.width =
            Math.max(
                1,
                Math.round(
                    resolution
                    *
                    ratio
                )
            );

    }


    const context =
        canvas.getContext(
            "2d"
        );


    context.imageSmoothingEnabled =
        false;


    context.drawImage(

        boss,

        0,
        0,

        canvas.width,
        canvas.height

    );


    boss.dataset.pixelated =
        "true";


    boss.src =
        canvas.toDataURL(
            "image/png"
        );

}


/* =====================================
   BUILD FIGHT
===================================== */

function buildFight() {

    rounds =
        [];


    notes =
        [];


    totalPlayerNotes =
        0;


    chart.rounds.forEach(

        (
            config,
            roundIndex
        ) => {


            const lastReal =
                Math.max(

                    ...config.real.map(
                        note =>
                            note[1]
                    )

                );


            const lastFake =

                config.fake.length

                    ?

                    Math.max(

                        ...config.fake.map(
                            note =>
                                note[1]
                        )

                    )

                    :

                    0;


            const lastBoss =
                Math.max(
                    lastReal,
                    lastFake
                );


            const bossBeat =
                config.start;


            const playerBeat =
                bossBeat
                +
                lastBoss
                +
                config.gap;


            const endBeat =
                playerBeat
                +
                lastReal
                +
                1;


            const round = {

                index:
                    roundIndex,

                config:
                    config,

                bossStart:
                    beatToTime(
                        bossBeat
                    ),

                playerStart:
                    beatToTime(
                        playerBeat
                    ),

                end:
                    beatToTime(
                        endBeat
                    ),

                traps:
                    []

            };


            /* =========================
               REAL NOTES
            ========================= */

            config.real.forEach(

                item => {


                    const lane =
                        item[0];


                    const localBeat =
                        item[1];


                    /* BOSS */

                    notes.push({

                        side:
                            "boss",

                        fake:
                            false,

                        lane:
                            lane,

                        roundIndex:
                            roundIndex,

                        time:
                            beatToTime(
                                bossBeat
                                +
                                localBeat
                            ),

                        travel:
                            config.travel,

                        spawned:
                            false,

                        judged:
                            false,

                        element:
                            null

                    });


                    /* PLAYER */

                    notes.push({

                        side:
                            "player",

                        fake:
                            false,

                        lane:
                            lane,

                        roundIndex:
                            roundIndex,

                        time:
                            beatToTime(
                                playerBeat
                                +
                                localBeat
                            ),

                        travel:
                            config.travel,

                        perfect:
                            config.perfect,

                        good:
                            config.good,

                        damage:
                            config.damage,

                        spawned:
                            false,

                        judged:
                            false,

                        element:
                            null

                    });


                    totalPlayerNotes++;

                }

            );


            /* =========================
               FAKE BOSS NOTES
            ========================= */

            config.fake.forEach(

                item => {


                    const lane =
                        item[0];


                    const localBeat =
                        item[1];


                    notes.push({

                        side:
                            "boss",

                        fake:
                            true,

                        lane:
                            lane,

                        roundIndex:
                            roundIndex,

                        time:
                            beatToTime(
                                bossBeat
                                +
                                localBeat
                            ),

                        travel:
                            config.travel,

                        spawned:
                            false,

                        judged:
                            false,

                        revealed:
                            false,

                        element:
                            null

                    });


                    /*
                        Verborgen trap.

                        Fake boss note wordt niet
                        aan player gegeven.
                    */

                    round.traps.push({

                        lane:
                            lane,

                        time:
                            beatToTime(
                                playerBeat
                                +
                                localBeat
                            ),

                        window:
                            config.good,

                        used:
                            false

                    });

                }

            );


            rounds.push(
                round
            );

        }

    );

}


/* =====================================
   PHASE + PNG BACKGROUND
===================================== */

function setPhase(phase) {

    game.classList.remove(
        "phase-1",
        "phase-2",
        "phase-3"
    );


    game.classList.add(
        `phase-${phase}`
    );


    phaseText.textContent =
        `PHASE ${phase}`;


    /*
        Alleen echte PNG wordt vervangen.
    */

    background.src =
        `img/bg-phase${phase}.png`;

}


/* =====================================
   BUTTONS
===================================== */

startButton.addEventListener(
    "click",
    startGame
);


restartButton.addEventListener(
    "click",
    startGame
);


/* =====================================
   START GAME
===================================== */

async function startGame() {

    if (
        !chart
    ) {

        await loadChart();

    }


    if (
        frame
    ) {

        cancelAnimationFrame(
            frame
        );

    }


    music.pause();


    music.currentTime =
        0;


    document
        .querySelectorAll(
            ".note, .ghost-touch-mark"
        )
        .forEach(
            element => {

                element.remove();

            }
        );


    buildFight();


    score =
        0;


    combo =
        0;


    misses =
        0;


    hits =
        0;


    bossHP =
        100;


    playerHP =
        100;


    currentRound =
        -1;


    nextBeat =
        0;


    ghostTouches =
        [];


    ghostRoundIndex =
        -1;


    nextGhostTouchAt =
        Infinity;


    running =
        true;


    setPhase(
        1
    );


    updateUI();


    turnText.textContent =
        "GET READY";


    startScreen.classList.add(
        "hidden"
    );


    endScreen.classList.add(
        "hidden"
    );


    try {

        await music.play();


        frame =
            requestAnimationFrame(
                gameLoop
            );

    }

    catch (
        error
    ) {

        console.error(
            "Audio kon niet starten:",
            error
        );

    }

}


/* =====================================
   GAME LOOP
===================================== */

function gameLoop() {

    if (
        !running
    ) {

        return;

    }


    const time =
        music.currentTime;


    updateBeat(
        time
    );


    updateRound(
        time
    );


    updateGhostTouch(
        time
    );


    spawnNotes(
        time
    );


    updateNotes(
        time
    );


    checkEnd(
        time
    );


    frame =
        requestAnimationFrame(
            gameLoop
        );

}


/* =====================================
   BEAT ANIMATION
===================================== */

function updateBeat(time) {

    while (
        nextBeat < 500
        &&
        time >=
        beatToTime(
            nextBeat
        )
    ) {

        boss.classList.add(
            "beat"
        );


        setTimeout(

            () => {

                boss.classList.remove(
                    "beat"
                );

            },

            70

        );


        nextBeat++;

    }

}


/* =====================================
   ROUND DISPLAY
===================================== */

function updateRound(time) {

    for (
        let i = 0;
        i < rounds.length;
        i++
    ) {

        const round =
            rounds[i];


        /* BOSS */

        if (
            time >=
            round.bossStart -
            0.4

            &&

            time <
            round.playerStart -
            0.2
        ) {

            changeRound(
                i
            );


            turnText.textContent =
                `R${i + 1} ${round.config.name} // WATCH`;


            return;

        }


        /* PLAYER */

        if (
            time >=
            round.playerStart -
            0.2

            &&

            time <=
            round.end
        ) {

            changeRound(
                i
            );


            turnText.textContent =
                `R${i + 1} // COPY`;


            return;

        }

    }


    turnText.textContent =
        "...";

}


/* =====================================
   CHANGE ROUND
===================================== */

function changeRound(index) {

    if (
        currentRound ===
        index
    ) {

        return;

    }


    currentRound =
        index;


    const config =
        rounds[
            index
        ].config;


    setPhase(
        config.phase
    );


    /*
        Reset ghost touch voor ronde.
    */

    ghostRoundIndex =
        -1;


    nextGhostTouchAt =
        Infinity;


    ghostTouches =
        [];


    document
        .querySelectorAll(
            ".ghost-touch-mark"
        )
        .forEach(
            element => {

                element.remove();

            }
        );


    playerLanes.forEach(
        lane => {

            lane
                .querySelector(
                    ".receptor"
                )
                .classList
                .remove(
                    "ghost-active"
                );

        }
    );


    if (
        config.fake.length
    ) {

        showJudgement(
            "WATCH CAREFULLY"
        );

    }

}


/* =====================================
   SPAWN NOTES
===================================== */

function spawnNotes(time) {

    notes.forEach(

        note => {


            if (
                note.spawned
                ||
                note.judged
            ) {

                return;

            }


            if (
                time >=
                note.time -
                note.travel
            ) {

                createNote(
                    note
                );


                note.spawned =
                    true;

            }

        }

    );

}


/* =====================================
   CREATE NOTE
===================================== */

function createNote(note) {

    const element =
        document.createElement(
            "div"
        );


    element.classList.add(

        "note",

        noteClasses[
            note.lane
        ]

    );


    element.textContent =
        symbols[
            note.lane
        ];


    if (
        note.fake
    ) {

        element.classList.add(
            "fake-note"
        );

    }


    const lanes =

        note.side ===
        "boss"

            ?

            bossLanes

            :

            playerLanes;


    lanes[
        note.lane
    ].appendChild(
        element
    );


    note.element =
        element;

}


/* =====================================
   NOTE MOVEMENT
===================================== */

function updateNotes(time) {

    notes.forEach(

        note => {


            if (
                !note.spawned
                ||
                note.judged
                ||
                !note.element
            ) {

                return;

            }


            const laneSet =

                note.side ===
                "boss"

                    ?

                    bossLanes

                    :

                    playerLanes;


            const lane =
                laneSet[
                    note.lane
                ];


            const receptor =
                lane.querySelector(
                    ".receptor"
                );


            const noteHeight =
                note.element.offsetHeight;


            const startY =
                -noteHeight -
                20;


            const endY =
                receptor.offsetTop
                +
                receptor.offsetHeight / 2
                -
                noteHeight / 2;


            const progress =
                (
                    time -
                    (
                        note.time -
                        note.travel
                    )
                )
                /
                note.travel;


            const y =
                startY
                +
                (
                    endY -
                    startY
                )
                *
                progress;


            /*
                4-pixel movement voor
                shitty retro look.
            */

            note.element.style.top =
                `${
                    Math.round(
                        y / 4
                    ) * 4
                }px`;


            /* FAKE REVEAL */

            if (
                note.fake
                &&
                !note.revealed
                &&
                time >=
                note.time -
                0.11
            ) {

                note.revealed =
                    true;


                note.element.classList.add(
                    "reveal"
                );


                note.element.textContent =
                    "?";

            }


            /* BOSS AUTO HIT */

            if (
                note.side ===
                "boss"

                &&

                time >=
                note.time
            ) {

                bossHit(
                    note
                );


                return;

            }


            /* PLAYER MISS */

            if (
                note.side ===
                "player"

                &&

                time >
                note.time +
                note.good
            ) {

                note.judged =
                    true;


                removeNote(
                    note
                );


                registerMiss(
                    note.damage
                );

            }

        }

    );

}


/* =====================================
   BOSS HIT
===================================== */

function bossHit(note) {

    note.judged =
        true;


    removeNote(
        note
    );


    flashReceptor(
        bossLanes,
        note.lane
    );


    clearTimeout(
        bossTimer
    );


    boss.classList.remove(
        "left",
        "down",
        "up",
        "right",
        "fake"
    );


    if (
        note.fake
    ) {

        boss.classList.add(
            "fake"
        );

    }

    else {

        boss.classList.add(
            bossClasses[
                note.lane
            ]
        );

    }


    bossTimer =
        setTimeout(

            () => {

                boss.classList.remove(
                    "left",
                    "down",
                    "up",
                    "right",
                    "fake"
                );

            },

            110

        );

}


/* =====================================
   CURRENT PLAYER ROUND
===================================== */

function getPlayerRound(time) {

    return (
        rounds.find(

            round =>

                time >=
                round.playerStart -
                0.15

                &&

                time <=
                round.end

        )

        ||

        null
    );

}


/* =====================================
   GHOST TOUCH

   PHASE 1:
   geen ghost touch

   PHASE 2:
   soms één phantom input

   PHASE 3:
   sneller + soms twee tegelijk
===================================== */

function updateGhostTouch(time) {

    /*
        Oude ghost touches verwijderen.
    */

    ghostTouches =
        ghostTouches.filter(

            ghost =>

                !ghost.used

                &&

                time <=
                ghost.expires

        );


    const round =
        getPlayerRound(
            time
        );


    /*
        Alleen tijdens player beurt.
    */

    if (
        !round
        ||
        round.config.phase === 1
    ) {

        ghostRoundIndex =
            -1;


        nextGhostTouchAt =
            Infinity;


        return;

    }


    /*
        Nieuwe ronde.
    */

    if (
        ghostRoundIndex !==
        round.index
    ) {

        ghostRoundIndex =
            round.index;


        ghostTouches =
            [];


        if (
            round.config.phase === 2
        ) {

            nextGhostTouchAt =
                time +
                1.0;

        }

        else {

            nextGhostTouchAt =
                time +
                0.55;

        }

    }


    if (
        time <
        nextGhostTouchAt
    ) {

        return;

    }


    /*
        Niet op het allerlaatste moment.
    */

    if (
        time >
        round.end -
        0.4
    ) {

        return;

    }


    triggerGhostTouch(
        round,
        time
    );


    /*
        Phase 3 vaker.
    */

    if (
        round.config.phase === 2
    ) {

        nextGhostTouchAt =
            time
            +
            1.25
            +
            Math.random()
            *
            0.9;

    }

    else {

        nextGhostTouchAt =
            time
            +
            0.65
            +
            Math.random()
            *
            0.55;

    }

}


/* =====================================
   TRIGGER GHOST TOUCH
===================================== */

function triggerGhostTouch(
    round,
    time
) {

    const phase =
        round.config.phase;


    /*
        Phase 3 heeft kans op
        dubbele ghost touch.
    */

    let amount =
        (
            phase === 3
            &&
            Math.random() < 0.28
        )

            ?

            2

            :

            1;


    const usedLanes =
        [];


    while (
        amount > 0
    ) {

        const lane =
            Math.floor(
                Math.random() * 4
            );


        if (
            usedLanes.includes(
                lane
            )
        ) {

            continue;

        }


        usedLanes.push(
            lane
        );


        /*
            Ghost touch niet direct
            bovenop echte note zetten.
        */

        const realTooClose =
            notes.some(

                note =>

                    note.side ===
                    "player"

                    &&

                    note.roundIndex ===
                    round.index

                    &&

                    !note.judged

                    &&

                    note.lane ===
                    lane

                    &&

                    Math.abs(
                        note.time -
                        time
                    ) <
                    0.28

            );


        if (
            realTooClose
        ) {

            amount--;

            continue;

        }


        spawnGhostVisual(
            lane
        );


        ghostTouches.push({

            lane:
                lane,

            time:
                time,

            expires:
                time +
                GHOST_WINDOW,

            used:
                false,

            damage:
                Math.max(
                    3,
                    round.config.damage -
                    2
                )

        });


        amount--;

    }

}


/* =====================================
   GHOST TOUCH VISUAL
===================================== */

function spawnGhostVisual(lane) {

    const receptor =
        playerLanes[
            lane
        ].querySelector(
            ".receptor"
        );


    receptor.classList.add(
        "ghost-active"
    );


    const mark =
        document.createElement(
            "div"
        );


    mark.className =
        "ghost-touch-mark";


    playerLanes[
        lane
    ].appendChild(
        mark
    );


    setTimeout(

        () => {

            mark.classList.add(
                "fade"
            );

        },

        140

    );


    setTimeout(

        () => {

            mark.remove();


            receptor.classList.remove(
                "ghost-active"
            );

        },

        220

    );

}


/* =====================================
   FIND GHOST TOUCH
===================================== */

function getGhostTouch(
    lane,
    time
) {

    return (

        ghostTouches.find(

            ghost =>

                !ghost.used

                &&

                ghost.lane ===
                lane

                &&

                Math.abs(
                    ghost.time -
                    time
                )
                <=
                GHOST_WINDOW

        )

        ||

        null

    );

}


/* =====================================
   PLAYER INPUT
===================================== */

document.addEventListener(

    "keydown",

    event => {


        if (
            !running
        ) {

            return;

        }


        const lane =
            controls[
                event.code
            ];


        if (
            lane ===
            undefined
        ) {

            return;

        }


        event.preventDefault();


        if (
            event.repeat
        ) {

            return;

        }


        flashReceptor(
            playerLanes,
            lane
        );


        const round =
            getPlayerRound(
                music.currentTime
            );


        if (
            !round
        ) {

            return;

        }


        playerHit(
            lane,
            round
        );

    }

);


/* =====================================
   PLAYER HIT
===================================== */

function playerHit(
    lane,
    round
) {

    const time =
        music.currentTime;


    /*
        1.
        ECHTE NOTE KRIJGT ALTIJD
        VOORRANG.

        Ghost touch kan dus geen
        goede input stelen.
    */

    const matching =
        notes

            .filter(

                note =>

                    note.side ===
                    "player"

                    &&

                    note.roundIndex ===
                    round.index

                    &&

                    note.lane ===
                    lane

                    &&

                    !note.judged

                    &&

                    note.spawned

                    &&

                    Math.abs(
                        note.time -
                        time
                    )
                    <=
                    note.good

            )

            .sort(

                (
                    a,
                    b
                ) =>

                    Math.abs(
                        a.time -
                        time
                    )

                    -

                    Math.abs(
                        b.time -
                        time
                    )

            );


    if (
        matching.length
    ) {

        const note =
            matching[0];


        const difference =
            Math.abs(
                note.time -
                time
            );


        note.judged =
            true;


        removeNote(
            note
        );


        hits++;


        if (
            difference <=
            note.perfect
        ) {

            registerPerfect();

        }

        else {

            registerGood();

        }


        return;

    }


    /*
        2.
        GHOST TOUCH

        Player reageert op
        phantom receptor.
    */

    const ghost =
        getGhostTouch(
            lane,
            time
        );


    if (
        ghost
    ) {

        ghost.used =
            true;


        registerGhostTouch(
            ghost.damage
        );


        return;

    }


    /*
        3.
        FAKE BOSS NOTE

        Player heeft een fake boss
        note onthouden en kopieert hem.
    */

    const trap =
        round.traps.find(

            trap =>

                !trap.used

                &&

                trap.lane ===
                lane

                &&

                Math.abs(
                    trap.time -
                    time
                )
                <=
                trap.window

        );


    if (
        trap
    ) {

        trap.used =
            true;


        registerTricked(
            round.config.damage
        );


        return;

    }


    /*
        4.
        Verkeerde richting.
    */

    const nearby =
        notes

            .filter(

                note =>

                    note.side ===
                    "player"

                    &&

                    note.roundIndex ===
                    round.index

                    &&

                    !note.judged

                    &&

                    note.spawned

                    &&

                    Math.abs(
                        note.time -
                        time
                    )
                    <=
                    note.good

            )

            .sort(

                (
                    a,
                    b
                ) =>

                    Math.abs(
                        a.time -
                        time
                    )

                    -

                    Math.abs(
                        b.time -
                        time
                    )

            );


    if (
        nearby.length
    ) {

        const note =
            nearby[0];


        note.judged =
            true;


        removeNote(
            note
        );


        registerMiss(
            note.damage
        );

    }

}


/* =====================================
   PERFECT
===================================== */

function registerPerfect() {

    combo++;


    score +=
        350
        +
        combo
        *
        10;


    bossHP =
        Math.max(

            0,

            bossHP
            -
            (
                100 /
                totalPlayerNotes
            )
            *
            1.25

        );


    showJudgement(
        "PERFECT"
    );


    updateUI();

}


/* =====================================
   GOOD
===================================== */

function registerGood() {

    combo++;


    score +=
        200
        +
        combo
        *
        5;


    bossHP =
        Math.max(

            0,

            bossHP
            -
            (
                100 /
                totalPlayerNotes
            )
            *
            0.85

        );


    showJudgement(
        "GOOD"
    );


    updateUI();

}


/* =====================================
   MISS
===================================== */

function registerMiss(damage) {

    combo =
        0;


    misses++;


    playerHP =
        Math.max(

            0,

            playerHP -
            damage

        );


    showJudgement(
        "MISS"
    );


    updateUI();


    if (
        playerHP <= 0
    ) {

        loseGame();

    }

}


/* =====================================
   TRICKED
===================================== */

function registerTricked(damage) {

    combo =
        0;


    misses++;


    playerHP =
        Math.max(

            0,

            playerHP -
            damage

        );


    judgement.classList.add(
        "tricked"
    );


    showJudgement(
        "TRICKED!"
    );


    setTimeout(

        () => {

            judgement.classList.remove(
                "tricked"
            );

        },

        330

    );


    updateUI();


    if (
        playerHP <= 0
    ) {

        loseGame();

    }

}


/* =====================================
   GHOST TOUCH HIT
===================================== */

function registerGhostTouch(
    damage
) {

    combo =
        0;


    misses++;


    playerHP =
        Math.max(

            0,

            playerHP -
            damage

        );


    judgement.classList.add(
        "ghost"
    );


    game.classList.add(
        "ghost-hit"
    );


    showJudgement(
        "GHOST TOUCH!"
    );


    setTimeout(

        () => {

            judgement.classList.remove(
                "ghost"
            );


            game.classList.remove(
                "ghost-hit"
            );

        },

        360

    );


    updateUI();


    if (
        playerHP <= 0
    ) {

        loseGame();

    }

}


/* =====================================
   RECEPTOR FLASH
===================================== */

function flashReceptor(
    laneSet,
    lane
) {

    const receptor =
        laneSet[
            lane
        ].querySelector(
            ".receptor"
        );


    receptor.classList.add(
        "active"
    );


    setTimeout(

        () => {

            receptor.classList.remove(
                "active"
            );

        },

        80

    );

}


/* =====================================
   REMOVE NOTE
===================================== */

function removeNote(note) {

    if (
        note.element
    ) {

        note.element.remove();


        note.element =
            null;

    }

}


/* =====================================
   JUDGEMENT
===================================== */

function showJudgement(text) {

    judgement.textContent =
        text;


    judgement.classList.add(
        "show"
    );


    clearTimeout(
        judgementTimer
    );


    judgementTimer =
        setTimeout(

            () => {

                judgement.classList.remove(
                    "show"
                );

            },

            280

        );

}


/* =====================================
   UI
===================================== */

function updateUI() {

    scoreText.textContent =
        `SCORE ${
            String(score)
                .padStart(
                    6,
                    "0"
                )
        }`;


    comboText.textContent =
        `COMBO ${combo}`;


    missesText.textContent =
        `MISS ${misses}`;


    const attempts =
        hits
        +
        misses;


    const accuracy =
        attempts

            ?

            hits
            /
            attempts
            *
            100

            :

            100;


    accuracyText.textContent =
        `ACC ${
            accuracy.toFixed(1)
        }%`;


    const total =
        bossHP
        +
        playerHP;


    const bossWidth =
        total

            ?

            bossHP
            /
            total
            *
            100

            :

            50;


    const playerWidth =
        total

            ?

            playerHP
            /
            total
            *
            100

            :

            50;


    bossHealth.style.width =
        `${bossWidth}%`;


    playerHealth.style.width =
        `${playerWidth}%`;

}


/* =====================================
   END CHECK
===================================== */

function checkEnd(time) {

    if (
        !rounds.length
    ) {

        return;

    }


    const last =
        rounds[
            rounds.length - 1
        ];


    if (
        time >
        last.end +
        0.7
    ) {

        winGame();

    }

}


/* =====================================
   WIN
===================================== */

function winGame() {

    if (
        !running
    ) {

        return;

    }


    running =
        false;


    music.pause();


    cancelAnimationFrame(
        frame
    );


    endTitle.textContent =
        "SHIFT COMPLETE";


    showEnd();

}


/* =====================================
   LOSE
===================================== */

function loseGame() {

    if (
        !running
    ) {

        return;

    }


    running =
        false;


    music.pause();


    cancelAnimationFrame(
        frame
    );


    endTitle.textContent =
        "FAILED";


    showEnd();

}


/* =====================================
   END SCREEN
===================================== */

function showEnd() {

    document
        .querySelectorAll(
            ".note, .ghost-touch-mark"
        )
        .forEach(
            element => {

                element.remove();

            }
        );


    const attempts =
        hits
        +
        misses;


    const accuracy =
        attempts

            ?

            hits
            /
            attempts
            *
            100

            :

            100;


    endStats.innerHTML = `

        SCORE ${
            String(score)
                .padStart(
                    6,
                    "0"
                )
        }

        <br>

        HITS ${hits}

        <br>

        MISS ${misses}

        <br>

        ACC ${
            accuracy.toFixed(1)
        }%

    `;


    endScreen.classList.remove(
        "hidden"
    );

}


/* =====================================
   INITIAL LOAD
===================================== */

window.addEventListener(

    "load",

    async () => {


        /*
            Boss terugbrengen naar
            maar 48 pixels.

            Daarna wordt hij groot
            weergegeven zonder smoothing.
        */

        pixelateBoss(
            48
        );


        try {

            await loadChart();


            setPhase(
                1
            );

        }

        catch (
            error
        ) {

            console.error(
                error
            );

        }

    }

);