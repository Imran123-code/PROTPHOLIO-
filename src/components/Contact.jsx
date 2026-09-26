import React, { useState } from 'react';
import { Mail, Send, Copy, Check, Sparkles, MessageSquare, Phone, MapPin } from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import { playSound } from '../utils/soundEffects';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    playSound('click');
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playSound('success');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 }
    });

    setSubmitted(true);
    const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry from ' + formData.name)}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.name + ' (' + formData.email + ')')}`;
    window.location.href = mailto;
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 overflow-hidden border-t border-slate-900 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3 shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            <Mail className="w-3.5 h-3.5 shrink-0" />
            <span>07 // GET IN TOUCH</span>
          </div>

          <h2
            className="font-extrabold font-heading text-white tracking-tight"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}
          >
            Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Together</span>
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3 font-sans">
            Reach out for software development roles, data analytics opportunities, or engineering collaborations.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mt-4" />
        </div>

        {/* Contact Grid: Info Cards (5 cols) & Modern Form (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Direct Contact Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Primary Email Card with Quick Copy */}
            <div className="rounded-3xl bg-slate-950/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] group hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-heading text-white">Direct Email</h3>
                  <span className="text-xs font-mono text-cyan-400">{personalInfo.email}</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 mb-4 font-sans">
                Feel free to email me directly regarding open roles, internship opportunities, or technical inquiries.
              </p>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs">
                <span className="text-slate-200 select-all truncate mr-2">{personalInfo.email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/40 transition-all flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Phone from resume */}
              <div className="mt-3 flex items-center gap-2 p-3 rounded-2xl bg-slate-900/60 border border-slate-800 font-mono text-xs text-slate-300">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>{personalInfo.phone}</span>
              </div>
            </div>

            {/* Social Channels Card */}
            <div className="rounded-3xl bg-slate-950/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                Official Channels
              </h3>

              {/* GitHub */}
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => playSound('hover')}
                className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 flex items-center justify-between transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">GitHub Profile</h4>
                    <p className="text-xs font-mono text-slate-400">@Imran123-code (41+ Repositories)</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-400 group-hover:translate-x-1 transition-transform">→</span>
              </a>

              {/* LinkedIn */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => playSound('hover')}
                className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 flex items-center justify-between transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">LinkedIn Profile</h4>
                    <p className="text-xs font-mono text-slate-400">Ahmad Imran Mir (Verified)</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-blue-400 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

            {/* University Tag */}
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 font-mono text-xs text-slate-400 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span className="break-words">{personalInfo.location} • {personalInfo.university}</span>
            </div>

          </div>

          {/* Right Column: Modern Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="h-full rounded-3xl bg-slate-950/80 border border-cyan-500/20 p-6 sm:p-10 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.6)] flex flex-col justify-between">
              
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-2 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  <span>Send a Message</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-8 font-sans">
                  Send a direct message regarding opportunities, technical projects, or questions.
                </p>

                {submitted && (
                  <div className="mb-6 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-3 animate-fade-in">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Thank you! Your email client was opened with your message pre-filled.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-sans transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-sans transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Opportunity / Collaboration / Project"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-sans transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                      Message Content *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-sans transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    onMouseEnter={() => playSound('hover')}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-slate-950 font-mono font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(0,242,254,0.35)] hover:shadow-[0_0_45px_rgba(0,242,254,0.6)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer touch-manipulation"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Imran</span>
                  </button>
                </form>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
