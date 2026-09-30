/* =========================================================
   LEVEL 1
   PIXEL PERFECT HOTSPOTS

   DEZE FILE REGELT:

   HOME
   - Bed
   - Kitchen / koelkast
   - Computer

   WORK
   - Jim
   - Start Work
   - Boss

   De overlay-afbeeldingen worden gebruikt
   als echte pixel-maskers.

   Daardoor gebruik je GEEN onnauwkeurige
   rechthoeken meer.

   Ook belangrijk:

   - tijdens dialogue zijn hotspots geblokkeerd
   - na Continue / Back werken ze direct weer
   - hotspots worden NIET permanent disabled
   - werkt ook in fullscreen
========================================================= */


/* =========================================
   SCENES
========================================= */

const homeScene =
    document.getElementById(
        "caravanScene"
    );


const workScene =
    document.getElementById(
        "work"
    );


const bottomBar =
    document.getElementById(
        "bottom-bar"
    );


/* =========================================
   BREAKFAST BUTTON

   Je eten-interactie gebeurt via Kitchen.

   Deze oude button hoeft daarom zelf geen
   eigen rechthoekige hitbox te houden.
========================================= */

const breakfastButton =
    document.getElementById(
        "hotspot-breakfast"
    );


/* =========================================
   HOTSPOT GROUPS
========================================= */

const hotspotGroups = [


    /* =====================================
       HOME
    ====================================== */

    {

        name:
            "home",


        scene:
            homeScene,


        hotspots: [


            /* BED */

            {

                name:
                    "bed",


                button:
                    document.getElementById(
                        "hotspot-bed"
                    ),


                overlay:
                    document.querySelector(
                        ".BedOverlay"
                    ),


                mask:
                    null

            },


            /* KITCHEN */

            {

                name:
                    "kitchen",


                button:
                    document.getElementById(
                        "hotspot-kitchen"
                    ),


                overlay:
                    document.querySelector(
                        ".KitchenOverlay"
                    ),


                mask:
                    null

            },


            /* COMPUTER */

            {

                name:
                    "computer",


                button:
                    document.getElementById(
                        "hotspot-computer"
                    ),


                overlay:
                    document.querySelector(
                        ".ComputerOverlay"
                    ),


                mask:
                    null

            }

        ]

    },



    /* =====================================
       WORK
    ====================================== */

    {

        name:
            "work",


        scene:
            workScene,


        hotspots: [


            /* JIM */

            {

                name:
                    "jim",


                button:
                    document.getElementById(
                        "hotspot-jim"
                    ),


                overlay:
                    document.querySelector(
                        ".jimOverlay"
                    ),


                mask:
                    null

            },


            /* START WORK */

            {

                name:
                    "work",


                button:
                    document.getElementById(
                        "hotspot-work"
                    ),


                overlay:
                    document.querySelector(
                        ".workOverlay"
                    ),


                mask:
                    null

            },


            /* BOSS */

            {

                name:
                    "boss",


                button:
                    document.getElementById(
                        "hotspot-boss"
                    ),


                overlay:
                    document.querySelector(
                        ".bossOverlay"
                    ),


                mask:
                    null

            }

        ]

    }

];


/* =========================================
   ALPHA THRESHOLD

   Een pixel moet minimaal deze alpha hebben
   om klikbaar te zijn.

   20 = object + een klein beetje glow.
========================================= */

const ALPHA_THRESHOLD =
    20;


/* =========================================
   STATUS
========================================= */

let hoveredHotspot =
    null;


let hoveredGroup =
    null;


let dispatchingSyntheticClick =
    false;


/* =========================================
   DIALOGUE OPEN?
========================================= */

function dialogueIsOpen() {

    return Boolean(

        bottomBar &&

        bottomBar.classList.contains(
            "dialogue-open"
        )

    );

}


/* =========================================
   SCENE ZICHTBAAR?
========================================= */

function sceneIsVisible(
    scene
) {

    if (
        !scene
    ) {

        return false;

    }


    if (
        scene.classList.contains(
            "hidden"
        )
    ) {

        return false;

    }


    const style =
        window.getComputedStyle(
            scene
        );


    if (
        style.display ===
            "none" ||

        style.visibility ===
            "hidden"
    ) {

        return false;

    }


    const rect =
        scene.getBoundingClientRect();


    return (
        rect.width > 0 &&
        rect.height > 0
    );

}


/* =========================================
   OUDE RECHTHOEKIGE HITBOXES UIT

   dialogue.js heeft de button-elementen nog
   nodig vanwege zijn click listeners.

   Daarom verwijderen we ze NIET.

   We zetten alleen browser pointer-events uit.

   Deze hotspots.js bepaalt voortaan zelf
   of een pixel klikbaar is.
========================================= */

function disableOldHitboxes() {

    hotspotGroups.forEach(
        group => {


            group.hotspots.forEach(
                hotspot => {


                    if (
                        !hotspot.button
                    ) {

                        return;

                    }


                    hotspot.button.style.setProperty(
                        "pointer-events",
                        "none",
                        "important"
                    );


                    hotspot.button.style.setProperty(
                        "padding",
                        "0",
                        "important"
                    );


                    hotspot.button.style.setProperty(
                        "margin",
                        "0",
                        "important"
                    );


                    hotspot.button.style.setProperty(
                        "border",
                        "0",
                        "important"
                    );


                    hotspot.button.style.setProperty(
                        "background",
                        "transparent",
                        "important"
                    );


                    /*
                        Niet via TAB selecteerbaar.
                    */

                    hotspot.button.tabIndex =
                        -1;

                }
            );

        }
    );


    /*
        Oude Breakfast button ook geen
        eigen hitbox laten houden.
    */

    if (
        breakfastButton
    ) {

        breakfastButton.style.setProperty(
            "pointer-events",
            "none",
            "important"
        );


        breakfastButton.tabIndex =
            -1;

    }

}


/* =========================================
   IMAGE -> ALPHA MASK
========================================= */

function createMaskFromImage(
    image
) {

    if (
        !image ||
        !image.naturalWidth ||
        !image.naturalHeight
    ) {

        return null;

    }


    try {


        const canvas =
            document.createElement(
                "canvas"
            );


        canvas.width =
            image.naturalWidth;


        canvas.height =
            image.naturalHeight;


        const context =
            canvas.getContext(

                "2d",

                {
                    willReadFrequently:
                        true
                }

            );


        if (
            !context
        ) {

            return null;

        }


        context.clearRect(

            0,
            0,

            canvas.width,
            canvas.height

        );


        context.drawImage(

            image,

            0,
            0,

            canvas.width,
            canvas.height

        );


        const imageData =
            context.getImageData(

                0,
                0,

                canvas.width,
                canvas.height

            );


        return {

            width:
                canvas.width,


            height:
                canvas.height,


            data:
                imageData.data

        };

    }


    catch (
        error
    ) {

        console.warn(
            "Kon hotspot-mask niet maken:",
            error
        );


        return null;

    }

}


/* =========================================
   PREPARE ONE MASK
========================================= */

function prepareHotspotMask(
    hotspot
) {

    if (
        !hotspot.overlay
    ) {

        return;

    }


    /*
        Image is al geladen.
    */

    if (
        hotspot.overlay.complete &&
        hotspot.overlay.naturalWidth > 0
    ) {

        hotspot.mask =
            createMaskFromImage(
                hotspot.overlay
            );


        return;

    }


    /*
        Anders wachten tot image geladen is.
    */

    hotspot.overlay.addEventListener(

        "load",

        () => {

            hotspot.mask =
                createMaskFromImage(
                    hotspot.overlay
                );

        },

        {
            once:
                true
        }

    );

}


/* =========================================
   PREPARE ALL MASKS
========================================= */

function prepareAllMasks() {

    hotspotGroups.forEach(
        group => {


            group.hotspots.forEach(
                hotspot => {

                    prepareHotspotMask(
                        hotspot
                    );

                }
            );

        }
    );

}


/* =========================================
   SCREEN POINT -> NORMALIZED IMAGE POINT

   Je huidige layout gebruikt:

   object-fit: fill

   Daarom wordt:

   links = 0
   rechts = 1

   boven = 0
   onder = 1

   Dit blijft ook kloppen wanneer fullscreen
   aan of uit staat.
========================================= */

function screenPointToSourcePoint(

    scene,

    clientX,
    clientY

) {

    if (
        !scene
    ) {

        return null;

    }


    const rect =
        scene.getBoundingClientRect();


    if (
        rect.width <= 0 ||
        rect.height <= 0
    ) {

        return null;

    }


    const localX =
        clientX -
        rect.left;


    const localY =
        clientY -
        rect.top;


    /*
        Buiten scene.
    */

    if (
        localX < 0 ||
        localY < 0 ||
        localX >= rect.width ||
        localY >= rect.height
    ) {

        return null;

    }


    return {

        normalizedX:
            localX /
            rect.width,


        normalizedY:
            localY /
            rect.height

    };

}


/* =========================================
   ALPHA WAARDE OP CURSOR
========================================= */

function getHotspotAlpha(

    hotspot,

    sourcePoint

) {

    if (
        !hotspot ||
        !hotspot.mask ||
        !sourcePoint
    ) {

        return 0;

    }


    /* =====================================
       X PIXEL
    ====================================== */

    const maskX =
        Math.min(

            hotspot.mask.width -
            1,

            Math.max(

                0,

                Math.floor(

                    sourcePoint.normalizedX *
                    hotspot.mask.width

                )

            )

        );


    /* =====================================
       Y PIXEL
    ====================================== */

    const maskY =
        Math.min(

            hotspot.mask.height -
            1,

            Math.max(

                0,

                Math.floor(

                    sourcePoint.normalizedY *
                    hotspot.mask.height

                )

            )

        );


    /* =====================================
       RGBA INDEX
    ====================================== */

    const index = (

        maskY *
        hotspot.mask.width
        +
        maskX

    ) * 4;


    /*
        +0 red
        +1 green
        +2 blue
        +3 alpha
    */

    return hotspot.mask.data[
        index + 3
    ];

}


/* =========================================
   VIND HOTSPOT ONDER CURSOR
========================================= */

function findHotspotAtPoint(

    group,

    clientX,
    clientY

) {

    if (
        !group ||
        !sceneIsVisible(
            group.scene
        )
    ) {

        return null;

    }


    const point =
        screenPointToSourcePoint(

            group.scene,

            clientX,
            clientY

        );


    if (
        !point
    ) {

        return null;

    }


    let winner =
        null;


    let winnerAlpha =
        ALPHA_THRESHOLD -
        1;


    group.hotspots.forEach(
        hotspot => {


            if (
                !hotspot.button
            ) {

                return;

            }


            /*
                Als hotspot hidden is,
                bijvoorbeeld Work na minigame,
                niet meer klikbaar.
            */

            if (
                hotspot.button.classList.contains(
                    "hidden"
                )
            ) {

                return;

            }


            const alpha =
                getHotspotAlpha(

                    hotspot,

                    point

                );


            /*
                Bij overlap kiezen we hotspot
                met hoogste alpha.
            */

            if (

                alpha >=
                    ALPHA_THRESHOLD &&

                alpha >
                    winnerAlpha

            ) {

                winner =
                    hotspot;


                winnerAlpha =
                    alpha;

            }

        }
    );


    return winner;

}


/* =========================================
   ALLE HOVERS VERBERGEN
========================================= */

function clearAllHoverOverlays() {

    hotspotGroups.forEach(
        group => {


            group.hotspots.forEach(
                hotspot => {


                    if (
                        hotspot.overlay
                    ) {

                        hotspot.overlay.style.opacity =
                            "0";

                    }

                }
            );


            if (
                group.scene
            ) {

                group.scene.style.cursor =
                    "default";

            }

        }
    );


    hoveredHotspot =
        null;


    hoveredGroup =
        null;

}


/* =========================================
   HOVER INSTELLEN
========================================= */

function setHoveredHotspot(

    group,

    hotspot

) {

    hotspotGroups.forEach(
        currentGroup => {


            currentGroup.hotspots.forEach(
                currentHotspot => {


                    if (
                        !currentHotspot.overlay
                    ) {

                        return;

                    }


                    const hidden =
                        currentHotspot.button
                            ?.classList
                            .contains(
                                "hidden"
                            );


                    const shouldShow =
                        Boolean(

                            !dialogueIsOpen() &&

                            !hidden &&

                            currentGroup ===
                                group &&

                            currentHotspot ===
                                hotspot

                        );


                    currentHotspot
                        .overlay
                        .style
                        .opacity =

                        shouldShow
                            ? "1"
                            : "0";

                }
            );


            if (
                currentGroup.scene
            ) {

                currentGroup.scene.style.cursor =

                    currentGroup ===
                        group &&

                    hotspot &&

                    !dialogueIsOpen()

                        ? "pointer"
                        : "default";

            }

        }
    );


    hoveredGroup =
        group;


    hoveredHotspot =
        hotspot;

}


/* =========================================
   ACTIVEER HOTSPOT

   De daadwerkelijke game-logica staat al
   in dialogue.js.

   Daar zitten listeners op:

   #hotspot-bed
   #hotspot-kitchen
   #hotspot-computer

   #hotspot-jim
   #hotspot-work
   #hotspot-boss

   Wij sturen daarom een click naar de button.
========================================= */

function activateHotspot(
    hotspot
) {

    if (
        !hotspot ||
        !hotspot.button
    ) {

        return;

    }


    /*
        Geen andere interacties terwijl
        dialogue openstaat.
    */

    if (
        dialogueIsOpen()
    ) {

        return;

    }


    /*
        Hidden = niet actief.
    */

    if (
        hotspot.button.classList.contains(
            "hidden"
        )
    ) {

        return;

    }


    dispatchingSyntheticClick =
        true;


    const clickEvent =
        new MouseEvent(

            "click",

            {

                bubbles:
                    false,


                cancelable:
                    true,


                view:
                    window

            }

        );


    hotspot.button.dispatchEvent(
        clickEvent
    );


    dispatchingSyntheticClick =
        false;


    /*
        Hover weg zodra interactie begint.
    */

    clearAllHoverOverlays();

}


/* =========================================
   HANDLERS INSTALLEREN
========================================= */

function installGroupHandlers(
    group
) {

    if (
        !group.scene
    ) {

        return;

    }


    /* =====================================
       MOUSE MOVE
    ====================================== */

    group.scene.addEventListener(

        "mousemove",

        event => {


            if (
                dispatchingSyntheticClick
            ) {

                return;

            }


            /*
                Dialogue actief:
                geen hotspots.
            */

            if (
                dialogueIsOpen()
            ) {

                if (
                    hoveredHotspot
                ) {

                    clearAllHoverOverlays();

                }


                return;

            }


            const hotspot =
                findHotspotAtPoint(

                    group,

                    event.clientX,
                    event.clientY

                );


            if (

                hotspot !==
                    hoveredHotspot ||

                group !==
                    hoveredGroup

            ) {

                setHoveredHotspot(

                    group,

                    hotspot

                );

            }

        }

    );


    /* =====================================
       MOUSE LEAVE
    ====================================== */

    group.scene.addEventListener(

        "mouseleave",

        () => {


            if (
                hoveredGroup ===
                group
            ) {

                clearAllHoverOverlays();

            }

        }

    );


    /* =====================================
       CLICK

       Capture = true.

       Hierdoor komt onze accurate
       pixel-detectie vóór oude handlers.
    ====================================== */

    group.scene.addEventListener(

        "click",

        event => {


            /*
                Dit is onze eigen synthetic click.
            */

            if (
                dispatchingSyntheticClick
            ) {

                return;

            }


            /*
                Dialogue open?
                Geen scene-interactie.
            */

            if (
                dialogueIsOpen()
            ) {

                return;

            }


            const hotspot =
                findHotspotAtPoint(

                    group,

                    event.clientX,
                    event.clientY

                );


            /*
                Niks geraakt.
            */

            if (
                !hotspot
            ) {

                return;

            }


            event.preventDefault();


            event.stopPropagation();


            event.stopImmediatePropagation();


            activateHotspot(
                hotspot
            );

        },

        true

    );

}


/* =========================================
   DIALOGUE OBSERVER

   Zodra dialogue opent:
   hover weg.

   Zodra dialogue sluit:
   hotspots worden NIET permanent disabled,
   dus ze werken meteen weer.
========================================= */

if (

    bottomBar &&

    typeof MutationObserver !==
        "undefined"

) {

    const dialogueObserver =
        new MutationObserver(
            () => {

                clearAllHoverOverlays();

            }
        );


    dialogueObserver.observe(

        bottomBar,

        {

            attributes:
                true,


            attributeFilter: [
                "class"
            ]

        }

    );

}


/* =========================================
   INITIALISEREN
========================================= */

disableOldHitboxes();


prepareAllMasks();


hotspotGroups.forEach(
    group => {

        installGroupHandlers(
            group
        );

    }
);


clearAllHoverOverlays();


/* =========================================
   WINDOW LOAD

   Nog een keer masks laden voor afbeeldingen
   die iets later binnenkomen.
========================================= */

window.addEventListener(

    "load",

    () => {

        disableOldHitboxes();

        prepareAllMasks();

        clearAllHoverOverlays();

    }

);


/* =========================================
   DEBUG

   F12 -> Console:

   getLevel1HotspotStatus()
========================================= */

window.getLevel1HotspotStatus =
    () => {


        return hotspotGroups.flatMap(
            group => {


                return group.hotspots.map(
                    hotspot => {


                        return {

                            scene:
                                group.name,


                            name:
                                hotspot.name,


                            maskLoaded:
                                Boolean(
                                    hotspot.mask
                                ),


                            hidden:
                                Boolean(

                                    hotspot.button
                                        ?.classList
                                        .contains(
                                            "hidden"
                                        )

                                )

                        };

                    }
                );

            }
        );

    };


/* =========================================
   DEBUG

   Je kunt ook testen:

   findLevel1HotspotAt(500, 300)

   Resultaat bijvoorbeeld:

   {
       scene: "work",
       hotspot: "jim"
   }
========================================= */

window.findLevel1HotspotAt =
    (
        clientX,
        clientY
    ) => {


        for (
            const group
            of hotspotGroups
        ) {


            if (
                !sceneIsVisible(
                    group.scene
                )
            ) {

                continue;

            }


            const hotspot =
                findHotspotAtPoint(

                    group,

                    clientX,
                    clientY

                );


            if (
                hotspot
            ) {

                return {

                    scene:
                        group.name,


                    hotspot:
                        hotspot.name

                };

            }

        }


        return null;

    };