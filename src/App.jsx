import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';

// ─── Eagerly loaded (above-the-fold / always-visible) ────────────────────────
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Background3D from './components/Background3D';

import Certificates from './components/Certificates';
import ResumeModal from './components/ResumeModal';

// ─── Lazily loaded (below-the-fold) ──────────────────────────────────────────
const About       = lazy(() => import('./components/About'));
const Skills      = lazy(() => import('./components/Skills'));
const FeaturedProjects = lazy(() => import('./components/FeaturedProjects'));
const Projects    = lazy(() => import('./components/Projects'));
const Experience  = lazy(() => import('./components/Experience'));
const Achievements = lazy(() => import('./components/Achievements'));
const Contact     = lazy(() => import('./components/Contact'));
const Footer      = lazy(() => import('./components/Footer'));

// ─── Lightweight section skeleton shown during lazy-load ─────────────────────
function SectionSkeleton() {
  return (
    <div className="py-24 flex justify-center items-center">
      <div className="flex items-center gap-2 font-mono text-xs text-cyan-500/60">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>Loading...</span>
      </div>
    </div>
  );
}

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });
  const [isPointer, setIsPointer] = useState(false);

  // rAF-throttled cursor tracking — avoids triggering re-renders on every pixel
  const rafRef = useRef(null);
  const pendingPos = useRef({ x: -200, y: -200 });
  const pendingPointer = useRef(false);

  const handleMouseMove = useCallback((e) => {
    pendingPos.current = { x: e.clientX, y: e.clientY };
    const target = e.target;
    pendingPointer.current = !!(
      target &&
      (target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('.cursor-pointer'))
    );
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        setCursorPos({ ...pendingPos.current });
        setIsPointer(pendingPointer.current);
        rafRef.current = null;
      });
    }
  }, []);

  useEffect(() => {
    // Only enable on non-touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-cyan-500 selection:text-slate-950">

      {/* 3D Dynamic Ambient Starfield / Cyber Grid */}
      <Background3D />

      {/* Cyber Glowing Trailing Cursor — desktop only, hardware-accelerated */}
      <div
        aria-hidden="true"
        className="hidden md:block pointer-events-none fixed z-[60] rounded-full"
        style={{
          left: 0,
          top: 0,
          transform: `translate3d(${cursorPos.x - (isPointer ? 18 : 10)}px, ${cursorPos.y - (isPointer ? 18 : 10)}px, 0) scale(${isPointer ? 1.8 : 1})`,
          width: isPointer ? '36px' : '20px',
          height: isPointer ? '36px' : '20px',
          backgroundColor: isPointer ? 'rgba(0, 242, 254, 0.15)' : 'rgba(0, 242, 254, 0.4)',
          border: '1px solid rgba(0, 242, 254, 0.7)',
          boxShadow: '0 0 20px rgba(0, 242, 254, 0.4)',
          transition: 'width 0.15s ease, height 0.15s ease, background-color 0.15s ease',
          willChange: 'transform',
        }}
      />

      {/* Sticky Navigation Bar */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Portfolio Sections */}
      <main className="relative z-0">
        {/* Hero is eagerly loaded — it IS the LCP */}
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* All remaining sections are lazy-loaded */}
        <Suspense fallback={<SectionSkeleton />}>
          <About onOpenResume={() => setIsResumeOpen(true)} />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <FeaturedProjects />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Projects />
        </Suspense>
        <Certificates />
        <Suspense fallback={<SectionSkeleton />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Achievements />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* Interactive Printable & Downloadable Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

    </div>
  );
}
