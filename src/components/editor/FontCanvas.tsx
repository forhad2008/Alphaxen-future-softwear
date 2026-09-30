import React, { useRef, useState, useCallback, useEffect } from 'react';
import { 
  CustomGlyph, 
  BezierPoint, 
  GlyphContour, 
  EditorTool, 
  FontMetrics, 
  ReferenceImage,
  FontTextureConfig,
  TextureBrushCategory,
  TextureBrushStroke
} from '../../types/fontLab';
import { TEXTURE_PRESETS } from '../../data/texturePresets';
import { TEXTURE_BRUSH_VARIANTS } from '../../data/textureBrushLibrary';

interface FontCanvasProps {
  glyph: CustomGlyph;
  metrics: FontMetrics;
  activeTool: EditorTool;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  showGrid: boolean;
  showGuides: boolean;
  showRulers?: boolean;
  snapToGrid: boolean;
  references?: ReferenceImage[];
  referenceImages?: ReferenceImage[];
  onUpdateGlyph: (updated: CustomGlyph) => void;
  onUpdateReference?: (updated: ReferenceImage) => void;
  fillColor?: string;
  strokeColor?: string;
  pan: { x: number; y: number };
  setPan: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  textureConfig?: FontTextureConfig;
  brushCategory?: TextureBrushCategory;
  brushVariantId?: string;
  brushSize?: number;
  brushOpacity?: number;
  brushColor?: string;
  brushBlendMode?: string;
  onAddBrushStroke?: (stroke: TextureBrushStroke) => void;
}

export const FontCanvas: React.FC<FontCanvasProps> = ({
  glyph,
  metrics,
  activeTool,
  zoom,
  setZoom,
  showGrid,
  showGuides,
  showRulers = true,
  snapToGrid,
  references,
  referenceImages,
  onUpdateGlyph,
  fillColor = '#E50914',
  strokeColor = '#FF1A1A',
  pan,
  setPan,
  textureConfig,
  brushCategory = 'grunge',
  brushVariantId = 'distress-acid',
  brushSize = 45,
  brushOpacity = 0.85,
  brushColor = '#EF4444',
  brushBlendMode = 'overlay',
  onAddBrushStroke
}) => {
  const activeReferences = references || referenceImages || [];
  const activePreset = TEXTURE_PRESETS.find((p) => p.id === textureConfig?.presetId) || TEXTURE_PRESETS[0];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [activePointId, setActivePointId] = useState<string | null>(null);
  const [activeHandle, setActiveHandle] = useState<'in' | 'out' | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [mouseCanvasPos, setMouseCanvasPos] = useState<{ fontX: number; fontY: number }>({ fontX: 0, fontY: 0 });
  const [measurePoint, setMeasurePoint] = useState<{ x: number; y: number } | null>(null);
  const [currentBrushStroke, setCurrentBrushStroke] = useState<TextureBrushStroke | null>(null);

  // Multi-touch pinch zoom & pan state
  const touchPointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const initialPinchDistRef = useRef<number | null>(null);
  const initialZoomRef = useRef<number>(zoom);

  // Double tap detection on touch screens
  const lastTapRef = useRef<{ id: string; time: number } | null>(null);

  const BASELINE_SVG_Y = 800;

  const toSvgX = useCallback((fontX: number) => fontX, []);
  const toSvgY = useCallback((fontY: number) => BASELINE_SVG_Y - fontY, []);
  const toFontX = useCallback((svgX: number) => Math.round(svgX), []);
  const toFontY = useCallback((svgY: number) => Math.round(BASELINE_SVG_Y - svgY), []);

  const snapValue = (val: number, step = 20) => {
    if (!snapToGrid) return val;
    return Math.round(val / step) * step;
  };

  // Build SVG Path d string
  const buildSvgPath = useCallback((g: CustomGlyph) => {
    let d = '';
    g.contours.forEach((contour: GlyphContour) => {
      if (contour.points.length === 0) return;
      const first = contour.points[0];
      d += `M ${toSvgX(first.x)} ${toSvgY(first.y)} `;

      for (let i = 1; i < contour.points.length; i++) {
        const pt = contour.points[i];
        const prev = contour.points[i - 1];

        if (pt.type === 'smooth' && pt.handleIn) {
          const c1x = prev.handleOut ? toSvgX(prev.handleOut.x) : toSvgX(prev.x);
          const c1y = prev.handleOut ? toSvgY(prev.handleOut.y) : toSvgY(prev.y);
          const c2x = toSvgX(pt.handleIn.x);
          const c2y = toSvgY(pt.handleIn.y);
          d += `C ${c1x} ${c1y}, ${c2x} ${c2y}, ${toSvgX(pt.x)} ${toSvgY(pt.y)} `;
        } else {
          d += `L ${toSvgX(pt.x)} ${toSvgY(pt.y)} `;
        }
      }

      if (contour.closed || contour.isClosed) {
        if (contour.points.length > 2 && contour.points[0].type === 'smooth' && contour.points[0].handleIn) {
          const last = contour.points[contour.points.length - 1];
          const first = contour.points[0];
          const c1x = last.handleOut ? toSvgX(last.handleOut.x) : toSvgX(last.x);
          const c1y = last.handleOut ? toSvgY(last.handleOut.y) : toSvgY(last.y);
          const c2x = first.handleIn ? toSvgX(first.handleIn.x) : toSvgX(first.x);
          const c2y = first.handleIn ? toSvgY(first.handleIn.y) : toSvgY(first.y);
          d += `C ${c1x} ${c1y}, ${c2x} ${c2y}, ${toSvgX(first.x)} ${toSvgY(first.y)} Z `;
        } else {
          d += 'Z ';
        }
      }
    });
    return d;
  }, [toSvgX, toSvgY]);

  // Mouse wheel zoom or trackpad pan
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.ctrlKey || e.metaKey) {
      const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
      setZoom((z) => Math.min(3.0, Math.max(0.2, z * zoomFactor)));
    } else {
      setPan((p) => ({
        x: p.x - e.deltaX,
        y: p.y - e.deltaY
      }));
    }
  };

  const getSvgCoordinatesFromClient = useCallback((clientX: number, clientY: number) => {
    if (!svgRef.current) return { svgX: 0, svgY: 0, fontX: 0, fontY: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const svgX = (clientX - rect.left) / zoom;
    const svgY = (clientY - rect.top) / zoom;
    return {
      svgX,
      svgY,
      fontX: snapValue(toFontX(svgX)),
      fontY: snapValue(toFontY(svgY))
    };
  }, [zoom, snapToGrid, toFontX, toFontY]);

  // UNIFIED POINTER DOWN (Mouse, Touch, Stylus)
  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    // Multi-touch tracking for pinch-zoom
    touchPointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (touchPointersRef.current.size === 2) {
      const pts = Array.from(touchPointersRef.current.values());
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      initialPinchDistRef.current = dist;
      initialZoomRef.current = zoom;
      setIsPanning(true);
      setPanStart({ x: (pts[0].x + pts[1].x) / 2 - pan.x, y: (pts[0].y + pts[1].y) / 2 - pan.y });
      return;
    }

    if (e.button === 1 || e.altKey || activeTool === 'zoom') {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {}
      return;
    }

    const { fontX, fontY } = getSvgCoordinatesFromClient(e.clientX, e.clientY);
    setMouseCanvasPos({ fontX, fontY });

    if (activeTool === 'pen') {
      const newPt: BezierPoint = {
        id: `pt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        x: fontX,
        y: fontY,
        type: 'corner',
        onCurve: true
      };

      const updatedContours = [...glyph.contours];
      if (updatedContours.length === 0) {
        updatedContours.push({ closed: false, isClosed: false, points: [newPt] });
      } else {
        const lastIdx = updatedContours.length - 1;
        updatedContours[lastIdx] = {
          ...updatedContours[lastIdx],
          points: [...updatedContours[lastIdx].points, newPt]
        };
      }

      onUpdateGlyph({ ...glyph, contours: updatedContours });
      setActivePointId(newPt.id);
      setIsDragging(true);
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {}
    } else if (activeTool === 'shape' || activeTool === 'shape-rect') {
      const w = 240;
      const h = 320;
      const rectPoints: BezierPoint[] = [
        { id: `r1-${Date.now()}`, x: fontX, y: fontY + h, type: 'corner', onCurve: true },
        { id: `r2-${Date.now()}`, x: fontX + w, y: fontY + h, type: 'corner', onCurve: true },
        { id: `r3-${Date.now()}`, x: fontX + w, y: fontY, type: 'corner', onCurve: true },
        { id: `r4-${Date.now()}`, x: fontX, y: fontY, type: 'corner', onCurve: true }
      ];
      onUpdateGlyph({
        ...glyph,
        contours: [...glyph.contours, { closed: true, isClosed: true, points: rectPoints }]
      });
    } else if (activeTool === 'shape-circle') {
      const r = 160;
      const circPoints: BezierPoint[] = [
        { id: `c1-${Date.now()}`, x: fontX, y: fontY + r, type: 'smooth', onCurve: true, handleIn: { x: fontX - r * 0.55, y: fontY + r }, handleOut: { x: fontX + r * 0.55, y: fontY + r } },
        { id: `c2-${Date.now()}`, x: fontX + r, y: fontY, type: 'smooth', onCurve: true, handleIn: { x: fontX + r, y: fontY + r * 0.55 }, handleOut: { x: fontX + r, y: fontY - r * 0.55 } },
        { id: `c3-${Date.now()}`, x: fontX, y: fontY - r, type: 'smooth', onCurve: true, handleIn: { x: fontX + r * 0.55, y: fontY - r }, handleOut: { x: fontX - r * 0.55, y: fontY - r } },
        { id: `c4-${Date.now()}`, x: fontX - r, y: fontY, type: 'smooth', onCurve: true, handleIn: { x: fontX - r, y: fontY - r * 0.55 }, handleOut: { x: fontX - r, y: fontY + r * 0.55 } }
      ];
      onUpdateGlyph({
        ...glyph,
        contours: [...glyph.contours, { closed: true, isClosed: true, points: circPoints }]
      });
    } else if (activeTool === 'texture' || activeTool === 'texture-brush') {
      const isCustomTexture = textureConfig?.type === 'custom-image' && !!textureConfig?.customImageUrl;
      const newStroke: TextureBrushStroke = {
        id: `stroke_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        points: [{ x: fontX, y: fontY }],
        category: brushCategory || 'grunge',
        variantId: brushVariantId || (textureConfig?.presetId ? String(textureConfig.presetId) : 'distress-acid'),
        size: brushSize || 45,
        opacity: brushOpacity || textureConfig?.opacity || 0.85,
        color: brushColor || '#EF4444',
        blendMode: brushBlendMode || textureConfig?.blendMode || 'overlay',
        textureType: textureConfig?.type || 'preset-texture',
        presetId: textureConfig?.presetId || 'obsidian',
        customImageUrl: textureConfig?.customImageUrl
      };
      setCurrentBrushStroke(newStroke);
      setIsDragging(true);
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {}
    } else if (activeTool === 'measure') {
      setMeasurePoint({ x: fontX, y: fontY });
    } else {
      setActivePointId(null);
    }
  };

  // UNIFIED POINTER ON NODE / HANDLE
  const handlePointPointerDown = (ptId: string, handle: 'in' | 'out' | null, e: React.PointerEvent) => {
    e.stopPropagation();
    
    // Double tap toggle corner / smooth
    const now = Date.now();
    if (lastTapRef.current && lastTapRef.current.id === ptId && (now - lastTapRef.current.time < 350)) {
      togglePointSmooth(ptId);
      lastTapRef.current = null;
      return;
    }
    lastTapRef.current = { id: ptId, time: now };

    if (activeTool === 'knife') {
      const newContours = glyph.contours.map((c: GlyphContour) => ({
        ...c,
        points: c.points.filter((p: BezierPoint) => p.id !== ptId)
      })).filter((c: GlyphContour) => c.points.length > 0);
      onUpdateGlyph({ ...glyph, contours: newContours });
      setActivePointId(null);
      return;
    }

    setActivePointId(ptId);
    setActiveHandle(handle);
    setIsDragging(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  // UNIFIED POINTER MOVE
  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (touchPointersRef.current.has(e.pointerId)) {
      touchPointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    }

    // Two-finger pinch zoom & pan
    if (touchPointersRef.current.size === 2 && initialPinchDistRef.current) {
      const pts = Array.from(touchPointersRef.current.values());
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const ratio = dist / initialPinchDistRef.current;
      setZoom(Math.min(3.0, Math.max(0.2, initialZoomRef.current * ratio)));
      setPan({
        x: (pts[0].x + pts[1].x) / 2 - panStart.x,
        y: (pts[0].y + pts[1].y) / 2 - panStart.y
      });
      return;
    }

    const { fontX, fontY } = getSvgCoordinatesFromClient(e.clientX, e.clientY);
    setMouseCanvasPos({ fontX, fontY });

    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
      return;
    }

    if ((activeTool === 'texture' || activeTool === 'texture-brush') && isDragging && currentBrushStroke) {
      const lastPt = currentBrushStroke.points[currentBrushStroke.points.length - 1];
      const dist = Math.hypot(fontX - lastPt.x, fontY - lastPt.y);
      if (dist > 5) {
        setCurrentBrushStroke(prev => prev ? {
          ...prev,
          points: [...prev.points, { x: fontX, y: fontY }]
        } : null);
      }
      return;
    }

    if (!isDragging || !activePointId) return;

    // Drag point or handle with high numeric precision
    const newContours = glyph.contours.map((c: GlyphContour) => ({
      ...c,
      points: c.points.map((pt: BezierPoint) => {
        if (pt.id !== activePointId) return pt;

        if (activeHandle === 'in') {
          return { ...pt, handleIn: { x: fontX, y: fontY } };
        } else if (activeHandle === 'out') {
          return { ...pt, handleOut: { x: fontX, y: fontY } };
        } else {
          // Move the main node; shift handles relatively
          const dx = fontX - pt.x;
          const dy = fontY - pt.y;
          return {
            ...pt,
            x: fontX,
            y: fontY,
            handleIn: pt.handleIn ? { x: pt.handleIn.x + dx, y: pt.handleIn.y + dy } : undefined,
            handleOut: pt.handleOut ? { x: pt.handleOut.x + dx, y: pt.handleOut.y + dy } : undefined
          };
        }
      })
    }));

    onUpdateGlyph({ ...glyph, contours: newContours });
  };

  // UNIFIED POINTER UP
  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    touchPointersRef.current.delete(e.pointerId);
    if (touchPointersRef.current.size < 2) {
      initialPinchDistRef.current = null;
    }

    if ((activeTool === 'texture' || activeTool === 'texture-brush') && currentBrushStroke) {
      const existing = glyph.textureBrushes || [];
      const updatedBrushes = [...existing, currentBrushStroke];
      onUpdateGlyph({
        ...glyph,
        textureBrushes: updatedBrushes
      });
      if (onAddBrushStroke) {
        onAddBrushStroke(currentBrushStroke);
      }
      setCurrentBrushStroke(null);
    }

    setIsDragging(false);
    setActiveHandle(null);
    setIsPanning(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const togglePointSmooth = (ptId: string) => {
    const newContours = glyph.contours.map((c: GlyphContour) => ({
      ...c,
      points: c.points.map((pt: BezierPoint) => {
        if (pt.id !== ptId) return pt;
        const nextType: 'corner' | 'smooth' = pt.type === 'corner' ? 'smooth' : 'corner';
        return {
          ...pt,
          type: nextType,
          handleIn: nextType === 'smooth' ? { x: pt.x - 60, y: pt.y } : undefined,
          handleOut: nextType === 'smooth' ? { x: pt.x + 60, y: pt.y } : undefined
        };
      })
    }));
    onUpdateGlyph({ ...glyph, contours: newContours });
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      className="relative flex-1 w-full h-full bg-[#05060a] overflow-hidden select-none cursor-default touch-none"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(229, 9, 20, 0.04) 0%, transparent 80%)
        `
      }}
    >
      {/* RULERS */}
      {showRulers && (
        <>
          {/* Top Horizontal Ruler */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-[#080a0f] border-b border-zinc-800/80 z-30 flex items-center text-[9px] font-mono text-zinc-500 overflow-hidden px-8 pointer-events-none">
            <div className="flex space-x-12">
              {[-400, -200, 0, 200, 400, 600, 800, 1000, 1200].map((val) => (
                <span key={val} className="w-12 text-center border-l border-zinc-800/80 pl-1">
                  {val}
                </span>
              ))}
            </div>
          </div>
          {/* Left Vertical Ruler */}
          <div className="absolute top-6 left-0 bottom-0 w-6 bg-[#080a0f] border-r border-zinc-800/80 z-30 flex flex-col justify-around text-[9px] font-mono text-zinc-500 overflow-hidden py-4 pointer-events-none">
            {[-200, 0, 200, 400, 500, 700, 800].reverse().map((val) => (
              <span key={val} className="text-right pr-1 border-t border-zinc-800/80">
                {val}
              </span>
            ))}
          </div>
        </>
      )}

      {/* CANVAS VIEWPORT TRANSFORM CONTAINER */}
      <div
        className="w-full h-full flex items-center justify-center touch-none"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px)`
        }}
      >
        <div
          className="relative transition-transform duration-75 touch-none"
          style={{
            width: `${1000 * zoom}px`,
            height: `${1000 * zoom}px`,
            transformOrigin: 'center center'
          }}
        >
          <svg
            ref={svgRef}
            viewBox="0 0 1000 1000"
            className="w-full h-full overflow-visible drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* GRID BACKGROUND */}
            {showGrid && (
              <defs>
                <pattern id="canvasMinorGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#121520" strokeWidth="0.5" />
                </pattern>
                <pattern id="canvasMajorGrid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#1c2233" strokeWidth="0.8" />
                </pattern>
              </defs>
            )}

            {showGrid && (
              <>
                <rect width="1000" height="1000" fill="url(#canvasMinorGrid)" />
                <rect width="1000" height="1000" fill="url(#canvasMajorGrid)" />
              </>
            )}

            {/* REFERENCE IMAGES (If uploaded) */}
            {activeReferences.filter((r) => r.visible).map((ref) => (
              <image
                key={ref.id}
                href={ref.url}
                x={toSvgX(ref.x)}
                y={toSvgY(ref.y)}
                width={1000 * ref.scale}
                height={1000 * ref.scale}
                opacity={ref.opacity}
                className={ref.locked ? 'pointer-events-none' : 'cursor-move'}
              />
            ))}

            {/* TYPOGRAPHIC METRICS GUIDES */}
            {showGuides && (
              <g className="pointer-events-none select-none">
                {/* Ascender line */}
                <line
                  x1="-300"
                  y1={toSvgY(metrics.ascender)}
                  x2="1300"
                  y2={toSvgY(metrics.ascender)}
                  stroke="#38BDF8"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                  opacity="0.6"
                />
                <text x="15" y={toSvgY(metrics.ascender) - 6} fill="#38BDF8" fontSize="11" fontFamily="monospace">
                  Ascender (+{metrics.ascender})
                </text>

                {/* Cap Height line */}
                <line
                  x1="-300"
                  y1={toSvgY(metrics.capHeight)}
                  x2="1300"
                  y2={toSvgY(metrics.capHeight)}
                  stroke="#60A5FA"
                  strokeWidth="1.5"
                  strokeDasharray="5 3"
                />
                <text x="15" y={toSvgY(metrics.capHeight) - 6} fill="#60A5FA" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  Cap Height ({metrics.capHeight})
                </text>

                {/* x-Height line */}
                <line
                  x1="-300"
                  y1={toSvgY(metrics.xHeight)}
                  x2="1300"
                  y2={toSvgY(metrics.xHeight)}
                  stroke="#94A3B8"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity="0.5"
                />
                <text x="15" y={toSvgY(metrics.xHeight) - 6} fill="#94A3B8" fontSize="10" fontFamily="monospace">
                  x-Height ({metrics.xHeight})
                </text>

                {/* Baseline (0) */}
                <line
                  x1="-300"
                  y1={toSvgY(0)}
                  x2="1300"
                  y2={toSvgY(0)}
                  stroke="#E50914"
                  strokeWidth="2"
                />
                <text x="15" y={toSvgY(0) - 8} fill="#E50914" fontSize="12" fontFamily="monospace" fontWeight="bold">
                  Baseline (0)
                </text>

                {/* Descender line */}
                <line
                  x1="-300"
                  y1={toSvgY(metrics.descender)}
                  x2="1300"
                  y2={toSvgY(metrics.descender)}
                  stroke="#F87171"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                  opacity="0.7"
                />
                <text x="15" y={toSvgY(metrics.descender) - 6} fill="#F87171" fontSize="11" fontFamily="monospace">
                  Descender ({metrics.descender})
                </text>

                {/* Left Side Bearing boundary */}
                <line
                  x1={toSvgX(0)}
                  y1="-100"
                  x2={toSvgX(0)}
                  y2="1100"
                  stroke="#52525B"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text x="5" y="60" fill="#71717A" fontSize="10" fontFamily="monospace">
                  0 LSB
                </text>

                {/* Advance Width line */}
                <line
                  x1={toSvgX(glyph.advanceWidth)}
                  y1="-100"
                  x2={toSvgX(glyph.advanceWidth)}
                  y2="1100"
                  stroke="#EAB308"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
                <text x={toSvgX(glyph.advanceWidth) - 95} y="60" fill="#EAB308" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  Width: {glyph.advanceWidth}
                </text>
              </g>
            )}

            {/* DEFS FOR TEXTURE & GRADIENT SHADERS */}
            <defs>
              <clipPath id="canvasGlyphClip">
                <path d={buildSvgPath(glyph)} />
              </clipPath>

              {textureConfig?.colorStops && (
                <linearGradient 
                  id="canvasGlyphGradient" 
                  x1="0%" 
                  y1="0%" 
                  x2="100%" 
                  y2="100%"
                  gradientTransform={`rotate(${textureConfig.gradientAngle || 135})`}
                >
                  {textureConfig.colorStops.map((stop, sIdx) => (
                    <stop key={sIdx} offset={`${Math.round(stop.offset * 100)}%`} stopColor={stop.color} />
                  ))}
                </linearGradient>
              )}

              {textureConfig?.type === 'custom-image' && textureConfig.customImageUrl && (
                <pattern id="canvasCustomPattern" width={100 * (textureConfig.scale || 1)} height={100 * (textureConfig.scale || 1)} patternUnits="userSpaceOnUse">
                  <image href={textureConfig.customImageUrl} width={100 * (textureConfig.scale || 1)} height={100 * (textureConfig.scale || 1)} />
                </pattern>
              )}

              {textureConfig?.type === 'preset-texture' && (
                <g dangerouslySetInnerHTML={{ __html: activePreset.svgPatternSvg }} />
              )}

              {/* SVG FILTER SHADERS DEFINITIONS */}
              <filter id="filter-3d-extrusion" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2.2" result="blur" />
                <feSpecularLighting 
                  in="blur" 
                  surfaceScale={(textureConfig?.depth3D || 16) / 2.5} 
                  specularConstant={((textureConfig?.metallicGloss ?? textureConfig?.specularShine3D ?? 70) / 40)} 
                  specularExponent={((textureConfig?.metallicGloss ?? 70) / 3) + 12} 
                  lightingColor="#ffffff" 
                  result="spec"
                >
                  <feDistantLight azimuth={textureConfig?.lightAngle3D ?? 135} elevation={textureConfig?.lightElevation3D ?? 45} />
                </feSpecularLighting>
                <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut" />
                <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1.2" k4="0" />
              </filter>

              <filter id="filter-3d-watermark-relief" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1.8" result="blur" />
                <feSpecularLighting 
                  in="blur" 
                  surfaceScale={(textureConfig?.watermark3D?.depth || 8) / 1.8} 
                  specularConstant={((textureConfig?.watermark3D?.metallicGloss ?? 80) / 45)} 
                  specularExponent={((textureConfig?.watermark3D?.metallicGloss ?? 80) / 3) + 10} 
                  lightingColor="#e0e7ff" 
                  result="spec"
                >
                  <feDistantLight azimuth={textureConfig?.watermark3D?.angle ?? 135} elevation={50} />
                </feSpecularLighting>
                <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut" />
                <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
              </filter>

              <filter id="filter-noise-grain" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.45 0" result="coloredNoise" />
                <feComposite in="SourceGraphic" in2="coloredNoise" operator="in" />
              </filter>

              <filter id="filter-turbulence-distortion" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="2" result="turb" />
                <feDisplacementMap in2="turb" in="SourceGraphic" scale="14" xChannelSelector="R" yChannelSelector="G" />
              </filter>

              <filter id="filter-metallic-emboss" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
                <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1.2" specularExponent="20" lightingColor="#ffffff" result="spec">
                  <fePointLight x="-5000" y="-10000" z="20000" />
                </feSpecularLighting>
                <feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut" />
                <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
              </filter>

              <filter id="filter-neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* 3D WATERMARK PATTERNS */}
              <pattern id="pattern-watermark-guilloche" width="120" height="120" patternUnits="userSpaceOnUse">
                <rect width="120" height="120" fill="none"/>
                <circle cx="60" cy="60" r="54" fill="none" stroke="#818CF8" stroke-width="1.2" opacity="0.8"/>
                <circle cx="60" cy="60" r="42" fill="none" stroke="#C7D2FE" stroke-width="0.8" stroke-dasharray="4 2" opacity="0.7"/>
                <circle cx="60" cy="60" r="30" fill="none" stroke="#6366F1" stroke-width="1" opacity="0.6"/>
                <path d="M60,6 Q114,60 60,114 Q6,60 60,6 Z" fill="none" stroke="#A5B4FC" stroke-width="1.2" opacity="0.75"/>
                <path d="M6,60 Q60,114 114,60 Q60,6 6,60 Z" fill="none" stroke="#818CF8" stroke-width="1.2" opacity="0.75"/>
                <circle cx="60" cy="60" r="14" fill="#312E81" stroke="#E0E7FF" stroke-width="1.5" opacity="0.85"/>
              </pattern>

              <pattern id="pattern-watermark-embossed-seal" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="none"/>
                <circle cx="50" cy="50" r="45" fill="none" stroke="#FDE047" stroke-width="2.5" opacity="0.85"/>
                <circle cx="50" cy="50" r="38" fill="none" stroke="#EAB308" stroke-width="1" stroke-dasharray="3 3" opacity="0.7"/>
                <polygon points="50,15 58,35 80,38 64,54 68,76 50,65 32,76 36,54 20,38 42,35" fill="none" stroke="#CA8A04" stroke-width="1.5" opacity="0.8"/>
                <circle cx="50" cy="50" r="10" fill="#713F12" stroke="#FEF08A" stroke-width="1.2" opacity="0.9"/>
              </pattern>

              <pattern id="pattern-watermark-hologram" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="none"/>
                <circle cx="50" cy="50" r="44" fill="none" stroke="#EC4899" stroke-width="1.8" opacity="0.8"/>
                <circle cx="50" cy="50" r="32" fill="none" stroke="#8B5CF6" stroke-width="1.4" opacity="0.85"/>
                <circle cx="50" cy="50" r="20" fill="none" stroke="#06B6D4" stroke-width="1.2" opacity="0.9"/>
                <line x1="5" y1="5" x2="95" y2="95" stroke="#F43F5E" stroke-width="1" opacity="0.75"/>
                <line x1="95" y1="5" x2="5" y2="95" stroke="#10B981" stroke-width="1" opacity="0.75"/>
              </pattern>

              <pattern id="pattern-watermark-postal-stamp" width="110" height="110" patternUnits="userSpaceOnUse">
                <rect width="110" height="110" fill="none"/>
                <circle cx="55" cy="55" r="48" fill="none" stroke="#FB923C" stroke-width="2" stroke-dasharray="5 3" opacity="0.85"/>
                <circle cx="55" cy="55" r="36" fill="none" stroke="#EA580C" stroke-width="1.2" opacity="0.75"/>
                <path d="M10,40 Q55,25 100,40" fill="none" stroke="#FDBA74" stroke-width="2" opacity="0.8"/>
                <path d="M10,55 Q55,40 100,55" fill="none" stroke="#FDBA74" stroke-width="2" opacity="0.8"/>
                <path d="M10,70 Q55,55 100,70" fill="none" stroke="#FDBA74" stroke-width="2" opacity="0.8"/>
              </pattern>

              <pattern id="pattern-watermark-security-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                <rect width="50" height="50" fill="none"/>
                <path d="M0,25 L25,0 L50,25 L25,50 Z" fill="none" stroke="#38BDF8" stroke-width="1" opacity="0.6"/>
                <line x1="0" y1="0" x2="50" y2="50" stroke="#0284C7" stroke-width="0.7" opacity="0.5"/>
                <line x1="50" y1="0" x2="0" y2="50" stroke="#0284C7" stroke-width="0.7" opacity="0.5"/>
                <circle cx="25" cy="25" r="3" fill="#BAE6FD" opacity="0.8"/>
              </pattern>

              {/* TEXTURE BRUSH PATTERN DEFINITIONS */}
              {TEXTURE_BRUSH_VARIANTS.map((v) => (
                <g key={v.id} dangerouslySetInnerHTML={{ __html: v.patternSvg }} />
              ))}
            </defs>

            {/* 3D EXTRUSION DEPTH SHADOW STACK (When 3D Texture Model is Active) */}
            {textureConfig?.is3D && (textureConfig?.depth3D || 0) > 0 && (
              <g pointerEvents="none">
                {Array.from({ length: Math.min(14, Math.max(2, Math.round((textureConfig.depth3D || 16) / 2.5))) }).map((_, idx) => {
                  const step = idx + 1;
                  const angleRad = ((textureConfig.lightAngle3D ?? 135) + 180) * (Math.PI / 180);
                  const offX = Math.round(Math.cos(angleRad) * (step * 2.2));
                  const offY = Math.round(Math.sin(angleRad) * (step * 2.2));
                  return (
                    <path
                      key={idx}
                      d={buildSvgPath(glyph)}
                      transform={`translate(${offX}, ${offY})`}
                      fill={textureConfig.shadowColor3D || '#040711'}
                      opacity={0.5 - (idx * 0.03)}
                    />
                  );
                })}
              </g>
            )}

            {/* GLYPH FILLED VECTOR PATH (With Active Shader / Texture Material) */}
            <path
              d={buildSvgPath(glyph)}
              fill={textureConfig?.enabled ? "url(#canvasGlyphGradient)" : "rgba(229, 9, 20, 0.22)"}
              stroke={textureConfig?.strokeColor || strokeColor}
              strokeWidth={textureConfig?.strokeWidth || 2}
              filter={
                textureConfig?.svgFilterType === '3d-extrusion' || (textureConfig?.is3D && textureConfig?.svgFilterType !== 'none')
                  ? 'url(#filter-3d-extrusion)'
                  : textureConfig?.svgFilterType === '3d-watermark-relief'
                  ? 'url(#filter-3d-watermark-relief)'
                  : textureConfig?.svgFilterType === 'noise-grain'
                  ? 'url(#filter-noise-grain)'
                  : textureConfig?.svgFilterType === 'turbulence-distortion'
                  ? 'url(#filter-turbulence-distortion)'
                  : textureConfig?.svgFilterType === 'metallic-emboss'
                  ? 'url(#filter-metallic-emboss)'
                  : textureConfig?.svgFilterType === 'neon-glow'
                  ? 'url(#filter-neon-glow)'
                  : textureConfig?.bevelDepth
                  ? `drop-shadow(0 ${textureConfig.bevelDepth}px ${textureConfig.bevelDepth * 1.5}px rgba(0,0,0,0.85))`
                  : "drop-shadow(0 0 16px rgba(229,9,20,0.35))"
              }
            />

            {/* 3D WATERMARK MODEL OVERLAY & EXTRUSION (Clipped to glyph contours) */}
            {textureConfig?.watermark3D?.enabled && (
              <g clipPath="url(#canvasGlyphClip)" pointerEvents="none">
                {/* 3D Watermark Extrusion Cast */}
                {(textureConfig.watermark3D.extrusion || 0) > 0 && (
                  <rect
                    x={-500 + Math.round(Math.cos(((textureConfig.watermark3D.angle ?? 135) + 180) * (Math.PI / 180)) * (textureConfig.watermark3D.extrusion || 6))}
                    y={-500 + Math.round(Math.sin(((textureConfig.watermark3D.angle ?? 135) + 180) * (Math.PI / 180)) * (textureConfig.watermark3D.extrusion || 6))}
                    width="2000"
                    height="2000"
                    fill={
                      textureConfig.watermark3D.type === 'embossed-seal'
                        ? 'url(#pattern-watermark-embossed-seal)'
                        : textureConfig.watermark3D.type === 'hologram'
                        ? 'url(#pattern-watermark-hologram)'
                        : textureConfig.watermark3D.type === 'postal-stamp'
                        ? 'url(#pattern-watermark-postal-stamp)'
                        : textureConfig.watermark3D.type === 'security-pattern'
                        ? 'url(#pattern-watermark-security-pattern)'
                        : 'url(#pattern-watermark-guilloche)'
                    }
                    opacity={(textureConfig.watermark3D.opacity || 0.75) * 0.45}
                    style={{ mixBlendMode: 'multiply', filter: 'blur(2px)' }}
                  />
                )}

                {/* Primary 3D Watermark Relief Layer */}
                <rect
                  x="-500"
                  y="-500"
                  width="2000"
                  height="2000"
                  fill={
                    textureConfig.watermark3D.type === 'embossed-seal'
                      ? 'url(#pattern-watermark-embossed-seal)'
                      : textureConfig.watermark3D.type === 'hologram'
                      ? 'url(#pattern-watermark-hologram)'
                      : textureConfig.watermark3D.type === 'postal-stamp'
                      ? 'url(#pattern-watermark-postal-stamp)'
                      : textureConfig.watermark3D.type === 'security-pattern'
                      ? 'url(#pattern-watermark-security-pattern)'
                      : 'url(#pattern-watermark-guilloche)'
                  }
                  opacity={textureConfig.watermark3D.opacity || 0.75}
                  style={{ mixBlendMode: (textureConfig.watermark3D.blendMode || 'screen') as any }}
                  filter="url(#filter-3d-watermark-relief)"
                />
              </g>
            )}

            {/* OVERLAY TEXTURE PATTERN CLIPPED TO GLYPH SHAPE */}
            {textureConfig?.enabled && textureConfig.type === 'preset-texture' && (
              <rect
                x="-500"
                y="-500"
                width="2000"
                height="2000"
                clipPath="url(#canvasGlyphClip)"
                fill={`url(#pattern-${activePreset.id})`}
                opacity={textureConfig.opacity || 0.8}
                style={{ mixBlendMode: textureConfig.blendMode || 'overlay' }}
                pointerEvents="none"
              />
            )}

            {/* OVERLAY CUSTOM USER-CREATED WEB TEXTURE CLIPPED TO GLYPH SHAPE */}
            {textureConfig?.enabled && textureConfig.type === 'custom-image' && textureConfig.customImageUrl && (
              <rect
                x="-500"
                y="-500"
                width="2000"
                height="2000"
                clipPath="url(#canvasGlyphClip)"
                fill="url(#canvasCustomPattern)"
                opacity={textureConfig.opacity || 0.85}
                style={{ mixBlendMode: textureConfig.blendMode || 'overlay' }}
                pointerEvents="none"
              />
            )}

            {/* PAINTED TEXTURE BRUSH STROKES CLIPPED TO GLYPH PATH */}
            <g clipPath="url(#canvasGlyphClip)" pointerEvents="none">
              {(glyph.textureBrushes || []).map((stroke) => {
                const fillUrl = stroke.textureType === 'custom-image' && (stroke.customImageUrl || textureConfig?.customImageUrl)
                  ? 'url(#canvasCustomPattern)'
                  : stroke.presetId
                  ? `url(#pattern-${stroke.presetId})`
                  : `url(#brush-${stroke.variantId || 'distress-acid'})`;

                return (
                  <g key={stroke.id} opacity={stroke.opacity} style={{ mixBlendMode: (stroke.blendMode || 'overlay') as any }}>
                    {stroke.points.map((pt, pIdx) => (
                      <circle
                        key={pIdx}
                        cx={toSvgX(pt.x)}
                        cy={toSvgY(pt.y)}
                        r={toSvgX(stroke.size / 2)}
                        fill={fillUrl}
                        stroke={stroke.color}
                        strokeWidth="0.8"
                        strokeOpacity="0.3"
                      />
                    ))}
                  </g>
                );
              })}

              {currentBrushStroke && (() => {
                const currentFillUrl = currentBrushStroke.textureType === 'custom-image' && (currentBrushStroke.customImageUrl || textureConfig?.customImageUrl)
                  ? 'url(#canvasCustomPattern)'
                  : currentBrushStroke.presetId
                  ? `url(#pattern-${currentBrushStroke.presetId})`
                  : `url(#brush-${currentBrushStroke.variantId || 'distress-acid'})`;

                return (
                  <g opacity={currentBrushStroke.opacity} style={{ mixBlendMode: (currentBrushStroke.blendMode || 'overlay') as any }}>
                    {currentBrushStroke.points.map((pt, pIdx) => (
                      <circle
                        key={pIdx}
                        cx={toSvgX(pt.x)}
                        cy={toSvgY(pt.y)}
                        r={toSvgX(currentBrushStroke.size / 2)}
                        fill={currentFillUrl}
                        stroke={currentBrushStroke.color}
                        strokeWidth="0.8"
                        strokeOpacity="0.3"
                      />
                    ))}
                  </g>
                );
              })()}
            </g>

            {/* BÉZIER NODES, HANDLES, AND MEASUREMENTS WITH LARGE TOUCH TARGETS */}
            {glyph.contours.map((contour: GlyphContour, _cIdx: number) =>
              contour.points.map((pt: BezierPoint, _pIdx: number) => {
                const svgPt = { x: toSvgX(pt.x), y: toSvgY(pt.y) };
                const isSelected = activePointId === pt.id;

                return (
                  <g key={pt.id}>
                    {/* Handle In Arm */}
                    {pt.type === 'smooth' && pt.handleIn && (
                      <>
                        <line
                          x1={toSvgX(pt.handleIn.x)}
                          y1={toSvgY(pt.handleIn.y)}
                          x2={svgPt.x}
                          y2={svgPt.y}
                          stroke="#38BDF8"
                          strokeWidth="1.2"
                        />
                        {/* Invisible large touch target */}
                        <circle
                          cx={toSvgX(pt.handleIn.x)}
                          cy={toSvgY(pt.handleIn.y)}
                          r="18"
                          fill="transparent"
                          className="cursor-pointer"
                          onPointerDown={(e) => handlePointPointerDown(pt.id, 'in', e)}
                        />
                        {/* Visible handle point */}
                        <circle
                          cx={toSvgX(pt.handleIn.x)}
                          cy={toSvgY(pt.handleIn.y)}
                          r="4.5"
                          fill="#38BDF8"
                          stroke="#080a0f"
                          strokeWidth="1.5"
                          className="cursor-pointer pointer-events-none"
                        />
                      </>
                    )}

                    {/* Handle Out Arm */}
                    {pt.type === 'smooth' && pt.handleOut && (
                      <>
                        <line
                          x1={toSvgX(pt.handleOut.x)}
                          y1={toSvgY(pt.handleOut.y)}
                          x2={svgPt.x}
                          y2={svgPt.y}
                          stroke="#38BDF8"
                          strokeWidth="1.2"
                        />
                        {/* Invisible large touch target */}
                        <circle
                          cx={toSvgX(pt.handleOut.x)}
                          cy={toSvgY(pt.handleOut.y)}
                          r="18"
                          fill="transparent"
                          className="cursor-pointer"
                          onPointerDown={(e) => handlePointPointerDown(pt.id, 'out', e)}
                        />
                        {/* Visible handle point */}
                        <circle
                          cx={toSvgX(pt.handleOut.x)}
                          cy={toSvgY(pt.handleOut.y)}
                          r="4.5"
                          fill="#38BDF8"
                          stroke="#080a0f"
                          strokeWidth="1.5"
                          className="cursor-pointer pointer-events-none"
                        />
                      </>
                    )}

                    {/* Invisible Large Touch Target Circle (Radius 22 for easy touch grabbing) */}
                    <circle
                      cx={svgPt.x}
                      cy={svgPt.y}
                      r="22"
                      fill="transparent"
                      className="cursor-pointer"
                      onPointerDown={(e) => handlePointPointerDown(pt.id, null, e)}
                    />

                    {/* Visible Main Node Anchor */}
                    <circle
                      cx={svgPt.x}
                      cy={svgPt.y}
                      r={isSelected ? 7 : 5}
                      fill={isSelected ? '#FEF08A' : pt.type === 'smooth' ? '#38BDF8' : '#FFFFFF'}
                      stroke={isSelected ? '#EF4444' : '#080a0f'}
                      strokeWidth={isSelected ? '2.5' : '1.8'}
                      className="cursor-pointer pointer-events-none"
                    />

                    {/* Node Coordinate badge when selected */}
                    {isSelected && (
                      <g className="pointer-events-none">
                        <rect
                          x={svgPt.x + 10}
                          y={svgPt.y - 24}
                          width="90"
                          height="20"
                          rx="4"
                          fill="#0e111a"
                          stroke="#EF4444"
                          strokeWidth="1"
                        />
                        <text
                          x={svgPt.x + 16}
                          y={svgPt.y - 10}
                          fill="#FFFFFF"
                          fontSize="10"
                          fontFamily="monospace"
                        >
                          {pt.x}, {pt.y}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })
            )}

            {/* LIVE MEASUREMENT OVERLAY */}
            {measurePoint && (
              <g className="pointer-events-none">
                <line
                  x1={toSvgX(measurePoint.x)}
                  y1={toSvgY(measurePoint.y)}
                  x2={toSvgX(mouseCanvasPos.fontX)}
                  y2={toSvgY(mouseCanvasPos.fontY)}
                  stroke="#EAB308"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                <circle cx={toSvgX(measurePoint.x)} cy={toSvgY(measurePoint.y)} r="4" fill="#EAB308" />
                <circle cx={toSvgX(mouseCanvasPos.fontX)} cy={toSvgY(mouseCanvasPos.fontY)} r="4" fill="#EAB308" />
                <text
                  x={toSvgX((measurePoint.x + mouseCanvasPos.fontX) / 2) + 10}
                  y={toSvgY((measurePoint.y + mouseCanvasPos.fontY) / 2) - 10}
                  fill="#EAB308"
                  fontSize="12"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  ΔX: {Math.abs(mouseCanvasPos.fontX - measurePoint.x)} | ΔY: {Math.abs(mouseCanvasPos.fontY - measurePoint.y)}
                </text>
              </g>
            )}

            {/* TEXTURE BRUSH HOVER / TOUCH RADIUS INDICATOR */}
            {(activeTool === 'texture' || activeTool === 'texture-brush') && (
              <g className="pointer-events-none">
                <circle
                  cx={toSvgX(mouseCanvasPos.fontX)}
                  cy={toSvgY(mouseCanvasPos.fontY)}
                  r={toSvgX((brushSize || 45) / 2)}
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  opacity="0.85"
                />
                <circle
                  cx={toSvgX(mouseCanvasPos.fontX)}
                  cy={toSvgY(mouseCanvasPos.fontY)}
                  r="2.5"
                  fill="#EF4444"
                />
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* BOTTOM-RIGHT CANVAS TELEMETRY BADGE */}
      <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2.5 bg-[#080a0f]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-800/80 text-[10px] font-mono text-zinc-400">
        <span>X: <span className="text-zinc-200">{mouseCanvasPos.fontX}</span></span>
        <span>Y: <span className="text-zinc-200">{mouseCanvasPos.fontY}</span></span>
        <span className="text-zinc-600">|</span>
        <span>Zoom: <span className="text-red-400 font-bold">{Math.round(zoom * 100)}%</span></span>
        <span className="text-zinc-600">|</span>
        <span>Nodes: <span className="text-zinc-200">{glyph.contours.reduce((acc: number, c: GlyphContour) => acc + c.points.length, 0)}</span></span>
      </div>
    </div>
  );
};
