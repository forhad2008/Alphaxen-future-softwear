import React, { useState } from 'react';
import { Sliders, Copy, Check, Sparkles, Layers, RefreshCw } from 'lucide-react';
import { OPENTYPE_FEATURES_LIST } from '../../data/fontsData';
import { OpenTypeFeature } from '../../types/fontLab';

export const OpenTypeFeaturesLab: React.FC = () => {
  const [features, setFeatures] = useState<OpenTypeFeature[]>(OPENTYPE_FEATURES_LIST);
  const [testString, setTestString] = useState<string>('office affliction aesthetic 1/2 and 3/4 table $1,450.90');
  const [copied, setCopied] = useState<boolean>(false);

  const toggleFeature = (tag: string) => {
    setFeatures((prev) =>
      prev.map((f) => (f.tag === tag ? { ...f, enabled: !f.enabled } : f))
    );
  };

  // Compile CSS font-feature-settings value
  const enabledFeatures = features.filter((f) => f.enabled);
  const cssFeatureString = enabledFeatures.length > 0
    ? enabledFeatures.map((f) => `"${f.tag}" 1`).join(', ')
    : 'normal';

  const handleCopyCss = () => {
    const code = `font-feature-settings: ${cssFeatureString};`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-[#09090d] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* HEADER */}
      <div className="bg-[#0e0e14] border-b border-zinc-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>OpenType Feature Syntax & Ligature Lab</span>
              <span className="text-[10px] font-mono uppercase bg-red-950/60 text-red-400 px-2 py-0.5 rounded border border-red-800/40">
                GSUB / GPOS
              </span>
            </h2>
            <p className="text-xs text-zinc-400">
              Test glyph substitution rules, discretionary ligatures, small caps, and figures.
            </p>
          </div>
        </div>

        <button
          onClick={handleCopyCss}
          className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 flex items-center gap-2 border border-zinc-700 transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied to Clipboard!' : 'Copy font-feature-settings'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800">
        
        {/* LEFT COLUMN: TOGGLE MATRIX (5 cols) */}
        <div className="lg:col-span-5 p-6 space-y-4 bg-[#0a0a0f] max-h-[580px] overflow-y-auto">
          <label className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-semibold block">
            OpenType Feature Tags
          </label>

          <div className="space-y-2.5">
            {features.map((feat) => {
              return (
                <div
                  key={feat.tag}
                  onClick={() => toggleFeature(feat.tag)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    feat.enabled
                      ? 'bg-red-950/30 border-red-600/80 shadow-[0_0_15px_rgba(220,38,38,0.2)]'
                      : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  <div className="space-y-0.5 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-red-400">
                        '{feat.tag}'
                      </span>
                      <span className="text-xs font-bold text-white">
                        {feat.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-light leading-snug">
                      {feat.description}
                    </p>
                  </div>

                  <div className={`w-10 h-5 rounded-full p-0.5 transition-colors shrink-0 ${
                    feat.enabled ? 'bg-red-600' : 'bg-zinc-800'
                  }`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      feat.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE PREVIEW & CODE EXPORT (7 cols) */}
        <div className="lg:col-span-7 p-6 space-y-6 bg-[#060609]">
          
          {/* Test Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-semibold">
                Interactive Ligature Sandbox
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setTestString('office affliction fine flower')}
                  className="text-[10px] font-mono text-zinc-400 hover:text-zinc-200 bg-zinc-800 px-2 py-0.5 rounded cursor-pointer"
                >
                  Ligatures
                </button>
                <button
                  onClick={() => setTestString('1/2 3/4 7/8 $4,980.50 2026')}
                  className="text-[10px] font-mono text-zinc-400 hover:text-zinc-200 bg-zinc-800 px-2 py-0.5 rounded cursor-pointer"
                >
                  Fractions/Nums
                </button>
              </div>
            </div>

            <input
              type="text"
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-200 font-mono focus:outline-none focus:border-red-500"
            />
          </div>

          {/* SIDE-BY-SIDE COMPARISON */}
          <div className="space-y-4">
            {/* 1. With Features Enabled */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-red-900/50 shadow-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-red-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>OPENTYPE GSUB APPLIED</span>
                </span>
                <span className="text-zinc-500 font-mono text-[10px]">
                  font-feature-settings: {cssFeatureString}
                </span>
              </div>

              <div 
                className="font-display-serif text-3xl sm:text-4xl text-white font-bold tracking-normal py-4 border-y border-zinc-900 break-words"
                style={{ fontFeatureSettings: cssFeatureString }}
              >
                {testString}
              </div>
            </div>

            {/* 2. Standard Vanilla Default */}
            <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-2">
              <span className="text-xs font-mono text-zinc-500 block">
                STANDARD (FEATURES DISABLED):
              </span>
              <div 
                className="font-display-serif text-2xl sm:text-3xl text-zinc-400 tracking-normal break-words"
                style={{ fontFeatureSettings: 'normal' }}
              >
                {testString}
              </div>
            </div>
          </div>

          {/* CSS Output Snippet */}
          <div className="p-4 rounded-xl bg-[#0e0e14] border border-zinc-800 space-y-2 font-mono text-xs">
            <span className="text-zinc-400 block font-semibold">CSS Declaration:</span>
            <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 text-red-300 overflow-x-auto select-all">
              font-feature-settings: {cssFeatureString};
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
