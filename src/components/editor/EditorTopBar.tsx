import React, { useState } from 'react';
import { 
  Undo2, 
  Redo2, 
  Eye, 
  Download, 
  Save, 
  ArrowLeft, 
  Sparkles,
  Info,
  Sliders,
  History,
  FolderKanban,
  FileCode,
  Layers,
  ChevronDown
} from 'lucide-react';
import { FontProject } from '../../types/fontLab';

interface EditorTopBarProps {
  project: FontProject;
  onUpdateProjectName?: (name: string) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onOpenPreview: () => void;
  onOpenExport: () => void;
  onOpenInfo: () => void;
  onOpenWeights: () => void;
  onOpenKerning: () => void;
  onOpenTemplates?: () => void;
  onOpenTextureStudio?: () => void;
  onSave?: () => void;
  onSaveProject?: () => void;
  onDuplicate?: () => void;
  onBackToHome?: () => void;
  onBackToFoundry?: () => void;
  saveStatus?: string;
}

export const EditorTopBar: React.FC<EditorTopBarProps> = ({
  project,
  onUpdateProjectName,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onOpenPreview,
  onOpenExport,
  onOpenInfo,
  onOpenWeights,
  onOpenKerning,
  onOpenTemplates,
  onOpenTextureStudio,
  onSave,
  onSaveProject,
  onDuplicate,
  onBackToHome,
  onBackToFoundry,
  saveStatus = 'Saved'
}) => {
  const handleSave = onSave || onSaveProject;
  const handleBack = onBackToFoundry || onBackToHome;
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menus = [
    {
      id: 'project',
      label: 'Project',
      items: [
        { label: 'New Project Blueprint...', action: onOpenTemplates },
        { label: 'Font Project Info & Metadata...', action: onOpenInfo },
        { label: 'Manage Font Weights...', action: onOpenWeights },
        { label: 'Save Project', action: handleSave },
        { label: 'Export OTF / TTF / Webfonts...', action: onOpenExport }
      ]
    },
    {
      id: 'glyphs',
      label: 'Glyphs',
      items: [
        { label: 'Add New Glyph Char...', action: () => {} },
        { label: 'Generate Accents & Composites', action: () => {} },
        { label: 'Auto Spacing Metrics', action: () => {} }
      ]
    },
    {
      id: 'view',
      label: 'View',
      items: [
        { label: 'Toggle Canvas Grid', action: () => {} },
        { label: 'Toggle Metric Guides', action: () => {} },
        { label: 'Reset Pan & Zoom (100%)', action: () => {} }
      ]
    },
    {
      id: 'effects',
      label: 'Effects',
      items: [
        { label: 'Texture & Material Shader Lab...', action: onOpenTextureStudio },
        { label: 'Deformation & Warp Filter', action: () => {} },
        { label: '3D Extrude & Lighting', action: () => {} }
      ]
    },
    {
      id: 'opentype',
      label: 'OpenType',
      items: [
        { label: 'Kerning Pair Editor...', action: onOpenKerning },
        { label: 'Standard Ligatures (fi, fl, ffi)...', action: () => {} },
        { label: 'Stylistic Sets & Alternates...', action: () => {} }
      ]
    }
  ];

  return (
    <header className="h-13 bg-[#080a0f] border-b border-zinc-800/80 px-3 sm:px-4 flex items-center justify-between select-none z-30 shrink-0">
      
      {/* LEFT: BRAND & MENU ITEMS */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Back to Home / Foundry */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-pointer group"
          title="Return to Foundry Home"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <div className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="Alphaxen Logo" 
              className="h-7 w-auto max-w-[120px] object-contain shrink-0" 
              onError={(e) => {
                // Fallback to SVG if not loaded
                const target = e.currentTarget;
                target.style.display = 'none';
              }} 
            />
            <span className="font-mono text-xs font-bold tracking-tight text-white hidden md:inline">
              Alphaxen-<span className="text-red-500 font-bold">FontLab</span>
            </span>
          </div>
        </button>

        <span className="text-zinc-800 hidden sm:inline">|</span>

        {/* TOP LEVEL MENUS */}
        <nav className="hidden lg:flex items-center space-x-1 relative">
          {menus.map((menu) => (
            <div key={menu.id} className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === menu.id ? null : menu.id)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer flex items-center gap-1 ${
                  activeMenu === menu.id ? 'bg-[#151928] text-white' : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#10131e]'
                }`}
              >
                <span>{menu.label}</span>
                <ChevronDown className="w-3 h-3 text-zinc-600" />
              </button>

              {/* Dropdown Menu */}
              {activeMenu === menu.id && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setActiveMenu(null)} />
                  <div className="absolute top-full left-0 mt-1 w-56 bg-[#0c0e16] border border-zinc-800 rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                    {menu.items.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          item.action?.();
                          setActiveMenu(null);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-zinc-300 hover:text-white hover:bg-red-950/40 hover:border-red-800/40 transition-colors cursor-pointer flex items-center justify-between"
                      >
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* CENTER: PROJECT NAME */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={project.name}
          onChange={(e) => onUpdateProjectName?.(e.target.value)}
          className="bg-transparent text-xs sm:text-sm font-bold text-zinc-100 hover:text-white border-b border-transparent hover:border-zinc-700 focus:border-red-500 focus:outline-none px-1.5 py-0.5 max-w-[140px] sm:max-w-xs font-mono text-center"
          title="Click to rename typeface project"
        />
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-1.5 py-0.5 rounded hidden sm:inline">
          {saveStatus}
        </span>
      </div>

      {/* RIGHT: QUICK ACTIONS (Save, Export, History, Preview, Templates) */}
      <div className="flex items-center space-x-1.5 sm:space-x-2">
        {/* Undo / Redo */}
        <div className="flex items-center bg-[#10131e] rounded-lg border border-zinc-800/80 p-0.5">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              canUndo ? 'text-zinc-300 hover:text-white hover:bg-zinc-800' : 'text-zinc-600 cursor-not-allowed'
            }`}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              canRedo ? 'text-zinc-300 hover:text-white hover:bg-zinc-800' : 'text-zinc-600 cursor-not-allowed'
            }`}
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Templates */}
        {onOpenTemplates && (
          <button
            onClick={onOpenTemplates}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#10131e] border border-zinc-800/80 text-zinc-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
            title="Project Templates & Architectures"
          >
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>Templates</span>
          </button>
        )}

        {/* Preview */}
        <button
          onClick={onOpenPreview}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#10131e] border border-zinc-800/80 text-zinc-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
          title="Live Type Specimen & Waterfalls"
        >
          <Eye className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden sm:inline">Preview</span>
        </button>

        {/* Save */}
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#10131e] border border-zinc-800/80 text-zinc-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
          title="Save to Browser Storage"
        >
          <Save className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden sm:inline">Save</span>
        </button>

        {/* Export Action (Primary Red) */}
        <button
          onClick={onOpenExport}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-all cursor-pointer"
          title="Export OTF / TTF / WOFF / SVG"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>
      </div>

    </header>
  );
};
