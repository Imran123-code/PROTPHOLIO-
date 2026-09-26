import React from 'react';
import { ArrowRight, Download, Send, Sparkles, Terminal, FileText, Code2, BarChart3, Database } from 'lucide-react';
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
    <section id="home" className="relative min-h-[92vh] pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Headline & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md w-fit mb-6 shadow-[0_0_20px_rgba(0,242,254,0.15)] animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono text-cyan-300 font-medium tracking-wide">
                Available for Software & Data Roles
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-[11px] font-mono text-slate-400">Aditya Silver Oak University</span>
            </div>

            {/* Powerful Name Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight text-white leading-[1.08] mb-4">
              <span className="block text-slate-400 text-lg sm:text-2xl font-mono font-normal tracking-wide mb-1">
                Hello, I am
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 drop-shadow-[0_0_35px_rgba(0,242,254,0.3)]">
                {personalInfo.name}
              </span>
            </h1>

            {/* Exact Required Sub-headline Role */}
            <h2 className="text-base sm:text-xl lg:text-2xl font-mono text-cyan-400 font-medium mb-6 flex flex-wrap items-center gap-2">
              <span className="text-slate-100">Computer Science Student</span>
              <span className="text-cyan-500">•</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Developer
              </span>
              <span className="text-cyan-500">•</span>
              <span className="text-violet-300">Data Analytics Enthusiast</span>
            </h2>

            {/* Short Professional Description based on Resume */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-sans font-normal leading-relaxed mb-8 text-balance">
              {personalInfo.headline}
            </p>

            {/* Animated & Magnetic CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              
              {/* 1. View Projects Button */}
              <button
                onClick={() => scrollTo('projects')}
                onMouseEnter={() => playSound('hover')}
                className="group relative px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-slate-950 font-mono font-bold text-sm shadow-[0_0_30px_rgba(0,242,254,0.35)] hover:shadow-[0_0_45px_rgba(0,242,254,0.6)] transition-all duration-300 flex items-center gap-2 hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* 2. Download Resume Button (PROMINENT) */}
              <button
                onClick={() => { playSound('whoosh'); onOpenResume(); }}
                onMouseEnter={() => playSound('hover')}
                className="group px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 hover:text-white font-mono font-semibold text-sm border-2 border-cyan-400/80 hover:border-cyan-300 backdrop-blur-md transition-all duration-300 flex items-center gap-2.5 shadow-[0_0_25px_rgba(0,242,254,0.25)] hover:shadow-[0_0_35px_rgba(0,242,254,0.5)] hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4 text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
                <span>Download Resume</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </button>

              {/* 3. Contact Me Button */}
              <button
                onClick={() => scrollTo('contact')}
                onMouseEnter={() => playSound('hover')}
                className="px-5 py-3.5 rounded-xl text-slate-400 hover:text-cyan-300 font-mono text-sm transition-colors flex items-center gap-2 group cursor-pointer"
              >
                <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Quick Profile Links */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 pt-4 border-t border-slate-800/80">
              <span className="text-slate-500">Connect:</span>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => playSound('hover')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-all"
              >
                <Github className="w-3.5 h-3.5 text-cyan-400" />
                <span>GitHub (41+ Repos)</span>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => playSound('hover')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/70 border border-slate-800 hover:border-blue-500/50 hover:text-blue-300 transition-all"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn</span>
              </a>

              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-slate-400 hidden sm:inline">Aditya Silver Oak University (2023–2027)</span>
            </div>
          </div>

          {/* Right Column: Optimized Interactive 3D Canvas (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient Background Glow behind 3D Canvas */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-600/15 to-purple-600/15 blur-[100px] pointer-events-none" />

            {/* 3D Scene Wrapper with Glass Card Frame */}
            <div className="relative w-full rounded-3xl border border-cyan-500/25 bg-slate-950/40 backdrop-blur-md p-2 shadow-[0_0_50px_rgba(0,242,254,0.12)] group hover:border-cyan-500/40 transition-colors">
              <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 font-mono text-[10px] text-cyan-400/90 bg-slate-900/90 px-3 py-1 rounded-md border border-cyan-500/30">
                <Terminal className="w-3 h-3 text-cyan-400" />
                <span>3D_DEV_MATRIX.GL</span>
              </div>
              <ThreeHeroScene />
            </div>
          </div>
        </div>

        {/* Bottom Interactive Metrics Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {personalInfo.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md hover:border-cyan-500/30 transition-all group"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:scale-105 transition-transform origin-left">
                {stat.value}
              </div>
              <div className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
