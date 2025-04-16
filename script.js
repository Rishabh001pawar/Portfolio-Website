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
const numParticles = 2000;  // More particles for dense effect
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



 // Typing Effect with Flicker Trigger
 const heading = document.getElementById('typing-heading');
 const text = heading.textContent;
 heading.textContent = '';
 let i = 0;
 function type() {
     if (i < text.length) {
         heading.textContent += text.charAt(i);
         i++;
         setTimeout(type, 100);
     } else {
         heading.classList.add('flicker-active'); // Trigger flicker after typing
     }
 }
 type();

 // GSAP Scroll Animations
 gsap.registerPlugin(ScrollTrigger);

 // Header Neon Glow
 gsap.to('.neon-glow', {
     scrollTrigger: {
         trigger: '.neon-glow',
         start: 'top 80%',
         end: 'bottom 20%',
         toggleActions: 'play reverse play reverse', // Replay on scroll up/down
     },
     boxShadow: '0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.6)',
     scale: 1.05,
     duration: 0.5,
     ease: 'power2.inOut',
     yoyo: true,
     repeat: -1,
 });

 // Heading Flicker and Scale
 gsap.to('#typing-heading', {
     scrollTrigger: {
         trigger: '#typing-heading',
         start: 'top 80%',
         end: 'bottom 20%',
         toggleActions: 'play reverse play reverse',
     },
     scale: 1.03,
     duration: 0.3,
     ease: 'power2.inOut',
     yoyo: true,
     repeat: -1,
 });

 // Paragraph Slide-Up and Color Shift
 document.querySelectorAll('.animate-paragraph').forEach((el, index) => {
     gsap.fromTo(el, {
         opacity: 0,
         y: 50,
     }, {
         scrollTrigger: {
             trigger: el,
             start: 'top 80%',
             end: 'bottom 20%',
             toggleActions: 'play reverse play reverse',
         },
         opacity: 1,
         y: 0,
         duration: 1,
         ease: 'power2.out',
         delay: index * 0.2,
     });

     // Color Shift for Highlighted Text
     gsap.to(el.querySelectorAll('.color-shift'), {
         scrollTrigger: {
             trigger: el,
             start: 'top 80%',
             end: 'bottom 20%',
             toggleActions: 'play reverse play reverse',
         },
         keyframes: {
             color: ['#facc15', '#ec4899', '#3b82f6', '#facc15'],
         },
         duration: 3,
         ease: 'none',
         repeat: -1,
     });
 });

 // Flip Cards Scale and Glow
 document.querySelectorAll('.animate-on-scroll').forEach((el) => {
     gsap.to(el, {
         scrollTrigger: {
             trigger: el,
             start: 'top 80%',
             end: 'bottom 20%',
             toggleActions: 'play reverse play reverse',
         },
         scale: 1.05,
         boxShadow: '0 0 15px rgba(139, 92, 246, 0.7)',
         duration: 0.5,
         ease: 'power2.inOut',
         yoyo: true,
         repeat: -1,
     });
 });

 // Skill Progress Bars with Shimmer
 document.querySelectorAll('[data-skill]').forEach((bar) => {
     gsap.to(bar, {
         scrollTrigger: {
             trigger: bar,
             start: 'top 80%',
             end: 'bottom 20%',
             toggleActions: 'play reverse play reverse',
         },
         width: `${bar.dataset.skill}%`,
         duration: 1.5,
         ease: 'power2.out',
     });
 });

 // Particles.js with Scroll-Driven Speed
 let particleConfig = {
     particles: {
         number: { value: 50, density: { enable: true, value_area: 800 } },
         color: { value: '#ffffff' },
         shape: { type: 'circle' },
         opacity: { value: 0.5, random: true },
         size: { value: 3, random: true },
         line_linked: { enable: false },
         move: {
             enable: true,
             speed: 1,
             direction: 'none',
             random: true,
             out_mode: 'out',
         },
     },
     interactivity: {
         detect_on: 'canvas',
         events: {
             onhover: { enable: true, mode: 'repulse' },
             onclick: { enable: true, mode: 'push' },
         },
     },
     retina_detect: true,
 };

 particlesJS('particles-js', particleConfig);

 // Update Particle Speed on Scroll
 ScrollTrigger.create({
     trigger: '#about',
     start: 'top bottom',
     end: 'bottom top',
     onUpdate: (self) => {
         const speed = self.direction === 1 ? 3 : 1; // Faster when scrolling down
         window.pJSDom[0].pJS.particles.move.speed = speed;
         window.pJSDom[0].pJS.fn.particlesRefresh();
     },
 });

gsap.registerPlugin(ScrollTrigger);
    
// Heading Neon Glow and Pulse
gsap.to('.neon-glow', {
    scrollTrigger: {
        trigger: '.neon-glow',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play reverse play reverse',
    },
    boxShadow: '0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.6)',
    scale: 1.05,
    duration: 0.5,
    ease: 'power2.inOut',
    yoyo: true,
    repeat: -1,
});

// Card Animations
document.querySelectorAll('.animate-card').forEach((card, index) => {
    gsap.fromTo(card, {
        opacity: 0,
        y: 50,
        scale: 0.95,
    }, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        delay: index * 0.1, // Stagger cards
    });

    // Neon Border Glow
    gsap.to(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
        },
        boxShadow: '0 0 15px rgba(139, 92, 246, 0.7)',
        scale: 1.03,
        duration: 0.5,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
    });

    // Color Shift for Skills List
    gsap.to(card.querySelector('.color-shift'), {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
        },
        keyframes: {
            color: ['#facc15', '#ec4899', '#3b82f6', '#facc15'],
        },
        duration: 3,
        ease: 'none',
        repeat: -1,
    });
});

// Flicker Effect for Card Titles
document.querySelectorAll('.flicker').forEach((title) => {
    gsap.to(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
        },
        opacity: 0.6,
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: 'none',
        onStart: () => title.classList.add('flicker-active'),
        onReverseComplete: () => title.classList.remove('flicker-active'),
    });
});

// Particles.js with Scroll-Driven Speed
particlesJS('particles-js', {
    particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: false },
        move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: true,
            out_mode: 'out',
        },
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' },
        },
    },
    retina_detect: true,
});

// Update Particle Speed on Scroll
ScrollTrigger.create({
    trigger: '#skills',
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
        const speed = self.direction === 1 ? 3 : 1; // Faster when scrolling down
        window.pJSDom[0].pJS.particles.move.speed = speed;
        window.pJSDom[0].pJS.fn.particlesRefresh();
    },
});

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
  
    if (menuOpen) {
      mobileMenu.classList.remove('max-h-0');
      mobileMenu.classList.add('py-6');
      mobileMenu.style.maxHeight = '500px'; // inline style
    } else {
      mobileMenu.style.maxHeight = '0px';
      mobileMenu.classList.remove('py-6');
      mobileMenu.classList.add('max-h-0');
    }
  });
  