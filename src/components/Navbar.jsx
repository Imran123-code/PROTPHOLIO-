import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, Volume2, VolumeX, FileText, Sparkles, Terminal } from 'lucide-react';
import { playSound, toggleSound, isSoundEnabled } from '../utils/soundEffects';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certifications' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' }
];

export default function Navbar({ onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [soundOn, setSoundOn] = useState(true);

  const scrollRafRef = useRef(null);

  useEffect(() => {
    const sections = NAV_ITEMS.map(item => item.href.substring(1));

    const handleScroll = () => {
      if (scrollRafRef.current) return; // throttle to 1 call per rAF
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = null;
        setScrolled(window.scrollY > 40);

        const scrollPos = window.scrollY + 180;
        for (let i = sections.length - 1; i >= 0; i--) {
          const secEl = document.getElementById(sections[i]);
          if (secEl && secEl.offsetTop <= scrollPos) {
            setActiveSection(sections[i]);
            break;
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
  }, []);

  const handleNavClick = useCallback((href) => {
    playSound('click');
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSoundToggle = useCallback(() => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) playSound('click');
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
          className="group flex items-center gap-2.5 text-white font-heading font-bold text-lg tracking-tight"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1.5px] shadow-[0_0_15px_rgba(0,242,254,0.4)] transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Terminal className="w-4 h-4 text-cyan-400 group-hover:text-white transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
              Imran Ahmad
            </span>
            <span className="text-[10px] font-mono tracking-widest text-cyan-400/90 font-normal">
              PORTFOLIO.3D
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/50 border border-slate-800/80 rounded-full px-4 py-1.5 backdrop-blur-md">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                onMouseEnter={() => playSound('hover')}
                className={`relative px-3.5 py-1.5 text-xs font-mono rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-300 font-semibold shadow-[0_0_15px_rgba(0,242,254,0.25)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-cyan-500/15 border border-cyan-500/40 -z-10" />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Sound Synthesizer Toggle */}
          <button
            onClick={handleSoundToggle}
            className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all backdrop-blur-md"
            title={soundOn ? "Disable Sound FX" : "Enable Sound FX"}
            aria-label="Sound Toggle"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Interactive Resume Button */}
          <button
            onClick={() => { playSound('whoosh'); onOpenResume(); }}
            className="group relative px-4 py-2 text-xs font-mono font-medium rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 shadow-[0_0_20px_rgba(0,242,254,0.35)] flex items-center gap-1.5 active:scale-95"
          >
            <FileText className="w-3.5 h-3.5 text-slate-950 group-hover:rotate-6 transition-transform" />
            <span>Resume</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          </button>
        </div>

        {/* Mobile Hamburger & Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={handleSoundToggle}
            className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-cyan-400"
            aria-label="Sound Toggle"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => { playSound('click'); setMobileMenuOpen(!mobileMenuOpen); }}
            className="p-2 rounded-xl bg-slate-900/70 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-cyan-500/20 backdrop-blur-2xl px-6 py-6 animate-fade-in">
          <nav className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className={`px-4 py-2.5 rounded-xl font-mono text-sm transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 font-semibold'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400"></span>}
                </a>
              );
            })}

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => { playSound('whoosh'); setMobileMenuOpen(false); onOpenResume(); }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-mono font-medium text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.35)]"
              >
                <FileText className="w-4 h-4" />
                <span>View & Download Resume</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
