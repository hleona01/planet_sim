/***************************************
           ====VARIABLES====
***************************************/

// Radius of the sun
let sun_radius = 50;
// Middle of the canvas (in pixels)
let mid = 325;
// Maximum canvas dimensions (in pixels)
let max = 650;
// Array to contain planets
const planets = [];
// Sun
const sun = new Object();

/* ===FUNCTIONS=== */
function startGame() {
    // Change visibilities
    var init = document.getElementById("initialize");
    var controls = document.getElementById("control_panel");
    var sim = document.getElementById("simulation");

    init.style.display = 'none';
    controls.style.display = 'inline-block';
    sim.style.display = 'inline-block';
    initSun();
}

// Set up simulation if provided valid input
function initSun() {
    if (!checkValidSun()) {
        window.location.reload(true);
        return false;
    }
    sun.mass = document.getElementById('s_mass_in').value;
    drawSun();
}

// Make sure input data is valid
function checkValidSun() {
    let input_mass = document.getElementById('s_mass_in').value;
    if (input_mass <= 0) {
        alert("Mass should be greater than 0.");
        return false;
    }
    return true;
}

function drawSun() {
    // Display sun
    var c = document.getElementById('gameCanvas');
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(mid, mid, sun_radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#ffb801';
    ctx.fill();
    // Display sun's mass
    ctx.font = '15px mainFont';
    ctx.fillStyle = '#10111c';
    ctx.textAlign = "center";
    ctx.fillText(sun.mass + " kg", mid, mid, 100);
}