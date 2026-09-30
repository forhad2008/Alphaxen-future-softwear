import { TextureBrushCategory } from '../types/fontLab';

export interface TextureBrushVariant {
  id: string;
  name: string;
  category: TextureBrushCategory;
  description: string;
  accentColor: string;
  previewGradient: string;
  defaultSize: number;
  defaultOpacity: number;
  defaultColor: string;
  blendMode: 'overlay' | 'screen' | 'multiply' | 'color-dodge' | 'hard-light' | 'normal';
  patternSvg: string; // SVG pattern definition for SVG <defs>
}

export const TEXTURE_BRUSH_CATEGORIES: Array<{ id: TextureBrushCategory; name: string; icon: string }> = [
  { id: '3d-texture', name: '3D Texture & Relief', icon: 'Box' },
  { id: '3d-watermark', name: '3D Watermark & Security', icon: 'Shield' },
  { id: 'grunge', name: 'Grunge & Distress', icon: 'Flame' },
  { id: 'stone', name: 'Stone & Mineral', icon: 'Mountain' },
  { id: 'metallic', name: 'Metallic & Alloy', icon: 'Sparkles' }
];

export const TEXTURE_BRUSH_VARIANTS: TextureBrushVariant[] = [
  // ─── 0. 3D TEXTURE & RELIEF COLLECTION ────────────────────────────
  {
    id: '3d-chiseled-bevel',
    name: '3D Chiseled Bas-Relief',
    category: '3d-texture',
    description: 'Faceted 3D lapidary chiseled bevel with dual-angle highlights and depth shadows.',
    accentColor: '#38BDF8',
    previewGradient: 'linear-gradient(135deg, #38BDF8 0%, #0369A1 50%, #082F49 100%)',
    defaultSize: 55,
    defaultOpacity: 0.9,
    defaultColor: '#38BDF8',
    blendMode: 'hard-light',
    patternSvg: `
      <pattern id="brush-3d-chiseled-bevel" width="60" height="60" patternUnits="userSpaceOnUse">
        <rect width="60" height="60" fill="#0C1524"/>
        <polygon points="0,0 30,30 0,60" fill="#0284C7" opacity="0.8"/>
        <polygon points="0,0 60,0 30,30" fill="#7DD3FC" opacity="0.95"/>
        <polygon points="60,0 60,60 30,30" fill="#0369A1" opacity="0.7"/>
        <polygon points="0,60 30,30 60,60" fill="#082F49" opacity="0.9"/>
        <line x1="0" y1="0" x2="30" y2="30" stroke="#FFFFFF" stroke-width="1.2" opacity="0.9"/>
        <line x1="60" y1="0" x2="30" y2="30" stroke="#BAE6FD" stroke-width="1" opacity="0.8"/>
        <line x1="0" y1="60" x2="30" y2="30" stroke="#075985" stroke-width="1.2" opacity="0.7"/>
      </pattern>
    `
  },
  {
    id: '3d-extrusion-shadow',
    name: '3D Isometric Extrusion',
    category: '3d-texture',
    description: 'Multi-layer isometric extrusion ribs for casting dramatic typography depths.',
    accentColor: '#EF4444',
    previewGradient: 'linear-gradient(135deg, #F87171 0%, #DC2626 50%, #450A0A 100%)',
    defaultSize: 60,
    defaultOpacity: 0.95,
    defaultColor: '#EF4444',
    blendMode: 'overlay',
    patternSvg: `
      <pattern id="brush-3d-extrusion-shadow" width="50" height="50" patternUnits="userSpaceOnUse">
        <rect width="50" height="50" fill="#180808"/>
        <line x1="0" y1="0" x2="50" y2="50" stroke="#DC2626" stroke-width="3" opacity="0.9"/>
        <line x1="-20" y1="10" x2="30" y2="60" stroke="#991B1B" stroke-width="2.5" opacity="0.7"/>
        <line x1="15" y1="-10" x2="65" y2="40" stroke="#F87171" stroke-width="1.5" opacity="0.85"/>
        <circle cx="25" cy="25" r="2.5" fill="#FECACA" opacity="0.9"/>
      </pattern>
    `
  },
  {
    id: '3d-cyber-mesh',
    name: '3D Cyber Spatial Matrix',
    category: '3d-texture',
    description: '3D perspective wireframe grid with neon luminescent depth vertices.',
    accentColor: '#10B981',
    previewGradient: 'linear-gradient(135deg, #34D399 0%, #059669 50%, #022C22 100%)',
    defaultSize: 50,
    defaultOpacity: 0.85,
    defaultColor: '#10B981',
    blendMode: 'color-dodge',
    patternSvg: `
      <pattern id="brush-3d-cyber-mesh" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="40" height="40" fill="#021E17"/>
        <path d="M0,20 L20,0 L40,20 L20,40 Z" fill="none" stroke="#10B981" stroke-width="1.2" opacity="0.8"/>
        <line x1="0" y1="20" x2="40" y2="20" stroke="#34D399" stroke-width="0.8" opacity="0.6"/>
        <line x1="20" y1="0" x2="20" y2="40" stroke="#34D399" stroke-width="0.8" opacity="0.6"/>
        <circle cx="20" cy="20" r="2" fill="#A7F3D0" opacity="0.95"/>
      </pattern>
    `
  },
  {
    id: '3d-embossed-metal',
    name: '3D Raised Armor Crest',
    category: '3d-texture',
    description: 'Heavy steel embossed relief with specular rims and brushed industrial lighting.',
    accentColor: '#E2E8F0',
    previewGradient: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 50%, #1E293B 100%)',
    defaultSize: 55,
    defaultOpacity: 0.9,
    defaultColor: '#F8FAFC',
    blendMode: 'hard-light',
    patternSvg: `
      <pattern id="brush-3d-embossed-metal" width="50" height="50" patternUnits="userSpaceOnUse">
        <rect width="50" height="50" fill="#1E293B"/>
        <circle cx="25" cy="25" r="18" fill="#334155" stroke="#FFFFFF" stroke-width="1.5" opacity="0.9"/>
        <circle cx="25" cy="25" r="14" fill="#475569" stroke="#64748B" stroke-width="1" opacity="0.85"/>
        <circle cx="25" cy="25" r="8" fill="#0F172A" opacity="0.9"/>
        <line x1="7" y1="25" x2="43" y2="25" stroke="#F1F5F9" stroke-width="1" opacity="0.7"/>
      </pattern>
    `
  },

  // ─── 0.5. 3D WATERMARK & SECURITY COLLECTION ─────────────────────
  {
    id: '3d-guilloche-seal',
    name: '3D Banknote Guilloche Seal',
    category: '3d-watermark',
    description: 'Security currency rosette with mathematical concentric trigonometric waves.',
    accentColor: '#6366F1',
    previewGradient: 'radial-gradient(circle, #818CF8 20%, #4338CA 60%, #1E1B4B 100%)',
    defaultSize: 65,
    defaultOpacity: 0.85,
    defaultColor: '#818CF8',
    blendMode: 'screen',
    patternSvg: `
      <pattern id="brush-3d-guilloche-seal" width="80" height="80" patternUnits="userSpaceOnUse">
        <rect width="80" height="80" fill="#0A0B1A"/>
        <circle cx="40" cy="40" r="36" fill="none" stroke="#6366F1" stroke-width="1.2" opacity="0.8"/>
        <circle cx="40" cy="40" r="28" fill="none" stroke="#818CF8" stroke-width="0.8" stroke-dasharray="3 2" opacity="0.75"/>
        <path d="M40,4 Q76,40 40,76 Q4,40 40,4 Z" fill="none" stroke="#A5B4FC" stroke-width="1" opacity="0.7"/>
        <path d="M4,40 Q40,76 76,40 Q40,4 4,40 Z" fill="none" stroke="#6366F1" stroke-width="1" opacity="0.7"/>
        <circle cx="40" cy="40" r="12" fill="#312E81" stroke="#C7D2FE" stroke-width="1" opacity="0.9"/>
        <circle cx="40" cy="40" r="4" fill="#FFFFFF" opacity="0.95"/>
      </pattern>
    `
  },
  {
    id: '3d-hologram-stamp',
    name: '3D Prismatic Hologram',
    category: '3d-watermark',
    description: 'Diffractive iridescent optical hologram with rainbow phase shift grating.',
    accentColor: '#EC4899',
    previewGradient: 'linear-gradient(135deg, #F43F5E 0%, #8B5CF6 33%, #06B6D4 66%, #10B981 100%)',
    defaultSize: 60,
    defaultOpacity: 0.85,
    defaultColor: '#F472B6',
    blendMode: 'color-dodge',
    patternSvg: `
      <pattern id="brush-3d-hologram-stamp" width="70" height="70" patternUnits="userSpaceOnUse">
        <rect width="70" height="70" fill="#14061A"/>
        <circle cx="35" cy="35" r="30" fill="none" stroke="#EC4899" stroke-width="1.5" opacity="0.8"/>
        <circle cx="35" cy="35" r="22" fill="none" stroke="#8B5CF6" stroke-width="1.2" opacity="0.85"/>
        <circle cx="35" cy="35" r="14" fill="none" stroke="#06B6D4" stroke-width="1" opacity="0.9"/>
        <circle cx="35" cy="35" r="6" fill="#F43F5E" opacity="0.95"/>
        <line x1="5" y1="5" x2="65" y2="65" stroke="#FDE047" stroke-width="1.2" opacity="0.8"/>
        <line x1="65" y1="5" x2="5" y2="65" stroke="#34D399" stroke-width="1.2" opacity="0.8"/>
      </pattern>
    `
  },
  {
    id: '3d-postal-emboss',
    name: '3D Certified Postal Stamp',
    category: '3d-watermark',
    description: 'Embossed cancellation seal with concentric verification ripples and year imprint.',
    accentColor: '#F97316',
    previewGradient: 'linear-gradient(135deg, #FDBA74 0%, #EA580C 50%, #7C2D12 100%)',
    defaultSize: 55,
    defaultOpacity: 0.8,
    defaultColor: '#FB923C',
    blendMode: 'hard-light',
    patternSvg: `
      <pattern id="brush-3d-postal-emboss" width="70" height="70" patternUnits="userSpaceOnUse">
        <rect width="70" height="70" fill="#1F0D06"/>
        <circle cx="35" cy="35" r="32" fill="none" stroke="#F97316" stroke-width="1.8" stroke-dasharray="4 2" opacity="0.9"/>
        <circle cx="35" cy="35" r="24" fill="none" stroke="#EA580C" stroke-width="1" opacity="0.75"/>
        <path d="M5,25 Q35,15 65,25" fill="none" stroke="#FDBA74" stroke-width="1.5" opacity="0.85"/>
        <path d="M5,35 Q35,25 65,35" fill="none" stroke="#FDBA74" stroke-width="1.5" opacity="0.85"/>
        <path d="M5,45 Q35,35 65,45" fill="none" stroke="#FDBA74" stroke-width="1.5" opacity="0.85"/>
      </pattern>
    `
  },

  // 1. GRUNGE COLLECTION
  {
    id: 'distress-acid',
    name: 'Acid Wash & Spatter',
    category: 'grunge',
    description: 'Corrosive aerosol spatter, micro-droplets, and chaotic acid spray blemishes.',
    accentColor: '#EF4444',
    previewGradient: 'radial-gradient(circle, #EF4444 20%, #7F1D1D 60%, #000 100%)',
    defaultSize: 45,
    defaultOpacity: 0.85,
    defaultColor: '#DC2626',
    blendMode: 'overlay',
    patternSvg: `
      <pattern id="brush-distress-acid" width="50" height="50" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="3" fill="#DC2626" opacity="0.9"/>
        <circle cx="28" cy="15" r="1.5" fill="#EF4444" opacity="0.8"/>
        <circle cx="15" cy="35" r="2.5" fill="#F87171" opacity="0.95"/>
        <circle cx="40" cy="40" r="4" fill="#991B1B" opacity="0.7"/>
        <circle cx="35" cy="22" r="1" fill="#FFFFFF" opacity="0.9"/>
        <circle cx="4" cy="25" r="1.8" fill="#DC2626" opacity="0.6"/>
        <circle cx="22" cy="45" r="1.2" fill="#FCA5A5" opacity="0.75"/>
      </pattern>
    `
  },
  {
    id: 'heavy-scratch',
    name: 'Industrial Scratches',
    category: 'grunge',
    description: 'Deep mechanical blade incisions, linear gouges, and razor-etched distressed grain.',
    accentColor: '#F59E0B',
    previewGradient: 'linear-gradient(135deg, #F59E0B 0%, #78350F 50%, #000 100%)',
    defaultSize: 55,
    defaultOpacity: 0.9,
    defaultColor: '#F59E0B',
    blendMode: 'color-dodge',
    patternSvg: `
      <pattern id="brush-heavy-scratch" width="60" height="60" patternUnits="userSpaceOnUse">
        <line x1="5" y1="5" x2="55" y2="45" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" opacity="0.9"/>
        <line x1="2" y1="20" x2="48" y2="58" stroke="#FDE68A" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
        <line x1="18" y1="2" x2="58" y2="35" stroke="#B45309" stroke-width="1.6" stroke-linecap="round" opacity="0.85"/>
        <line x1="30" y1="10" x2="10" y2="50" stroke="#F59E0B" stroke-width="0.8" opacity="0.5"/>
      </pattern>
    `
  },
  {
    id: 'decay-stomp',
    name: 'Eroded Decay & Grain',
    category: 'grunge',
    description: 'Weathered oxidized pitting, coarse noise stomp, and aged urban abrasion.',
    accentColor: '#A1A1AA',
    previewGradient: 'radial-gradient(circle, #E4E4E7 10%, #52525B 60%, #18181B 100%)',
    defaultSize: 60,
    defaultOpacity: 0.8,
    defaultColor: '#D4D4D8',
    blendMode: 'hard-light',
    patternSvg: `
      <pattern id="brush-decay-stomp" width="30" height="30" patternUnits="userSpaceOnUse">
        <rect x="2" y="2" width="3" height="3" fill="#E4E4E7" opacity="0.8"/>
        <rect x="12" y="8" width="4" height="2" fill="#71717A" opacity="0.7"/>
        <rect x="22" y="4" width="2" height="4" fill="#D4D4D8" opacity="0.9"/>
        <rect x="8" y="18" width="5" height="3" fill="#A1A1AA" opacity="0.6"/>
        <rect x="20" y="22" width="3" height="3" fill="#FFFFFF" opacity="0.85"/>
        <rect x="2" y="26" width="4" height="2" fill="#52525B" opacity="0.5"/>
      </pattern>
    `
  },
  {
    id: 'cracked-concrete',
    name: 'Brutalist Concrete Fissure',
    category: 'grunge',
    description: 'High-density branching tension fissures and brittle cement fracture veins.',
    accentColor: '#71717A',
    previewGradient: 'linear-gradient(45deg, #27272A 0%, #71717A 50%, #18181B 100%)',
    defaultSize: 50,
    defaultOpacity: 0.85,
    defaultColor: '#A1A1AA',
    blendMode: 'overlay',
    patternSvg: `
      <pattern id="brush-cracked-concrete" width="80" height="80" patternUnits="userSpaceOnUse">
        <path d="M10,0 L25,30 L18,50 L45,65 L70,80" stroke="#D4D4D8" stroke-width="1.8" fill="none" opacity="0.85"/>
        <path d="M25,30 L55,20 L80,35" stroke="#71717A" stroke-width="1.2" fill="none" opacity="0.7"/>
        <path d="M18,50 L0,70" stroke="#A1A1AA" stroke-width="1" fill="none" opacity="0.6"/>
      </pattern>
    `
  },

  // 2. STONE & MINERAL COLLECTION
  {
    id: 'volcanic-basalt',
    name: 'Volcanic Magma Basalt',
    category: 'stone',
    description: 'Porous obsidian rock crust with incandescent crimson embers trapped inside pores.',
    accentColor: '#DC2626',
    previewGradient: 'radial-gradient(circle, #EF4444 0%, #7F1D1D 50%, #09090B 100%)',
    defaultSize: 50,
    defaultOpacity: 0.9,
    defaultColor: '#EF4444',
    blendMode: 'color-dodge',
    patternSvg: `
      <pattern id="brush-volcanic-basalt" width="70" height="70" patternUnits="userSpaceOnUse">
        <rect width="70" height="70" fill="#0C0A09"/>
        <circle cx="35" cy="35" r="16" fill="#DC2626" opacity="0.8"/>
        <circle cx="35" cy="35" r="8" fill="#FEF08A" opacity="0.95"/>
        <path d="M5,10 Q25,35 40,5 T70,25" stroke="#B91C1C" stroke-width="2" fill="none" opacity="0.7"/>
        <circle cx="15" cy="55" r="5" fill="#EA580C" opacity="0.85"/>
        <circle cx="58" cy="50" r="4" fill="#F97316" opacity="0.8"/>
      </pattern>
    `
  },
  {
    id: 'carrara-marble',
    name: 'Carrara Quartz Vein',
    category: 'stone',
    description: 'Organic metamorphic veins drifting through crystalline alabaster marble.',
    accentColor: '#E2E8F0',
    previewGradient: 'linear-gradient(135deg, #F8FAFC 0%, #94A3B8 50%, #1E293B 100%)',
    defaultSize: 45,
    defaultOpacity: 0.75,
    defaultColor: '#F8FAFC',
    blendMode: 'screen',
    patternSvg: `
      <pattern id="brush-carrara-marble" width="90" height="90" patternUnits="userSpaceOnUse">
        <path d="M0,20 Q30,60 60,30 T90,70" stroke="#F8FAFC" stroke-width="2.5" fill="none" opacity="0.85"/>
        <path d="M10,80 Q45,20 80,45" stroke="#CBD5E1" stroke-width="1.2" fill="none" opacity="0.6"/>
        <path d="M40,0 Q65,40 50,90" stroke="#94A3B8" stroke-width="0.8" fill="none" opacity="0.5"/>
      </pattern>
    `
  },
  {
    id: 'rough-granite',
    name: 'Chiseled Granite Rock',
    category: 'stone',
    description: 'Angular chiseled stone facets with glistening mica and feldspar crystal flakes.',
    accentColor: '#A8A29E',
    previewGradient: 'linear-gradient(135deg, #E7E5E4 0%, #78716C 50%, #1C1917 100%)',
    defaultSize: 50,
    defaultOpacity: 0.85,
    defaultColor: '#D6D3D1',
    blendMode: 'hard-light',
    patternSvg: `
      <pattern id="brush-rough-granite" width="50" height="50" patternUnits="userSpaceOnUse">
        <polygon points="10,5 25,2 20,20" fill="#E7E5E4" opacity="0.85"/>
        <polygon points="35,15 48,10 40,30" fill="#A8A29E" opacity="0.75"/>
        <polygon points="5,30 20,25 15,45" fill="#F5F5F4" opacity="0.9"/>
        <polygon points="28,32 45,28 38,48" fill="#78716C" opacity="0.6"/>
      </pattern>
    `
  },
  {
    id: 'obsidian-shard',
    name: 'Obsidian Cleavage Shard',
    category: 'stone',
    description: 'Conchoidal razor-sharp volcanic glass edges with deep black specular sheen.',
    accentColor: '#818CF8',
    previewGradient: 'linear-gradient(135deg, #818CF8 0%, #312E81 50%, #030712 100%)',
    defaultSize: 45,
    defaultOpacity: 0.9,
    defaultColor: '#A5B4FC',
    blendMode: 'color-dodge',
    patternSvg: `
      <pattern id="brush-obsidian-shard" width="60" height="60" patternUnits="userSpaceOnUse">
        <polygon points="0,0 40,10 20,40" fill="#6366F1" opacity="0.8"/>
        <polygon points="30,20 60,30 45,60" fill="#A5B4FC" opacity="0.9"/>
        <line x1="0" y1="0" x2="60" y2="60" stroke="#FFFFFF" stroke-width="1.5" opacity="0.9"/>
      </pattern>
    `
  },

  // 3. METALLIC COLLECTION
  {
    id: 'liquid-chrome',
    name: 'Liquid Specular Chrome',
    category: 'metallic',
    description: 'Molten high-gloss mercury with surreal horizon reflections and mirrored luminance.',
    accentColor: '#38BDF8',
    previewGradient: 'linear-gradient(135deg, #FFFFFF 0%, #38BDF8 40%, #0F172A 70%, #FFFFFF 100%)',
    defaultSize: 55,
    defaultOpacity: 0.95,
    defaultColor: '#FFFFFF',
    blendMode: 'screen',
    patternSvg: `
      <pattern id="brush-liquid-chrome" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M0,25 Q50,5 100,30 L100,60 Q50,35 0,55 Z" fill="#F8FAFC" opacity="0.95"/>
        <line x1="0" y1="50" x2="100" y2="50" stroke="#38BDF8" stroke-width="2.5" opacity="0.9"/>
        <path d="M0,75 Q50,95 100,70 L100,95 Q50,115 0,90 Z" fill="#0284C7" opacity="0.6"/>
      </pattern>
    `
  },
  {
    id: 'damascus-flow',
    name: 'Damascus Ripple Steel',
    category: 'metallic',
    description: 'Folded crucible carbon steel wave patterns with organic woodgrain grain lines.',
    accentColor: '#94A3B8',
    previewGradient: 'linear-gradient(135deg, #CBD5E1 0%, #475569 50%, #0F172A 100%)',
    defaultSize: 50,
    defaultOpacity: 0.9,
    defaultColor: '#E2E8F0',
    blendMode: 'hard-light',
    patternSvg: `
      <pattern id="brush-damascus-flow" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M0,10 Q15,22 30,10 T60,10" stroke="#E2E8F0" stroke-width="2" fill="none" opacity="0.9"/>
        <path d="M0,25 Q15,37 30,25 T60,25" stroke="#94A3B8" stroke-width="1.5" fill="none" opacity="0.75"/>
        <path d="M0,40 Q15,52 30,40 T60,40" stroke="#F1F5F9" stroke-width="2.2" fill="none" opacity="0.85"/>
        <path d="M0,55 Q15,42 30,55 T60,55" stroke="#64748B" stroke-width="1.8" fill="none" opacity="0.7"/>
      </pattern>
    `
  },
  {
    id: 'brushed-titanium',
    name: 'Brushed Titanium Satin',
    category: 'metallic',
    description: 'Directional aerospace satin passivated titanium with high-tensile micro-grooves.',
    accentColor: '#CBD5E1',
    previewGradient: 'linear-gradient(90deg, #475569 0%, #E2E8F0 50%, #334155 100%)',
    defaultSize: 50,
    defaultOpacity: 0.85,
    defaultColor: '#F8FAFC',
    blendMode: 'overlay',
    patternSvg: `
      <pattern id="brush-brushed-titanium" width="80" height="8" patternUnits="userSpaceOnUse">
        <line x1="0" y1="1" x2="80" y2="1" stroke="#FFFFFF" stroke-width="0.9" opacity="0.9"/>
        <line x1="0" y1="3" x2="80" y2="3" stroke="#94A3B8" stroke-width="0.6" opacity="0.5"/>
        <line x1="0" y1="5" x2="80" y2="5" stroke="#E2E8F0" stroke-width="0.8" opacity="0.8"/>
        <line x1="0" y1="7" x2="80" y2="7" stroke="#475569" stroke-width="0.5" opacity="0.4"/>
      </pattern>
    `
  },
  {
    id: 'gold-flake',
    name: '24K Gilded Gold Leaf',
    category: 'metallic',
    description: 'Hammered gold bullion foil with gilded leafing tears and royal specular highlights.',
    accentColor: '#EAB308',
    previewGradient: 'linear-gradient(135deg, #FEF08A 0%, #EAB308 50%, #713F12 100%)',
    defaultSize: 45,
    defaultOpacity: 0.9,
    defaultColor: '#FDE047',
    blendMode: 'color-dodge',
    patternSvg: `
      <pattern id="brush-gold-flake" width="70" height="70" patternUnits="userSpaceOnUse">
        <polygon points="5,10 25,5 18,30" fill="#FEF08A" opacity="0.95"/>
        <polygon points="40,15 65,8 55,38" fill="#EAB308" opacity="0.85"/>
        <polygon points="12,45 38,40 28,65" fill="#FDE047" opacity="0.9"/>
        <polygon points="45,48 68,42 60,65" fill="#CA8A04" opacity="0.8"/>
        <circle cx="35" cy="35" r="2" fill="#FFFFFF" opacity="0.95"/>
      </pattern>
    `
  }
];
