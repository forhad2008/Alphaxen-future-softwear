import React from 'react';
import { Sparkles, PenTool, Globe, Grid, Layers, Compass } from 'lucide-react';

interface FloatingToolbarProps {
  onSelectTool: (toolId: string) => void;
  activeTool: string | null;
}

export const FloatingToolbar: React.FC<FloatingToolbarProps> = ({
  onSelectTool,
  activeTool
}) => {
  const tools = [
    {
      id: 'highlight',
      icon: <Compass className="w-4 h-4 text-red-500" />,
      label: 'Studio Highlights & Portfolio'
    },
    {
      id: 'specimen',
      icon: <span className="font-serif font-bold text-sm tracking-tighter">Aa</span>,
      label: 'Type Tester & Waterfall Ramp'
    },
    {
      id: 'font-maker',
      icon: <PenTool className="w-4 h-4" />,
      label: 'Vector Font Maker (OTF Engine)'
    },
    {
      id: 'converter',
      icon: <Globe className="w-4 h-4" />,
      label: 'Webfont Optimizer & Subsetter'
    },
    {
      id: 'inspector',
      icon: <Grid className="w-4 h-4" />,
      label: 'OpenType Binary Table Inspector'
    },
    {
      id: 'variable',
      icon: <Layers className="w-4 h-4" />,
      label: 'Variable Font Multi-Axis Lab'
    },
    {
      id: 'bespoke',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      label: 'Bespoke Custom Font Studio'
    }
  ];

  return (
    <aside className="hidden xl:flex fixed right-6 top-32 z-40 flex-col items-center select-none pointer-events-auto">
      {/* Top Badge: Star + TYPE / SHAPES / CULTURE */}
      <div className="flex flex-col items-center mb-4 space-y-2">
        <Sparkles className="w-3.5 h-3.5 text-zinc-400 animate-pulse-slow" />
        <div className="flex flex-col items-center text-[10px] uppercase font-mono tracking-[0.35em] text-zinc-400 leading-relaxed font-semibold">
          <span>T Y P E</span>
          <span className="mt-1">S H A P E S</span>
          <span className="mt-1">C U L T U R E</span>
        </div>
      </div>

      {/* Floating Vertical Pill Dock */}
      <div className="bg-[#0e0e12]/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl py-3 px-2 shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex flex-col items-center space-y-3">
        {tools.map((tool) => {
          const isActive = activeTool === tool.id;
          return (
            <div key={tool.id} className="relative group">
              <button
                onClick={() => onSelectTool(tool.id)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-red-600/30 text-white border border-red-500/60 shadow-[0_0_12px_rgba(220,38,38,0.5)]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60 border border-transparent'
                }`}
                aria-label={tool.label}
              >
                {tool.icon}
              </button>

              {/* Tooltip on left */}
              <div className="absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs px-3 py-1.5 rounded-md whitespace-nowrap shadow-xl z-50">
                {tool.label}
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-zinc-900 border-r border-t border-zinc-700 rotate-45" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Tagline: Experimental / Expressive / Timeless */}
      <div className="mt-5 flex flex-col items-center text-center">
        <div className="w-8 h-[1px] bg-zinc-800 mb-3" />
        <div className="flex flex-col text-[11px] tracking-wide text-zinc-400 space-y-1 font-light">
          <span>Experimental</span>
          <span>Expressive</span>
          <span>Timeless</span>
        </div>
      </div>
    </aside>
  );
};
