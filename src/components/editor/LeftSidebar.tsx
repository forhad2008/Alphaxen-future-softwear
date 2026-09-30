import React from 'react';
import {
  MousePointer,
  CircleDot,
  PenTool,
  Shapes,
  Type,
  Ruler,
  Move,
  Sparkles,
  Split,
  Minus,
  Layers,
  Paintbrush,
  Palette,
  Sun,
  Box,
  Crown,
  Grid,
  Puzzle,
  Anchor,
  Compass,
  Grid as GridIcon,
  Square
} from 'lucide-react';
import { EditorTool } from '../../types/fontLab';

interface LeftSidebarProps {
  activeTool: EditorTool;
  setActiveTool?: (tool: EditorTool) => void;
  onSelectTool?: (tool: EditorTool) => void;
  showGrid: boolean;
  setShowGrid?: React.Dispatch<React.SetStateAction<boolean>>;
  onToggleGrid?: () => void;
  showGuides: boolean;
  setShowGuides?: React.Dispatch<React.SetStateAction<boolean>>;
  onToggleGuides?: () => void;
  snapToGrid: boolean;
  setSnapToGrid?: React.Dispatch<React.SetStateAction<boolean>>;
  onToggleSnap?: () => void;
  showRulers?: boolean;
  setShowRulers?: React.Dispatch<React.SetStateAction<boolean>>;
  activeProjectTab?: string;
  setActiveProjectTab?: (tab: any) => void;
  activeSection?: string;
  onSelectSection?: (sec: string) => void;
  onUploadReference?: () => void;
  onOpenReferences?: () => void;
  onImportSvg?: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  activeTool,
  setActiveTool,
  onSelectTool,
  showGrid,
  setShowGrid,
  onToggleGrid,
  showGuides,
  setShowGuides,
  onToggleGuides,
  snapToGrid,
  setSnapToGrid,
  onToggleSnap,
  showRulers,
  setShowRulers,
  activeProjectTab,
  setActiveProjectTab,
  activeSection,
  onSelectSection,
  onUploadReference,
  onOpenReferences,
  onImportSvg
}) => {
  const handleSelectTool = onSelectTool || setActiveTool || (() => {});
  const handleToggleGrid = onToggleGrid || (() => setShowGrid?.(prev => !prev));
  const handleToggleGuides = onToggleGuides || (() => setShowGuides?.(prev => !prev));
  const handleToggleSnap = onToggleSnap || (() => setSnapToGrid?.(prev => !prev));

  // Tool groupings matching the exact blueprint
  const toolGroups = [
    {
      name: 'CONSTRUCTION',
      tools: [
        { id: 'select', label: 'Select', shortcut: 'V', icon: <MousePointer className="w-4 h-4" /> },
        { id: 'node', label: 'Node', shortcut: 'A', icon: <CircleDot className="w-4 h-4" /> },
        { id: 'pen', label: 'Pen', shortcut: 'P', icon: <PenTool className="w-4 h-4" /> },
        { id: 'shape', label: 'Shape', shortcut: 'U', icon: <Shapes className="w-4 h-4" /> },
        { id: 'text', label: 'Text', shortcut: 'T', icon: <Type className="w-4 h-4" /> },
        { id: 'measure', label: 'Measure', shortcut: 'M', icon: <Ruler className="w-4 h-4" /> }
      ]
    },
    {
      name: 'TRANSFORMATION',
      tools: [
        { id: 'transform', label: 'Transform', shortcut: 'T', icon: <Move className="w-4 h-4" /> },
        { id: 'warp', label: 'Warp', shortcut: 'W', icon: <Sparkles className="w-4 h-4" /> },
        { id: 'symmetry', label: 'Symmetry', shortcut: 'Y', icon: <Split className="w-4 h-4" /> }
      ]
    },
    {
      name: 'APPEARANCE & TEXTURE',
      tools: [
        { id: 'texture-brush', label: 'Texture Brush', shortcut: 'B', icon: <Paintbrush className="w-4 h-4 text-red-400" /> },
        { id: 'material', label: 'Material', shortcut: 'M', icon: <Palette className="w-4 h-4" /> },
        { id: 'stroke', label: 'Stroke', shortcut: 'S', icon: <Minus className="w-4 h-4" /> },
        { id: 'outline', label: 'Outline', shortcut: 'O', icon: <Layers className="w-4 h-4" /> },
        { id: 'light', label: 'Light', shortcut: 'L', icon: <Sun className="w-4 h-4" /> }
      ]
    },
    {
      name: '3D & PROCEDURAL',
      tools: [
        { id: '3d', label: '3D', shortcut: 'D', icon: <Box className="w-4 h-4" /> },
        { id: 'ornament', label: 'Ornament', shortcut: 'G', icon: <Crown className="w-4 h-4" /> },
        { id: 'pattern', label: 'Pattern', shortcut: 'R', icon: <Grid className="w-4 h-4" /> }
      ]
    },
    {
      name: 'ARCHITECTURE',
      tools: [
        { id: 'component', label: 'Component', shortcut: 'C', icon: <Puzzle className="w-4 h-4" /> },
        { id: 'anchor', label: 'Anchor', shortcut: 'K', icon: <Anchor className="w-4 h-4" /> },
        { id: 'guide', label: 'Guide', shortcut: 'G', icon: <Compass className="w-4 h-4" /> }
      ]
    }
  ];

  return (
    <aside className="w-16 md:w-52 bg-[#080a0f] border-r border-zinc-800/80 flex flex-col justify-between select-none z-20 shrink-0">
      
      {/* TOOLBAR HEADING WITH LOGO */}
      <div className="p-2 space-y-3 overflow-y-auto max-h-[calc(100vh-8rem)] no-scrollbar">
        <div className="flex items-center justify-between px-1 pt-1 pb-1 text-[10px] font-mono uppercase text-zinc-500 tracking-wider font-bold border-b border-zinc-900">
          <div className="flex items-center gap-1.5">
            <img 
              src="/logo.png" 
              alt="Alphaxen" 
              className="h-4 w-auto object-contain shrink-0" 
              onError={(e) => { e.currentTarget.style.display = 'none'; }} 
            />
            <span className="hidden md:inline">TOOLS</span>
          </div>
          <span className="hidden md:inline text-zinc-600">KEY</span>
        </div>

        {/* TOOL GROUPS WITH DIVIDERS */}
        {toolGroups.map((group, gIdx) => (
          <div key={group.name} className="space-y-1">
            {gIdx > 0 && <div className="border-t border-zinc-800/80 my-2" />}
            
            <div className="hidden md:block px-2 text-[9px] font-mono uppercase text-zinc-600 tracking-wider">
              {group.name}
            </div>

            {group.tools.map((tool) => {
              const isActive = activeTool === tool.id || (activeTool === 'texture-brush' && tool.id === 'texture');
              return (
                <button
                  key={tool.id}
                  onClick={() => handleSelectTool(tool.id as EditorTool)}
                  title={`${tool.label} (${tool.shortcut})`}
                  className={`w-full flex items-center justify-between p-1.5 md:p-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#151928] text-white border-l-2 border-red-500 font-bold shadow-[0_0_12px_rgba(220,38,38,0.2)]'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#10131e]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-red-400' : 'text-zinc-400'}>
                      {tool.icon}
                    </span>
                    <span className="hidden md:inline truncate text-[11px]">{tool.label}</span>
                  </div>
                  <span className="hidden md:inline text-[9px] font-mono text-zinc-600">
                    {tool.shortcut}
                  </span>
                </button>
              );
            })}
          </div>
        ))}

        {/* CANVAS DISPLAY TOGGLES */}
        <div className="pt-2 border-t border-zinc-800/80 space-y-1">
          <div className="hidden md:block px-2 text-[9px] font-mono uppercase text-zinc-600 tracking-wider mb-1">
            SNAPPING & GRID
          </div>

          <button
            onClick={handleToggleGrid}
            title="Toggle Grid"
            className={`w-full flex items-center justify-between p-1.5 md:p-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              showGrid ? 'text-white bg-[#121520] border border-zinc-700/60' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <GridIcon className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[10px]">Grid</span>
            </div>
            <span className={`hidden md:inline text-[9px] font-mono ${showGrid ? 'text-red-400 font-bold' : 'text-zinc-600'}`}>
              {showGrid ? 'ON' : 'OFF'}
            </span>
          </button>

          <button
            onClick={handleToggleGuides}
            title="Toggle Guides"
            className={`w-full flex items-center justify-between p-1.5 md:p-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              showGuides ? 'text-white bg-[#121520] border border-zinc-700/60' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[10px]">Guides</span>
            </div>
            <span className={`hidden md:inline text-[9px] font-mono ${showGuides ? 'text-red-400 font-bold' : 'text-zinc-600'}`}>
              {showGuides ? 'ON' : 'OFF'}
            </span>
          </button>

          <button
            onClick={handleToggleSnap}
            title="Toggle Snapping"
            className={`w-full flex items-center justify-between p-1.5 md:p-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              snapToGrid ? 'text-white bg-[#121520] border border-zinc-700/60' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Square className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[10px]">Snap 20u</span>
            </div>
            <span className={`hidden md:inline text-[9px] font-mono ${snapToGrid ? 'text-red-400 font-bold' : 'text-zinc-600'}`}>
              {snapToGrid ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>
      </div>

    </aside>
  );
};
