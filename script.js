let attemptCount = 0;
const messages = [
    "Please think again. You are the best thing that ever happened to me.",
    "Take a moment. Imagine all the happy times we've shared.",
    "Think about all the adventures we've yet to go on together.",
    "Remember the first time we met and how we felt.",
    "Consider how much we've grown together.",
    "I truly believe we're meant to be. Please give it another thought."
];

function handleYes() {
    document.getElementById('question').textContent = "I love you too!";
    document.getElementById('yesButton').style.display = "none";
    document.getElementById('noButton').style.display = "none";
    document.getElementById('response').textContent = "I'm so happy you said yes!";
    showQuotation();
    startFireworks();
}

function handleNo() {
    attemptCount++;
    if (attemptCount < 7) {
        document.getElementById('response').textContent = messages[attemptCount - 1];
    } else {
        document.getElementById('noButton').textContent = "Yes";
        document.getElementById('noButton').onclick = handleYes;  // Change the click event to handleYes
        document.getElementById('response').textContent = "I knew you would come around!";
    }
}

function showQuotation() {
    const quotation = document.getElementById('quotation');
    quotation.textContent = "You are my everything. Together, forever, let's create our own fairytale.";
    quotation.classList.remove('hidden');
}

// Fireworks animation setup
function startFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');

    canvas.classList.remove('hidden');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor(x, y, color, velocityX, velocityY, lifetime) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocityX = velocityX;
            this.velocityY = velocityY;
            this.lifetime = lifetime;
            this.opacity = 1;
        }

        update() {
            this.x += this.velocityX;
            this.y += this.velocityY;
            this.lifetime -= 0.02;
            this.opacity = Math.max(0, this.lifetime);
        }

        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
    }

    class Firework {
        constructor(x, y, targetY) {
            this.x = x;
            this.y = y;
            this.targetY = targetY;
            this.exploded = false;
            this.particles = [];
            this.velocityY = -2;
        }

        update() {
            if (!this.exploded) {
                this.y += this.velocityY;
                if (this.y <= this.targetY) {
                    this.exploded = true;
                    this.createParticles();
                }
            }
        }

        draw(ctx) {
            if (!this.exploded) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = 'white';
                ctx.fill();
                ctx.closePath();
            } else {
                this.particles.forEach(particle => particle.update());
                this.particles.forEach(particle => particle.draw(ctx));
            }
        }

        createParticles() {
            const particleCount = 100;
            const angleIncrement = (Math.PI * 2) / particleCount;
            for (let i = 0; i < particleCount; i++) {
                const angle = i * angleIncrement;
                const speed = Math.random() * 3 + 2;
                const velocityX = Math.cos(angle) * speed;
                const velocityY = Math.sin(angle) * speed;
                const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
                const lifetime = Math.random() * 1 + 1;
                this.particles.push(new Particle(this.x, this.y, color, velocityX, velocityY, lifetime));
            }
        }
    }

    const fireworks = [];

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fireworks.forEach((firework, index) => {
            if (firework.exploded && firework.particles.length === 0) {
                fireworks.splice(index, 1);
            } else {
                firework.update();
                firework.draw(ctx);
            }
        });
        requestAnimationFrame(animate);
    }

    function launchFirework() {
        const x = Math.random() * canvas.width;
        const targetY = Math.random() * canvas.height / 2;
        fireworks.push(new Firework(x, canvas.height, targetY));
    }

    setInterval(launchFirework, 500);
    animate();
}
