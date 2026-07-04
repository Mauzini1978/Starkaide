// =============================================
// Space Empire - Core Game
// =============================================

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let currentScreen = 'mainMenu';
let gameData = {
    resources: { credits: 500, research: 120 },
    ships: [],
    crew: [],
    planets: [],
    researched: []
};

// Simple star background
function drawBackground() {
    ctx.fillStyle = '#000411';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 80; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.fillRect(x, y, 1.5, 1.5);
    }
}

// Click handler
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    handleClick(x, y);
});

function handleClick(x, y) {
    // Will be implemented per screen
    console.log(`Click at ${x}, ${y} on screen ${currentScreen}`);
    if (currentScreen === 'mainMenu') {
        if (y > 200 && y < 280) changeScreen('setup');
    }
}

function changeScreen(screen) {
    currentScreen = screen;
    document.getElementById('current-screen').textContent = getScreenName(screen);
    render();
}

function getScreenName(screen) {
    const names = {
        mainMenu: 'Hauptmenü',
        setup: 'Spiel-Setup',
        galaxy: 'Galaxiekarte',
        system: 'Sternensystem',
        planet: 'Planetenoberfläche',
        research: 'Forschung',
        crew: 'Crew-Management',
        ship: 'Schiff-Konfiguration',
        fleet: 'Flotte'
    };
    return names[screen] || screen;
}

// Main render loop
function render() {
    drawBackground();
    ctx.strokeStyle = '#0f0';
    ctx.lineWidth = 2;

    if (currentScreen === 'mainMenu') {
        renderMainMenu();
    } else if (currentScreen === 'setup') {
        renderSetup();
    } else if (currentScreen === 'galaxy') {
        renderGalaxy();
    } else {
        ctx.fillStyle = '#0f0';
        ctx.font = '24px monospace';
        ctx.fillText(`Bildschirm: ${getScreenName(currentScreen)}`, 50, 100);
        ctx.fillText('Noch leer - klicke irgendwo', 50, 150);
    }
    
    updateSidePanel();
}

function renderMainMenu() {
    ctx.fillStyle = '#0f0';
    ctx.font = 'bold 48px monospace';
    ctx.fillText('SPACE EMPIRE', 180, 120);
    
    const boxes = [
        {y: 200, text: 'Neues Spiel', action: () => changeScreen('setup')},
        {y: 280, text: 'Spiel Laden'},
        {y: 360, text: 'Einstellungen'},
        {y: 440, text: 'Bibliothek'},
        {y: 520, text: 'Beenden'}
    ];
    
    boxes.forEach((box, i) => {
        ctx.strokeRect(250, box.y, 400, 60);
        ctx.font = '24px monospace';
        ctx.fillText(box.text, 340, box.y + 40);
    });
}

function renderSetup() {
    ctx.fillStyle = '#0f0';
    ctx.font = '28px monospace';
    ctx.fillText('Neues Spiel - Setup', 50, 80);
    
    ctx.fillText('Rasse auswählen:', 100, 180);
    ctx.strokeRect(100, 200, 200, 80);
    ctx.fillText('Mensch (Standard)', 130, 250);
    
    ctx.fillText('Schwierigkeit:', 500, 180);
    ctx.strokeRect(500, 200, 250, 60);
}

function renderGalaxy() {
    ctx.fillStyle = '#0f0';
    ctx.font = '24px monospace';
    ctx.fillText('Galaxiekarte', 50, 60);
    
    // Stars
    for (let i = 0; i < 8; i++) {
        const x = 150 + (i % 4) * 180;
        const y = 150 + Math.floor(i / 4) * 180;
        ctx.beginPath();
        ctx.arc(x, y, 18, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillText(`S${i+1}`, x-15, y+8);
    }
    
    // Arkaden (connections)
    ctx.beginPath();
    ctx.moveTo(168, 168);
    ctx.lineTo(310, 310);
    ctx.stroke();
}

function updateSidePanel() {
    const panel = document.getElementById('side-buttons');
    panel.innerHTML = `
        <button onclick="changeScreen('galaxy')">Galaxiekarte</button>
        <button onclick="changeScreen('research')">Forschung</button>
        <button onclick="changeScreen('crew')">Crew</button>
        <button onclick="changeScreen('ship')">Mein Schiff</button>
        <button onclick="changeScreen('fleet')">Flotte</button>
        <button onclick="changeScreen('mainMenu')">Hauptmenü</button>
    `;
}

// Save / Load
function saveGame() {
    localStorage.setItem('spaceEmpireSave', JSON.stringify(gameData));
    alert('Spiel gespeichert!');
}

function loadGame() {
    const saved = localStorage.getItem('spaceEmpireSave');
    if (saved) {
        gameData = JSON.parse(saved);
        alert('Spiel geladen!');
        render();
    }
}

// Start the game
changeScreen('mainMenu');
setInterval(() => {
    if (currentScreen !== 'mainMenu' && currentScreen !== 'setup') render();
}, 500); // gentle refresh
