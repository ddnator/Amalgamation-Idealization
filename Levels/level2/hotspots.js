

const homeScene =
    document.getElementById(
        "caravanScene"
    );


const homeBackground =
    homeScene?.querySelector(
        "img.Background"
    );


const bottomBar =
    document.getElementById(
        "bottom-bar"
    );




const hotspots = [

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
            null,

        fallback: {

            x: 175,
            y: 150,

            width: 145,
            height: 155

        }
    },


    /* =====================================================
       KITCHEN / KOELKAST
    ===================================================== */

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
            null,

        fallback: {

            x: 10,
            y: 60,

            width: 175,
            height: 230

        }
    },


    /* =====================================================
       COMPUTER
    ===================================================== */

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
            null,

        fallback: {

            x: 290,
            y: 70,

            width: 125,
            height: 130

        }
    }

];


/* =========================================================
   ALPHA THRESHOLD

   Hogere waarde betekent:

   alleen duidelijk zichtbare delen van de highlight
   zijn klikbaar.

   Daardoor wordt het klikvlak nauwkeuriger.
========================================================= */

const ALPHA_THRESHOLD =
    45;


/* =========================================================
   STATUS
========================================================= */

let hoveredHotspot =
    null;


let dispatchingHotspotClick =
    false;


/* =========================================================
   OUDE CSS HOTSPOTS UITSCHAKELEN

   De buttons blijven bestaan zodat dialogue.js
   zijn bestaande click listeners kan gebruiken.

   Maar ze mogen zelf geen rechthoekig klikgebied meer zijn.
========================================================= */

function disableOldButtonHitboxes() {

    hotspots.forEach(
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
                "position",
                "absolute",
                "important"
            );


            hotspot.button.style.setProperty(
                "left",
                "0",
                "important"
            );


            hotspot.button.style.setProperty(
                "top",
                "0",
                "important"
            );


            hotspot.button.style.setProperty(
                "right",
                "auto",
                "important"
            );


            hotspot.button.style.setProperty(
                "bottom",
                "auto",
                "important"
            );


            hotspot.button.style.setProperty(
                "width",
                "0",
                "important"
            );


            hotspot.button.style.setProperty(
                "height",
                "0",
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


            hotspot.button.tabIndex =
                -1;

        }
    );

}


/* =========================================================
   MAAK PIXEL MASK VAN OVERLAY PNG
========================================================= */

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
                    willReadFrequently: true
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
            "Hotspot mask kon niet worden gemaakt:",
            error
        );


        return null;

    }

}


/* =========================================================
   PREPARE MASK
========================================================= */

function prepareMask(
    hotspot
) {

    if (
        !hotspot.overlay
    ) {

        return;

    }


    /*
        Al geladen.
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
        Wachten op afbeelding.
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
            once: true
        }
    );

}


/* =========================================================
   PREPARE ALLES
========================================================= */

function prepareAllMasks() {

    hotspots.forEach(
        hotspot => {

            prepareMask(
                hotspot
            );

        }
    );

}


/* =========================================================
   HOME ZICHTBAAR?
========================================================= */

function homeIsVisible() {

    if (
        !homeScene
    ) {

        return false;

    }


    if (
        homeScene.classList.contains(
            "hidden"
        )
    ) {

        return false;

    }


    const style =
        window.getComputedStyle(
            homeScene
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
        homeScene.getBoundingClientRect();


    return (
        rect.width > 0 &&
        rect.height > 0
    );

}


/* =========================================================
   DIALOGUE OPEN?

   BELANGRIJK:

   Hotspots worden alleen TIJDELIJK geblokkeerd.

   Ze worden nooit permanent disabled.

   Dus:

   eten
   -> Back
   -> hotspots werken weer.
========================================================= */

function dialogueIsOpen() {

    if (
        !bottomBar
    ) {

        return false;

    }


    return bottomBar.classList.contains(
        "dialogue-open"
    );

}


/* =========================================================
   MUISPOSITIE OMREKENEN NAAR ORIGINELE IMAGE PIXEL

   Omdat CSS:

   object-fit: fill

   gebruikt, hebben X en Y ieder hun eigen schaal.

   Dit is veel simpeler en stabieler dan contain/cover.
========================================================= */

function screenPointToImagePixel(
    clientX,
    clientY
) {

    if (
        !homeScene ||
        !homeBackground
    ) {

        return null;

    }


    const rect =
        homeScene.getBoundingClientRect();


    if (
        rect.width <= 0 ||
        rect.height <= 0
    ) {

        return null;

    }


    /*
        Muis binnen de scene.
    */

    const localX =
        clientX -
        rect.left;


    const localY =
        clientY -
        rect.top;


    /*
        Buiten scene?
    */

    if (
        localX < 0 ||
        localY < 0 ||
        localX >= rect.width ||
        localY >= rect.height
    ) {

        return null;

    }


    /*
        Echte bronafmetingen.

        Normaal Home_Base = 469 x 316.
    */

    const sourceWidth =
        homeBackground.naturalWidth ||
        469;


    const sourceHeight =
        homeBackground.naturalHeight ||
        316;


    /*
        Bij object-fit: fill:

        0% links   -> pixel 0
        100% rechts -> pixel sourceWidth

        Zelfde voor Y.
    */

    const sourceX =
        (
            localX /
            rect.width
        )
        *
        sourceWidth;


    const sourceY =
        (
            localY /
            rect.height
        )
        *
        sourceHeight;


    return {

        x:
            sourceX,

        y:
            sourceY,

        sourceWidth:
            sourceWidth,

        sourceHeight:
            sourceHeight

    };

}


/* =========================================================
   ALPHA VAN HOTSPOT OP PIXEL
========================================================= */

function getHotspotAlpha(
    hotspot,
    point
) {

    if (
        !hotspot ||
        !point
    ) {

        return 0;

    }


    /* =====================================================
       PIXEL MASK BESCHIKBAAR
    ===================================================== */

    if (
        hotspot.mask
    ) {

        /*
            Zet Home_Base pixel om naar de overlay-resolutie.
        */

        const maskX =
            Math.floor(

                (
                    point.x /
                    point.sourceWidth
                )
                *
                hotspot.mask.width

            );


        const maskY =
            Math.floor(

                (
                    point.y /
                    point.sourceHeight
                )
                *
                hotspot.mask.height

            );


        if (
            maskX < 0 ||
            maskY < 0 ||
            maskX >= hotspot.mask.width ||
            maskY >= hotspot.mask.height
        ) {

            return 0;

        }


        const pixelIndex =
            (
                (
                    maskY *
                    hotspot.mask.width
                )
                +
                maskX
            )
            *
            4;


        /*
            RGBA:

            +0 red
            +1 green
            +2 blue
            +3 alpha
        */

        return hotspot.mask.data[
            pixelIndex + 3
        ];

    }


    /* =====================================================
       FALLBACK

       Alleen als Canvas-mask niet werkt.
    ===================================================== */

    const x =
        point.x *
        (
            469 /
            point.sourceWidth
        );


    const y =
        point.y *
        (
            316 /
            point.sourceHeight
        );


    const box =
        hotspot.fallback;


    if (
        x >= box.x &&
        x <=
            box.x + box.width &&
        y >= box.y &&
        y <=
            box.y + box.height
    ) {

        return 255;

    }


    return 0;

}


/* =========================================================
   WELKE HOTSPOT IS ONDER DE CURSOR?
========================================================= */

function findHotspotAtPoint(
    clientX,
    clientY
) {

    if (
        !homeIsVisible()
    ) {

        return null;

    }


    const point =
        screenPointToImagePixel(
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


    hotspots.forEach(
        hotspot => {

            const alpha =
                getHotspotAlpha(
                    hotspot,
                    point
                );


            /*
                Als twee hotspot overlays overlappen,
                kiezen we degene waarvan de pixel het
                meest opaque is.
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


/* =========================================================
   HOVER OVERLAY
========================================================= */

function setHoverHotspot(
    hotspot
) {

    hotspots.forEach(
        item => {

            if (
                !item.overlay
            ) {

                return;

            }


            /*
                Tijdens dialogue nooit hover tonen.
            */

            if (
                dialogueIsOpen()
            ) {

                item.overlay.style.opacity =
                    "0";


                return;

            }


            item.overlay.style.opacity =
                item === hotspot
                    ? "1"
                    : "0";

        }
    );


    hoveredHotspot =
        hotspot;


    if (
        homeScene
    ) {

        homeScene.style.cursor =
            hotspot &&
            !dialogueIsOpen()
                ? "pointer"
                : "default";

    }

}


/* =========================================================
   ACTIVEER HOTSPOT

   We sturen een synthetische click naar de originele button.

   Daardoor blijven je bestaande dialogue.js listeners
   gewoon werken.
========================================================= */

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
        Geen hotspot openen terwijl een dialogue actief is.
    */

    if (
        dialogueIsOpen()
    ) {

        return;

    }


    dispatchingHotspotClick =
        true;


    const clickEvent =
        new MouseEvent(
            "click",
            {
                bubbles: false,
                cancelable: true,
                view: window
            }
        );


    hotspot.button.dispatchEvent(
        clickEvent
    );


    dispatchingHotspotClick =
        false;


    /*
        Dialogue is waarschijnlijk geopend.

        Highlight direct weg.
    */

    setHoverHotspot(
        null
    );

}


/* =========================================================
   MOUSE MOVE
========================================================= */

function handleMouseMove(
    event
) {

    if (
        dispatchingHotspotClick
    ) {

        return;

    }


    /*
        Tijdens dialogue niks kunnen hoveren.
    */

    if (
        dialogueIsOpen()
    ) {

        if (
            hoveredHotspot !== null
        ) {

            setHoverHotspot(
                null
            );

        }


        return;

    }


    if (
        !homeIsVisible()
    ) {

        setHoverHotspot(
            null
        );


        return;

    }


    const hotspot =
        findHotspotAtPoint(
            event.clientX,
            event.clientY
        );


    if (
        hotspot !== hoveredHotspot
    ) {

        setHoverHotspot(
            hotspot
        );

    }

}


/* =========================================================
   HOME CLICK
========================================================= */

function handleHomeClick(
    event
) {

    /*
        Voorkom recursie van onze synthetische click.
    */

    if (
        dispatchingHotspotClick
    ) {

        return;

    }


    /*
        Geen andere hotspot tijdens dialogue.
    */

    if (
        dialogueIsOpen()
    ) {

        return;

    }


    if (
        !homeIsVisible()
    ) {

        return;

    }


    const hotspot =
        findHotspotAtPoint(
            event.clientX,
            event.clientY
        );


    /*
        Geen object geraakt.
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

}


/* =========================================================
   MOUSE VERLAAT HOME
========================================================= */

function handleMouseLeave() {

    setHoverHotspot(
        null
    );

}


/* =========================================================
   DIALOGUE STATUS

   Zodra je bijvoorbeeld:

   EAT
   -> BACK

   kiest, verwijdert je bestaande dialogue.js de class:

   dialogue-open

   Vervolgens zijn hotspots direct weer beschikbaar.
========================================================= */

function handleDialogueChange() {

    if (
        dialogueIsOpen()
    ) {

        setHoverHotspot(
            null
        );


        return;

    }


    /*
        Dialogue gesloten.

        GEEN used flag.
        GEEN disabled button.

        Hotspots zijn automatisch weer beschikbaar.
    */

    hoveredHotspot =
        null;


    if (
        homeScene
    ) {

        homeScene.style.cursor =
            "default";

    }

}


/* =========================================================
   EVENTS
========================================================= */

homeScene?.addEventListener(
    "mousemove",
    handleMouseMove
);


homeScene?.addEventListener(
    "mouseleave",
    handleMouseLeave
);


/*
    Capture mode.

    Onze pixel-hit detection krijgt voorrang boven
    eventuele oude listeners.
*/

homeScene?.addEventListener(
    "click",
    handleHomeClick,
    true
);


/* =========================================================
   WATCH DIALOGUE CLASS
========================================================= */

if (
    bottomBar &&
    typeof MutationObserver !==
    "undefined"
) {

    const dialogueObserver =
        new MutationObserver(
            handleDialogueChange
        );


    dialogueObserver.observe(
        bottomBar,
        {

            attributes: true,

            attributeFilter: [
                "class"
            ]

        }
    );

}


/* =========================================================
   INITIALISEREN
========================================================= */

disableOldButtonHitboxes();


prepareAllMasks();


setHoverHotspot(
    null
);


/* =========================================================
   WINDOW LOAD
========================================================= */

window.addEventListener(
    "load",

    () => {

        disableOldButtonHitboxes();


        prepareAllMasks();


        setHoverHotspot(
            null
        );

    }
);


/* =========================================================
   DEBUG

   In browserconsole:

   getLevel1HotspotStatus()
========================================================= */

window.getLevel1HotspotStatus =
    () => {

        return hotspots.map(
            hotspot => {

                return {

                    name:
                        hotspot.name,

                    maskLoaded:
                        Boolean(
                            hotspot.mask
                        )

                };

            }
        );

    };


/* =========================================================
   DEBUG

   Hiermee kun je kijken welk object onder je cursor zit.

   Gebruik bijvoorbeeld in console:

   level1HotspotAt(500, 300)
========================================================= */

window.level1HotspotAt =
    (
        x,
        y
    ) => {

        const hotspot =
            findHotspotAtPoint(
                x,
                y
            );


        return hotspot
            ? hotspot.name
            : null;

    };