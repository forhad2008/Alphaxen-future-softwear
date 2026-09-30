import React, { useState, useMemo } from 'react';
import { 
  Sliders, 
  Move, 
  Maximize2, 
  Eye, 
  Palette, 
  Check, 
  Sparkles, 
  HelpCircle,
  Hash,
  Activity,
  Wand2,
  RotateCcw,
  Scissors,
  Zap,
  Globe,
  Download,
  Upload,
  Shield,
  Box,
  Image as ImageIcon,
  Plus
} from 'lucide-react';
import { CustomGlyph, FontMetrics, FontWeightPreset, FontTextureConfig } from '../../types/fontLab';
import { TEXTURE_PRESETS, DEFAULT_TEXTURE_CONFIG } from '../../data/texturePresets';
import { simplifyGlyphContours } from '../../utils/pathSimplifier';

interface RightInspectorProps {
  glyph: CustomGlyph;
  metrics: FontMetrics;
  onUpdateGlyph: (updated: CustomGlyph) => void;
  onUpdateMetrics: (updated: FontMetrics) => void;
  activeWeight: string;
  weights: FontWeightPreset[];
  onChangeWeight?: (weight: string) => void;
  onSelectWeight?: (weight: string) => void;
  onOpenKerningModal?: () => void;
  onOpenOpenTypeModal?: () => void;
  fillColor?: string;
  setFillColor?: (c: string) => void;
  strokeColor?: string;
  setStrokeColor?: (c: string) => void;
  canvasBg?: string;
  setCanvasBg?: (c: string) => void;
  textureConfig?: FontTextureConfig;
  onOpenTextureStudio?: () => void;
  onUpdateTextureConfig?: (cfg: FontTextureConfig) => void;
}

export const RightInspector: React.FC<RightInspectorProps> = ({
  glyph,
  metrics,
  onUpdateGlyph,
  onUpdateMetrics,
  activeWeight,
  weights,
  onChangeWeight,
  onSelectWeight,
  onOpenKerningModal,
  onOpenOpenTypeModal,
  fillColor = '#E50914',
  setFillColor = () => {},
  strokeColor = '#FF1A1A',
  setStrokeColor = () => {},
  canvasBg = '#050505',
  setCanvasBg = () => {},
  textureConfig,
  onOpenTextureStudio,
  onUpdateTextureConfig
}) => {
  const handleWeightChange = onSelectWeight || onChangeWeight || (() => {});
  const totalNodes = glyph.contours.reduce((acc: number, c) => acc + c.points.length, 0);
  const activePreset = TEXTURE_PRESETS.find((p) => p.id === textureConfig?.presetId) || TEXTURE_PRESETS[0];

  const handleAdvanceWidthChange = (val: number) => {
    onUpdateGlyph({
      ...glyph,
      advanceWidth: val
    });
  };

  const handleLsbChange = (val: number) => {
    onUpdateGlyph({
      ...glyph,
      leftSideBearing: val
    });
  };

  const handleMetricChange = (field: keyof FontMetrics, val: number) => {
    onUpdateMetrics({
      ...metrics,
      [field]: val
    });
  };

  // Nudge / transform all points in glyph
  const transformPoints = (dx: number, dy: number) => {
    const updated = glyph.contours.map((c) => ({
      ...c,
      points: c.points.map((p) => ({
        ...p,
        x: p.x + dx,
        y: p.y + dy,
        handleIn: p.handleIn ? { x: p.handleIn.x + dx, y: p.handleIn.y + dy } : undefined,
        handleOut: p.handleOut ? { x: p.handleOut.x + dx, y: p.handleOut.y + dy } : undefined
      }))
    }));
    onUpdateGlyph({ ...glyph, contours: updated });
  };

  // Scale all points
  const scalePoints = (factor: number) => {
    const updated = glyph.contours.map((c) => ({
      ...c,
      points: c.points.map((p) => ({
        ...p,
        x: Math.round(p.x * factor),
        y: Math.round(p.y * factor),
        handleIn: p.handleIn ? { x: Math.round(p.handleIn.x * factor), y: Math.round(p.handleIn.y * factor) } : undefined,
        handleOut: p.handleOut ? { x: Math.round(p.handleOut.x * factor), y: Math.round(p.handleOut.y * factor) } : undefined
      }))
    }));
    onUpdateGlyph({ ...glyph, contours: updated });
  };

  // Simplify Path State & Calculation
  const [simplifyTolerance, setSimplifyTolerance] = useState<number>(12);
  const [originalGlyphBeforeSimplify, setOriginalGlyphBeforeSimplify] = useState<CustomGlyph | null>(null);
  const [isSimplifyApplied, setIsSimplifyApplied] = useState<boolean>(false);

  const simplifiedPreview = useMemo(() => {
    return simplifyGlyphContours(glyph, simplifyTolerance);
  }, [glyph, simplifyTolerance]);

  const previewNodesCount = useMemo(() => {
    return simplifiedPreview.contours.reduce((acc, c) => acc + c.points.length, 0);
  }, [simplifiedPreview]);

  const nodesSaved = Math.max(0, totalNodes - previewNodesCount);
  const percentReduction = totalNodes > 0 ? Math.round((nodesSaved / totalNodes) * 100) : 0;

  const handleApplySimplify = () => {
    if (!originalGlyphBeforeSimplify) {
      setOriginalGlyphBeforeSimplify(glyph);
    }
    onUpdateGlyph(simplifiedPreview);
    setIsSimplifyApplied(true);
  };

  const handleRevertSimplify = () => {
    if (originalGlyphBeforeSimplify) {
      onUpdateGlyph(originalGlyphBeforeSimplify);
      setOriginalGlyphBeforeSimplify(null);
      setIsSimplifyApplied(false);
    }
  };

  const [inspectorTab, setInspectorTab] = useState<'all' | 'properties' | 'transform' | '3d-material' | 'appearance' | 'effects' | 'opentype'>('all');
  const [textureCategoryFilter, setTextureCategoryFilter] = useState<'All' | 'Stone' | 'Grunge' | 'Metallic' | 'Planet' | 'Object' | 'Watermark' | 'Custom'>('All');
  const [quickWebUrl, setQuickWebUrl] = useState<string>('');

  // User Custom Uploaded Textures (stored in localStorage)
  const [customTextures, setCustomTextures] = useState<Array<{ id: string; name: string; url: string; createdAt: number }>>(() => {
    try {
      const stored = localStorage.getItem('alphaxen_user_textures');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.map((t: any) => ({
          id: t.id,
          name: t.name,
          url: t.imageUrl || t.url,
          createdAt: t.createdAt || Date.now()
        }));
      }
      return [];
    } catch {
      return [];
    }
  });

  const handleUploadTextureFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const newPreset = {
        id: `custom_${Date.now()}`,
        name: file.name.replace(/\.[^/.]+$/, '').slice(0, 16) || `Custom ${customTextures.length + 1}`,
        url: dataUrl,
        createdAt: Date.now()
      };
      const updated = [newPreset, ...customTextures];
      setCustomTextures(updated);
      try {
        localStorage.setItem('alphaxen_user_textures', JSON.stringify(updated));
      } catch {}

      if (onUpdateTextureConfig) {
        onUpdateTextureConfig({
          ...(textureConfig || DEFAULT_TEXTURE_CONFIG),
          enabled: true,
          type: 'custom-image',
          customImageUrl: dataUrl,
          scale: 1.2,
          opacity: 0.85,
          blendMode: 'overlay'
        });
      }
      setTextureCategoryFilter('Custom');
    };
    reader.readAsDataURL(file);
  };

  const handleQuickFetchWebTexture = () => {
    if (!quickWebUrl.trim() || !onUpdateTextureConfig) return;
    const newPreset = {
      id: `web_${Date.now()}`,
      name: `Web Texture ${customTextures.length + 1}`,
      url: quickWebUrl.trim(),
      createdAt: Date.now()
    };
    const updated = [newPreset, ...customTextures];
    setCustomTextures(updated);
    try {
      localStorage.setItem('alphaxen_user_textures', JSON.stringify(updated));
    } catch {}

    onUpdateTextureConfig({
      ...(textureConfig || DEFAULT_TEXTURE_CONFIG),
      enabled: true,
      type: 'custom-image',
      customImageUrl: quickWebUrl.trim(),
      scale: 1.2,
      opacity: 0.85,
      blendMode: 'overlay'
    });
    setQuickWebUrl('');
    setTextureCategoryFilter('Custom');
  };

  return (
    <aside className="w-80 bg-[#080a0f] border-l border-zinc-800/80 flex flex-col justify-between overflow-y-auto select-none z-20 shrink-0 text-xs">
      <div className="p-3.5 space-y-4">
        
        {/* INSPECTOR TABS HEADER WITH BRAND LOGO IN TOP CORNER */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase text-zinc-500 tracking-wider font-bold">
            <div className="flex items-center gap-2">
              <img 
                src="/logo.png" 
                alt="Alphaxen" 
                className="h-5 w-auto object-contain shrink-0" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }} 
              />
              <span>INSPECTOR</span>
            </div>
            <span className="text-red-400 font-bold">LIVE</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-1 text-[10px] font-mono">
            {[
              { id: 'all', label: 'All' },
              { id: '3d-material', label: '3D Material' },
              { id: 'properties', label: 'Properties' },
              { id: 'transform', label: 'Transform' },
              { id: 'appearance', label: 'Appearance' },
              { id: 'effects', label: 'Effects' },
              { id: 'opentype', label: 'OpenType' }
            ].map((tab) => {
              const isActive = inspectorTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setInspectorTab(tab.id as any)}
                  className={`py-1 px-1 rounded-md transition-all cursor-pointer text-center truncate ${
                    isActive
                      ? 'bg-red-950/70 border border-red-500/80 text-white font-bold shadow-[0_0_8px_rgba(220,38,38,0.25)]'
                      : 'bg-[#10131e] border border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* GLYPH IDENTIFICATION */}
        {(inspectorTab === 'all' || inspectorTab === 'properties') && (
          <div className="p-3 rounded-xl bg-[#0e111a] border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider">
                GLYPH PROPERTIES
              </span>
              <span className="text-[10px] font-mono text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-900/40 font-bold">
                U+{glyph.unicode.toString(16).toUpperCase().padStart(4, '0')}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#141824] border border-zinc-700 flex items-center justify-center font-display-serif text-2xl font-bold text-white shadow-inner">
                {glyph.char}
              </div>
              <div className="space-y-0.5">
                <h3 className="font-mono text-sm font-bold text-zinc-100">
                  Glyph '{glyph.char}'
                </h3>
                <p className="text-[10px] font-mono text-zinc-400">
                  Contours: {glyph.contours.length} | Nodes: {totalNodes}
                </p>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-1.5 py-0.2 rounded inline-block">
                  ✓ Designed & Compiled
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 1. SIMPLIFY PATH TOOL & TRANSFORM */}
        {(inspectorTab === 'all' || inspectorTab === 'transform') && (
          <>
            <div className="space-y-3 p-3 rounded-xl bg-[#10121a] border border-zinc-800/80 shadow-inner">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Wand2 className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-[10px] font-mono uppercase text-zinc-300 font-bold tracking-wider">
                    SIMPLIFY PATH
                  </span>
                </div>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border font-semibold ${
                  percentReduction > 0 
                    ? 'bg-red-950/60 text-red-400 border-red-800/50' 
                    : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                }`}>
                  {totalNodes} → {previewNodesCount} ({percentReduction > 0 ? `-${percentReduction}%` : '0%'})
                </span>
              </div>

              {/* Tolerance Slider */}
              <div className="space-y-1.5 font-mono">
                <div className="flex justify-between text-[10px] text-zinc-400">
                  <span>Threshold Tolerance</span>
                  <span className="text-white font-bold">{simplifyTolerance} UPM</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={simplifyTolerance}
                  onChange={(e) => setSimplifyTolerance(Number(e.target.value))}
                  className="w-full accent-red-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
                />
              </div>

              {/* Preset Threshold Pills */}
              <div className="grid grid-cols-3 gap-1.5 font-mono text-[9px]">
                <button
                  onClick={() => setSimplifyTolerance(4)}
                  className={`py-1 rounded border transition-colors cursor-pointer ${
                    simplifyTolerance === 4
                      ? 'bg-red-950/70 border-red-500 text-white font-bold'
                      : 'bg-[#161a24] border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  Gentle (4u)
                </button>
                <button
                  onClick={() => setSimplifyTolerance(12)}
                  className={`py-1 rounded border transition-colors cursor-pointer ${
                    simplifyTolerance === 12
                      ? 'bg-red-950/70 border-red-500 text-white font-bold'
                      : 'bg-[#161a24] border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  Balanced (12u)
                </button>
                <button
                  onClick={() => setSimplifyTolerance(26)}
                  className={`py-1 rounded border transition-colors cursor-pointer ${
                    simplifyTolerance === 26
                      ? 'bg-red-950/70 border-red-500 text-white font-bold'
                      : 'bg-[#161a24] border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  Aggressive (26u)
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1 font-mono text-[10px]">
                <button
                  onClick={handleApplySimplify}
                  disabled={nodesSaved === 0}
                  className="flex-1 py-1.5 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-semibold rounded-lg shadow-[0_0_12px_rgba(220,38,38,0.3)] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Zap className="w-3 h-3 text-amber-300" />
                  <span>Optimize Path</span>
                </button>

                {isSimplifyApplied && (
                  <button
                    onClick={handleRevertSimplify}
                    className="py-1.5 px-2 bg-[#161a24] hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    title="Revert to pre-simplified contour"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Revert</span>
                  </button>
                )}
              </div>
            </div>

            {/* TRANSFORM SECTION */}
            <div className="space-y-3 p-3 rounded-xl bg-[#10121a] border border-zinc-800/80">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
                <span>TRANSFORM & OFFSET</span>
                <Move className="w-3 h-3 text-zinc-600" />
              </div>

              <div className="grid grid-cols-4 gap-1.5 font-mono text-[11px]">
                <button
                  onClick={() => transformPoints(-10, 0)}
                  className="py-1.5 bg-[#141414] hover:bg-[#1C1C1C] border border-zinc-800 text-zinc-300 rounded cursor-pointer"
                  title="Nudge Left 10u"
                >
                  ← 10
                </button>
                <button
                  onClick={() => transformPoints(10, 0)}
                  className="py-1.5 bg-[#141414] hover:bg-[#1C1C1C] border border-zinc-800 text-zinc-300 rounded cursor-pointer"
                  title="Nudge Right 10u"
                >
                  → 10
                </button>
                <button
                  onClick={() => transformPoints(0, 10)}
                  className="py-1.5 bg-[#141414] hover:bg-[#1C1C1C] border border-zinc-800 text-zinc-300 rounded cursor-pointer"
                  title="Nudge Up 10u"
                >
                  ↑ 10
                </button>
                <button
                  onClick={() => transformPoints(0, -10)}
                  className="py-1.5 bg-[#141414] hover:bg-[#1C1C1C] border border-zinc-800 text-zinc-300 rounded cursor-pointer"
                  title="Nudge Down 10u"
                >
                  ↓ 10
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                <button
                  onClick={() => scalePoints(1.05)}
                  className="py-1.5 bg-[#141414] hover:bg-[#1C1C1C] border border-zinc-800 text-zinc-300 rounded cursor-pointer flex items-center justify-center gap-1"
                >
                  <Maximize2 className="w-3 h-3 text-zinc-400" />
                  <span>Scale +5%</span>
                </button>
                <button
                  onClick={() => scalePoints(0.95)}
                  className="py-1.5 bg-[#141414] hover:bg-[#1C1C1C] border border-zinc-800 text-zinc-300 rounded cursor-pointer flex items-center justify-center gap-1"
                >
                  <Maximize2 className="w-3 h-3 text-zinc-400 rotate-90" />
                  <span>Scale -5%</span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* 2. GLYPH METRICS & SPACING */}
        {(inspectorTab === 'all' || inspectorTab === 'properties') && (
          <div className="space-y-3 p-3 rounded-xl bg-[#10121a] border border-zinc-800/80">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
              <span>GLYPH SPACING & BEARINGS</span>
              <Activity className="w-3 h-3 text-zinc-600" />
            </div>

            <div className="space-y-2">
              <div>
                <div className="flex justify-between font-mono text-[11px] text-zinc-400 mb-1">
                  <span>Advance Width</span>
                  <span className="text-white font-bold">{glyph.advanceWidth} UPM</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="1200"
                  step="10"
                  value={glyph.advanceWidth}
                  onChange={(e) => handleAdvanceWidthChange(Number(e.target.value))}
                  className="w-full accent-[#E50914] h-1.5 bg-zinc-800 rounded cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-mono text-[11px] text-zinc-400 mb-1">
                  <span>Left Side Bearing (LSB)</span>
                  <span className="text-white font-bold">{glyph.leftSideBearing} UPM</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="5"
                  value={glyph.leftSideBearing}
                  onChange={(e) => handleLsbChange(Number(e.target.value))}
                  className="w-full accent-[#E50914] h-1.5 bg-zinc-800 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. VERTICAL METRICS */}
        {(inspectorTab === 'all' || inspectorTab === 'properties' || inspectorTab === 'opentype') && (
          <div className="space-y-3 p-3 rounded-xl bg-[#10121a] border border-zinc-800/80">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
              <span>VERTICAL METRICS (UPM: 1000)</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2 rounded bg-[#121212] border border-zinc-800 space-y-1">
                <span className="text-zinc-500 block text-[10px]">Cap Height</span>
                <input
                  type="number"
                  value={metrics.capHeight}
                  onChange={(e) => handleMetricChange('capHeight', Number(e.target.value))}
                  className="w-full bg-transparent text-white font-bold focus:outline-none"
                />
              </div>
              <div className="p-2 rounded bg-[#121212] border border-zinc-800 space-y-1">
                <span className="text-zinc-500 block text-[10px]">x-Height</span>
                <input
                  type="number"
                  value={metrics.xHeight}
                  onChange={(e) => handleMetricChange('xHeight', Number(e.target.value))}
                  className="w-full bg-transparent text-white font-bold focus:outline-none"
                />
              </div>
              <div className="p-2 rounded bg-[#121212] border border-zinc-800 space-y-1">
                <span className="text-zinc-500 block text-[10px]">Ascender</span>
                <input
                  type="number"
                  value={metrics.ascender}
                  onChange={(e) => handleMetricChange('ascender', Number(e.target.value))}
                  className="w-full bg-transparent text-white font-bold focus:outline-none"
                />
              </div>
              <div className="p-2 rounded bg-[#121212] border border-zinc-800 space-y-1">
                <span className="text-zinc-500 block text-[10px]">Descender</span>
                <input
                  type="number"
                  value={metrics.descender}
                  onChange={(e) => handleMetricChange('descender', Number(e.target.value))}
                  className="w-full bg-transparent text-white font-bold focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* 4. TYPOGRAPHY WEIGHT CUT */}
        {(inspectorTab === 'all' || inspectorTab === 'opentype') && (
          <div className="space-y-3 p-3 rounded-xl bg-[#10121a] border border-zinc-800/80">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
              <span>FONT WEIGHT INSTANCE</span>
            </div>

            <select
              value={activeWeight}
              onChange={(e) => handleWeightChange(e.target.value)}
              className="w-full bg-[#141414] border border-zinc-800 rounded p-2 text-zinc-200 font-mono focus:outline-none focus:border-[#E50914]"
            >
              {weights.map((w) => (
                <option key={w.name} value={w.name}>
                  {w.name} (usWeight: {w.weightClass})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 5. COLOR CONTROLS */}
        {(inspectorTab === 'all' || inspectorTab === 'appearance') && (
          <div className="space-y-3 p-3 rounded-xl bg-[#10121a] border border-zinc-800/80">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
              <span>CANVAS COLOR THEME</span>
              <Palette className="w-3 h-3 text-zinc-600" />
            </div>

            <div className="space-y-2 font-mono text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Glyph Silhouette Glow</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fillColor}
                    onChange={(e) => setFillColor(e.target.value)}
                    className="w-6 h-6 rounded border border-zinc-700 bg-transparent cursor-pointer"
                  />
                  <span className="text-zinc-300">{fillColor}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Outline Stroke</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={strokeColor}
                    onChange={(e) => setStrokeColor(e.target.value)}
                    className="w-6 h-6 rounded border border-zinc-700 bg-transparent cursor-pointer"
                  />
                  <span className="text-zinc-300">{strokeColor}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. 3D TEXTURE & MATERIAL PANEL */}
        {(inspectorTab === 'all' || inspectorTab === '3d-material' || inspectorTab === 'appearance' || inspectorTab === 'effects') && (
          <div className="space-y-3 pt-2 border-t border-zinc-900">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
            <span className="flex items-center gap-1.5 text-zinc-100 font-bold">
              <Box className="w-3.5 h-3.5 text-sky-400" />
              3D TEXTURE & MATERIAL
            </span>
            <span className="text-[9px] font-mono bg-red-950/60 text-red-400 border border-red-900/40 px-1.5 py-0.5 rounded">
              {textureConfig?.scope === 'glyph' ? 'Active Glyph' : 'All Glyphs'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#10121a] border border-zinc-800/90 space-y-3 font-mono text-[11px]">
            {/* Active Texture Header & Mini Specimen */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-zinc-200 font-bold truncate">{activePreset.name}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                  {activePreset.category}
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 line-clamp-2 leading-relaxed font-sans">
                {activePreset.description}
              </p>
              <div 
                className="w-full h-4 rounded-full border border-zinc-700 shadow-inner"
                style={{ background: activePreset.previewGradient }}
              />
            </div>

            {/* Scope Switcher: Active Glyph vs All Glyphs */}
            <div className="space-y-1">
              <span className="text-[9px] text-zinc-400 uppercase tracking-wider block">Application Scope</span>
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                <button
                  onClick={() => {
                    if (onUpdateTextureConfig) {
                      onUpdateTextureConfig({
                        ...(textureConfig || DEFAULT_TEXTURE_CONFIG),
                        scope: 'glyph'
                      });
                    }
                  }}
                  className={`py-1 rounded border transition-colors cursor-pointer ${
                    textureConfig?.scope === 'glyph'
                      ? 'bg-red-950/80 border-red-500 text-white font-bold'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  Active Glyph '{glyph.char}'
                </button>
                <button
                  onClick={() => {
                    if (onUpdateTextureConfig) {
                      onUpdateTextureConfig({
                        ...(textureConfig || DEFAULT_TEXTURE_CONFIG),
                        scope: 'font'
                      });
                    }
                  }}
                  className={`py-1 rounded border transition-colors cursor-pointer ${
                    textureConfig?.scope !== 'glyph'
                      ? 'bg-red-950/80 border-red-500 text-white font-bold'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  All Font Glyphs
                </button>
              </div>
            </div>

            {/* Category Selector Tabs */}
            <div className="space-y-1.5 pt-1 border-t border-zinc-800/60">
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-zinc-400 uppercase tracking-wider font-semibold">Texture Library</span>
                <span className="text-[9px] text-zinc-500 font-mono">{TEXTURE_PRESETS.length + customTextures.length} Presets</span>
              </div>
              
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                {(['All', 'Stone', 'Grunge', 'Metallic', 'Planet', 'Object', 'Watermark', 'Custom'] as const).map((cat) => {
                  const count = cat === 'All'
                    ? (TEXTURE_PRESETS.length + customTextures.length)
                    : cat === 'Custom'
                    ? customTextures.length
                    : TEXTURE_PRESETS.filter(p => p.category === cat || (cat === 'Stone' && p.category === 'Mineral')).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setTextureCategoryFilter(cat)}
                      className={`py-1 px-2 rounded-md border transition-colors cursor-pointer text-center whitespace-nowrap text-[9px] font-mono ${
                        textureCategoryFilter === cat
                          ? 'bg-red-950/70 border-red-500 text-white font-bold shadow-[0_0_8px_rgba(220,38,38,0.3)]'
                          : 'bg-[#141620] border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {cat === 'Planet' ? '🪐 Planets' : cat === 'Object' ? '🛡️ Objects' : cat === 'Watermark' ? '🔒 Watermark' : cat === 'Custom' ? '📁 Custom' : cat} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* UPLOAD TEXTURE BUTTON BAR */}
            <div className="flex items-center gap-2">
              <label className="flex-1 py-2 px-3 rounded-lg bg-[#141824] hover:bg-[#1a2030] border border-zinc-700/90 text-white font-mono text-[10px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(220,38,38,0.2)] hover:border-red-500">
                <Upload className="w-3.5 h-3.5 text-red-400" />
                <span>Upload Texture from Device</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadTextureFile}
                  className="hidden"
                />
              </label>
            </div>

            {/* Texture Presets Grid */}
            <div className="grid grid-cols-3 gap-1.5 max-h-44 overflow-y-auto p-1.5 bg-black/50 rounded-xl border border-zinc-800/80">
              {/* User Custom Uploaded Textures */}
              {(textureCategoryFilter === 'All' || textureCategoryFilter === 'Custom') && customTextures.map((ct) => {
                const isSelected = textureConfig?.type === 'custom-image' && textureConfig?.customImageUrl === ct.url;
                return (
                  <button
                    key={ct.id}
                    onClick={() => {
                      if (onUpdateTextureConfig) {
                        onUpdateTextureConfig({
                          ...(textureConfig || DEFAULT_TEXTURE_CONFIG),
                          enabled: true,
                          type: 'custom-image',
                          customImageUrl: ct.url,
                          scale: 1.2,
                          opacity: 0.85,
                          blendMode: 'overlay'
                        });
                      }
                    }}
                    className={`h-10 rounded-lg border text-[9px] font-mono transition-all cursor-pointer flex flex-col items-center justify-center relative overflow-hidden group ${
                      isSelected
                        ? 'border-red-500 shadow-[0_0_12px_rgba(220,38,38,0.6)] ring-1 ring-red-500 scale-[1.02]'
                        : 'border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:scale-[1.01]'
                    }`}
                    style={{ backgroundImage: `url(${ct.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    title={`${ct.name} (Custom Uploaded Texture)`}
                  >
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex flex-col items-center justify-center p-0.5 text-center">
                      <span className="text-[8px] text-white font-bold leading-tight drop-shadow line-clamp-1 px-1">
                        {ct.name}
                      </span>
                      <span className="text-[7px] text-emerald-400 font-bold uppercase tracking-tighter">
                        CUSTOM
                      </span>
                    </div>
                  </button>
                );
              })}

              {/* Standard Presets */}
              {textureCategoryFilter !== 'Custom' && TEXTURE_PRESETS.filter(p => {
                if (textureCategoryFilter === 'All') return true;
                if (textureCategoryFilter === 'Stone') return p.category === 'Stone' || p.category === 'Mineral';
                return p.category === textureCategoryFilter;
              }).map((p) => {
                const isSelected = textureConfig?.type !== 'custom-image' && textureConfig?.presetId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      if (onUpdateTextureConfig) {
                        onUpdateTextureConfig({
                          ...(textureConfig || DEFAULT_TEXTURE_CONFIG),
                          enabled: true,
                          type: 'preset-texture',
                          presetId: p.id,
                          colorStops: p.defaultStops,
                          blendMode: p.blendMode,
                          roughness: p.roughness,
                          bevelDepth: p.bevelDepth
                        });
                      }
                    }}
                    className={`h-10 rounded-lg border text-[9px] font-mono transition-all cursor-pointer flex flex-col items-center justify-center relative overflow-hidden group ${
                      isSelected
                        ? 'border-red-500 shadow-[0_0_12px_rgba(220,38,38,0.6)] ring-1 ring-red-500 scale-[1.02]'
                        : 'border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:scale-[1.01]'
                    }`}
                    style={{ background: p.previewGradient }}
                    title={`${p.name} (${p.category}) - Click to apply`}
                  >
                    <div className="absolute inset-0 bg-black/45 group-hover:bg-black/25 transition-colors flex flex-col items-center justify-center p-0.5 text-center">
                      <span className="text-[8px] text-white font-bold leading-tight drop-shadow line-clamp-1 px-1">
                        {p.name}
                      </span>
                      <span className="text-[7px] text-zinc-300 opacity-80 uppercase tracking-tighter">
                        {p.category}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

              {/* SVG Filter Shaders & Surface Controls */}
            <div className="space-y-2 pt-2 border-t border-zinc-800/60">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-zinc-400">SVG Filter Shader</span>
                <select
                  value={textureConfig?.svgFilterType || 'noise-grain'}
                  onChange={(e) => {
                    if (onUpdateTextureConfig) {
                      onUpdateTextureConfig({
                        ...(textureConfig || DEFAULT_TEXTURE_CONFIG),
                        svgFilterType: e.target.value as any
                      });
                    }
                  }}
                  className="bg-[#141620] border border-zinc-800 rounded px-2 py-0.5 text-zinc-200 text-[10px] focus:outline-none focus:border-red-500"
                >
                  <option value="none">None (Clean Vector)</option>
                  <option value="3d-extrusion">3D Dynamic Lighting & Extrude</option>
                  <option value="3d-watermark-relief">3D Watermark Tactile Relief</option>
                  <option value="metallic-emboss">Metallic 3D Emboss</option>
                  <option value="noise-grain">Noise Grain Filter</option>
                  <option value="turbulence-distortion">Turbulence Distortion</option>
                  <option value="neon-glow">Neon Outer Glow</option>
                </select>
              </div>

              {/* 3D TEXTURE MODEL SECTION */}
              <div className="p-2.5 rounded-xl bg-gradient-to-b from-[#101422] to-[#0a0d18] border border-sky-500/30 space-y-2.5 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-sky-400 font-mono">
                    <Box className="w-3.5 h-3.5" />
                    <span>3D TEXTURE MODEL</span>
                  </div>
                  <label className="flex items-center gap-1.5 cursor-pointer text-[9px] font-mono text-zinc-300">
                    <input
                      type="checkbox"
                      checked={!!textureConfig?.is3D}
                      onChange={(e) => {
                        if (onUpdateTextureConfig) {
                          onUpdateTextureConfig({
                            ...(textureConfig || DEFAULT_TEXTURE_CONFIG),
                            is3D: e.target.checked,
                            depth3D: textureConfig?.depth3D || 16,
                            lightAngle3D: textureConfig?.lightAngle3D ?? 135,
                            specularShine3D: textureConfig?.specularShine3D ?? 70
                          });
                        }
                      }}
                      className="accent-sky-500 rounded cursor-pointer"
                    />
                    <span>{textureConfig?.is3D ? 'Active' : 'Enable 3D'}</span>
                  </label>
                </div>

                {textureConfig?.is3D && (
                  <div className="space-y-2 pt-1 border-t border-sky-900/40 text-[9px] font-mono">
                    {/* 3D Extrusion Depth */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-zinc-400">
                        <span>3D Extrusion Depth</span>
                        <span className="text-sky-300 font-bold">{textureConfig?.depth3D ?? 16}px</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="40"
                        value={textureConfig?.depth3D ?? 16}
                        onChange={(e) => {
                          if (onUpdateTextureConfig) {
                            onUpdateTextureConfig({
                              ...(textureConfig || DEFAULT_TEXTURE_CONFIG),
                              depth3D: Number(e.target.value)
                            });
                          }
                        }}
                        className="w-full accent-sky-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
                      />
                    </div>

                    {/* Light Azimuth Angle */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-zinc-400">
                        <span>3D Light Direction</span>
                        <span className="text-sky-300 font-bold">{textureConfig?.lightAngle3D ?? 135}°</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={textureConfig?.lightAngle3D ?? 135}
                        onChange={(e) => {
                          if (onUpdateTextureConfig) {
                            onUpdateTextureConfig({
                              ...(textureConfig || DEFAULT_TEXTURE_CONFIG),
                              lightAngle3D: Number(e.target.value)
                            });
                          }
                        }}
                        className="w-full accent-sky-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
                      />
                    </div>

                    {/* Specular & Metallic Gloss */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <div className="flex justify-between text-zinc-400">
                          <span>Metallic Gloss</span>
                          <span className="text-sky-300 font-bold">{textureConfig?.metallicGloss ?? textureConfig?.specularShine3D ?? 70}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={textureConfig?.metallicGloss ?? textureConfig?.specularShine3D ?? 70}
                          onChange={(e) => {
                            if (onUpdateTextureConfig) {
                              onUpdateTextureConfig({
                                ...(textureConfig || DEFAULT_TEXTURE_CONFIG),
                                metallicGloss: Number(e.target.value),
                                specularShine3D: Number(e.target.value)
                              });
                            }
                          }}
                          className="w-full accent-sky-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-zinc-400">
                          <span>3D Elevation</span>
                          <span className="text-sky-300 font-bold">{textureConfig?.lightElevation3D ?? 45}°</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="90"
                          value={textureConfig?.lightElevation3D ?? 45}
                          onChange={(e) => {
                            if (onUpdateTextureConfig) {
                              onUpdateTextureConfig({
                                ...(textureConfig || DEFAULT_TEXTURE_CONFIG),
                                lightElevation3D: Number(e.target.value)
                              });
                            }
                          }}
                          className="w-full accent-sky-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3D WATERMARK MODEL SUB-PANEL */}
              <div className="p-2.5 rounded-xl bg-gradient-to-b from-[#181126] to-[#0e0a1a] border border-indigo-500/40 space-y-2.5 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-400 font-mono">
                    <Shield className="w-3.5 h-3.5" />
                    <span>3D WATERMARKS</span>
                  </div>
                  <label className="flex items-center gap-1.5 cursor-pointer text-[9px] font-mono text-zinc-300">
                    <input
                      type="checkbox"
                      checked={!!textureConfig?.watermark3D?.enabled}
                      onChange={(e) => {
                        if (onUpdateTextureConfig) {
                          onUpdateTextureConfig({
                            ...(textureConfig || DEFAULT_TEXTURE_CONFIG),
                            watermark3D: {
                              enabled: e.target.checked,
                              type: textureConfig?.watermark3D?.type || 'guilloche',
                              opacity: textureConfig?.watermark3D?.opacity ?? 0.75,
                              depth: textureConfig?.watermark3D?.depth ?? 8,
                              extrusion: textureConfig?.watermark3D?.extrusion ?? 6,
                              metallicGloss: textureConfig?.watermark3D?.metallicGloss ?? 80,
                              scale: textureConfig?.watermark3D?.scale ?? 1.0,
                              angle: textureConfig?.watermark3D?.angle ?? 135,
                              blendMode: textureConfig?.watermark3D?.blendMode || 'screen',
                              repeat: textureConfig?.watermark3D?.repeat ?? true
                            }
                          });
                        }
                      }}
                      className="accent-indigo-500 rounded cursor-pointer"
                    />
                    <span>{textureConfig?.watermark3D?.enabled ? 'Active' : 'Enable 3D Seal'}</span>
                  </label>
                </div>

                {textureConfig?.watermark3D?.enabled && (
                  <div className="space-y-2.5 pt-1 border-t border-indigo-900/40 text-[9px] font-mono">
                    {/* Watermark Type Selector */}
                    <div className="space-y-1">
                      <span className="text-zinc-400 block">3D Security Watermark Preset</span>
                      <select
                        value={textureConfig.watermark3D.type}
                        onChange={(e) => {
                          if (onUpdateTextureConfig) {
                            onUpdateTextureConfig({
                              ...(textureConfig || DEFAULT_TEXTURE_CONFIG),
                              watermark3D: {
                                ...textureConfig.watermark3D!,
                                type: e.target.value as any
                              }
                            });
                          }
                        }}
                        className="w-full bg-[#120d20] border border-indigo-700/60 rounded px-2 py-1 text-zinc-100 text-[9px] focus:outline-none focus:border-indigo-400 cursor-pointer"
                      >
                        <option value="guilloche">🏦 Banknote Trigonometric Guilloche</option>
                        <option value="embossed-seal">🛡️ 3D Royal Minting Crest Seal</option>
                        <option value="hologram">🌈 Prismatic Diffraction Hologram</option>
                        <option value="postal-stamp">✉️ 3D Certified Postal Cancellation</option>
                        <option value="security-pattern">🔒 Cryptographic Micro-Grid Mesh</option>
                      </select>
                    </div>

                    {/* 1. DEPTH & 2. EXTRUSION CONTROLS */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <div className="flex justify-between text-zinc-400">
                          <span>3D Depth</span>
                          <span className="text-indigo-300 font-bold">{textureConfig.watermark3D.depth}px</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="30"
                          value={textureConfig.watermark3D.depth}
                          onChange={(e) => {
                            if (onUpdateTextureConfig) {
                              onUpdateTextureConfig({
                                ...(textureConfig || DEFAULT_TEXTURE_CONFIG),
                                watermark3D: {
                                  ...textureConfig.watermark3D!,
                                  depth: Number(e.target.value)
                                }
                              });
                            }
                          }}
                          className="w-full accent-indigo-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-zinc-400">
                          <span>3D Extrusion</span>
                          <span className="text-indigo-300 font-bold">{textureConfig.watermark3D.extrusion ?? 6}px</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="30"
                          value={textureConfig.watermark3D.extrusion ?? 6}
                          onChange={(e) => {
                            if (onUpdateTextureConfig) {
                              onUpdateTextureConfig({
                                ...(textureConfig || DEFAULT_TEXTURE_CONFIG),
                                watermark3D: {
                                  ...textureConfig.watermark3D!,
                                  extrusion: Number(e.target.value)
                                }
                              });
                            }
                          }}
                          className="w-full accent-indigo-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* 3. METALLIC-GLOSS & OPACITY CONTROLS */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <div className="flex justify-between text-zinc-400">
                          <span>Metallic Gloss</span>
                          <span className="text-indigo-300 font-bold">{textureConfig.watermark3D.metallicGloss ?? 80}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={textureConfig.watermark3D.metallicGloss ?? 80}
                          onChange={(e) => {
                            if (onUpdateTextureConfig) {
                              onUpdateTextureConfig({
                                ...(textureConfig || DEFAULT_TEXTURE_CONFIG),
                                watermark3D: {
                                  ...textureConfig.watermark3D!,
                                  metallicGloss: Number(e.target.value)
                                }
                              });
                            }
                          }}
                          className="w-full accent-indigo-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-zinc-400">
                          <span>Seal Opacity</span>
                          <span className="text-indigo-300 font-bold">{Math.round(textureConfig.watermark3D.opacity * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min="0.1"
                          max="1"
                          step="0.05"
                          value={textureConfig.watermark3D.opacity}
                          onChange={(e) => {
                            if (onUpdateTextureConfig) {
                              onUpdateTextureConfig({
                                ...(textureConfig || DEFAULT_TEXTURE_CONFIG),
                                watermark3D: {
                                  ...textureConfig.watermark3D!,
                                  opacity: Number(e.target.value)
                                }
                              });
                            }
                          }}
                          className="w-full accent-indigo-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Surface Roughness / Grain */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-zinc-400">
                  <span>Surface Grain / Noise</span>
                  <span className="text-white font-bold">{textureConfig?.roughness ?? 35}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={textureConfig?.roughness ?? 35}
                  onChange={(e) => {
                    if (onUpdateTextureConfig) {
                      onUpdateTextureConfig({
                        ...(textureConfig || DEFAULT_TEXTURE_CONFIG),
                        roughness: Number(e.target.value)
                      });
                    }
                  }}
                  className="w-full accent-red-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
                />
              </div>

              {/* 3D Bevel Depth */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-zinc-400">
                  <span>3D Bevel / Emboss Depth</span>
                  <span className="text-white font-bold">{textureConfig?.bevelDepth ?? 10}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={textureConfig?.bevelDepth ?? 10}
                  onChange={(e) => {
                    if (onUpdateTextureConfig) {
                      onUpdateTextureConfig({
                        ...(textureConfig || DEFAULT_TEXTURE_CONFIG),
                        bevelDepth: Number(e.target.value)
                      });
                    }
                  }}
                  className="w-full accent-red-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
                />
              </div>

              {/* Blend Mode */}
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-zinc-400">Composite Blend</span>
                <select
                  value={textureConfig?.blendMode || 'overlay'}
                  onChange={(e) => {
                    if (onUpdateTextureConfig) {
                      onUpdateTextureConfig({
                        ...(textureConfig || DEFAULT_TEXTURE_CONFIG),
                        blendMode: e.target.value as any
                      });
                    }
                  }}
                  className="bg-[#141620] border border-zinc-800 rounded px-2 py-0.5 text-zinc-200 text-[10px] focus:outline-none focus:border-red-500"
                >
                  <option value="normal">Normal</option>
                  <option value="overlay">Overlay</option>
                  <option value="screen">Screen</option>
                  <option value="color-dodge">Color Dodge</option>
                  <option value="hard-light">Hard Light</option>
                  <option value="multiply">Multiply</option>
                </select>
              </div>
            </div>

            {/* QUICK WEB / GOOGLE IMAGE DOWNLOADER */}
            <div className="p-2.5 rounded-lg bg-black/60 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400">
                <span className="flex items-center gap-1 font-bold text-zinc-300">
                  <Globe className="w-3 h-3 text-red-400" />
                  DOWNLOAD FROM WEB / GOOGLE
                </span>
              </div>
              <div className="flex gap-1.5">
                <input
                  type="url"
                  value={quickWebUrl}
                  onChange={(e) => setQuickWebUrl(e.target.value)}
                  placeholder="Paste web image URL..."
                  className="flex-1 bg-[#141620] border border-zinc-800 rounded px-2 py-1 text-[10px] text-white focus:outline-none focus:border-red-500"
                />
                <button
                  onClick={handleQuickFetchWebTexture}
                  disabled={!quickWebUrl.trim()}
                  className="px-2.5 py-1 bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white rounded text-[10px] font-bold font-mono transition-colors cursor-pointer flex items-center gap-1"
                  title="Download and apply as texture"
                >
                  <Download className="w-3 h-3" />
                  <span>Fetch</span>
                </button>
              </div>
            </div>

            {/* OPEN FULL CUSTOM WEB TEXTURE MAKER MODAL */}
            {onOpenTextureStudio && (
              <button
                onClick={onOpenTextureStudio}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-900/80 via-red-800/80 to-red-900/80 hover:from-red-700 hover:to-red-600 text-white font-bold border border-red-600/50 flex items-center justify-center gap-2 font-mono text-[10px] tracking-wide transition-all cursor-pointer shadow-[0_0_15px_rgba(220,38,38,0.35)] hover:scale-[1.01]"
              >
                <Globe className="w-3.5 h-3.5 text-amber-300" />
                <span>Web Texture Downloader & Shader Maker</span>
              </button>
            )}
          </div>
        </div>
        )}

      </div>

      {/* FOOTER METRICS SUMMARY */}
      <div className="p-3 bg-[#0E0E0E] border-t border-zinc-900 text-[10px] font-mono text-zinc-500 space-y-1">
        <div className="flex justify-between">
          <span>SFNT Type:</span>
          <span className="text-zinc-300">OpenType CFF / TrueType</span>
        </div>
        <div className="flex justify-between">
          <span>Engine Status:</span>
          <span className="text-emerald-400">Ready for compilation</span>
        </div>
      </div>
    </aside>
  );
};
