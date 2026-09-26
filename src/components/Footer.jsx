import React from 'react';
import { ArrowUp, Mail, Terminal, Heart, Code2 } from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';
import { personalInfo } from '../data/portfolioData';
import { playSound } from '../utils/soundEffects';

export default function Footer() {
  const scrollToTop = () => {
    playSound('whoosh');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-10 border-t border-slate-900 bg-black text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        
        {/* Brand & Copyright */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="text-slate-200 font-bold font-heading text-sm">
              {personalInfo.name}
            </div>
            <div className="text-slate-500 text-[11px]">
              © {new Date().getFullYear()} &bull; Crafted with React &amp; Three.js
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors touch-manipulation">
            <Github className="w-4 h-4" />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-colors touch-manipulation">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href={`mailto:${personalInfo.email}`} aria-label="Email"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors touch-manipulation">
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-white transition-all group touch-manipulation"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
        </button>

      </div>
    </footer>
  );
}
