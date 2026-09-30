import React, { useState } from 'react';
import { 
  Paintbrush, 
  Flame, 
  Mountain, 
  Sparkles, 
  Sliders, 
  Trash2, 
  RotateCcw, 
  Layers,
  ChevronDown,
  ChevronUp,
  X,
  Box,
  Shield,
  Wand2
} from 'lucide-react';
import { TextureBrushCategory, TextureBrushStroke, CustomGlyph, FontMetrics } from '../../types/fontLab';
import { 
  TEXTURE_BRUSH_CATEGORIES, 
  TEXTURE_BRUSH_VARIANTS, 
  TextureBrushVariant 
} from '../../data/textureBrushLibrary';

interface TextureBrushControlsProps {
  selectedCategory: TextureBrushCategory;
  onSelectCategory: (cat: TextureBrushCategory) => void;
  selectedVariantId: string;
  onSelectVariant: (variantId: string) => void;
  brushSize: number;
  onSetBrushSize: (size: number) => void;
  brushOpacity: number;
  onSetBrushOpacity: (opacity: number) => void;
  brushColor: string;
  onSetBrushColor: (color: string) => void;
  brushBlendMode: string;
  onSetBrushBlendMode: (mode: string) => void;
  strokesCount: number;
  onUndoLastStroke: () => void;
  onClearAllStrokes: () => void;
  onClose?: () => void;
  glyph?: CustomGlyph;
  metrics?: FontMetrics;
  onAutoFitFont?: () => void;
}

export const TextureBrushControls: React.FC<TextureBrushControlsProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedVariantId,
  onSelectVariant,
  brushSize,
  onSetBrushSize,
  brushOpacity,
  onSetBrushOpacity,
  brushColor,
  onSetBrushColor,
  brushBlendMode,
  onSetBrushBlendMode,
  strokesCount,
  onUndoLastStroke,
  onClearAllStrokes,
  onClose,
  glyph,
  metrics,
  onAutoFitFont
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [depth3D, setDepth3D] = useState<number>(14);
  const [lightAngle, setLightAngle] = useState<number>(135);

  const categoryVariants = TEXTURE_BRUSH_VARIANTS.filter((v) => v.category === selectedCategory);
  const activeVariant = TEXTURE_BRUSH_VARIANTS.find((v) => v.id === selectedVariantId) || categoryVariants[0];

  const handleAutoAdjustWithFont = () => {
    if (onAutoFitFont) {
      onAutoFitFont();
      return;
    }
    // Calculate optical proportional brush size based on glyph advance width
    const adv = glyph?.advanceWidth || 600;
    const computedSize = Math.min(110, Math.max(25, Math.round(adv / 12)));
    onSetBrushSize(computedSize);
    setDepth3D(Math.min(28, Math.max(6, Math.round(computedSize / 4))));
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 max-w-2xl w-[94%] sm:w-auto bg-[#0a0c12]/95 backdrop-blur-xl border border-red-500/40 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(220,38,38,0.25)] select-none text-xs animate-fadeIn overflow-hidden">
      
      {/* HEADER STRIP */}
      <div className="px-4 py-2.5 bg-[#0f131c] border-b border-zinc-800/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <img 
            src="/logo.png" 
            alt="Alphaxen Logo" 
            className="h-5 w-auto max-w-[80px] object-contain shrink-0" 
            onError={(e) => { e.currentTarget.style.display = 'none'; }} 
          />
          <div className="w-5 h-5 rounded-md bg-red-600/30 border border-red-500/50 flex items-center justify-center text-red-400 shrink-0">
            <Paintbrush className="w-3 h-3" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-white text-[11px] tracking-wider uppercase">
              3D Texture & Watermark Brush
            </span>
            <span className="px-1.5 py-0.5 rounded bg-red-950/70 border border-red-800/50 text-[9px] font-mono text-red-300">
              {strokesCount} {strokesCount === 1 ? 'Stroke' : 'Strokes'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Undo Stroke */}
          <button
            onClick={onUndoLastStroke}
            disabled={strokesCount === 0}
            className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Undo last brush stroke"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Quick Clear All */}
          <button
            onClick={onClearAllStrokes}
            disabled={strokesCount === 0}
            className="p-1 rounded hover:bg-red-950/60 text-zinc-400 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Clear all texture strokes from this glyph"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {/* Auto-Adjust with Font */}
          <button
            onClick={handleAutoAdjustWithFont}
            className="px-2 py-1 rounded bg-sky-950/70 border border-sky-600/50 hover:bg-sky-900 text-sky-300 hover:text-white transition-all cursor-pointer flex items-center gap-1 text-[10px] font-bold"
            title="Auto-adjust brush scale & depth proportionally to active font glyph"
          >
            <Wand2 className="w-3 h-3 text-sky-400" />
            <span className="hidden sm:inline">Fit Font</span>
          </button>

          {/* Collapse / Expand */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
          >
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* EXPANDABLE BODY */}
      {isExpanded && (
        <div className="p-3.5 space-y-3 font-mono">
          
          {/* 1. CATEGORY TABS (3D TEXTURE | 3D WATERMARK | GRUNGE | STONE | METALLIC) */}
          <div className="flex items-center gap-1.5 p-1 bg-black/60 rounded-xl border border-zinc-800/80 overflow-x-auto no-scrollbar">
            {TEXTURE_BRUSH_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    const firstInCat = TEXTURE_BRUSH_VARIANTS.find((v) => v.category === cat.id);
                    if (firstInCat) {
                      onSelectVariant(firstInCat.id);
                      onSetBrushColor(firstInCat.defaultColor);
                      onSetBrushSize(firstInCat.defaultSize);
                      onSetBrushOpacity(firstInCat.defaultOpacity);
                      onSetBrushBlendMode(firstInCat.blendMode);
                    }
                  }}
                  className={`py-1.5 px-2.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-red-700 to-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.4)]'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  {cat.id === '3d-texture' && <Box className="w-3 h-3 text-sky-400" />}
                  {cat.id === '3d-watermark' && <Shield className="w-3 h-3 text-indigo-400" />}
                  {cat.id === 'grunge' && <Flame className="w-3 h-3 text-amber-400" />}
                  {cat.id === 'stone' && <Mountain className="w-3 h-3 text-zinc-300" />}
                  {cat.id === 'metallic' && <Sparkles className="w-3 h-3 text-yellow-300" />}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* 2. TEXTURE VARIANTS STRIP */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">
                {selectedCategory === '3d-texture' ? '3D Relief Models & Extrusion' : selectedCategory === '3d-watermark' ? '3D Watermark & Security Seals' : 'Texture Stamps & Grain Patterns'}:
              </span>
              <span className="text-[9px] text-zinc-400">{activeVariant?.name}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {categoryVariants.map((variant) => {
                const isSelected = variant.id === selectedVariantId;
                return (
                  <button
                    key={variant.id}
                    onClick={() => {
                      onSelectVariant(variant.id);
                      onSetBrushColor(variant.defaultColor);
                      onSetBrushSize(variant.defaultSize);
                      onSetBrushOpacity(variant.defaultOpacity);
                      onSetBrushBlendMode(variant.blendMode);
                    }}
                    className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-[#151a26] border-red-500 shadow-[0_0_12px_rgba(220,38,38,0.3)]'
                        : 'bg-[#0a0d14] border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div 
                      className="w-full h-6 rounded-md border border-zinc-700 shadow-inner"
                      style={{ background: variant.previewGradient }}
                    />
                    <span className="text-[10px] font-bold text-white truncate">
                      {variant.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. SLIDERS: BRUSH SIZE, OPACITY, 3D DEPTH & BLEND MODE */}
          <div className="pt-2 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-4 gap-3 text-[10px]">
            
            {/* Brush Radius Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-zinc-400">
                <span>Brush Radius</span>
                <span className="text-white font-bold">{brushSize}px</span>
              </div>
              <input
                type="range"
                min="10"
                max="120"
                step="2"
                value={brushSize}
                onChange={(e) => onSetBrushSize(Number(e.target.value))}
                className="w-full accent-red-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
              />
            </div>

            {/* Brush Opacity Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-zinc-400">
                <span>Opacity / Flow</span>
                <span className="text-white font-bold">{Math.round(brushOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={brushOpacity}
                onChange={(e) => onSetBrushOpacity(Number(e.target.value))}
                className="w-full accent-red-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
              />
            </div>

            {/* 3D Depth / Relief Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-zinc-400">
                <span>3D Depth Relief</span>
                <span className="text-sky-400 font-bold">{depth3D}px</span>
              </div>
              <input
                type="range"
                min="2"
                max="40"
                step="1"
                value={depth3D}
                onChange={(e) => setDepth3D(Number(e.target.value))}
                className="w-full accent-sky-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
              />
            </div>

            {/* Brush Color & Blend Mode */}
            <div className="flex items-center justify-between gap-2 pt-1 sm:pt-0">
              <div className="flex items-center gap-1.5">
                <input
                  type="color"
                  value={brushColor}
                  onChange={(e) => onSetBrushColor(e.target.value)}
                  className="w-6 h-6 rounded border border-zinc-700 bg-transparent cursor-pointer"
                  title="Brush Stamp Color"
                />
                <span className="text-zinc-400">{brushColor}</span>
              </div>

              <select
                value={brushBlendMode}
                onChange={(e) => onSetBrushBlendMode(e.target.value)}
                className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-[10px] text-zinc-200 focus:outline-none focus:border-red-500 cursor-pointer"
              >
                <option value="overlay">Overlay</option>
                <option value="screen">Screen</option>
                <option value="color-dodge">Color-Dodge</option>
                <option value="hard-light">Hard-Light</option>
                <option value="multiply">Multiply</option>
                <option value="normal">Normal</option>
              </select>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
