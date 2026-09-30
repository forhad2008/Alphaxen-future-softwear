import React, { useState } from 'react';
import { X, Layers, Plus, Check } from 'lucide-react';
import { FontWeightPreset } from '../../types/fontLab';

interface WeightsModalProps {
  weights: FontWeightPreset[];
  activeWeight: string;
  onSelectWeight: (weight: string) => void;
  onAddWeight?: (newWeight: FontWeightPreset) => void;
  onAddCustomWeight?: (name: string, weightClass: number) => void;
  onClose: () => void;
}

export const WeightsModal: React.FC<WeightsModalProps> = ({
  weights,
  activeWeight,
  onSelectWeight,
  onAddWeight,
  onAddCustomWeight,
  onClose
}) => {
  const [customName, setCustomName] = useState<string>('Display Black');
  const [customWeightClass, setCustomWeightClass] = useState<number>(850);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName) return;
    if (onAddWeight) {
      onAddWeight({ name: customName, weightClass: customWeightClass });
    } else if (onAddCustomWeight) {
      onAddCustomWeight(customName, customWeightClass);
    }
    setCustomName('');
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
            <Layers className="w-5 h-5 text-[#E50914] shrink-0" />
            <div>
              <h2 className="font-mono text-sm font-bold text-white tracking-wider">
                FONT FAMILY WEIGHT & STYLE MANAGER
              </h2>
              <p className="text-[11px] font-mono text-zinc-500">
                Switch between master styles or generate custom intermediate weights
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
          {/* Weight Cards Matrix */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider font-semibold block">
              Configured Family Weights ({weights.length})
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {weights.map((w) => {
                const isActive = activeWeight === w.name;
                return (
                  <div
                    key={w.name}
                    onClick={() => onSelectWeight(w.name)}
                    className={`p-3 rounded border transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-[#181818] border-[#E50914] text-white shadow-[0_0_12px_rgba(229,9,20,0.25)]'
                        : 'bg-[#101010] border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="font-bold font-mono text-xs">{w.name}</div>
                      <div className="text-[10px] font-mono text-zinc-500">
                        usWeightClass: {w.weightClass}
                      </div>
                    </div>
                    {isActive ? (
                      <span className="text-[10px] font-mono bg-red-950/60 text-[#E50914] px-2 py-0.5 rounded border border-red-900/40 font-bold">
                        ACTIVE
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-zinc-600">Switch</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add custom weight cut */}
          <form onSubmit={handleAdd} className="p-4 rounded bg-[#101010] border border-zinc-800 space-y-3 font-mono">
            <label className="text-[10px] uppercase text-zinc-400 tracking-wider font-semibold block">
              Create Custom Weight Instance
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-zinc-500 block mb-1">Style Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ultra Heavy"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-500 block mb-1">
                  Weight Value: {customWeightClass}
                </label>
                <input
                  type="range"
                  min="100"
                  max="900"
                  step="50"
                  value={customWeightClass}
                  onChange={(e) => setCustomWeightClass(Number(e.target.value))}
                  className="w-full accent-[#E50914] h-1.5 bg-zinc-800 mt-2 cursor-pointer"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#E50914]" />
              <span>Add Custom Weight to Project</span>
            </button>
          </form>
        </div>

        {/* FOOTER */}
        <div className="p-4 bg-[#0E0E0E] border-t border-zinc-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded bg-[#E50914] hover:bg-[#FF1A1A] text-white font-mono font-bold"
          >
            Apply & Close
          </button>
        </div>

      </div>
    </div>
  );
};
