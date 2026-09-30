import React, { useState } from 'react';
import { Layers, Copy, Check, RotateCcw, Sliders, Type } from 'lucide-react';
import { VARIABLE_AXES_DEFAULTS } from '../../data/fontsData';
import { VariableAxis } from '../../types/fontLab';

export const VariableAxesLab: React.FC = () => {
  const [axes, setAxes] = useState<VariableAxis[]>(VARIABLE_AXES_DEFAULTS);
  const [samplePhrase, setSamplePhrase] = useState<string>('Alphaxen Obsidian Variable');
  const [copied, setCopied] = useState<boolean>(false);

  const handleAxisChange = (tag: string, val: number) => {
    setAxes((prev) =>
      prev.map((a) => (a.tag === tag ? { ...a, current: val } : a))
    );
  };

  const handleReset = () => {
    setAxes(VARIABLE_AXES_DEFAULTS);
  };

  const getAxis = (tag: string) => axes.find((a) => a.tag === tag)?.current || 400;

  const weight = getAxis('wght');
  const width = getAxis('wdth');
  const slant = getAxis('slnt');
  const opsz = getAxis('opsz');
  const casl = getAxis('CASL');

  // CSS variation settings
  const variationString = `'wght' ${weight}, 'wdth' ${width}, 'slnt' ${slant}, 'opsz' ${opsz}, 'CASL' ${casl}`;

  const handleCopyCss = () => {
    const css = `font-variation-settings: ${variationString};
font-weight: ${weight};`;
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const waterfallScales = [
    { label: 'Display (72pt)', size: 'text-6xl sm:text-7xl', leading: 'leading-none' },
    { label: 'Headline (48pt)', size: 'text-4xl sm:text-5xl', leading: 'leading-tight' },
    { label: 'Subhead (28pt)', size: 'text-2xl sm:text-3xl', leading: 'leading-snug' },
    { label: 'Lead Body (18pt)', size: 'text-lg sm:text-xl', leading: 'leading-normal' },
    { label: 'Body Text (14pt)', size: 'text-sm sm:text-base', leading: 'leading-relaxed' },
    { label: 'Caption (11pt)', size: 'text-xs', leading: 'leading-normal' }
  ];

  return (
    <div className="bg-[#09090d] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* HEADER */}
      <div className="bg-[#0e0e14] border-b border-zinc-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>Variable Font Multi-Axis Laboratory</span>
              <span className="text-[10px] font-mono uppercase bg-red-950/60 text-red-400 px-2 py-0.5 rounded border border-red-800/40">
                VF 1.8
              </span>
            </h2>
            <p className="text-xs text-zinc-400">
              Continuously adjust weight, width, slant, and optical size in real-time.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Axes</span>
          </button>

          <button
            onClick={handleCopyCss}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 flex items-center gap-2 border border-zinc-700 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'CSS Copied!' : 'Copy font-variation-settings'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800">
        
        {/* LEFT COLUMN: AXIS CONTROLLERS (4 cols) */}
        <div className="lg:col-span-4 p-6 space-y-5 bg-[#0a0a0f]">
          <label className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-semibold block">
            Variable Axes Sliders
          </label>

          <div className="space-y-4">
            {axes.map((axis) => (
              <div key={axis.tag} className="space-y-1.5 bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
                <div className="flex justify-between items-center text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-red-400 font-bold">'{axis.tag}'</span>
                    <span className="text-zinc-200">{axis.name}</span>
                  </div>
                  <span className="text-white font-bold bg-zinc-800 px-2 py-0.5 rounded text-[11px]">
                    {axis.current}{axis.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={axis.min}
                  max={axis.max}
                  value={axis.current}
                  onChange={(e) => handleAxisChange(axis.tag, Number(e.target.value))}
                  className="w-full accent-red-600 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>{axis.min}{axis.unit}</span>
                  <span>{axis.max}{axis.unit}</span>
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-semibold block mb-2">
              Waterfall Test String
            </label>
            <input
              type="text"
              value={samplePhrase}
              onChange={(e) => setSamplePhrase(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 font-mono focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: TYPOGRAPHIC WATERFALL & METRICS (8 cols) */}
        <div className="lg:col-span-8 p-6 space-y-6 bg-[#060609]">
          
          {/* Active Variation Indicator */}
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">ACTIVE VARIATION:</span>
            <code className="text-red-400">{variationString}</code>
          </div>

          {/* Typography Waterfall */}
          <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
            {waterfallScales.map((scale, i) => (
              <div key={i} className="space-y-1 pb-4 border-b border-zinc-900 last:border-0">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                  {scale.label}
                </span>
                <div
                  className={`font-syne text-white ${scale.size} ${scale.leading} tracking-tight transition-all break-words`}
                  style={{
                    fontWeight: weight,
                    fontStyle: slant !== 0 ? 'italic' : 'normal',
                    transform: `scaleX(${width / 100})`,
                    transformOrigin: 'left'
                  }}
                >
                  {samplePhrase}
                </div>
              </div>
            ))}
          </div>

          {/* CSS Snippet */}
          <div className="p-4 rounded-xl bg-[#0e0e14] border border-zinc-800 text-xs font-mono text-zinc-300">
            <span className="text-zinc-500 block mb-1">Tailwind / CSS Integration:</span>
            <code className="text-emerald-400 block bg-zinc-950 p-2.5 rounded border border-zinc-800 select-all">
              font-variation-settings: {variationString};
            </code>
          </div>

        </div>

      </div>
    </div>
  );
};
