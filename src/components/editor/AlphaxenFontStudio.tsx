import React, { useState, useEffect, useCallback } from 'react';
import { EditorTopBar } from './EditorTopBar';
import { LeftSidebar } from './LeftSidebar';
import { FontCanvas } from './FontCanvas';
import { RightInspector } from './RightInspector';
import { GlyphBrowser } from './GlyphBrowser';
import { BottomPanel } from './BottomPanel';
import { ExportModal } from './ExportModal';
import { PreviewModal } from './PreviewModal';
import { FontInfoModal } from './FontInfoModal';
import { KerningModal } from './KerningModal';
import { WeightsModal } from './WeightsModal';
import { ReferenceModal } from './ReferenceModal';
import { SvgImportModal } from './SvgImportModal';
import { ProjectTemplatesModal } from './ProjectTemplatesModal';
import { TextureColorStudioModal } from './TextureColorStudioModal';
import { CustomWebTextureMakerModal } from './CustomWebTextureMakerModal';
import { TextureBrushControls } from './TextureBrushControls';
import { 
  FontProject, 
  CustomGlyph, 
  EditorTool, 
  FontInfo, 
  FontMetrics, 
  KerningPair, 
  FontWeightPreset,
  ReferenceImage,
  BezierPoint,
  FontTemplate,
  FontTextureConfig,
  TextureBrushCategory,
  TextureBrushStroke
} from '../../types/fontLab';
import { 
  DEFAULT_PROJECT, 
  STARTER_PROJECT_GLYPHS, 
  DEFAULT_METRICS, 
  DEFAULT_INFO, 
  DEFAULT_WEIGHTS,
  DEFAULT_KERNING_PAIRS,
  parseSvgPathToPoints
} from '../../data/fontProjectDefaults';
import { DEFAULT_TEXTURE_CONFIG, TEXTURE_PRESETS } from '../../data/texturePresets';

interface AlphaxenFontStudioProps {
  onBackToFoundry: () => void;
  initialProject?: FontProject;
}

export const AlphaxenFontStudio: React.FC<AlphaxenFontStudioProps> = ({
  onBackToFoundry,
  initialProject
}) => {
  // Master Project State
  const [project, setProject] = useState<FontProject>(() => {
    return initialProject || DEFAULT_PROJECT;
  });

  const [activeGlyphChar, setActiveGlyphChar] = useState<string>('A');
  const [activeTool, setActiveTool] = useState<EditorTool>('select');
  const [activeTab, setActiveTab] = useState<'editor' | 'library' | 'metrics' | 'kerning' | 'styles'>('editor');
  
  // Canvas viewport settings
  const [zoom, setZoom] = useState<number>(0.75);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showGuides, setShowGuides] = useState<boolean>(true);
  const [snapToGrid, setSnapToGrid] = useState<boolean>(true);

  // Undo / Redo history
  const [history, setHistory] = useState<CustomGlyph[][]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Modals
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isKerningOpen, setIsKerningOpen] = useState(false);
  const [isWeightsOpen, setIsWeightsOpen] = useState(false);
  const [isReferenceOpen, setIsReferenceOpen] = useState(false);
  const [isSvgImportOpen, setIsSvgImportOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(true);
  const [isTextureStudioOpen, setIsTextureStudioOpen] = useState(false);

  // Texture and Color Material State
  const [textureConfig, setTextureConfig] = useState<FontTextureConfig>(() => {
    return project.textureConfig || DEFAULT_TEXTURE_CONFIG;
  });

  // Texture Brush State (Grunge, Stone, Metallic)
  const [brushCategory, setBrushCategory] = useState<TextureBrushCategory>('grunge');
  const [brushVariantId, setBrushVariantId] = useState<string>('distress-acid');
  const [brushSize, setBrushSize] = useState<number>(45);
  const [brushOpacity, setBrushOpacity] = useState<number>(0.85);
  const [brushColor, setBrushColor] = useState<string>('#DC2626');
  const [brushBlendMode, setBrushBlendMode] = useState<string>('overlay');

  // Notification / Toast
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3200);
  };

  const handleUndoLastBrushStroke = () => {
    if (!activeGlyph.textureBrushes || activeGlyph.textureBrushes.length === 0) return;
    const updated = activeGlyph.textureBrushes.slice(0, -1);
    handleUpdateActiveGlyph({
      ...activeGlyph,
      textureBrushes: updated
    });
    showToast('Undid last texture brush stroke');
  };

  const handleClearAllBrushStrokes = () => {
    if (!activeGlyph.textureBrushes || activeGlyph.textureBrushes.length === 0) return;
    handleUpdateActiveGlyph({
      ...activeGlyph,
      textureBrushes: []
    });
    showToast(`Cleared texture brush strokes from '${activeGlyph.char}'`);
  };

  const handleApplyTemplate = (template: FontTemplate) => {
    // Merge template sample glyphs with current glyphs
    const updatedGlyphs = [...project.glyphs];
    template.sampleGlyphs.forEach((sample) => {
      const idx = updatedGlyphs.findIndex(g => g.char === sample.char);
      if (idx >= 0) {
        updatedGlyphs[idx] = sample;
      } else {
        updatedGlyphs.push(sample);
      }
    });

    // Update texture config if template suggests one
    const suggestedPreset = TEXTURE_PRESETS.find(p => p.id === template.suggestedTexture);
    if (suggestedPreset) {
      setTextureConfig(prev => ({
        ...prev,
        presetId: template.suggestedTexture,
        blendMode: suggestedPreset.blendMode,
        roughness: suggestedPreset.roughness,
        bevelDepth: suggestedPreset.bevelDepth,
        colorStops: suggestedPreset.defaultStops
      }));
    }

    setProject(prev => ({
      ...prev,
      name: `${project.name} (${template.name})`,
      metrics: template.metrics,
      weights: template.weights,
      activeWeight: template.defaultWeight,
      kerningPairs: template.kerning.length > 0 ? template.kerning : prev.kerningPairs,
      glyphs: updatedGlyphs,
      isDirty: true
    }));

    if (template.sampleGlyphs.length > 0) {
      setActiveGlyphChar(template.sampleGlyphs[0].char);
    }

    showToast(`Loaded ${template.name} structure with ${template.metrics.unitsPerEm} UPM metrics`);
  };

  // Find active glyph or create fallback
  const activeGlyph = project.glyphs.find(g => g.char === activeGlyphChar) || project.glyphs[0] || {
    id: 'fallback-A',
    char: 'A',
    name: 'A',
    unicode: 'U+0041',
    advanceWidth: 700,
    leftSideBearing: 60,
    rightSideBearing: 60,
    contours: [],
    category: 'uppercase',
    points: []
  };

  // Push to history when glyph changes
  const saveSnapshot = useCallback((newGlyphs: CustomGlyph[]) => {
    setHistory(prev => {
      const sliced = prev.slice(0, historyIndex + 1);
      return [...sliced, newGlyphs];
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  // Handle active glyph updates
  const handleUpdateActiveGlyph = (updatedGlyph: CustomGlyph) => {
    const updatedGlyphs = project.glyphs.map(g => 
      g.char === updatedGlyph.char ? updatedGlyph : g
    );

    saveSnapshot(updatedGlyphs);

    setProject(prev => ({
      ...prev,
      glyphs: updatedGlyphs,
      isDirty: true,
      lastModified: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
  };

  // Undo
  const handleUndo = () => {
    if (historyIndex > 0) {
      const targetState = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setProject(prev => ({
        ...prev,
        glyphs: targetState,
        isDirty: true
      }));
      showToast('Undone last vector change');
    }
  };

  // Redo
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const targetState = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setProject(prev => ({
        ...prev,
        glyphs: targetState,
        isDirty: true
      }));
      showToast('Redone change');
    }
  };

  // Save project
  const handleSave = () => {
    setProject(prev => ({
      ...prev,
      isDirty: false,
      lastModified: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
    try {
      localStorage.setItem(`alphaxen_project_${project.id}`, JSON.stringify(project));
    } catch {
      // storage quota or fallback
    }
    showToast(`Font project "${project.name}" saved to studio cache`);
  };

  // Duplicate project
  const handleDuplicate = () => {
    const duplicated: FontProject = {
      ...project,
      id: `proj_${Date.now()}`,
      name: `${project.name} (Copy)`,
      lastModified: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isDirty: false
    };
    setProject(duplicated);
    showToast(`Duplicated into "${duplicated.name}"`);
  };

  // Add new glyph
  const handleAddGlyph = (char: string) => {
    const codePoint = char.codePointAt(0);
    const hex = codePoint ? `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}` : 'U+0000';
    
    // Check if exists
    const existing = project.glyphs.find(g => g.char === char);
    if (existing) {
      setActiveGlyphChar(char);
      return;
    }

    const newGlyph: CustomGlyph = {
      id: `glyph_${char}_${Date.now()}`,
      char,
      name: char,
      unicode: hex,
      advanceWidth: 700,
      leftSideBearing: 50,
      rightSideBearing: 50,
      category: 'uppercase',
      points: [
        { id: `p1_${Date.now()}`, x: 100, y: 0, onCurve: true },
        { id: `p2_${Date.now()}`, x: 100, y: 700, onCurve: true },
        { id: `p3_${Date.now()}`, x: 600, y: 700, onCurve: true },
        { id: `p4_${Date.now()}`, x: 600, y: 0, onCurve: true },
      ],
      contours: [
        {
          id: `c1_${Date.now()}`,
          isClosed: true,
          points: [
            { id: `cp1_${Date.now()}`, x: 100, y: 0, onCurve: true },
            { id: `cp2_${Date.now()}`, x: 100, y: 700, onCurve: true },
            { id: `cp3_${Date.now()}`, x: 600, y: 700, onCurve: true },
            { id: `cp4_${Date.now()}`, x: 600, y: 0, onCurve: true },
          ]
        }
      ]
    };

    setProject(prev => ({
      ...prev,
      glyphs: [...prev.glyphs, newGlyph],
      isDirty: true
    }));
    setActiveGlyphChar(char);
    showToast(`Created new glyph '${char}' [${hex}]`);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleSave();
      } else if (e.key === 'v' || e.key === 'V') {
        setActiveTool('select');
      } else if (e.key === 'p' || e.key === 'P') {
        setActiveTool('pen');
      } else if (e.key === 'a' || e.key === 'A') {
        setActiveTool('node');
      } else if (e.key === 'r' || e.key === 'R') {
        setActiveTool('shape-rect');
      } else if (e.key === 'c' || e.key === 'C') {
        setActiveTool('shape-circle');
      } else if (e.key === 'z') {
        setZoom(prev => Math.min(prev * 1.2, 4));
      } else if (e.key === 'x') {
        setZoom(prev => Math.max(prev / 1.2, 0.2));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history, project]);

  return (
    <div className="relative w-full h-screen bg-[#07090d] text-zinc-100 flex flex-col overflow-hidden select-none font-sans">
      
      {/* 1. TOP BAR */}
      <EditorTopBar 
        project={project}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onSave={handleSave}
        onDuplicate={handleDuplicate}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenPreview={() => setIsPreviewOpen(true)}
        onOpenInfo={() => setIsInfoOpen(true)}
        onOpenWeights={() => setIsWeightsOpen(true)}
        onOpenKerning={() => setIsKerningOpen(true)}
        onOpenTemplates={() => setIsTemplatesOpen(true)}
        onOpenTextureStudio={() => setIsTextureStudioOpen(true)}
        onBackToFoundry={onBackToFoundry}
      />

      {/* 2. MAIN BODY (LEFT TOOLS | CENTER CANVAS | RIGHT INSPECTOR) */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Sidebar Tools */}
        <LeftSidebar 
          activeTool={activeTool}
          onSelectTool={setActiveTool}
          showGrid={showGrid}
          onToggleGrid={() => setShowGrid(!showGrid)}
          showGuides={showGuides}
          onToggleGuides={() => setShowGuides(!showGuides)}
          snapToGrid={snapToGrid}
          onToggleSnap={() => setSnapToGrid(!snapToGrid)}
          onImportSvg={() => setIsSvgImportOpen(true)}
          onOpenReferences={() => setIsReferenceOpen(true)}
          activeSection={activeTab}
          onSelectSection={(sec: string) => {
            if (sec === 'kerning') setIsKerningOpen(true);
            else if (sec === 'styles') setIsWeightsOpen(true);
            else if (sec === 'metrics') setIsInfoOpen(true);
            else setActiveTab(sec as any);
          }}
        />

        {/* Center Canvas */}
        <div className="flex-1 flex flex-col relative bg-[#090b10] overflow-hidden">
          {/* FLOATING TEXTURE BRUSH HUD CONTROLS */}
          {activeTool === 'texture-brush' && (
            <TextureBrushControls
              selectedCategory={brushCategory}
              onSelectCategory={setBrushCategory}
              selectedVariantId={brushVariantId}
              onSelectVariant={setBrushVariantId}
              brushSize={brushSize}
              onSetBrushSize={setBrushSize}
              brushOpacity={brushOpacity}
              onSetBrushOpacity={setBrushOpacity}
              brushColor={brushColor}
              onSetBrushColor={setBrushColor}
              brushBlendMode={brushBlendMode}
              onSetBrushBlendMode={setBrushBlendMode}
              strokesCount={activeGlyph.textureBrushes?.length || 0}
              onUndoLastStroke={handleUndoLastBrushStroke}
              onClearAllStrokes={handleClearAllBrushStrokes}
              onClose={() => setActiveTool('select')}
              glyph={activeGlyph}
              metrics={project.metrics}
            />
          )}

          <FontCanvas 
            glyph={activeGlyph}
            metrics={project.metrics}
            activeTool={activeTool}
            showGrid={showGrid}
            showGuides={showGuides}
            snapToGrid={snapToGrid}
            referenceImages={project.referenceImages}
            onUpdateGlyph={handleUpdateActiveGlyph}
            zoom={zoom}
            setZoom={setZoom}
            pan={pan}
            setPan={setPan}
            textureConfig={textureConfig}
            brushCategory={brushCategory}
            brushVariantId={brushVariantId}
            brushSize={brushSize}
            brushOpacity={brushOpacity}
            brushColor={brushColor}
            brushBlendMode={brushBlendMode}
            onAddBrushStroke={(stroke) => {
              showToast(`Applied ${stroke.variantId} texture stroke`);
            }}
          />

          {/* Multi-Tab Bottom Architecture (Layers, Components, Anchors, Guides, Kerning, Timeline, Variations, Glyphs) */}
          <BottomPanel 
            glyphs={project.glyphs}
            activeGlyph={activeGlyph}
            metrics={project.metrics}
            kerningPairs={project.kerningPairs}
            onSelectGlyph={setActiveGlyphChar}
            onAddGlyph={handleAddGlyph}
            onUpdateGlyph={handleUpdateActiveGlyph}
            onUpdateMetrics={(newMetrics) => {
              setProject(prev => ({ ...prev, metrics: newMetrics, isDirty: true }));
            }}
            onOpenTextureLab={() => setIsTextureStudioOpen(true)}
          />
        </div>

        {/* Right Inspector */}
        <RightInspector 
          glyph={activeGlyph}
          metrics={project.metrics}
          weights={project.weights}
          activeWeight={project.activeWeight}
          onUpdateGlyph={handleUpdateActiveGlyph}
          onUpdateMetrics={(newMetrics) => {
            setProject(prev => ({ ...prev, metrics: newMetrics, isDirty: true }));
          }}
          onSelectWeight={(weight: string) => {
            setProject(prev => ({ ...prev, activeWeight: weight, isDirty: true }));
          }}
          onOpenKerningModal={() => setIsKerningOpen(true)}
          onOpenOpenTypeModal={() => setIsExportOpen(true)}
          textureConfig={textureConfig}
          onOpenTextureStudio={() => setIsTextureStudioOpen(true)}
          onUpdateTextureConfig={(cfg) => {
            setTextureConfig(cfg);
            setProject(prev => ({ ...prev, textureConfig: cfg, isDirty: true }));
          }}
        />
      </div>

      {/* Floating Notification Toast */}
      {notification && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50 bg-[#161a23] border border-red-600/40 text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-3 backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-mono tracking-wide">{notification}</span>
        </div>
      )}

      {/* MODALS */}
      {isExportOpen && (
        <ExportModal 
          project={project}
          onClose={() => setIsExportOpen(false)}
        />
      )}

      {isPreviewOpen && (
        <PreviewModal 
          project={project}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}

      {isInfoOpen && (
        <FontInfoModal 
          info={project.info}
          onUpdateInfo={(updated) => {
            setProject(prev => ({ ...prev, info: updated, isDirty: true }));
          }}
          onClose={() => setIsInfoOpen(false)}
        />
      )}

      {isKerningOpen && (
        <KerningModal 
          kerningPairs={project.kerningPairs}
          onUpdateKerning={(pairs) => {
            setProject(prev => ({ ...prev, kerningPairs: pairs, isDirty: true }));
          }}
          onClose={() => setIsKerningOpen(false)}
        />
      )}

      {isWeightsOpen && (
        <WeightsModal 
          weights={project.weights}
          activeWeight={project.activeWeight}
          onSelectWeight={(w: string) => {
            setProject(prev => ({ ...prev, activeWeight: w, isDirty: true }));
          }}
          onAddWeight={(newW: FontWeightPreset) => {
            setProject(prev => ({
              ...prev,
              weights: [...prev.weights, newW],
              isDirty: true
            }));
          }}
          onClose={() => setIsWeightsOpen(false)}
        />
      )}

      {isReferenceOpen && (
        <ReferenceModal 
          references={project.referenceImages}
          onUpdateReferences={(refs: ReferenceImage[]) => {
            setProject(prev => ({ ...prev, referenceImages: refs, isDirty: true }));
          }}
          onClose={() => setIsReferenceOpen(false)}
        />
      )}

      {isSvgImportOpen && (
        <SvgImportModal 
          currentChar={activeGlyph.char}
          onImportPoints={(points) => {
            const updated: CustomGlyph = {
              ...activeGlyph,
              points,
              contours: [
                {
                  id: `contour_${Date.now()}`,
                  points,
                  isClosed: true
                }
              ]
            };
            handleUpdateActiveGlyph(updated);
            showToast(`Imported SVG vector contours into glyph '${activeGlyph.char}'`);
          }}
          onClose={() => setIsSvgImportOpen(false)}
        />
      )}

      {/* PROJECT TEMPLATES MODAL */}
      {isTemplatesOpen && (
        <ProjectTemplatesModal
          currentProject={project}
          onApplyTemplate={handleApplyTemplate}
          onClose={() => setIsTemplatesOpen(false)}
        />
      )}

      {/* TEXTURE & MATERIAL SHADER LAB MODAL */}
      {isTextureStudioOpen && (
        <CustomWebTextureMakerModal
          textureConfig={textureConfig}
          activeChar={activeGlyph.char}
          onUpdateTextureConfig={(cfg) => {
            setTextureConfig(cfg);
            setProject(prev => ({ ...prev, textureConfig: cfg, isDirty: true }));
            showToast(`Applied ${cfg.type} texture material to ${cfg.scope === 'font' ? 'all glyphs' : `glyph '${activeGlyph.char}'`}`);
          }}
          onClose={() => setIsTextureStudioOpen(false)}
        />
      )}

    </div>
  );
};
