import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  X, 
  Globe, 
  Download, 
  Upload, 
  Sliders, 
  Sparkles, 
  Check, 
  Copy, 
  RotateCw, 
  Layers, 
  Eye, 
  Trash2, 
  Plus, 
  Search, 
  Image as ImageIcon,
  Wand2,
  RefreshCw,
  Maximize2,
  Shield,
  Palette,
  Sun,
  Contrast,
  Droplet,
  Grid,
  FileCode,
  Bookmark,
  Share2
} from 'lucide-react';
import { FontTextureConfig } from '../../types/fontLab';
import { DEFAULT_TEXTURE_CONFIG } from '../../data/texturePresets';

interface CustomWebTextureMakerModalProps {
  textureConfig?: FontTextureConfig;
  activeChar: string;
  onUpdateTextureConfig: (config: FontTextureConfig) => void;
  onClose: () => void;
}

export interface SavedUserTexture {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  createdAt: number;
  config: Partial<FontTextureConfig>;
}

// Curated high-res royalty-free online texture imagery from Unsplash / Wikimedia CDN
const CURATED_WEB_TEXTURES = [
  {
    id: 'web-earth',
    name: 'Satellite Earth Blue Marble',
    category: 'Cosmic & Earth',
    url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=600&q=80',
    tag: 'Planetary Biosphere'
  },
  {
    id: 'web-mars',
    name: 'Mars Red Dunes & Basalt',
    category: 'Cosmic & Earth',
    url: 'https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?auto=format&fit=crop&w=600&q=80',
    tag: 'Martian Terrain'
  },
  {
    id: 'web-galaxy',
    name: 'Deep Nebula & Stellar Dust',
    category: 'Cosmic & Earth',
    url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=600&q=80',
    tag: 'Cosmic Plasma'
  },
  {
    id: 'web-marble',
    name: 'Carrara White Gold Marble',
    category: 'Stone & Mineral',
    url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80',
    tag: 'Polished Calcite'
  },
  {
    id: 'web-granite',
    name: 'Volcanic Basalt Rock',
    category: 'Stone & Mineral',
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    tag: 'Igneous Porous'
  },
  {
    id: 'web-gold',
    name: 'Hammered 24K Gold Foil',
    category: 'Metallic',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    tag: 'Specular Guilding'
  },
  {
    id: 'web-steel',
    name: 'Damascus Folded Carbon Steel',
    category: 'Metallic',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80',
    tag: 'Blade Grain'
  },
  {
    id: 'web-grunge-rust',
    name: 'Industrial Heavy Rust Flakes',
    category: 'Grunge',
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
    tag: 'Corrosion Decay'
  },
  {
    id: 'web-cyberpunk',
    name: 'Cyberpunk Neon Hologram',
    category: 'Futuristic',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    tag: 'PCB Micro-Circuit'
  },
  {
    id: 'web-watermark-guilloche',
    name: 'Banknote Guilloche Geometry',
    category: 'Watermark',
    url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80',
    tag: 'Security Spirograph'
  }
];

export const CustomWebTextureMakerModal: React.FC<CustomWebTextureMakerModalProps> = ({
  textureConfig = DEFAULT_TEXTURE_CONFIG,
  activeChar = 'A',
  onUpdateTextureConfig,
  onClose
}) => {
  // Source Image state
  const [sourceImageUrl, setSourceImageUrl] = useState<string>(
    textureConfig.customImageUrl || CURATED_WEB_TEXTURES[0].url
  );
  const [webSearchQuery, setWebSearchQuery] = useState<string>('');
  const [urlInput, setUrlInput] = useState<string>('');
  const [isLoadingUrl, setIsLoadingUrl] = useState<boolean>(false);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'web' | 'adjust' | 'tiling' | 'watermark' | 'library'>('web');

  // Advanced Image Filters State
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [saturation, setSaturation] = useState<number>(100);
  const [hueRotate, setHueRotate] = useState<number>(0);
  const [invert, setInvert] = useState<number>(0);
  const [grayscale, setGrayscale] = useState<number>(0);
  const [sepia, setSepia] = useState<number>(0);
  const [emboss, setEmboss] = useState<boolean>(false);
  const [edgeDetect, setEdgeDetect] = useState<boolean>(false);
  const [seamlessMirror, setSeamlessMirror] = useState<boolean>(true);

  // Color Tint & Overlay State
  const [enableTint, setEnableTint] = useState<boolean>(false);
  const [tintColor, setTintColor] = useState<string>('#EF4444');
  const [tintOpacity, setTintOpacity] = useState<number>(0.35);

  // Watermark Overlay State
  const [enableWatermark, setEnableWatermark] = useState<boolean>(false);
  const [watermarkText, setWatermarkText] = useState<string>('ALPHAXEN © 2026');
  const [watermarkAngle, setWatermarkAngle] = useState<number>(-35);
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(0.4);
  const [watermarkSize, setWatermarkSize] = useState<number>(14);

  // Pattern Geometry & Tiling State
  const [patternScale, setPatternScale] = useState<number>(textureConfig.scale || 1.2);
  const [patternRotation, setPatternRotation] = useState<number>(textureConfig.rotation || 0);
  const [patternOpacity, setPatternOpacity] = useState<number>(textureConfig.opacity || 0.85);
  const [blendMode, setBlendMode] = useState<string>(textureConfig.blendMode || 'overlay');
  const [roughness, setRoughness] = useState<number>(textureConfig.roughness || 35);
  const [bevelDepth, setBevelDepth] = useState<number>(textureConfig.bevelDepth || 12);
  const [svgFilterType, setSvgFilterType] = useState<string>(textureConfig.svgFilterType || 'none');
  const [applyScope, setApplyScope] = useState<'glyph' | 'font'>('glyph');

  // Processed Output Data URL
  const [processedTextureUrl, setProcessedTextureUrl] = useState<string>(sourceImageUrl);
  const [previewString, setPreviewString] = useState<string>(activeChar);
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);

  // Saved User Custom Textures
  const [savedTextures, setSavedTextures] = useState<SavedUserTexture[]>(() => {
    try {
      const stored = localStorage.getItem('alphaxen_user_textures');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [customTextureName, setCustomTextureName] = useState<string>('My Custom Shader');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Re-process texture on canvas whenever filter parameters change
  const processTextureCanvas = useCallback(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current || document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const baseWidth = seamlessMirror ? 256 : 256;
      const baseHeight = seamlessMirror ? 256 : 256;
      canvas.width = baseWidth;
      canvas.height = baseHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply CSS Filters
      const filterStr = `
        brightness(${brightness}%) 
        contrast(${contrast}%) 
        saturate(${saturation}%) 
        hue-rotate(${hueRotate}deg) 
        invert(${invert}%) 
        grayscale(${grayscale}%) 
        sepia(${sepia}%)
      `;
      ctx.filter = filterStr;

      if (seamlessMirror) {
        // 4-Way Seamless Mirror Tiling for seamless repeat
        const halfW = baseWidth / 2;
        const halfH = baseHeight / 2;

        // Top-Left (Normal)
        ctx.drawImage(img, 0, 0, halfW, halfH);

        // Top-Right (Flipped Horizontal)
        ctx.save();
        ctx.translate(baseWidth, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0, halfW, halfH);
        ctx.restore();

        // Bottom-Left (Flipped Vertical)
        ctx.save();
        ctx.translate(0, baseHeight);
        ctx.scale(1, -1);
        ctx.drawImage(img, 0, 0, halfW, halfH);
        ctx.restore();

        // Bottom-Right (Flipped Both)
        ctx.save();
        ctx.translate(baseWidth, baseHeight);
        ctx.scale(-1, -1);
        ctx.drawImage(img, 0, 0, halfW, halfH);
        ctx.restore();
      } else {
        ctx.drawImage(img, 0, 0, baseWidth, baseHeight);
      }

      ctx.filter = 'none';

      // Color Tint Overlay
      if (enableTint) {
        ctx.save();
        ctx.fillStyle = tintColor;
        ctx.globalAlpha = tintOpacity;
        ctx.globalCompositeOperation = 'source-atop';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
      }

      // Watermark Text Overlay
      if (enableWatermark && watermarkText) {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((watermarkAngle * Math.PI) / 180);
        ctx.font = `bold ${watermarkSize}px monospace`;
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = watermarkOpacity;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 4;

        // Multiple repeat rows
        for (let y = -canvas.height; y <= canvas.height; y += watermarkSize * 2.5) {
          ctx.fillText(watermarkText, 0, y);
        }
        ctx.restore();
      }

      try {
        const dataUrl = canvas.toDataURL('image/png');
        setProcessedTextureUrl(dataUrl);
      } catch (err) {
        // In case of CORS canvas taint, fallback to raw url
        setProcessedTextureUrl(sourceImageUrl);
      }
    };

    img.onerror = () => {
      // Fallback
      setProcessedTextureUrl(sourceImageUrl);
    };

    img.src = sourceImageUrl;
  }, [
    sourceImageUrl,
    brightness,
    contrast,
    saturation,
    hueRotate,
    invert,
    grayscale,
    sepia,
    seamlessMirror,
    enableTint,
    tintColor,
    tintOpacity,
    enableWatermark,
    watermarkText,
    watermarkAngle,
    watermarkOpacity,
    watermarkSize
  ]);

  useEffect(() => {
    processTextureCanvas();
  }, [processTextureCanvas]);

  // Handle URL fetch from web
  const handleFetchWebUrl = () => {
    if (!urlInput.trim()) return;
    setIsLoadingUrl(true);
    setUrlError(null);

    const testImg = new Image();
    testImg.crossOrigin = 'anonymous';
    testImg.onload = () => {
      setSourceImageUrl(urlInput.trim());
      setIsLoadingUrl(false);
      setUrlInput('');
    };
    testImg.onerror = () => {
      // Still set it as background image url
      setSourceImageUrl(urlInput.trim());
      setIsLoadingUrl(false);
      setUrlInput('');
    };
    testImg.src = urlInput.trim();
  };

  // Handle Local File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setSourceImageUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // Save to Custom Textures Library
  const handleSaveToLibrary = () => {
    const newSaved: SavedUserTexture = {
      id: `custom_${Date.now()}`,
      name: customTextureName || `Texture ${savedTextures.length + 1}`,
      imageUrl: processedTextureUrl,
      category: 'User Created',
      createdAt: Date.now(),
      config: {
        scale: patternScale,
        rotation: patternRotation,
        opacity: patternOpacity,
        blendMode: blendMode as any,
        roughness,
        bevelDepth,
        svgFilterType: svgFilterType as any
      }
    };

    const updated = [newSaved, ...savedTextures];
    setSavedTextures(updated);
    try {
      localStorage.setItem('alphaxen_user_textures', JSON.stringify(updated));
    } catch {}

    setCopiedStatus('Saved to Library!');
    setTimeout(() => setCopiedStatus(null), 2500);
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedTextures.filter(t => t.id !== id);
    setSavedTextures(updated);
    try {
      localStorage.setItem('alphaxen_user_textures', JSON.stringify(updated));
    } catch {}
  };

  // Apply to Font Canvas
  const handleApplyToFont = () => {
    const newConfig: FontTextureConfig = {
      ...DEFAULT_TEXTURE_CONFIG,
      enabled: true,
      type: 'custom-image',
      customImageUrl: processedTextureUrl,
      scale: patternScale,
      rotation: patternRotation,
      opacity: patternOpacity,
      blendMode: blendMode as any,
      roughness,
      bevelDepth,
      svgFilterType: svgFilterType as any,
      scope: applyScope
    };

    onUpdateTextureConfig(newConfig);
    onClose();
  };

  // Download Generated Texture PNG
  const handleDownloadPng = () => {
    const link = document.createElement('a');
    link.download = `${customTextureName.toLowerCase().replace(/\s+/g, '_')}_texture.png`;
    link.href = processedTextureUrl;
    link.click();
  };

  // Filter curated textures by search query
  const filteredCurated = CURATED_WEB_TEXTURES.filter(t => 
    t.name.toLowerCase().includes(webSearchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(webSearchQuery.toLowerCase()) ||
    t.tag.toLowerCase().includes(webSearchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn select-none text-xs">
      <div className="relative w-full max-w-5xl bg-[#090b10] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* HEADER */}
        <div className="p-4 bg-[#0e1118] border-b border-zinc-800/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Alphaxen Logo" 
              className="h-8 w-auto max-w-[120px] object-contain shrink-0" 
              onError={(e) => { e.currentTarget.style.display = 'none'; }} 
            />
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-amber-600 border border-red-500/50 flex items-center justify-center text-white shrink-0">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-mono text-sm sm:text-base font-bold text-white tracking-wide">
                  CUSTOM WEB TEXTURE MAKER & SHADER LAB
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-950/70 text-red-400 border border-red-800/50 font-semibold">
                  WEB FETCH & PROCEDURAL TILER
                </span>
              </div>
              <p className="text-[11px] font-mono text-zinc-400">
                Download images from Google/Web, transform them into seamless mirrored textures, apply shaders, and clip directly to vector glyphs
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* WORKSPACE NAVIGATION TABS */}
        <div className="px-5 py-2 bg-[#0a0c12] border-b border-zinc-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => setActiveTab('web')}
            className={`px-3 py-1.5 rounded-lg border font-mono text-[11px] flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'web'
                ? 'bg-red-950/80 border-red-500 text-white font-bold shadow-[0_0_10px_rgba(220,38,38,0.3)]'
                : 'bg-[#10121a] border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-red-400" />
            <span>1. Web Search & Download</span>
          </button>

          <button
            onClick={() => setActiveTab('adjust')}
            className={`px-3 py-1.5 rounded-lg border font-mono text-[11px] flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'adjust'
                ? 'bg-red-950/80 border-red-500 text-white font-bold shadow-[0_0_10px_rgba(220,38,38,0.3)]'
                : 'bg-[#10121a] border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-blue-400" />
            <span>2. Color & Shader FX</span>
          </button>

          <button
            onClick={() => setActiveTab('tiling')}
            className={`px-3 py-1.5 rounded-lg border font-mono text-[11px] flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'tiling'
                ? 'bg-red-950/80 border-red-500 text-white font-bold shadow-[0_0_10px_rgba(220,38,38,0.3)]'
                : 'bg-[#10121a] border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5 text-emerald-400" />
            <span>3. Seamless Tiling & Scale</span>
          </button>

          <button
            onClick={() => setActiveTab('watermark')}
            className={`px-3 py-1.5 rounded-lg border font-mono text-[11px] flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'watermark'
                ? 'bg-red-950/80 border-red-500 text-white font-bold shadow-[0_0_10px_rgba(220,38,38,0.3)]'
                : 'bg-[#10121a] border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-purple-400" />
            <span>4. Watermark / Stamp</span>
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`px-3 py-1.5 rounded-lg border font-mono text-[11px] flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'library'
                ? 'bg-red-950/80 border-red-500 text-white font-bold shadow-[0_0_10px_rgba(220,38,38,0.3)]'
                : 'bg-[#10121a] border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span>Saved Textures ({savedTextures.length})</span>
          </button>
        </div>

        {/* MAIN BODY: CONTROLS (LEFT) + REAL-TIME SPECIMEN PREVIEW (RIGHT) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* LEFT COLUMN: ACTIVE TAB TOOL PANEL */}
          <div className="lg:col-span-6 p-5 border-r border-zinc-800/80 overflow-y-auto space-y-4 bg-[#07090e]">
            
            {/* TAB 1: WEB DOWNLOAD & SEARCH */}
            {activeTab === 'web' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-[#10121a] border border-zinc-800/80 space-y-2.5">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold tracking-wider block">
                    Download & Import from Google / Web URL
                  </span>
                  
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="Paste image link (e.g. https://.../texture.jpg)"
                      className="flex-1 bg-black/60 border border-zinc-700 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-red-500"
                    />
                    <button
                      onClick={handleFetchWebUrl}
                      disabled={!urlInput.trim() || isLoadingUrl}
                      className="px-4 py-2 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 disabled:opacity-40 text-white font-semibold font-mono rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{isLoadingUrl ? 'Loading...' : 'Fetch Image'}</span>
                    </button>
                  </div>
                  {urlError && <p className="text-[10px] text-red-400">{urlError}</p>}

                  {/* Drag-and-drop / Local Upload */}
                  <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500">Or upload local image:</span>
                    <label className="px-3 py-1.5 bg-[#161a24] hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white rounded-lg font-mono text-[10px] transition-colors cursor-pointer flex items-center gap-1.5">
                      <Upload className="w-3 h-3 text-zinc-400" />
                      <span>Browse File</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                {/* CURATED ONLINE TEXTURE GALLERY */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold tracking-wider">
                      Online Texture Presets (Earth, Stone, Cyber, Metal)
                    </span>
                    <div className="relative w-40">
                      <Search className="w-3 h-3 text-zinc-500 absolute left-2 top-2" />
                      <input
                        type="text"
                        value={webSearchQuery}
                        onChange={(e) => setWebSearchQuery(e.target.value)}
                        placeholder="Search presets..."
                        className="w-full bg-[#10121a] border border-zinc-800 rounded-md pl-6 pr-2 py-1 text-[10px] text-zinc-300 focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto p-1 bg-black/40 rounded-xl border border-zinc-800/80">
                    {filteredCurated.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSourceImageUrl(item.url)}
                        className={`p-2 rounded-lg border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                          sourceImageUrl === item.url
                            ? 'bg-red-950/60 border-red-500 shadow-[0_0_10px_rgba(220,38,38,0.3)]'
                            : 'bg-[#10121a] border-zinc-800/80 hover:border-zinc-700 hover:bg-[#141824]'
                        }`}
                      >
                        <img 
                          src={item.url} 
                          alt={item.name} 
                          className="w-10 h-10 rounded-md object-cover border border-zinc-700 shrink-0" 
                        />
                        <div className="overflow-hidden">
                          <span className="text-white font-bold text-[11px] block truncate">{item.name}</span>
                          <span className="text-[9px] text-zinc-400 font-mono block">{item.category}</span>
                          <span className="text-[8px] text-red-400 font-mono block truncate">{item.tag}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: COLOR & SHADER FX */}
            {activeTab === 'adjust' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-[#10121a] border border-zinc-800/80 space-y-3 font-mono text-[11px]">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold tracking-wider block">
                    Photometric Filters & Grading
                  </span>

                  {/* Brightness */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-zinc-400">
                      <span>Brightness</span>
                      <span className="text-white font-bold">{brightness}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={brightness}
                      onChange={(e) => setBrightness(Number(e.target.value))}
                      className="w-full accent-red-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
                    />
                  </div>

                  {/* Contrast */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-zinc-400">
                      <span>Contrast</span>
                      <span className="text-white font-bold">{contrast}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={contrast}
                      onChange={(e) => setContrast(Number(e.target.value))}
                      className="w-full accent-red-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
                    />
                  </div>

                  {/* Saturation */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-zinc-400">
                      <span>Saturation</span>
                      <span className="text-white font-bold">{saturation}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={saturation}
                      onChange={(e) => setSaturation(Number(e.target.value))}
                      className="w-full accent-red-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
                    />
                  </div>

                  {/* Hue Rotation */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-zinc-400">
                      <span>Hue Rotation</span>
                      <span className="text-white font-bold">{hueRotate}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={hueRotate}
                      onChange={(e) => setHueRotate(Number(e.target.value))}
                      className="w-full accent-red-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
                    />
                  </div>

                  {/* Invert / Grayscale Quick Toggles */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/60">
                    <button
                      onClick={() => setInvert(prev => prev === 0 ? 100 : 0)}
                      className={`py-1.5 rounded border text-[10px] transition-colors cursor-pointer ${
                        invert > 0
                          ? 'bg-red-950/80 border-red-500 text-white font-bold'
                          : 'bg-[#141620] border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      Invert Texture ({invert > 0 ? 'ON' : 'OFF'})
                    </button>
                    <button
                      onClick={() => setGrayscale(prev => prev === 0 ? 100 : 0)}
                      className={`py-1.5 rounded border text-[10px] transition-colors cursor-pointer ${
                        grayscale > 0
                          ? 'bg-red-950/80 border-red-500 text-white font-bold'
                          : 'bg-[#141620] border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      Monochrome ({grayscale > 0 ? 'ON' : 'OFF'})
                    </button>
                  </div>

                  {/* Color Tint Overlay */}
                  <div className="space-y-2 pt-2 border-t border-zinc-800/60">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-300 font-bold">Color Tint Overlay</span>
                      <input
                        type="checkbox"
                        checked={enableTint}
                        onChange={(e) => setEnableTint(e.target.checked)}
                        className="accent-red-500 cursor-pointer"
                      />
                    </div>
                    {enableTint && (
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={tintColor}
                          onChange={(e) => setTintColor(e.target.value)}
                          className="w-7 h-7 rounded border border-zinc-700 bg-transparent cursor-pointer"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between text-[9px] text-zinc-400">
                            <span>Tint Intensity</span>
                            <span>{Math.round(tintOpacity * 100)}%</span>
                          </div>
                          <input
                            type="range"
                            min="0.05"
                            max="1"
                            step="0.05"
                            value={tintOpacity}
                            onChange={(e) => setTintOpacity(Number(e.target.value))}
                            className="w-full accent-red-500 h-1 bg-zinc-800 rounded"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: SEAMLESS TILING & GEOMETRY */}
            {activeTab === 'tiling' && (
              <div className="space-y-4 font-mono text-[11px]">
                <div className="p-3.5 rounded-xl bg-[#10121a] border border-zinc-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block">4-Way Seamless Mirror Tiling</span>
                      <span className="text-[10px] text-zinc-400 block font-sans">
                        Eliminates visible seams by mirroring edges horizontally and vertically
                      </span>
                    </div>
                    <button
                      onClick={() => setSeamlessMirror(prev => !prev)}
                      className={`px-3 py-1 rounded border font-bold text-[10px] cursor-pointer ${
                        seamlessMirror
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                      }`}
                    >
                      {seamlessMirror ? 'ENABLED' : 'DISABLED'}
                    </button>
                  </div>

                  {/* Pattern Scale */}
                  <div className="space-y-1 pt-2 border-t border-zinc-800/60">
                    <div className="flex justify-between text-zinc-400">
                      <span>Pattern Scale / Zoom</span>
                      <span className="text-white font-bold">{Math.round(patternScale * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="3.0"
                      step="0.1"
                      value={patternScale}
                      onChange={(e) => setPatternScale(Number(e.target.value))}
                      className="w-full accent-red-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
                    />
                  </div>

                  {/* Pattern Opacity */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-zinc-400">
                      <span>Texture Opacity</span>
                      <span className="text-white font-bold">{Math.round(patternOpacity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={patternOpacity}
                      onChange={(e) => setPatternOpacity(Number(e.target.value))}
                      className="w-full accent-red-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
                    />
                  </div>

                  {/* Composite Blend Mode */}
                  <div className="space-y-1">
                    <span className="text-zinc-400 block">Composite Blend Mode</span>
                    <select
                      value={blendMode}
                      onChange={(e) => setBlendMode(e.target.value)}
                      className="w-full bg-[#141620] border border-zinc-800 rounded p-2 text-zinc-200 focus:outline-none focus:border-red-500"
                    >
                      <option value="overlay">Overlay (Recommended)</option>
                      <option value="screen">Screen (Luminescent Glow)</option>
                      <option value="hard-light">Hard Light (Punchy Detail)</option>
                      <option value="multiply">Multiply (Dark Etched)</option>
                      <option value="color-dodge">Color Dodge (High Specular)</option>
                      <option value="normal">Normal (Opaque Fill)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: WATERMARK & SECURITY STAMP */}
            {activeTab === 'watermark' && (
              <div className="space-y-4 font-mono text-[11px]">
                <div className="p-3.5 rounded-xl bg-[#10121a] border border-zinc-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block">Watermark & Foundry Mark Stamp</span>
                      <span className="text-[10px] text-zinc-400 block font-sans">
                        Embed diagonal security text, copyright, or foundry mark directly into the vector texture
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={enableWatermark}
                      onChange={(e) => setEnableWatermark(e.target.checked)}
                      className="accent-red-500 cursor-pointer"
                    />
                  </div>

                  {enableWatermark && (
                    <>
                      <div className="space-y-1">
                        <span className="text-zinc-400 block">Watermark Text</span>
                        <input
                          type="text"
                          value={watermarkText}
                          onChange={(e) => setWatermarkText(e.target.value)}
                          placeholder="e.g. CONFIDENTIAL / SAMPLE"
                          className="w-full bg-black/60 border border-zinc-700 rounded p-2 text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-zinc-400">
                          <span>Stamp Angle</span>
                          <span className="text-white font-bold">{watermarkAngle}°</span>
                        </div>
                        <input
                          type="range"
                          min="-90"
                          max="90"
                          value={watermarkAngle}
                          onChange={(e) => setWatermarkAngle(Number(e.target.value))}
                          className="w-full accent-red-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-zinc-400">
                          <span>Watermark Opacity</span>
                          <span className="text-white font-bold">{Math.round(watermarkOpacity * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min="0.1"
                          max="1.0"
                          step="0.05"
                          value={watermarkOpacity}
                          onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
                          className="w-full accent-red-500 h-1.5 bg-zinc-800 rounded cursor-pointer"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* TAB 5: SAVED CUSTOM TEXTURES LIBRARY */}
            {activeTab === 'library' && (
              <div className="space-y-3 font-mono text-[11px]">
                <div className="p-3.5 rounded-xl bg-[#10121a] border border-zinc-800/80 space-y-2">
                  <span className="text-white font-bold block">Save Current Texture to Bank</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customTextureName}
                      onChange={(e) => setCustomTextureName(e.target.value)}
                      placeholder="Texture Name..."
                      className="flex-1 bg-black/60 border border-zinc-700 rounded px-2.5 py-1.5 text-white"
                    />
                    <button
                      onClick={handleSaveToLibrary}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </button>
                  </div>
                  {copiedStatus && <span className="text-emerald-400 text-[10px]">{copiedStatus}</span>}
                </div>

                {savedTextures.length === 0 ? (
                  <div className="p-6 text-center text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
                    No custom user textures saved yet. Create a texture and click Save!
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                    {savedTextures.map((t) => (
                      <div
                        key={t.id}
                        className="p-2 rounded-lg bg-[#10121a] border border-zinc-800 flex items-center justify-between gap-2"
                      >
                        <button
                          onClick={() => setSourceImageUrl(t.imageUrl)}
                          className="flex items-center gap-2 text-left flex-1 overflow-hidden cursor-pointer"
                        >
                          <img src={t.imageUrl} alt={t.name} className="w-9 h-9 rounded object-cover border border-zinc-700" />
                          <div className="overflow-hidden">
                            <span className="text-white font-bold text-[10px] block truncate">{t.name}</span>
                            <span className="text-[8px] text-zinc-500 block">{new Date(t.createdAt).toLocaleDateString()}</span>
                          </div>
                        </button>
                        <button
                          onClick={() => handleDeleteSaved(t.id)}
                          className="p-1 rounded text-zinc-600 hover:text-red-400 cursor-pointer"
                          title="Delete saved texture"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: REAL-TIME GLYPH SPECIMEN & SHADER VISUALIZER */}
          <div className="lg:col-span-6 p-6 overflow-y-auto space-y-4 bg-[#090b10] flex flex-col justify-between">
            
            <div className="space-y-4">
              {/* LIVE GLYPH CLIPPED SHADER PREVIEW */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold tracking-wider">
                    Vector Glyph Real-Time Texture Preview
                  </span>
                  <div className="flex items-center gap-1.5">
                    {['A', 'R', 'Q', 'X', '8'].map((ch) => (
                      <button
                        key={ch}
                        onClick={() => setPreviewString(ch)}
                        className={`w-6 h-6 rounded text-[10px] font-mono border transition-colors cursor-pointer ${
                          previewString === ch
                            ? 'bg-red-950/80 border-red-500 text-white font-bold'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {ch}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SVG Live Shader Render Box */}
                <div className="h-64 w-full bg-[#05060a] border border-zinc-800 rounded-2xl flex items-center justify-center relative overflow-hidden drop-shadow-2xl">
                  {/* Subtle Grid */}
                  <div 
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 1px 1px, #333 1px, transparent 0)',
                      backgroundSize: '16px 16px'
                    }}
                  />

                  {/* Rendered Specimen with Texture Pattern Overlay */}
                  <div className="relative z-10 flex items-center justify-center">
                    <svg viewBox="0 0 400 400" className="w-56 h-56">
                      <defs>
                        <pattern id="modalUserTexturePattern" width={100 * patternScale} height={100 * patternScale} patternUnits="userSpaceOnUse">
                          <image href={processedTextureUrl} width={100 * patternScale} height={100 * patternScale} />
                        </pattern>

                        <clipPath id="modalLetterClip">
                          <text x="200" y="300" fontSize="320" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">
                            {previewString}
                          </text>
                        </clipPath>
                      </defs>

                      {/* Base Vector Glyph */}
                      <text 
                        x="200" 
                        y="300" 
                        fontSize="320" 
                        fontWeight="900" 
                        fontFamily="sans-serif" 
                        textAnchor="middle" 
                        fill="#E50914"
                        stroke="#FF1A1A"
                        strokeWidth="2"
                        filter={bevelDepth ? `drop-shadow(0 ${bevelDepth}px ${bevelDepth * 1.5}px rgba(0,0,0,0.9))` : undefined}
                      >
                        {previewString}
                      </text>

                      {/* Clipped Procedural Texture */}
                      <rect
                        x="0"
                        y="0"
                        width="400"
                        height="400"
                        clipPath="url(#modalLetterClip)"
                        fill="url(#modalUserTexturePattern)"
                        opacity={patternOpacity}
                        style={{ mixBlendMode: blendMode as any }}
                      />
                    </svg>
                  </div>

                  {/* Raw Texture Mini Thumbnail */}
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md p-1.5 rounded-lg border border-zinc-800 flex items-center gap-2 text-[9px] font-mono text-zinc-400">
                    <img src={processedTextureUrl} alt="tile" className="w-7 h-7 rounded object-cover border border-zinc-700" />
                    <span>Seamless 256px Tile</span>
                  </div>
                </div>
              </div>

              {/* APPLICATION SCOPE SWITCHER */}
              <div className="p-3 rounded-xl bg-[#10121a] border border-zinc-800/80 space-y-2">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block font-semibold">
                  Application Target
                </span>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <button
                    onClick={() => setApplyScope('glyph')}
                    className={`py-2 rounded-lg border font-bold transition-colors cursor-pointer ${
                      applyScope === 'glyph'
                        ? 'bg-red-950/80 border-red-500 text-white shadow-[0_0_10px_rgba(220,38,38,0.3)]'
                        : 'bg-[#141620] border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    Active Glyph '{activeChar}' Only
                  </button>
                  <button
                    onClick={() => setApplyScope('font')}
                    className={`py-2 rounded-lg border font-bold transition-colors cursor-pointer ${
                      applyScope === 'font'
                        ? 'bg-red-950/80 border-red-500 text-white shadow-[0_0_10px_rgba(220,38,38,0.3)]'
                        : 'bg-[#141620] border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    All Font Glyphs (Global)
                  </button>
                </div>
              </div>
            </div>

            {/* ACTION FOOTER BUTTONS */}
            <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-3">
              <button
                onClick={handleDownloadPng}
                className="px-3 py-2.5 rounded-xl bg-[#141620] hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-mono text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                title="Download seamless PNG tile"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PNG Tile</span>
              </button>

              <button
                onClick={handleApplyToFont}
                className="flex-1 py-2.5 px-5 rounded-xl bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-600 hover:to-red-500 text-white font-bold font-mono text-xs shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Apply Texture to Vector Font</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
