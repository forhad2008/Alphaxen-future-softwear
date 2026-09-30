import React from 'react';
import { ArrowRight, Shirt, ShoppingBag, Box, Layers, Globe } from 'lucide-react';

interface MoreThanFontsProps {
  onSelectCategory: (category: string) => void;
  onExploreWorld: () => void;
}

export const MoreThanFonts: React.FC<MoreThanFontsProps> = ({
  onSelectCategory,
  onExploreWorld
}) => {
  return (
    <section className="border-t border-zinc-900 bg-gradient-to-r from-[#07070a] via-[#09090e] to-[#07070a] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* LEFT: TITLE & SUBTITLE */}
          <div className="space-y-1">
            <h2 className="font-display-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              More Than Fonts
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              We're a creative studio for typography, design and digital art.
            </p>
          </div>

          {/* MIDDLE: 4 CATEGORIES (matching image.png) */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            {/* 1. Aa Fonts */}
            <button
              onClick={() => onSelectCategory('fonts')}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 hover:text-white text-zinc-300 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              <span className="font-serif font-bold text-base leading-none">Aa</span>
              <span>Fonts</span>
            </button>

            {/* 2. Soft-Wear */}
            <button
              onClick={() => onSelectCategory('apparel')}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 hover:text-white text-zinc-300 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              <Shirt className="w-4 h-4 text-zinc-400" />
              <span>Soft-Wear</span>
            </button>

            {/* 3. Merchandise */}
            <button
              onClick={() => onSelectCategory('merch')}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 hover:text-white text-zinc-300 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-zinc-400" />
              <span>Merchandise</span>
            </button>

            {/* 4. Digital Assets */}
            <button
              onClick={() => onSelectCategory('digital')}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 hover:text-white text-zinc-300 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              <Box className="w-4 h-4 text-zinc-400" />
              <span>Digital Assets</span>
            </button>
          </div>

          {/* RIGHT: EXPLORE OUR WORLD LINK */}
          <div className="shrink-0">
            <button
              onClick={onExploreWorld}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors cursor-pointer group"
            >
              <span>Explore Our World</span>
              <ArrowRight className="w-4 h-4 text-red-500 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
