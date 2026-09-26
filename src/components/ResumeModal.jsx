import React from 'react';
import { X, Printer, Download, ExternalLink, GraduationCap, Award, Briefcase, Code2, Globe, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';
import confetti from 'canvas-confetti';
import { personalInfo, experienceData, certificationsData, achievementsData, skillsData, featuredProjects } from '../data/portfolioData';
import { playSound } from '../utils/soundEffects';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    playSound('success');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-950 border border-cyan-500/30 rounded-2xl shadow-[0_0_60px_rgba(0,242,254,0.25)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            <span className="ml-3 text-sm font-mono text-cyan-400 font-medium tracking-wide">
              {personalInfo.name} — Official Resume
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 text-xs font-mono font-medium rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,242,254,0.4)] cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={() => { playSound('click'); onClose(); }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Content */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-7 text-slate-200 text-sm font-sans print:p-0 print:text-black">
          
          {/* Header */}
          <div className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
                {personalInfo.name}
              </h1>
              <p className="text-cyan-400 font-mono text-xs sm:text-sm mt-1">
                {personalInfo.role}
              </p>
              <p className="text-slate-400 text-xs mt-1">
                {personalInfo.location} • {personalInfo.university}
              </p>
            </div>

            <div className="flex flex-col items-start sm:items-end text-xs font-mono text-slate-300 space-y-1">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-cyan-400" />
                {personalInfo.phone}
              </span>
              <a href={`mailto:${personalInfo.email}`} className="text-cyan-400 hover:underline flex items-center gap-1.5">
                <Mail className="w-3 h-3" />
                {personalInfo.email}
              </a>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-cyan-300 flex items-center gap-1.5">
                <Github className="w-3 h-3 text-cyan-400" />
                github.com/Imran123-code
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-300 flex items-center gap-1.5">
                <Linkedin className="w-3 h-3 text-blue-400" />
                linkedin.com/in/ahmad-imran-4jbshcdsbcjsbj4449b375
              </a>
            </div>
          </div>

          {/* Profile Statement */}
          <div>
            <h2 className="text-xs font-mono font-semibold tracking-widest text-cyan-400 uppercase mb-2">
              Profile
            </h2>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              {personalInfo.profileSummary}
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono font-semibold tracking-widest text-cyan-400 uppercase mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              Education
            </h2>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline">
                <div>
                  <h3 className="font-semibold text-white text-sm">{personalInfo.university}</h3>
                  <p className="text-xs text-cyan-400 font-mono mt-0.5">{personalInfo.degree}</p>
                </div>
                <div className="text-xs font-mono text-slate-400 mt-1 sm:mt-0">
                  {personalInfo.location} | {personalInfo.educationPeriod}
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-xs text-slate-300">
                <span className="text-slate-400 font-mono font-medium">Relevant Coursework: </span>
                {personalInfo.coursework.join(', ')}
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono font-semibold tracking-widest text-cyan-400 uppercase mb-3 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-400" />
              Technical Skills & Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3.5">
                <span className="font-mono text-cyan-300 font-semibold block mb-1">Technical Stack</span>
                <p className="text-slate-300 leading-relaxed">
                  Python, SQL, HTML, CSS, JavaScript, React.js, Responsive Web Design, Git & GitHub, Version Control, Power BI, Excel, Data Analytics.
                </p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3.5">
                <span className="font-mono text-cyan-300 font-semibold block mb-1">Developer Tools & Environments</span>
                <p className="text-slate-300 leading-relaxed">
                  VS Code, GitHub, Canva, Chrome DevTools, Figma, PapaParse, Chart.js, Vercel.
                </p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-xs font-mono font-semibold tracking-widest text-cyan-400 uppercase mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-400" />
              Certifications
            </h2>
            <div className="space-y-3">
              {certificationsData.map((cert, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-xl p-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <h3 className="font-semibold text-white text-xs sm:text-sm">{cert.title}</h3>
                    <p className="text-xs text-slate-400">{cert.organization} ({cert.year})</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/40 shrink-0">
                    {cert.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Practical & Academic Experience */}
          <div>
            <h2 className="text-xs font-mono font-semibold tracking-widest text-cyan-400 uppercase mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              Experience
            </h2>
            <div className="space-y-3">
              {experienceData.map((exp, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-baseline">
                    <h3 className="font-semibold text-white text-sm">{exp.role}</h3>
                    <span className="text-xs font-mono text-cyan-400">{exp.period}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{exp.organization} — {exp.location}</p>
                  <ul className="mt-2.5 space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Projects */}
          <div>
            <h2 className="text-xs font-mono font-semibold tracking-widest text-cyan-400 uppercase mb-3 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-400" />
              Featured Projects (From Resume)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {featuredProjects.map((p, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white text-xs sm:text-sm">{p.title}</h3>
                      <span className="text-[10px] font-mono text-cyan-400">{p.period}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-3">{p.description}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex flex-wrap gap-1 text-[10px] font-mono text-slate-400">
                    {p.technologies.slice(0, 4).map((tech, tIdx) => (
                      <span key={tIdx} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h2 className="text-xs font-mono font-semibold tracking-widest text-cyan-400 uppercase mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              Languages
            </h2>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {personalInfo.languages.map((lang, idx) => (
                <span key={idx} className="px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300">
                  <span className="text-white font-medium">{lang.name}:</span> {lang.level}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
