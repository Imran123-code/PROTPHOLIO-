import React from 'react';
import { Award, CheckCircle2, ExternalLink, Calendar, ShieldCheck, FileBadge2 } from 'lucide-react';
import { Linkedin } from './SocialIcons';
import { certificationsData, achievementsData, personalInfo } from '../data/portfolioData';
import { playSound } from '../utils/soundEffects';

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-20 sm:py-28 overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3 shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            <Award className="w-3.5 h-3.5 shrink-0" />
            <span>07 // HONORS &amp; MILESTONES</span>
          </div>

          <h2
            className="font-extrabold font-heading text-white tracking-tight"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}
          >
            Key Technical &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Academic Milestones</span>
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3 font-sans">
            Demonstrated engineering achievements, project deployments, and open-source contributions verified from resume.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mt-4" />
        </div>

        {/* Milestone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Key Achievements from Resume */}
          {achievementsData.map((item, idx) => (
            <div
              key={`achieve-${idx}`}
              onMouseEnter={() => playSound('hover')}
              className="group relative rounded-3xl bg-slate-950/70 border border-slate-800 p-6 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.6)] hover:border-cyan-500/50 hover:shadow-[0_0_35px_rgba(0,242,254,0.2)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-semibold">
                    Technical Milestone
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                </div>

                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-all">
                  <Award className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed font-sans mt-3">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-400 flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Competency</span>
                </span>
                <span className="text-slate-500 text-[10px]">Academic & GitHub</span>
              </div>
            </div>
          ))}

          {/* 3. LinkedIn Connection Card */}
          <div className="rounded-3xl bg-gradient-to-br from-slate-950/90 via-slate-900/60 to-blue-950/30 border border-blue-500/30 p-6 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-300 font-semibold">
                  LinkedIn Verified
                </span>
                <ShieldCheck className="w-4 h-4 text-blue-400" />
              </div>

              <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-800 flex items-center justify-center text-blue-400 mb-4">
                <Linkedin className="w-5 h-5" />
              </div>

              <h3 className="text-lg font-bold font-heading text-white">
                LinkedIn Professional Network
              </h3>

              <p className="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
                Review peer recommendations, verified academic milestones, and live updates on Imran Ahmad's authenticated LinkedIn profile.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => playSound('hover')}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] cursor-pointer"
              >
                <Linkedin className="w-4 h-4" />
                <span>Open LinkedIn Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
