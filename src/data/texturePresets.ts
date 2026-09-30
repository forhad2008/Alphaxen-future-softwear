import { FontTextureConfig, TexturePresetId } from '../types/fontLab';

export interface TexturePresetDefinition {
  id: TexturePresetId;
  name: string;
  category: 'Stone' | 'Grunge' | 'Metallic' | 'Mineral' | 'Planet' | 'Object' | 'Watermark' | 'Futuristic' | 'Organic';
  description: string;
  accentColor: string;
  previewGradient: string;
  defaultStops: Array<{ offset: number; color: string }>;
  svgPatternSvg: string; // SVG pattern content for <defs>
  cssFilter?: string;
  blendMode: 'normal' | 'multiply' | 'screen' | 'overlay' | 'color-dodge' | 'hard-light' | 'soft-light' | 'luminosity';
  roughness: number;
  bevelDepth: number;
}

export const TEXTURE_PRESETS: TexturePresetDefinition[] = [
  // ─── 1. STONE & MINERAL ──────────────────────────────────────────
  {
    id: 'obsidian',
    name: 'Obsidian Magma',
    category: 'Stone',
    description: 'Vitreous volcanic basalt rock with incandescent crimson fissures and crystalline fractures.',
    accentColor: '#EF4444',
    previewGradient: 'linear-gradient(135deg, #18181b 0%, #09090b 50%, #dc2626 100%)',
    defaultStops: [
      { offset: 0, color: '#FAFAFA' },
      { offset: 0.35, color: '#A1A1AA' },
      { offset: 0.7, color: '#DC2626' },
      { offset: 1, color: '#450A0A' }
    ],
    blendMode: 'overlay',
    roughness: 45,
    bevelDepth: 12,
    svgPatternSvg: `
      <pattern id="pattern-obsidian" width="120" height="120" patternUnits="userSpaceOnUse">
        <rect width="120" height="120" fill="#0A0A0C"/>
        <path d="M0,20 Q30,5 60,30 T120,15" stroke="#DC2626" stroke-width="1.8" fill="none" opacity="0.85"/>
        <path d="M10,80 Q45,60 80,95 T120,70" stroke="#EF4444" stroke-width="1.4" fill="none" opacity="0.6"/>
        <path d="M40,0 L70,50 L40,120" stroke="#7F1D1D" stroke-width="0.8" fill="none" opacity="0.5"/>
        <circle cx="25" cy="45" r="1.5" fill="#F87171" opacity="0.9"/>
        <circle cx="85" cy="25" r="1.2" fill="#FCA5A5" opacity="0.8"/>
        <circle cx="105" cy="90" r="2" fill="#EF4444" opacity="0.7"/>
        <polygon points="55,35 65,30 60,42" fill="#DC2626" opacity="0.6"/>
      </pattern>
    `
  },
  {
    id: 'stone-basalt',
    name: 'Volcanic Basalt',
    category: 'Stone',
    description: 'Porous igneous vesicular basalt rock with micro-craters and obsidian fractures.',
    accentColor: '#52525B',
    previewGradient: 'linear-gradient(135deg, #27272a 0%, #09090b 60%, #18181b 100%)',
    defaultStops: [
      { offset: 0, color: '#71717A' },
      { offset: 0.5, color: '#27272A' },
      { offset: 1, color: '#09090B' }
    ],
    blendMode: 'overlay',
    roughness: 65,
    bevelDepth: 10,
    svgPatternSvg: `
      <pattern id="pattern-stone-basalt" width="70" height="70" patternUnits="userSpaceOnUse">
        <rect width="70" height="70" fill="#121214"/>
        <circle cx="15" cy="18" r="4" fill="#000000" opacity="0.85"/>
        <circle cx="50" cy="45" r="5.5" fill="#000000" opacity="0.8"/>
        <circle cx="35" cy="60" r="2.5" fill="#000000" opacity="0.7"/>
        <circle cx="60" cy="12" r="3" fill="#000000" opacity="0.75"/>
        <path d="M0,35 Q20,38 40,32 T70,36" stroke="#3F3F46" stroke-width="1.2" fill="none" opacity="0.5"/>
        <circle cx="15" cy="18" r="3" stroke="#27272A" stroke-width="0.8" fill="none"/>
      </pattern>
    `
  },
  {
    id: 'stone-granite',
    name: 'Chiseled Granite',
    category: 'Stone',
    description: 'Polished crystalline granite aggregate with feldspar, quartz, and mica flakes.',
    accentColor: '#A1A1AA',
    previewGradient: 'linear-gradient(135deg, #71717a 0%, #3f3f46 50%, #18181b 100%)',
    defaultStops: [
      { offset: 0, color: '#E4E4E7' },
      { offset: 0.5, color: '#71717A' },
      { offset: 1, color: '#18181B' }
    ],
    blendMode: 'hard-light',
    roughness: 55,
    bevelDepth: 11,
    svgPatternSvg: `
      <pattern id="pattern-stone-granite" width="50" height="50" patternUnits="userSpaceOnUse">
        <rect width="50" height="50" fill="#27272A"/>
        <rect x="5" y="8" width="4" height="3" fill="#E4E4E7" opacity="0.7"/>
        <rect x="28" y="32" width="5" height="4" fill="#F4F4F5" opacity="0.8"/>
        <rect x="38" y="12" width="3" height="3" fill="#09090B" opacity="0.9"/>
        <rect x="12" y="38" width="4" height="2" fill="#09090B" opacity="0.85"/>
        <circle cx="22" cy="20" r="2.5" fill="#A1A1AA" opacity="0.6"/>
        <circle cx="42" cy="42" r="1.5" fill="#D4D4D8" opacity="0.7"/>
      </pattern>
    `
  },
  {
    id: 'stone-quartz',
    name: 'Carrara Quartz',
    category: 'Stone',
    description: 'Luminescent crystalline white quartz mineral with subtle grey internal cleavage veining.',
    accentColor: '#F4F4F5',
    previewGradient: 'linear-gradient(135deg, #ffffff 0%, #e4e4e7 50%, #a1a1aa 100%)',
    defaultStops: [
      { offset: 0, color: '#FFFFFF' },
      { offset: 0.6, color: '#E4E4E7' },
      { offset: 1, color: '#A1A1AA' }
    ],
    blendMode: 'screen',
    roughness: 25,
    bevelDepth: 13,
    svgPatternSvg: `
      <pattern id="pattern-stone-quartz" width="100" height="100" patternUnits="userSpaceOnUse">
        <rect width="100" height="100" fill="#F4F4F5"/>
        <path d="M10,0 Q35,40 50,55 T90,100" stroke="#CBD5E1" stroke-width="2" fill="none" opacity="0.65"/>
        <path d="M50,55 Q65,40 85,25" stroke="#94A3B8" stroke-width="1.2" fill="none" opacity="0.5"/>
        <path d="M0,80 Q30,70 60,85 T100,75" stroke="#E2E8F0" stroke-width="2.5" fill="none" opacity="0.8"/>
        <polygon points="20,25 32,20 28,35" fill="#FFFFFF" opacity="0.9"/>
        <polygon points="70,65 82,60 78,75" fill="#FFFFFF" opacity="0.9"/>
      </pattern>
    `
  },
  {
    id: 'marble',
    name: 'Imperial Black Marble',
    category: 'Stone',
    description: 'Polished Nero Marquina black marble with high-contrast golden and white calcite veins.',
    accentColor: '#EAB308',
    previewGradient: 'linear-gradient(135deg, #09090b 0%, #18181b 50%, #eab308 100%)',
    defaultStops: [
      { offset: 0, color: '#FFFFFF' },
      { offset: 0.3, color: '#EAB308' },
      { offset: 0.8, color: '#18181B' },
      { offset: 1, color: '#09090B' }
    ],
    blendMode: 'overlay',
    roughness: 20,
    bevelDepth: 15,
    svgPatternSvg: `
      <pattern id="pattern-marble" width="160" height="160" patternUnits="userSpaceOnUse">
        <rect width="160" height="160" fill="#0D0D11"/>
        <path d="M0,30 Q40,60 80,40 T160,50" stroke="#FDE047" stroke-width="1.8" fill="none" opacity="0.75"/>
        <path d="M80,40 Q110,80 130,120 T150,160" stroke="#FFFFFF" stroke-width="1.4" fill="none" opacity="0.8"/>
        <path d="M10,120 Q50,100 90,130 T160,110" stroke="#CA8A04" stroke-width="1.2" fill="none" opacity="0.6"/>
        <path d="M30,0 Q60,40 40,80" stroke="#E4E4E7" stroke-width="0.8" fill="none" opacity="0.5"/>
      </pattern>
    `
  },

  // ─── 2. GRUNGE & INDUSTRIAL ───────────────────────────────────────
  {
    id: 'grunge-acid',
    name: 'Acid Spatter Distress',
    category: 'Grunge',
    description: 'Etched chemical acid burn distress with corrosive droplet splatter patterns.',
    accentColor: '#E11D48',
    previewGradient: 'linear-gradient(135deg, #e11d48 0%, #4c0519 60%, #0f172a 100%)',
    defaultStops: [
      { offset: 0, color: '#FB7185' },
      { offset: 0.5, color: '#E11D48' },
      { offset: 1, color: '#4C0519' }
    ],
    blendMode: 'color-dodge',
    roughness: 80,
    bevelDepth: 8,
    svgPatternSvg: `
      <pattern id="pattern-grunge-acid" width="90" height="90" patternUnits="userSpaceOnUse">
        <rect width="90" height="90" fill="#0C0A09"/>
        <circle cx="20" cy="25" r="6" fill="#F43F5E" opacity="0.7"/>
        <circle cx="23" cy="22" r="3" fill="#FDA4AF" opacity="0.9"/>
        <circle cx="65" cy="55" r="8" fill="#E11D48" opacity="0.75"/>
        <circle cx="68" cy="52" r="4" fill="#FECDD3" opacity="0.95"/>
        <circle cx="45" cy="75" r="3" fill="#BE123C" opacity="0.6"/>
        <circle cx="75" cy="15" r="4" fill="#FB7185" opacity="0.7"/>
        <path d="M10,45 Q25,50 35,40 T55,60" stroke="#E11D48" stroke-width="1.5" fill="none" opacity="0.65"/>
      </pattern>
    `
  },
  {
    id: 'grunge-scratches',
    name: 'Steel Blade Scratches',
    category: 'Grunge',
    description: 'High-density multi-directional abrasion gouges, razor scratches, and surface wear.',
    accentColor: '#94A3B8',
    previewGradient: 'linear-gradient(135deg, #475569 0%, #1e293b 60%, #0f172a 100%)',
    defaultStops: [
      { offset: 0, color: '#CBD5E1' },
      { offset: 0.5, color: '#64748B' },
      { offset: 1, color: '#0F172A' }
    ],
    blendMode: 'overlay',
    roughness: 70,
    bevelDepth: 9,
    svgPatternSvg: `
      <pattern id="pattern-grunge-scratches" width="80" height="80" patternUnits="userSpaceOnUse">
        <rect width="80" height="80" fill="#111827"/>
        <line x1="5" y1="10" x2="65" y2="70" stroke="#E2E8F0" stroke-width="1.2" opacity="0.7"/>
        <line x1="15" y1="5" x2="75" y2="65" stroke="#94A3B8" stroke-width="0.8" opacity="0.8"/>
        <line x1="70" y1="15" x2="10" y2="75" stroke="#CBD5E1" stroke-width="1" opacity="0.65"/>
        <line x1="25" y1="40" x2="55" y2="70" stroke="#F8FAFC" stroke-width="1.5" opacity="0.75"/>
        <line x1="40" y1="5" x2="70" y2="35" stroke="#64748B" stroke-width="0.7" opacity="0.6"/>
      </pattern>
    `
  },
  {
    id: 'grunge-decay',
    name: 'Industrial Rust & Decay',
    category: 'Grunge',
    description: 'Deep oxidized iron rust crusting with peeling paint flakes and corrosion patina.',
    accentColor: '#EA580C',
    previewGradient: 'linear-gradient(135deg, #ea580c 0%, #7c2d12 50%, #1c1917 100%)',
    defaultStops: [
      { offset: 0, color: '#FDBA74' },
      { offset: 0.4, color: '#EA580C' },
      { offset: 0.8, color: '#7C2D12' },
      { offset: 1, color: '#1C1917' }
    ],
    blendMode: 'hard-light',
    roughness: 90,
    bevelDepth: 14,
    svgPatternSvg: `
      <pattern id="pattern-grunge-decay" width="100" height="100" patternUnits="userSpaceOnUse">
        <rect width="100" height="100" fill="#1C1917"/>
        <path d="M10,20 Q30,10 50,30 T90,20 L90,50 Q70,70 40,55 T10,70 Z" fill="#9A3412" opacity="0.8"/>
        <circle cx="30" cy="35" r="7" fill="#EA580C" opacity="0.85"/>
        <circle cx="65" cy="70" r="9" fill="#C2410C" opacity="0.9"/>
        <path d="M0,80 Q40,65 80,85 T100,75" stroke="#F97316" stroke-width="2" fill="none" opacity="0.7"/>
        <rect x="75" y="10" width="15" height="12" fill="#7C2D12" opacity="0.85"/>
      </pattern>
    `
  },
  {
    id: 'concrete-cracks',
    name: 'Brutalist Cracked Concrete',
    category: 'Grunge',
    description: 'Cast urban concrete slab with branching structural stress cracks and rough aggregate.',
    accentColor: '#9CA3AF',
    previewGradient: 'linear-gradient(135deg, #6b7280 0%, #374151 60%, #111827 100%)',
    defaultStops: [
      { offset: 0, color: '#D1D5DB' },
      { offset: 0.5, color: '#6B7280' },
      { offset: 1, color: '#1F2937' }
    ],
    blendMode: 'overlay',
    roughness: 75,
    bevelDepth: 10,
    svgPatternSvg: `
      <pattern id="pattern-concrete-cracks" width="110" height="110" patternUnits="userSpaceOnUse">
        <rect width="110" height="110" fill="#2E3440"/>
        <path d="M10,0 L35,40 L30,65 L60,85 L85,110" stroke="#000000" stroke-width="2.2" fill="none" opacity="0.9"/>
        <path d="M35,40 L65,30 L95,45" stroke="#111827" stroke-width="1.6" fill="none" opacity="0.85"/>
        <path d="M60,85 L85,75 L110,80" stroke="#000000" stroke-width="1.4" fill="none" opacity="0.8"/>
        <circle cx="15" cy="80" r="1.5" fill="#9CA3AF" opacity="0.7"/>
        <circle cx="80" cy="20" r="2" fill="#D1D5DB" opacity="0.8"/>
      </pattern>
    `
  },

  // ─── 3. METALLIC & SPECULAR ───────────────────────────────────────
  {
    id: 'chrome',
    name: 'Liquid Chrome',
    category: 'Metallic',
    description: 'High-specular liquid mercury with surreal horizon reflections and mirrored luminance.',
    accentColor: '#E2E8F0',
    previewGradient: 'linear-gradient(135deg, #ffffff 0%, #64748b 30%, #ffffff 50%, #1e293b 70%, #f8fafc 100%)',
    defaultStops: [
      { offset: 0, color: '#FFFFFF' },
      { offset: 0.25, color: '#94A3B8' },
      { offset: 0.5, color: '#FFFFFF' },
      { offset: 0.75, color: '#334155' },
      { offset: 1, color: '#F1F5F9' }
    ],
    blendMode: 'screen',
    roughness: 10,
    bevelDepth: 16,
    svgPatternSvg: `
      <pattern id="pattern-chrome" width="200" height="200" patternUnits="userSpaceOnUse">
        <rect width="200" height="200" fill="#1E293B"/>
        <path d="M0,50 Q100,20 200,60 L200,100 Q100,70 0,90 Z" fill="#F8FAFC" opacity="0.85"/>
        <path d="M0,120 Q100,140 200,110 L200,150 Q100,170 0,140 Z" fill="#94A3B8" opacity="0.5"/>
        <line x1="0" y1="100" x2="200" y2="100" stroke="#FFFFFF" stroke-width="2.5" opacity="0.9"/>
        <line x1="0" y1="104" x2="200" y2="104" stroke="#0F172A" stroke-width="1.5" opacity="0.7"/>
      </pattern>
    `
  },
  {
    id: 'damascus',
    name: 'Damascus Steel',
    category: 'Metallic',
    description: 'Folded crucible carbon steel with organic woodgrain wave lines and tempered blade grain.',
    accentColor: '#94A3B8',
    previewGradient: 'linear-gradient(135deg, #1e293b 0%, #475569 50%, #0f172a 100%)',
    defaultStops: [
      { offset: 0, color: '#E2E8F0' },
      { offset: 0.45, color: '#64748B' },
      { offset: 0.8, color: '#334155' },
      { offset: 1, color: '#0F172A' }
    ],
    blendMode: 'hard-light',
    roughness: 50,
    bevelDepth: 14,
    svgPatternSvg: `
      <pattern id="pattern-damascus" width="80" height="80" patternUnits="userSpaceOnUse">
        <rect width="80" height="80" fill="#18181B"/>
        <path d="M0,10 Q20,25 40,10 T80,10" stroke="#71717A" stroke-width="2" fill="none" opacity="0.8"/>
        <path d="M0,25 Q20,40 40,25 T80,25" stroke="#A1A1AA" stroke-width="1.5" fill="none" opacity="0.7"/>
        <path d="M0,45 Q20,30 40,45 T80,45" stroke="#52525B" stroke-width="2.5" fill="none" opacity="0.85"/>
        <path d="M0,60 Q20,75 40,60 T80,60" stroke="#D4D4D8" stroke-width="1" fill="none" opacity="0.6"/>
        <path d="M0,75 Q20,60 40,75 T80,75" stroke="#3F3F46" stroke-width="2" fill="none" opacity="0.75"/>
      </pattern>
    `
  },
  {
    id: 'gold',
    name: 'Imperial Gold Leaf',
    category: 'Metallic',
    description: '24K hammered beaten gold leaf foil with micro-embossed guilding shimmer.',
    accentColor: '#F59E0B',
    previewGradient: 'linear-gradient(135deg, #fef08a 0%, #d97706 40%, #b45309 80%, #78350f 100%)',
    defaultStops: [
      { offset: 0, color: '#FEF08A' },
      { offset: 0.35, color: '#F59E0B' },
      { offset: 0.75, color: '#B45309' },
      { offset: 1, color: '#78350F' }
    ],
    blendMode: 'color-dodge',
    roughness: 30,
    bevelDepth: 18,
    svgPatternSvg: `
      <pattern id="pattern-gold" width="100" height="100" patternUnits="userSpaceOnUse">
        <rect width="100" height="100" fill="#B45309"/>
        <path d="M0,20 L30,0 L60,30 L100,10" stroke="#FEF08A" stroke-width="1.5" fill="none" opacity="0.85"/>
        <path d="M10,60 L45,40 L70,80 L100,55" stroke="#FDE047" stroke-width="2" fill="none" opacity="0.8"/>
        <polygon points="25,45 35,38 30,52" fill="#FEF9C3" opacity="0.9"/>
        <polygon points="75,25 85,18 80,32" fill="#FEF9C3" opacity="0.9"/>
      </pattern>
    `
  },
  {
    id: 'titanium',
    name: 'Anodized Titanium',
    category: 'Metallic',
    description: 'Thermal heat-treated iridescent aerospace grade titanium with spectrum oil-slick tint.',
    accentColor: '#818CF8',
    previewGradient: 'linear-gradient(135deg, #818cf8 0%, #c084fc 35%, #38bdf8 70%, #1e1b4b 100%)',
    defaultStops: [
      { offset: 0, color: '#A5B4FC' },
      { offset: 0.35, color: '#C084FC' },
      { offset: 0.7, color: '#38BDF8' },
      { offset: 1, color: '#1E1B4B' }
    ],
    blendMode: 'screen',
    roughness: 15,
    bevelDepth: 14,
    svgPatternSvg: `
      <pattern id="pattern-titanium" width="140" height="140" patternUnits="userSpaceOnUse">
        <rect width="140" height="140" fill="#1E1B4B"/>
        <path d="M0,40 Q70,10 140,50 L140,90 Q70,60 0,80 Z" fill="#818CF8" opacity="0.75"/>
        <path d="M0,90 Q70,70 140,110 L140,140 Q70,120 0,130 Z" fill="#38BDF8" opacity="0.6"/>
        <line x1="0" y1="65" x2="140" y2="65" stroke="#E0E7FF" stroke-width="1.8" opacity="0.9"/>
      </pattern>
    `
  },
  {
    id: 'metallic-bronze',
    name: 'Antique Cast Bronze',
    category: 'Metallic',
    description: 'Patinated ancient cast bronze with aged copper verdigris oxidation hints.',
    accentColor: '#D97706',
    previewGradient: 'linear-gradient(135deg, #d97706 0%, #78350f 60%, #14532d 100%)',
    defaultStops: [
      { offset: 0, color: '#FCD34D' },
      { offset: 0.45, color: '#B45309' },
      { offset: 0.8, color: '#78350F' },
      { offset: 1, color: '#064E3B' }
    ],
    blendMode: 'hard-light',
    roughness: 60,
    bevelDepth: 12,
    svgPatternSvg: `
      <pattern id="pattern-metallic-bronze" width="90" height="90" patternUnits="userSpaceOnUse">
        <rect width="90" height="90" fill="#451A03"/>
        <circle cx="30" cy="30" r="8" fill="#047857" opacity="0.6"/>
        <circle cx="70" cy="65" r="10" fill="#065F46" opacity="0.65"/>
        <path d="M0,45 Q45,20 90,50" stroke="#F59E0B" stroke-width="2" fill="none" opacity="0.8"/>
        <circle cx="45" cy="70" r="3" fill="#34D399" opacity="0.7"/>
      </pattern>
    `
  },

  // ─── 4. PLANETS & COSMIC EARTH ────────────────────────────────────
  {
    id: 'earth',
    name: 'Earth Biosphere',
    category: 'Planet',
    description: 'Orbital satellite vista of deep blue oceans, lush emerald continents, and swirling white cloud spirals.',
    accentColor: '#38BDF8',
    previewGradient: 'linear-gradient(135deg, #0284c7 0%, #10b981 40%, #0369a1 70%, #ffffff 100%)',
    defaultStops: [
      { offset: 0, color: '#BAE6FD' },
      { offset: 0.35, color: '#0284C7' },
      { offset: 0.65, color: '#10B981' },
      { offset: 1, color: '#082F49' }
    ],
    blendMode: 'overlay',
    roughness: 30,
    bevelDepth: 14,
    svgPatternSvg: `
      <pattern id="pattern-earth" width="180" height="180" patternUnits="userSpaceOnUse">
        <rect width="180" height="180" fill="#0369A1"/>
        <!-- Continents -->
        <path d="M20,40 Q45,20 70,35 Q100,50 85,90 Q65,110 35,95 Q15,75 20,40 Z" fill="#059669" opacity="0.85"/>
        <path d="M110,80 Q140,60 165,85 Q170,125 140,140 Q115,130 110,80 Z" fill="#10B981" opacity="0.8"/>
        <path d="M40,130 Q60,120 75,140 Q70,170 45,165 Z" fill="#047857" opacity="0.75"/>
        <!-- Swirling Cloud Formations -->
        <path d="M0,60 Q60,30 120,70 T180,45" stroke="#FFFFFF" stroke-width="4.5" fill="none" opacity="0.85" stroke-linecap="round"/>
        <path d="M30,110 Q90,80 150,120" stroke="#F0F9FF" stroke-width="3" fill="none" opacity="0.75"/>
        <path d="M60,15 Q110,40 160,15" stroke="#FFFFFF" stroke-width="2.5" fill="none" opacity="0.8"/>
      </pattern>
    `
  },
  {
    id: 'mars',
    name: 'Mars Red Planet',
    category: 'Planet',
    description: 'Rust-colored Martian terrain with basalt canyon chasms, iron oxide dust storms, and impact craters.',
    accentColor: '#EF4444',
    previewGradient: 'linear-gradient(135deg, #f87171 0%, #dc2626 45%, #991b1b 80%, #450a0a 100%)',
    defaultStops: [
      { offset: 0, color: '#FECACA' },
      { offset: 0.35, color: '#EF4444' },
      { offset: 0.7, color: '#991B1B' },
      { offset: 1, color: '#450A0A' }
    ],
    blendMode: 'hard-light',
    roughness: 65,
    bevelDepth: 15,
    svgPatternSvg: `
      <pattern id="pattern-mars" width="130" height="130" patternUnits="userSpaceOnUse">
        <rect width="130" height="130" fill="#7F1D1D"/>
        <!-- Canyon Rift (Valles Marineris) -->
        <path d="M0,65 Q40,50 80,75 T130,60" stroke="#450A0A" stroke-width="5" fill="none" opacity="0.9"/>
        <path d="M0,65 Q40,50 80,75 T130,60" stroke="#DC2626" stroke-width="1.8" fill="none" opacity="0.85"/>
        <!-- Martian Craters -->
        <circle cx="35" cy="25" r="9" stroke="#991B1B" stroke-width="2" fill="#450A0A" opacity="0.8"/>
        <circle cx="95" cy="95" r="14" stroke="#B91C1C" stroke-width="2.5" fill="#450A0A" opacity="0.85"/>
        <circle cx="100" cy="30" r="5" stroke="#7F1D1D" stroke-width="1.5" fill="#450A0A" opacity="0.75"/>
        <!-- Dust Streaks -->
        <line x1="10" y1="105" x2="60" y2="120" stroke="#FCA5A5" stroke-width="1.5" opacity="0.6"/>
      </pattern>
    `
  },
  {
    id: 'jupiter',
    name: 'Jupiter Gas Giant',
    category: 'Planet',
    description: 'Atmospheric ammonia and methane cloud bands with dynamic vortices and the iconic Great Red Spot.',
    accentColor: '#F59E0B',
    previewGradient: 'linear-gradient(135deg, #fef3c7 0%, #f59e0b 35%, #b45309 70%, #78350f 100%)',
    defaultStops: [
      { offset: 0, color: '#FEF3C7' },
      { offset: 0.3, color: '#F59E0B' },
      { offset: 0.65, color: '#B45309' },
      { offset: 1, color: '#78350F' }
    ],
    blendMode: 'overlay',
    roughness: 40,
    bevelDepth: 13,
    svgPatternSvg: `
      <pattern id="pattern-jupiter" width="160" height="160" patternUnits="userSpaceOnUse">
        <rect width="160" height="160" fill="#78350F"/>
        <!-- Alternating Gas Belts -->
        <path d="M0,20 Q80,10 160,25 L160,45 Q80,55 0,40 Z" fill="#D97706" opacity="0.85"/>
        <path d="M0,60 Q80,75 160,60 L160,85 Q80,70 0,90 Z" fill="#FDE68A" opacity="0.75"/>
        <path d="M0,105 Q80,95 160,110 L160,135 Q80,145 0,130 Z" fill="#B45309" opacity="0.9"/>
        <!-- The Great Red Spot -->
        <ellipse cx="110" cy="72" rx="24" ry="14" fill="#DC2626" opacity="0.9"/>
        <ellipse cx="110" cy="72" rx="16" ry="8" fill="#B91C1C" opacity="0.85"/>
        <path d="M80,70 Q110,62 140,75" stroke="#FEF08A" stroke-width="1.5" fill="none" opacity="0.7"/>
      </pattern>
    `
  },
  {
    id: 'moon',
    name: 'Lunar Regolith',
    category: 'Planet',
    description: 'High-contrast monochrome lunar surface with dense impact crater rings, ejecta rays, and dark basalt maria.',
    accentColor: '#E4E4E7',
    previewGradient: 'linear-gradient(135deg, #f4f4f5 0%, #a1a1aa 45%, #3f3f46 80%, #09090b 100%)',
    defaultStops: [
      { offset: 0, color: '#FFFFFF' },
      { offset: 0.4, color: '#A1A1AA' },
      { offset: 0.8, color: '#3F3F46' },
      { offset: 1, color: '#09090B' }
    ],
    blendMode: 'overlay',
    roughness: 60,
    bevelDepth: 12,
    svgPatternSvg: `
      <pattern id="pattern-moon" width="100" height="100" patternUnits="userSpaceOnUse">
        <rect width="100" height="100" fill="#18181B"/>
        <!-- Basalt Sea / Maria -->
        <path d="M10,15 Q40,5 60,25 Q80,50 50,60 Q20,55 10,15 Z" fill="#09090B" opacity="0.9"/>
        <!-- Impact Craters with Ejecta -->
        <circle cx="75" cy="75" r="12" stroke="#E4E4E7" stroke-width="2" fill="#27272A"/>
        <circle cx="75" cy="75" r="4" fill="#09090B"/>
        <line x1="75" y1="60" x2="75" y2="45" stroke="#FFFFFF" stroke-width="1" opacity="0.8"/>
        <line x1="90" y1="75" x2="100" y2="75" stroke="#FFFFFF" stroke-width="1" opacity="0.8"/>
        <circle cx="30" cy="80" r="7" stroke="#A1A1AA" stroke-width="1.5" fill="#18181B"/>
        <circle cx="85" cy="25" r="5" stroke="#71717A" stroke-width="1.2" fill="#27272A"/>
      </pattern>
    `
  },
  {
    id: 'sun',
    name: 'Solar Plasma Corona',
    category: 'Planet',
    description: 'Thermonuclear solar flares with convective granulation cells, plasma loops, and incandescent light.',
    accentColor: '#FBBF24',
    previewGradient: 'linear-gradient(135deg, #ffffff 0%, #fbbf24 30%, #ea580c 70%, #7f1d1d 100%)',
    defaultStops: [
      { offset: 0, color: '#FFFFFF' },
      { offset: 0.3, color: '#FBBF24' },
      { offset: 0.65, color: '#EA580C' },
      { offset: 1, color: '#7F1D1D' }
    ],
    blendMode: 'screen',
    roughness: 45,
    bevelDepth: 16,
    svgPatternSvg: `
      <pattern id="pattern-sun" width="120" height="120" patternUnits="userSpaceOnUse">
        <rect width="120" height="120" fill="#9A3412"/>
        <!-- Solar Plasma Filaments -->
        <path d="M0,30 Q30,60 60,20 T120,40" stroke="#FDE047" stroke-width="3" fill="none" opacity="0.9"/>
        <path d="M10,80 Q50,40 90,95 T120,70" stroke="#F97316" stroke-width="3.5" fill="none" opacity="0.85"/>
        <path d="M30,0 Q60,80 30,120" stroke="#FEF08A" stroke-width="2" fill="none" opacity="0.8"/>
        <!-- Granulation Nodes -->
        <circle cx="60" cy="60" r="10" fill="#FEF08A" opacity="0.85"/>
        <circle cx="20" cy="90" r="6" fill="#FDE047" opacity="0.75"/>
        <circle cx="100" cy="25" r="7" fill="#FBBF24" opacity="0.8"/>
      </pattern>
    `
  },

  // ─── 5. OBJECT & TEXTILE TEXTURES ─────────────────────────────────
  {
    id: 'carbon-fiber',
    name: 'Carbon Fiber Weave',
    category: 'Object',
    description: '2x2 twill aerospace carbon composite weave with anisotropic light reflections.',
    accentColor: '#38BDF8',
    previewGradient: 'linear-gradient(135deg, #27272a 0%, #09090b 50%, #18181b 100%)',
    defaultStops: [
      { offset: 0, color: '#71717A' },
      { offset: 0.5, color: '#27272A' },
      { offset: 1, color: '#09090B' }
    ],
    blendMode: 'overlay',
    roughness: 20,
    bevelDepth: 10,
    svgPatternSvg: `
      <pattern id="pattern-carbon-fiber" width="24" height="24" patternUnits="userSpaceOnUse">
        <rect width="24" height="24" fill="#09090B"/>
        <rect x="0" y="0" width="12" height="12" fill="#18181B"/>
        <rect x="12" y="12" width="12" height="12" fill="#18181B"/>
        <line x1="0" y1="0" x2="12" y2="12" stroke="#3F3F46" stroke-width="1.2"/>
        <line x1="12" y1="12" x2="24" y2="24" stroke="#3F3F46" stroke-width="1.2"/>
        <line x1="12" y1="0" x2="0" y2="12" stroke="#27272A" stroke-width="0.8"/>
        <line x1="24" y1="12" x2="12" y2="24" stroke="#27272A" stroke-width="0.8"/>
      </pattern>
    `
  },
  {
    id: 'dragon-scales',
    name: 'Dragon Scale Armor',
    category: 'Object',
    description: 'Overlapping iridescent reptile dragon scales with obsidian ridged plates and specular spine highlights.',
    accentColor: '#E11D48',
    previewGradient: 'linear-gradient(135deg, #be123c 0%, #881337 45%, #18181b 100%)',
    defaultStops: [
      { offset: 0, color: '#FDA4AF' },
      { offset: 0.4, color: '#E11D48' },
      { offset: 0.8, color: '#881337' },
      { offset: 1, color: '#09090B' }
    ],
    blendMode: 'hard-light',
    roughness: 35,
    bevelDepth: 18,
    svgPatternSvg: `
      <pattern id="pattern-dragon-scales" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="40" height="40" fill="#0C0A09"/>
        <!-- Scale 1 -->
        <path d="M20,0 Q35,15 20,30 Q5,15 20,0 Z" fill="#9F1239" stroke="#E11D48" stroke-width="1.2"/>
        <line x1="20" y1="4" x2="20" y2="26" stroke="#FDA4AF" stroke-width="1.4"/>
        <!-- Scale 2 (Offset) -->
        <path d="M0,20 Q15,35 0,50 Q-15,35 0,20 Z" fill="#881337" stroke="#E11D48" stroke-width="1"/>
        <path d="M40,20 Q55,35 40,50 Q25,35 40,20 Z" fill="#881337" stroke="#E11D48" stroke-width="1"/>
      </pattern>
    `
  },
  {
    id: 'cyber-circuit',
    name: 'Cyberpunk PCB Circuit',
    category: 'Object',
    description: 'Matte black printed circuit board with copper PCB traces, solder micro-vias, and neon routing pathways.',
    accentColor: '#10B981',
    previewGradient: 'linear-gradient(135deg, #064e3b 0%, #022c22 60%, #000000 100%)',
    defaultStops: [
      { offset: 0, color: '#6EE7B7' },
      { offset: 0.4, color: '#10B981' },
      { offset: 0.8, color: '#064E3B' },
      { offset: 1, color: '#022C22' }
    ],
    blendMode: 'screen',
    roughness: 15,
    bevelDepth: 12,
    svgPatternSvg: `
      <pattern id="pattern-cyber-circuit" width="60" height="60" patternUnits="userSpaceOnUse">
        <rect width="60" height="60" fill="#022C22"/>
        <!-- Circuit Traces -->
        <path d="M0,15 L25,15 L35,25 L60,25" stroke="#34D399" stroke-width="1.8" fill="none"/>
        <path d="M15,60 L15,40 L30,25" stroke="#10B981" stroke-width="1.4" fill="none"/>
        <path d="M45,0 L45,20 L55,30 L55,60" stroke="#059669" stroke-width="1.5" fill="none"/>
        <!-- Vias / Solder Pads -->
        <circle cx="25" cy="15" r="3" fill="#6EE7B7" stroke="#064E3B" stroke-width="1"/>
        <circle cx="35" cy="25" r="3" fill="#6EE7B7" stroke="#064E3B" stroke-width="1"/>
        <circle cx="15" cy="40" r="3" fill="#A7F3D0"/>
        <circle cx="55" cy="30" r="3" fill="#6EE7B7"/>
      </pattern>
    `
  },

  // ─── 6. WATERMARKS & SECURITY ENGRAVINGS ───────────────────────────
  {
    id: 'watermark-security',
    name: 'Confidential Security Stamp',
    category: 'Watermark',
    description: '45-degree diagonal security watermark stamp with micro-line guilloche and verification seals.',
    accentColor: '#EF4444',
    previewGradient: 'linear-gradient(135deg, #fca5a5 0%, #ef4444 50%, #991b1b 100%)',
    defaultStops: [
      { offset: 0, color: '#FEE2E2' },
      { offset: 0.5, color: '#EF4444' },
      { offset: 1, color: '#7F1D1D' }
    ],
    blendMode: 'overlay',
    roughness: 20,
    bevelDepth: 8,
    svgPatternSvg: `
      <pattern id="pattern-watermark-security" width="120" height="120" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
        <rect width="120" height="120" fill="transparent"/>
        <text x="5" y="30" font-family="monospace" font-size="11" font-weight="bold" fill="#DC2626" opacity="0.6" letter-spacing="2">
          CONFIDENTIAL
        </text>
        <text x="5" y="75" font-family="monospace" font-size="9" font-weight="bold" fill="#EF4444" opacity="0.5" letter-spacing="1.5">
          ALPHAXEN-FONTLAB
        </text>
        <line x1="0" y1="45" x2="120" y2="45" stroke="#EF4444" stroke-width="1" stroke-dasharray="3 3" opacity="0.5"/>
        <line x1="0" y1="90" x2="120" y2="90" stroke="#DC2626" stroke-width="1" opacity="0.4"/>
      </pattern>
    `
  },
  {
    id: 'watermark-guilloche',
    name: 'Banknote Guilloche Rosette',
    category: 'Watermark',
    description: 'Intricate spirograph banknote security geometric patterns with micro-engraving rosettes.',
    accentColor: '#10B981',
    previewGradient: 'linear-gradient(135deg, #6ee7b7 0%, #059669 50%, #064e3b 100%)',
    defaultStops: [
      { offset: 0, color: '#D1FAE5' },
      { offset: 0.5, color: '#10B981' },
      { offset: 1, color: '#064E3B' }
    ],
    blendMode: 'overlay',
    roughness: 10,
    bevelDepth: 10,
    svgPatternSvg: `
      <pattern id="pattern-watermark-guilloche" width="80" height="80" patternUnits="userSpaceOnUse">
        <rect width="80" height="80" fill="transparent"/>
        <ellipse cx="40" cy="40" rx="35" ry="15" stroke="#10B981" stroke-width="0.9" fill="none" opacity="0.7"/>
        <ellipse cx="40" cy="40" rx="15" ry="35" stroke="#059669" stroke-width="0.9" fill="none" opacity="0.7"/>
        <ellipse cx="40" cy="40" rx="28" ry="28" stroke="#34D399" stroke-width="0.8" fill="none" stroke-dasharray="2 2" opacity="0.6"/>
        <circle cx="40" cy="40" r="6" stroke="#047857" stroke-width="1" fill="none" opacity="0.8"/>
      </pattern>
    `
  },
  {
    id: 'watermark-postal',
    name: 'Vintage Postal Stamp Cancel',
    category: 'Watermark',
    description: 'Historical postal cancellation wavy lines with circular date franking mark.',
    accentColor: '#F43F5E',
    previewGradient: 'linear-gradient(135deg, #fda4af 0%, #e11d48 50%, #4c0519 100%)',
    defaultStops: [
      { offset: 0, color: '#FFE4E6' },
      { offset: 0.5, color: '#F43F5E' },
      { offset: 1, color: '#881337' }
    ],
    blendMode: 'multiply',
    roughness: 40,
    bevelDepth: 7,
    svgPatternSvg: `
      <pattern id="pattern-watermark-postal" width="100" height="100" patternUnits="userSpaceOnUse">
        <rect width="100" height="100" fill="transparent"/>
        <!-- Wavy cancel lines -->
        <path d="M0,20 Q25,10 50,20 T100,20" stroke="#E11D48" stroke-width="1.6" fill="none" opacity="0.7"/>
        <path d="M0,35 Q25,25 50,35 T100,35" stroke="#E11D48" stroke-width="1.6" fill="none" opacity="0.7"/>
        <path d="M0,50 Q25,40 50,50 T100,50" stroke="#E11D48" stroke-width="1.6" fill="none" opacity="0.7"/>
        <!-- Circular Postmark Stamp -->
        <circle cx="50" cy="50" r="30" stroke="#BE123C" stroke-width="1.8" fill="none" opacity="0.65"/>
        <circle cx="50" cy="50" r="26" stroke="#BE123C" stroke-width="0.8" fill="none" opacity="0.5"/>
        <text x="32" y="53" font-family="monospace" font-size="7" font-weight="bold" fill="#BE123C" opacity="0.8">
          PASSED
        </text>
      </pattern>
    `
  }
];

export const DEFAULT_TEXTURE_CONFIG: FontTextureConfig = {
  enabled: true,
  type: 'preset-texture',
  presetId: 'obsidian',
  scope: 'glyph',
  scale: 1,
  rotation: 0,
  opacity: 0.85,
  svgFilterType: 'noise-grain',
  gradientAngle: 135,
  colorStops: [
    { offset: 0, color: '#FAFAFA' },
    { offset: 0.35, color: '#A1A1AA' },
    { offset: 0.7, color: '#DC2626' },
    { offset: 1, color: '#450A0A' }
  ],
  roughness: 45,
  bevelDepth: 12,
  blendMode: 'overlay',
  strokeWidth: 2,
  strokeColor: '#FF1A1A'
};
