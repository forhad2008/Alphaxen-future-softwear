import React from 'react';
import { ArrowRight, ArrowUpRight, Sparkles, Layers, Sliders } from 'lucide-react';
import { FEATURED_FONTS } from '../data/fontsData';
import { FontItem } from '../types/fontLab';
import { FontArtwork } from './artworks/FontArtwork';

interface FeaturedCreationsProps {
  onSelectFont: (font: FontItem) => void;
  onOpenFontMaker: () => void;
  onViewAllFonts: () => void;
  onOpenStudioInNewWindow?: () => void;
}

export const FeaturedCreations: React.FC<FeaturedCreationsProps> = ({
  onSelectFont,
  onOpenFontMaker,
  onViewAllFonts,
  onOpenStudioInNewWindow
}) => {
  return (
    <section id="fonts" className="py-20 relative bg-[#050507]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-red-600 rounded-full" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400 font-semibold">
                FEATURED FONTS
              </span>
            </div>
            <h2 className="font-display-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Our Latest Creations
            </h2>
          </div>

          <button
            onClick={onViewAllFonts}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors cursor-pointer group self-start sm:self-auto"
          >
            <span>View All Fonts</span>
            <ArrowRight className="w-4 h-4 text-red-500 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 5-CARD SHOWCASE GRID (4 font cards + 1 large promo card as in image) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* THE 4 FONT CARDS (Span 8 columns on large screens) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURED_FONTS.map((font) => (
              <div
                key={font.id}
                onClick={() => onSelectFont(font)}
                className="group relative bg-[#0a0a0f] border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-700/80 hover:shadow-[0_15px_30px_rgba(0,0,0,0.8)] transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Visual Artwork Thumbnail */}
                <div className="relative w-full h-52 sm:h-56 bg-zinc-950/60 overflow-hidden border-b border-zinc-900">
                  {/* "New" Badge */}
                  {font.isNew && (
                    <div className="absolute top-3.5 right-3.5 z-20">
                      <span className="px-2.5 py-0.5 rounded-full bg-red-600/90 text-white text-[10px] font-bold font-mono tracking-wider shadow-sm">
                        New
                      </span>
                    </div>
                  )}

                  {/* High fidelity Font Artwork */}
                  <FontArtwork id={font.id} className="transition-transform duration-500 group-hover:scale-105" />
                </div>

                {/* Card Bottom Meta */}
                <div className="p-4 sm:p-5 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-zinc-400 block tracking-wider uppercase">
                      {font.classification}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                      {font.name}
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono">
                      {font.formats.join(' / ')}
                    </p>
                  </div>

                  {/* Circular Arrow Button (matching the image) */}
                  <div className="w-9 h-9 rounded-full border border-zinc-800 group-hover:border-red-500/80 group-hover:bg-red-600/10 flex items-center justify-center text-zinc-400 group-hover:text-red-400 transition-all shrink-0 ml-3">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 5th CARD: FONT MAKER & DESIGNER TOOLS PROMO (Span 4 columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#0c0d12] via-[#09090d] to-[#12070a] border border-zinc-800/80 hover:border-red-900/50 transition-all shadow-xl relative overflow-hidden group">
            
            {/* Ambient Red Glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-3 z-10">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-400 block font-semibold">
                FONT MAKER & DESIGNER TOOLS
              </span>
              <h3 className="font-display-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                Create Your Own Font
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                Use our advanced font maker and design tools to bring your ideas into unique typefaces.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                <button
                  onClick={onOpenFontMaker}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-700 bg-zinc-900/80 hover:border-red-500 hover:bg-red-950/20 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer group/btn shadow-[0_0_15px_rgba(220,38,38,0.2)]"
                >
                  <span>Open Font Maker</span>
                  <ArrowRight className="w-3.5 h-3.5 text-red-400 transition-transform group-hover/btn:translate-x-1" />
                </button>

                {onOpenStudioInNewWindow && (
                  <button
                    onClick={onOpenStudioInNewWindow}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full border border-zinc-800 bg-black/60 hover:bg-zinc-900 text-zinc-300 hover:text-white text-xs font-mono transition-all cursor-pointer"
                    title="Launch FontLab Studio in a new window"
                  >
                    <span>New Window</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-red-400" />
                  </button>
                )}
              </div>
            </div>

            {/* Glowing UI Visual Simulation (Mocking the Bézier editor & 3D glyph from screenshot) */}
            <div className="mt-6 pt-4 border-t border-zinc-900/80 relative rounded-xl bg-[#07070a]/90 p-4 border border-zinc-800/60 shadow-inner overflow-hidden">
              {/* Glyph Grid mock */}
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-2 border-b border-zinc-800/50 pb-1">
                <span>GLYPH: U+0041 ('A')</span>
                <span className="text-red-400 font-bold">LIVE OTF</span>
              </div>

              <div className="relative h-36 flex items-center justify-center">
                {/* Coordinate Grid lines */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-15 pointer-events-none">
                  {[...Array(24)].map((_, i) => (
                    <div key={i} className="border border-zinc-700" />
                  ))}
                </div>

                {/* 3D Glowing Red Glyph Graphic */}
                <svg viewBox="0 0 120 120" className="w-28 h-28 drop-shadow-[0_0_15px_rgba(220,38,38,0.6)]">
                  <defs>
                    <linearGradient id="makerGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f87171" />
                      <stop offset="50%" stopColor="#dc2626" />
                      <stop offset="100%" stopColor="#7f1d1d" />
                    </linearGradient>
                  </defs>
                  {/* Stylized letter A with Bézier anchor handles */}
                  <polygon points="60,15 100,105 78,105 68,78 52,78 42,105 20,105" fill="url(#makerGlow)" />
                  <polygon points="60,38 54,65 66,65" fill="#07070a" />
                  
                  {/* Bézier control points simulation */}
                  <circle cx="60" cy="15" r="3" fill="#ffffff" stroke="#ef4444" strokeWidth="1.5" />
                  <circle cx="100" cy="105" r="3" fill="#ffffff" stroke="#ef4444" strokeWidth="1.5" />
                  <circle cx="20" cy="105" r="3" fill="#ffffff" stroke="#ef4444" strokeWidth="1.5" />
                  <circle cx="52" cy="78" r="2.5" fill="#38bdf8" />
                  <circle cx="68" cy="78" r="2.5" fill="#38bdf8" />
                </svg>

                {/* Floating tool pills */}
                <div className="absolute right-2 top-2 flex flex-col gap-1.5">
                  <div className="w-5 h-5 rounded bg-zinc-800/90 border border-zinc-700 flex items-center justify-center text-[10px] text-zinc-300">
                    ✎
                  </div>
                  <div className="w-5 h-5 rounded bg-zinc-800/90 border border-zinc-700 flex items-center justify-center text-[10px] text-zinc-300">
                    ⤹
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
