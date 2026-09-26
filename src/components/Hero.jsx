import React from 'react';
import { ArrowRight, Download, Send, Terminal, FileText } from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';
import ThreeHeroScene from './ThreeHeroScene';
import { personalInfo } from '../data/portfolioData';
import { playSound } from '../utils/soundEffects';

export default function Hero({ onOpenResume }) {
  const scrollTo = (id) => {
    playSound('click');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[100svh] pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">

          {/* ── Left Column ─────────────────────────────────── */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left order-2 lg:order-1">

            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md w-fit mb-5 shadow-[0_0_20px_rgba(0,242,254,0.15)] animate-fade-in max-w-full overflow-hidden">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] sm:text-xs font-mono text-cyan-300 font-medium tracking-wide truncate">
                Available for Software &amp; Data Roles
              </span>
              <span className="text-slate-600 shrink-0">•</span>
              <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 hidden xs:inline truncate">
                Aditya Silver Oak University
              </span>
            </div>

            {/* Name Heading — clamp for fluid sizing */}
            <h1
              className="font-extrabold font-heading tracking-tight text-white leading-[1.08] mb-4"
              style={{ fontSize: 'clamp(2rem, 7vw, 4.5rem)' }}
            >
              <span className="block text-slate-400 font-mono font-normal tracking-wide mb-1"
                style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1.5rem)' }}>
                Hello, I am
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 drop-shadow-[0_0_35px_rgba(0,242,254,0.3)]">
                {personalInfo.name}
              </span>
            </h1>

            {/* Role sub-headline */}
            <h2
              className="font-mono text-cyan-400 font-medium mb-5 flex flex-wrap items-center gap-x-2 gap-y-1"
              style={{ fontSize: 'clamp(0.75rem, 2.5vw, 1.25rem)' }}
            >
              <span className="text-slate-100">Computer Science Student</span>
              <span className="text-cyan-500 hidden sm:inline">•</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Developer
              </span>
              <span className="text-cyan-500 hidden sm:inline">•</span>
              <span className="text-violet-300">Data Analytics Enthusiast</span>
            </h2>

            {/* Description */}
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-sans leading-relaxed mb-7 text-balance">
              {personalInfo.headline}
            </p>

            {/* CTA Buttons — wrap cleanly on narrow screens */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <button
                onClick={() => scrollTo('projects')}
                onMouseEnter={() => playSound('hover')}
                className="group relative px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-slate-950 font-mono font-bold text-sm shadow-[0_0_30px_rgba(0,242,254,0.35)] hover:shadow-[0_0_45px_rgba(0,242,254,0.6)] transition-all duration-300 flex items-center gap-2 active:scale-95 cursor-pointer touch-manipulation"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => { playSound('whoosh'); onOpenResume(); }}
                onMouseEnter={() => playSound('hover')}
                className="group px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 hover:text-white font-mono font-semibold text-sm border-2 border-cyan-400/80 hover:border-cyan-300 backdrop-blur-md transition-all duration-300 flex items-center gap-2 shadow-[0_0_25px_rgba(0,242,254,0.25)] active:scale-95 cursor-pointer touch-manipulation"
              >
                <Download className="w-4 h-4 text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
                <span>Resume</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                onMouseEnter={() => playSound('hover')}
                className="px-4 py-3 rounded-xl text-slate-400 hover:text-cyan-300 font-mono text-sm transition-colors flex items-center gap-2 group cursor-pointer touch-manipulation"
              >
                <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                <span>Contact</span>
              </button>
            </div>

            {/* Profile Links */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-slate-400 pt-4 border-t border-slate-800/80">
              <span className="text-slate-500 hidden sm:inline">Connect:</span>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => playSound('hover')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-all touch-manipulation"
              >
                <Github className="w-3.5 h-3.5 text-cyan-400" />
                <span>GitHub</span>
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => playSound('hover')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/70 border border-slate-800 hover:border-blue-500/50 hover:text-blue-300 transition-all touch-manipulation"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-400 hidden md:inline text-[11px]">
                Aditya Silver Oak University (2023–2027)
              </span>
            </div>
          </div>

          {/* ── Right Column: 3D Canvas ──────────────────────── */}
          <div className="lg:col-span-5 relative flex items-center justify-center order-1 lg:order-2">
            {/* Ambient glow */}
            <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-600/15 to-purple-600/15 blur-[80px] pointer-events-none" />

            {/* Canvas wrapper — constrain size on mobile */}
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-full rounded-3xl border border-cyan-500/25 bg-slate-950/40 backdrop-blur-md p-2 shadow-[0_0_50px_rgba(0,242,254,0.12)] transition-colors">
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 font-mono text-[10px] text-cyan-400/90 bg-slate-900/90 px-2.5 py-1 rounded-md border border-cyan-500/30">
                <Terminal className="w-3 h-3 text-cyan-400" />
                <span className="hidden xs:inline">3D_DEV_MATRIX.GL</span>
              </div>
              <ThreeHeroScene />
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {personalInfo.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md hover:border-cyan-500/30 transition-all group"
            >
              <div
                className="font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:scale-105 transition-transform origin-left"
                style={{ fontSize: 'clamp(1.25rem, 4vw, 1.875rem)' }}
              >
                {stat.value}
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-1 uppercase tracking-wider leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
