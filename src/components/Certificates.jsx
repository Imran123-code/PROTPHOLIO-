import React, { useState, useEffect } from 'react';
import { Award, Calendar, ShieldCheck, Copy, Check, Filter, Sparkles, AlertCircle, ZoomIn, X, ExternalLink, Download, FileBadge2 } from 'lucide-react';
import { certificationsData } from '../data/portfolioData';
import { playSound } from '../utils/soundEffects';

// All potential category filters as requested (Web Development is strictly excluded)
// Only categories that actually contain at least one certificate will be shown in the UI
const RELEVANT_FILTER_ORDER = [
  'All',
  'Data Analytics',
  'Power BI',
  'Excel',
  'AI / Machine Learning',
  'Python',
  'SQL',
  'Other'
];

export default function Certificates() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [copiedId, setCopiedId] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Keyboard shortcut listener to close image modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedCertificate) {
        setSelectedCertificate(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCertificate]);

  // Compute active filters: Only include a category if at least one certificate belongs to it
  // ("Only display a category if there is at least one certificate belonging to that category.")
  const availableFilters = RELEVANT_FILTER_ORDER.filter((filter) => {
    if (filter === 'All') return true;
    return certificationsData.some((cert) => cert.categories && cert.categories.includes(filter));
  });

  const handleFilterClick = (filter) => {
    if (filter === activeFilter) return;
    playSound('click');
    setIsAnimating(true);
    setActiveFilter(filter);
    setTimeout(() => {
      setIsAnimating(false);
    }, 200);
  };

  const handleCopyId = (e, credentialId) => {
    e.stopPropagation();
    if (!credentialId) return;
    navigator.clipboard.writeText(credentialId);
    playSound('click');
    setCopiedId(credentialId);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleOpenPreview = (cert) => {
    if (!cert.image) return;
    playSound('click');
    setSelectedCertificate(cert);
  };

  // Filter matching logic based on actual certificate content
  const filteredCertificates = certificationsData.filter((cert) => {
    if (activeFilter === 'All') return true;
    return cert.categories && cert.categories.includes(activeFilter);
  });

  const getFilterCount = (filterName) => {
    if (filterName === 'All') return certificationsData.length;
    return certificationsData.filter(
      (cert) => cert.categories && cert.categories.includes(filterName)
    ).length;
  };

  return (
    <section id="certifications" className="relative py-20 sm:py-28 overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3 shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            <Award className="w-3.5 h-3.5 shrink-0" />
            <span>07 // VERIFIED CERTIFICATES &amp; CREDENTIALS</span>
          </div>

          <h2
            className="font-extrabold font-heading text-white tracking-tight"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}
          >
            Official Certificates &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Accreditations</span>
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-3 font-sans">
            Complete credentials verified from official certificate declarations and authenticated LinkedIn profile certifications.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mt-4" />
        </div>

        {/* CATEGORY FILTER BAR */}
        <div className="mb-8 sm:mb-10 max-w-3xl mx-auto">
          <div className="p-2 sm:p-2.5 rounded-2xl sm:rounded-full bg-slate-950/80 border border-slate-800/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center">
            
            <div className="w-full overflow-x-auto no-scrollbar scroll-smooth flex items-center gap-2 px-1 py-0.5">
              {availableFilters.map((filter) => {
                const isActive = activeFilter === filter;
                const count = getFilterCount(filter);
                return (
                  <button
                    key={filter}
                    onClick={() => handleFilterClick(filter)}
                    onMouseEnter={() => playSound('hover')}
                    className={`relative whitespace-nowrap px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-2 cursor-pointer shrink-0 select-none touch-manipulation ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-[0_0_20px_rgba(0,242,254,0.45)] scale-102'
                        : 'bg-slate-900/60 text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 border border-slate-800/60'
                    }`}
                  >
                    <span>{filter}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-sans transition-colors ${
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

          {/* Filter Status Line */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-3 mt-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-white font-medium">
                {filteredCertificates.length} {filteredCertificates.length === 1 ? 'certificate displayed' : 'certificates displayed'}
              </span>
            </div>
            <div className="text-slate-500 text-[11px] hidden sm:block">
              Filter: <span className="text-cyan-300 font-semibold">{activeFilter}</span>
            </div>
          </div>
        </div>

        {/* CERTIFICATE CARDS GRID */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 max-w-5xl mx-auto transition-all duration-300 ease-out ${
            isAnimating ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'
          }`}
        >
          {filteredCertificates.map((cert) => (
            <CertificateCard
              key={cert.id}
              certificate={cert}
              copiedId={copiedId}
              onCopyId={handleCopyId}
              onPreview={handleOpenPreview}
            />
          ))}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* EMPTY STATE (Fallback)                                        */}
        {/* ------------------------------------------------------------- */}
        {filteredCertificates.length === 0 && (
          <div className="text-center py-16 px-6 bg-slate-950/70 rounded-3xl border border-slate-800/90 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] max-w-xl mx-auto my-6 animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-4 shadow-[0_0_20px_rgba(0,242,254,0.2)]">
              <AlertCircle className="w-7 h-7" />
            </div>
            
            <h3 className="text-xl font-bold font-heading text-white mb-2">
              No certificates in {activeFilter}
            </h3>
            
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-6 font-sans">
              Currently no certificates match the category <span className="text-cyan-300 font-mono">"{activeFilter}"</span>.
            </p>

            <button
              type="button"
              onClick={() => { setActiveFilter('All'); playSound('click'); }}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-mono text-xs font-bold hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(0,242,254,0.3)] cursor-pointer active:scale-95"
            >
              View All Certificates
            </button>
          </div>
        )}

      </div>

      {/* ------------------------------------------------------------- */}
      {/* HIGH-RES CERTIFICATE PREVIEW MODAL LIGHTBOX                   */}
      {/* ------------------------------------------------------------- */}
      {selectedCertificate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fade-in select-none"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-900/95 border border-cyan-500/40 rounded-3xl shadow-[0_0_60px_rgba(0,242,254,0.3)] overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
              <div className="flex items-center gap-3">
                <OrganizationEmblem org={selectedCertificate.orgLogo} />
                <div>
                  <h3 id="certificate-modal-title" className="text-base sm:text-lg font-bold font-heading text-white">
                    {selectedCertificate.title}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400/90">
                    {selectedCertificate.organization} • {selectedCertificate.issueDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {selectedCertificate.image && (
                  <a
                    href={selectedCertificate.image}
                    target="_blank"
                    rel="noreferrer"
                    download
                    title="Download Certificate Image"
                    className="p-2 rounded-xl bg-slate-800 hover:bg-cyan-500 text-slate-300 hover:text-slate-950 transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedCertificate(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500 text-slate-300 hover:text-white transition-colors flex items-center justify-center cursor-pointer"
                  aria-label="Close certificate preview"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Modal Body: Distortion-Free High-Res Certificate Image */}
            <div className="p-4 sm:p-6 overflow-y-auto flex items-center justify-center bg-slate-950/40">
              <div className="relative group max-w-full">
                <img
                  src={selectedCertificate.image}
                  alt={`${selectedCertificate.title} issued by ${selectedCertificate.organization}`}
                  className="w-auto max-h-[68vh] max-w-full object-contain rounded-xl border border-slate-700/80 shadow-2xl"
                  loading="eager"
                />
              </div>
            </div>

            {/* Modal Footer: Credential Information */}
            <div className="px-5 py-3.5 border-t border-slate-800/80 bg-slate-950/80 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-3">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Certificate Code:</span>
                <span className="text-cyan-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800 select-all">
                  {selectedCertificate.credentialId}
                </span>
                <button
                  type="button"
                  onClick={(e) => handleCopyId(e, selectedCertificate.credentialId)}
                  className="text-slate-400 hover:text-cyan-300 transition-colors p-1"
                  title="Copy certificate code"
                >
                  {copiedId === selectedCertificate.credentialId ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Declaration of Completion</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

// -------------------------------------------------------------
// INDIVIDUAL CERTIFICATE CARD WITH 3D TILT
// -------------------------------------------------------------
function CertificateCard({ certificate, copiedId, onCopyId, onPreview }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const isClickableForModal = Boolean(certificate.image);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { playSound('hover'); setIsHovered(true); }}
      onMouseLeave={handleMouseLeave}
      onClick={() => isClickableForModal && onPreview(certificate)}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(${isHovered ? '6px' : '0px'})`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out'
      }}
      className={`group relative rounded-3xl bg-slate-950/80 border border-slate-800/80 p-6 sm:p-7 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.6)] hover:border-cyan-500/50 hover:shadow-[0_0_35px_rgba(0,242,254,0.2)] flex flex-col justify-between overflow-hidden ${
        isClickableForModal ? 'cursor-pointer' : ''
      }`}
    >
      {/* Ambient background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-500" />

      <div>
        
        {/* Certificate Image Preview Box (for screenshot-backed certificates) */}
        {certificate.image ? (
          <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 mb-5 shadow-inner group/img aspect-[16/10]">
            <img
              src={certificate.image}
              alt={certificate.title}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex items-end justify-between p-3.5">
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-slate-950/90 border border-slate-800 text-cyan-300 font-semibold flex items-center gap-1.5 shadow-md">
                <OrganizationEmblem org={certificate.orgLogo} className="w-3 h-3" />
                <span>{certificate.badge}</span>
              </span>

              <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-cyan-500/90 text-slate-950 font-bold flex items-center gap-1 shadow-md opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all">
                <ZoomIn className="w-3 h-3" />
                <span>Click to Enlarge</span>
              </span>
            </div>
          </div>
        ) : (
          /* For LinkedIn verified certificates without screenshot image: elegant header badge */
          <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <OrganizationEmblem org={certificate.orgLogo} />
              <div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-semibold tracking-wide">
                  {certificate.badge}
                </span>
                <div className="text-xs font-mono text-cyan-400 font-semibold mt-1">
                  {certificate.issuer}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800">
              <Calendar className="w-3 h-3 text-cyan-400" />
              <span>{certificate.issueDate || certificate.year}</span>
            </div>
          </div>
        )}

        {/* If screenshot exists, display header line below preview */}
        {certificate.image && (
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <OrganizationEmblem org={certificate.orgLogo} className="w-4 h-4" />
              <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wide">
                {certificate.issuer}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800">
              <Calendar className="w-3 h-3 text-cyan-400" />
              <span>{certificate.issueDate}</span>
            </div>
          </div>
        )}

        {/* Certificate Name */}
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-white group-hover:text-cyan-300 transition-colors leading-tight mb-2">
          {certificate.title}
        </h3>

        {/* Organization / Issued By */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 mb-4">
          <span className="text-slate-500">Issued by:</span>
          <span className="text-cyan-400 font-medium">{certificate.organization}</span>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans mb-5 line-clamp-2">
          {certificate.description}
        </p>

        {/* Skills Covered */}
        {certificate.skills && certificate.skills.length > 0 && (
          <div className="mb-5">
            <div className="flex flex-wrap gap-1.5">
              {certificate.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 group-hover:border-slate-700 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Card Footer: Credential ID & Action Buttons */}
      <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-3">

        {/* Credential ID row — full width with truncation */}
        <div className="flex items-center gap-1.5 min-w-0 bg-slate-900/90 border border-slate-800 px-2.5 py-1.5 rounded-xl overflow-hidden">
          <span className="text-[10px] font-mono text-slate-500 shrink-0 whitespace-nowrap">
            {certificate.source === 'screenshot' ? 'Code:' : 'ID:'}
          </span>
          <span className="text-[11px] font-mono text-slate-200 font-bold select-all truncate min-w-0 flex-1">
            {certificate.credentialId}
          </span>
          <button
            type="button"
            onClick={(e) => onCopyId(e, certificate.credentialId)}
            title="Copy Credential ID"
            className="text-slate-400 hover:text-cyan-400 p-0.5 shrink-0 transition-colors cursor-pointer"
          >
            {copiedId === certificate.credentialId ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Action buttons row */}
        <div className="flex items-center gap-2 flex-wrap">
          {certificate.image && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onPreview(certificate); }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,242,254,0.3)] hover:shadow-[0_0_20px_rgba(0,242,254,0.45)] cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>View Certificate</span>
            </button>
          )}

          {certificate.credentialUrl && (
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="Verify Credential"
              className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 font-mono text-xs font-semibold transition-all border border-slate-700 hover:border-cyan-500/50 cursor-pointer shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Verify</span>
            </a>
          )}

          {!certificate.image && !certificate.credentialUrl && (
            <span className="text-xs font-mono text-slate-500 italic">No preview available</span>
          )}
        </div>

      </div>

    </div>
  );
}

// -------------------------------------------------------------
// ORGANIZATION EMBLEM LOGO RENDERER
// -------------------------------------------------------------
function OrganizationEmblem({ org, className = "w-5 h-5" }) {
  if (org === 'microsoft') {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-label="Microsoft Logo">
        <rect x="1" y="1" width="10" height="10" fill="#F25022" />
        <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
        <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
        <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
      </svg>
    );
  }

  if (org === 'shell') {
    return (
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 via-rose-500/10 to-cyan-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 3.84 2.16 7.18 5.34 8.87.21-.19.46-.35.74-.47 1.13-.48 2.05-1.4 2.53-2.53.12-.28.28-.53.47-.74-.87-.33-1.66-.84-2.31-1.49-1.56-1.56-2.34-3.64-2.34-5.72s.78-4.16 2.34-5.72C10.34 4.63 12 4.4 12 4.4s1.66.23 3.23 1.8c1.56 1.56 2.34 3.64 2.34 5.72s-.78 4.16-2.34 5.72c-.65.65-1.44 1.16-2.31 1.49.19.21.35.46.47.74.48 1.13 1.4 2.05 2.53 2.53.28.12.53.28.74.47 3.18-1.69 5.34-5.03 5.34-8.87 0-5.52-4.48-10-10-10z" />
        </svg>
      </div>
    );
  }

  if (org === 'tata') {
    return (
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/30 via-cyan-500/20 to-indigo-600/30 border border-blue-500/40 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(59,130,246,0.25)]">
        <span className="font-heading font-black text-xs tracking-tight">TATA</span>
      </div>
    );
  }

  if (org === 'scaler') {
    return (
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/30 via-blue-400/20 to-indigo-500/30 border border-blue-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.25)]">
        <span className="font-heading font-black text-[11px] tracking-tight text-blue-300">S</span>
      </div>
    );
  }

  if (org === 'ibm') {
    return (
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700/40 via-blue-500/20 to-cyan-600/30 border border-blue-600/50 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.3)]">
        <span className="font-heading font-black text-[11px] tracking-tight text-blue-200">IBM</span>
      </div>
    );
  }

  if (org === 'govt') {
    return (
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/30 via-white/5 to-green-600/30 border border-orange-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.25)]">
        <span className="font-heading font-black text-[10px] tracking-tight text-orange-300">GOI</span>
      </div>
    );
  }

  if (org === 'sou') {
    return (
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600/30 via-violet-400/20 to-indigo-600/30 border border-purple-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.25)]">
        <span className="font-heading font-black text-[10px] tracking-tight text-purple-300">SOU</span>
      </div>
    );
  }

  return (
    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
      <FileBadge2 className="w-5 h-5" />
    </div>
  );
}
