import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Trash2, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  Sliders, 
  Check,
  FileCode,
  Sparkles
} from 'lucide-react';
import { ReferenceImage } from '../../types/fontLab';

interface ReferenceModalProps {
  references: ReferenceImage[];
  onAddReference?: (ref: ReferenceImage) => void;
  onUpdateReference?: (ref: ReferenceImage) => void;
  onUpdateReferences?: (refs: ReferenceImage[]) => void;
  onRemoveReference?: (id: string) => void;
  onClose: () => void;
}

export const ReferenceModal: React.FC<ReferenceModalProps> = ({
  references,
  onAddReference,
  onUpdateReference,
  onUpdateReferences,
  onRemoveReference,
  onClose
}) => {
  const [refName, setRefName] = useState<string>('Handwritten Sketch 01');

  const handleAddRef = (newRef: ReferenceImage) => {
    if (onAddReference) onAddReference(newRef);
    else if (onUpdateReferences) onUpdateReferences([...references, newRef]);
  };

  const handleUpdateRef = (ref: ReferenceImage) => {
    if (onUpdateReference) onUpdateReference(ref);
    else if (onUpdateReferences) onUpdateReferences(references.map(r => r.id === ref.id ? ref : r));
  };

  const handleRemoveRef = (id: string) => {
    if (onRemoveReference) onRemoveReference(id);
    else if (onUpdateReferences) onUpdateReferences(references.filter(r => r.id !== id));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const newRef: ReferenceImage = {
        id: `ref-${Date.now()}`,
        name: refName || file.name,
        url: dataUrl,
        x: 100,
        y: 100,
        scale: 0.8,
        opacity: 0.35,
        locked: false,
        visible: true
      };
      handleAddRef(newRef);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none text-xs">
      <div className="relative w-full max-w-xl bg-[#0B0B0B] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* HEADER */}
        <div className="p-5 bg-[#0E0E0E] border-b border-zinc-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Alphaxen Logo" 
              className="h-7 w-auto max-w-[110px] object-contain shrink-0" 
              onError={(e) => { e.currentTarget.style.display = 'none'; }} 
            />
            <div>
              <h2 className="font-mono text-sm font-bold text-white tracking-wider">
                REFERENCE IMAGE & DRAWING OVERLAYS
              </h2>
              <p className="text-[11px] font-mono text-zinc-500">
                Upload sketches, calligraphy scans, or photography to trace directly on canvas
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
          {/* Upload card */}
          <div className="p-6 border-2 border-dashed border-zinc-800 hover:border-[#E50914] rounded-xl text-center space-y-3 bg-[#0E0E0E] transition-colors cursor-pointer relative">
            <Upload className="w-8 h-8 text-zinc-500 mx-auto" />
            <div>
              <span className="text-zinc-200 font-bold block">
                Click to upload scan, sketch or photograph
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">
                PNG, JPG, WEBP, or SVG reference overlays
              </span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          {/* Active References */}
          <div className="space-y-3 font-mono">
            <label className="text-[10px] uppercase text-zinc-400 tracking-wider font-semibold block">
              Active Reference Overlays ({references.length})
            </label>

            {references.length === 0 ? (
              <p className="text-zinc-600 text-center py-4">No reference images active.</p>
            ) : (
              references.map((ref) => (
                <div key={ref.id} className="p-3.5 rounded bg-[#101010] border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{ref.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateRef({ ...ref, visible: !ref.visible })}
                        className="p-1 text-zinc-400 hover:text-white"
                        title={ref.visible ? 'Hide Overlay' : 'Show Overlay'}
                      >
                        {ref.visible ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => handleUpdateRef({ ...ref, locked: !ref.locked })}
                        className="p-1 text-zinc-400 hover:text-white"
                        title={ref.locked ? 'Unlock Position' : 'Lock Position'}
                      >
                        {ref.locked ? <Lock className="w-4 h-4 text-[#E50914]" /> : <Unlock className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => handleRemoveRef(ref.id)}
                        className="p-1 text-zinc-600 hover:text-red-400"
                        title="Delete Overlay"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-[10px] text-zinc-400">
                    <div>
                      <span>Opacity: {Math.round(ref.opacity * 100)}%</span>
                      <input
                        type="range"
                        min="0.05"
                        max="1"
                        step="0.05"
                        value={ref.opacity}
                        onChange={(e) => handleUpdateRef({ ...ref, opacity: Number(e.target.value) })}
                        className="w-full accent-[#E50914] h-1 bg-zinc-800"
                      />
                    </div>
                    <div>
                      <span>Scale: {Math.round(ref.scale * 100)}%</span>
                      <input
                        type="range"
                        min="0.2"
                        max="2"
                        step="0.05"
                        value={ref.scale}
                        onChange={(e) => handleUpdateRef({ ...ref, scale: Number(e.target.value) })}
                        className="w-full accent-[#E50914] h-1 bg-zinc-800"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-4 bg-[#0E0E0E] border-t border-zinc-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-mono font-bold"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
