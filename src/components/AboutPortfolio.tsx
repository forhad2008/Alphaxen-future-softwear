import React, { useState } from 'react';
import { ShieldCheck, Award, Building2, Send, CheckCircle, Cpu, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AboutPortfolio: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactEmail: '',
    projectScope: 'custom-display',
    timeline: '4-8 weeks',
    budgetTier: '$10k-$25k',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const caseStudies = [
    {
      client: 'NOCTURNE CYBERNETICS',
      industry: 'Futuristic Automotive & UI',
      deliverable: 'Custom 12-Axis Variable Type System',
      description: 'Engineered an ultra-crisp telemetry display font optimized for low-latency OLED instrument clusters with custom Cyrillic, Kanji, and Latin glyph sets.',
      year: '2025'
    },
    {
      client: 'MAISON D’OBSIDIENNE',
      industry: 'Haute Horlogerie & Luxury',
      deliverable: 'Bespoke Chiseled Serif & Wordmark',
      description: 'Sculpted a high-contrast display serif with jewel-cut facet details, deployed across physical titanium dials and global editorial campaigns.',
      year: '2025'
    },
    {
      client: 'VALKYRIE INTERACTIVE',
      industry: 'AAA Game Franchise',
      deliverable: 'Runestone Gothic & Worldbuilding Glyphs',
      description: 'Designed a comprehensive 900-glyph fantasy script with procedural OpenType ligatures that morph runes dynamically during in-game dialogue.',
      year: '2026'
    }
  ];

  return (
    <section id="about" className="py-20 relative bg-[#07070a] border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-[2px] bg-red-600 rounded-full" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400 font-semibold">
              CORPORATE PORTFOLIO & FOUNDRY PEDIGREE
            </span>
          </div>

          <h2 className="font-display-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Architects of Visual Authority
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
            Alphaxen-FontLab operates at the intersection of historical punchcutting craft and modern computational typography. We partner with visionaries, global enterprises, and creative directors to engineer typefaces that define cultural moments.
          </p>
        </div>

        {/* 3 VALUE PILLARS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/40 border border-red-900/40 flex items-center justify-center text-red-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wide">
              Computational Engineering
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Every curve is mathematically harmonized with sub-pixel hinting, optimized sidebearings, and intelligent OpenType GSUB substitution tables.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/40 border border-red-900/40 flex items-center justify-center text-red-400">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wide">
              Global Enterprise Licensing
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Clear, unencumbered perpetual multi-seat licenses with zero telemetry, unlimited pageviews, and broadcast rights for worldwide deployment.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/40 border border-red-900/40 flex items-center justify-center text-red-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wide">
              Bespoke Identity Commissions
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              From proprietary brand wordmarks to full 18-weight variable font families, we craft exclusive proprietary type that cannot be replicated.
            </p>
          </div>
        </div>

        {/* SELECTED CASE STUDIES */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display-serif text-2xl font-bold text-white">
              Selected Foundry Commissions
            </h3>
            <span className="text-xs font-mono text-zinc-400">2024 — 2026 ARCHIVE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((study, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-2xl bg-gradient-to-b from-[#0b0b10] to-[#07070a] border border-zinc-800/80 hover:border-zinc-700 space-y-3 transition-colors"
              >
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-red-400 font-bold">{study.client}</span>
                  <span className="text-zinc-500">{study.year}</span>
                </div>
                <h4 className="text-sm font-bold text-white font-mono">
                  {study.deliverable}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  {study.description}
                </p>
                <span className="text-[10px] font-mono uppercase text-zinc-500 block pt-2">
                  Domain: {study.industry}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* BESPOKE COMMISSION INQUIRY FORM */}
        <div id="contact" className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0c0d12] via-[#09090d] to-[#12070a] border border-zinc-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold">
                COMMISSION A BESPOKE TYPEFACE
              </span>
              <h3 className="font-display-serif text-3xl font-bold text-white leading-tight">
                Have a proprietary type project in mind?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                Connect directly with our senior typographic directors. We review project scopes, charsets, and deliverable timelines within 24 business hours.
              </p>
              <div className="pt-2 text-xs font-mono text-zinc-500 space-y-1">
                <div>Studio HQ: Zurich / London / Tokyo</div>
                <div>Direct Dispatch: studio@alphaxen-fontlab.io</div>
              </div>
            </div>

            <div className="lg:col-span-7">
              {submitted ? (
                <div className="p-8 rounded-2xl bg-zinc-950/80 border border-emerald-900/60 text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">Inquiry Received</h4>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto">
                    Thank you. Our typography director has received your brief and will contact your team within 24 hours with an initial scope proposal.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 block mb-1">Company / Brand Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apex Luxury Studios"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 font-mono focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 block mb-1">Executive Contact Email</label>
                      <input
                        type="email"
                        required
                        placeholder="director@brand.com"
                        value={formData.contactEmail}
                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 font-mono focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 block mb-1">Project Scope</label>
                      <select
                        value={formData.projectScope}
                        onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 font-mono focus:outline-none focus:border-red-500"
                      >
                        <option value="custom-display">Custom Display Typeface (1-3 Weights)</option>
                        <option value="variable-system">Comprehensive Variable Font Family</option>
                        <option value="logomark-wordmark">Exclusive Wordmark & Monogram</option>
                        <option value="enterprise-license">Global Enterprise Font Expansion</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 block mb-1">Target Timeline</label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 font-mono focus:outline-none focus:border-red-500"
                      >
                        <option value="rush">Express Expedited (2-3 weeks)</option>
                        <option value="4-8 weeks">Standard Studio (4-8 weeks)</option>
                        <option value="3-6 months">Enterprise System (3-6 months)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">Project Requirements & Creative Direction</label>
                    <textarea
                      rows={3}
                      placeholder="Outline aesthetic requirements, intended mediums, character set scope..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 font-mono focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white font-semibold text-xs sm:text-sm shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Submit Commission Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
