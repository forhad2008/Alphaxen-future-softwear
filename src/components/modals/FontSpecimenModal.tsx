import React, { useState } from 'react';
import { X, Download, Sliders, Check, Copy, ShoppingBag, Eye, Shield } from 'lucide-react';
import { FontItem, LicensingOption } from '../../types/fontLab';
import confetti from 'canvas-confetti';

interface FontSpecimenModalProps {
  font: FontItem | null;
  onClose: () => void;
  onAddToCart: (font: FontItem, licenseId: string) => void;
}

export const FontSpecimenModal: React.FC<FontSpecimenModalProps> = ({
  font,
  onClose,
  onAddToCart
}) => {
  if (!font) return null;

  const [fontSize, setFontSize] = useState<number>(48);
  const [letterSpacing, setLetterSpacing] = useState<number>(0);
  const [selectedWeight, setSelectedWeight] = useState<string>(font.weights[0]);
  const [selectedLicense, setSelectedLicense] = useState<'desktop' | 'web' | 'app' | 'enterprise'>('desktop');
  const [customText, setCustomText] = useState<string>(font.sampleText || 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG');
  const [activeTab, setActiveTab] = useState<'preview' | 'glyphs' | 'license'>('preview');

  const licenses = [
    { id: 'desktop', title: 'Desktop / Print', multiplier: 1, desc: '1-5 Workstations, unlimited print runs & logos' },
    { id: 'web', title: 'Webfont License', multiplier: 1.5, desc: 'Up to 500,000 monthly pageviews, WOFF/WOFF2' },
    { id: 'app', title: 'Mobile / App / Game', multiplier: 2.5, desc: '1 Commercial app or game title, unlimited users' },
    { id: 'enterprise', title: 'Enterprise Global', multiplier: 6.0, desc: 'Worldwide broadcast, unlimited seats, unencumbered rights' }
  ];

  const currentMultiplier = licenses.find((l) => l.id === selectedLicense)?.multiplier || 1;
  const computedPrice = Math.round(font.price * currentMultiplier);

  const handleDownloadSample = () => {
    // Generate sample text file or trigger mock download
    const blob = new Blob([`Alphaxen-FontLab Specimen: ${font.name}\n${font.description}\n\nSample text: ${customText}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${font.id}-specimen-sheet.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getFontFamilyClass = (id: string) => {
    switch (id) {
      case 'imperial-eagle': return 'font-cinzel';
      case 'bloody-dragon': return 'font-gothic';
      case 'arctic-bear': return 'font-syne';
      case 'better-jellyfish': return 'font-display-serif italic';
      default: return 'font-display-serif';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0a0a0f] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* HEADER */}
        <div className="p-6 bg-[#0e0e14] border-b border-zinc-800 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase bg-red-950/60 text-red-400 px-2 py-0.5 rounded border border-red-800/40">
                {font.classification}
              </span>
              <span className="text-xs font-mono text-zinc-400">{font.formats.join(' • ')}</span>
            </div>
            <h2 className="font-display-serif text-2xl sm:text-3xl font-bold text-white">
              {font.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TABS */}
        <div className="flex border-b border-zinc-800 px-6 bg-[#0a0a0f] space-x-6 text-xs font-mono">
          <button
            onClick={() => setActiveTab('preview')}
            className={`py-3 transition-colors border-b-2 cursor-pointer ${
              activeTab === 'preview' ? 'border-red-600 text-white font-bold' : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Specimen Type Tester
          </button>
          <button
            onClick={() => setActiveTab('glyphs')}
            className={`py-3 transition-colors border-b-2 cursor-pointer ${
              activeTab === 'glyphs' ? 'border-red-600 text-white font-bold' : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Glyphs Map ({font.glyphsCount})
          </button>
          <button
            onClick={() => setActiveTab('license')}
            className={`py-3 transition-colors border-b-2 cursor-pointer ${
              activeTab === 'license' ? 'border-red-600 text-white font-bold' : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Commercial Licensing & Cart
          </button>
        </div>

        {/* BODY CONTENT */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'preview' && (
            <div className="space-y-6">
              {/* Type controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                <div>
                  <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                    <span>Point Size</span>
                    <span className="text-white">{fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="96"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full accent-red-600 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                    <span>Tracking</span>
                    <span className="text-white">{letterSpacing}px</span>
                  </div>
                  <input
                    type="range"
                    min="-2"
                    max="10"
                    step="0.5"
                    value={letterSpacing}
                    onChange={(e) => setLetterSpacing(Number(e.target.value))}
                    className="w-full accent-red-600 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <span className="text-xs font-mono text-zinc-400 block mb-1">Weight Cut</span>
                  <select
                    value={selectedWeight}
                    onChange={(e) => setSelectedWeight(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1 text-xs text-zinc-200 font-mono focus:outline-none focus:border-red-500"
                  >
                    {font.weights.map((w) => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Editable Pangram Area */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-semibold block">
                  Interactive Specimen Area (Click to edit text)
                </label>
                <div className="p-8 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 min-h-[220px] flex items-center justify-center text-center">
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => setCustomText(e.currentTarget.textContent || font.sampleText || 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG')}
                    className={`w-full outline-none text-white break-words ${getFontFamilyClass(font.id)}`}
                    style={{
                      fontSize: `${fontSize}px`,
                      letterSpacing: `${letterSpacing}px`,
                      lineHeight: 1.2
                    }}
                  >
                    {customText}
                  </p>
                </div>
              </div>

              {/* Pangram presets */}
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="text-zinc-500 py-1">Quick Pangrams:</span>
                {[
                  'VICTORIA EX TENEBRIS IMPERIALIS',
                  'The quick brown fox jumps over the lazy dog',
                  'Sphinx of black quartz, judge my vow',
                  '1234567890 & % $ # @ ! ?'
                ].map((pangram, i) => (
                  <button
                    key={i}
                    onClick={() => setCustomText(pangram)}
                    className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  >
                    Preset {i + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'glyphs' && (
            <div className="space-y-4">
              <p className="text-xs font-mono text-zinc-400">
                Full Latin Extended Character Set (Capitals, Numerals, Standard & Discretionary Ligatures):
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-10 gap-2.5 max-h-[360px] overflow-y-auto pr-2">
                {Array.from({ length: 80 }).map((_, i) => {
                  const charCode = 65 + (i % 26);
                  const char = String.fromCharCode(charCode);
                  return (
                    <div
                      key={i}
                      className="h-14 rounded-xl bg-zinc-950 border border-zinc-800/80 flex flex-col items-center justify-center hover:border-red-500/60 transition-colors"
                    >
                      <span className={`text-xl font-bold text-white ${getFontFamilyClass(font.id)}`}>
                        {char}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-500">
                        {`U+${charCode.toString(16).toUpperCase().padStart(4, '0')}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'license' && (
            <div className="space-y-6">
              <div>
                <label className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-semibold block mb-3">
                  Select License Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {licenses.map((lic) => {
                    const isSelected = selectedLicense === lic.id;
                    const tierPrice = Math.round(font.price * lic.multiplier);
                    return (
                      <div
                        key={lic.id}
                        onClick={() => setSelectedLicense(lic.id as any)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-red-950/30 border-red-600 text-white'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-sm">{lic.title}</span>
                            <span className="font-mono text-sm font-bold text-red-400">${tierPrice}</span>
                          </div>
                          <p className="text-xs text-zinc-400 font-light">{lic.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/20 to-zinc-900 border border-red-900/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-zinc-400 block">TOTAL LICENSING FEE:</span>
                  <span className="text-2xl font-bold font-mono text-white">${computedPrice} USD</span>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(font, selectedLicense);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.4)] cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add License to Cart</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER ACTIONS */}
        <div className="p-5 bg-[#0e0e14] border-t border-zinc-800 flex items-center justify-between">
          <button
            onClick={handleDownloadSample}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-300 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Specimen Sheet (.txt)</span>
          </button>

          <button
            onClick={() => {
              onAddToCart(font, selectedLicense);
              onClose();
            }}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.4)] cursor-pointer"
          >
            <span>Buy {font.name} — ${computedPrice}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
