const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
const PARTICLE_COUNT = 90;
const MAX_DISTANCE = 130;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {

    constructor() {

        this.reset();

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

    }

    reset() {

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.radius = Math.random() * 2 + 1;

        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;

        const colors = [
            "#5B7CFF",
            "#8B5CFF",
            "#00D68F",
            "#FFFFFF"
        ];

        this.color = colors[Math.floor(Math.random() * colors.length)];

    }

    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width)
            this.speedX *= -1;

        if (this.y < 0 || this.y > canvas.height)
            this.speedY *= -1;

    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = this.color;
        ctx.fill();

    }

}

for (let i = 0; i < PARTICLE_COUNT; i++) {

    particles.push(new Particle());

}

function drawLines() {

    for (let a = 0; a < particles.length; a++) {

        for (let b = a + 1; b < particles.length; b++) {

            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;

            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < MAX_DISTANCE) {

                ctx.beginPath();

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.strokeStyle =
                    "rgba(91,124,255," +
                    (1 - distance / MAX_DISTANCE) * 0.35 +
                    ")";

                ctx.lineWidth = 1;

                ctx.stroke();

            }

        }

    }

}

let mouse = {

    x: null,
    y: null

};

window.addEventListener("mousemove", e => {

    mouse.x = e.clientX;
    mouse.y = e.clientY;

});

function mouseEffect() {

    if (mouse.x == null) return;

    particles.forEach(p => {

        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;

        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {

            p.x -= dx * 0.003;
            p.y -= dy * 0.003;

        }

    });

}

function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p => {

        p.update();
        p.draw();

    });

    drawLines();

    mouseEffect();

    requestAnimationFrame(animate);

}

animate();
