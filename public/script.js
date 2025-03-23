const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas dynamically
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particles = [];
const numParticles = 1500;  // More particles for dense effect
const mouse = { x: null, y: null };

// Mouse tracking
canvas.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

class Particle {
    constructor(x, y, size, speedX, speedY, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Cursor repulsion with stronger effect
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.hypot(dx, dy);

        if (distance < 100) {  // Increased hover effect range
            this.x -= dx * 0.03;  // Stronger repulsion
            this.y -= dy * 0.03;
        }

        // Respawn particles when they leave canvas
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.9;
        ctx.fill();
    }
}

function createParticles() {
    particles.length = 0;
    for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 0.5 + 0.1;  // **Tiny dots**
        const speedX = (Math.random() - 0.5) * 0.3;
        const speedY = (Math.random() - 0.5) * 0.3;
        const color = getRandomColor();

        particles.push(new Particle(x, y, size, speedX, speedY, color));
    }
}

function getRandomColor() {
    const colors = [
        "rgba(255, 255, 255, 0.8)",   // White
        "rgba(135, 206, 250, 0.8)",   // Sky blue
        "rgba(152, 251, 152, 0.8)",   // Pale green
        "rgba(255, 182, 193, 0.8)"    // Light pink
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

createParticles();
animate();