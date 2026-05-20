import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Lightweight floating sphere of skill icons.
 *
 * Performance choices:
 *  - All icons always rendered, never hidden (filtering = highlight/dim only)
 *  - antialias: false  (sprites are small, AA invisible, big perf win)
 *  - pixelRatio: 1     (don't render 2x on retina — sphere is small enough)
 *  - 30fps cap         (60fps for sphere icons is overkill)
 *  - Pauses when off-screen via IntersectionObserver
 *  - No per-frame raycaster
 */
export default function SkillSphere({ skills, activeFilter = 'All' }) {
  const containerRef = useRef(null);
  const stateRef = useRef(null);

  const createFallbackTexture = (skill) => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext('2d');
    if (!context) return null;

    const label = skill.skill
      .replace(/[^A-Za-z0-9#+]+/g, ' ')
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join('')
      .slice(0, 3)
      .toUpperCase() || 'SK';

    context.clearRect(0, 0, size, size);
    context.fillStyle = '#101114';
    context.beginPath();
    context.roundRect(20, 20, size - 40, size - 40, 48);
    context.fill();

    context.lineWidth = 8;
    context.strokeStyle = 'rgba(255, 255, 255, 0.14)';
    context.stroke();

    context.fillStyle = '#f27f65';
    context.font = '700 64px Inter, Arial, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(label, size / 2, size / 2 - 14);

    context.fillStyle = 'rgba(255, 255, 255, 0.82)';
    context.font = '500 20px Inter, Arial, sans-serif';
    context.fillText(skill.skill, size / 2, size / 2 + 42);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  };

  // ---------- Setup (runs ONCE) ----------
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(1);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    const RADIUS = 3;
    const sprites = [];
    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = 'anonymous';

    skills.forEach((skill, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / skills.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = RADIUS * Math.sin(phi) * Math.cos(theta);
      const y = RADIUS * Math.sin(phi) * Math.sin(theta);
      const z = RADIUS * Math.cos(phi);

      const iconName = skill.icon
        .replace('devicon-', '')
        .replace('-plain', '')
        .replace('-original', '');

      const urls = [
        `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`,
        `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-plain.svg`,
      ];

      const material = new THREE.SpriteMaterial({
        transparent: true,
        opacity: 0.9,
        depthTest: false,
      });

      const fallbackTexture = createFallbackTexture(skill);
      if (fallbackTexture) {
        material.map = fallbackTexture;
      }

      const sprite = new THREE.Sprite(material);
      sprite.position.set(x, y, z);

      const baseScale = 0.55 + (skill.experience / 100) * 0.55;
      sprite.scale.set(baseScale, baseScale, 1);

      sprite.userData = {
        skill,
        baseScale,
        currentScale: baseScale,
        currentOpacity: 0.9,
        targetScale: baseScale,
        targetOpacity: 0.9,
      };

      let urlIndex = 0;
      const tryLoad = () => {
        if (urlIndex >= urls.length) return;
        textureLoader.load(
          urls[urlIndex],
          (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            material.map = tex;
            material.needsUpdate = true;
          },
          undefined,
          () => {
            urlIndex++;
            tryLoad();
          }
        );
      };
      tryLoad();

      sphereGroup.add(sprite);
      sprites.push(sprite);
    });

    // ---------- Drag interaction ----------
    const rotation = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let idleTime = 0;

    function onPointerDown(e) {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      idleTime = 0;
      container.style.cursor = 'grabbing';
    }
    function onPointerMove(e) {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      target.y += dx * 0.005;
      target.x += dy * 0.005;
      lastX = e.clientX;
      lastY = e.clientY;
    }
    function onPointerUp() {
      isDragging = false;
      container.style.cursor = 'grab';
    }

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    container.style.cursor = 'grab';

    // ---------- Resize ----------
    function resize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // ---------- Visibility (pause when off-screen) ----------
    let isVisible = true;
    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(container);

    // ---------- Animation loop (30fps cap, paused when off-screen) ----------
    let frameId;
    let lastFrame = 0;
    const TARGET_FPS = 30;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;

    function animate(now) {
      frameId = requestAnimationFrame(animate);

      if (now - lastFrame < FRAME_INTERVAL) return;
      if (!isVisible) return;

      const delta = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;

      // Auto-rotate after idle delay
      if (!isDragging) {
        idleTime += delta;
        if (idleTime > 0.3) target.y += 0.12 * delta;
      } else {
        idleTime = 0;
      }

      // Smooth rotation
      rotation.x += (target.x - rotation.x) * 0.08;
      rotation.y += (target.y - rotation.y) * 0.08;
      sphereGroup.rotation.x = rotation.x;
      sphereGroup.rotation.y = rotation.y;

      // Per-sprite: lerp toward targets, apply depth fade
      for (let i = 0; i < sprites.length; i++) {
        const sprite = sprites[i];
        const ud = sprite.userData;

        ud.currentScale += (ud.targetScale - ud.currentScale) * 0.15;
        ud.currentOpacity += (ud.targetOpacity - ud.currentOpacity) * 0.15;

        // Depth fade — back-of-sphere icons appear lighter (3D feel)
        // Cheap approximation: use sprite's local Z after rotation
        const localZ =
          sprite.position.x * Math.sin(rotation.y) +
          sprite.position.z * Math.cos(rotation.y);
        const depthFade = THREE.MathUtils.mapLinear(
          THREE.MathUtils.clamp(localZ, -RADIUS, RADIUS),
          -RADIUS, RADIUS,
          0.25, 1.0
        );

        sprite.scale.set(ud.currentScale, ud.currentScale, 1);
        sprite.material.opacity = ud.currentOpacity * depthFade;
      }

      renderer.render(scene, camera);
    }
    frameId = requestAnimationFrame(animate);

    stateRef.current = { sprites };

    // ---------- Cleanup ----------
    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
      io.disconnect();
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      sprites.forEach((s) => {
        s.material.map?.dispose();
        s.material.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      stateRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // setup runs once

  // ---------- Filter: HIGHLIGHT matching, DIM the rest (never hide) ----------
  useEffect(() => {
    const state = stateRef.current;
    if (!state) return;

    state.sprites.forEach((sprite) => {
      const skill = sprite.userData.skill;
      const matches = activeFilter === 'All' || skill.categories.includes(activeFilter);

      if (matches) {
        // Active — full size + a tiny grow for emphasis
        sprite.userData.targetScale = sprite.userData.baseScale * 1.08;
        sprite.userData.targetOpacity = 1.0;
      } else {
        // Inactive — full size, dimmed
        sprite.userData.targetScale = sprite.userData.baseScale * 0.85;
        sprite.userData.targetOpacity = 0.22;
      }
    });
  }, [activeFilter]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none"
      data-cursor-hover
    />
  );
}