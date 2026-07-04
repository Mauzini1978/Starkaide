const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function draw() {
    ctx.fillStyle = '#000822';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Sterne
    const stars = [
        {x:200, y:150, name:"Sol"},
        {x:500, y:120, name:"Sirius"},
        {x:650, y:300, name:"Vega"},
        {x:300, y:380, name:"Proxima"},
        {x:150, y:280, name:"Tau"}
    ];

    ctx.strokeStyle = '#0f0';
    ctx.lineWidth = 2;

    // Linien
    ctx.beginPath();
    ctx.moveTo(stars[0].x, stars[0].y);
    ctx.lineTo(stars[1].x, stars[1].y);
    ctx.lineTo(stars[2].x, stars[2].y);
    ctx.stroke();

    // Sterne zeichnen
    stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, 20, 0, Math.PI*2);
        ctx.stroke();
        ctx.fillStyle = '#0f0';
        ctx.fillText(s.name, s.x-30, s.y-30);
    });
}

draw();
