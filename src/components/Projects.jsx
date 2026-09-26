import React, { useState, useEffect, useRef } from 'react';
import { FolderGit2, Search, X, ExternalLink, Star, GitFork, Sparkles, Filter, RefreshCw, CheckCircle2, Layers, Terminal, AlertCircle } from 'lucide-react';
import { Github } from './SocialIcons';
import { fetchLiveProjects } from '../utils/githubApi';
import { allVerifiedProjects } from '../data/portfolioData';
import { playSound } from '../utils/soundEffects';

// Required Filter Categories
const PROJECT_FILTERS = [
  'All Projects',
  'Data Analysis',
  'Python Projects',
  'SQL Projects',
  'Frontend Projects',
  'React Projects',
  'Full-Stack Projects'
];

export default function Projects() {
  const [projects, setProjects] = useState(allVerifiedProjects);
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    fetchLiveProjects().then((res) => {
      if (isMounted) {
        setProjects(res.projects);
        setIsLive(res.isLive);
      }
    });
    return () => { isMounted = false; };
  }, []);

  // Keyboard shortcut listener ('/' to focus search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        searchInputRef.current?.focus();
        playSound('click');
      }
      if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
        setSearchQuery('');
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleFilterClick = (filter) => {
    if (filter === activeFilter) return;
    playSound('click');
    setIsAnimating(true);
    setActiveFilter(filter);
    setTimeout(() => {
      setIsAnimating(false);
    }, 200);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setIsAnimating(true);
    setSearchQuery(val);
    setTimeout(() => {
      setIsAnimating(false);
    }, 150);
  };

  const handleClearSearch = () => {
    playSound('click');
    setIsAnimating(true);
    setSearchQuery('');
    searchInputRef.current?.focus();
    setTimeout(() => {
      setIsAnimating(false);
    }, 150);
  };

  const handleQuickSearch = (term) => {
    playSound('click');
    setIsAnimating(true);
    if (searchQuery.toLowerCase() === term.toLowerCase()) {
      setSearchQuery('');
    } else {
      setSearchQuery(term);
    }
    searchInputRef.current?.focus();
    setTimeout(() => {
      setIsAnimating(false);
    }, 150);
  };

  // Comprehensive multi-field search and category filtering
  const filteredProjects = projects.filter((p) => {
    // 1. Search Query Matcher
    const query = searchQuery.trim().toLowerCase();
    let matchesSearch = true;

    if (query) {
      const titleMatch = p.title?.toLowerCase().includes(query);
      const descMatch = p.description?.toLowerCase().includes(query);
      const taglineMatch = p.tagline?.toLowerCase().includes(query);
      const badgeMatch = p.badge?.toLowerCase().includes(query);
      const highlightMatch = p.highlight?.toLowerCase().includes(query);
      const categoryMatch = p.category?.toLowerCase().includes(query);

      const techMatch = Array.isArray(p.technologies) && p.technologies.some(t =>
        t.toLowerCase().includes(query)
      );

      const categoriesMatch = Array.isArray(p.categories) && p.categories.some(c =>
        c.toLowerCase().includes(query)
      );

      const tagsMatch = Array.isArray(p.tags) && p.tags.some(t =>
        t.toLowerCase().includes(query)
      );

      const metricsMatch = Array.isArray(p.keyMetrics) && p.keyMetrics.some(km =>
        km.label?.toLowerCase().includes(query) || km.value?.toLowerCase().includes(query)
      );

      // Smart domain synonym matching for recruiter terms (react, python, sql, power bi, api)
      let aliasMatch = false;
      if (query === 'power bi' || query === 'powerbi' || query === 'bi') {
        aliasMatch = p.category === 'Data Analytics' || 
          (Array.isArray(p.technologies) && p.technologies.some(t => t.toLowerCase().includes('power bi') || t.toLowerCase().includes('analytics'))) ||
          (Array.isArray(p.keyMetrics) && p.keyMetrics.some(km => km.value?.toLowerCase().includes('power bi') || km.label?.toLowerCase().includes('power bi')));
      } else if (query === 'sql') {
        aliasMatch = (Array.isArray(p.technologies) && p.technologies.some(t => t.toLowerCase().includes('sql') || t.toLowerCase().includes('mysql'))) ||
          (Array.isArray(p.keyMetrics) && p.keyMetrics.some(km => km.value?.toLowerCase().includes('sql')));
      } else if (query === 'react') {
        aliasMatch = p.category === 'React' || (Array.isArray(p.technologies) && p.technologies.some(t => t.toLowerCase().includes('react')));
      } else if (query === 'python') {
        aliasMatch = p.category === 'Python' || (Array.isArray(p.technologies) && p.technologies.some(t => t.toLowerCase().includes('python')));
      } else if (query === 'api') {
        aliasMatch = (Array.isArray(p.technologies) && p.technologies.some(t => t.toLowerCase().includes('api'))) ||
          p.tagline?.toLowerCase().includes('api') ||
          p.description?.toLowerCase().includes('api');
      }

      matchesSearch = Boolean(
        titleMatch || descMatch || taglineMatch || badgeMatch ||
        highlightMatch || categoryMatch || techMatch || categoriesMatch || tagsMatch || metricsMatch || aliasMatch
      );
    }

    if (!matchesSearch) return false;

    // 2. Category Filter Matcher
    if (activeFilter === 'All Projects') return true;

    if (p.categories && Array.isArray(p.categories)) {
      return p.categories.includes(activeFilter);
    }

    // Fallback matching
    if (activeFilter === 'Data Analysis') {
      return p.category === 'Data Analytics' || (p.technologies && p.technologies.some(t => t.toLowerCase().includes('data') || t.toLowerCase().includes('analytics') || t.toLowerCase().includes('power bi')));
    }
    if (activeFilter === 'Python Projects') {
      return p.category === 'Python' || (p.technologies && p.technologies.some(t => t.toLowerCase().includes('python')));
    }
    if (activeFilter === 'SQL Projects') {
      return p.technologies && p.technologies.some(t => t.toLowerCase().includes('sql') || t.toLowerCase().includes('mysql'));
    }
    if (activeFilter === 'React Projects') {
      return p.category === 'React' || (p.technologies && p.technologies.some(t => t.toLowerCase().includes('react')));
    }
    if (activeFilter === 'Frontend Projects') {
      return p.category === 'Web Development' || p.category === 'React' || (p.technologies && p.technologies.some(t => t.toLowerCase().includes('javascript') || t.toLowerCase().includes('html') || t.toLowerCase().includes('css') || t.toLowerCase().includes('react')));
    }
    if (activeFilter === 'Full-Stack Projects') {
      return p.technologies && p.technologies.some(t => t.toLowerCase().includes('node') || t.toLowerCase().includes('express') || t.toLowerCase().includes('groq'));
    }

    return true;
  });

  // Calculate count for each filter category
  const getFilterCount = (filterName) => {
    if (filterName === 'All Projects') return projects.length;
    return projects.filter(p => {
      if (p.categories && Array.isArray(p.categories)) {
        return p.categories.includes(filterName);
      }
      return false;
    }).length;
  };

  return (
    <section id="projects" className="relative py-20 sm:py-28 overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3 shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            <FolderGit2 className="w-3.5 h-3.5 shrink-0" />
            <span>04 // GITHUB REPOSITORIES</span>
          </div>

          <h2
            className="font-extrabold font-heading text-white tracking-tight"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}
          >
            Engineering &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Software Projects</span>
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-3 font-sans">
            Directly connected to Imran Ahmad's verified GitHub profile (
            <a 
              href="https://github.com/Imran123-code" 
              target="_blank" 
              rel="noreferrer" 
              className="text-cyan-400 hover:underline font-mono"
            >
              @Imran123-code
            </a>
            ). Priority-ranked with highest-value projects first.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mt-4" />

          {/* GitHub Live Status Badge */}
          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/60 px-3.5 py-1 rounded-full border border-slate-800">
            <span className={`w-2 h-2 rounded-full shrink-0 ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}`} />
            <span>{isLive ? 'Live GitHub Sync Connected' : 'Verified GitHub Dataset Active'}</span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* REDESIGNED PREMIUM SEARCH BAR COMPONENT                       */}
        {/* ------------------------------------------------------------- */}
        <div className="w-full max-w-3xl mx-auto mb-8 px-2 sm:px-0">
          <div className="relative group">
            {/* Ambient soft glow on focus & gentle hover flare */}
            <div
              className={`absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500/25 via-sky-500/20 to-blue-600/25 blur-xl transition-all duration-500 pointer-events-none ${
                isSearchFocused
                  ? 'opacity-100 scale-102 ring-2 ring-cyan-400/20'
                  : 'opacity-0 group-hover:opacity-40'
              }`}
            />

            {/* Pill shaped glassmorphism frame with subtle border */}
            <div
              className={`relative rounded-full p-[1.5px] transition-all duration-300 ease-out ${
                isSearchFocused
                  ? 'bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 shadow-[0_0_35px_rgba(0,242,254,0.35),0_0_15px_rgba(59,130,246,0.25)] scale-[1.015]'
                  : 'bg-gradient-to-r from-cyan-500/30 via-slate-800/80 to-blue-500/30 hover:from-cyan-400/50 hover:via-slate-700/80 hover:to-blue-400/50 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
              }`}
            >
              {/* Inner glassmorphism background */}
              <div className="relative flex items-center w-full bg-slate-950/90 backdrop-blur-2xl rounded-full px-4 sm:px-5 py-2.5 sm:py-3 transition-all duration-300">
                
                {/* Glowing Search Icon inside the input */}
                <div className="flex items-center justify-center shrink-0 pr-3 pointer-events-none select-none">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isSearchFocused
                        ? 'bg-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.4)] scale-110'
                        : 'bg-slate-900/80 text-slate-400 group-hover:text-cyan-400 group-hover:bg-slate-900'
                    }`}
                  >
                    <Search className="w-4 h-4 transition-transform duration-200" />
                  </div>
                </div>

                {/* Input element */}
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => { setIsSearchFocused(true); playSound('hover'); }}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search projects..."
                  className="w-full bg-transparent text-sm sm:text-base text-slate-100 placeholder:text-slate-400/80 focus:outline-none font-sans font-normal tracking-wide py-1 select-text"
                  aria-label="Search projects"
                />

                {/* Right side controls: Clear '×' button when text entered or keyboard shortcut when empty */}
                <div className="flex items-center shrink-0 pl-2">
                  {searchQuery ? (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      onMouseEnter={() => playSound('hover')}
                      className="p-1.5 sm:p-2 rounded-full bg-slate-800/90 hover:bg-cyan-500 text-slate-300 hover:text-slate-950 transition-all duration-200 cursor-pointer flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)] active:scale-90"
                      title="Clear search"
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                    </button>
                  ) : (
                    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-400 select-none shadow-inner">
                      <span className="text-[10px] text-slate-500">Press</span>
                      <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700/80 text-cyan-400 font-semibold text-[10px]">
                        /
                      </kbd>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Quick Search Tag Suggestions — horizontal scroll on mobile */}
            <div className="flex items-center gap-1.5 mt-3 text-xs font-mono text-slate-400 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
              <span className="text-[11px] text-slate-500 mr-1 flex items-center gap-1 shrink-0">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Quick:</span>
              </span>
              {['React', 'Python', 'SQL', 'Power BI', 'API', 'JavaScript'].map((tag) => {
                const isSelected = searchQuery.toLowerCase() === tag.toLowerCase();
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleQuickSearch(tag.toLowerCase())}
                    onMouseEnter={() => playSound('hover')}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono transition-all duration-200 cursor-pointer shrink-0 touch-manipulation ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(0,242,254,0.3)]'
                        : 'bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-cyan-300'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MODERN INTERACTIVE FILTER BAR                                 */}
        {/* ------------------------------------------------------------- */}
        <div className="mb-8">
          <div className="p-2 sm:p-2.5 rounded-2xl sm:rounded-full bg-slate-950/80 border border-slate-800/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center justify-center">
            
            {/* Horizontal Scrollable Filter Pills Container */}
            <div className="w-full overflow-x-auto no-scrollbar scroll-smooth flex items-center justify-start sm:justify-center gap-1.5 px-1 py-0.5">
              {PROJECT_FILTERS.map((filter) => {
                const isActive = activeFilter === filter;
                const count = getFilterCount(filter);
                return (
                  <button
                    key={filter}
                    onClick={() => handleFilterClick(filter)}
                    onMouseEnter={() => playSound('hover')}
                    className={`relative whitespace-nowrap px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-2 cursor-pointer shrink-0 select-none ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-[0_0_20px_rgba(0,242,254,0.45)] scale-102'
                        : 'bg-slate-900/60 text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 border border-slate-800/60'
                    }`}
                  >
                    <span>{filter}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-sans transition-colors ${
                        isActive
                          ? 'bg-slate-950/30 text-slate-950 font-semibold'
                          : 'bg-slate-800/80 text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Results Counter & Context Bar */}
          <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 px-3 mt-4 gap-2">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  filteredProjects.length > 0 ? 'bg-cyan-400 animate-pulse' : 'bg-rose-400'
                }`}
              />
              <span className="text-white font-medium">
                {filteredProjects.length} {filteredProjects.length === 1 ? 'project found' : 'projects found'}
              </span>
              {searchQuery && (
                <span className="text-cyan-400 truncate max-w-xs flex items-center gap-1">
                  <span>matching</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 font-semibold">
                    "{searchQuery}"
                  </span>
                </span>
              )}
            </div>

            <div className="text-slate-500 text-[11px] flex items-center gap-1.5 ml-auto">
              <span>Filter:</span>
              <span className="text-slate-300 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
                {activeFilter}
              </span>
            </div>
          </div>
        </div>

        {/* PROJECT CARDS GRID */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 transition-all duration-300 ease-out ${
            isAnimating ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'
          }`}
        >
          {filteredProjects.map((project, idx) => (
            <Project3DCard key={`${project.id}-${activeFilter}-${idx}`} project={project} index={idx + 1} />
          ))}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* CLEAN EMPTY STATE WHEN NOTHING MATCHES                        */}
        {/* ------------------------------------------------------------- */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 px-6 bg-slate-950/70 rounded-3xl border border-slate-800/90 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] max-w-xl mx-auto my-8 animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-4 shadow-[0_0_20px_rgba(0,242,254,0.25)]">
              <Search className="w-7 h-7 text-cyan-400" />
            </div>
            
            <h3 className="text-xl font-bold font-heading text-white mb-2">
              No projects found
            </h3>
            
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-6 font-sans">
              {searchQuery ? (
                <>
                  No projects matching <span className="text-cyan-300 font-mono font-medium">"{searchQuery}"</span> were found in <span className="text-slate-200 font-mono">{activeFilter}</span>. Try adjusting your search query or clear the filter.
                </>
              ) : (
                <>
                  No projects found in <span className="text-slate-200 font-mono">{activeFilter}</span>.
                </>
              )}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-mono text-xs font-bold hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(0,242,254,0.3)] cursor-pointer active:scale-95"
                >
                  Clear Search
                </button>
              )}
              {activeFilter !== 'All Projects' && (
                <button
                  type="button"
                  onClick={() => { setActiveFilter('All Projects'); playSound('click'); }}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white font-mono text-xs font-medium transition-colors cursor-pointer active:scale-95"
                >
                  Reset to All Projects
                </button>
              )}
            </div>
          </div>
        )}

        {/* Bottom GitHub CTA link */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/Imran123-code"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => playSound('hover')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/60 text-slate-200 hover:text-white font-mono text-xs font-medium shadow-[0_0_25px_rgba(0,0,0,0.5)] transition-all group cursor-pointer"
          >
            <Github className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Explore All 41+ Repositories Directly on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-300 transition-colors" />
          </a>
        </div>

      </div>
    </section>
  );
}

function Project3DCard({ project, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
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
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out'
      }}
      className="group relative rounded-3xl bg-slate-950/70 border border-slate-800/80 p-6 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.6)] hover:border-cyan-500/50 hover:shadow-[0_0_35px_rgba(0,242,254,0.18)] flex flex-col justify-between overflow-hidden"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-[10px] font-bold flex items-center justify-center">
              {index < 10 ? `0${index}` : index}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-300 font-semibold tracking-wide">
              {project.category}
            </span>
          </div>

          {project.liveUrl && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Demo
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
          {project.title}
        </h3>

        <h4 className="text-xs font-mono text-cyan-400/80 mt-1 mb-3">
          {project.tagline}
        </h4>

        <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3">
          {project.description}
        </p>

        {/* Assigned Category Pills */}
        {project.categories && project.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {project.categories.map((cat, i) => (
              <span
                key={i}
                className="text-[9px] font-mono px-2 py-0.2 rounded-full bg-cyan-950/40 text-cyan-300/80 border border-cyan-800/30"
              >
                #{cat.replace(' Projects', '')}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Tech Stack & Action Links */}
      <div className="mt-6 pt-4 border-t border-slate-800/60 flex flex-col gap-4">
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800/80 text-slate-300"
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
              <span>Launch App</span>
            </a>
          ) : (
            <span className="text-[10px] font-mono text-slate-500">Repository</span>
          )}
        </div>
      </div>
    </div>
  );
}
