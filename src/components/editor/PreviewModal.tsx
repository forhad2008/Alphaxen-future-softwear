import React, { useState } from 'react';
import { 
  X, 
  Eye, 
  Sliders, 
  RotateCcw, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Palette,
  Sparkles
} from 'lucide-react';
import { FontProject } from '../../types/fontLab';

interface PreviewModalProps {
  project: FontProject;
  onClose: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ project, onClose }) => {
  const [previewText, setPreviewText] = useState<string>('ALPHAXEN OBSIDIAN\nThe Future of Monumental Typography');
  const [fontSize, setFontSize] = useState<number>(56);
  const [tracking, setTracking] = useState<number>(0);
  const [lineHeight, setLineHeight] = useState<number>(1.2);
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('left');
  const [theme, setTheme] = useState<'dark' | 'light' | 'crimson'>('dark');
  const [activePreset, setActivePreset] = useState<number>(0);
  const [mockupMode, setMockupMode] = useState<'type' | 'poster' | 'apparel' | 'book'>('type');

  const presets = [
    { title: 'Brand Headline', text: 'ALPHAXEN\nFont Design & Computational Foundry' },
    { title: 'Experimental', text: 'EXPERIMENTAL TYPOGRAPHY\nFORGED IN COLD OBSIDIAN STONE' },
    { title: 'Uppercase Ramp', text: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
    { title: 'Lowercase Ramp', text: 'abcdefghijklmnopqrstuvwxyz' },
    { title: 'Numbers & Currency', text: '0123456789 $ € £ ¥ 2026' },
    { title: 'Editorial Paragraph', text: 'Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing.' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#050505] text-white animate-fadeIn select-none">
      
      {/* TOP CONTROLS BAR */}
      <header className="h-16 bg-[#0B0B0B] border-b border-zinc-900 px-6 flex items-center justify-between z-10 shrink-0 text-xs font-mono">
        <div className="flex items-center space-x-5">
          <img 
            src="/logo.png" 
            alt="Alphaxen Logo" 
            className="h-8 w-auto max-w-[120px] object-contain shrink-0" 
            onError={(e) => { e.currentTarget.style.display = 'none'; }} 
          />
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E50914] animate-pulse" />
            <h2 className="font-bold text-white text-sm">
              FULL-SCREEN FONT TESTER & SPECIMEN LAB
            </h2>
          </div>

          <div className="hidden lg:flex items-center gap-2 bg-[#121212] p-1 rounded border border-zinc-800">
            {['type', 'poster', 'apparel', 'book'].map((m) => (
              <button
                key={m}
                onClick={() => setMockupMode(m as any)}
                className={`px-2.5 py-1 rounded capitalize transition-colors cursor-pointer ${
                  mockupMode === m ? 'bg-[#E50914] text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {m} Mockup
              </button>
            ))}
          </div>
        </div>

        {/* Sliders & Close */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center gap-3 bg-[#101010] px-3 py-1.5 rounded border border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">Size:</span>
              <input
                type="range"
                min="14"
                max="140"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-24 accent-[#E50914] h-1 bg-zinc-800 cursor-pointer"
              />
              <span className="text-zinc-200 w-8 text-right">{fontSize}px</span>
            </div>

            <span className="text-zinc-700">|</span>

            <div className="flex items-center gap-2">
              <span className="text-zinc-500">Track:</span>
              <input
                type="range"
                min="-2"
                max="12"
                step="0.5"
                value={tracking}
                onChange={(e) => setTracking(Number(e.target.value))}
                className="w-16 accent-[#E50914] h-1 bg-zinc-800 cursor-pointer"
              />
              <span className="text-zinc-200 w-6 text-right">{tracking}</span>
            </div>
          </div>

          {/* Theme switcher */}
          <div className="flex items-center gap-1 bg-[#101010] p-1 rounded border border-zinc-800">
            <button
              onClick={() => setTheme('dark')}
              className={`w-6 h-6 rounded bg-[#0A0A0A] border ${theme === 'dark' ? 'border-[#E50914]' : 'border-zinc-800'}`}
              title="Dark Studio"
            />
            <button
              onClick={() => setTheme('light')}
              className={`w-6 h-6 rounded bg-[#F4F4F5] border ${theme === 'light' ? 'border-[#E50914]' : 'border-zinc-800'}`}
              title="Light Editorial"
            />
            <button
              onClick={() => setTheme('crimson')}
              className={`w-6 h-6 rounded bg-[#450A0A] border ${theme === 'crimson' ? 'border-[#E50914]' : 'border-zinc-800'}`}
              title="Crimson Ember"
            />
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* QUICK PRESET CHIPS */}
      <div className="bg-[#0A0A0A] border-b border-zinc-900 px-6 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 text-xs font-mono">
        <span className="text-zinc-500 uppercase text-[10px] whitespace-nowrap">PRESETS:</span>
        {presets.map((p, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActivePreset(idx);
              setPreviewText(p.text);
            }}
            className={`px-3 py-1 rounded border whitespace-nowrap transition-colors cursor-pointer ${
              activePreset === idx
                ? 'bg-[#181818] border-zinc-600 text-white font-bold'
                : 'bg-[#0E0E0E] border-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* MAIN SPECIMEN PREVIEW CANVAS */}
      <main
        className={`flex-1 overflow-y-auto p-8 sm:p-16 flex items-center justify-center transition-colors ${
          theme === 'dark'
            ? 'bg-[#050505] text-[#E2E8F0]'
            : theme === 'light'
            ? 'bg-[#F4F4F5] text-[#0A0A0A]'
            : 'bg-[#140406] text-[#FCA5A5]'
        }`}
      >
        {mockupMode === 'type' && (
          <div className="max-w-5xl w-full space-y-8">
            <textarea
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
              rows={4}
              className="w-full bg-transparent border-none outline-none resize-none font-display-serif break-words font-bold tracking-tight"
              style={{
                fontSize: `${fontSize}px`,
                letterSpacing: `${tracking}px`,
                lineHeight: lineHeight,
                textAlign: alignment
              }}
            />

            {/* Subtitle spec */}
            <div className="pt-8 border-t border-zinc-800/40 flex justify-between text-xs font-mono text-zinc-500">
              <span>{project.info.familyName} // {project.activeWeight}</span>
              <span>{previewText.length} characters rendered</span>
            </div>
          </div>
        )}

        {mockupMode === 'poster' && (
          <div className="w-[480px] h-[640px] bg-[#0A0A0E] border border-zinc-800 p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex justify-between text-[11px] font-mono text-zinc-500">
              <span>ALPHAXEN FOUNDRY</span>
              <span>ISSUE NO. 26</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-display-serif text-5xl font-bold leading-none tracking-tight text-white">
                {previewText.split('\n')[0] || 'ALPHAXEN'}
              </h1>
              <p className="font-mono text-xs text-zinc-400 leading-relaxed">
                A typographical manifestation of mineral fracture, engineered for visionaries and architectural identities.
              </p>
            </div>

            <div className="text-[10px] font-mono text-zinc-600 border-t border-zinc-900 pt-3 flex justify-between">
              <span>DESIGNED IN THE OBSIDIAN LAB</span>
              <span>2026</span>
            </div>
          </div>
        )}

        {mockupMode === 'apparel' && (
          <div className="w-[520px] h-[480px] bg-[#0E0E12] border border-zinc-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center space-y-6 shadow-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-red-500">
              HAUTE COUTURE SPECIMEN
            </span>
            <div className="font-cinzel text-4xl sm:text-5xl font-extrabold tracking-[0.2em] text-white">
              {previewText.split('\n')[0] || 'OBSIDIAN'}
            </div>
            <p className="font-mono text-xs text-zinc-400 max-w-sm">
              Limited Edition Studio Print // Heavyweight 480GSM Volcanic Cotton
            </p>
          </div>
        )}

        {mockupMode === 'book' && (
          <div className="max-w-2xl w-full p-8 rounded bg-[#101014] border border-zinc-800 shadow-2xl space-y-6 font-serif leading-relaxed text-zinc-300">
            <h2 className="font-display-serif text-3xl font-bold text-white mb-4">
              The Architecture of Glyphs
            </h2>
            <p className="text-base text-zinc-300">
              {previewText}
            </p>
          </div>
        )}
      </main>

    </div>
  );
};
