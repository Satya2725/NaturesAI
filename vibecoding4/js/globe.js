'use strict';

const globe = document.getElementById('globeCanvas');
if (!globe) throw new Error('No globe canvas');
const gc = globe.getContext('2d');

const W = globe.width, H = globe.height;
const CX = W / 2, CY = H / 2;
const RADIUS = W * 0.42;
let rotAngle = 0;
let ts = 0;

// AI network nodes on globe surface
const globeNodes = [
  { lat: 40, lon: -74 },   // New York
  { lat: 51, lon: 0 },     // London
  { lat: 35, lon: 139 },   // Tokyo
  { lat: -23, lon: -43 },  // São Paulo
  { lat: -34, lon: 18 },   // Cape Town
  { lat: 28, lon: 77 },    // Delhi
  { lat: 55, lon: 37 },    // Moscow
  { lat: -33, lon: 151 },  // Sydney
  { lat: 1, lon: 103 },    // Singapore
  { lat: 48, lon: 2 },     // Paris
  { lat: 60, lon: 25 },    // Helsinki
  { lat: -13, lon: -72 },  // Peru
  { lat: 0, lon: 20 },     // Congo
  { lat: 64, lon: -145 },  // Alaska
];

const globeConnections = [
  [0,1],[1,2],[2,8],[8,3],[3,4],[4,6],[6,10],[0,9],[9,1],[5,8],[5,4],[7,8],[12,4],[11,3],[13,0]
];

function latLonTo3D(lat, lon, r) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (lon + rotAngle) * Math.PI / 180;
  return {
    x: r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.cos(phi),
    z: r * Math.sin(phi) * Math.sin(theta)
  };
}

function projectTo2D(p3) {
  const scale = (RADIUS * 1.2) / (RADIUS * 1.2 + p3.z * 0.6 + RADIUS * 0.5);
  return {
    x: CX + p3.x * scale,
    y: CY - p3.y * scale,
    visible: p3.z > -RADIUS * 0.3
  };
}

function drawGlobe(time) {
  ts = time;
  rotAngle = (time * 0.012) % 360;
  gc.clearRect(0, 0, W, H);

  // Earth base sphere
  const earthGrad = gc.createRadialGradient(CX - 40, CY - 40, 0, CX, CY, RADIUS);
  earthGrad.addColorStop(0, '#0d4a2a');
  earthGrad.addColorStop(0.3, '#083d22');
  earthGrad.addColorStop(0.6, '#052e16');
  earthGrad.addColorStop(0.85, '#031a0e');
  earthGrad.addColorStop(1, '#010a05');

  gc.beginPath();
  gc.arc(CX, CY, RADIUS, 0, Math.PI * 2);
  gc.fillStyle = earthGrad;
  gc.fill();

  // Atmosphere glow
  const atmGrad = gc.createRadialGradient(CX, CY, RADIUS * 0.88, CX, CY, RADIUS * 1.12);
  atmGrad.addColorStop(0, 'rgba(74,222,128,0)');
  atmGrad.addColorStop(0.5, 'rgba(74,222,128,0.08)');
  atmGrad.addColorStop(1, 'rgba(74,222,128,0)');

  gc.beginPath();
  gc.arc(CX, CY, RADIUS * 1.1, 0, Math.PI * 2);
  gc.fillStyle = atmGrad;
  gc.fill();

  // Draw continent-like landmass patches
  drawContinents(time);

  // Grid lines
  drawGrid();

  // Draw connections
  drawConnections(time);

  // Draw nodes
  drawNodes(time);

  // Specular highlight
  const specGrad = gc.createRadialGradient(CX - RADIUS * 0.3, CY - RADIUS * 0.35, 0, CX, CY, RADIUS);
  specGrad.addColorStop(0, 'rgba(255,255,255,0.12)');
  specGrad.addColorStop(0.4, 'rgba(255,255,255,0.02)');
  specGrad.addColorStop(1, 'transparent');
  gc.beginPath();
  gc.arc(CX, CY, RADIUS, 0, Math.PI * 2);
  gc.fillStyle = specGrad;
  gc.fill();

  // Clip to circle
  gc.save();
  gc.beginPath();
  gc.arc(CX, CY, RADIUS, 0, Math.PI * 2);
  gc.clip();
  gc.restore();

  requestAnimationFrame(drawGlobe);
}

function drawGrid() {
  gc.save();
  gc.beginPath();
  gc.arc(CX, CY, RADIUS, 0, Math.PI * 2);
  gc.clip();

  gc.strokeStyle = 'rgba(74,222,128,0.06)';
  gc.lineWidth = 0.5;

  // Latitude lines
  for (let lat = -75; lat <= 75; lat += 15) {
    gc.beginPath();
    let first = true;
    for (let lon = -180; lon <= 180; lon += 5) {
      const p = latLonTo3D(lat, lon, RADIUS);
      const s = projectTo2D(p);
      if (s.visible) {
        if (first) { gc.moveTo(s.x, s.y); first = false; }
        else gc.lineTo(s.x, s.y);
      } else {
        first = true;
      }
    }
    gc.stroke();
  }

  // Longitude lines
  for (let lon = -180; lon <= 180; lon += 20) {
    gc.beginPath();
    let first = true;
    for (let lat = -90; lat <= 90; lat += 5) {
      const p = latLonTo3D(lat, lon, RADIUS);
      const s = projectTo2D(p);
      if (s.visible) {
        if (first) { gc.moveTo(s.x, s.y); first = false; }
        else gc.lineTo(s.x, s.y);
      } else {
        first = true;
      }
    }
    gc.stroke();
  }

  gc.restore();
}

function drawContinents(time) {
  gc.save();
  gc.beginPath();
  gc.arc(CX, CY, RADIUS, 0, Math.PI * 2);
  gc.clip();

  const landPatches = [
    // North America
    { lat: 45, lon: -100, w: 50, h: 35 },
    // South America
    { lat: -10, lon: -58, w: 32, h: 45 },
    // Europe
    { lat: 50, lon: 12, w: 25, h: 22 },
    // Africa
    { lat: 5, lon: 22, w: 36, h: 55 },
    // Asia
    { lat: 40, lon: 80, w: 80, h: 50 },
    // Australia
    { lat: -25, lon: 133, w: 38, h: 28 },
  ];

  landPatches.forEach(patch => {
    for (let dlat = -patch.h/2; dlat <= patch.h/2; dlat += 3) {
      for (let dlon = -patch.w/2; dlon <= patch.w/2; dlon += 3) {
        const p = latLonTo3D(patch.lat + dlat, patch.lon + dlon, RADIUS + 0.5);
        const s = projectTo2D(p);
        if (!s.visible) continue;

        const alpha = 0.15 + 0.1 * Math.sin(time * 0.0005 + dlat + dlon);
        gc.beginPath();
        gc.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
        gc.fillStyle = `rgba(34,197,94,${alpha})`;
        gc.fill();
      }
    }
  });

  gc.restore();
}

function drawConnections(time) {
  gc.save();
  gc.beginPath();
  gc.arc(CX, CY, RADIUS, 0, Math.PI * 2);
  gc.clip();

  globeConnections.forEach(([a, b], idx) => {
    const na = globeNodes[a], nb = globeNodes[b];
    const pa = latLonTo3D(na.lat, na.lon, RADIUS);
    const pb = latLonTo3D(nb.lat, nb.lon, RADIUS);
    const sa = projectTo2D(pa), sb = projectTo2D(pb);

    if (!sa.visible || !sb.visible) return;

    const progress = ((time * 0.0008 + idx * 0.15) % 1);

    // Arc
    gc.beginPath();
    gc.moveTo(sa.x, sa.y);
    const mx = (sa.x + sb.x) / 2 - (sb.y - sa.y) * 0.2;
    const my = (sa.y + sb.y) / 2 + (sb.x - sa.x) * 0.2 - 30;
    gc.quadraticCurveTo(mx, my, sb.x, sb.y);
    gc.strokeStyle = `rgba(74,222,128,0.25)`;
    gc.lineWidth = 0.8;
    gc.stroke();

    // Animated dot
    const t = progress;
    const dotX = (1-t)*(1-t)*sa.x + 2*(1-t)*t*mx + t*t*sb.x;
    const dotY = (1-t)*(1-t)*sa.y + 2*(1-t)*t*my + t*t*sb.y;

    gc.beginPath();
    gc.arc(dotX, dotY, 3, 0, Math.PI * 2);
    gc.fillStyle = 'rgba(74,222,128,0.9)';
    gc.shadowBlur = 8;
    gc.shadowColor = '#4ade80';
    gc.fill();
    gc.shadowBlur = 0;
  });

  gc.restore();
}

function drawNodes(time) {
  gc.save();
  gc.beginPath();
  gc.arc(CX, CY, RADIUS, 0, Math.PI * 2);
  gc.clip();

  globeNodes.forEach((node, idx) => {
    const p = latLonTo3D(node.lat, node.lon, RADIUS + 1);
    const s = projectTo2D(p);
    if (!s.visible) return;

    const pulse = Math.sin(time * 0.002 + idx * 0.8);

    // Outer ring
    gc.beginPath();
    gc.arc(s.x, s.y, 5 + pulse * 2, 0, Math.PI * 2);
    gc.strokeStyle = `rgba(74,222,128,${0.3 + pulse * 0.2})`;
    gc.lineWidth = 1;
    gc.stroke();

    // Core dot
    gc.beginPath();
    gc.arc(s.x, s.y, 3, 0, Math.PI * 2);
    gc.fillStyle = '#4ade80';
    gc.shadowBlur = 10;
    gc.shadowColor = '#4ade80';
    gc.fill();
    gc.shadowBlur = 0;
  });

  gc.restore();
}

requestAnimationFrame(drawGlobe);

// Mini sparkline charts for float cards
function drawSparkline(canvas, data, color = '#4ade80') {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;

  ctx.clearRect(0, 0, w, h);

  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, color + '40');
  grad.addColorStop(1, 'transparent');

  ctx.beginPath();
  data.forEach((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  const lastX = w, lastY = h - ((data[data.length-1] - min) / range) * (h-4) - 2;
  ctx.lineTo(lastX, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  data.forEach((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

// Populate float card charts
const d1 = [10,12,11,14,13,15,14,16,15,17,18,16,19,20,22];
const d2 = [100,120,115,130,128,140,135,150,145,160,155,170,165,180,185];
const d3 = [800,850,830,870,860,900,880,920,910,940,930,960,950,980,975];

document.querySelectorAll('.fc-chart').forEach((c, i) => {
  drawSparkline(c, [d1,d2,d3][i % 3]);
});
