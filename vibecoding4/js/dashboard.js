'use strict';
// ─── DASHBOARD — FULLY SELF-CONTAINED ──────────────────────────────

const VIEWS = {
  satellite: {
    title: 'Global Satellite Overview',
    color: '#60a5fa',
    bgColor: '#030b18',
    scanColor: '#60a5fa',
    widgets: [
      { label: 'Coverage',   value: '98.4%', color: '#60a5fa' },
      { label: 'Resolution', value: '0.5m',  color: '#34d399' },
      { label: 'Satellites', value: '847',   color: '#a78bfa' },
      { label: 'Data/Day',   value: '12 TB', color: '#fbbf24' },
    ],
    hotspots: [
      { x: 0.14, y: 0.28, label: 'Alaska',   color: '#34d399' },
      { x: 0.20, y: 0.42, label: 'Amazon',   color: '#4ade80' },
      { x: 0.28, y: 0.30, label: 'Canada',   color: '#60a5fa' },
      { x: 0.50, y: 0.30, label: 'Congo',    color: '#22c55e' },
      { x: 0.55, y: 0.48, label: 'Sahara',   color: '#fbbf24' },
      { x: 0.70, y: 0.26, label: 'Siberia',  color: '#60a5fa' },
      { x: 0.80, y: 0.52, label: 'SE Asia',  color: '#4ade80' },
      { x: 0.87, y: 0.62, label: 'Pacific',  color: '#22d3ee' },
    ],
  },
  forest: {
    title: 'Forest Intelligence Monitor',
    color: '#4ade80',
    bgColor: '#021005',
    scanColor: '#4ade80',
    widgets: [
      { label: 'Forest Health',  value: '+3.2%',  color: '#4ade80' },
      { label: 'Trees Tagged',   value: '12.5M',  color: '#22c55e' },
      { label: 'Deforestation',  value: '↓ 18%',  color: '#34d399' },
      { label: 'Carbon Seq.',    value: '2.8 Gt', color: '#86efac' },
    ],
    hotspots: [
      { x: 0.20, y: 0.40, label: 'Amazon Rainforest',  color: '#4ade80' },
      { x: 0.14, y: 0.23, label: 'Tongass — Alaska',   color: '#86efac' },
      { x: 0.50, y: 0.32, label: 'Congo Basin',        color: '#22c55e' },
      { x: 0.70, y: 0.26, label: 'Boreal — Siberia',   color: '#34d399' },
      { x: 0.80, y: 0.54, label: 'Borneo Forest',      color: '#4ade80' },
    ],
  },
  wildlife: {
    title: 'Wildlife Tracking System',
    color: '#fb923c',
    bgColor: '#100500',
    scanColor: '#fb923c',
    widgets: [
      { label: 'Animals Tagged', value: '425K',  color: '#fb923c' },
      { label: 'Species',        value: '3,847', color: '#fbbf24' },
      { label: 'Migrations',     value: '247',   color: '#f87171' },
      { label: 'Endangered',     value: '1,204', color: '#fb923c' },
    ],
    hotspots: [
      { x: 0.15, y: 0.30, label: '🐻 Bear — Alaska',       color: '#fb923c' },
      { x: 0.22, y: 0.47, label: '🐆 Jaguar — Amazon',     color: '#fbbf24' },
      { x: 0.49, y: 0.50, label: '🐘 Elephant — Serengeti',color: '#f87171' },
      { x: 0.52, y: 0.24, label: '🐺 Wolf — Siberia',      color: '#fbbf24' },
      { x: 0.68, y: 0.42, label: '🐅 Tiger — India',       color: '#fb923c' },
      { x: 0.85, y: 0.64, label: '🐋 Whale — Pacific',     color: '#22d3ee' },
    ],
  },
  rivers: {
    title: 'River Health AI Network',
    color: '#22d3ee',
    bgColor: '#020c10',
    scanColor: '#22d3ee',
    widgets: [
      { label: 'Rivers Active',  value: '980',   color: '#22d3ee' },
      { label: 'Water Quality',  value: 'Good',  color: '#34d399' },
      { label: 'Flow Rate',      value: '+5.1%', color: '#60a5fa' },
      { label: 'Sensors',        value: '14.2K', color: '#a78bfa' },
    ],
    hotspots: [
      { x: 0.19, y: 0.42, label: '💧 Amazon River',   color: '#22d3ee' },
      { x: 0.29, y: 0.30, label: '💧 Mississippi',    color: '#60a5fa' },
      { x: 0.50, y: 0.32, label: '💧 Nile',           color: '#34d399' },
      { x: 0.57, y: 0.38, label: '💧 Congo River',    color: '#4ade80' },
      { x: 0.66, y: 0.37, label: '💧 Ganges',         color: '#22d3ee' },
      { x: 0.74, y: 0.30, label: '💧 Yangtze',        color: '#60a5fa' },
    ],
  },
  alerts: {
    title: 'Emergency Alert System',
    color: '#f87171',
    bgColor: '#100202',
    scanColor: '#f87171',
    widgets: [
      { label: 'Active Alerts', value: '12',  color: '#f87171' },
      { label: 'Wildfires',     value: '3',   color: '#fb923c' },
      { label: 'Floods',        value: '5',   color: '#60a5fa' },
      { label: 'Resolved',      value: '847', color: '#4ade80' },
    ],
    hotspots: [
      { x: 0.21, y: 0.43, label: '🔥 Wildfire — Brazil',     color: '#f87171' },
      { x: 0.77, y: 0.54, label: '🔥 Wildfire — Indonesia',  color: '#fb923c' },
      { x: 0.29, y: 0.35, label: '🌊 Flood — USA',           color: '#60a5fa' },
      { x: 0.53, y: 0.47, label: '🌵 Drought — Sahel',       color: '#fbbf24' },
      { x: 0.67, y: 0.49, label: '🌪 Storm — Bangladesh',    color: '#a78bfa' },
    ],
  },
  analytics: {
    title: 'AI Analytics Engine',
    color: '#a78bfa',
    bgColor: '#06020e',
    scanColor: '#a78bfa',
    widgets: [
      { label: 'Predictions', value: '4.9B',  color: '#a78bfa' },
      { label: 'Accuracy',    value: '98.7%', color: '#34d399' },
      { label: 'Models',      value: '2,400', color: '#60a5fa' },
      { label: 'Data Points', value: '2.1T',  color: '#fbbf24' },
    ],
    hotspots: [
      { x: 0.15, y: 0.35, label: 'AI Node — Americas', color: '#a78bfa' },
      { x: 0.35, y: 0.25, label: 'AI Node — Atlantic',  color: '#60a5fa' },
      { x: 0.52, y: 0.40, label: 'AI Node — Africa',   color: '#34d399' },
      { x: 0.68, y: 0.30, label: 'AI Node — Asia',     color: '#a78bfa' },
      { x: 0.82, y: 0.52, label: 'AI Node — Pacific',  color: '#fbbf24' },
      { x: 0.30, y: 0.55, label: 'AI Node — S.America',color: '#f87171' },
    ],
  },
};

// ─── CHART DATA PER VIEW ────────────────────────────────────────────
const CHART_DATA = {
  satellite: [
    [85,87,86,89,91,88,92,90,94,93,96,98],
    [50,50,50,50,50,50,50,50,50,50,50,50],
    [840,841,842,843,844,845,846,847,847,847,847,847],
    [10,11,11,12,12,12,12,12,12,12,12,12],
  ],
  forest: [
    [60,62,61,65,63,67,65,70,68,72,71,75],
    [10,10.5,11,11.2,11.5,11.8,12,12.1,12.3,12.4,12.5,12.5],
    [22,21,20,19,19,18,18,18,18,18,18,18],
    [2.4,2.5,2.55,2.6,2.65,2.7,2.72,2.75,2.77,2.78,2.79,2.8],
  ],
  wildlife: [
    [380,390,395,400,405,408,410,412,415,418,420,425],
    [3800,3810,3820,3828,3835,3840,3844,3845,3846,3847,3847,3847],
    [240,242,244,245,246,247,247,247,247,247,247,247],
    [1210,1208,1207,1206,1206,1205,1205,1205,1204,1204,1204,1204],
  ],
  rivers: [
    [960,965,968,972,974,976,978,979,980,980,980,980],
    [6,7,7,8,8,8,8,9,8,9,9,9],
    [100,101,102,103,104,104,104,105,105,105,105,105],
    [13.8,13.9,14.0,14.05,14.1,14.15,14.18,14.2,14.2,14.2,14.2,14.2],
  ],
  alerts: [
    [18,17,16,15,14,14,13,13,12,12,12,12],
    [5,4,4,4,3,3,3,3,3,3,3,3],
    [7,7,6,6,6,5,5,5,5,5,5,5],
    [820,825,830,835,838,840,843,845,845,846,847,847],
  ],
  analytics: [
    [4.5,4.6,4.65,4.7,4.75,4.8,4.82,4.85,4.87,4.88,4.89,4.9],
    [98.2,98.3,98.4,98.5,98.5,98.6,98.6,98.65,98.7,98.7,98.7,98.7],
    [2300,2320,2340,2360,2370,2380,2385,2390,2395,2398,2400,2400],
    [1.8,1.85,1.9,1.95,2.0,2.02,2.05,2.07,2.08,2.09,2.1,2.1],
  ],
};

// ─── STATE ──────────────────────────────────────────────────────────
let activeView = 'satellite';
let scanY = 0;
let rafId = null;
let userClicked = false;
let transStart = 0;
let canvasW = 0, canvasH = 0;

// ─── INIT (runs after DOM ready) ────────────────────────────────────
function initDashboard() {
  const canvas = document.getElementById('dashMapCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Fix canvas resolution to parent container size
  function resizeCanvas() {
    const parent = canvas.parentElement;
    canvasW = parent.clientWidth || 680;
    canvasH = parent.clientHeight || 240;
    canvas.width  = canvasW;
    canvas.height = canvasH;
  }

  resizeCanvas();
  window.addEventListener('resize', () => { resizeCanvas(); });

  // ── DRAW LOOP ────────────────────────────────────────────────────
  function drawFrame(ts) {
    const view = VIEWS[activeView];
    const W = canvas.width, H = canvas.height;
    if (W === 0 || H === 0) { resizeCanvas(); rafId = requestAnimationFrame(drawFrame); return; }

    const fadeAlpha = Math.min((ts - transStart) / 350, 1);

    // 1. Clear + background
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = view.bgColor;
    ctx.fillRect(0, 0, W, H);

    // 2. Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 0.5;
    for (let gx = 0; gx <= W; gx += 45) {
      ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
    }
    for (let gy = 0; gy <= H; gy += 35) {
      ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
    }

    // 3. Continent silhouettes
    drawContinents(ctx, W, H, view.color, fadeAlpha);

    // 4. Connection arcs
    drawArcs(ctx, W, H, view, ts, fadeAlpha);

    // 5. Hotspot dots + labels
    drawHotspots(ctx, W, H, view, ts, fadeAlpha);

    // 6. Scan beam
    scanY = (scanY + 0.6) % H;
    const sg = ctx.createLinearGradient(0, scanY - 18, 0, scanY + 18);
    sg.addColorStop(0, 'transparent');
    sg.addColorStop(0.5, view.scanColor + '22');
    sg.addColorStop(1, 'transparent');
    ctx.fillStyle = sg;
    ctx.fillRect(0, scanY - 18, W, 36);

    ctx.beginPath();
    ctx.moveTo(0, scanY); ctx.lineTo(W, scanY);
    ctx.strokeStyle = view.scanColor + 'bb';
    ctx.lineWidth = 1;
    ctx.stroke();

    rafId = requestAnimationFrame(drawFrame);
  }

  // Start loop
  transStart = performance.now();
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(drawFrame);

  // ── SIDEBAR CLICKS ───────────────────────────────────────────────
  document.querySelectorAll('.dash-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const key = item.dataset.view;
      if (!key || key === activeView) return;

      // Update active
      document.querySelectorAll('.dash-nav-item').forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      // Switch view
      activeView = key;
      transStart = performance.now();
      userClicked = true;

      // Update header title with fade
      const titleEl = document.querySelector('.dash-title');
      if (titleEl) {
        titleEl.style.opacity = '0';
        titleEl.style.transform = 'translateY(-8px)';
        setTimeout(() => {
          titleEl.textContent = VIEWS[key].title;
          titleEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          titleEl.style.opacity = '1';
          titleEl.style.transform = 'translateY(0)';
        }, 180);
      }

      // Update widget panels
      updateWidgets(key);
    });
  });

  // ── AUTO-CYCLE ───────────────────────────────────────────────────
  const keys = Object.keys(VIEWS);
  let autoIdx = 0;
  setInterval(() => {
    if (userClicked) return;
    autoIdx = (autoIdx + 1) % keys.length;
    const key = keys[autoIdx];
    activeView = key;
    transStart = performance.now();

    document.querySelectorAll('.dash-nav-item').forEach(n =>
      n.classList.toggle('active', n.dataset.view === key)
    );
    const titleEl = document.querySelector('.dash-title');
    if (titleEl) {
      titleEl.style.opacity = '0';
      titleEl.style.transform = 'translateY(-8px)';
      setTimeout(() => {
        titleEl.textContent = VIEWS[key].title;
        titleEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        titleEl.style.opacity = '1';
        titleEl.style.transform = 'translateY(0)';
      }, 180);
    }
    updateWidgets(key);
  }, 4500);

  // Init first widgets
  updateWidgets('satellite');
}

// ─── CONTINENT SILHOUETTES ──────────────────────────────────────────
function drawContinents(ctx, W, H, color, alpha) {
  // Simplified continent regions as polygon point arrays [x_ratio, y_ratio]
  const continents = [
    // North America
    [[0.06,0.14],[0.12,0.12],[0.24,0.14],[0.30,0.20],[0.28,0.30],[0.26,0.38],
     [0.22,0.42],[0.18,0.52],[0.14,0.52],[0.08,0.44],[0.06,0.32]],
    // South America
    [[0.18,0.52],[0.26,0.52],[0.32,0.58],[0.34,0.66],[0.30,0.80],[0.24,0.84],
     [0.18,0.78],[0.16,0.68],[0.17,0.58]],
    // Europe
    [[0.42,0.14],[0.52,0.14],[0.56,0.18],[0.58,0.26],[0.54,0.32],[0.50,0.36],
     [0.44,0.34],[0.42,0.28],[0.42,0.20]],
    // Africa
    [[0.44,0.36],[0.58,0.36],[0.62,0.44],[0.60,0.58],[0.56,0.74],[0.50,0.82],
     [0.44,0.78],[0.42,0.64],[0.42,0.50]],
    // Asia (large)
    [[0.56,0.13],[0.70,0.13],[0.80,0.16],[0.92,0.18],[0.96,0.26],[0.94,0.36],
     [0.88,0.46],[0.80,0.54],[0.72,0.58],[0.64,0.54],[0.58,0.44],[0.56,0.32],[0.56,0.20]],
    // Australia
    [[0.78,0.58],[0.90,0.58],[0.96,0.64],[0.96,0.76],[0.90,0.82],[0.80,0.82],
     [0.76,0.74],[0.76,0.66]],
  ];

  ctx.save();
  continents.forEach(pts => {
    ctx.beginPath();
    pts.forEach((p, i) => {
      const px = p[0] * W, py = p[1] * H;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha * 0.14;
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.globalAlpha = alpha * 0.28;
    ctx.stroke();
  });
  ctx.restore();
}

// ─── CONNECTION ARCS ────────────────────────────────────────────────
function drawArcs(ctx, W, H, view, ts, alpha) {
  const hs = view.hotspots;
  if (hs.length < 2) return;
  ctx.save();
  for (let i = 0; i < hs.length - 1; i++) {
    const a = hs[i], b = hs[i + 1];
    const ax = a.x * W, ay = a.y * H;
    const bx = b.x * W, by = b.y * H;
    const mx = (ax + bx) / 2, my = Math.min(ay, by) - 30;

    // Dashed arc line
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.quadraticCurveTo(mx, my, bx, by);
    ctx.strokeStyle = view.color + '30';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);
    ctx.globalAlpha = alpha * 0.7;
    ctx.stroke();
    ctx.setLineDash([]);

    // Animated dot travelling arc
    const t = ((ts * 0.0005 + i * 0.20) % 1);
    const dotX = (1-t)*(1-t)*ax + 2*(1-t)*t*mx + t*t*bx;
    const dotY = (1-t)*(1-t)*ay + 2*(1-t)*t*my + t*t*by;

    ctx.beginPath();
    ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
    ctx.fillStyle = view.color;
    ctx.globalAlpha = alpha;
    ctx.shadowBlur = 10;
    ctx.shadowColor = view.color;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
  ctx.restore();
}

// ─── HOTSPOT DOTS + LABELS ──────────────────────────────────────────
function drawHotspots(ctx, W, H, view, ts, alpha) {
  ctx.save();
  view.hotspots.forEach((h, i) => {
    const x = h.x * W;
    const y = h.y * H;
    const pulse = 0.5 + 0.5 * Math.sin(ts * 0.0018 + i * 1.3);

    // Outer glow ring
    ctx.beginPath();
    ctx.arc(x, y, 10 + pulse * 8, 0, Math.PI * 2);
    ctx.strokeStyle = h.color;
    ctx.lineWidth = 1;
    ctx.globalAlpha = alpha * (0.12 + pulse * 0.18);
    ctx.stroke();

    // Mid ring
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.strokeStyle = h.color;
    ctx.lineWidth = 1;
    ctx.globalAlpha = alpha * 0.4;
    ctx.stroke();

    // Core dot
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = h.color;
    ctx.globalAlpha = alpha;
    ctx.shadowBlur = 16;
    ctx.shadowColor = h.color;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Label text — positioned to avoid going off edge
    ctx.globalAlpha = alpha * (0.7 + pulse * 0.3);
    ctx.font = '600 10px system-ui, sans-serif';
    ctx.fillStyle = '#ffffff';

    // measure text to decide offset direction
    const labelX = x + (x > W * 0.8 ? -(ctx.measureText(h.label).width + 14) : 14);
    const labelY = y + (y > H * 0.8 ? -8 : 4);

    // Background pill for readability
    const tw = ctx.measureText(h.label).width;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.globalAlpha = alpha * 0.7;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(labelX - 4, labelY - 11, tw + 8, 16, 4)
                  : ctx.rect(labelX - 4, labelY - 11, tw + 8, 16);
    ctx.fill();

    ctx.fillStyle = h.color;
    ctx.globalAlpha = alpha;
    ctx.fillText(h.label, labelX, labelY);
  });
  ctx.restore();
}

// ─── WIDGET UPDATER ─────────────────────────────────────────────────
function updateWidgets(viewKey) {
  const view = VIEWS[viewKey];
  const widgets = document.querySelectorAll('.dash-widget');
  const chartRows = CHART_DATA[viewKey] || CHART_DATA.satellite;

  widgets.forEach((w, i) => {
    const data = view.widgets[i];
    if (!data) return;

    // Fade out
    w.style.transition = 'opacity 0.18s ease';
    w.style.opacity = '0';

    setTimeout(() => {
      const labelEl = w.querySelector('.dw-label');
      const valueEl = w.querySelector('.dw-value');
      const chartEl = w.querySelector('canvas');

      if (labelEl) labelEl.textContent = data.label;
      if (valueEl) {
        valueEl.textContent = data.value;
        valueEl.style.color = data.color;
      }
      if (chartEl) drawWidgetChart(chartEl, chartRows[i] || chartRows[0], data.color);

      // Fade in
      w.style.opacity = '1';
    }, 100 + i * 70);
  });
}

function drawWidgetChart(canvas, data, color) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  if (!W || !H) return;

  const minV = Math.min(...data), maxV = Math.max(...data);
  const range = maxV - minV || 1;
  const pad = 3;

  const pts = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * (W - pad * 2),
    y: H - pad - ((v - minV) / range) * (H - pad * 2)
  }));

  ctx.clearRect(0, 0, W, H);

  // Gradient fill
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, color + '44');
  grad.addColorStop(1, 'transparent');
  ctx.beginPath();
  pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
  ctx.lineTo(pts[pts.length-1].x, H);
  ctx.lineTo(pts[0].x, H);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.8;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // End dot
  const lp = pts[pts.length - 1];
  ctx.beginPath();
  ctx.arc(lp.x, lp.y, 3, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.shadowBlur = 8;
  ctx.shadowColor = color;
  ctx.fill();
  ctx.shadowBlur = 0;
}

// ─── BOOT ────────────────────────────────────────────────────────────
// Run when DOM is ready — works whether script loads before or after DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDashboard);
} else {
  // DOM already ready
  initDashboard();
}
