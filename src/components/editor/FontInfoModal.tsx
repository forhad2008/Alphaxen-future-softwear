import React, { useState } from 'react';
import { X, Info, Check, ShieldCheck, Building2, Globe } from 'lucide-react';
import { FontInfo } from '../../types/fontLab';

interface FontInfoModalProps {
  info: FontInfo;
  onUpdateInfo: (updated: FontInfo) => void;
  onClose: () => void;
}

export const FontInfoModal: React.FC<FontInfoModalProps> = ({
  info,
  onUpdateInfo,
  onClose
}) => {
  const [formData, setFormData] = useState<FontInfo>(info);
  const [saved, setSaved] = useState<boolean>(false);

  const handleChange = (field: keyof FontInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateInfo(formData);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
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
            <Info className="w-5 h-5 text-[#E50914] shrink-0" />
            <div>
              <h2 className="font-mono text-sm font-bold text-white tracking-wider">
                OPENTYPE 'NAME' TABLE & COPYRIGHT
              </h2>
              <p className="text-[11px] font-mono text-zinc-500">
                Foundry attribution, postscript identification, and licensing
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

        {/* FORM */}
        <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider font-semibold block mb-1">
                Family Name
              </label>
              <input
                type="text"
                required
                value={formData.familyName}
                onChange={(e) => handleChange('familyName', e.target.value)}
                className="w-full bg-[#121212] border border-zinc-800 rounded px-3 py-2 text-zinc-200 font-mono focus:outline-none focus:border-[#E50914]"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider font-semibold block mb-1">
                Style Name / Subfamily
              </label>
              <input
                type="text"
                required
                value={formData.styleName}
                onChange={(e) => handleChange('styleName', e.target.value)}
                className="w-full bg-[#121212] border border-zinc-800 rounded px-3 py-2 text-zinc-200 font-mono focus:outline-none focus:border-[#E50914]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider font-semibold block mb-1">
                PostScript Name (No Spaces)
              </label>
              <input
                type="text"
                required
                value={formData.postScriptName}
                onChange={(e) => handleChange('postScriptName', e.target.value)}
                className="w-full bg-[#121212] border border-zinc-800 rounded px-3 py-2 text-zinc-200 font-mono focus:outline-none focus:border-[#E50914]"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider font-semibold block mb-1">
                Version String
              </label>
              <input
                type="text"
                required
                value={formData.version}
                onChange={(e) => handleChange('version', e.target.value)}
                className="w-full bg-[#121212] border border-zinc-800 rounded px-3 py-2 text-zinc-200 font-mono focus:outline-none focus:border-[#E50914]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider font-semibold block mb-1">
                Designer / Typographer
              </label>
              <input
                type="text"
                value={formData.designer}
                onChange={(e) => handleChange('designer', e.target.value)}
                className="w-full bg-[#121212] border border-zinc-800 rounded px-3 py-2 text-zinc-200 font-mono focus:outline-none focus:border-[#E50914]"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider font-semibold block mb-1">
                Default Foundry
              </label>
              <input
                type="text"
                value={formData.foundry}
                onChange={(e) => handleChange('foundry', e.target.value)}
                className="w-full bg-[#121212] border border-zinc-800 rounded px-3 py-2 text-zinc-200 font-mono focus:outline-none focus:border-[#E50914]"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider font-semibold block mb-1">
              Copyright Notice
            </label>
            <input
              type="text"
              value={formData.copyright}
              onChange={(e) => handleChange('copyright', e.target.value)}
              className="w-full bg-[#121212] border border-zinc-800 rounded px-3 py-2 text-zinc-200 font-mono focus:outline-none focus:border-[#E50914]"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider font-semibold block mb-1">
              Typeface Description / Historical Notes
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full bg-[#121212] border border-zinc-800 rounded px-3 py-2 text-zinc-200 font-mono focus:outline-none focus:border-[#E50914]"
            />
          </div>

          {/* FOOTER ACTIONS */}
          <div className="pt-4 border-t border-zinc-900 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded bg-[#E50914] hover:bg-[#FF1A1A] text-white font-mono font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(229,9,20,0.4)]"
            >
              {saved ? <Check className="w-3.5 h-3.5 text-white" /> : null}
              <span>{saved ? 'Saved!' : 'Save Font Information'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
