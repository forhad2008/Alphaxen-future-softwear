import React, { useState } from 'react';
import { 
  FolderKanban, 
  Layers, 
  Puzzle, 
  Anchor, 
  Compass, 
  Sliders, 
  History, 
  Cpu, 
  Sparkles, 
  ChevronUp, 
  ChevronDown, 
  Plus, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  Trash2, 
  Copy, 
  Play, 
  Wand2, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Dna,
  Shuffle
} from 'lucide-react';
import { CustomGlyph, GlyphCategory, FontMetrics, KerningPair } from '../../types/fontLab';
import { CATEGORY_CHARACTERS } from '../../data/fontProjectDefaults';

export type BottomPanelTab = 
  | 'glyphs'
  | 'layers'
  | 'components'
  | 'anchors'
  | 'guides'
  | 'kerning'
  | 'timeline'
  | 'variations'
  | 'experiment';

interface BottomPanelProps {
  glyphs: CustomGlyph[] | Record<string, CustomGlyph>;
  activeGlyph: CustomGlyph;
  metrics: FontMetrics;
  kerningPairs: KerningPair[];
  onSelectGlyph: (char: string) => void;
  onAddGlyph?: (char: string) => void;
  onUpdateGlyph: (updated: CustomGlyph) => void;
  onUpdateMetrics: (metrics: FontMetrics) => void;
  historySteps?: string[];
  currentHistoryIndex?: number;
  onJumpToHistory?: (index: number) => void;
  onOpenTextureLab?: () => void;
}

export const BottomPanel: React.FC<BottomPanelProps> = ({
  glyphs,
  activeGlyph,
  metrics,
  kerningPairs,
  onSelectGlyph,
  onAddGlyph,
  onUpdateGlyph,
  onUpdateMetrics,
  historySteps = ['Project Created', 'Base Vector Contour A', 'Add Serif Terminals', 'Texture Shader Applied'],
  currentHistoryIndex = 3,
  onJumpToHistory,
  onOpenTextureLab
}) => {
  const [activeTab, setActiveTab] = useState<BottomPanelTab>('glyphs');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<GlyphCategory>('uppercase');

  // Layers state for active glyph
  const [glyphLayers, setGlyphLayers] = useState([
    { id: 'layer-base', name: 'Base Vector Shape', visible: true, locked: false, opacity: 100, type: 'vector' },
    { id: 'layer-outline', name: 'Inner Stroke & Bevel', visible: true, locked: false, opacity: 85, type: 'stroke' },
    { id: 'layer-texture', name: 'Procedural Texture', visible: true, locked: false, opacity: 95, type: 'texture' },
    { id: 'layer-ornament', name: 'Serif & Terminal Ornaments', visible: true, locked: false, opacity: 100, type: 'ornament' },
    { id: 'layer-glow', name: 'Atmospheric Glow', visible: false, locked: false, opacity: 40, type: 'glow' }
  ]);

  // Reusable Components
  const [components] = useState([
    { id: 'cmp-stem', name: 'Vertical Stem', category: 'Basic', points: 4 },
    { id: 'cmp-serif-bracket', name: 'Bracketed Serif', category: 'Serif', points: 6 },
    { id: 'cmp-bowl', name: 'Closed Elliptic Bowl', category: 'Curvature', points: 8 },
    { id: 'cmp-crossbar', name: 'Horizontal Crossbar', category: 'Basic', points: 4 },
    { id: 'cmp-dragon-horn', name: 'Dragon Horn Crest', category: 'Fantasy', points: 12 },
    { id: 'cmp-claw-terminal', name: 'Sharp Claw Terminal', category: 'Fantasy', points: 9 },
    { id: 'cmp-feather', name: 'Feather Finial', category: 'Ornamental', points: 14 }
  ]);

  // Accent Anchors for Active Glyph
  const [anchors, setAnchors] = useState([
    { id: 'anc-top', name: 'top (Acute/Grave/Umlaut)', x: activeGlyph.advanceWidth / 2, y: metrics.capHeight + 40 },
    { id: 'anc-bottom', name: 'bottom (Cedilla/Ogonek)', x: activeGlyph.advanceWidth / 2, y: metrics.baseline - 30 },
    { id: 'anc-center', name: 'center (Bar/Slash)', x: activeGlyph.advanceWidth / 2, y: metrics.xHeight / 2 }
  ]);

  // Experiment Lab state
  const [expSeed, setExpSeed] = useState(48291);
  const [expComplexity, setExpComplexity] = useState(70);
  const [expDistortion, setExpDistortion] = useState(35);
  const [expTextureRoughness, setExpTextureRoughness] = useState(85);

  const glyphsMap: Record<string, CustomGlyph> = Array.isArray(glyphs)
    ? glyphs.reduce<Record<string, CustomGlyph>>((acc, g) => {
        acc[g.char] = g;
        return acc;
      }, {})
    : glyphs;

  const totalNodes = activeGlyph.contours.reduce((acc, c) => acc + c.points.length, 0);

  const categories: { id: GlyphCategory; label: string }[] = [
    { id: 'uppercase', label: 'A-Z' },
    { id: 'lowercase', label: 'a-z' },
    { id: 'numbers', label: '0-9' },
    { id: 'punctuation', label: 'Punctuation' },
    { id: 'symbols', label: 'Symbols' },
    { id: 'currency', label: 'Currency' },
    { id: 'arrows', label: 'Arrows' },
    { id: 'ligatures', label: 'Ligatures' },
    { id: 'alternates', label: 'Alternates' }
  ];

  const currentCategoryChars = CATEGORY_CHARACTERS[activeCategory] || [];

  return (
    <div className="bg-[#090b10] border-t border-zinc-800/90 select-none z-20 shrink-0 transition-all duration-200">
      
      {/* 1. TOP DOCK TABS ROW */}
      <div className="px-3 py-1.5 bg-[#0c0e15] border-b border-zinc-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-0.5">
          <img 
            src="/logo.png" 
            alt="Alphaxen Logo" 
            className="h-5 w-auto max-w-[80px] object-contain shrink-0 pr-1 hidden sm:inline" 
            onError={(e) => { e.currentTarget.style.display = 'none'; }} 
          />
          {[
            { id: 'glyphs', label: 'Glyphs', icon: <FolderKanban className="w-3.5 h-3.5" /> },
            { id: 'layers', label: 'Layers', icon: <Layers className="w-3.5 h-3.5" /> },
            { id: 'components', label: 'Components', icon: <Puzzle className="w-3.5 h-3.5" /> },
            { id: 'anchors', label: 'Anchors', icon: <Anchor className="w-3.5 h-3.5" /> },
            { id: 'guides', label: 'Guides', icon: <Compass className="w-3.5 h-3.5" /> },
            { id: 'kerning', label: 'Kerning', icon: <Sliders className="w-3.5 h-3.5" /> },
            { id: 'timeline', label: 'Timeline', icon: <History className="w-3.5 h-3.5" /> },
            { id: 'variations', label: 'Variations', icon: <Cpu className="w-3.5 h-3.5" /> },
            { id: 'experiment', label: 'Experiment Lab', icon: <Dna className="w-3.5 h-3.5 text-red-400" /> }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as BottomPanelTab);
                  if (!isExpanded) setIsExpanded(true);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#181c28] text-white border border-red-500/80 font-bold shadow-[0_0_12px_rgba(220,38,38,0.25)]'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#121520] border border-transparent'
                }`}
              >
                <span className={isActive ? 'text-red-400' : 'text-zinc-500'}>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
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
            className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-mono"
            title={isExpanded ? 'Collapse Bottom Panel' : 'Expand Bottom Panel'}
          >
            <span>{isExpanded ? 'Hide' : 'Show'}</span>
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 2. TAB CONTENT BODY */}
      {isExpanded && (
        <div className="p-3 bg-[#07090e] max-h-44 overflow-y-auto">
          
          {/* TAB: GLYPH MATRIX */}
          {activeTab === 'glyphs' && (
            <div className="space-y-2.5">
              {/* Category selector */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer whitespace-nowrap ${
                        activeCategory === cat.id
                          ? 'bg-red-950/70 text-red-300 border border-red-800/60 font-bold'
                          : 'text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] font-mono text-zinc-500">
                  {currentCategoryChars.length} Glyphs
                </span>
              </div>

              {/* Glyph Grid Tiles */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {currentCategoryChars.map((char) => {
                  const isSelected = activeGlyph.char === char;
                  const hasCustomOutline = !!glyphsMap[char];
                  const unicodeHex = char.length === 1 ? char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0') : 'ALT';
                  
                  return (
                    <button
                      key={char}
                      onClick={() => onSelectGlyph(char)}
                      className={`h-16 w-14 rounded-xl border flex flex-col items-center justify-between p-1.5 transition-all cursor-pointer relative shrink-0 ${
                        isSelected
                          ? 'bg-[#151928] border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)] ring-1 ring-red-500'
                          : hasCustomOutline
                          ? 'bg-[#0e111a] border-zinc-700/80 hover:border-zinc-500 text-white'
                          : 'bg-[#080a10] border-zinc-800/80 hover:border-zinc-700 text-zinc-500'
                      }`}
                    >
                      <span className="text-[9px] font-mono text-zinc-400">
                        {unicodeHex}
                      </span>
                      <span className={`text-xl font-bold font-display-serif ${isSelected ? 'text-red-400 scale-110' : 'text-zinc-200'}`}>
                        {char}
                      </span>
                      <div className="w-full flex items-center justify-between text-[8px] font-mono px-1">
                        <span className={hasCustomOutline ? 'text-emerald-400' : 'text-zinc-600'}>
                          {hasCustomOutline ? '✓' : '○'}
                        </span>
                        <span className="text-zinc-400">
                          {glyphsMap[char]?.advanceWidth || 600}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: LAYERS */}
          {activeTab === 'layers' && (
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-[10px] text-zinc-400 uppercase tracking-wider">
                <span>Non-Destructive Stack for Glyph '{activeGlyph.char}'</span>
                <button
                  onClick={() => {
                    const newLayer = {
                      id: `layer-${Date.now()}`,
                      name: `Layer 0${glyphLayers.length + 1}`,
                      visible: true,
                      locked: false,
                      opacity: 100,
                      type: 'custom'
                    };
                    setGlyphLayers([newLayer, ...glyphLayers]);
                  }}
                  className="px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>New Layer</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {glyphLayers.map((layer, index) => (
                  <div
                    key={layer.id}
                    className="p-2.5 rounded-lg bg-[#0e111a] border border-zinc-800 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <button
                        onClick={() => {
                          setGlyphLayers(prev => prev.map(l => l.id === layer.id ? { ...l, visible: !l.visible } : l));
                        }}
                        className="text-zinc-400 hover:text-white cursor-pointer"
                      >
                        {layer.visible ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-zinc-600" />}
                      </button>
                      <button
                        onClick={() => {
                          setGlyphLayers(prev => prev.map(l => l.id === layer.id ? { ...l, locked: !l.locked } : l));
                        }}
                        className="text-zinc-400 hover:text-white cursor-pointer"
                      >
                        {layer.locked ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Unlock className="w-3.5 h-3.5 text-zinc-600" />}
                      </button>
                      <span className="text-[11px] text-zinc-200 truncate font-sans font-medium">{layer.name}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-zinc-500">{layer.opacity}%</span>
                      <button
                        onClick={() => {
                          setGlyphLayers(prev => prev.filter(l => l.id !== layer.id));
                        }}
                        className="text-zinc-600 hover:text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: REUSABLE COMPONENTS */}
          {activeTab === 'components' && (
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-[10px] text-zinc-400 uppercase tracking-wider">
                <span>Reusable Modular Glyph Components</span>
                <span className="text-zinc-500">Click component to inject into active glyph</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {components.map((cmp) => (
                  <button
                    key={cmp.id}
                    onClick={() => {
                      // Add component contour to glyph
                      const newContour = {
                        id: `contour_cmp_${Date.now()}`,
                        isClosed: true,
                        points: [
                          { id: `p_${Date.now()}_1`, x: 100, y: 100, onCurve: true, type: 'corner' as const },
                          { id: `p_${Date.now()}_2`, x: 200, y: 100, onCurve: true, type: 'corner' as const },
                          { id: `p_${Date.now()}_3`, x: 200, y: 600, onCurve: true, type: 'corner' as const },
                          { id: `p_${Date.now()}_4`, x: 100, y: 600, onCurve: true, type: 'corner' as const }
                        ]
                      };
                      onUpdateGlyph({
                        ...activeGlyph,
                        contours: [...activeGlyph.contours, newContour]
                      });
                    }}
                    className="p-2.5 rounded-lg bg-[#0e111a] border border-zinc-800 hover:border-red-500 hover:bg-[#131724] text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Puzzle className="w-3.5 h-3.5 text-zinc-400 group-hover:text-red-400 transition-colors" />
                      <span className="text-[9px] px-1 rounded bg-zinc-900 text-zinc-500">{cmp.category}</span>
                    </div>
                    <span className="text-[11px] text-zinc-200 font-sans block truncate font-medium">{cmp.name}</span>
                    <span className="text-[9px] text-zinc-500">{cmp.points} Nodes</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ANCHORS */}
          {activeTab === 'anchors' && (
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-[10px] text-zinc-400 uppercase tracking-wider">
                <span>Diacritic & Composite Attachment Anchors</span>
                <button
                  onClick={() => {
                    setAnchors([
                      ...anchors,
                      { id: `anc-${Date.now()}`, name: 'ogonek (sub)', x: activeGlyph.advanceWidth / 2, y: metrics.baseline - 50 }
                    ]);
                  }}
                  className="px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Custom Anchor</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {anchors.map((anc) => (
                  <div key={anc.id} className="p-2.5 rounded-lg bg-[#0e111a] border border-zinc-800 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-white font-medium">
                        <Anchor className="w-3.5 h-3.5 text-red-400" />
                        <span className="text-[11px]">{anc.name}</span>
                      </div>
                      <span className="text-[10px] text-zinc-500">X: {Math.round(anc.x)}u | Y: {Math.round(anc.y)}u</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-1.5 py-0.5 rounded">Active</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: GUIDES & METRICS */}
          {activeTab === 'guides' && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
              <div className="p-2 rounded bg-[#0e111a] border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Cap Height</span>
                <span className="text-white font-bold text-sm">{metrics.capHeight} UPM</span>
              </div>
              <div className="p-2 rounded bg-[#0e111a] border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">x-Height</span>
                <span className="text-white font-bold text-sm">{metrics.xHeight} UPM</span>
              </div>
              <div className="p-2 rounded bg-[#0e111a] border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Ascender</span>
                <span className="text-white font-bold text-sm">{metrics.ascender} UPM</span>
              </div>
              <div className="p-2 rounded bg-[#0e111a] border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Descender</span>
                <span className="text-white font-bold text-sm">{metrics.descender} UPM</span>
              </div>
              <div className="p-2 rounded bg-[#0e111a] border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Baseline</span>
                <span className="text-emerald-400 font-bold text-sm">0 UPM</span>
              </div>
            </div>
          )}

          {/* TAB: KERNING */}
          {activeTab === 'kerning' && (
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-[10px] text-zinc-400 uppercase tracking-wider">
                <span>Active Kerning Table ({kerningPairs.length} Pairs)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                {kerningPairs.slice(0, 12).map((kp) => (
                  <div key={kp.id} className="p-2 rounded bg-[#0e111a] border border-zinc-800 flex items-center justify-between">
                    <span className="font-bold text-white tracking-widest">{kp.left}{kp.right}</span>
                    <span className={`text-[11px] font-bold ${kp.value < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {kp.value > 0 ? `+${kp.value}` : kp.value}u
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: TIMELINE / HISTORY */}
          {activeTab === 'timeline' && (
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-[10px] text-zinc-400 uppercase tracking-wider">
                <span>Non-Destructive Edit Rollback Timeline</span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {historySteps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => onJumpToHistory?.(idx)}
                    className={`px-3 py-2 rounded-lg border text-left shrink-0 transition-all cursor-pointer ${
                      idx === currentHistoryIndex
                        ? 'bg-red-950/70 border-red-500 text-white font-bold shadow-[0_0_10px_rgba(220,38,38,0.3)]'
                        : idx < currentHistoryIndex
                        ? 'bg-[#0e111a] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                        : 'bg-[#080a10] border-zinc-900 text-zinc-600'
                    }`}
                  >
                    <span className="text-[9px] text-zinc-500 block">Step 0{idx + 1}</span>
                    <span className="text-[11px] font-sans truncate">{step}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB: VARIATIONS / MASTERS */}
          {activeTab === 'variations' && (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-[#0e111a] border border-zinc-800 space-y-1">
                <span className="text-[10px] text-zinc-500 block">Master 01: Light</span>
                <span className="text-white font-bold">Weight Class 300</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0e111a] border border-zinc-800 space-y-1">
                <span className="text-[10px] text-zinc-500 block">Master 02: Regular</span>
                <span className="text-white font-bold">Weight Class 400</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0e111a] border border-red-800/80 bg-red-950/20 space-y-1">
                <span className="text-[10px] text-red-400 block font-bold">Master 03: Bold (Active)</span>
                <span className="text-white font-bold">Weight Class 700</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0e111a] border border-zinc-800 space-y-1">
                <span className="text-[10px] text-zinc-500 block">Master 04: Black</span>
                <span className="text-white font-bold">Weight Class 900</span>
              </div>
            </div>
          )}

          {/* TAB: EXPERIMENT LAB & SHAPE DNA */}
          {activeTab === 'experiment' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-zinc-800/60">
                <div className="flex items-center gap-2">
                  <Dna className="w-4 h-4 text-red-500" />
                  <span className="font-bold text-white tracking-wide">EXPERIMENT LAB & SHAPE DNA</span>
                  <span className="text-[10px] text-zinc-500">Seed: #{expSeed}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setExpSeed(Math.floor(Math.random() * 90000) + 10000);
                      setExpComplexity(Math.floor(Math.random() * 80) + 20);
                      setExpDistortion(Math.floor(Math.random() * 60) + 10);
                    }}
                    className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 flex items-center gap-1.5 cursor-pointer text-[10px]"
                  >
                    <Shuffle className="w-3 h-3 text-red-400" />
                    <span>Randomize</span>
                  </button>
                  <button
                    onClick={() => {
                      onOpenTextureLab?.();
                    }}
                    className="px-2.5 py-1 rounded bg-red-950/80 hover:bg-red-900 text-red-200 hover:text-white border border-red-800/60 flex items-center gap-1.5 cursor-pointer text-[10px]"
                  >
                    <Sparkles className="w-3 h-3 text-red-400" />
                    <span>Open Material Shader</span>
                  </button>
                </div>
              </div>

              {/* DNA Bars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-zinc-400">
                    <span>Geometric Complexity</span>
                    <span className="text-white font-bold">{expComplexity}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-red-600 h-full rounded-full" style={{ width: `${expComplexity}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-zinc-400">
                    <span>Surface Distortion</span>
                    <span className="text-white font-bold">{expDistortion}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${expDistortion}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-zinc-400">
                    <span>Texture Roughness</span>
                    <span className="text-white font-bold">{expTextureRoughness}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-sky-500 h-full rounded-full" style={{ width: `${expTextureRoughness}%` }} />
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* 3. FOOTER TELEMETRY STATUS BAR (matching the exact ascii schema) */}
      <div className="h-8 bg-[#06080d] border-t border-zinc-900/90 px-4 flex items-center justify-between text-[11px] font-mono text-zinc-400 select-none">
        <div className="flex items-center space-x-4 sm:space-x-6">
          <span className="text-white font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Glyph: <span className="text-red-400 font-bold">{activeGlyph.char}</span>
          </span>
          <span>Unicode: <strong className="text-zinc-200">U+00{activeGlyph.char.charCodeAt(0).toString(16).toUpperCase()}</strong></span>
          <span>Width: <strong className="text-zinc-200">{activeGlyph.advanceWidth}</strong></span>
          <span>LSB: <strong className="text-zinc-200">{activeGlyph.leftSideBearing}</strong></span>
          <span>RSB: <strong className="text-zinc-200">{activeGlyph.rightSideBearing}</strong></span>
        </div>

        <div className="hidden sm:flex items-center space-x-4 text-[10px] text-zinc-500">
          <span>Nodes: <strong className="text-zinc-300">{totalNodes}</strong></span>
          <span>Contours: <strong className="text-zinc-300">{activeGlyph.contours.length}</strong></span>
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Health: 98%
          </span>
        </div>
      </div>

    </div>
  );
};
