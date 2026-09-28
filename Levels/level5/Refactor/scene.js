/* =========================================
                SCENES


              Changes:
      - scene configuration object
      - why? I got a brain injury trying to work in a file with 2000 lines of code
      - easier to add to
========================================= */

const scenes = {
    home:
        { element: "caravanScene",
            location: "HOME",
            hint: "CLICK SOMETHING.",
            hotspots: ["hotspot-bed", "hotspot-kitchen", "hotspot-computer"]
    },

    outside:
        {   element: "caravanSceneOutside",
            location: "OUTSIDE",
            hint: "YOU ARE OUTSIDE YOUR HOME",
            hotspots: ["hotspot-door"]
        },

    walkingToWorkDay: {
        element: "walkingToWorkDay",
        location: "ROUTE TO WORK",
        hint: "YOUR ROUTE TO WORK.",
        hotspots: [] },

    OutsideWorkDay: {
        element: "OutsideWorkDay",
        location: "WINSTON NUCLEAR POWERPLANT",
        hint: "WINSTON NUCLEAR POWERPLANT.",
        hotspots: [] },

    work: {
        element: "workScene",
        location: "WORK",
        hint: "JIM BECKONS YOU OVER.",
        hotspots: ["hotspot-jim", "hotspot-boss", "hotspot-work"],
        sceneName: "AT WORK" },

    work_after: {
        element: "workScene",
        location: "WORK",
        hint: "WORK FINISHED.",
        hotspots: [ "hotspot-jim", "hotspot-boss" ],
        extraHotspots: ".after-work-hotspot",
        sceneName: "WORK" },

    heading_home: {

    },

    outside_home_night: {

    }

}

/* =========================================
                    SET SCENE
========================================= */

function setScene(sceneId) {
    const scene = scenes[sceneId];

    if (!scene) {
        console.error("Scene ID not found: ", sceneId);
        return;
    }

    game.currentScene = sceneId;

    hideAllScenes();
    hideAllHotspots();

    /* Show scene */
    const sceneElement = document.getElementById(scene.element);

    if (!sceneElement) {
        console.error("Scene ELEMENT not found: ", sceneId);
        return;
    }

    sceneElement.classList.remove("hidden");

    /* Update HUD */
    locationLabel.textContent = scene.location;
    barLocation.textContent = scene.location;
    barHint.textContent = scene.hints;

    if (sceneName) {
        sceneName.textContent = scene.sceneName || scene.location;
    }

    /* Show hotspots */
    showSceneHotspots(scene);
    showNormalBar();

}

/* =========================================
                HIDE SCENES
 ========================================= */

function hideAllScenes() {

    document .querySelectorAll(".game-scene")
        .forEach(scene => {
            scene.classList.add("hidden");
        });
}

/* =========================================
                HIDE HOTSPOTS
========================================= */

function hideAllHotspots() {
    document .querySelectorAll(".hotspot")

.forEach(scene => {
    scene.classList.add("hidden");
}
)}

/* =========================================
               SHOW HOTSPOTS
========================================= */
function showSceneHotspots(scene) {

    /* CSS selector */
    if (scene.hotspots && typeof scene.hotspots === "string") {
        document .querySelectorAll(scene.hotspots)
            .forEach(hotspot => {
                hotspot.classList.remove("hidden"); }); }
    /* Individual hotspot IDs */
    if (Array.isArray(scene.hotspots)) {
        scene.hotspots.forEach(id => {
            const hotspot = document.getElementById(id);
            if (hotspot) { hotspot.classList.remove("hidden");
            }
        });
    }
    /* Extra hotspots */
    if (scene.extraHotspots) {
        document .querySelectorAll(scene.extraHotspots)
            .forEach(hotspot => {
                hotspot.classList.remove("hidden");
            });
    } }

/* =========================================
                NORMAL BAR
========================================= */

function showNormalBar() {

    dialogueActive = false;
    currentNodeId = null;
    selectedOption = 0;
    inputLocked = false;
    waitingForContinue = false;
    pendingOption = null;


    bottomBar.classList.remove("player-speaking", "ai-speaking", "waiting");


    normalBar.classList.remove("hidden");

    dialogueContent.classList.add("hidden");

    dialogueOptions.innerHTML = "";

    dialogueHelp.textContent = "↑ ↓ SELECT   ENTER / 1-4";
}
