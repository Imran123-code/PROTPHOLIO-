import React, { useEffect, useRef } from 'react';

export default function Background3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Detect mobile to reduce particle count for better perf
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Fewer particles on mobile; none on reduced-motion
    const maxParticles = isMobile ? 40 : 100;
    const count = isReducedMotion ? 0 : Math.min(Math.floor((width * height) / 14000), maxParticles);
    const particles = [];
    const colors = ['#00f2fe', '#38bdf8', '#818cf8', '#a855f7'];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.6 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    let mouse = { x: -999, y: -999, active: false };
    let isPaused = false;

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    // Pause animation when tab is hidden — saves CPU / battery
    const handleVisibilityChange = () => {
      isPaused = document.hidden;
      if (!isPaused && !animationId) render();
    };

    // Debounced resize
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 150);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize, { passive: true });

    // Skip expensive O(n²) line-drawing on mobile for perf
    const drawLines = !isMobile;
    const connectionDist = 100;

    let animationId;
    const render = () => {
      if (isPaused) {
        animationId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        p1.x += p1.vx;
        p1.y += p1.vy;

        // Edge wrapping
        if (p1.x < 0) p1.x = width;
        else if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        else if (p1.y > height) p1.y = 0;

        // Gentle mouse repel
        if (mouse.active) {
          const dx = mouse.x - p1.x;
          const dy = mouse.y - p1.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 15000) { // 122px radius
            const dist = Math.sqrt(distSq);
            const force = (122 - dist) / 122;
            p1.x -= (dx / dist) * force * 1.1;
            p1.y -= (dy / dist) * force * 1.1;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = p1.alpha;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p1.color;
        ctx.fill();

        // Connect nearby particles (desktop only)
        if (drawLines) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < connectionDist * connectionDist) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = '#38bdf8';
              ctx.globalAlpha = (1 - Math.sqrt(distSq) / connectionDist) * 0.12;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep Space Radial Glows — CSS-only, GPU composited */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[160px]" />
      <div className="absolute -bottom-40 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]" />

      {/* Cyber Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#00f2fe 1px, transparent 1px), linear-gradient(90deg, #00f2fe 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      {/* Canvas for dynamic particles */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
}
