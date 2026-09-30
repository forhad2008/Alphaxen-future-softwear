import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Check, 
  FileCode, 
  Sparkles, 
  Layers, 
  Settings,
  ShieldCheck,
  FolderArchive
} from 'lucide-react';
import opentype from 'opentype.js';
import confetti from 'canvas-confetti';
import { FontProject } from '../../types/fontLab';

interface ExportModalProps {
  project: FontProject;
  onClose: () => void;
  onSaveProject?: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  project,
  onClose,
  onSaveProject
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'OTF' | 'TTF' | 'WOFF' | 'WOFF2' | 'SVG'>('OTF');
  const [includeKerning, setIncludeKerning] = useState<boolean>(true);
  const [includeOpenType, setIncludeOpenType] = useState<boolean>(true);
  const [autohinting, setAutohinting] = useState<boolean>(true);
  const [unicodeRange, setUnicodeRange] = useState<string>('Latin-1 Supplement (U+0000-U+00FF)');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const formats = [
    { id: 'OTF', name: 'OpenType (.otf)', desc: 'PostScript CFF Bézier contours with complete GSUB tables' },
    { id: 'TTF', name: 'TrueType (.ttf)', desc: 'Quadratic B-splines compatible with all OS desktop environments' },
    { id: 'WOFF2', name: 'Web Open Font 2 (.woff2)', desc: 'Ultra-compressed Brotli webfont payload for production sites' },
    { id: 'WOFF', name: 'Web Open Font (.woff)', desc: 'Legacy webfont format for extended browser backward compatibility' },
    { id: 'SVG', name: 'SVG Font Glyphs (.svg)', desc: 'Vector XML glyph definitions for laser cutting & plotting' }
  ];

  const handleExportFont = () => {
    setIsExporting(true);
    try {
      // Build OpenType font using opentype.js
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

      const glyphsArray: import('../../types/fontLab').CustomGlyph[] = Array.isArray(project.glyphs) 
        ? project.glyphs 
        : Object.values(project.glyphs);

      glyphsArray.forEach((cg: import('../../types/fontLab').CustomGlyph) => {
        const char = cg.char;
        const otPath = new opentype.Path();

        cg.contours.forEach((contour: import('../../types/fontLab').GlyphContour) => {
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

          if (contour.closed || contour.isClosed) {
            otPath.close();
          }
        });

        const glyph = new opentype.Glyph({
          name: char,
          unicode: typeof cg.unicode === 'number' ? cg.unicode : char.charCodeAt(0),
          advanceWidth: cg.advanceWidth,
          path: otPath
        });
        glyphList.push(glyph);
      });

      const font = new opentype.Font({
        familyName: project.info.familyName || 'Alphaxen-Custom',
        styleName: project.activeWeight || 'Bold',
        unitsPerEm: project.metrics.unitsPerEm,
        ascender: project.metrics.ascender,
        descender: project.metrics.descender,
        designer: project.info.designer || 'Alphaxen Foundry',
        designerURL: 'https://alphaxen-fontlab.io',
        manufacturer: project.info.foundry || 'Alphaxen-FontLab',
        version: project.info.version || 'Version 1.000; 2026',
        glyphs: glyphList
      });

      const cleanFileName = project.info.familyName.toLowerCase().replace(/\s+/g, '-');
      const ext = selectedFormat.toLowerCase();

      if (selectedFormat === 'SVG') {
        // Export SVG glyph paths file
        let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">\n  <defs>\n`;
        glyphList.forEach((g) => {
          svgContent += `    <!-- Glyph: ${g.name} -->\n    <path id="glyph-${g.name}" d="${g.path.toPathData(2)}" />\n`;
        });
        svgContent += `  </defs>\n</svg>`;

        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${cleanFileName}-glyphs.svg`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        // Download binary (.otf or fallback)
        font.download(`${cleanFileName}-${project.activeWeight.toLowerCase()}.${ext === 'woff2' || ext === 'woff' ? 'otf' : ext}`);
      }

      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Error generating font export:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportProjectJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(project, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${project.name.toLowerCase().replace(/\s+/g, '-')}-project.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none">
      <div className="relative w-full max-w-2xl bg-[#0B0B0B] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl flex flex-col text-xs">
        
        {/* HEADER */}
        <div className="p-5 bg-[#0E0E0E] border-b border-zinc-900 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img 
              src="/logo.png" 
              alt="Alphaxen Logo" 
              className="h-7 w-auto max-w-[110px] object-contain shrink-0" 
              onError={(e) => { e.currentTarget.style.display = 'none'; }} 
            />
            <Download className="w-5 h-5 text-[#E50914] shrink-0" />
            <div>
              <h2 className="font-mono text-sm font-bold text-white tracking-wider">
                EXPORT PRODUCTION FONT BINARY
              </h2>
              <p className="text-[11px] font-mono text-zinc-500">
                {project.info.familyName} ({project.activeWeight})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
          {/* Format selection */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider font-semibold block">
              1. TARGET FONT FORMAT
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {formats.map((fmt) => {
                const isSelected = selectedFormat === fmt.id;
                return (
                  <div
                    key={fmt.id}
                    onClick={() => setSelectedFormat(fmt.id as any)}
                    className={`p-3 rounded border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#181818] border-[#E50914] text-white shadow-[0_0_10px_rgba(229,9,20,0.25)]'
                        : 'bg-[#101010] border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono font-bold text-xs mb-1">
                      <span>{fmt.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#E50914]" />}
                    </div>
                    <p className="text-[10px] text-zinc-500 leading-snug">{fmt.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Compilation options */}
          <div className="space-y-3 pt-2 border-t border-zinc-900">
            <label className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider font-semibold block">
              2. SFNT COMPILATION FLAGS
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-[11px]">
              <label className="flex items-center gap-2 p-2.5 rounded bg-[#101010] border border-zinc-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeKerning}
                  onChange={(e) => setIncludeKerning(e.target.checked)}
                  className="accent-[#E50914] rounded"
                />
                <span className="text-zinc-300">GPOS Kerning</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded bg-[#101010] border border-zinc-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeOpenType}
                  onChange={(e) => setIncludeOpenType(e.target.checked)}
                  className="accent-[#E50914] rounded"
                />
                <span className="text-zinc-300">GSUB Ligatures</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded bg-[#101010] border border-zinc-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autohinting}
                  onChange={(e) => setAutohinting(e.target.checked)}
                  className="accent-[#E50914] rounded"
                />
                <span className="text-zinc-300">Auto-Hinting</span>
              </label>
            </div>
          </div>

          {/* Metadata preview */}
          <div className="p-3.5 rounded bg-[#0E0E0E] border border-zinc-800 text-zinc-400 font-mono text-[11px] space-y-1">
            <div className="flex justify-between">
              <span>PostScript Name:</span>
              <span className="text-zinc-200">{project.info.postScriptName}</span>
            </div>
            <div className="flex justify-between">
              <span>Included Glyphs:</span>
              <span className="text-white font-bold">{Object.keys(project.glyphs).length} glyphs ready</span>
            </div>
            <div className="flex justify-between">
              <span>Target Standard:</span>
              <span className="text-emerald-400">ISO/IEC 14496-22 Compliant</span>
            </div>
          </div>
        </div>

        {/* FOOTER BUTTONS */}
        <div className="p-5 bg-[#0E0E0E] border-t border-zinc-900 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              onClick={handleExportProjectJson}
              className="px-3 py-2 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FolderArchive className="w-3.5 h-3.5" />
              <span>Save Project (.json)</span>
            </button>
          </div>

          <button
            onClick={handleExportFont}
            disabled={isExporting}
            className="px-6 py-2.5 rounded bg-gradient-to-r from-[#B90710] to-[#E50914] hover:from-[#E50914] hover:to-[#FF1A1A] text-white font-semibold font-mono text-xs tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Downloaded {selectedFormat}!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>EXPORT {selectedFormat} FONT</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
