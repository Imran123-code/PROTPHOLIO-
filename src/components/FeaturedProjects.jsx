import React, { useState } from 'react';
import { Sparkles, ExternalLink, ChevronLeft, ChevronRight, Layers, Eye, CheckCircle2, Calendar, Star, ArrowUpRight, Code2, BarChart3, Bot, Terminal, Globe, Monitor } from 'lucide-react';
import { Github } from './SocialIcons';
import { featuredProjects } from '../data/portfolioData';
import { playSound } from '../utils/soundEffects';

export default function FeaturedProjects() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  // The first project is the flagship hero project with the largest visual treatment
  const flagship = featuredProjects[0];
  const activeProject = featuredProjects[selectedProjectIndex];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden border-t border-slate-900 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3 shadow-[0_0_15px_rgba(0,242,254,0.15)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>03 // FEATURED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
              Flagship <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Engineering Projects</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-2 font-sans">
              Handpicked standout creations demonstrating modern React architecture, business intelligence, and full-stack AI development.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate-400 bg-slate-900/60 px-3.5 py-1.5 rounded-full border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>Priority Ranked by Technical Depth</span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 1. HEROIC FLAGSHIP PROJECT CARD (Largest Visual Treatment)         */}
        {/* ------------------------------------------------------------------ */}
        <div className="mb-16">
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-950/90 via-slate-900/70 to-slate-950/90 border-2 border-cyan-500/40 p-6 sm:p-10 lg:p-12 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,242,254,0.2)] overflow-hidden group hover:border-cyan-400 transition-all duration-300">
            
            {/* Top Glow Ambient Halo */}
            <div className="absolute -top-32 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Flagship Details (6 cols) */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2.5 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,242,254,0.4)]">
                      ★ TOP FEATURED PROJECT
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                      {flagship.category}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Live on Vercel</span>
                    </span>
                  </div>

                  <h3 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight mb-3">
                    {flagship.title}
                  </h3>

                  <h4 className="text-sm sm:text-lg font-mono text-cyan-400 font-medium mb-4 sm:mb-6">
                    {flagship.tagline}
                  </h4>

                  <p className="text-slate-300 text-xs sm:text-base leading-relaxed font-sans mb-6 sm:mb-8">
                    {flagship.description}
                  </p>

                  {/* Key Metrics Row */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-3 mb-6 sm:mb-8 p-2.5 sm:p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                    {flagship.keyMetrics.map((km, idx) => (
                      <div key={idx} className="text-center sm:text-left">
                        <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase tracking-wider truncate">{km.label}</div>
                        <div className="text-xs sm:text-sm font-mono font-bold text-cyan-300 mt-0.5">{km.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Technology Badges */}
                  <div className="mb-6 sm:mb-8">
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                      Core Technologies
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {flagship.technologies.map((t, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-6 border-t border-slate-800/80">
                  {flagship.liveUrl && (
                    <a
                      href={flagship.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => playSound('hover')}
                      className="w-full sm:w-auto justify-center px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-slate-950 font-mono font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(0,242,254,0.4)] hover:shadow-[0_0_40px_rgba(0,242,254,0.6)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Launch Live Web Store</span>
                    </a>
                  )}

                  <a
                    href={flagship.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => playSound('hover')}
                    className="w-full sm:w-auto justify-center px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-cyan-500/50 font-mono font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Github className="w-4 h-4 text-cyan-400" />
                    <span>View GitHub Source</span>
                  </a>
                </div>
              </div>

              {/* Right Column: 3D Interactive Browser Mockup (6 cols) */}
              <div className="lg:col-span-6">
                <div className="relative rounded-2xl bg-slate-950 border border-cyan-500/30 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
                  {/* Browser Chrome Window Bar */}
                  <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                    </div>
                    <div className="px-3 py-1 rounded-md bg-slate-950/80 text-[11px] font-mono text-cyan-400 flex items-center gap-1.5 border border-slate-800">
                      <Globe className="w-3 h-3" />
                      <span>e-commerce-liart-eta-74.vercel.app</span>
                    </div>
                    <div className="w-8"></div>
                  </div>

                  {/* Browser Preview Content Surface */}
                  <div className="p-6 sm:p-8 bg-gradient-to-b from-slate-900/80 via-slate-950 to-black space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                      <div className="flex items-center gap-2 font-mono text-xs text-white font-bold">
                        <Monitor className="w-4 h-4 text-cyan-400" />
                        <span>ECOMMERCE.STORE // FRONTEND</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                        HTTP 200 OK
                      </span>
                    </div>

                    {/* Interactive Mockup Catalog Cards */}
                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                        <div className="w-full h-20 rounded-lg bg-cyan-950/40 border border-cyan-500/20 mb-3 flex items-center justify-center text-cyan-400 font-mono text-xs">
                          [Dynamic Product]
                        </div>
                        <div className="h-3 w-3/4 bg-slate-700 rounded mb-1.5"></div>
                        <div className="h-2.5 w-1/2 bg-cyan-500/60 rounded"></div>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                        <div className="w-full h-20 rounded-lg bg-blue-950/40 border border-blue-500/20 mb-3 flex items-center justify-center text-blue-400 font-mono text-xs">
                          [Interactive Bag]
                        </div>
                        <div className="h-3 w-2/3 bg-slate-700 rounded mb-1.5"></div>
                        <div className="h-2.5 w-1/3 bg-blue-500/60 rounded"></div>
                      </div>
                    </div>

                    {/* Performance Metrics Pill */}
                    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
                      <span className="text-cyan-400 font-semibold">Speed Index: 98/100</span>
                      <span className="text-slate-400">Mobile & Desktop Ready</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 2. PERSPECTIVE STAGE FOR REMAINING 5 FEATURED PROJECTS             */}
        {/* ------------------------------------------------------------------ */}
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-6 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>High-Impact Engineering & Analytics Showcase</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.slice(1).map((p, idx) => (
              <FeaturedSubCard key={p.id} project={p} index={idx + 2} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function FeaturedSubCard({ project, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { playSound('hover'); setIsHovered(true); }}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(${isHovered ? '8px' : '0px'})`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
      }}
      className="group relative rounded-3xl bg-slate-950/75 border border-slate-800/80 p-6 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.6)] hover:border-cyan-500/50 hover:shadow-[0_0_35px_rgba(0,242,254,0.18)] flex flex-col justify-between overflow-hidden"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center">
            0{index}
          </span>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-semibold">
            {project.badge}
          </span>
        </div>

        <h3 className="text-xl font-bold font-heading text-white group-hover:text-cyan-300 transition-colors mt-2">
          {project.title}
        </h3>

        <h4 className="text-xs font-mono text-cyan-400/90 mt-1 mb-3">
          {project.tagline}
        </h4>

        <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3">
          {project.description}
        </p>

        {/* Key Metrics Chips */}
        {project.keyMetrics && (
          <div className="grid grid-cols-3 gap-1.5 my-4 pt-3 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
            {project.keyMetrics.map((km, i) => (
              <div key={i} className="p-1.5 rounded-lg bg-slate-900/60 border border-slate-800/60 text-center">
                <span className="block text-slate-500 text-[9px]">{km.label}</span>
                <span className="text-cyan-300 font-medium">{km.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tech Badges & Action Links */}
      <div className="mt-4 pt-3 border-t border-slate-800/80">
        <div className="flex flex-wrap gap-1 mb-4">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-xs font-mono text-slate-300 hover:text-cyan-400 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Github className="w-3.5 h-3.5 text-cyan-400" />
            <span>Source Code</span>
          </a>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 text-xs font-mono font-medium flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,242,254,0.15)] cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live App</span>
            </a>
          ) : (
            <span className="text-[10px] font-mono text-slate-500">Repository</span>
          )}
        </div>
      </div>
    </div>
  );
}
