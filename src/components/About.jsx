import React, { useState } from 'react';
import { User, GraduationCap, Sparkles, Code2, Database, BarChart3, Terminal, ArrowUpRight, CheckCircle2, FileText } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { playSound } from '../utils/soundEffects';

const HIGHLIGHT_BUBBLES = [
  { name: 'React.js', color: 'from-cyan-500 to-blue-500', type: 'Frontend' },
  { name: 'JavaScript', color: 'from-amber-400 to-orange-500', type: 'Language' },
  { name: 'Python', color: 'from-blue-500 to-emerald-500', type: 'Backend/AI' },
  { name: 'SQL', color: 'from-emerald-400 to-teal-600', type: 'Database' },
  { name: 'Power BI', color: 'from-yellow-400 to-amber-600', type: 'Analytics' },
  { name: 'Excel', color: 'from-green-500 to-emerald-700', type: 'Data' },
  { name: 'Data Analytics', color: 'from-indigo-500 to-violet-600', type: 'Insights' },
  { name: 'HTML5 & CSS3', color: 'from-sky-400 to-blue-600', type: 'Web' },
  { name: 'Git & GitHub', color: 'from-purple-500 to-pink-500', type: 'DevOps' }
];

export default function About({ onOpenResume }) {
  const [selectedBubble, setSelectedBubble] = useState(null);

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3 shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            <User className="w-3.5 h-3.5" />
            <span>01 // ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Engineering Solutions & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Data Analytics</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mt-4"></div>
        </div>

        {/* 3D Holographic Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Profile Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative h-full rounded-3xl bg-slate-950/70 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] flex flex-col justify-between group hover:border-cyan-500/40 transition-all duration-300">
              
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-bl-full pointer-events-none" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400"></div>

              <div>
                {/* Header with Avatar & Details */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="relative group/avatar">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-[0_0_25px_rgba(0,242,254,0.3)] bg-slate-900">
                      <img
                        src={personalInfo.avatar}
                        alt={personalInfo.name}
                        className="w-full h-full object-cover group-hover/avatar:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                      {personalInfo.name}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400 mt-0.5">
                      B.E. Computer Engineering
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
                      <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{personalInfo.university}</span>
                    </div>
                  </div>
                </div>

                {/* Verified Resume Badges */}
                <div className="space-y-2.5 font-mono text-xs text-slate-300 border-t border-slate-800/80 pt-4">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400">Academic Program:</span>
                    <span className="text-cyan-300 font-semibold">{personalInfo.degree}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400">Timeline / Batch:</span>
                    <span className="text-emerald-400 font-semibold">{personalInfo.educationPeriod}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400">GitHub Activity:</span>
                    <span className="text-violet-300 font-semibold">41+ Public Repositories</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400">Location:</span>
                    <span className="text-slate-200 font-semibold">{personalInfo.location}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Need official credentials?</span>
                <button
                  onClick={() => { playSound('click'); onOpenResume(); }}
                  className="text-xs font-mono font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group/btn cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Open Full Resume</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Interactive Skill Constellation (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Narrative Card */}
            <div className="rounded-3xl bg-slate-950/70 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.6)]">
              <h3 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <span>Professional Profile</span>
              </h3>
              
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans mb-4">
                {personalInfo.profileSummary}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-800/80">
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider block mb-2">
                  Academic Focus & Coursework
                </span>
                <div className="flex flex-wrap gap-2">
                  {personalInfo.coursework.map((course, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Skill Constellation */}
            <div className="rounded-3xl bg-slate-950/70 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Interactive Skill Constellation</span>
                </h3>
                <span className="text-[11px] font-mono text-slate-500">Tap / Hover node</span>
              </div>

              {/* Bubbles flex grid */}
              <div className="flex flex-wrap gap-2.5">
                {HIGHLIGHT_BUBBLES.map((bubble) => {
                  const isSelected = selectedBubble === bubble.name;
                  return (
                    <button
                      key={bubble.name}
                      onMouseEnter={() => { playSound('hover'); setSelectedBubble(bubble.name); }}
                      onClick={() => { playSound('click'); setSelectedBubble(isSelected ? null : bubble.name); }}
                      className={`group px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,242,254,0.3)] scale-105'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-cyan-500/40 hover:text-white'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full bg-gradient-to-tr ${bubble.color}`}></span>
                      <span className="font-medium">{bubble.name}</span>
                      <span className="text-[10px] text-slate-500 font-normal group-hover:text-slate-400">
                        [{bubble.type}]
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected bubble indicator */}
              <div className="mt-4 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 text-xs font-mono text-slate-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>
                  {selectedBubble
                    ? `Actively utilized in academic projects and software repositories.`
                    : 'Hover or tap any skill node above to explore active focus areas.'}
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
