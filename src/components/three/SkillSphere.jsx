import { useEffect, useRef } from 'react';
import { skills } from '../../data/skills';

export default function SkillSphere({ activeFilter = 'All' }) {
  const globeRef = useRef(null);
  const nodesRef = useRef([]);
  const rot = useRef({ x: 0.25, y: 0, velX: 0, velY: 0, dragging: false, lastX: 0, lastY: 0 });

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    const R = 230;

    nodesRef.current = skills.map((s, i) => {
      const phi   = Math.acos(1 - (2 * (i + 0.5)) / skills.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const x = R * Math.sin(phi) * Math.cos(theta);
      const y = R * Math.sin(phi) * Math.sin(theta);
      const z = R * Math.cos(phi);

      const wrap = document.createElement('div');
      wrap.style.cssText = `
        position:absolute;top:50%;left:50%;
        pointer-events:none;
        width:max-content;height:max-content;
        transform:translate(-50%,-50%) translate3d(${x}px,${y}px,${z}px) scale(1);
        transform-style:preserve-3d;
      `;

      const front = document.createElement('div');
      front.style.cssText = `position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;`;

      const icon = document.createElement('i');
      icon.className = `${s.icon} colored`;
      icon.setAttribute('aria-hidden', 'true');
      icon.style.cssText = 'display:block;line-height:1;backface-visibility:hidden;transform-style:preserve-3d;';

      const label = document.createElement('span');
      label.textContent = s.skill;
      label.style.cssText = `
        font-size:12px;font-weight:600;white-space:nowrap;position:relative;
        background:rgba(255,255,255,0.85);
        border:0.5px solid rgba(0,0,0,0.1);
        border-radius:4px;padding:1px 6px;
        color:#555;backdrop-filter:blur(4px);backface-visibility:hidden;transform-style:preserve-3d;
      `;

      const backIcon = icon.cloneNode(true);
      backIcon.style.cssText += 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotateY(180deg);backface-visibility:hidden;';
      const backLabel = label.cloneNode(true);
      backLabel.style.cssText += 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotateY(180deg);backface-visibility:hidden;';

      front.append(icon, label);
      wrap.append(front, backIcon, backLabel);
      globe.appendChild(wrap);
      return { wrap, icon, label, x, y, z, categories: s.categories };
    });

    return () => {
      nodesRef.current.forEach(n => n.wrap.remove());
      nodesRef.current = [];
    };
  }, []);

  useEffect(() => {
    const scene = globeRef.current?.parentElement;
    if (!scene) return;
    const r = rot.current;

    const onDown = e => {
      r.dragging = true;
      r.lastX = e.clientX;
      r.lastY = e.clientY;
      r.velX = r.velY = 0;
      scene.setPointerCapture(e.pointerId);
    };
    const onMove = e => {
      if (!r.dragging) return;
      r.velY = (e.clientX - r.lastX) * 0.013;
      r.velX = (e.clientY - r.lastY) * 0.013;
      r.x += r.velX;
      r.y += r.velY;
      r.lastX = e.clientX;
      r.lastY = e.clientY;
    };
    const onUp = () => { r.dragging = false; };

    scene.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    return () => {
      scene.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    const R = 230;
    const r = rot.current;
    let raf;

    const loop = () => {
      if (!r.dragging) {
        r.velX *= 0.92;
        r.velY *= 0.92;
        r.y += r.velY + 0.003;
        r.x += r.velX;
        r.x = Math.max(-0.55, Math.min(0.55, r.x));
      }

      globe.style.transform = `rotateX(${r.x}rad) rotateY(${r.y}rad)`;

      const sinX = Math.sin(r.x), cosX = Math.cos(r.x);
      const sinY = Math.sin(r.y), cosY = Math.cos(r.y);

      nodesRef.current.forEach(n => {
        const wz = -n.x * cosX * sinY + n.y * (-sinX) + n.z * cosX * cosY;
        const depth = (wz + R) / (2 * R); // 0 (back) → 1 (front)

        const matches = activeFilter === 'All' || n.categories.includes(activeFilter);

        const opacity = matches ? (0.15 + 0.85 * depth) : 0.07;
        const scale = matches ? (0.8 + 1.0 * depth) : 0.6;

        n.wrap.style.opacity = opacity.toFixed(3);
        n.wrap.style.transform = `translate(-50%,-50%) translate3d(${n.x}px,${n.y}px,${n.z}px) scale(${scale.toFixed(3)})`;
        n.icon.style.fontSize = (22 + depth * 28).toFixed(1) + 'px';
        if (n.label) n.label.style.fontSize = (12 + depth * 8).toFixed(1) + 'px';
        n.wrap.style.zIndex = Math.round(depth * 100);
      });

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [activeFilter]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        perspective: '900px',
        cursor: 'grab',
        userSelect: 'none',
        touchAction: 'none',
      }}
    >
      <div
        ref={globeRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      />
    </div>
  );
}