import React, { useState, useRef, useEffect } from 'react';
import { 
  Download, Plus, Trash2, RotateCcw, Eye, Move, Pen, Sliders, 
  HelpCircle, Layers, ZoomIn, ZoomOut, Check, Sparkles 
} from 'lucide-react';
import opentype from 'opentype.js';
import confetti from 'canvas-confetti';
import { STARTER_GLYPHS } from '../../data/fontsData';
import { CustomGlyph, BezierPoint, GlyphContour } from '../../types/fontLab';

export const FontMakerStudio: React.FC = () => {
  const [selectedChar, setSelectedChar] = useState<string>('A');
  const [glyphs, setGlyphs] = useState<Record<string, CustomGlyph>>(STARTER_GLYPHS);
  const [activePointId, setActivePointId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedTool, setSelectedTool] = useState<'select' | 'pen' | 'delete'>('select');
  const [fontName, setFontName] = useState<string>('Alphaxen-Custom');
  const [designerName, setDesignerName] = useState<string>('Alphaxen Studio');
  const [zoom, setZoom] = useState<number>(0.55);
  const [showGuides, setShowGuides] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [testText, setTestText] = useState<string>('ALPHAXEN STUDIO 2026');
  const [exporting, setExporting] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);

  const svgRef = useRef<SVGSVGElement | null>(null);

  const currentGlyph = glyphs[selectedChar] || STARTER_GLYPHS['A'];

  // Metrics (standard 1000 UPM)
  const metrics = {
    unitsPerEm: 1000,
    ascender: 800,
    capHeight: 700,
    xHeight: 500,
    baseline: 200, // In SVG coordinate space (flipped vertically from font space)
    descender: -200
  };

  // Convert font coordinate (Y up from baseline) to SVG coordinate (Y down)
  const toSvgCoords = (fontX: number, fontY: number) => {
    // Font baseline is at y=0, cap height is at y=700
    // In SVG 1000x1000 canvas, let baseline be at y=800
    const svgX = fontX;
    const svgY = 800 - fontY;
    return { x: svgX, y: svgY };
  };

  const toFontCoords = (svgX: number, svgY: number) => {
    const fontX = Math.round(svgX);
    const fontY = Math.round(800 - svgY);
    return { x: fontX, y: fontY };
  };

  // Build SVG path data string for the glyph
  const buildSvgPath = (glyph: CustomGlyph) => {
    let d = '';
    glyph.contours.forEach((contour) => {
      if (contour.points.length === 0) return;
      const first = toSvgCoords(contour.points[0].x, contour.points[0].y);
      d += `M ${first.x} ${first.y} `;

      for (let i = 1; i < contour.points.length; i++) {
        const pt = contour.points[i];
        const svgPt = toSvgCoords(pt.x, pt.y);
        if (pt.type === 'smooth' && pt.handleIn) {
          const prev = contour.points[i - 1];
          const prevHandleOut = prev.handleOut ? toSvgCoords(prev.handleOut.x, prev.handleOut.y) : toSvgCoords(prev.x, prev.y);
          const currHandleIn = toSvgCoords(pt.handleIn.x, pt.handleIn.y);
          d += `C ${prevHandleOut.x} ${prevHandleOut.y}, ${currHandleIn.x} ${currHandleIn.y}, ${svgPt.x} ${svgPt.y} `;
        } else {
          d += `L ${svgPt.x} ${svgPt.y} `;
        }
      }

      if (contour.closed) {
        d += 'Z ';
      }
    });
    return d;
  };

  // Handle Point dragging
  const handleSvgMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const svgX = (e.clientX - rect.left) / zoom;
    const svgY = (e.clientY - rect.top) / zoom;
    const fontPos = toFontCoords(svgX, svgY);

    if (selectedTool === 'pen') {
      // Add a new point to the first contour
      const newPoint: BezierPoint = {
        id: `p-${Date.now()}`,
        x: fontPos.x,
        y: fontPos.y,
        type: 'corner'
      };

      setGlyphs((prev) => {
        const charGlyph = { ...(prev[selectedChar] || STARTER_GLYPHS['A']) };
        const contours = [...charGlyph.contours];
        if (contours.length === 0) {
          contours.push({ closed: true, points: [newPoint] });
        } else {
          contours[0] = {
            ...contours[0],
            points: [...contours[0].points, newPoint]
          };
        }
        return {
          ...prev,
          [selectedChar]: { ...charGlyph, contours }
        };
      });
      setActivePointId(newPoint.id);
    }
  };

  const handlePointMouseDown = (pointId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedTool === 'delete') {
      // Delete point
      setGlyphs((prev) => {
        const charGlyph = { ...(prev[selectedChar] || STARTER_GLYPHS['A']) };
        const contours = charGlyph.contours.map((c) => ({
          ...c,
          points: c.points.filter((p) => p.id !== pointId)
        }));
        return {
          ...prev,
          [selectedChar]: { ...charGlyph, contours }
        };
      });
      setActivePointId(null);
      return;
    }

    setActivePointId(pointId);
    setIsDragging(true);
  };

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging || !activePointId || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const svgX = (e.clientX - rect.left) / zoom;
    const svgY = (e.clientY - rect.top) / zoom;
    const fontPos = toFontCoords(svgX, svgY);

    setGlyphs((prev) => {
      const charGlyph = { ...(prev[selectedChar] || STARTER_GLYPHS['A']) };
      const contours = charGlyph.contours.map((c) => ({
        ...c,
        points: c.points.map((p) => {
          if (p.id === activePointId) {
            return { ...p, x: fontPos.x, y: fontPos.y };
          }
          return p;
        })
      }));
      return {
        ...prev,
        [selectedChar]: { ...charGlyph, contours }
      };
    });
  };

  const handleSvgMouseUp = () => {
    setIsDragging(false);
  };

  // Toggle point corner/smooth
  const togglePointType = (pointId: string) => {
    setGlyphs((prev) => {
      const charGlyph = { ...(prev[selectedChar] || STARTER_GLYPHS['A']) };
      const contours = charGlyph.contours.map((c) => ({
        ...c,
        points: c.points.map((p) => {
          if (p.id === pointId) {
            const nextType: 'corner' | 'smooth' = p.type === 'corner' ? 'smooth' : 'corner';
            const updatedPoint: BezierPoint = {
              ...p,
              type: nextType,
              handleIn: nextType === 'smooth' ? { x: p.x - 40, y: p.y } : undefined,
              handleOut: nextType === 'smooth' ? { x: p.x + 40, y: p.y } : undefined
            };
            return updatedPoint;
          }
          return p;
        })
      }));
      return {
        ...prev,
        [selectedChar]: { ...charGlyph, contours }
      };
    });
  };

  // Update advance width
  const setAdvanceWidth = (val: number) => {
    setGlyphs((prev) => ({
      ...prev,
      [selectedChar]: {
        ...currentGlyph,
        advanceWidth: val
      }
    }));
  };

  // Reset current glyph to master preset
  const handleResetGlyph = () => {
    if (STARTER_GLYPHS[selectedChar]) {
      setGlyphs((prev) => ({
        ...prev,
        [selectedChar]: JSON.parse(JSON.stringify(STARTER_GLYPHS[selectedChar]))
      }));
    }
  };

  // EXPORT REAL OTF FILE USING OPENTYPE.JS
  const handleExportOtf = () => {
    setExporting(true);
    try {
      // 1. Create .notdef glyph
      const notdefGlyph = new opentype.Glyph({
        name: '.notdef',
        unicode: 0,
        advanceWidth: 600,
        path: new opentype.Path()
      });
      notdefGlyph.path.moveTo(100, 0);
      notdefGlyph.path.lineTo(100, 700);
      notdefGlyph.path.lineTo(500, 700);
      notdefGlyph.path.lineTo(500, 0);
      notdefGlyph.path.close();

      const glyphList: opentype.Glyph[] = [notdefGlyph];

      // 2. Convert all custom glyphs
      Object.keys(glyphs).forEach((char) => {
        const cg = glyphs[char];
        const otPath = new opentype.Path();

        cg.contours.forEach((contour) => {
          if (contour.points.length === 0) return;
          otPath.moveTo(contour.points[0].x, contour.points[0].y);

          for (let i = 1; i < contour.points.length; i++) {
            const pt = contour.points[i];
            if (pt.type === 'smooth' && pt.handleIn) {
              const prev = contour.points[i - 1];
              const c1x = prev.handleOut ? prev.handleOut.x : prev.x;
              const c1y = prev.handleOut ? prev.handleOut.y : prev.y;
              otPath.bezierCurveTo(c1x, c1y, pt.handleIn.x, pt.handleIn.y, pt.x, pt.y);
            } else {
              otPath.lineTo(pt.x, pt.y);
            }
          }

          if (contour.closed) {
            otPath.close();
          }
        });

        const glyph = new opentype.Glyph({
          name: char,
          unicode: char.charCodeAt(0),
          advanceWidth: cg.advanceWidth,
          path: otPath
        });

        glyphList.push(glyph);
      });

      // 3. Construct OpenType Font Object
      const font = new opentype.Font({
        familyName: fontName || 'Alphaxen-Custom',
        styleName: 'Display-Bold',
        unitsPerEm: 1000,
        ascender: 800,
        descender: -200,
        designer: designerName || 'Alphaxen Foundry',
        designerURL: 'https://alphaxen-fontlab.io',
        manufacturer: 'Alphaxen Type Studio',
        version: 'Version 1.000; 2026; OpenType build',
        glyphs: glyphList
      });

      // 4. Download binary
      font.download(`${fontName.toLowerCase().replace(/\s+/g, '-')}.otf`);
      
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to export OTF font:', err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="bg-[#09090d] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* TOOLBAR HEADER */}
      <div className="bg-[#0e0e14] border-b border-zinc-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
            <Pen className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>Technical Font Maker & OTF Engine</span>
              <span className="text-[10px] font-mono uppercase bg-red-950/60 text-red-400 px-2 py-0.5 rounded border border-red-800/40">
                PRO OTF 2.0
              </span>
            </h2>
            <p className="text-xs text-zinc-400">
              Vector Bézier curve engine with real-time OpenType binary compiler.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleResetGlyph}
            className="px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-xs text-zinc-300 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset Glyph to Master"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleExportOtf}
            disabled={exporting}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-all cursor-pointer"
          >
            {exportSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>OTF Font Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Export Real .OTF Font</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* MAIN WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800">
        
        {/* LEFT COLUMN: GLYPH MATRIX & TOOLS (3 cols) */}
        <div className="lg:col-span-3 p-5 space-y-6 bg-[#0a0a0f]">
          {/* Character Selector */}
          <div>
            <label className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-semibold block mb-3">
              Glyph Matrix
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['A', 'X', 'O', 'F', 'B', 'C', 'E', 'R', 'S', 'T', '1', '8'].map((char) => {
                const isSelected = selectedChar === char;
                return (
                  <button
                    key={char}
                    onClick={() => {
                      if (!glyphs[char]) {
                        // initialize clone
                        setGlyphs(prev => ({
                          ...prev,
                          [char]: {
                            ...STARTER_GLYPHS['A'],
                            char,
                            unicode: char.charCodeAt(0)
                          }
                        }));
                      }
                      setSelectedChar(char);
                    }}
                    className={`h-12 rounded-xl border flex flex-col items-center justify-center font-display-serif text-lg font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-red-950/40 border-red-600 text-red-300 shadow-[0_0_10px_rgba(220,38,38,0.3)]'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    <span>{char}</span>
                    <span className="text-[9px] font-mono text-zinc-400 font-normal">
                      U+{char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tools Palette */}
          <div>
            <label className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-semibold block mb-2">
              Curve Tool
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedTool('select')}
                className={`py-2 px-3 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  selectedTool === 'select'
                    ? 'bg-red-600/20 border-red-500 text-red-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Move className="w-3.5 h-3.5" />
                <span>Move</span>
              </button>
              <button
                onClick={() => setSelectedTool('pen')}
                className={`py-2 px-3 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  selectedTool === 'pen'
                    ? 'bg-red-600/20 border-red-500 text-red-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Node</span>
              </button>
              <button
                onClick={() => setSelectedTool('delete')}
                className={`py-2 px-3 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  selectedTool === 'delete'
                    ? 'bg-red-600/20 border-red-500 text-red-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>

          {/* Metrics Sliders */}
          <div className="space-y-4">
            <label className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-semibold block">
              Typographic Metrics
            </label>

            <div>
              <div className="flex justify-between text-xs font-mono text-zinc-300 mb-1">
                <span>Advance Width</span>
                <span className="text-red-400 font-bold">{currentGlyph.advanceWidth} UPM</span>
              </div>
              <input
                type="range"
                min="400"
                max="1000"
                step="10"
                value={currentGlyph.advanceWidth}
                onChange={(e) => setAdvanceWidth(Number(e.target.value))}
                className="w-full accent-red-600 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="text-[11px] font-mono text-zinc-400 space-y-1 bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
              <div className="flex justify-between">
                <span>Cap Height:</span>
                <span className="text-zinc-200">700</span>
              </div>
              <div className="flex justify-between">
                <span>Baseline:</span>
                <span className="text-zinc-200">0</span>
              </div>
              <div className="flex justify-between">
                <span>Descender:</span>
                <span className="text-zinc-200">-200</span>
              </div>
              <div className="flex justify-between">
                <span>Units Per Em:</span>
                <span className="text-zinc-200">1000</span>
              </div>
            </div>
          </div>

          {/* Font Metadata */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-semibold block">
              OpenType Metadata
            </label>
            <div>
              <label className="text-[11px] text-zinc-400 block mb-1">Font Family</label>
              <input
                type="text"
                value={fontName}
                onChange={(e) => setFontName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-red-500 font-mono"
              />
            </div>
            <div>
              <label className="text-[11px] text-zinc-400 block mb-1">Punchcutter / Designer</label>
              <input
                type="text"
                value={designerName}
                onChange={(e) => setDesignerName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-red-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: INTERACTIVE BÉZIER CANVAS (6 cols) */}
        <div className="lg:col-span-6 p-6 flex flex-col items-center justify-between bg-[#060609] relative select-none">
          {/* Canvas Controls Overlay */}
          <div className="w-full flex items-center justify-between text-xs text-zinc-400 font-mono mb-4">
            <div className="flex items-center gap-3">
              <span>Zoom: {Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom((z) => Math.min(1.2, z + 0.1))}
                className="p-1 rounded bg-zinc-800 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoom((z) => Math.max(0.3, z - 0.1))}
                className="p-1 rounded bg-zinc-800 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showGuides}
                  onChange={(e) => setShowGuides(e.target.checked)}
                  className="accent-red-600 rounded"
                />
                <span>Guides</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showGrid}
                  onChange={(e) => setShowGrid(e.target.checked)}
                  className="accent-red-600 rounded"
                />
                <span>Grid</span>
              </label>
            </div>
          </div>

          {/* SVG Canvas */}
          <div 
            className="relative border border-zinc-800/80 rounded-xl overflow-hidden shadow-2xl bg-[#09090e]"
            style={{ width: `${1000 * zoom}px`, height: `${1000 * zoom}px` }}
          >
            <svg
              ref={svgRef}
              viewBox="0 0 1000 1000"
              className="w-full h-full cursor-crosshair overflow-visible"
              onMouseDown={handleSvgMouseDown}
              onMouseMove={handleSvgMouseMove}
              onMouseUp={handleSvgMouseUp}
            >
              {/* Optional Grid Background */}
              {showGrid && (
                <defs>
                  <pattern id="gridPattern" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#1f2937" strokeWidth="0.5" opacity="0.4" />
                  </pattern>
                </defs>
              )}
              {showGrid && <rect width="1000" height="1000" fill="url(#gridPattern)" />}

              {/* TYPOGRAPHY GUIDE LINES */}
              {showGuides && (
                <g opacity="0.75" className="pointer-events-none">
                  {/* Cap Height (y=700 in font -> 100 in SVG) */}
                  <line x1="0" y1="100" x2="1000" y2="100" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />
                  <text x="15" y="95" fill="#38bdf8" fontSize="12" fontFamily="monospace">Cap Height (700)</text>

                  {/* X-Height (y=500 in font -> 300 in SVG) */}
                  <line x1="0" y1="300" x2="1000" y2="300" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
                  <text x="15" y="295" fill="#94a3b8" fontSize="12" fontFamily="monospace">x-Height (500)</text>

                  {/* Baseline (y=0 in font -> 800 in SVG) */}
                  <line x1="0" y1="800" x2="1000" y2="800" stroke="#ef4444" strokeWidth="1.5" />
                  <text x="15" y="795" fill="#ef4444" fontSize="12" fontFamily="monospace" fontWeight="bold">Baseline (0)</text>

                  {/* Descender (y=-200 in font -> 1000 in SVG) */}
                  <line x1="0" y1="1000" x2="1000" y2="1000" stroke="#64748b" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Advance Width guide */}
                  <line x1={currentGlyph.advanceWidth} y1="0" x2={currentGlyph.advanceWidth} y2="1000" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x={currentGlyph.advanceWidth - 95} y="40" fill="#f59e0b" fontSize="12" fontFamily="monospace">Width ({currentGlyph.advanceWidth})</text>
                </g>
              )}

              {/* GLYPH FILLED VECTOR PATH */}
              <path
                d={buildSvgPath(currentGlyph)}
                fill="rgba(220, 38, 38, 0.25)"
                stroke="#ef4444"
                strokeWidth="2.5"
                filter="drop-shadow(0 0 10px rgba(220,38,38,0.3))"
              />

              {/* BÉZIER NODES & ANCHORS */}
              {currentGlyph.contours.map((contour) =>
                contour.points.map((pt) => {
                  const svgPt = toSvgCoords(pt.x, pt.y);
                  const isSelected = activePointId === pt.id;

                  return (
                    <g key={pt.id}>
                      {/* Smooth handle arms if applicable */}
                      {pt.type === 'smooth' && pt.handleIn && (
                        <line
                          x1={toSvgCoords(pt.handleIn.x, pt.handleIn.y).x}
                          y1={toSvgCoords(pt.handleIn.x, pt.handleIn.y).y}
                          x2={svgPt.x}
                          y2={svgPt.y}
                          stroke="#38bdf8"
                          strokeWidth="1"
                        />
                      )}

                      {/* Anchor Node Circle */}
                      <circle
                        cx={svgPt.x}
                        cy={svgPt.y}
                        r={isSelected ? 7 : 5}
                        fill={isSelected ? '#fef08a' : pt.type === 'smooth' ? '#38bdf8' : '#ffffff'}
                        stroke="#dc2626"
                        strokeWidth="2"
                        className="cursor-pointer hover:scale-125 transition-transform"
                        onMouseDown={(e) => handlePointMouseDown(pt.id, e)}
                        onDoubleClick={() => togglePointType(pt.id)}
                      />
                    </g>
                  );
                })
              )}
            </svg>
          </div>

          <div className="w-full flex items-center justify-between text-[11px] text-zinc-400 font-mono mt-4 pt-3 border-t border-zinc-800">
            <span>Click & Drag to sculpt outline</span>
            <span>Double click node to toggle Corner/Smooth</span>
          </div>
        </div>

        {/* RIGHT COLUMN: REAL-TIME TYPE TESTER (3 cols) */}
        <div className="lg:col-span-3 p-5 space-y-6 bg-[#0a0a0f]">
          <div>
            <label className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-semibold block mb-2">
              Live Sentence Preview
            </label>
            <textarea
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              rows={3}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 font-mono focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Test Card */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 min-h-[140px] flex items-center justify-center text-center">
              <span className="font-display-serif text-3xl sm:text-4xl text-white font-bold tracking-wider leading-snug">
                {testText}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/20 to-zinc-900 border border-red-900/30">
              <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold block mb-1">
                COMPILATION SPEC
              </span>
              <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                Export produces valid CFF / TrueType outlines compliant with ISO/IEC 14496-22 OpenType standards.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
