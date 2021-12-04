var c = document.getElementById('gameCanvas');
var ctx = c.getContext("2d");
var running = false;
var animation;

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
        ctx.clearRect(0, 0, 650, 650);
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
    //var curr_planet;
    var length = planets.length;

    for (var i = 0; i < length; i++) {
        // One degree/frame = going entire orbit in one day
        // This value must be in radians for the Math functions to work.
        let radIncrement = (1/parseFloat(planets[i].period)) * (Math.PI/180);
        planets[i].curr_angle += radIncrement;
        // Get new coordinates
        let xcoord = planets[i].pixel_radius * Math.cos(planets[i].curr_angle);
        let ycoord = planets[i].pixel_radius * Math.sin(planets[i].curr_angle);

        // Draw orbit
        ctx.beginPath();
        ctx.arc((650/2), (650/2), planets[i].pixel_radius, 0, 2 * Math.PI, false);
        ctx.strokeStyle = planets[i].color;
        ctx.stroke();

        // Draw planet
        ctx.beginPath();
        ctx.arc((650/2) + xcoord, (650/2) + ycoord, gen_planet_radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = planets[i].color;
        ctx.fill();

        //Draw name
        ctx.font = '10px testFont';
        ctx.fillStyle = '#10111c';
        ctx.textAlign = "center";
        ctx.fillText(planets[i].label, 650/2 + xcoord, 650/2 + ycoord, 50);
    }
}