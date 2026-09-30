import React, { useState } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { FEATURED_FONTS } from '../../data/fontsData';
import { FontItem } from '../../types/fontLab';

interface SearchModalProps {
  onClose: () => void;
  onSelectFont: (font: FontItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onClose, onSelectFont }) => {
  const [query, setQuery] = useState('');

  const filtered = FEATURED_FONTS.filter(
    (f) =>
      f.name.toLowerCase().includes(query.toLowerCase()) ||
      f.style.toLowerCase().includes(query.toLowerCase()) ||
      f.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0b0b10] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* SEARCH INPUT */}
        <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-red-500 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search fonts by name, style, or tag (e.g. gothic, eagle, bear)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white focus:outline-none font-mono"
          />
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* RESULTS LIST */}
        <div className="p-4 max-h-[50vh] overflow-y-auto space-y-2">
          {filtered.length === 0 ? (
            <p className="text-xs text-zinc-500 font-mono text-center py-6">
              No matching typefaces found for "{query}".
            </p>
          ) : (
            filtered.map((font) => (
              <div
                key={font.id}
                onClick={() => {
                  onSelectFont(font);
                  onClose();
                }}
                className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-900 hover:border-red-900/60 hover:bg-red-950/20 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white group-hover:text-red-300 font-display-serif">
                      {font.name}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      {font.classification}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-light">{font.style}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-red-400">${font.price}</span>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="p-3 bg-[#0e0e14] border-t border-zinc-800 text-[11px] font-mono text-zinc-500 flex justify-between">
          <span>Press ESC or click outside to dismiss</span>
          <span className="text-red-400 font-semibold">{filtered.length} typefaces available</span>
        </div>

      </div>
    </div>
  );
};
