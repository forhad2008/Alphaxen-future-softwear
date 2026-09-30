import React, { useState, useRef } from 'react';
import { 
  X, 
  Palette, 
  Upload, 
  Sliders, 
  Sparkles, 
  Check, 
  Download, 
  Copy, 
  RotateCw, 
  Layers, 
  Eye,
  Trash2,
  Plus,
  Compass
} from 'lucide-react';
import { FontTextureConfig, TexturePresetId } from '../../types/fontLab';
import { TEXTURE_PRESETS, DEFAULT_TEXTURE_CONFIG } from '../../data/texturePresets';

interface TextureColorStudioModalProps {
  textureConfig?: FontTextureConfig;
  activeChar: string;
  onUpdateTextureConfig: (config: FontTextureConfig) => void;
  onClose: () => void;
}

export const TextureColorStudioModal: React.FC<TextureColorStudioModalProps> = ({
  textureConfig = DEFAULT_TEXTURE_CONFIG,
  activeChar = 'A',
  onUpdateTextureConfig,
  onClose
}) => {
  const [config, setConfig] = useState<FontTextureConfig>(textureConfig);
  const [copiedCss, setCopiedCss] = useState<boolean>(false);
  const [exportingPng, setExportingPng] = useState<boolean>(false);
  const [previewString, setPreviewString] = useState<string>(activeChar);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activePreset = TEXTURE_PRESETS.find((p) => p.id === config.presetId) || TEXTURE_PRESETS[0];

  const handleSelectPreset = (presetId: TexturePresetId) => {
    const preset = TEXTURE_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setConfig((prev) => ({
      ...prev,
      type: 'preset-texture',
      presetId,
      blendMode: preset.blendMode,
      roughness: preset.roughness,
      bevelDepth: preset.bevelDepth,
      colorStops: preset.defaultStops
    }));
  };

  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setConfig((prev) => ({
        ...prev,
        type: 'custom-image',
        customImageUrl: dataUrl
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleColorStopChange = (index: number, newColor: string) => {
    const updated = [...config.colorStops];
    updated[index] = { ...updated[index], color: newColor };
    setConfig((prev) => ({ ...prev, colorStops: updated }));
  };

  const handleAddColorStop = () => {
    if (config.colorStops.length >= 6) return;
    const last = config.colorStops[config.colorStops.length - 1];
    setConfig((prev) => ({
      ...prev,
      colorStops: [...prev.colorStops, { offset: 1, color: '#DC2626' }]
    }));
  };

  const handleRemoveColorStop = (index: number) => {
    if (config.colorStops.length <= 2) return;
    setConfig((prev) => ({
      ...prev,
      colorStops: prev.colorStops.filter((_, i) => i !== index)
    }));
  };

  const generateCssSnippet = () => {
    const gradientStops = config.colorStops
      .map((s) => `${s.color} ${Math.round(s.offset * 100)}%`)
      .join(', ');

    return `/* Alphaxen-FontLab Material Texture Stylesheet */
.alphaxen-textured-glyph {
  font-family: 'Alphaxen', sans-serif;
  background: linear-gradient(${config.gradientAngle}deg, ${gradientStops});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  ${config.type === 'custom-image' && config.customImageUrl ? `background-image: url('${config.customImageUrl}');\n  background-size: ${config.scale * 100}%;` : ''}
  filter: drop-shadow(0 ${config.bevelDepth}px ${config.bevelDepth * 1.5}px rgba(0,0,0,0.85)) 
          contrast(${100 + config.roughness}%)
          brightness(${100 + (config.opacity * 20)}%);
  -webkit-text-stroke: ${config.strokeWidth}px ${config.strokeColor};
}`;
  };

  const handleCopyCss = () => {
    navigator.clipboard.writeText(generateCssSnippet());
    setCopiedCss(true);
    setTimeout(() => setCopiedCss(false), 2400);
  };

  const handleExportTexturedPng = () => {
    setExportingPng(true);
    const canvas = document.createElement('canvas');
    canvas.width = 1600;
    canvas.height = 1600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dark Studio Background
    ctx.fillStyle = '#06070a';
    ctx.fillRect(0, 0, 1600, 1600);

    // Vignette
    const radial = ctx.createRadialGradient(800, 800, 200, 800, 800, 900);
    radial.addColorStop(0, 'rgba(220, 38, 38, 0.08)');
    radial.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, 1600, 1600);

    // Bevel shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = config.bevelDepth * 3;
    ctx.shadowOffsetY = config.bevelDepth * 1.5;

    // Draw textured glyph
    ctx.font = 'bold 700px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const grad = ctx.createLinearGradient(400, 300, 1200, 1300);
    config.colorStops.forEach((s) => {
      grad.addColorStop(s.offset, s.color);
    });
    ctx.fillStyle = grad;
    ctx.fillText(previewString || 'A', 800, 800);

    // Stroke
    if (config.strokeWidth > 0) {
      ctx.lineWidth = config.strokeWidth * 4;
      ctx.strokeStyle = config.strokeColor;
      ctx.strokeText(previewString || 'A', 800, 800);
    }

    // Watermark
    ctx.shadowColor = 'transparent';
    ctx.font = '24px monospace';
    ctx.fillStyle = '#71717a';
    ctx.fillText('ALPHAXEN-FONTLAB™ • TEXTURE LAB RENDER 4K', 800, 1500);

    // Trigger download
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `alphaxen-texture-${config.presetId}-${Date.now()}.png`;
    a.click();
    setExportingPng(false);
  };

  const handleApply = () => {
    onUpdateTextureConfig(config);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn select-none text-xs">
      <div className="relative w-full max-w-6xl bg-[#090b10] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh]">
        
        {/* MODAL HEADER */}
        <div className="p-5 bg-[#0e1118] border-b border-zinc-800/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Alphaxen Logo" 
              className="h-8 w-auto max-w-[120px] object-contain shrink-0" 
              onError={(e) => { e.currentTarget.style.display = 'none'; }} 
            />
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center text-white shrink-0">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-mono text-sm sm:text-base font-bold text-white tracking-wide">
                  FONT TEXTURE, SHADER & COLOR LAB
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-950/60 text-red-400 border border-red-800/40 font-semibold">
                  SURFACE ENGINE
                </span>
              </div>
              <p className="text-[11px] font-mono text-zinc-400">
                Apply procedural materials, custom texture photography, gradients, and 3D bevels to typeface glyphs
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

        {/* BODY: CONTROLS & PRESET GALLERY (LEFT) + REAL-TIME GLYPH RENDER (RIGHT) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* LEFT COLUMN: MATERIAL PARAMETERS & PRESET SELECTION */}
          <div className="lg:col-span-7 p-6 overflow-y-auto space-y-6 bg-[#07090e] border-r border-zinc-800/80">
            
            {/* 1. APPLICATION SCOPE & FILL MODE SELECTOR */}
            <div className="space-y-3">
              {/* Application Scope */}
              <div className="space-y-1.5 p-3 rounded-xl bg-[#0c0f16] border border-zinc-800/80">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                    Application Scope
                  </label>
                  <span className="text-[10px] font-mono text-red-400">
                    {config.scope === 'font' ? 'All Glyphs' : `Glyph '${activeChar}'`}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-xs pt-1">
                  <button
                    onClick={() => setConfig((prev) => ({ ...prev, scope: 'font' }))}
                    className={`py-2 px-3 rounded-lg border text-center transition-all cursor-pointer ${
                      config.scope === 'font'
                        ? 'bg-red-950/50 border-red-500 text-white font-bold shadow-[0_0_10px_rgba(220,38,38,0.3)]'
                        : 'bg-[#10141d] border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>Full Font Set (All Glyphs)</span>
                  </button>

                  <button
                    onClick={() => setConfig((prev) => ({ ...prev, scope: 'glyph' }))}
                    className={`py-2 px-3 rounded-lg border text-center transition-all cursor-pointer ${
                      config.scope === 'glyph'
                        ? 'bg-red-950/50 border-red-500 text-white font-bold shadow-[0_0_10px_rgba(220,38,38,0.3)]'
                        : 'bg-[#10141d] border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>Individual Glyph ('{activeChar}')</span>
                  </button>
                </div>
              </div>

              {/* Fill Mode */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider font-semibold block">
                  Material Fill Mode
                </label>

                <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                  <button
                    onClick={() => setConfig((prev) => ({ ...prev, type: 'preset-texture' }))}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      config.type === 'preset-texture'
                        ? 'bg-red-950/40 border-red-500 text-white font-bold shadow-[0_0_15px_rgba(220,38,38,0.25)]'
                        : 'bg-[#0e1118] border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-red-400" />
                    <span>Procedural Texture</span>
                  </button>

                  <button
                    onClick={() => setConfig((prev) => ({ ...prev, type: 'custom-image' }))}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      config.type === 'custom-image'
                        ? 'bg-red-950/40 border-red-500 text-white font-bold shadow-[0_0_15px_rgba(220,38,38,0.25)]'
                        : 'bg-[#0e1118] border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    <Upload className="w-4 h-4 text-amber-400" />
                    <span>Custom Image Upload</span>
                  </button>

                  <button
                    onClick={() => setConfig((prev) => ({ ...prev, type: 'gradient' }))}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      config.type === 'gradient'
                        ? 'bg-red-950/40 border-red-500 text-white font-bold shadow-[0_0_15px_rgba(220,38,38,0.25)]'
                        : 'bg-[#0e1118] border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    <Palette className="w-4 h-4 text-cyan-400" />
                    <span>Multi-Stop Gradient</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 2. PRESET TEXTURE TILES (IF PRESET-TEXTURE) */}
            {config.type === 'preset-texture' && (
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider font-semibold block">
                  Curated Material Finishes ({TEXTURE_PRESETS.length})
                </label>

                <div className="grid grid-cols-3 gap-2.5">
                  {TEXTURE_PRESETS.map((preset) => {
                    const isSelected = config.presetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => handleSelectPreset(preset.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                          isSelected
                            ? 'bg-[#151926] border-red-500/80 shadow-[0_0_15px_rgba(220,38,38,0.25)]'
                            : 'bg-[#0c0f16] border-zinc-800/80 hover:border-zinc-700'
                        }`}
                      >
                        <div 
                          className="w-full h-10 rounded-lg border border-zinc-700 shadow-inner"
                          style={{ background: preset.previewGradient }}
                        />
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-[11px] truncate">{preset.name}</span>
                          <span className="text-[9px] font-mono text-zinc-500">{preset.category}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. CUSTOM IMAGE TEXTURE UPLOADER (IF CUSTOM-IMAGE) */}
            {config.type === 'custom-image' && (
              <div className="space-y-3 p-4 rounded-xl bg-[#0c0f16] border border-zinc-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                    Upload Any Texture Image
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">JPG, PNG, WEBP</span>
                </div>

                <div className="p-6 border-2 border-dashed border-zinc-700 hover:border-red-500 rounded-xl text-center space-y-2 relative bg-black/40 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-zinc-400 mx-auto" />
                  <p className="text-xs text-zinc-300 font-medium">
                    Drop any texture file here (marble, concrete, leather, rust, iridescent paper)
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCustomImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>

                {config.customImageUrl && (
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                    <img
                      src={config.customImageUrl}
                      alt="Custom texture preview"
                      className="w-12 h-12 rounded object-cover border border-zinc-700"
                    />
                    <div className="text-[11px] font-mono text-zinc-300 flex-1">
                      <span>Custom image texture loaded & active</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 4. GRADIENT & COLOR MAP CONTROLS */}
            <div className="space-y-3 p-4 rounded-xl bg-[#0c0f16] border border-zinc-800/80">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                  Color Map & Gradient Stops ({config.colorStops.length})
                </span>
                <button
                  onClick={handleAddColorStop}
                  className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-mono flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Color</span>
                </button>
              </div>

              {/* Color stops row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {config.colorStops.map((stop, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-black/50 border border-zinc-800 space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                      <span>Stop #{idx + 1}</span>
                      {config.colorStops.length > 2 && (
                        <button
                          onClick={() => handleRemoveColorStop(idx)}
                          className="text-zinc-600 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={stop.color}
                        onChange={(e) => handleColorStopChange(idx, e.target.value)}
                        className="w-7 h-7 rounded border border-zinc-700 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={stop.color}
                        onChange={(e) => handleColorStopChange(idx, e.target.value)}
                        className="w-full bg-transparent text-[11px] font-mono text-white focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Gradient angle slider */}
              <div className="pt-2 flex items-center justify-between font-mono text-[11px]">
                <span className="text-zinc-400">Gradient Angle</span>
                <div className="flex items-center gap-3 w-48">
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="5"
                    value={config.gradientAngle}
                    onChange={(e) => setConfig((prev) => ({ ...prev, gradientAngle: Number(e.target.value) }))}
                    className="w-full accent-red-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
                  />
                  <span className="text-white w-10 text-right">{config.gradientAngle}°</span>
                </div>
              </div>
            </div>

            {/* 5. PHYSICAL SHADING & SURFACE PROPERTIES */}
            <div className="space-y-4 p-4 rounded-xl bg-[#0c0f16] border border-zinc-800/80 font-mono text-[11px]">
              <span className="text-[10px] uppercase text-zinc-400 font-semibold tracking-wider block">
                Physical Shading & Surface Depth
              </span>

              {/* Texture Scale */}
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Texture Scale</span>
                <div className="flex items-center gap-3 w-48">
                  <input
                    type="range"
                    min="0.2"
                    max="4"
                    step="0.1"
                    value={config.scale}
                    onChange={(e) => setConfig((prev) => ({ ...prev, scale: Number(e.target.value) }))}
                    className="w-full accent-red-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
                  />
                  <span className="text-white w-10 text-right">{config.scale.toFixed(1)}x</span>
                </div>
              </div>

              {/* Texture Opacity */}
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Texture Opacity</span>
                <div className="flex items-center gap-3 w-48">
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={config.opacity}
                    onChange={(e) => setConfig((prev) => ({ ...prev, opacity: Number(e.target.value) }))}
                    className="w-full accent-red-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
                  />
                  <span className="text-white w-10 text-right">{Math.round(config.opacity * 100)}%</span>
                </div>
              </div>

              {/* Surface Roughness / Grain */}
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Surface Grain / Noise</span>
                <div className="flex items-center gap-3 w-48">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={config.roughness}
                    onChange={(e) => setConfig((prev) => ({ ...prev, roughness: Number(e.target.value) }))}
                    className="w-full accent-red-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
                  />
                  <span className="text-white w-10 text-right">{config.roughness}%</span>
                </div>
              </div>

              {/* 3D Bevel Depth */}
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">3D Bevel & Emboss Shadow</span>
                <div className="flex items-center gap-3 w-48">
                  <input
                    type="range"
                    min="0"
                    max="25"
                    step="1"
                    value={config.bevelDepth}
                    onChange={(e) => setConfig((prev) => ({ ...prev, bevelDepth: Number(e.target.value) }))}
                    className="w-full accent-red-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
                  />
                  <span className="text-white w-10 text-right">{config.bevelDepth}px</span>
                </div>
              </div>

              {/* Stroke Outline & Width */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
                <span className="text-zinc-400">Outline Stroke & Width</span>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={config.strokeColor}
                    onChange={(e) => setConfig((prev) => ({ ...prev, strokeColor: e.target.value }))}
                    className="w-6 h-6 rounded border border-zinc-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max="6"
                    step="0.5"
                    value={config.strokeWidth}
                    onChange={(e) => setConfig((prev) => ({ ...prev, strokeWidth: Number(e.target.value) }))}
                    className="w-24 accent-red-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
                  />
                  <span className="text-white w-10 text-right">{config.strokeWidth}px</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: REAL-TIME GLYPH SPECIMEN PREVIEW & OUTPUT ACTIONS */}
          <div className="lg:col-span-5 p-6 flex flex-col justify-between space-y-6 bg-[#090b10]">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider font-semibold">
                  Real-Time Glyph Shader Preview
                </span>
                <input
                  type="text"
                  maxLength={5}
                  value={previewString}
                  onChange={(e) => setPreviewString(e.target.value.toUpperCase() || 'A')}
                  className="w-20 bg-zinc-900 border border-zinc-800 text-center font-bold text-white text-xs py-1 rounded focus:border-red-500 focus:outline-none font-mono"
                  title="Change preview character"
                />
              </div>

              {/* GIANT PREVIEW CARD WITH ACTIVE TEXTURE SHADER */}
              <div className="relative aspect-square w-full rounded-2xl bg-[#050608] border border-zinc-800 overflow-hidden flex items-center justify-center shadow-2xl p-6">
                
                {/* Background grid */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(220,38,38,0.12)_0%,_transparent_70%)] pointer-events-none" />

                {/* SVG pattern overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                  <defs dangerouslySetInnerHTML={{ __html: activePreset.svgPatternSvg }} />
                  <rect width="100%" height="100%" fill={`url(#pattern-${activePreset.id})`} />
                </svg>

                {/* Custom texture image background overlay if uploaded */}
                {config.type === 'custom-image' && config.customImageUrl && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `url(${config.customImageUrl})`,
                      backgroundSize: `${config.scale * 100}%`,
                      opacity: config.opacity,
                      mixBlendMode: config.blendMode
                    }}
                  />
                )}

                {/* The Big Textured Glyph */}
                <div 
                  className="relative select-none text-center font-display-serif font-black tracking-widest transition-all duration-150"
                  style={{
                    fontSize: previewString.length > 2 ? '7rem' : '11rem',
                    background: `linear-gradient(${config.gradientAngle}deg, ${config.colorStops.map((s) => `${s.color} ${Math.round(s.offset * 100)}%`).join(', ')})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: `drop-shadow(0 ${config.bevelDepth}px ${config.bevelDepth * 1.4}px rgba(0,0,0,0.9)) contrast(${100 + config.roughness}%) brightness(${100 + (config.opacity * 20)}%)`,
                    WebkitTextStroke: `${config.strokeWidth}px ${config.strokeColor}`
                  }}
                >
                  {previewString}
                </div>

                {/* Telemetry pill */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-zinc-500 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-800">
                  <span>Shader: <span className="text-zinc-300 font-bold">{config.type}</span></span>
                  <span>Preset: <span className="text-red-400 font-bold">{activePreset.name}</span></span>
                  <span>Bevel: <span className="text-zinc-300">{config.bevelDepth}px</span></span>
                </div>
              </div>

              {/* CSS Code Preview Snippet */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span>CSS & Webfont Texture Snippet</span>
                  <button
                    onClick={handleCopyCss}
                    className="flex items-center gap-1 text-red-400 hover:text-red-300 cursor-pointer"
                  >
                    {copiedCss ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCss ? 'Copied CSS!' : 'Copy Code'}</span>
                  </button>
                </div>

                <pre className="p-3 rounded-lg bg-black/80 border border-zinc-800 text-[10px] font-mono text-zinc-400 overflow-x-auto max-h-24 no-scrollbar">
                  <code>{generateCssSnippet()}</code>
                </pre>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-2 pt-4 border-t border-zinc-800/80">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportTexturedPng}
                  disabled={exportingPng}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-mono text-xs font-semibold cursor-pointer transition-colors"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>{exportingPng ? 'Rendering...' : 'Export 4K Texture PNG'}</span>
                </button>

                <button
                  onClick={handleApply}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white font-mono text-xs font-semibold shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <Check className="w-4 h-4" />
                  <span>Apply to Font Studio</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
