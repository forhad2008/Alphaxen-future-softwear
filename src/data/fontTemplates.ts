import { FontTemplate, CustomGlyph, FontMetrics, FontWeightPreset, KerningPair } from '../types/fontLab';
import { OPENTYPE_FEATURES_LIST } from './fontsData';

export const FONT_TEMPLATES: FontTemplate[] = [
  {
    id: 'geometric-sans',
    name: 'Geometric Sans',
    tagline: 'Pure Bauhaus Circle & Strict Architectural Geometry',
    classification: 'Geometric Sans-Serif',
    description: 'Constructed from pure circles, equilateral triangles, and uniform stroke widths. Low stroke contrast with generous modern proportions, ideal for tech brands, minimal editorial, and spatial interfaces.',
    badge: 'Standard UPM 1000',
    metrics: {
      unitsPerEm: 1000,
      ascender: 750,
      capHeight: 700,
      xHeight: 520,
      baseline: 0,
      descender: -200
    },
    defaultWeight: 'Bold',
    weights: [
      { name: 'Light', weightClass: 300 },
      { name: 'Regular', weightClass: 400 },
      { name: 'Medium', weightClass: 500 },
      { name: 'Bold', weightClass: 700, isDefault: true },
      { name: 'Black', weightClass: 900 }
    ],
    kerning: [
      { id: 'k1', left: 'A', right: 'V', value: -70 },
      { id: 'k2', left: 'T', right: 'o', value: -60 },
      { id: 'k3', left: 'P', right: 'A', value: -50 },
      { id: 'k4', left: 'A', right: 'T', value: -65 }
    ],
    features: OPENTYPE_FEATURES_LIST,
    suggestedTexture: 'titanium',
    previewWords: ['GEOMETRIC', 'BAUHAUS', 'KINETIC', 'AVANT-GARDE', '0123456789'],
    sampleGlyphs: [
      {
        id: 'tmpl_geo_A',
        char: 'A',
        name: 'A',
        unicode: 'U+0041',
        advanceWidth: 720,
        leftSideBearing: 40,
        rightSideBearing: 40,
        category: 'uppercase',
        points: [
          { id: 'p1', x: 360, y: 700, type: 'corner', onCurve: true },
          { id: 'p2', x: 680, y: 0, type: 'corner', onCurve: true },
          { id: 'p3', x: 580, y: 0, type: 'corner', onCurve: true },
          { id: 'p4', x: 470, y: 220, type: 'corner', onCurve: true },
          { id: 'p5', x: 250, y: 220, type: 'corner', onCurve: true },
          { id: 'p6', x: 140, y: 0, type: 'corner', onCurve: true },
          { id: 'p7', x: 40, y: 0, type: 'corner', onCurve: true }
        ],
        contours: [
          {
            id: 'c1',
            isClosed: true,
            points: [
              { id: 'p1', x: 360, y: 700, type: 'corner', onCurve: true },
              { id: 'p2', x: 680, y: 0, type: 'corner', onCurve: true },
              { id: 'p3', x: 580, y: 0, type: 'corner', onCurve: true },
              { id: 'p4', x: 470, y: 220, type: 'corner', onCurve: true },
              { id: 'p5', x: 250, y: 220, type: 'corner', onCurve: true },
              { id: 'p6', x: 140, y: 0, type: 'corner', onCurve: true },
              { id: 'p7', x: 40, y: 0, type: 'corner', onCurve: true }
            ]
          },
          {
            id: 'c2',
            isClosed: true,
            points: [
              { id: 'p8', x: 360, y: 520, type: 'corner', onCurve: true },
              { id: 'p9', x: 280, y: 310, type: 'corner', onCurve: true },
              { id: 'p10', x: 440, y: 310, type: 'corner', onCurve: true }
            ]
          }
        ]
      },
      {
        id: 'tmpl_geo_O',
        char: 'O',
        name: 'O',
        unicode: 'U+004F',
        advanceWidth: 760,
        leftSideBearing: 40,
        rightSideBearing: 40,
        category: 'uppercase',
        points: [],
        contours: [
          {
            id: 'c_out',
            isClosed: true,
            points: [
              { id: 'o1', x: 380, y: 710, type: 'smooth', onCurve: true, handleIn: { x: 220, y: 710 }, handleOut: { x: 540, y: 710 } },
              { id: 'o2', x: 720, y: 350, type: 'smooth', onCurve: true, handleIn: { x: 720, y: 530 }, handleOut: { x: 720, y: 170 } },
              { id: 'o3', x: 380, y: -10, type: 'smooth', onCurve: true, handleIn: { x: 540, y: -10 }, handleOut: { x: 220, y: -10 } },
              { id: 'o4', x: 40, y: 350, type: 'smooth', onCurve: true, handleIn: { x: 40, y: 170 }, handleOut: { x: 40, y: 530 } }
            ]
          },
          {
            id: 'c_in',
            isClosed: true,
            points: [
              { id: 'oi1', x: 380, y: 620, type: 'smooth', onCurve: true, handleIn: { x: 260, y: 620 }, handleOut: { x: 500, y: 620 } },
              { id: 'oi2', x: 620, y: 350, type: 'smooth', onCurve: true, handleIn: { x: 620, y: 480 }, handleOut: { x: 620, y: 220 } },
              { id: 'oi3', x: 380, y: 80, type: 'smooth', onCurve: true, handleIn: { x: 500, y: 80 }, handleOut: { x: 260, y: 80 } },
              { id: 'oi4', x: 140, y: 350, type: 'smooth', onCurve: true, handleIn: { x: 140, y: 220 }, handleOut: { x: 140, y: 480 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'display-serif',
    name: 'Display Serif',
    tagline: 'Monumental High-Contrast Luxury Chiseled Didone',
    classification: 'Didone Modern Serif',
    description: 'Extreme thick-to-thin vertical contrast, knife-edge hairline horizontal brackets, and razor-sharp chiseled bracketed terminals. Designed for luxury fashion mastheads, bespoke fragrance packaging, and haute horlogerie.',
    badge: 'High Contrast Luxury',
    metrics: {
      unitsPerEm: 1000,
      ascender: 820,
      capHeight: 740,
      xHeight: 480,
      baseline: 0,
      descender: -220
    },
    defaultWeight: 'Bold',
    weights: [
      { name: 'Hairline', weightClass: 100 },
      { name: 'Regular', weightClass: 400 },
      { name: 'Medium', weightClass: 500 },
      { name: 'Bold', weightClass: 700, isDefault: true },
      { name: 'Black Poster', weightClass: 900 }
    ],
    kerning: [
      { id: 'k1', left: 'T', right: 'a', value: -90 },
      { id: 'k2', left: 'A', right: 'V', value: -100 },
      { id: 'k3', left: 'W', right: 'a', value: -80 },
      { id: 'k4', left: 'Y', right: 'o', value: -85 }
    ],
    features: OPENTYPE_FEATURES_LIST,
    suggestedTexture: 'gold',
    previewWords: ['MONUMENTAL', 'OBSIDIAN', 'HAUTE COUTURE', 'HERALDRY', 'CHISELED'],
    sampleGlyphs: [
      {
        id: 'tmpl_serif_A',
        char: 'A',
        name: 'A',
        unicode: 'U+0041',
        advanceWidth: 700,
        leftSideBearing: 30,
        rightSideBearing: 30,
        category: 'uppercase',
        points: [],
        contours: [
          {
            id: 'c1',
            isClosed: true,
            points: [
              { id: 'sp1', x: 380, y: 740, type: 'corner', onCurve: true },
              { id: 'sp2', x: 670, y: 0, type: 'corner', onCurve: true },
              { id: 'sp3', x: 530, y: 0, type: 'corner', onCurve: true },
              { id: 'sp4', x: 440, y: 240, type: 'corner', onCurve: true },
              { id: 'sp5', x: 230, y: 240, type: 'corner', onCurve: true },
              { id: 'sp6', x: 120, y: 0, type: 'corner', onCurve: true },
              { id: 'sp7', x: 30, y: 0, type: 'corner', onCurve: true },
              { id: 'sp8', x: 80, y: 40, type: 'corner', onCurve: true },
              { id: 'sp9', x: 320, y: 740, type: 'corner', onCurve: true }
            ]
          },
          {
            id: 'c2',
            isClosed: true,
            points: [
              { id: 'spi1', x: 350, y: 550, type: 'corner', onCurve: true },
              { id: 'spi2', x: 250, y: 280, type: 'corner', onCurve: true },
              { id: 'spi3', x: 420, y: 280, type: 'corner', onCurve: true }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'modern-mono',
    name: 'Modern Mono',
    tagline: 'Technical Monospace Engineering & IDE Typeface',
    classification: 'Engineering Monospace',
    description: 'Strict uniform 600 UPM advance width across every glyph. Tuned for code legibility, programmer ligatures, hexadecimal telemetry, and dense developer terminals with optical balance.',
    badge: 'Fixed 600 UPM Advance',
    metrics: {
      unitsPerEm: 1000,
      ascender: 760,
      capHeight: 680,
      xHeight: 510,
      baseline: 0,
      descender: -200
    },
    defaultWeight: 'Medium',
    weights: [
      { name: 'Light', weightClass: 300 },
      { name: 'Regular', weightClass: 400 },
      { name: 'Medium', weightClass: 500, isDefault: true },
      { name: 'Bold', weightClass: 700 }
    ],
    kerning: [], // Strict mono has 0 kerning
    features: OPENTYPE_FEATURES_LIST,
    suggestedTexture: 'hologram',
    previewWords: ['const ALPHAXEN = true;', 'fn main() -> OTF', '0xDEADBEEF', 'git commit -m'],
    sampleGlyphs: [
      {
        id: 'tmpl_mono_A',
        char: 'A',
        name: 'A',
        unicode: 'U+0041',
        advanceWidth: 600,
        leftSideBearing: 60,
        rightSideBearing: 60,
        category: 'uppercase',
        points: [],
        contours: [
          {
            id: 'c1',
            isClosed: true,
            points: [
              { id: 'mp1', x: 300, y: 680, type: 'corner', onCurve: true },
              { id: 'mp2', x: 540, y: 0, type: 'corner', onCurve: true },
              { id: 'mp3', x: 440, y: 0, type: 'corner', onCurve: true },
              { id: 'mp4', x: 370, y: 200, type: 'corner', onCurve: true },
              { id: 'mp5', x: 230, y: 200, type: 'corner', onCurve: true },
              { id: 'mp6', x: 160, y: 0, type: 'corner', onCurve: true },
              { id: 'mp7', x: 60, y: 0, type: 'corner', onCurve: true }
            ]
          },
          {
            id: 'c2',
            isClosed: true,
            points: [
              { id: 'mpi1', x: 300, y: 520, type: 'corner', onCurve: true },
              { id: 'mpi2', x: 250, y: 280, type: 'corner', onCurve: true },
              { id: 'mpi3', x: 350, y: 280, type: 'corner', onCurve: true }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'brutalist-gothic',
    name: 'Brutalist Gothic',
    tagline: 'Aggressive Chamfered Blackletter & Heavy Ink-Traps',
    classification: 'Display Blackletter Hybrid',
    description: 'Chiseled angular cuts, 45-degree corner bevels, and heavy diamond spurs. Designed for extreme music releases, tactical cyberpunk hardware, and dystopian graphic posters.',
    badge: 'Heavy Ink-Traps',
    metrics: {
      unitsPerEm: 1000,
      ascender: 820,
      capHeight: 720,
      xHeight: 520,
      baseline: 0,
      descender: -200
    },
    defaultWeight: 'Black',
    weights: [
      { name: 'Regular', weightClass: 400 },
      { name: 'Bold', weightClass: 700 },
      { name: 'Black', weightClass: 900, isDefault: true }
    ],
    kerning: [
      { id: 'k1', left: 'A', right: 'V', value: -80 },
      { id: 'k2', left: 'T', right: 'O', value: -60 }
    ],
    features: OPENTYPE_FEATURES_LIST,
    suggestedTexture: 'damascus',
    previewWords: ['BRUTALIST', 'DRACO', 'OBSIDIAN', 'HEAVY METAL', 'TACTICAL'],
    sampleGlyphs: [
      {
        id: 'tmpl_brut_A',
        char: 'A',
        name: 'A',
        unicode: 'U+0041',
        advanceWidth: 700,
        leftSideBearing: 50,
        rightSideBearing: 50,
        category: 'uppercase',
        points: [],
        contours: [
          {
            id: 'c1',
            isClosed: true,
            points: [
              { id: 'bp1', x: 350, y: 720, type: 'corner', onCurve: true },
              { id: 'bp2', x: 420, y: 700, type: 'corner', onCurve: true },
              { id: 'bp3', x: 650, y: 0, type: 'corner', onCurve: true },
              { id: 'bp4', x: 500, y: 0, type: 'corner', onCurve: true },
              { id: 'bp5', x: 420, y: 220, type: 'corner', onCurve: true },
              { id: 'bp6', x: 280, y: 220, type: 'corner', onCurve: true },
              { id: 'bp7', x: 200, y: 0, type: 'corner', onCurve: true },
              { id: 'bp8', x: 50, y: 0, type: 'corner', onCurve: true },
              { id: 'bp9', x: 280, y: 700, type: 'corner', onCurve: true }
            ]
          },
          {
            id: 'c2',
            isClosed: true,
            points: [
              { id: 'bpi1', x: 350, y: 540, type: 'corner', onCurve: true },
              { id: 'bpi2', x: 300, y: 310, type: 'corner', onCurve: true },
              { id: 'bpi3', x: 400, y: 310, type: 'corner', onCurve: true }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'cyber-modular',
    name: 'Cyber Modular',
    tagline: 'Octagonal 45° Chamfers & Sci-Fi HUD Cockpit Telemetry',
    classification: 'Modular Sci-Fi Display',
    description: 'Constructed on a strict diagonal grid with 45-degree faceted chamfers. Gives any word the look of deep-space telemetry instrumentation, cybernetic neural links, or high-tech military avionics.',
    badge: '45° Octagonal Grid',
    metrics: {
      unitsPerEm: 1000,
      ascender: 760,
      capHeight: 700,
      xHeight: 500,
      baseline: 0,
      descender: -180
    },
    defaultWeight: 'Bold',
    weights: [
      { name: 'Wireframe', weightClass: 200 },
      { name: 'Regular', weightClass: 400 },
      { name: 'Bold', weightClass: 700, isDefault: true },
      { name: 'Armored', weightClass: 900 }
    ],
    kerning: [
      { id: 'k1', left: 'A', right: 'V', value: -70 }
    ],
    features: OPENTYPE_FEATURES_LIST,
    suggestedTexture: 'carbon',
    previewWords: ['CYBERNETIC', 'NEURAL-NET', 'AVIONICS', 'PROTOCOL 9', 'QUANTUM'],
    sampleGlyphs: [
      {
        id: 'tmpl_cyber_A',
        char: 'A',
        name: 'A',
        unicode: 'U+0041',
        advanceWidth: 700,
        leftSideBearing: 50,
        rightSideBearing: 50,
        category: 'uppercase',
        points: [],
        contours: [
          {
            id: 'c1',
            isClosed: true,
            points: [
              { id: 'cp1', x: 260, y: 700, type: 'corner', onCurve: true },
              { id: 'cp2', x: 440, y: 700, type: 'corner', onCurve: true },
              { id: 'cp3', x: 650, y: 200, type: 'corner', onCurve: true },
              { id: 'cp4', x: 650, y: 0, type: 'corner', onCurve: true },
              { id: 'cp5', x: 530, y: 0, type: 'corner', onCurve: true },
              { id: 'cp6', x: 530, y: 150, type: 'corner', onCurve: true },
              { id: 'cp7', x: 440, y: 240, type: 'corner', onCurve: true },
              { id: 'cp8', x: 260, y: 240, type: 'corner', onCurve: true },
              { id: 'cp9', x: 170, y: 150, type: 'corner', onCurve: true },
              { id: 'cp10', x: 170, y: 0, type: 'corner', onCurve: true },
              { id: 'cp11', x: 50, y: 0, type: 'corner', onCurve: true },
              { id: 'cp12', x: 50, y: 200, type: 'corner', onCurve: true }
            ]
          },
          {
            id: 'c2',
            isClosed: true,
            points: [
              { id: 'cpi1', x: 300, y: 580, type: 'corner', onCurve: true },
              { id: 'cpi2', x: 400, y: 580, type: 'corner', onCurve: true },
              { id: 'cpi3', x: 460, y: 360, type: 'corner', onCurve: true },
              { id: 'cpi4', x: 240, y: 360, type: 'corner', onCurve: true }
            ]
          }
        ]
      }
    ]
  }
];
