'use strict';

// Tilt effect on cards
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.03)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Float cards floating animation
document.querySelectorAll('.float-card').forEach((card, i) => {
  const delay = i * 0.7;
  const amp = 8 + i * 2;
  let start = null;
  function floatStep(ts) {
    if (!start) start = ts;
    const t = (ts - start) / 1000;
    const y = Math.sin(t * 0.8 + delay) * amp;
    const x = Math.cos(t * 0.5 + delay) * (amp * 0.3);
    card.style.transform = `translateY(${y}px) translateX(${x}px)`;
    requestAnimationFrame(floatStep);
  }
  requestAnimationFrame(floatStep);
});

// Scroll reveal with Intersection Observer
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal-section').forEach(sec => {
  sec.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  sectionObserver.observe(sec);
});

// Watch demo button — always works regardless of script load order
document.addEventListener('DOMContentLoaded', () => {
  const watchBtn = document.getElementById('watchDemoBtn');
  if (watchBtn) {
    watchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const modal = document.getElementById('videoModal');
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  // Also wire up nav Start Free button to modal or pricing
  const navStartFree = document.querySelector('.btn-primary-cta');
  if (navStartFree) {
    navStartFree.addEventListener('click', () => {
      const pricing = document.getElementById('pricing');
      if (pricing) pricing.scrollIntoView({ behavior: 'smooth' });
    });
  }
});

// Butterfly spawner
function spawnButterflies() {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;
  const butterflies = ['🦋', '🦋', '🌸'];
  for (let i = 0; i < 5; i++) {
    const b = document.createElement('div');
    b.className = 'butterfly';
    b.textContent = butterflies[Math.floor(Math.random() * butterflies.length)];
    b.style.left = (10 + Math.random() * 80) + 'vw';
    b.style.top = (10 + Math.random() * 60) + 'vh';
    b.style.animationDuration = (6 + Math.random() * 8) + 's';
    b.style.animationDelay = Math.random() * 10 + 's';
    b.style.position = 'absolute';
    b.style.zIndex = '3';
    b.style.fontSize = (0.8 + Math.random() * 0.7) + 'rem';
    b.style.pointerEvents = 'none';
    hero.appendChild(b);
  }
}
spawnButterflies();

// Water ripple on hero click
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
  heroSection.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
    const ripple = document.createElement('div');
    ripple.className = 'water-ripple';
    const size = 80;
    ripple.style.cssText = `
      width:${size}px; height:${size}px;
      left:${e.clientX - size/2}px; top:${e.clientY - size/2 + window.scrollY}px;
      position:absolute; z-index:4; animation-duration:1.2s;
    `;
    heroSection.appendChild(ripple);
    setTimeout(() => ripple.remove(), 1300);
  });
}

// Nav link active state on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active-link', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => activeObserver.observe(s));

// Start free button
const startFreeBtn = document.getElementById('startFreeBtn');
if (startFreeBtn) {
  startFreeBtn.addEventListener('click', () => {
    const pricing = document.getElementById('pricing');
    if (pricing) pricing.scrollIntoView({ behavior: 'smooth' });
  });
}
