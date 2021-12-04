var gen_planet_radius = 15;

/* Planet fields:
     mass
     dist
     name
     period (unit is days)
     pixel_radius
     color
     curr_angle
     label
*/

function makePlanet() {
    // Make sure input is valid
    if (!checkValid())
    {
        return;
    }
    const planet = new Object();
    planet.mass = document.getElementById('p_mass_in').value;
    planet.dist = document.getElementById('p_dist_in').value;
    planet.name = document.getElementById('name_in').value
    // 1 m represented by 20 pixels for visibility; each additional m = additional 20 pixels dist
    // Radius of sun + 20 + (distance * 20 /2)
    planet.pixel_radius = sun_radius + 20 + planet.dist * 35;
    // Equation for period (in seconds): T² = (4• π^2 • R³)/(G • M)
    let fourpisq = 4 * Math.PI**2;
    // G = gravitational constant = 6.674e-11
    let G = 6.674e-11;
    let T_squared = (fourpisq * planet.dist**3)/(G * (parseFloat(planet.mass) + parseFloat(sun.mass)));
    let T = Math.sqrt(T_squared);
    // Turn unit of period into days
    planet.period = T/86400;
    // Initialize field to be used later
    planet.curr_angle = 0;
    planet.label = planets.length + 1;
    planets.push(planet);
    // Display planet in table and simulation
    addToTable();
    drawPlanet(planets);
    return;
}

function checkValid() {
    let input_mass = document.getElementById('p_mass_in').value;
    let input_dist = document.getElementById('p_dist_in').value;
    if (parseFloat(input_mass) <= 0 || parseFloat(input_dist) <= 0) {
        alert("Mass and distance should be greater than 0.");
        return false;
    }
    if (input_mass > 10000){
        alert("Please enter a mass smaller than 10,000 kg.");
        return false;
    }
    if (parseFloat(input_mass) >= parseFloat(sun.mass)) {
        alert("Please enter a mass smaller than that of the sun.");
        return false;   
    }
    if (parseFloat(input_dist) > 6.5) {
        alert("Please enter a distance 6.5 meters or smaller so your planet can be visible.");
        return false;
    }
    return true;
}

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
    mass.innerHTML = planets[index].mass + ' kg';
    dist.innerHTML = planets[index].dist + ' m';
    per.innerHTML = rounded_per + ' days';
}

function drawPlanet(planets) {
    var curr_planet = planets[planets.length - 1];
    var c = document.getElementById('gameCanvas');
    var ctx = c.getContext("2d");
    let radius = curr_planet.pixel_radius;

    // Get random light color
    const planet_color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
    curr_planet.color = planet_color;

    // Show orbit
    ctx.beginPath();
    ctx.arc((650/2), (650/2), radius, 0, 2 * Math.PI, false);
    ctx.strokeStyle = planet_color;
    ctx.stroke();

    // Show planet
    ctx.beginPath();
    ctx.arc(650/2 + radius, 650/2, gen_planet_radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = planet_color;
    ctx.fill();

    // Show label
    ctx.font = '10px testFont';
    ctx.fillStyle = '#10111c';
    ctx.textAlign = "center";
    ctx.fillText(curr_planet.label, 650/2 + radius, 650/2, 50);
}



