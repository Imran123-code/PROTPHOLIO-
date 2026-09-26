import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeHeroScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // ─── Scene Setup ───────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6.8;

    // Lower pixel ratio on mobile for 60 FPS
    const dpr = isMobile ? Math.min(window.devicePixelRatio, 1) : Math.min(window.devicePixelRatio, 1.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile, // Skip antialiasing on mobile for perf
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);
    container.appendChild(renderer.domElement);

    // ─── Objects ───────────────────────────────────────────────────────────────
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Holographic Icosahedron Wireframe Core
    const coreGeo = new THREE.IcosahedronGeometry(1.5, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      wireframe: true,
      emissive: 0x0055ff,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // 2. Inner Glowing Energy Core
    const innerGeo = new THREE.OctahedronGeometry(0.85, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x7c3aed,
      emissiveIntensity: 1.1,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.85,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // 3. Dual Holographic Orbiting Rings
    const ring1Geo = new THREE.TorusGeometry(2.2, 0.02, 8, 48);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.6 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.5, 0.02, 8, 48);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.5 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    mainGroup.add(ring2);

    // 4. Orbiting Data Node Particles — fewer on mobile
    const particleCount = isMobile ? 60 : 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const color1 = new THREE.Color(0x00f2fe);
    const color2 = new THREE.Color(0x818cf8);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.9 + Math.random() * 1.3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      particlePos[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
      particlePos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePos[i * 3 + 2] = radius * Math.cos(phi);
      const mixed = color1.clone().lerp(color2, Math.random());
      particleColors[i * 3]     = mixed.r;
      particleColors[i * 3 + 1] = mixed.g;
      particleColors[i * 3 + 2] = mixed.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // 5. Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const pointLight1 = new THREE.PointLight(0x00f2fe, 2.5, 30);
    pointLight1.position.set(4, 3, 5);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0x8b5cf6, 2, 30);
    pointLight2.position.set(-4, -3, 3);
    scene.add(pointLight2);

    // ─── Smooth Mouse Tracking ─────────────────────────────────────────────────
    let targetRotX = 0, targetRotY = 0;
    let currentRotX = 0, currentRotY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      targetRotY = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetRotX = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY *= 0.6;
      targetRotX *= 0.6;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ─── Visibility-aware Animation Loop ─────────────────────────────────────
    let animationFrameId = null;
    let isVisible = true;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        coreMesh.rotation.y = t * 0.25;
        coreMesh.rotation.x = t * 0.15;
        innerMesh.rotation.y = -t * 0.35;
        innerMesh.rotation.z = t * 0.25;
        ring1.rotation.z = t * 0.25;
        ring2.rotation.z = -t * 0.2;
        particles.rotation.y = t * 0.08;

        // Smooth mouse inertia (lerp)
        currentRotX += (targetRotX - currentRotX) * 0.05;
        currentRotY += (targetRotY - currentRotY) * 0.05;
        mainGroup.rotation.x = currentRotX + Math.sin(t * 0.5) * 0.04;
        mainGroup.rotation.y = currentRotY;
      }

      renderer.render(scene, camera);
    };

    // ─── IntersectionObserver: pause when scene is off-screen ────────────────
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          clock.start(); // Resume the clock so there's no time jump
          animate();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Also pause when the tab is hidden
    const handleVisibilityChange = () => {
      const hidden = document.hidden;
      if (hidden && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      } else if (!hidden && isVisible) {
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    animate();

    // ─── ResizeObserver (better than window resize) ────────────────────────────
    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    // ─── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      resizeObserver.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      // Dispose geometries and materials to free GPU memory
      [coreGeo, coreMat, innerGeo, innerMat, ring1Geo, ring1Mat, ring2Geo, ring2Mat, particleGeo, particleMat].forEach(r => r.dispose());
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[480px] flex items-center justify-center">
      {/* 3D Canvas Mount */}
      <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Floating Holographic Tech Badges */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="absolute top-4 left-6 sm:top-8 sm:left-10 px-3.5 py-1.5 rounded-full bg-slate-900/85 border border-cyan-500/40 backdrop-blur-md shadow-[0_0_20px_rgba(0,242,254,0.25)] flex items-center gap-2 animate-bounce-slow">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono text-cyan-300 font-semibold">&lt;React.js /&gt;</span>
        </div>

        <div className="absolute bottom-8 left-4 sm:bottom-10 sm:left-12 px-3.5 py-1.5 rounded-full bg-slate-900/85 border border-violet-500/40 backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.25)] flex items-center gap-2 animate-float">
          <span className="w-2 h-2 rounded-full bg-violet-400" />
          <span className="text-xs font-mono text-violet-300 font-semibold">Python • SQL</span>
        </div>

        <div className="absolute top-6 right-6 sm:top-10 sm:right-10 px-3.5 py-1.5 rounded-full bg-slate-900/85 border border-emerald-500/40 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.25)] flex items-center gap-2 animate-float-delayed">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-emerald-300 font-semibold">Power BI • Analytics</span>
        </div>

        <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-12 px-3.5 py-1.5 rounded-full bg-slate-900/85 border border-sky-500/40 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.25)] flex items-center gap-2 animate-bounce-slow">
          <span className="w-2 h-2 rounded-full bg-sky-400" />
          <span className="text-xs font-mono text-sky-300 font-semibold">JavaScript • CSS3</span>
        </div>
      </div>

      {/* Orbit Indicator */}
      <div className="absolute bottom-1 text-[11px] font-mono tracking-widest text-slate-500 uppercase flex items-center gap-2 pointer-events-none select-none">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400/80 animate-pulse" />
        Interactive 3D Engine • Move cursor to orbit
      </div>
    </div>
  );
}
