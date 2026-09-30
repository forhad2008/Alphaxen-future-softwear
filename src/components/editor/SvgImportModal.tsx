import React, { useState } from 'react';
import { X, Sparkles, Code, Check } from 'lucide-react';
import { CustomGlyph, BezierPoint } from '../../types/fontLab';

interface SvgImportModalProps {
  currentChar: string;
  onImportPoints: (newPoints: BezierPoint[], advanceWidth?: number) => void;
  onClose: () => void;
}

export const SvgImportModal: React.FC<SvgImportModalProps> = ({
  currentChar,
  onImportPoints,
  onClose
}) => {
  const [svgInput, setSvgInput] = useState<string>(
    `<svg viewBox="0 0 1000 1000">\n  <path d="M 120 700 L 500 100 L 880 700 L 720 700 L 500 350 L 280 700 Z" />\n</svg>`
  );
  const [parseError, setParseError] = useState<string | null>(null);

  const handleImport = () => {
    try {
      setParseError(null);
      // Extract d attribute from path
      const dMatch = svgInput.match(/d="([^"]+)"/i) || svgInput.match(/d='([^']+)'/i);
      if (!dMatch) {
        throw new Error('Could not find SVG path data "d" attribute in provided code.');
      }

      const dString = dMatch[1];
      // Basic parser for M / L / Z coordinates
      const commands = dString.match(/[a-df-z]|[\d.-]+/gi) || [];
      const points: BezierPoint[] = [];

      let i = 0;
      let curX = 0;
      let curY = 0;

      while (i < commands.length) {
        const cmd = commands[i];
        if (cmd === 'M' || cmd === 'L') {
          const x = parseFloat(commands[i + 1]);
          const y = parseFloat(commands[i + 2]);
          if (!isNaN(x) && !isNaN(y)) {
            // Note: SVG Y is 0 at top, 1000 at bottom. Font Y is 0 at baseline (800 in SVG)
            const fontY = Math.round(800 - y);
            points.push({
              id: `svg-pt-${points.length}-${Date.now()}`,
              x: Math.round(x),
              y: fontY,
              type: 'corner'
            });
            curX = x;
            curY = y;
          }
          i += 3;
        } else if (cmd === 'm' || cmd === 'l') {
          const dx = parseFloat(commands[i + 1]);
          const dy = parseFloat(commands[i + 2]);
          if (!isNaN(dx) && !isNaN(dy)) {
            curX += dx;
            curY += dy;
            points.push({
              id: `svg-pt-${points.length}-${Date.now()}`,
              x: Math.round(curX),
              y: Math.round(800 - curY),
              type: 'corner'
            });
          }
          i += 3;
        } else if (cmd === 'Z' || cmd === 'z') {
          i += 1;
        } else {
          i += 1;
        }
      }

      if (points.length === 0) {
        throw new Error('No valid coordinate points extracted from SVG path.');
      }

      onImportPoints(points, 750);
      onClose();
    } catch (err: any) {
      setParseError(err.message || 'Failed to parse SVG path vector data');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none text-xs">
      <div className="relative w-full max-w-xl bg-[#0B0B0B] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* HEADER */}
        <div className="p-5 bg-[#0E0E0E] border-b border-zinc-900 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img 
              src="/logo.png" 
              alt="Alphaxen Logo" 
              className="h-7 w-auto max-w-[110px] object-contain shrink-0" 
              onError={(e) => { e.currentTarget.style.display = 'none'; }} 
            />
            <Sparkles className="w-5 h-5 text-[#E50914] shrink-0" />
            <div>
              <h2 className="font-mono text-sm font-bold text-white tracking-wider">
                IMPORT VECTOR SVG OUTLINE INTO GLYPH '{currentChar}'
              </h2>
              <p className="text-[11px] font-mono text-zinc-500">
                Paste vector path markup from Illustrator, Figma, or FontForge
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
        <div className="p-6 space-y-4 font-mono">
          <div>
            <label className="text-[10px] uppercase text-zinc-400 tracking-wider font-semibold block mb-1">
              SVG Code or Path String
            </label>
            <textarea
              rows={8}
              value={svgInput}
              onChange={(e) => setSvgInput(e.target.value)}
              className="w-full bg-[#121212] border border-zinc-800 rounded p-3 text-zinc-200 text-xs focus:outline-none focus:border-[#E50914]"
              placeholder='<svg viewBox="0 0 1000 1000"><path d="..." /></svg>'
            />
          </div>

          {parseError && (
            <div className="p-3 rounded bg-red-950/40 border border-red-900 text-red-400 text-xs">
              {parseError}
            </div>
          )}

          <p className="text-[11px] text-zinc-500 leading-relaxed">
            Note: The importer automatically maps coordinates into a 1000 UPM bounding box, positioning the baseline at Y=0.
          </p>
        </div>

        {/* FOOTER */}
        <div className="p-4 bg-[#0E0E0E] border-t border-zinc-900 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            className="px-6 py-2 rounded bg-[#E50914] hover:bg-[#FF1A1A] text-white font-mono font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(229,9,20,0.4)]"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Parse & Bake into Glyph</span>
          </button>
        </div>

      </div>
    </div>
  );
};
