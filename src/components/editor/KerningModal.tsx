import React, { useState } from 'react';
import { X, Sliders, Plus, Trash2, Check, Sparkles } from 'lucide-react';
import { KerningPair } from '../../types/fontLab';

interface KerningModalProps {
  kerningPairs: KerningPair[];
  onUpdateKerning: (pairs: KerningPair[]) => void;
  onClose: () => void;
}

export const KerningModal: React.FC<KerningModalProps> = ({
  kerningPairs,
  onUpdateKerning,
  onClose
}) => {
  const [pairs, setPairs] = useState<KerningPair[]>(kerningPairs);
  const [newLeft, setNewLeft] = useState<string>('V');
  const [newRight, setNewRight] = useState<string>('A');
  const [newValue, setNewValue] = useState<number>(-70);

  const handleSliderChange = (id: string, val: number) => {
    const updated = pairs.map((p) => (p.id === id ? { ...p, value: val } : p));
    setPairs(updated);
    onUpdateKerning(updated);
  };

  const handleDeletePair = (id: string) => {
    const updated = pairs.filter((p) => p.id !== id);
    setPairs(updated);
    onUpdateKerning(updated);
  };

  const handleAddPair = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeft || !newRight) return;
    const newP: KerningPair = {
      id: `k-${Date.now()}`,
      left: newLeft.slice(0, 1),
      right: newRight.slice(0, 1),
      value: newValue
    };
    const updated = [...pairs, newP];
    setPairs(updated);
    onUpdateKerning(updated);
    setNewLeft('');
    setNewRight('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none text-xs">
      <div className="relative w-full max-w-2xl bg-[#0B0B0B] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* HEADER */}
        <div className="p-5 bg-[#0E0E0E] border-b border-zinc-900 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img 
              src="/logo.png" 
              alt="Alphaxen Logo" 
              className="h-7 w-auto max-w-[110px] object-contain shrink-0" 
              onError={(e) => { e.currentTarget.style.display = 'none'; }} 
            />
            <Sliders className="w-5 h-5 text-[#E50914] shrink-0" />
            <div>
              <h2 className="font-mono text-sm font-bold text-white tracking-wider">
                OPENTYPE GPOS KERNING MATRIX
              </h2>
              <p className="text-[11px] font-mono text-zinc-500">
                Calibrate optical spacing between critical glyph pairs
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

        {/* CONTENT */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
          {/* Add new pair form */}
          <form onSubmit={handleAddPair} className="p-3.5 rounded bg-[#101010] border border-zinc-800 flex items-end gap-3 font-mono">
            <div>
              <label className="text-[10px] text-zinc-500 block mb-1">Left Glyph</label>
              <input
                type="text"
                maxLength={1}
                value={newLeft}
                onChange={(e) => setNewLeft(e.target.value.toUpperCase())}
                placeholder="A"
                className="w-16 bg-zinc-950 border border-zinc-800 rounded p-1.5 text-center text-white font-bold"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-500 block mb-1">Right Glyph</label>
              <input
                type="text"
                maxLength={1}
                value={newRight}
                onChange={(e) => setNewRight(e.target.value)}
                placeholder="V"
                className="w-16 bg-zinc-950 border border-zinc-800 rounded p-1.5 text-center text-white font-bold"
              />
            </div>
            <div className="flex-1">
              <label className="text-[10px] text-zinc-500 block mb-1">Kerning Value: {newValue}u</label>
              <input
                type="range"
                min="-200"
                max="200"
                step="5"
                value={newValue}
                onChange={(e) => setNewValue(Number(e.target.value))}
                className="w-full accent-[#E50914] h-1.5 bg-zinc-800 cursor-pointer"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-[#E50914] hover:bg-[#FF1A1A] text-white font-bold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Pair</span>
            </button>
          </form>

          {/* Kerning list with live preview */}
          <div className="space-y-3 font-mono">
            <label className="text-[10px] uppercase text-zinc-400 tracking-wider font-semibold block">
              Active Kerning Pairs ({pairs.length})
            </label>

            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {pairs.map((pair) => (
                <div
                  key={pair.id}
                  className="p-3 rounded bg-[#121212] border border-zinc-800 flex items-center justify-between gap-4"
                >
                  {/* Visual preview */}
                  <div className="w-28 h-12 bg-zinc-950 rounded border border-zinc-900 flex items-center justify-center font-display-serif text-2xl font-bold text-white overflow-hidden">
                    <span style={{ letterSpacing: `${pair.value / 25}px` }}>
                      {pair.left}{pair.right}
                    </span>
                  </div>

                  {/* Pair labels */}
                  <div className="w-16">
                    <span className="font-bold text-zinc-200 text-sm">
                      {pair.left} — {pair.right}
                    </span>
                  </div>

                  {/* Slider */}
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-[10px] text-zinc-400">
                      <span>Value:</span>
                      <span className="text-[#E50914] font-bold">{pair.value} units</span>
                    </div>
                    <input
                      type="range"
                      min="-200"
                      max="200"
                      step="5"
                      value={pair.value}
                      onChange={(e) => handleSliderChange(pair.id, Number(e.target.value))}
                      className="w-full accent-[#E50914] h-1.5 bg-zinc-800 cursor-pointer"
                    />
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => handleDeletePair(pair.id)}
                    className="p-1 text-zinc-600 hover:text-red-400 transition-colors"
                    title="Remove Pair"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-4 bg-[#0E0E0E] border-t border-zinc-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-mono font-bold"
          >
            Close Matrix
          </button>
        </div>

      </div>
    </div>
  );
};
