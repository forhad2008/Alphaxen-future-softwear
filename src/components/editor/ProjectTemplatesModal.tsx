import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Layers, 
  Check, 
  ArrowRight, 
  Compass,
  FileCode,
  Type,
  Maximize2,
  Sliders
} from 'lucide-react';
import { FontTemplate, FontProject } from '../../types/fontLab';
import { FONT_TEMPLATES } from '../../data/fontTemplates';
import { TEXTURE_PRESETS } from '../../data/texturePresets';

interface ProjectTemplatesModalProps {
  currentProject: FontProject;
  onApplyTemplate: (template: FontTemplate) => void;
  onClose: () => void;
}

export const ProjectTemplatesModal: React.FC<ProjectTemplatesModalProps> = ({
  currentProject,
  onApplyTemplate,
  onClose
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(FONT_TEMPLATES[0].id);
  const [previewText, setPreviewText] = useState<string>('ALPHAXEN');

  const activeTemplate = FONT_TEMPLATES.find((t) => t.id === selectedTemplateId) || FONT_TEMPLATES[0];
  const suggestedTextureDef = TEXTURE_PRESETS.find((tp) => tp.id === activeTemplate.suggestedTexture);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn select-none text-xs">
      <div className="relative w-full max-w-5xl bg-[#090b10] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* HEADER */}
        <div className="p-5 bg-[#0e1118] border-b border-zinc-800/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Alphaxen Logo" 
              className="h-8 w-auto max-w-[120px] object-contain shrink-0" 
              onError={(e) => { e.currentTarget.style.display = 'none'; }} 
            />
            <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-800/50 flex items-center justify-center text-red-500 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-mono text-sm sm:text-base font-bold text-white tracking-wide">
                  PROJECT TEMPLATES & STARTER BASES
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-950/60 text-red-400 border border-red-800/40 font-semibold">
                  3 PRIMARY STARTERS
                </span>
              </div>
              <p className="text-[11px] font-mono text-zinc-400">
                Choose a foundation to pre-initialize baseline, cap-height, x-height, and ascender guidelines on the canvas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY: TEMPLATE SELECTOR (LEFT) + DEEP INSPECTION & GUIDES PREVIEW (RIGHT) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* LEFT: 3 STARTER TEMPLATE CARDS */}
          <div className="lg:col-span-5 p-4 border-r border-zinc-800/80 overflow-y-auto space-y-3 bg-[#07090e]">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider font-semibold">
                Select Starter Architecture
              </span>
              <span className="text-[9px] font-mono text-red-400">UPM: 1000</span>
            </div>

            {FONT_TEMPLATES.map((tmpl) => {
              const isSelected = tmpl.id === selectedTemplateId;
              const isPrimary = ['geometric-sans', 'display-serif', 'modern-mono'].includes(tmpl.id);
              
              return (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedTemplateId(tmpl.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 relative ${
                    isSelected
                      ? 'bg-[#141824] border-red-500/90 shadow-[0_0_20px_rgba(220,38,38,0.25)] ring-1 ring-red-500/50'
                      : 'bg-[#0d1017] border-zinc-800/80 hover:border-zinc-700 hover:bg-[#11141e]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white tracking-tight flex items-center gap-2">
                      {tmpl.name}
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
                      )}
                    </span>
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                      isPrimary 
                        ? 'bg-red-950/60 text-red-300 border-red-800/50 font-bold'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                    }`}>
                      {tmpl.badge}
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                    {tmpl.description}
                  </p>

                  {/* Specific Baseline, Cap-Height, x-Height Quick Summary */}
                  <div className="grid grid-cols-3 gap-1 text-[10px] font-mono pt-1 text-zinc-400 border-t border-zinc-800/60 text-center">
                    <div className="p-1 rounded bg-[#080a0f] border border-zinc-800/50">
                      <span className="text-[9px] text-zinc-500 block">Baseline</span>
                      <span className="text-red-400 font-bold">0 UPM</span>
                    </div>
                    <div className="p-1 rounded bg-[#080a0f] border border-zinc-800/50">
                      <span className="text-[9px] text-zinc-500 block">Cap-Height</span>
                      <span className="text-blue-400 font-bold">+{tmpl.metrics.capHeight}</span>
                    </div>
                    <div className="p-1 rounded bg-[#080a0f] border border-zinc-800/50">
                      <span className="text-[9px] text-zinc-500 block">x-Height</span>
                      <span className="text-zinc-200 font-bold">+{tmpl.metrics.xHeight}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: DETAILED TEMPLATE BLUEPRINT & GUIDELINES VISUALIZER */}
          <div className="lg:col-span-7 p-6 overflow-y-auto space-y-5 bg-[#090b10]">
            
            {/* Template Header Badge */}
            <div className="space-y-1.5 pb-4 border-b border-zinc-800/80">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white tracking-tight font-display-serif">
                  {activeTemplate.name}
                </h3>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-zinc-900 border border-zinc-700 text-zinc-300">
                  {activeTemplate.classification}
                </span>
              </div>
              <p className="text-xs text-red-400 font-mono font-semibold">
                {activeTemplate.tagline}
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                {activeTemplate.description}
              </p>
            </div>

            {/* PRE-INITIALIZED GUIDELINE TELEMETRY CARD */}
            <div className="p-4 rounded-xl bg-[#0f121a] border border-zinc-800/90 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-zinc-300 font-bold tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-red-400" />
                  PRE-INITIALIZED CANVAS GUIDELINES
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/50 font-bold">
                  Standard 1000 UPM
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
                <div className="p-2.5 rounded-lg bg-[#080a0f] border border-zinc-800/80">
                  <span className="text-zinc-500 block text-[9px] uppercase">Baseline</span>
                  <span className="text-red-400 font-bold text-sm">0 UPM</span>
                  <span className="text-[8px] text-zinc-600 block">Ground vector origin</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#080a0f] border border-zinc-800/80">
                  <span className="text-zinc-500 block text-[9px] uppercase">Cap-Height</span>
                  <span className="text-blue-400 font-bold text-sm">+{activeTemplate.metrics.capHeight}</span>
                  <span className="text-[8px] text-zinc-600 block">Uppercase apex</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#080a0f] border border-zinc-800/80">
                  <span className="text-zinc-500 block text-[9px] uppercase">x-Height</span>
                  <span className="text-zinc-200 font-bold text-sm">+{activeTemplate.metrics.xHeight}</span>
                  <span className="text-[8px] text-zinc-600 block">Lowercase torso</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#080a0f] border border-zinc-800/80">
                  <span className="text-zinc-500 block text-[9px] uppercase">Ascender / Desc</span>
                  <span className="text-emerald-400 font-bold text-sm">+{activeTemplate.metrics.ascender} / {activeTemplate.metrics.descender}</span>
                  <span className="text-[8px] text-zinc-600 block">Vertical boundary</span>
                </div>
              </div>
            </div>

            {/* INTERACTIVE SPECIMEN WATERFALL */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider font-semibold">
                  Live Typographic Test String
                </label>
                <div className="flex items-center gap-1.5">
                  {activeTemplate.previewWords.map((word) => (
                    <button
                      key={word}
                      onClick={() => setPreviewText(word)}
                      className="px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 text-[10px] font-mono text-zinc-400 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/60 border border-zinc-800/80 space-y-2 font-mono">
                <input
                  type="text"
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                  className="w-full bg-transparent text-xl font-bold text-white tracking-wider focus:outline-none border-b border-zinc-800 focus:border-red-500 pb-1 font-mono"
                  placeholder="Type preview..."
                />

                <div className="pt-2 space-y-2 text-[10px]">
                  <div className="flex items-baseline justify-between text-zinc-500 border-b border-zinc-900 pb-1">
                    <span>32pt Headline</span>
                    <span className="text-xs text-white font-bold tracking-widest">{previewText}</span>
                  </div>
                  <div className="flex items-baseline justify-between text-zinc-500">
                    <span>14pt Body Sample</span>
                    <span className="text-xs text-zinc-400">{previewText} ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION CTA BUTTON */}
            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
              <div className="text-[11px] font-mono text-zinc-500">
                Target: <span className="text-zinc-300 font-bold">{activeTemplate.name}</span>
              </div>

              <button
                onClick={() => {
                  onApplyTemplate(activeTemplate);
                  onClose();
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white font-semibold font-mono text-xs shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Initialize {activeTemplate.name} Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
