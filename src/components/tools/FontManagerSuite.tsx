import React, { useState } from 'react';
import { PenTool, Grid, Globe, Sliders, Layers, Terminal, Sparkles, Code2, BookOpen } from 'lucide-react';
import { FontMakerStudio } from './FontMakerStudio';
import { OtfInspector } from './OtfInspector';
import { WebfontOptimizer } from './WebfontOptimizer';
import { OpenTypeFeaturesLab } from './OpenTypeFeaturesLab';
import { VariableAxesLab } from './VariableAxesLab';

interface FontManagerSuiteProps {
  initialTab?: string;
  onOpenStudio?: () => void;
}

export const FontManagerSuite: React.FC<FontManagerSuiteProps> = ({ initialTab = 'font-maker', onOpenStudio }) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  const tools = [
    {
      id: 'font-maker',
      label: 'Vector Font Maker',
      badge: 'OTF Binary',
      icon: <PenTool className="w-4 h-4" />
    },
    {
      id: 'inspector',
      label: 'Binary Table Inspector',
      badge: 'SFNT / cmap',
      icon: <Grid className="w-4 h-4" />
    },
    {
      id: 'converter',
      label: 'Webfont Subsetter',
      badge: 'WOFF2 / -90%',
      icon: <Globe className="w-4 h-4" />
    },
    {
      id: 'features',
      label: 'OpenType GSUB Lab',
      badge: 'Ligatures',
      icon: <Sliders className="w-4 h-4" />
    },
    {
      id: 'variable',
      label: 'Variable Multi-Axis',
      badge: 'VF 1.8',
      icon: <Layers className="w-4 h-4" />
    }
  ];

  return (
    <section id="tools" className="py-20 relative bg-[#050507]">
      {/* Background ambient red glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-800/40 text-red-400 text-xs font-mono uppercase tracking-widest font-semibold">
            <Code2 className="w-3.5 h-3.5" />
            <span>DEVELOPER & TYPE DESIGNER ENGINE</span>
          </div>

          <h2 className="font-display-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Font Advance & Technical OTF Maker
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
            A comprehensive suite of browser-native type design tools. Sculpt Bézier curves into installable OpenType binaries, inspect low-level SFNT tables, optimize web payloads, and calibrate variable axes.
          </p>

          {onOpenStudio && (
            <div className="pt-2 flex justify-center">
              <button
                onClick={onOpenStudio}
                className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-[0_0_25px_rgba(220,38,38,0.45)] hover:shadow-[0_0_35px_rgba(220,38,38,0.7)] transition-all cursor-pointer hover:scale-[1.02]"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>Open Full ALPHAXEN-FONTLAB Desktop Software</span>
              </button>
            </div>
          )}
        </div>

        {/* SUITE NAVIGATION TABS */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-8 gap-2.5 no-scrollbar">
          {tools.map((tool) => {
            const isActive = activeTab === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTab(tool.id)}
                className={`px-4 py-2.5 rounded-xl border text-xs font-mono flex items-center gap-2.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-red-600/20 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.35)] font-bold'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <span className={isActive ? 'text-red-400' : 'text-zinc-500'}>
                  {tool.icon}
                </span>
                <span>{tool.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  isActive ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {tool.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* ACTIVE TOOL CONTAINER */}
        <div className="transition-all duration-300">
          {activeTab === 'font-maker' && <FontMakerStudio />}
          {activeTab === 'inspector' && <OtfInspector />}
          {activeTab === 'converter' && <WebfontOptimizer />}
          {activeTab === 'features' && <OpenTypeFeaturesLab />}
          {activeTab === 'variable' && <VariableAxesLab />}
        </div>

      </div>
    </section>
  );
};
