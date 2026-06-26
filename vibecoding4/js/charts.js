'use strict';

// Polyfill roundRect for older browsers
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    this.beginPath();
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.arcTo(x + w, y, x + w, y + r, r);
    this.lineTo(x + w, y + h - r);
    this.arcTo(x + w, y + h, x + w - r, y + h, r);
    this.lineTo(x + r, y + h);
    this.arcTo(x, y + h, x, y + h - r, r);
    this.lineTo(x, y + r);
    this.arcTo(x, y, x + r, y, r);
    this.closePath();
    return this;
  };
}

// Mini line chart renderer
function drawMiniChart(canvas, data, color = '#4ade80', fill = true) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const max = Math.max(...data) * 1.1;
  const min = Math.min(...data) * 0.9;
  const range = max - min || 1;
  const pad = 2;

  ctx.clearRect(0, 0, w, h);

  const pts = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * (w - pad * 2),
    y: h - pad - ((v - min) / range) * (h - pad * 2)
  }));

  if (fill) {
    ctx.beginPath();
    pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.lineTo(pts[pts.length - 1].x, h);
    ctx.lineTo(pts[0].x, h);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, color + '55');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fill();
  }

  ctx.beginPath();
  pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.8;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // Last point dot
  const last = pts[pts.length - 1];
  ctx.beginPath();
  ctx.arc(last.x, last.y, 3, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.shadowBlur = 6;
  ctx.shadowColor = color;
  ctx.fill();
  ctx.shadowBlur = 0;
}

// Dashboard chart renderer - animated bar chart
function drawBarChart(canvas, data, color = '#4ade80', animated = true) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const max = Math.max(...data) * 1.15;
  const barW = (w / data.length) * 0.6;
  const gap = (w / data.length) * 0.4;
  let progress = 0;

  function draw(prog) {
    ctx.clearRect(0, 0, w, h);
    data.forEach((v, i) => {
      const barH = ((v / max) * (h - 4)) * prog;
      const x = i * (w / data.length) + gap / 2;
      const y = h - barH;

      const grad = ctx.createLinearGradient(0, y, 0, h);
      grad.addColorStop(0, color);
      grad.addColorStop(1, color + '33');

      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, 2);
      ctx.fillStyle = grad;
      ctx.fill();
    });
  }

  if (animated) {
    const start = performance.now();
    function step(ts) {
      progress = Math.min((ts - start) / 1200, 1);
      draw(progress);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  } else {
    draw(1);
  }
}

// Dashboard charts are now handled by dashboard.js
// Float card sparklines only
setTimeout(() => {
  const data1 = [10, 12, 11, 14, 13, 16, 15, 17, 18, 20, 19, 22, 21, 24, 22];
  const data2 = [100, 120, 115, 130, 128, 145, 140, 155, 150, 168, 160, 175, 170, 185, 180];
  const data3 = [800, 820, 840, 830, 860, 850, 880, 870, 900, 890, 920, 910, 950, 940, 970];

  document.querySelectorAll('.fc-chart').forEach((c, i) => {
    const datasets = [data1, data2, data3];
    drawMiniChart(c, datasets[i % 3]);
  });
}, 500);
