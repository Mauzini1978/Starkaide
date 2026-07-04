const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let currentScreen = 'galaxy';

function drawBackground() {
    ctx.fillStyle = '#000411';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Stars background
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 120; i++) {
        ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, 1.5, 1.5);
    }
}

function renderGalaxy() {
    drawBackground();
    ctx.strokeStyle = '#0f0';
    ctx.lineWidth = 2;

    // Stars
    const stars = [
        {x: 150, y: 150, name: "Sol"},
        {x: 420, y: 120, name: "Alpha Centauri"},
        {x: 650, y: 200, name: "Sirius"},
        {x: 280, y: 380, name: "Proxima"},
        {x: 580, y: 420, name: "Vega"},
        {x: 180, y: 280, name: "Tau Ceti"}
    ];

    // Connections
    ctx.beginPath();
    ctx.moveTo(stars[0].x, stars[0].y);
    ctx.lineTo(stars[1].x, stars[1].y);
    ctx.lineTo(stars[2].x, stars[2].y);
    ctx.lineTo(stars[4].x, stars[4].y);
    ctx.lineTo(stars[3].x, stars[3].y);
    ctx.stroke();

    // Draw stars
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, 18, 0, Math.PI*2);
        ctx.stroke();
        ctx.fillStyle = '#0f0';
        ctx.font = '16px monospace';
        ctx.fillText(star.name, star.x - 40, star.y - 25);
    });
}

function changeScreen(screen) {
    currentScreen = screen;
    render();
}

function render() {
    if (currentScreen === 'galaxy') {
        renderGalaxy();
    }
}

// Click handler
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log(`Klick auf Galaxy Map bei ${x}, ${y}`);
    document.getElementById('info').innerHTML = `Stern angeklickt bei ${Math.round(x)}, ${Math.round(y)}<br><small>→ System-View wird später geöffnet</small>`;
});

render();
