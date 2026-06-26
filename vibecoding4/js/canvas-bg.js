'use strict';

// Ambient background canvas with particles, fog, and network lines
const bgCanvas = document.getElementById('bgCanvas');
const bgCtx = bgCanvas.getContext('2d');

function resizeBg() {
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
}
resizeBg();
window.addEventListener('resize', resizeBg);

const bgParticles = [];
const bgLines = [];
const NUM_PARTICLES = 60;

for (let i = 0; i < NUM_PARTICLES; i++) {
  bgParticles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 2 + 0.5,
    alpha: Math.random() * 0.5 + 0.1,
    color: Math.random() > 0.5 ? '#4ade80' : '#34d399'
  });
}

function drawBg(ts) {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

  // Subtle radial gradient overlay
  const grad = bgCtx.createRadialGradient(
    bgCanvas.width * 0.7, bgCanvas.height * 0.3, 0,
    bgCanvas.width * 0.7, bgCanvas.height * 0.3, bgCanvas.width * 0.6
  );
  grad.addColorStop(0, 'rgba(5,46,22,0.04)');
  grad.addColorStop(1, 'transparent');
  bgCtx.fillStyle = grad;
  bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

  // Update & draw particles
  bgParticles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = bgCanvas.width;
    if (p.x > bgCanvas.width) p.x = 0;
    if (p.y < 0) p.y = bgCanvas.height;
    if (p.y > bgCanvas.height) p.y = 0;

    bgCtx.beginPath();
    bgCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    bgCtx.fillStyle = p.color;
    bgCtx.globalAlpha = p.alpha * (0.5 + 0.5 * Math.sin(ts * 0.001 + p.x));
    bgCtx.fill();
  });

  // Network lines between close particles
  bgCtx.globalAlpha = 1;
  for (let i = 0; i < bgParticles.length; i++) {
    for (let j = i + 1; j < bgParticles.length; j++) {
      const dx = bgParticles[i].x - bgParticles[j].x;
      const dy = bgParticles[i].y - bgParticles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120) {
        bgCtx.beginPath();
        bgCtx.moveTo(bgParticles[i].x, bgParticles[i].y);
        bgCtx.lineTo(bgParticles[j].x, bgParticles[j].y);
        bgCtx.strokeStyle = `rgba(74,222,128,${0.06 * (1 - dist/120)})`;
        bgCtx.lineWidth = 0.5;
        bgCtx.stroke();
      }
    }
  }

  requestAnimationFrame(drawBg);
}

requestAnimationFrame(drawBg);

// DOM particles (leaves & birds spawner)
function spawnLeaves() {
  const container = document.getElementById('leavesContainer');
  if (!container) return;
  const leaves = ['🍃', '🌿', '🍂', '🌱'];
  for (let i = 0; i < 12; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
    leaf.style.left = Math.random() * 100 + 'vw';
    leaf.style.top = '-30px';
    leaf.style.fontSize = (0.6 + Math.random() * 0.8) + 'rem';
    leaf.style.animationDuration = (8 + Math.random() * 12) + 's';
    leaf.style.animationDelay = Math.random() * 15 + 's';
    container.appendChild(leaf);
  }
}

function spawnBirds() {
  const container = document.getElementById('birdsContainer');
  if (!container) return;
  for (let i = 0; i < 8; i++) {
    const bird = document.createElement('div');
    bird.className = 'bird';
    bird.textContent = '🐦';
    bird.style.top = (5 + Math.random() * 25) + 'vh';
    bird.style.left = '-60px';
    bird.style.fontSize = (0.6 + Math.random() * 0.6) + 'rem';
    bird.style.animationDuration = (18 + Math.random() * 20) + 's';
    bird.style.animationDelay = Math.random() * 30 + 's';
    container.appendChild(bird);
  }
}

spawnLeaves();
spawnBirds();
