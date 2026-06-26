'use strict';

// ─── MAIN ENTRY POINT ───────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  // Initialize pricing
  if (typeof updatePricing === 'function') updatePricing();

  // Smooth nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Active nav link style
  const style = document.createElement('style');
  style.textContent = `.active-link { color: var(--green-400) !important; }`;
  document.head.appendChild(style);

  // Lazy load images
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img').forEach(img => { img.loading = 'lazy'; });
  }

  // Performance: pause animations when page not visible
  document.addEventListener('visibilitychange', () => {
    document.body.style.animationPlayState = document.hidden ? 'paused' : 'running';
  });

  // Feature detection: reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[style*="animation"]').forEach(el => {
      el.style.animation = 'none';
      el.style.transition = 'none';
    });
  }

  // Initialize counters for hero section immediately
  document.querySelectorAll('.hero-right .counter').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimals) || 0;
    const duration = 2500;
    const startTime = performance.now();

    function step(ts) {
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = (decimals > 0 ? value.toFixed(decimals) : Math.floor(value)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = (decimals > 0 ? target.toFixed(decimals) : target) + suffix;
    }

    setTimeout(() => requestAnimationFrame(step), 800);
  });

  // Fog particles in hero
  spawnFogParticles();

  // Log branding
  console.log('%cNatureOS AI', 'color:#4ade80;font-size:2rem;font-weight:900');
  console.log('%cNature Thinks. AI Acts.', 'color:#34d399;font-size:1rem');
});

function spawnFogParticles() {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;
  for (let i = 0; i < 8; i++) {
    const fog = document.createElement('div');
    fog.className = 'fog-particle';
    const size = 150 + Math.random() * 300;
    fog.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${20 + Math.random() * 60}%;
      animation-duration: ${15 + Math.random() * 20}s;
      animation-delay: ${Math.random() * 10}s;
      position: absolute;
      z-index: 2;
    `;
    hero.appendChild(fog);
  }
}

// ─── MODAL DEMO CANVAS ───────────────────────────────────────────────
function initModalDemo() {
  const canvas = document.getElementById('modalDemoCanvas');
  if (!canvas) return;

  // Set canvas resolution
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.round(canvas.offsetParent ? canvas.offsetParent.clientWidth * 0.9 : 700) || 700;
  canvas.height = 220;

  const ctx = canvas.getContext('2d');
  let mTs = 0;
  let running = true;

  const lines = [
    { color: '#4ade80', data: generateLine(12, 60, 95), label: 'Forest Cover' },
    { color: '#60a5fa', data: generateLine(12, 40, 80), label: 'Wildlife Index' },
    { color: '#fbbf24', data: generateLine(12, 20, 60), label: 'Alert Score' },
    { color: '#22d3ee', data: generateLine(12, 50, 85), label: 'River Health' },
  ];

  function generateLine(n, min, max) {
    const arr = [];
    let v = min + Math.random() * (max - min);
    for (let i = 0; i < n; i++) {
      v += (Math.random() - 0.45) * 8;
      v = Math.max(min, Math.min(max, v));
      arr.push(v);
    }
    return arr;
  }

  function drawModal(ts) {
    if (!running) return;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Dark bg
    ctx.fillStyle = '#030d1c';
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(74,222,128,0.05)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < W; x += 50) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 30) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Draw each line
    lines.forEach((line, li) => {
      const pts = line.data.map((v, i) => ({
        x: 30 + (i / (line.data.length - 1)) * (W - 60),
        y: H - 20 - (v / 100) * (H - 40)
      }));

      // Fill
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, line.color + '30');
      grad.addColorStop(1, 'transparent');
      ctx.beginPath();
      pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
      ctx.lineTo(W - 30, H); ctx.lineTo(30, H); ctx.closePath();
      ctx.fillStyle = grad; ctx.fill();

      // Line
      ctx.beginPath();
      pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
      ctx.strokeStyle = line.color; ctx.lineWidth = 2;
      ctx.lineJoin = 'round'; ctx.stroke();

      // Label
      ctx.font = 'bold 9px system-ui';
      ctx.fillStyle = line.color;
      ctx.fillText(line.label, 32, pts[0].y - 5);
    });

    // Scrolling time cursor
    const cursorX = 30 + ((ts * 0.00012) % 1) * (W - 60);
    ctx.beginPath();
    ctx.moveTo(cursorX, 0); ctx.lineTo(cursorX, H);
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    mTs = ts;
    requestAnimationFrame(drawModal);
  }

  requestAnimationFrame(drawModal);

  // Animate stat counters in modal
  function animateModalStat(id, target, suffix = '', decimals = 0) {
    const el = document.getElementById(id);
    if (!el) return;
    let start = null;
    const dur = 1800;
    function step(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = target * eased;
      el.textContent = (decimals > 0 ? v.toFixed(decimals) : Math.floor(v)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  animateModalStat('mdVal1', 12.5, 'M', 1);
  animateModalStat('mdVal2', 847, '');
  animateModalStat('mdVal3', 68, '%');
  animateModalStat('mdVal4', 425, 'K');

  // Return cleanup
  return () => { running = false; };
}

// Wire modal open to init demo
const origOpenModal = window.openModal;
window.openModal = function() {
  if (origOpenModal) origOpenModal();
  else {
    const modal = document.getElementById('videoModal');
    if (modal) { modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
  }
  setTimeout(initModalDemo, 300);
};
const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;
document.addEventListener('keydown', e => {
  if (e.key === konamiCode[konamiIdx]) {
    konamiIdx++;
    if (konamiIdx === konamiCode.length) {
      konamiIdx = 0;
      document.body.style.filter = 'hue-rotate(120deg)';
      setTimeout(() => document.body.style.filter = '', 3000);
    }
  } else {
    konamiIdx = 0;
  }
});

// ─── EASTER EGG: Konami Code ─────────────────────────────────────
const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;
document.addEventListener('keydown', e => {
  if (e.key === konamiCode[konamiIdx]) {
    konamiIdx++;
    if (konamiIdx === konamiCode.length) {
      konamiIdx = 0;
      document.body.style.filter = 'hue-rotate(120deg)';
      setTimeout(() => document.body.style.filter = '', 3000);
    }
  } else {
    konamiIdx = 0;
  }
});
