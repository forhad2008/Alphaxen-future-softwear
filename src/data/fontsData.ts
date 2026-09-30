import { FontItem, OpenTypeFeature, VariableAxis, CustomGlyph } from '../types/fontLab';

export const FEATURED_FONTS: FontItem[] = [
  {
    id: 'imperial-eagle',
    name: 'Imperial Eagle',
    classification: 'Display Font',
    formats: ['OTF', 'TTF', 'Webfont'],
    isNew: true,
    style: 'Gothic Metallic Luxury',
    tags: ['Heraldic', 'Gothic', 'Blackletter', 'Metallic', 'Editorial'],
    description: 'An imposing gothic display typeface influenced by holy roman heraldry and medieval punchcutting. Features razor-sharp serifs, ornate capital ligatures, and commanding vertical authority.',
    heroHeadline: 'CROWNED BY IRON & OBSIDIAN',
    price: 49,
    weights: ['Regular', 'Bold', 'Black', 'Chiseled Metal'],
    glyphsCount: 384,
    sampleText: 'VICTORIA EX TENEBRIS IMPERIALIS',
    accentColor: '#94a3b8',
    badgeText: 'New'
  },
  {
    id: 'bloody-dragon',
    name: 'Bloody Dragon',
    classification: 'Display Font',
    formats: ['OTF', 'TTF', 'Webfont'],
    isNew: true,
    style: 'Dark Fantasy Blackletter',
    tags: ['Fantasy', 'Blood Metal', 'Aggressive', 'Curved Spikes', 'Gaming'],
    description: 'A vicious, ceremonial blackletter with draconic thorn flourishes and sweeping terminal talons. Designed for avant-garde luxury apparel, extreme album art, and fantasy game titles.',
    heroHeadline: 'FORGED IN DRAGON FIRE',
    price: 59,
    weights: ['Spike', 'Inferno', 'Ceremonial'],
    glyphsCount: 342,
    sampleText: 'DRACO NOCTIS ET SANGUIS IGNIS',
    accentColor: '#ef4444',
    badgeText: 'New'
  },
  {
    id: 'arctic-bear',
    name: 'Arctic Bear',
    classification: 'Display Font',
    formats: ['OTF', 'TTF', 'Webfont'],
    isNew: true,
    style: 'Glacial Geometric Beast',
    tags: ['Glacial', 'Sub-Zero', 'Geometric', 'Brutalist', 'Monolithic'],
    description: 'Carved directly from frozen tectonic glaciers. Arctic Bear pairs hyper-brutalist geometric angles with primal animalistic presence. Maximum punch in oversized headlines.',
    heroHeadline: 'FROZEN IN PERMAFROST',
    price: 45,
    weights: ['Glacier', 'Permafrost', 'Titan'],
    glyphsCount: 298,
    sampleText: 'SUBZERO TECTONIC EXPEDITIONS',
    accentColor: '#38bdf8',
    badgeText: 'New'
  },
  {
    id: 'better-jellyfish',
    name: 'Better Jellyfish',
    classification: 'Display Font',
    formats: ['OTF', 'TTF', 'Webfont'],
    isNew: true,
    style: 'Bioluminescent Fluid Display',
    tags: ['Fluid', 'Bioluminescent', 'Psychedelic', 'Organic', 'Deep Sea'],
    description: 'Hypnotic, undulating curves mimicking abyssal ocean life. Better Jellyfish delivers undulating ligatures that intertwine like bioluminescent tentacles floating in midnight water.',
    heroHeadline: 'ABYSSAL LUMINESCENCE',
    price: 55,
    weights: ['Abyss', 'Tentacle Glow', 'Deep Current'],
    glyphsCount: 360,
    sampleText: 'BIOLUMINESCENT CURRENTS DRIFT',
    accentColor: '#a855f7',
    badgeText: 'New'
  }
];

export const OPENTYPE_FEATURES_LIST: OpenTypeFeature[] = [
  {
    tag: 'liga',
    name: 'Standard Ligatures',
    description: 'Replaces collisions between character pairs like fi, fl, ff, ffi with gracefully merged glyphs.',
    example: 'office flower affliction',
    enabled: true,
    category: 'ligatures'
  },
  {
    tag: 'dlig',
    name: 'Discretionary Ligatures',
    description: 'Dramatic historical ligatures including st, ct, sp, and ceremonial letter flourishes.',
    example: 'historic structure aesthetic',
    enabled: true,
    category: 'ligatures'
  },
  {
    tag: 'calt',
    name: 'Contextual Alternates',
    description: 'Dynamically varies letter forms based on preceding and succeeding glyphs to avoid repetition.',
    example: 'Alphaxen Typography Studio',
    enabled: true,
    category: 'alternates'
  },
  {
    tag: 'smcp',
    name: 'Small Capitals',
    description: 'Renders lowercase letters as proportionately weighted small capitals matching the x-height.',
    example: 'Typography & Design Systems',
    enabled: false,
    category: 'capitals'
  },
  {
    tag: 'c2sc',
    name: 'Capitals to Small Caps',
    description: 'Converts uppercase glyphs into harmonized small capitals for acronyms and running headers.',
    example: 'NATO UNESCO WYSIWYG',
    enabled: false,
    category: 'capitals'
  },
  {
    tag: 'onum',
    name: 'Oldstyle Figures',
    description: 'Numbers that have variable heights with ascenders and descenders blending into body text.',
    example: 'Since 1450 until 2026',
    enabled: false,
    category: 'figures'
  },
  {
    tag: 'tnum',
    name: 'Tabular Figures',
    description: 'Monospaced numerals ensuring numerical tables, financial ledgers, and timers align vertically.',
    example: '$1,489.50 / $9,230.12',
    enabled: true,
    category: 'figures'
  },
  {
    tag: 'frac',
    name: 'Fractions',
    description: 'Automatically formats slashed numeric pairs into true diagonal typographic fractions.',
    example: '1/2 3/4 7/8 15/16',
    enabled: true,
    category: 'figures'
  },
  {
    tag: 'ss01',
    name: 'Stylistic Set 01 (Dragon Sharp)',
    description: 'Activates aggressive pointed apexes and spiky serifs on uppercase capitals.',
    example: 'K M N V W X Y Z',
    enabled: false,
    category: 'alternates'
  },
  {
    tag: 'ss02',
    name: 'Stylistic Set 02 (Bioluminescent Swash)',
    description: 'Extends cursive fluid swashes and descending ribbons on terminal letters.',
    example: 'g j p q y z',
    enabled: false,
    category: 'alternates'
  }
];

export const VARIABLE_AXES_DEFAULTS: VariableAxis[] = [
  { tag: 'wght', name: 'Weight', min: 100, max: 900, default: 700, current: 700, unit: '' },
  { tag: 'wdth', name: 'Width', min: 75, max: 125, default: 100, current: 100, unit: '%' },
  { tag: 'slnt', name: 'Slant', min: -15, max: 0, default: 0, current: 0, unit: 'deg' },
  { tag: 'opsz', name: 'Optical Size', min: 8, max: 144, default: 48, current: 48, unit: 'pt' },
  { tag: 'CASL', name: 'Casual Flare', min: 0, max: 100, default: 30, current: 30, unit: '%' }
];

// Default Bézier vectors for Font Maker starter characters
export const STARTER_GLYPHS: Record<string, CustomGlyph> = {
  'A': {
    char: 'A',
    unicode: 65,
    advanceWidth: 700,
    leftSideBearing: 50,
    rightSideBearing: 50,
    contours: [
      // Outer triangle/arch
      {
        closed: true,
        points: [
          { id: 'p1', x: 350, y: 720, type: 'corner' },
          { id: 'p2', x: 620, y: 0, type: 'corner' },
          { id: 'p3', x: 490, y: 0, type: 'corner' },
          { id: 'p4', x: 430, y: 220, type: 'corner' },
          { id: 'p5', x: 270, y: 220, type: 'corner' },
          { id: 'p6', x: 210, y: 0, type: 'corner' },
          { id: 'p7', x: 80, y: 0, type: 'corner' }
        ]
      },
      // Inner counter hole
      {
        closed: true,
        points: [
          { id: 'h1', x: 350, y: 520, type: 'corner' },
          { id: 'h2', x: 290, y: 310, type: 'corner' },
          { id: 'h3', x: 410, y: 310, type: 'corner' }
        ]
      }
    ]
  },
  'X': {
    char: 'X',
    unicode: 88,
    advanceWidth: 680,
    leftSideBearing: 40,
    rightSideBearing: 40,
    contours: [
      {
        closed: true,
        points: [
          { id: 'x1', x: 90, y: 700, type: 'corner' },
          { id: 'x2', x: 240, y: 700, type: 'corner' },
          { id: 'x3', x: 340, y: 440, type: 'corner' },
          { id: 'x4', x: 440, y: 700, type: 'corner' },
          { id: 'x5', x: 590, y: 700, type: 'corner' },
          { id: 'x6', x: 415, y: 350, type: 'corner' },
          { id: 'x7', x: 600, y: 0, type: 'corner' },
          { id: 'x8', x: 450, y: 0, type: 'corner' },
          { id: 'x9', x: 340, y: 260, type: 'corner' },
          { id: 'x10', x: 230, y: 0, type: 'corner' },
          { id: 'x11', x: 80, y: 0, type: 'corner' },
          { id: 'x12', x: 265, y: 350, type: 'corner' }
        ]
      }
    ]
  },
  'O': {
    char: 'O',
    unicode: 79,
    advanceWidth: 750,
    leftSideBearing: 55,
    rightSideBearing: 55,
    contours: [
      // Outer ellipse
      {
        closed: true,
        points: [
          { id: 'o1', x: 375, y: 710, type: 'smooth', handleIn: { x: 230, y: 710 }, handleOut: { x: 520, y: 710 } },
          { id: 'o2', x: 660, y: 350, type: 'smooth', handleIn: { x: 660, y: 530 }, handleOut: { x: 660, y: 170 } },
          { id: 'o3', x: 375, y: -10, type: 'smooth', handleIn: { x: 520, y: -10 }, handleOut: { x: 230, y: -10 } },
          { id: 'o4', x: 90, y: 350, type: 'smooth', handleIn: { x: 90, y: 170 }, handleOut: { x: 90, y: 530 } }
        ]
      },
      // Inner counter
      {
        closed: true,
        points: [
          { id: 'io1', x: 375, y: 570, type: 'smooth', handleIn: { x: 280, y: 570 }, handleOut: { x: 470, y: 570 } },
          { id: 'io2', x: 530, y: 350, type: 'smooth', handleIn: { x: 530, y: 460 }, handleOut: { x: 530, y: 240 } },
          { id: 'io3', x: 375, y: 130, type: 'smooth', handleIn: { x: 470, y: 130 }, handleOut: { x: 280, y: 130 } },
          { id: 'io4', x: 220, y: 350, type: 'smooth', handleIn: { x: 220, y: 240 }, handleOut: { x: 220, y: 460 } }
        ]
      }
    ]
  },
  'F': {
    char: 'F',
    unicode: 70,
    advanceWidth: 580,
    leftSideBearing: 70,
    rightSideBearing: 60,
    contours: [
      {
        closed: true,
        points: [
          { id: 'f1', x: 90, y: 700, type: 'corner' },
          { id: 'f2', x: 510, y: 700, type: 'corner' },
          { id: 'f3', x: 510, y: 590, type: 'corner' },
          { id: 'f4', x: 230, y: 590, type: 'corner' },
          { id: 'f5', x: 230, y: 420, type: 'corner' },
          { id: 'f6', x: 450, y: 420, type: 'corner' },
          { id: 'f7', x: 450, y: 310, type: 'corner' },
          { id: 'f8', x: 230, y: 310, type: 'corner' },
          { id: 'f9', x: 230, y: 0, type: 'corner' },
          { id: 'f10', x: 90, y: 0, type: 'corner' }
        ]
      }
    ]
  }
};
