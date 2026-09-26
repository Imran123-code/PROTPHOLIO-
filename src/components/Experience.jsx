import React from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { experienceData } from '../data/portfolioData';
import { playSound } from '../utils/soundEffects';

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-28 overflow-hidden border-t border-slate-900 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3 shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            <Briefcase className="w-3.5 h-3.5" />
            <span>06 // PRACTICAL EXPERIENCE</span>
          </div>

          <h2
            className="font-extrabold font-heading text-white tracking-tight"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}
          >
            Academic &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Engineering Experience</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3 font-sans">
            Practical engineering projects, software development coursework, and open-source contributions.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mt-4" />
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">

          {/*
            Mobile: left-rail timeline (line at left-4)
            Desktop (sm+): centered two-sided timeline (line at 50%)
          */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 sm:-translate-x-1/2 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-indigo-600 shadow-[0_0_15px_rgba(0,242,254,0.4)] pointer-events-none" />

          <div className="space-y-10 sm:space-y-16">
            {experienceData.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  onMouseEnter={() => playSound('hover')}
                  className={`relative flex items-start gap-0 sm:gap-8 group ${isEven ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}
                >
                  {/* Timeline node — always at left-4 on mobile, centered on sm+ */}
                  <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-5 w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(0,242,254,0.5)] z-20 group-hover:scale-110 transition-transform shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 group-hover:animate-ping" />
                  </div>

                  {/* Desktop spacer */}
                  <div className="hidden sm:block sm:w-1/2 shrink-0" />

                  {/* Content card */}
                  <div className="w-full sm:w-1/2 pl-14 sm:pl-0 sm:px-6 shrink-0">
                    <div className="rounded-2xl sm:rounded-3xl bg-slate-950/80 border border-slate-800 p-5 sm:p-7 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] group-hover:border-cyan-500/40 group-hover:shadow-[0_0_35px_rgba(0,242,254,0.15)] transition-all duration-300">

                      {/* Badge + Date */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                          {exp.badge}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold font-heading text-white group-hover:text-cyan-300 transition-colors leading-tight">
                        {exp.role}
                      </h3>

                      <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-cyan-400 font-medium mt-1 mb-4">
                        <span>{exp.organization}</span>
                        <span>•</span>
                        <span className="text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 shrink-0" />
                          {exp.location}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed font-sans mb-4">
                        {exp.description}
                      </p>

                      {/* Responsibilities */}
                      <div className="space-y-1.5 mb-5">
                        {exp.responsibilities.map((resp, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                            <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </div>
                        ))}
                      </div>

                      {/* Skills */}
                      <div className="pt-3 border-t border-slate-800/80">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                          Competencies Applied
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
