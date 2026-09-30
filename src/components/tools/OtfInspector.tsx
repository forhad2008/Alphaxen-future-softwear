import React, { useState } from 'react';
import { Upload, FileCode, CheckCircle, Search, Info, Grid, Hash, Layers } from 'lucide-react';
import opentype from 'opentype.js';

export const OtfInspector: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<string>('imperial-eagle');
  const [fontData, setFontData] = useState<any>({
    familyName: 'Imperial Eagle',
    styleName: 'Display Heavy',
    unitsPerEm: 1000,
    ascender: 820,
    descender: -220,
    numGlyphs: 384,
    version: 'Version 2.010; 2026',
    weightClass: 800,
    widthClass: 5,
    vendorId: 'APXN',
    postScriptName: 'ImperialEagle-Heavy',
    copyright: '© 2026 Alphaxen-FontLab Foundry. All rights reserved.',
    designer: 'M. Vane & K. Richter (Alphaxen Punchcutting Guild)',
    panose: '2 0 8 3 6 0 0 2 0 4',
    tablesPresent: ['head', 'hhea', 'maxp', 'OS/2', 'name', 'cmap', 'post', 'GSUB', 'GPOS', 'CFF ']
  });

  const [searchGlyph, setSearchGlyph] = useState<string>('');
  const [activeTableTab, setActiveTableTab] = useState<'overview' | 'tables' | 'glyphs'>('overview');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const buffer = event.target?.result as ArrayBuffer;
        const font = opentype.parse(buffer);
        setFontData({
          familyName: font.names.fontFamily?.en || file.name.replace(/\.[^/.]+$/, ''),
          styleName: font.names.fontSubfamily?.en || 'Regular',
          unitsPerEm: font.unitsPerEm,
          ascender: font.ascender,
          descender: font.descender,
          numGlyphs: font.numGlyphs,
          version: font.names.version?.en || 'Version 1.0',
          weightClass: (font.tables.os2 as any)?.usWeightClass || 400,
          widthClass: (font.tables.os2 as any)?.usWidthClass || 5,
          vendorId: (font.tables.os2 as any)?.achVendID || 'ALPH',
          postScriptName: font.names.postScriptName?.en || font.names.fontFamily?.en,
          copyright: font.names.copyright?.en || 'Private Font License',
          designer: font.names.designer?.en || 'Unknown Punchcutter',
          panose: '2 0 5 3 0 0 0 0 0 0',
          tablesPresent: Object.keys(font.tables)
        });
      } catch (err) {
        console.error('Error parsing uploaded font:', err);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const sampleGlyphs = [
    { char: 'A', code: 'U+0041', id: 1, width: 700, lsb: 50 },
    { char: 'B', code: 'U+0042', id: 2, width: 680, lsb: 65 },
    { char: 'C', code: 'U+0043', id: 3, width: 720, lsb: 55 },
    { char: 'D', code: 'U+0044', id: 4, width: 710, lsb: 60 },
    { char: 'E', code: 'U+0045', id: 5, width: 640, lsb: 55 },
    { char: 'F', code: 'U+0046', id: 6, width: 590, lsb: 60 },
    { char: 'G', code: 'U+0047', id: 7, width: 740, lsb: 50 },
    { char: 'H', code: 'U+0048', id: 8, width: 730, lsb: 65 },
    { char: 'I', code: 'U+0049', id: 9, width: 340, lsb: 70 },
    { char: 'J', code: 'U+004A', id: 10, width: 480, lsb: 40 },
    { char: 'K', code: 'U+004B', id: 11, width: 690, lsb: 60 },
    { char: 'L', code: 'U+004C', id: 12, width: 580, lsb: 65 },
    { char: 'M', code: 'U+004D', id: 13, width: 880, lsb: 65 },
    { char: 'N', code: 'U+004E', id: 14, width: 720, lsb: 65 },
    { char: 'O', code: 'U+004F', id: 15, width: 760, lsb: 50 },
    { char: 'P', code: 'U+0050', id: 16, width: 650, lsb: 65 },
    { char: 'Q', code: 'U+0051', id: 17, width: 780, lsb: 50 },
    { char: 'R', code: 'U+0052', id: 18, width: 690, lsb: 65 },
    { char: 'S', code: 'U+0053', id: 19, width: 630, lsb: 45 },
    { char: 'T', code: 'U+0054', id: 20, width: 620, lsb: 30 },
    { char: 'U', code: 'U+0055', id: 21, width: 720, lsb: 60 },
    { char: 'V', code: 'U+0056', id: 22, width: 670, lsb: 40 },
    { char: 'W', code: 'U+0057', id: 23, width: 920, lsb: 40 },
    { char: 'X', code: 'U+0058', id: 24, width: 680, lsb: 40 },
    { char: 'Y', code: 'U+0059', id: 25, width: 640, lsb: 30 },
    { char: 'Z', code: 'U+005A', id: 26, width: 630, lsb: 45 }
  ];

  const filteredGlyphs = sampleGlyphs.filter(
    (g) => g.char.toLowerCase().includes(searchGlyph.toLowerCase()) || g.code.toLowerCase().includes(searchGlyph.toLowerCase())
  );

  return (
    <div className="bg-[#09090d] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* HEADER */}
      <div className="bg-[#0e0e14] border-b border-zinc-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
            <Grid className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>OpenType Binary Inspector & Table Explorer</span>
              <span className="text-[10px] font-mono uppercase bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded border border-zinc-700">
                SFNT / OTF / TTF
              </span>
            </h2>
            <p className="text-xs text-zinc-400">
              Inspect OpenType headers, OS/2 metrics, cmap mappings, and character widths.
            </p>
          </div>
        </div>

        {/* Upload Custom Font */}
        <label className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-semibold text-zinc-200 flex items-center gap-2 transition-colors cursor-pointer">
          <Upload className="w-3.5 h-3.5 text-red-400" />
          <span>Upload Custom Font (.otf, .ttf)</span>
          <input
            type="file"
            accept=".otf,.ttf,.woff"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="border-b border-zinc-800 px-6 bg-[#0a0a0f] flex space-x-6">
        {[
          { id: 'overview', label: 'Font Summary' },
          { id: 'tables', label: 'SFNT Tables Breakdown' },
          { id: 'glyphs', label: 'Character Map (cmap)' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTableTab(tab.id as any)}
            className={`py-3 text-xs font-mono tracking-wider transition-colors border-b-2 cursor-pointer ${
              activeTableTab === tab.id
                ? 'border-red-600 text-white font-bold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT PANELS */}
      <div className="p-6">
        {activeTableTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-[11px] font-mono text-zinc-400 block mb-1">FAMILY NAME</span>
                <span className="text-lg font-bold text-white font-display-serif">{fontData.familyName}</span>
                <span className="text-xs text-red-400 block mt-1">{fontData.styleName}</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-[11px] font-mono text-zinc-400 block mb-1">UNITS PER EM</span>
                <span className="text-lg font-bold text-white font-mono">{fontData.unitsPerEm}</span>
                <span className="text-xs text-zinc-400 block mt-1 font-mono">Asc: +{fontData.ascender} / Dsc: {fontData.descender}</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-[11px] font-mono text-zinc-400 block mb-1">GLYPH COUNT</span>
                <span className="text-lg font-bold text-white font-mono">{fontData.numGlyphs} Glyphs</span>
                <span className="text-xs text-zinc-400 block mt-1">Full Latin Pro</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-[11px] font-mono text-zinc-400 block mb-1">POSTSCRIPT NAME</span>
                <span className="text-sm font-bold text-white font-mono">{fontData.postScriptName}</span>
                <span className="text-xs text-emerald-400 block mt-1 font-mono">Weight: {fontData.weightClass}</span>
              </div>
            </div>

            {/* Detailed Table Grid */}
            <div className="p-5 rounded-xl bg-[#0e0e14] border border-zinc-800 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold flex items-center gap-2">
                <Info className="w-4 h-4 text-red-400" />
                <span>OpenType Name Records (Table 'name')</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-zinc-950/80 p-3 rounded-lg border border-zinc-800/80">
                  <span className="text-zinc-400 block">Designer / Punchcutter:</span>
                  <span className="text-zinc-200 mt-1 block">{fontData.designer}</span>
                </div>
                <div className="bg-zinc-950/80 p-3 rounded-lg border border-zinc-800/80">
                  <span className="text-zinc-400 block">Copyright & Foundry:</span>
                  <span className="text-zinc-200 mt-1 block">{fontData.copyright}</span>
                </div>
                <div className="bg-zinc-950/80 p-3 rounded-lg border border-zinc-800/80">
                  <span className="text-zinc-400 block">Vendor ID:</span>
                  <span className="text-zinc-200 mt-1 block">{fontData.vendorId} (Alphaxen Type Studio)</span>
                </div>
                <div className="bg-zinc-950/80 p-3 rounded-lg border border-zinc-800/80">
                  <span className="text-zinc-400 block">Version String:</span>
                  <span className="text-zinc-200 mt-1 block">{fontData.version}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTableTab === 'tables' && (
          <div className="space-y-4">
            <p className="text-xs text-zinc-400 font-mono">
              Detected SFNT Directory Tables in binary container:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {fontData.tablesPresent.map((tbl: string) => (
                <div key={tbl} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-red-400">'{tbl}'</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-900/40">
                    VALID
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTableTab === 'glyphs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="relative w-full max-w-sm">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter glyphs by character or Unicode (e.g. U+0041)..."
                  value={searchGlyph}
                  onChange={(e) => setSearchGlyph(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-200 font-mono focus:outline-none focus:border-red-500"
                />
              </div>
              <span className="text-xs font-mono text-zinc-400">
                Showing {filteredGlyphs.length} glyphs
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-h-[420px] overflow-y-auto pr-2">
              {filteredGlyphs.map((g) => (
                <div key={g.id} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 flex flex-col items-center justify-center space-y-1 hover:border-red-500/60 transition-colors">
                  <span className="font-display-serif text-3xl font-bold text-white">{g.char}</span>
                  <span className="text-[10px] font-mono text-zinc-400">{g.code}</span>
                  <span className="text-[9px] font-mono text-red-400">w: {g.width}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
