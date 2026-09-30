import React from 'react';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { HeroSculptureA } from './artworks/HeroSculptureA';

interface HeroProps {
  onExploreFonts: () => void;
  onWatchStory: () => void;
  onOpenStudio?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreFonts, onWatchStory, onOpenStudio }) => {
  return (
    <section 
      id="home"
      className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `radial-gradient(ellipse 90% 70% at 75% 45%, rgba(220, 38, 38, 0.16) 0%, rgba(5, 5, 7, 0.92) 80%), url('/bgmax.png'), url('/bg.png')`
      }}
    >
      {/* Subtle atmospheric vignette and top-fade for seamless navbar blend */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/90 via-transparent to-[#050507] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(220,38,38,0.08)_0%,_transparent_60%)] pointer-events-none" />

      {/* Main Container - Centered and Fully Responsive */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: HERO TYPOGRAPHY & CALLS TO ACTION */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6 pt-4 sm:pt-8 text-left">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em] text-zinc-400 font-medium">
                TYPE FOUNDRY & CREATIVE STUDIO
              </span>
            </div>

            {/* Giant Title: Alphaxen-FontLab™ */}
            <div className="space-y-1">
              <h1 className="font-display-serif text-5xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.2rem] font-bold tracking-tight text-white leading-[1.02]">
                <span className="block drop-shadow-[0_4px_25px_rgba(255,255,255,0.15)]">
                  Alphaxen-
                </span>
                <span className="block drop-shadow-[0_4px_30px_rgba(255,255,255,0.15)]">
                  FontLab<sup className="text-2xl sm:text-3xl font-sans font-light text-zinc-400 align-super ml-1">™</sup>
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <h2 className="text-xl sm:text-2xl font-medium text-zinc-200 tracking-tight">
              Unique Fonts. Bold Ideas. Endless Possibilities.
            </h2>

            {/* Narrative Paragraph */}
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed font-light">
              We craft expressive typefaces for dreamers, designers and visionaries. 
              From experimental forms to timeless classics — Alphaxen-FontLab brings your 
              ideas to life through type.
            </p>

            {/* Call to Actions (matching image.png) */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Primary button: Explore Fonts -> */}
              <button
                onClick={onExploreFonts}
                className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white font-semibold text-sm sm:text-base shadow-[0_0_25px_rgba(220,38,38,0.55)] hover:shadow-[0_0_35px_rgba(220,38,38,0.75)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
              >
                <span>Explore Fonts</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* FontLab Application Software launcher */}
              {onOpenStudio && (
                <button
                  onClick={onOpenStudio}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-red-500/50 bg-[#12151d]/90 hover:bg-red-950/40 text-zinc-100 hover:text-white font-medium text-sm transition-all hover:border-red-400 cursor-pointer shadow-[0_0_15px_rgba(220,38,38,0.2)] group"
                >
                  <span className="w-2 h-2 rounded-full bg-red-500 group-hover:animate-ping" />
                  <span>Launch FontLab App</span>
                </button>
              )}

              {/* Secondary button: Watch Our Story */}
              <button
                onClick={onWatchStory}
                className="inline-flex items-center gap-3 text-sm sm:text-base text-zinc-300 hover:text-white transition-colors cursor-pointer group py-2"
              >
                <div className="w-10 h-10 rounded-full border border-zinc-700 group-hover:border-zinc-500 flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm transition-all group-hover:scale-105">
                  <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-medium text-xs sm:text-sm">Watch Our Story</span>
                  <span className="text-[11px] text-zinc-400 font-mono">1:42</span>
                </div>
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="pt-8 sm:pt-12">
              <button
                onClick={onExploreFonts}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer group"
              >
                <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:translate-y-1 transition-transform" />
                <span>Scroll</span>
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: 3D HERO SCULPTURAL 'A' WITH GLOWING CRIMSON RING */}
          <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center relative">
            <HeroSculptureA />
          </div>

        </div>
      </div>
    </section>
  );
};
