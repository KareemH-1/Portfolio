import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const textureCache = new Map();

function getAccentColor() {
  if (typeof window === 'undefined') return '#d97757';
  const val = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-accent')
    .trim();
  return val || '#d97757';
}

function loadIconTexture(iconName, accentHex) {
  const cacheKey = iconName;
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey);

  const promise = new Promise((resolve) => {
    const SIZE = 160;
    const urls = [
      `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`,
      `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-plain.svg`,
      `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original-wordmark.svg`,
    ];
    let idx = 0;

    const tryNext = () => {
      if (idx >= urls.length) {
        resolve(null);
        return;
      }
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = SIZE;
        canvas.height = SIZE;
        const ctx = canvas.getContext('2d');

        // Icon, centered with padding
        const pad = SIZE * 0.22;
        ctx.drawImage(img, pad, pad, SIZE - pad * 2, SIZE - pad * 2);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        resolve(texture);
      };
      img.onerror = () => {
        idx++;
        tryNext();
      };
      img.src = urls[idx];
    };
    tryNext();
  });

  textureCache.set(cacheKey, promise);
  return promise;
}

function hexToRgba(hex, alpha) {
  const h = hex.replace('#', '');
  const bigint = parseInt(
    h.length === 3
      ? h.split('').map((c) => c + c).join('')
      : h,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function SkillSphere({ skills, activeFilter = 'All' }) {
  const containerRef = useRef(null);
  const stateRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    const accentHex = getAccentColor();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    const RADIUS = 2.5;
    const sprites = [];

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

      const material = new THREE.SpriteMaterial({
        transparent: true,
        opacity: 0.9,
        depthTest: false,
      });

      const sprite = new THREE.Sprite(material);
      sprite.position.set(x, y, z);

      const baseScale = 0.6 + (skill.experience / 100) * 0.6;
      sprite.scale.set(baseScale, baseScale, 1);

      sprite.userData = {
        skill,
        baseScale,
        currentScale: baseScale,
        currentOpacity: 0.9,
        targetScale: baseScale,
        targetOpacity: 0.9,
      };

      sphereGroup.add(sprite);
      sprites.push(sprite);

      loadIconTexture(iconName, accentHex).then((texture) => {
        if (disposed || !texture) return;
        material.map = texture;
        material.needsUpdate = true;
      });
    });

    const rotation = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let lastMoveTime = 0;
    let idleTime = 0;

    function onPointerDown(e) {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      lastMoveTime = performance.now();
      velocity.x = 0;
      velocity.y = 0;
      idleTime = 0;
      container.style.cursor = 'grabbing';
    }
    function onPointerMove(e) {
      if (!isDragging) return;
      const now = performance.now();
      const dt = Math.max(now - lastMoveTime, 1);
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;

      target.y += dx * 0.005;
      target.x += dy * 0.005;

      velocity.y = (dx * 0.005) / (dt / 16.7);
      velocity.x = (dy * 0.005) / (dt / 16.7);

      lastX = e.clientX;
      lastY = e.clientY;
      lastMoveTime = now;
    }
    function onPointerUp() {
      isDragging = false;
      container.style.cursor = 'grab';
    }

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    container.style.cursor = 'grab';

    function resize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) {
        requestAnimationFrame(resize);
        return;
      }
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let isVisible = true;
    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(container);

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

      if (!isDragging) {
        idleTime += delta;
        if (idleTime > 0.3) target.y += 0.12 * delta;

        target.x += velocity.x;
        target.y += velocity.y;
        velocity.x *= 0.92;
        velocity.y *= 0.92;
      } else {
        idleTime = 0;
      }

      rotation.x += (target.x - rotation.x) * 0.08;
      rotation.y += (target.y - rotation.y) * 0.08;
      sphereGroup.rotation.x = rotation.x;
      sphereGroup.rotation.y = rotation.y;

      for (let i = 0; i < sprites.length; i++) {
        const sprite = sprites[i];
        const ud = sprite.userData;

        ud.currentScale += (ud.targetScale - ud.currentScale) * 0.15;
        ud.currentOpacity += (ud.targetOpacity - ud.currentOpacity) * 0.15;

        const localZ =
          sprite.position.x * Math.sin(rotation.y) +
          sprite.position.z * Math.cos(rotation.y);
        const depthFade = THREE.MathUtils.mapLinear(
          THREE.MathUtils.clamp(localZ, -RADIUS, RADIUS),
          -RADIUS, RADIUS,
          0.3, 1.0
        );

        sprite.scale.set(ud.currentScale, ud.currentScale, 1);
        sprite.material.opacity = ud.currentOpacity * depthFade;
      }

      renderer.render(scene, camera);
    }
    frameId = requestAnimationFrame(animate);

    stateRef.current = { sprites };

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      ro.disconnect();
      io.disconnect();
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      sprites.forEach((s) => {
        s.material.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      stateRef.current = null;
    };
  }, []);

  useEffect(() => {
    const state = stateRef.current;
    if (!state) return;

    state.sprites.forEach((sprite) => {
      const skill = sprite.userData.skill;
      const matches = activeFilter === 'All' || skill.categories.includes(activeFilter);

      if (matches) {
        sprite.userData.targetScale = sprite.userData.baseScale * 1.1;
        sprite.userData.targetOpacity = 1.0;
      } else {
        sprite.userData.targetScale = sprite.userData.baseScale * 0.8;
        sprite.userData.targetOpacity = 0.2;
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