'use strict';

const wfContainer = document.getElementById('workflowNodes');
const wfSvg = document.getElementById('workflowSvg');

if (wfContainer && wfSvg) {
  const steps = [
    { icon: '🛰️', label: 'Satellite', color: '#60a5fa' },
    { icon: '📡', label: 'NatureOS AI', color: '#4ade80' },
    { icon: '🧠', label: 'AI Analysis', color: '#a78bfa' },
    { icon: '🔮', label: 'Prediction', color: '#34d399' },
    { icon: '🚨', label: 'Alert', color: '#f87171' },
    { icon: '🚁', label: 'Drone Deploy', color: '#fbbf24' },
    { icon: '👨‍🌾', label: 'Field Officer', color: '#4ade80' },
    { icon: '🌿', label: 'Protected', color: '#22c55e' },
  ];

  // Determine layout
  function getLayout() {
    const W = wfContainer.offsetWidth || 900;
    if (W < 600) {
      // vertical
      return steps.map((s, i) => ({
        x: W / 2,
        y: 60 + i * 90,
        ...s
      }));
    }
    // Two-row layout
    const row1 = [0,1,2,3];
    const row2 = [7,6,5,4];
    const positions = new Array(8);
    row1.forEach((idx, col) => {
      positions[idx] = { x: 80 + col * 240, y: 120 };
    });
    row2.forEach((idx, col) => {
      positions[idx] = { x: 80 + col * 240, y: 360 };
    });
    return positions.map((p, i) => ({ ...p, ...steps[i] }));
  }

  let activeIdx = -1;
  let animPaths = [];

  function buildWorkflow() {
    const layout = getLayout();
    const W = parseInt(wfSvg.getAttribute('viewBox').split(' ')[2]);
    const H = parseInt(wfSvg.getAttribute('viewBox').split(' ')[3]);

    wfContainer.innerHTML = '';
    wfSvg.innerHTML = '';

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="rgba(74,222,128,0.5)"/>
      </marker>
    `;
    wfSvg.appendChild(defs);

    // Define connection order: 0→1→2→3→4 then 4 drops down to row2, 4→5→6→7→8(protected)
    const connections = [
      [0,1],[1,2],[2,3],
      [3,4],
      [4,5],[5,6],[6,7]
    ];

    animPaths = [];

    connections.forEach(([a, b]) => {
      const pa = layout[a], pb = layout[b];

      // Background path
      const bgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const d = getPathD(pa, pb);
      bgPath.setAttribute('d', d);
      bgPath.setAttribute('class', 'wf-path');
      wfSvg.appendChild(bgPath);

      // Animated path
      const animPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      animPath.setAttribute('d', d);
      animPath.setAttribute('class', 'wf-path-animated');
      animPath.setAttribute('filter', 'url(#glow)');
      wfSvg.appendChild(animPath);
      animPaths.push(animPath);

      // Moving dot
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('r', '5');
      dot.setAttribute('class', 'wf-dot');
      wfSvg.appendChild(dot);
      animPaths.push({ dot, pathEl: animPath, bgPath });
    });

    // Build node elements
    layout.forEach((pos, i) => {
      const node = document.createElement('div');
      node.className = 'wf-node';
      node.style.left = pos.x + 'px';
      node.style.top = pos.y + 'px';
      node.innerHTML = `
        <div class="wf-node-circle" style="border-color:${pos.color}40">${pos.icon}</div>
        <div class="wf-node-label">${pos.label}</div>
      `;
      node.dataset.idx = i;
      wfContainer.appendChild(node);
    });
  }

  function getPathD(a, b) {
    // Curved path between two points
    const dx = b.x - a.x, dy = b.y - a.y;
    if (Math.abs(dy) > 50 && Math.abs(dx) < 50) {
      // Vertical connection with slight curve
      const mx = a.x + dx * 0.5 + 60;
      const my = a.y + dy * 0.5;
      return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
    }
    const cpx = a.x + dx * 0.5;
    const cpy = a.y;
    const cp2x = a.x + dx * 0.5;
    const cp2y = b.y;
    return `M ${a.x} ${a.y} C ${cpx} ${cpy} ${cp2x} ${cp2y} ${b.x} ${b.y}`;
  }

  // Animate the workflow step by step
  function animateWorkflowPaths() {
    let pathIdx = 0;
    const paths = wfSvg.querySelectorAll('.wf-path-animated');
    const dots = wfSvg.querySelectorAll('.wf-dot');

    function animateNextPath() {
      if (pathIdx >= paths.length) {
        // Reset after 2s
        setTimeout(() => {
          paths.forEach(p => {
            p.style.strokeDashoffset = '200';
            p.style.animation = 'none';
          });
          activeIdx = -1;
          document.querySelectorAll('.wf-node').forEach(n => n.classList.remove('active'));
          pathIdx = 0;
          setTimeout(animateNextPath, 500);
        }, 2000);
        return;
      }

      const path = paths[pathIdx];
      const len = path.getTotalLength ? path.getTotalLength() : 200;
      path.style.strokeDasharray = len;
      path.style.strokeDashoffset = len;
      path.style.transition = `stroke-dashoffset 0.6s ease ${pathIdx * 0.05}s`;

      // Activate source node
      const srcIdx = pathIdx;
      activeIdx = srcIdx;
      document.querySelectorAll('.wf-node').forEach((n, i) => {
        n.classList.toggle('active', i <= srcIdx + 1);
      });

      setTimeout(() => {
        path.style.strokeDashoffset = '0';
      }, 50);

      pathIdx++;
      setTimeout(animateNextPath, 700);
    }

    animateNextPath();
  }

  buildWorkflow();

  const wfObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setTimeout(animateWorkflowPaths, 400);
      wfObserver.unobserve(entries[0].target);
    }
  }, { threshold: 0.3 });

  const wfSection = document.getElementById('workflow');
  if (wfSection) wfObserver.observe(wfSection);

  window.addEventListener('resize', () => {
    setTimeout(buildWorkflow, 200);
  });
}
