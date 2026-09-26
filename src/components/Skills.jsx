import React, { useState, useMemo, memo } from 'react';
import { Cpu, Atom, BarChart3, Wrench, Code2, Database, Zap, Layout, FileCode, LineChart, FileSpreadsheet, Server, PenTool, Smartphone, Sparkles, GitBranch, Terminal } from 'lucide-react';
import { skillsData } from '../data/portfolioData';
import { playSound } from '../utils/soundEffects';

const CATEGORIES = [
  { id: 'all', label: 'All Disciplines', icon: Sparkles },
  { id: 'programming', label: 'Programming & Logic', icon: Code2 },
  { id: 'webDevelopment', label: 'Frontend & Web', icon: Atom },
  { id: 'dataAnalytics', label: 'Data & Analytics', icon: BarChart3 },
  { id: 'tools', label: 'Tools & Environments', icon: Wrench }
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');

  const skills = useMemo(() => {
    if (activeTab === 'all') {
      return [
        ...skillsData.programming.map(s => ({ ...s, group: 'Programming' })),
        ...skillsData.webDevelopment.map(s => ({ ...s, group: 'Web Dev' })),
        ...skillsData.dataAnalytics.map(s => ({ ...s, group: 'Analytics' })),
        ...skillsData.tools.map(s => ({ ...s, group: 'Tools' }))
      ];
    }
    return skillsData[activeTab].map(s => ({
      ...s,
      group: CATEGORIES.find(c => c.id === activeTab)?.label || 'Tech'
    }));
  }, [activeTab]);

  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3 shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            <Cpu className="w-3.5 h-3.5" />
            <span>02 // CORE COMPETENCIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Verified Skillset & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Technical Stack</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3 font-sans">
            Core software engineering foundations, frontend web development, and data analytics tools directly verified from Imran's resume.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mt-4"></div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => { playSound('click'); setActiveTab(cat.id); }}
                onMouseEnter={() => playSound('hover')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 flex items-center gap-2 border cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-[0_0_20px_rgba(0,242,254,0.35)] scale-105'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Interactive Skill Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {skills.map((skill, idx) => (
            <SkillCard key={`${skill.name}-${idx}`} skill={skill} />
          ))}
        </div>

      </div>
    </section>
  );
}

const SkillCard = memo(function SkillCard({ skill }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { playSound('hover'); setHovered(true); }}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale3d(${hovered ? 1.02 : 1}, ${hovered ? 1.02 : 1}, 1)`,
        transition: hovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
      }}
      className="group relative rounded-2xl bg-slate-950/70 border border-slate-800/80 p-5 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,242,254,0.15)] flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_15px_rgba(0,242,254,0.25)] transition-all">
            <DynamicSkillIcon name={skill.icon} />
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
            {skill.group}
          </span>
        </div>

        <h3 className="text-base font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
          {skill.name}
        </h3>
        
        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-sans line-clamp-2">
          {skill.desc}
        </p>
      </div>

      {/* Proficiency Bar */}
      <div className="mt-5 pt-3 border-t border-slate-800/60">
        <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 mb-1.5">
          <span>Proficiency</span>
          <span className="text-cyan-400 font-semibold">{skill.level}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 transition-all duration-700 ease-out"
            style={{ width: `${skill.level}%` }}
          />
        </div>
      </div>
    </div>
  );
});

function DynamicSkillIcon({ name }) {
  switch (name) {
    case 'Code2': return <Code2 className="w-5 h-5" />;
    case 'Zap': return <Zap className="w-5 h-5" />;
    case 'Database': return <Database className="w-5 h-5" />;
    case 'Atom': return <Atom className="w-5 h-5" />;
    case 'Layout': return <Layout className="w-5 h-5" />;
    case 'FileCode': return <FileCode className="w-5 h-5" />;
    case 'BarChart3': return <BarChart3 className="w-5 h-5" />;
    case 'LineChart': return <LineChart className="w-5 h-5" />;
    case 'FileSpreadsheet': return <FileSpreadsheet className="w-5 h-5" />;
    case 'Server': return <Server className="w-5 h-5" />;
    case 'PenTool': return <PenTool className="w-5 h-5" />;
    case 'Smartphone': return <Smartphone className="w-5 h-5" />;
    case 'GitBranch': return <GitBranch className="w-5 h-5" />;
    case 'Terminal': return <Terminal className="w-5 h-5" />;
    case 'Cpu': return <Cpu className="w-5 h-5" />;
    default: return <Sparkles className="w-5 h-5" />;
  }
}
