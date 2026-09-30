import React, { useState } from 'react';
import { Globe, Copy, Check, Sliders, ArrowDown, FileArchive, Sparkles, Terminal } from 'lucide-react';

export const WebfontOptimizer: React.FC = () => {
  const [selectedFont, setSelectedFont] = useState<string>('Imperial Eagle');
  const [activeRange, setActiveRange] = useState<'basic' | 'extended' | 'numbers' | 'custom'>('basic');
  const [customChars, setCustomChars] = useState<string>('AlphaxenFontLab2026');
  const [fontDisplay, setFontDisplay] = useState<string>('swap');
  const [copied, setCopied] = useState<boolean>(false);
  const [includeBase64, setIncludeBase64] = useState<boolean>(false);

  // Compression estimates
  const ranges = {
    basic: { name: 'Basic Latin (ASCII 32-126)', range: 'U+0020-007E', glyphs: 95, sizeKb: 14.8 },
    extended: { name: 'Latin Extended & Diacritics', range: 'U+0000-00FF, U+0131, U+0152-0153', glyphs: 215, sizeKb: 32.4 },
    numbers: { name: 'Numbers & Currency Only', range: 'U+0030-0039, U+0024, U+20AC, U+00A3', glyphs: 24, sizeKb: 5.6 },
    custom: { name: 'Custom Whitelist', range: 'Dynamic', glyphs: customChars.length, sizeKb: Math.max(3.2, customChars.length * 0.4) }
  };

  const currentPreset = ranges[activeRange];
  const originalSizeKb = 174.5;
  const savingsPct = Math.round((1 - currentPreset.sizeKb / originalSizeKb) * 100);

  const fontSlug = selectedFont.toLowerCase().replace(/\s+/g, '-');

  const cssSnippet = `@font-face {
  font-family: '${selectedFont}';
  font-style: normal;
  font-weight: 700;
  font-display: ${fontDisplay};
  src: url('/fonts/${fontSlug}.woff2') format('woff2'),
       url('/fonts/${fontSlug}.woff') format('woff');
  unicode-range: ${currentPreset.range};
}

/* Modern web typography class */
.${fontSlug}-headline {
  font-family: '${selectedFont}', system-ui, sans-serif;
  font-feature-settings: "kern" 1, "liga" 1;
  text-rendering: optimizeLegibility;
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(cssSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-[#09090d] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* HEADER */}
      <div className="bg-[#0e0e14] border-b border-zinc-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>Webfont Optimizer & Subsetter</span>
              <span className="text-[10px] font-mono uppercase bg-emerald-950/60 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/40">
                WOFF2 / BROTLI
              </span>
            </h2>
            <p className="text-xs text-zinc-400">
              Cut bandwidth by up to 92% with unicode-range subsetting and WOFF2 conversion.
            </p>
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopyCode}
          className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 flex items-center gap-2 border border-zinc-700 transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'CSS Copied!' : 'Copy @font-face CSS'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800">
        
        {/* LEFT COLUMN: CONTROLS & SUBSET RANGES (5 cols) */}
        <div className="lg:col-span-5 p-6 space-y-6 bg-[#0a0a0f]">
          {/* Target Font */}
          <div>
            <label className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-semibold block mb-2">
              Source Font Family
            </label>
            <select
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 font-mono focus:outline-none focus:border-red-500"
            >
              <option value="Imperial Eagle">Imperial Eagle (Display Heavy)</option>
              <option value="Bloody Dragon">Bloody Dragon (Blackletter)</option>
              <option value="Arctic Bear">Arctic Bear (Glacial Geometric)</option>
              <option value="Better Jellyfish">Better Jellyfish (Fluid Glow)</option>
            </select>
          </div>

          {/* Subsetting Range Preset */}
          <div>
            <label className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-semibold block mb-2">
              Unicode Subsetting Range
            </label>
            <div className="space-y-2">
              {(['basic', 'extended', 'numbers', 'custom'] as const).map((key) => {
                const item = ranges[key];
                const isSelected = activeRange === key;
                return (
                  <div
                    key={key}
                    onClick={() => setActiveRange(key)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-red-950/30 border-red-600 text-white'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{item.name}</div>
                      <div className="text-[11px] font-mono text-zinc-400 mt-0.5">{item.range}</div>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-semibold">
                      ~{item.sizeKb.toFixed(1)} KB
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* If custom range */}
          {activeRange === 'custom' && (
            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-semibold block mb-1">
                Custom Characters to Bake
              </label>
              <input
                type="text"
                value={customChars}
                onChange={(e) => setCustomChars(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs text-zinc-200 font-mono focus:outline-none focus:border-red-500"
              />
            </div>
          )}

          {/* font-display policy */}
          <div>
            <label className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-semibold block mb-2">
              font-display Strategy
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['swap', 'optional', 'block'].map((strategy) => (
                <button
                  key={strategy}
                  onClick={() => setFontDisplay(strategy)}
                  className={`py-1.5 px-3 rounded-lg border text-xs font-mono capitalize transition-colors cursor-pointer ${
                    fontDisplay === strategy
                      ? 'bg-red-600/30 border-red-500 text-white font-bold'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {strategy}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SAVINGS METRICS & CODE GENERATOR (7 cols) */}
        <div className="lg:col-span-7 p-6 space-y-6 bg-[#060609]">
          
          {/* Compression Savings Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#12070a] via-[#0f0f15] to-[#0a0a0f] border border-red-900/40 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold">
                PAYLOAD REDUCTION
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                -{savingsPct}% PAYLOAD
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[11px] font-mono text-zinc-400 block mb-0.5">ORIGINAL OTF/TTF</span>
                <span className="text-2xl font-bold font-mono text-zinc-400">{originalSizeKb} KB</span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-emerald-400 block mb-0.5">SUBSETTED WOFF2</span>
                <span className="text-2xl font-bold font-mono text-white text-glow-white">
                  {currentPreset.sizeKb.toFixed(1)} KB
                </span>
              </div>
            </div>

            {/* Progress visual bar */}
            <div className="w-full h-2 bg-zinc-800 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                style={{ width: `${(currentPreset.sizeKb / originalSizeKb) * 100}%` }}
              />
            </div>
          </div>

          {/* Generated Code Block */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-semibold">
                Production @font-face CSS
              </span>
              <span className="text-[10px] font-mono text-zinc-500">
                Ready for Tailwind / Next.js / Vite
              </span>
            </div>

            <div className="relative rounded-xl bg-zinc-950 border border-zinc-800 p-4 font-mono text-xs text-zinc-300 overflow-x-auto shadow-inner">
              <pre className="leading-relaxed">
                <code>{cssSnippet}</code>
              </pre>
            </div>
          </div>

          {/* CLI Command Helper */}
          <div className="p-4 rounded-xl bg-[#0e0e14] border border-zinc-800 text-xs font-mono text-zinc-400 space-y-1">
            <span className="text-zinc-200 font-bold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-red-400" />
              <span>CLI Subsetting Recipe (pyftsubset):</span>
            </span>
            <code className="text-red-300 block bg-zinc-950 p-2 rounded border border-zinc-800 mt-1 select-all">
              pyftsubset {fontSlug}.otf --unicodes="{currentPreset.range}" --flavor=woff2 --with-zopfli
            </code>
          </div>

        </div>

      </div>
    </div>
  );
};
