
const bottomBar =
    document.getElementById(
        "bottom-bar"
    );

const dialogueContent =
    document.getElementById(
        "dialogue-content"
    );


const hotspotGroups = [

    {
        name: "home",
        scene: document.getElementById("caravanScene"),
        hotspots: [
            {
                name: "bed",
                button: document.getElementById("hotspot-bed"),
                overlay: document.querySelector(".BedOverlay"),
                mask: null
            },
            {
                name: "kitchen",
                button: document.getElementById("hotspot-kitchen"),
                overlay: document.querySelector(".KitchenOverlay"),
                mask: null
            },
            {
                name: "computer",
                button: document.getElementById("hotspot-computer"),
                overlay: document.querySelector(".ComputerOverlay"),
                mask: null
            }
        ]
    },

    {
        name: "work",
        scene: document.getElementById("work"),
        hotspots: [
            {
                name: "jim",
                button: document.getElementById("hotspot-jim"),
                overlay: document.querySelector(".jimOverlay"),
                mask: null
            },
            {
                name: "work",
                button: document.getElementById("hotspot-work"),
                overlay: document.querySelector(".workOverlay"),
                mask: null
            },
            {
                name: "boss",
                button: document.getElementById("hotspot-boss"),
                overlay: document.querySelector(".bossOverlay"),
                mask: null
            }
        ]
    },

    {
        name: "bar",
        scene: document.getElementById("ErwinsBar"),
        hotspots: [
            {
                name: "steven",
                button: document.getElementById("hotspot-steven"),
                overlay: document.querySelector(".stevenOverlay"),
                mask: null
            },
            {
                name: "bar-door",
                button: document.getElementById("hotspot-doorBar"),
                overlay: document.querySelector(".doorBarOverlay"),
                mask: null
            }
        ]
    }
];


const ALPHA_THRESHOLD =
    25;

let hoveredHotspot =
    null;

let hoveredGroup =
    null;

let dispatchingSyntheticClick =
    false;


/* =========================================================
   DIALOGUE OPEN?
========================================================= */

function dialogueIsOpen() {

    if (
        !dialogueContent
    ) {
        return false;
    }

    return !dialogueContent.classList.contains(
        "hidden"
    );
}


/* =========================================================
   SCENE ZICHTBAAR?
========================================================= */

function sceneIsVisible(scene) {

    if (
        !scene ||
        scene.classList.contains("hidden")
    ) {
        return false;
    }

    const style =
        window.getComputedStyle(scene);

    if (
        style.display === "none" ||
        style.visibility === "hidden"
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


/* =========================================================
   OUDE RECHTHOEKEN UITSCHAKELEN
========================================================= */

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

                    hotspot.button.tabIndex =
                        -1;
                }
            );
        }
    );
}


/* =========================================================
   PNG -> ALPHA MASK
========================================================= */

function createMaskFromImage(image) {

    if (
        !image ||
        !image.naturalWidth ||
        !image.naturalHeight
    ) {
        return null;
    }

    try {

        const canvas =
            document.createElement("canvas");

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
            width: canvas.width,
            height: canvas.height,
            data: imageData.data
        };
    }
    catch (error) {

        console.warn(
            "Level 22 hotspot-mask kon niet gemaakt worden:",
            error
        );

        return null;
    }
}


function prepareHotspotMask(hotspot) {

    if (
        !hotspot.overlay
    ) {
        return;
    }

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


/* =========================================================
   SCHERM -> GENORMALISEERDE IMAGE POSITIE

   dialogue.css gebruikt object-fit: fill.
   Daarom klopt 0..1 voor X en Y exact.
========================================================= */

function screenPointToNormalizedPoint(
    scene,
    clientX,
    clientY
) {

    const rect =
        scene.getBoundingClientRect();

    if (
        rect.width <= 0 ||
        rect.height <= 0
    ) {
        return null;
    }

    const localX =
        clientX - rect.left;

    const localY =
        clientY - rect.top;

    if (
        localX < 0 ||
        localY < 0 ||
        localX >= rect.width ||
        localY >= rect.height
    ) {
        return null;
    }

    return {
        x: localX / rect.width,
        y: localY / rect.height
    };
}


/* =========================================================
   ALPHA OP POSITIE
========================================================= */

function getHotspotAlpha(
    hotspot,
    point
) {

    if (
        !hotspot ||
        !hotspot.mask ||
        !point
    ) {
        return 0;
    }

    const x =
        Math.min(
            hotspot.mask.width - 1,
            Math.max(
                0,
                Math.floor(
                    point.x * hotspot.mask.width
                )
            )
        );

    const y =
        Math.min(
            hotspot.mask.height - 1,
            Math.max(
                0,
                Math.floor(
                    point.y * hotspot.mask.height
                )
            )
        );

    const index =
        (
            y * hotspot.mask.width + x
        ) * 4;

    return hotspot.mask.data[
        index + 3
    ];
}


/* =========================================================
   VIND HOTSPOT
========================================================= */

function findHotspotAtPoint(
    group,
    clientX,
    clientY
) {

    if (
        !group ||
        !sceneIsVisible(group.scene)
    ) {
        return null;
    }

    const point =
        screenPointToNormalizedPoint(
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
        ALPHA_THRESHOLD - 1;

    group.hotspots.forEach(
        hotspot => {

            if (
                !hotspot.button ||
                hotspot.button.classList.contains("hidden")
            ) {
                return;
            }

            const alpha =
                getHotspotAlpha(
                    hotspot,
                    point
                );

            if (
                alpha >= ALPHA_THRESHOLD &&
                alpha > winnerAlpha
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
   HOVER CLEAR
========================================================= */

function clearHover() {

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


/* =========================================================
   HOVER SET
========================================================= */

function setHover(
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

                    const show =
                        !dialogueIsOpen() &&
                        currentGroup === group &&
                        currentHotspot === hotspot &&
                        !currentHotspot.button?.classList.contains("hidden");

                    currentHotspot.overlay.style.opacity =
                        show
                            ? "1"
                            : "0";
                }
            );

            if (
                currentGroup.scene
            ) {

                currentGroup.scene.style.cursor =
                    currentGroup === group &&
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


/* =========================================================
   ACTIVEER ORIGINELE BUTTON LISTENER
========================================================= */

function activateHotspot(hotspot) {

    if (
        !hotspot ||
        !hotspot.button ||
        dialogueIsOpen()
    ) {
        return;
    }

    dispatchingSyntheticClick =
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

    dispatchingSyntheticClick =
        false;

    clearHover();
}


/* =========================================================
   GROUP EVENTS
========================================================= */

function installGroupHandlers(group) {

    if (
        !group.scene
    ) {
        return;
    }

    group.scene.addEventListener(
        "mousemove",
        event => {

            if (
                dispatchingSyntheticClick
            ) {
                return;
            }

            if (
                dialogueIsOpen()
            ) {

                if (
                    hoveredHotspot
                ) {
                    clearHover();
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
                hotspot !== hoveredHotspot ||
                group !== hoveredGroup
            ) {

                setHover(
                    group,
                    hotspot
                );
            }
        }
    );

    group.scene.addEventListener(
        "mouseleave",
        () => {

            if (
                hoveredGroup === group
            ) {
                clearHover();
            }
        }
    );

    group.scene.addEventListener(
        "click",
        event => {

            if (
                dispatchingSyntheticClick ||
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


/* =========================================================
   WATCH DIALOGUE
========================================================= */

if (
    dialogueContent &&
    typeof MutationObserver !== "undefined"
) {

    const observer =
        new MutationObserver(
            () => {
                clearHover();
            }
        );

    observer.observe(
        dialogueContent,
        {
            attributes: true,
            attributeFilter: [
                "class"
            ]
        }
    );
}


/* =========================================================
   INIT
========================================================= */

disableOldHitboxes();
prepareAllMasks();

hotspotGroups.forEach(
    group => {
        installGroupHandlers(group);
    }
);

clearHover();

window.addEventListener(
    "load",
    () => {
        disableOldHitboxes();
        prepareAllMasks();
        clearHover();
    }
);
