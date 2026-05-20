import { useEffect, useRef } from 'react';


export default function GridBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const isTouch = window.matchMedia('(hover: none)').matches;

    const SPACING = isTouch ? 50 : 32;
    const CURSOR_RADIUS = 200;     // px — how far the cursor glow reaches
    const RIPPLE_SPEED = 350;      // px/sec — how fast ripples expand
    const RIPPLE_LIFE = 2.8;       // seconds — how long ripples last
    const RIPPLE_THICKNESS = 50;   // px — ring thickness
    const RIPPLE_PUSH = 25;        // px — how far dots get pushed outward
    const MAX_RIPPLES = 6;
    const REST_ALPHA = 0.05;       // base dot opacity (very low = readable text)
    const COLOR_REST = [240, 239, 237];   // cream
    const COLOR_ACTIVE = [255, 94, 58];   // coral

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationId = 0;
    let ripples = [];

    const mouse = {
      x: -9999, y: -9999,
      smoothX: -9999, smoothY: -9999,
    };

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    function onMouseMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function onPointerDown(e) {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        start: performance.now(),
      });
      if (ripples.length > MAX_RIPPLES) ripples.shift();
    }

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      mouse.smoothX += (mouse.x - mouse.smoothX) * 0.1;
      mouse.smoothY += (mouse.y - mouse.smoothY) * 0.1;

      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      const now = performance.now();
      ripples = ripples.filter(r => (now - r.start) / 1000 < RIPPLE_LIFE);

      const cx = width / 2;
      const cy = height / 2;
      const maxDistFromCenter = Math.sqrt(cx * cx + cy * cy);

      // ---- Loop through every dot in the grid ----
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          let x = col * SPACING;
          let y = row * SPACING;

          let cursorAmount = 0;
          if (!isTouch) {
            const dx = x - mouse.smoothX;
            const dy = y - mouse.smoothY;
            const distMouse = Math.sqrt(dx * dx + dy * dy);
            cursorAmount = Math.max(0, 1 - distMouse / CURSOR_RADIUS);
          }

          let warpX = 0;
          let warpY = 0;
          let rippleAmount = 0;

          for (const r of ripples) {
            const age = (now - r.start) / 1000;
            const rdx = x - r.x;
            const rdy = y - r.y;
            const rd = Math.sqrt(rdx * rdx + rdy * rdy);

            const radius = age * RIPPLE_SPEED;

            const offset = (rd - radius) / RIPPLE_THICKNESS;
            const ring = Math.exp(-(offset * offset));

            const fade = 1 - age / RIPPLE_LIFE;

            const intensity = ring * fade;
            rippleAmount += intensity;

            if (rd > 0.5) {
              warpX += (rdx / rd) * intensity * RIPPLE_PUSH;
              warpY += (rdy / rd) * intensity * RIPPLE_PUSH;
            }
          }

          rippleAmount = Math.min(1, rippleAmount);

          x += warpX;
          y += warpY;

          const activation = Math.max(cursorAmount, rippleAmount);

          const distFromCenter = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          const vignette = 1 - Math.min(1, distFromCenter / maxDistFromCenter);

          const t = activation * 0.9;
          const r = lerp(COLOR_REST[0], COLOR_ACTIVE[0], t) | 0;
          const g = lerp(COLOR_REST[1], COLOR_ACTIVE[1], t) | 0;
          const b = lerp(COLOR_REST[2], COLOR_ACTIVE[2], t) | 0;

          const alpha = (REST_ALPHA + activation * 0.75) * (0.4 + vignette * 0.6);
          const size = 1 + activation * 1.5;

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('pointerdown', onPointerDown);
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}