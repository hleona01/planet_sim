var sun_form = document.getElementById("add_sun");
var sun_radius = 50;
const planets = [];
// Create sun 
const sun = new Object();

function startGame() {
    // Change visibilities
    var init = document.getElementById("initialize");
    var make_planet = document.getElementById("new_planet");
    var sim = document.getElementById("simulation");

    init.style.display = 'none';
    make_planet.style.display = 'inline';
    sim.style.display = 'inline';
    initSun();
}

function initSun() {
    if (!checkValidSun()) {
        return;
    }
    sun.mass = document.getElementById('s_mass_in').value;
    drawSun();
}

function checkValidSun() {
    let input_mass = document.getElementById('s_mass_in').value;
    if (input_mass <= 0) {
        alert("Mass should be greater than 0.");
        return false;
    }
    if (input_mass > 10000){
        alert("Please enter a mass smaller than 10,000 kg.");
        return false;
    }
    return true;
}


function drawSun() {
    // Display sun
    var c = document.getElementById('gameCanvas');
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(325, 325, sun_radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#ffb801';
    ctx.fill();
    // Display sun's mass
    ctx.font = '15px testFont';
    ctx.fillStyle = '#10111c';
    ctx.textAlign = "center";
    ctx.fillText(sun.mass + " kg", 325, 325, 100);
}