const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function drawGalaxy() {
    ctx.fillStyle = '#000411';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#0f0';
    ctx.lineWidth = 2;

    const stars = [
        {x:180, y:140, name:"Sol"},
        {x:480, y:110, name:"Sirius"},
        {x:680, y:250, name:"Vega"},
        {x:320, y:380, name:"Proxima"},
        {x:150, y:320, name:"Tau Ceti"},
        {x:550, y:420, name:"Altair"}
    ];

    // Linien
    ctx.beginPath();
    ctx.moveTo(stars[0].x, stars[0].y);
    ctx.lineTo(stars[1].x, stars[1].y);
    ctx.lineTo(stars[2].x, stars[2].y);
    ctx.lineTo(stars[5].x, stars[5].y);
    ctx.lineTo(stars[3].x, stars[3].y);
    ctx.stroke();

    // Sterne
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, 22, 0, Math.PI*2);
        ctx.stroke();
        ctx.fillStyle = '#0f0';
        ctx.font = '18px monospace';
        ctx.fillText(star.name, star.x - 45, star.y - 35);
    });
}

drawGalaxy();
