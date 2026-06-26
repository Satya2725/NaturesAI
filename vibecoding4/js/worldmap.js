'use strict';

const wmCanvas = document.getElementById('worldMapCanvas');
if (wmCanvas) {
  const ctx = wmCanvas.getContext('2d');
  const W = wmCanvas.width, H = wmCanvas.height;

  // Country hotspot data
  const markers = [
    { x: 0.14, y: 0.32, name: 'Canada', stat: '1.2M Trees', color: '#4ade80' },
    { x: 0.22, y: 0.45, name: 'Amazon', stat: '3.4M Trees', color: '#22c55e' },
    { x: 0.50, y: 0.28, name: 'Europe', stat: '890K Rivers', color: '#60a5fa' },
    { x: 0.56, y: 0.42, name: 'Congo Basin', stat: '1.8M Trees', color: '#4ade80' },
    { x: 0.64, y: 0.35, name: 'Russia', stat: '567K Wildlife', color: '#34d399' },
    { x: 0.74, y: 0.46, name: 'India', stat: '234K Sensors', color: '#fbbf24' },
    { x: 0.80, y: 0.40, name: 'China', stat: '456K Trees', color: '#4ade80' },
    { x: 0.85, y: 0.62, name: 'Australia', stat: '123K Rivers', color: '#22d3ee' },
    { x: 0.44, y: 0.55, name: 'Africa', stat: '2.1M Wildlife', color: '#fb923c' },
    { x: 0.72, y: 0.62, name: 'SE Asia', stat: '789K Trees', color: '#a78bfa' },
  ];

  let wmTs = 0;
  let animProgress = 0;

  function drawWorldMap(ts) {
    animProgress = Math.min(animProgress + 0.008, 1);
    ctx.clearRect(0, 0, W, H);

    // Background
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#030d1c');
    bg.addColorStop(1, '#040f20');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Ocean texture - subtle grid
    ctx.strokeStyle = 'rgba(74,222,128,0.03)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < W; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 25) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Continent silhouettes (simplified filled regions)
    ctx.fillStyle = 'rgba(22,163,74,0.12)';
    ctx.strokeStyle = 'rgba(74,222,128,0.2)';
    ctx.lineWidth = 1;

    const continents = [
      // North America
      [[0.06,0.15],[0.28,0.15],[0.32,0.22],[0.28,0.55],[0.24,0.60],[0.15,0.55],[0.08,0.45],[0.05,0.30]],
      // South America
      [[0.20,0.55],[0.32,0.55],[0.35,0.65],[0.30,0.82],[0.22,0.85],[0.17,0.75],[0.18,0.60]],
      // Europe
      [[0.42,0.15],[0.58,0.15],[0.62,0.22],[0.58,0.40],[0.50,0.42],[0.44,0.35],[0.42,0.25]],
      // Africa
      [[0.44,0.42],[0.58,0.42],[0.62,0.50],[0.58,0.78],[0.50,0.82],[0.43,0.75],[0.42,0.55]],
      // Asia
      [[0.58,0.14],[0.90,0.14],[0.95,0.25],[0.92,0.52],[0.80,0.58],[0.68,0.55],[0.60,0.48],[0.58,0.30]],
      // Australia
      [[0.78,0.58],[0.94,0.58],[0.96,0.72],[0.88,0.80],[0.78,0.78],[0.76,0.68]],
    ];

    continents.forEach(points => {
      ctx.beginPath();
      points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p[0] * W, p[1] * H);
        else ctx.lineTo(p[0] * W, p[1] * H);
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    });

    // Animated connection arcs between markers
    const arcPairs = [[0,1],[1,4],[2,5],[3,8],[5,9],[6,9],[7,9]];
    arcPairs.forEach(([a, b], i) => {
      const ma = markers[a], mb = markers[b];
      const ax = ma.x * W, ay = ma.y * H;
      const bx = mb.x * W, by = mb.y * H;
      const cp = ((ts * 0.0004 + i * 0.2) % 1);

      const mx = (ax + bx) / 2;
      const my = (ay + by) / 2 - 40;

      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.quadraticCurveTo(mx, my, bx, by);
      ctx.strokeStyle = 'rgba(74,222,128,0.12)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Animated dot
      const t = cp;
      const dotX = (1-t)*(1-t)*ax + 2*(1-t)*t*mx + t*t*bx;
      const dotY = (1-t)*(1-t)*ay + 2*(1-t)*t*my + t*t*by;
      ctx.beginPath();
      ctx.arc(dotX, dotY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = ma.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = ma.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Draw markers
    markers.forEach((m, i) => {
      const x = m.x * W, y = m.y * H;
      const pulse = 0.5 + 0.5 * Math.sin(ts * 0.002 + i * 1.1);
      const scale = animProgress;

      // Pulse rings
      for (let r = 0; r < 3; r++) {
        const ringT = ((ts * 0.0015 + i * 0.4 + r * 0.33) % 1);
        ctx.beginPath();
        ctx.arc(x, y, ringT * 22 * scale, 0, Math.PI * 2);
        ctx.strokeStyle = m.color + Math.floor((1 - ringT) * 80).toString(16).padStart(2, '0');
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Core dot
      ctx.beginPath();
      ctx.arc(x, y, 5 * scale, 0, Math.PI * 2);
      ctx.fillStyle = m.color;
      ctx.shadowBlur = 12;
      ctx.shadowColor = m.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    wmTs = ts;
    requestAnimationFrame(drawWorldMap);
  }

  // Only run when in viewport
  const wmObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) requestAnimationFrame(drawWorldMap);
  }, { threshold: 0.1 });
  wmObserver.observe(wmCanvas);

  // Add DOM hotspot tooltips
  const hotspotsDiv = document.getElementById('mapHotspots');
  if (hotspotsDiv) {
    markers.forEach((m, i) => {
      const el = document.createElement('div');
      el.className = 'hotspot';
      el.style.left = (m.x * 100) + '%';
      el.style.top = (m.y * 100) + '%';
      el.innerHTML = `
        <div class="hotspot-ring" style="background:${m.color};box-shadow:0 0 10px ${m.color}"></div>
        <div class="hotspot-tooltip">${m.name}: ${m.stat}</div>
      `;
      hotspotsDiv.appendChild(el);
    });
  }
}
