/* * * * * * * * * * */
/*    VARIABLES      */
/* * * * * * * * * * */

// Radius of all planets (in pixels)
var gen_planet_radius = 15;

/* Planet fields:
    * label: labels planet in simulation according to order added
    * name: name for planet inputted by user
    * period: number of days it takes the planet to complete a revolution
    * pixel_radius: the planet's distance from the sun in pixels
    * color: a randomly selected color
    * curr_angle: the planet's current revolution angle
*/

function makePlanet() {
    if (!checkValid())
    {
        return;
    }
    const planet = new Object();
    let mass = document.getElementById('p_mass_in').value;
    let dist = document.getElementById('p_dist_in').value;
    planet.name = document.getElementById('name_in').value
    // 0 meters represented by 20 pixels for visibility
    // Each additional meter is an additional 20 pixels
    planet.pixel_radius = sun_radius + 20 + dist * 35;
    // Calculate period 
    planet.period = getPeriod(mass, dist);
    // Initialize field to be used later
    planet.curr_angle = 0;
    planet.label = planets.length + 1;
    // Get random light color
    planet.color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
    planets.push(planet);
    // Display planet in table and simulation
    addToTable();
    drawOrbit(planet, 325, 325, planet.pixel_radius);
    drawPlanet(planet, 325 + planet.pixel_radius, 325, gen_planet_radius);
    return;
}

function getPeriod(mass, dist) {
    // Equation for period (in seconds): T² = (4• π^2 • R³)/(G • M)
    let fourpisq = 4 * Math.PI**2;
    // G = gravitational constant = 6.674e-11
    let G = 6.674e-11;
    let T_squared = (fourpisq * dist**3)/(G * (parseFloat(mass) + 
                     parseFloat(sun.mass)));
    let T = Math.sqrt(T_squared);
    // Turn unit of period into days
    return T/86400;
}

// Only continue if input is valid
function checkValid() {
    let input_mass = document.getElementById('p_mass_in').value;
    let input_dist = document.getElementById('p_dist_in').value;
    if (parseFloat(input_mass) <= 0 || parseFloat(input_dist) <= 0) {
        alert("Mass and distance should be greater than 0.");
        return false;
    }
    if (parseFloat(input_mass) >= parseFloat(sun.mass)) {
        alert("Please enter a mass smaller than that of the sun.");
        return false;   
    }
    if (parseFloat(input_dist) > 6.5) {
        alert("Please enter a distance 6.5 meters or smaller" +
              "so your planet can be visible.");
        return false;
    }
    return true;
}

// Add new planet data to table
function addToTable() {
    var index = planets.length - 1;
    var table = document.getElementById('data');
    var row = table.insertRow(planets.length);
    var label = row.insertCell(0);
    var name = row.insertCell(1);
    var mass = row.insertCell(2);
    var dist = row.insertCell(3);
    var per = row.insertCell(4);

    let rounded_per = planets[index].period.toFixed(3)
    label.innerHTML = planets[index].label;
    name.innerHTML = planets[index].name;
    mass.innerHTML = document.getElementById('p_mass_in').value + ' kg';
    dist.innerHTML = document.getElementById('p_dist_in').value + ' m';
    per.innerHTML = rounded_per + ' days';
}

// Add planet to canvas
function drawPlanet(planet, x, y, rad) {
    var c = document.getElementById('gameCanvas');
    var ctx = c.getContext("2d");

    // Show planet
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, 2 * Math.PI, false);
    ctx.fillStyle = planet.color;
    ctx.fill();

    // Draw label
    ctx.font = '10px testFont';
    ctx.fillStyle = '#10111c';
    ctx.textAlign = "center";
    ctx.fillText(planet.label, x, y, 50);
}

// Add orbit to canvas
function drawOrbit(planet, x, y, rad) {
    var c = document.getElementById('gameCanvas');
    var ctx = c.getContext("2d");

    // Draw orbit
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, 2 * Math.PI, false);
    ctx.strokeStyle = planet.color;
    ctx.stroke();
}



