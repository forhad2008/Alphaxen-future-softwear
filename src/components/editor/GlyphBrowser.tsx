import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Plus, Sparkles } from 'lucide-react';
import { CustomGlyph, GlyphCategory } from '../../types/fontLab';
import { CATEGORY_CHARACTERS } from '../../data/fontProjectDefaults';

interface GlyphBrowserProps {
  glyphs: CustomGlyph[] | Record<string, CustomGlyph>;
  selectedChar?: string;
  activeChar?: string;
  onSelectChar?: (char: string) => void;
  onSelectGlyph?: (char: string) => void;
  onCreateGlyph?: (char: string) => void;
  onAddGlyph?: (char: string) => void;
}

export const GlyphBrowser: React.FC<GlyphBrowserProps> = ({
  glyphs,
  selectedChar,
  activeChar,
  onSelectChar,
  onSelectGlyph,
  onCreateGlyph,
  onAddGlyph
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<GlyphCategory>('uppercase');

  const currentChar = activeChar || selectedChar || 'A';
  const handleSelect = onSelectGlyph || onSelectChar || (() => {});
  const handleAdd = onAddGlyph || onCreateGlyph || (() => {});

  const glyphsMap: Record<string, CustomGlyph> = Array.isArray(glyphs)
    ? glyphs.reduce<Record<string, CustomGlyph>>((acc, g) => {
        acc[g.char] = g;
        return acc;
      }, {})
    : glyphs;

  const categories: { id: GlyphCategory; label: string }[] = [
    { id: 'uppercase', label: 'Uppercase' },
    { id: 'lowercase', label: 'Lowercase' },
    { id: 'numbers', label: 'Numbers' },
    { id: 'punctuation', label: 'Punctuation' },
    { id: 'symbols', label: 'Symbols' },
    { id: 'currency', label: 'Currency' },
    { id: 'math', label: 'Math' },
    { id: 'arrows', label: 'Arrows' },
    { id: 'ligatures', label: 'Ligatures' },
    { id: 'alternates', label: 'Alternates' }
  ];

  const currentCategoryChars = CATEGORY_CHARACTERS[activeCategory] || [];

  return (
    <div className="bg-[#0B0B0B] border-t border-zinc-900 select-none z-20 shrink-0 transition-all duration-200">
      {/* GLYPH BROWSER HEADER */}
      <div className="px-4 py-2 bg-[#0E0E0E] border-b border-zinc-900 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5">
          <img 
            src="/logo.png" 
            alt="Alphaxen Logo" 
            className="h-5 w-auto max-w-[80px] object-contain shrink-0 hidden sm:inline" 
            onError={(e) => { e.currentTarget.style.display = 'none'; }} 
          />
          <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider font-semibold whitespace-nowrap">
            GLYPH MATRIX:
          </span>

          <div className="flex items-center space-x-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#181818] text-white border border-zinc-700 font-bold'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#121212]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Corner: Logo and Toggle Collapse */}
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <img 
            src="/logo.png" 
            alt="Alphaxen" 
            className="h-4 w-auto object-contain hidden sm:inline" 
            onError={(e) => { e.currentTarget.style.display = 'none'; }} 
          />
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded hover:bg-[#181818] text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-mono"
          >
            <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* GLYPH TILES SCROLLVIEW */}
      {isExpanded && (
        <div className="p-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2">
            {currentCategoryChars.map((char) => {
              const isSelected = currentChar === char;
              const hasCustomOutline = !!glyphsMap[char];
              const unicodeHex = char.length === 1 ? char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0') : 'ALT';

              return (
                <button
                  key={char}
                  onClick={() => {
                    if (!hasCustomOutline) {
                      handleAdd(char);
                    } else {
                      handleSelect(char);
                    }
                  }}
                  className={`w-14 h-16 rounded flex flex-col items-center justify-between p-1.5 transition-all cursor-pointer relative shrink-0 ${
                    isSelected
                      ? 'bg-[#161616] border-2 border-[#E50914] shadow-[0_0_12px_rgba(229,9,20,0.3)]'
                      : hasCustomOutline
                      ? 'bg-[#101010] border border-zinc-800 text-zinc-200 hover:border-zinc-700 hover:bg-[#141414]'
                      : 'bg-[#0E0E0E] border border-zinc-900/60 text-zinc-600 hover:border-zinc-700 hover:text-zinc-400'
                  }`}
                >
                  {/* Glyph symbol preview */}
                  <span className={`text-xl font-display-serif font-bold ${
                    isSelected ? 'text-white' : hasCustomOutline ? 'text-zinc-200' : 'text-zinc-600'
                  }`}>
                    {char}
                  </span>

                  {/* Character Code / Indicator */}
                  <div className="flex items-center justify-between w-full text-[9px] font-mono">
                    <span className={isSelected ? 'text-[#E50914] font-bold' : 'text-zinc-500'}>
                      {unicodeHex}
                    </span>
                    {hasCustomOutline && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
