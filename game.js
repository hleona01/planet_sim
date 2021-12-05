/* * * * * * * * * * */
/*    VARIABLES      */
/* * * * * * * * * * */

// Canvas
var c = document.getElementById('gameCanvas');
var ctx = c.getContext("2d");

// Keeps track of whether simulation is operating
var running = false;

function changeMode() {
    if (running) {
        document.getElementById('stopstart').innerHTML = "Run simulation";
        running = false;
        return;
    } else {
        document.getElementById('stopstart').innerHTML = "Pause simulation";
        running = true;
        requestAnimationFrame(animateOrbits);
    }
}

function animateOrbits() {
    if (running) {
        ctx.clearRect(0, 0, max, max);
        // Redraw sun 
        drawSun();
        // Loop through Planets array, drawing each planet to display
        // its movement according to its radius and period
        drawPlanets();
        // Show animation if simulation is running
        requestAnimationFrame(animateOrbits);
    } else {
        return;
    }
    
}

function drawPlanets() {
    var length = planets.length;
    // Draw all orbits before all planets so if two planets have same
    // orbit, one won't be shown behind the other's orbit line
    for (var i = 0; i < length; i++) {
        drawOrbit(planets[i], mid, mid, planets[i].pixel_radius);
    }
    for (var i = 0; i < length; i++) {
        // One degree/frame = traveling entire orbit in one day (6 seconds)
        // This value must be in radians for the Math functions to work
        let radIncrement = (1/parseFloat(planets[i].period)) * (Math.PI/180);
        planets[i].curr_angle += radIncrement;
        // Get new coordinates
        let xcoord = planets[i].pixel_radius * Math.cos(planets[i].curr_angle);
        let ycoord = planets[i].pixel_radius * Math.sin(planets[i].curr_angle);
        drawPlanet(planets[i], mid + xcoord, mid + ycoord, gen_planet_radius);
    }
}