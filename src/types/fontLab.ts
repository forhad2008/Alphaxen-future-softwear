export interface FontItem {
  id: string;
  name: string;
  classification: string;
  formats: string[];
  isNew: boolean;
  style: string;
  tags: string[];
  description: string;
  heroHeadline: string;
  price: number;
  weights: string[];
  glyphCount?: number;
  glyphsCount?: number;
  artworkType?: 'eagle' | 'dragon' | 'bear' | 'jellyfish';
  quote?: string;
  designer?: string;
  year?: number;
  sampleText?: string;
  accentColor?: string;
  badgeText?: string;
}

export interface BezierPoint {
  id: string;
  x: number;
  y: number;
  type?: 'corner' | 'smooth';
  onCurve?: boolean;
  handleIn?: { x: number; y: number };
  handleOut?: { x: number; y: number };
}

export interface GlyphContour {
  id?: string;
  points: BezierPoint[];
  closed?: boolean;
  isClosed?: boolean;
}

export type GlyphCategory =
  | 'uppercase'
  | 'lowercase'
  | 'numbers'
  | 'punctuation'
  | 'symbols'
  | 'currency'
  | 'math'
  | 'arrows'
  | 'ligatures'
  | 'alternates';

export type TextureBrushCategory = 'grunge' | 'stone' | 'metallic' | '3d-texture' | '3d-watermark';

export interface TextureBrushStroke {
  id: string;
  points: Array<{ x: number; y: number }>;
  category: TextureBrushCategory;
  variantId: string;
  size: number;
  opacity: number;
  color: string;
  blendMode?: string;
  textureType?: 'solid' | 'gradient' | 'preset-texture' | 'custom-image';
  presetId?: TexturePresetId;
  customImageUrl?: string;
  is3D?: boolean;
  depth3D?: number;
  lightAngle3D?: number;
  specularShine3D?: number;
  watermarkType?: string;
}

export interface CustomGlyph {
  id?: string;
  char: string;
  name?: string;
  unicode: number | string;
  advanceWidth: number;
  leftSideBearing: number;
  rightSideBearing: number;
  category?: GlyphCategory;
  points?: BezierPoint[];
  contours: GlyphContour[];
  textureBrushes?: TextureBrushStroke[];
}

export interface FontMetrics {
  unitsPerEm: number;
  ascender: number;
  descender: number;
  capHeight: number;
  xHeight: number;
  baseline: number;
}

export interface OpenTypeFeature {
  tag: string;
  name: string;
  description: string;
  example: string;
  enabled: boolean;
  category: 'ligatures' | 'capitals' | 'figures' | 'alternates';
}

export interface VariableAxis {
  tag: string;
  name: string;
  min: number;
  max: number;
  default: number;
  current: number;
  unit: string;
}

export interface LicensingOption {
  id: 'desktop' | 'web' | 'app' | 'broadcast' | 'enterprise';
  title: string;
  description: string;
  priceMultiplier: number;
  allowedViews: string;
}

export interface FontInfo {
  familyName: string;
  styleName: string;
  fullName: string;
  postScriptName: string;
  version: string;
  designer: string;
  foundry: string;
  copyright: string;
  license: string;
  description: string;
  trademark: string;
}

export interface KerningPair {
  id: string;
  left: string;
  right: string;
  value: number; // in font units (-200 to +200)
}

export interface ReferenceImage {
  id: string;
  name: string;
  url: string;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  locked: boolean;
  visible: boolean;
}

export interface FontWeightPreset {
  name: string;
  weightClass: number; // 100 to 900
  isDefault?: boolean;
}

export type TexturePresetId =
  | 'obsidian'
  | 'chrome'
  | 'damascus'
  | 'lava'
  | 'hologram'
  | 'carbon'
  | 'gold'
  | 'titanium'
  | 'crimson-metal'
  | 'stone-basalt'
  | 'stone-granite'
  | 'stone-quartz'
  | 'marble'
  | 'grunge-acid'
  | 'grunge-scratches'
  | 'grunge-decay'
  | 'concrete-cracks'
  | 'metallic-specular'
  | 'metallic-bronze'
  | 'earth'
  | 'mars'
  | 'jupiter'
  | 'moon'
  | 'sun'
  | 'saturn'
  | 'neptune'
  | 'carbon-fiber'
  | 'dragon-scales'
  | 'mother-of-pearl'
  | 'cyber-circuit'
  | 'dark-walnut'
  | 'watermark-security'
  | 'watermark-guilloche'
  | 'watermark-postal'
  | 'watermark-hologram'
  | (string & {});

export interface FontTextureConfig {
  enabled: boolean;
  type: 'solid' | 'gradient' | 'preset-texture' | 'custom-image';
  presetId: TexturePresetId;
  customImageUrl?: string;
  scope: 'font' | 'glyph';
  svgFilterType?: 'none' | 'noise-grain' | 'turbulence-distortion' | 'metallic-emboss' | 'neon-glow' | '3d-extrusion' | '3d-watermark-relief';
  scale: number;
  rotation: number;
  opacity: number;
  blendMode: 'normal' | 'multiply' | 'screen' | 'overlay' | 'color-dodge' | 'hard-light' | 'soft-light' | 'luminosity';
  roughness: number; // 0 to 100 (grain/noise intensity)
  bevelDepth: number; // 0 to 20 (3D bevel shadow)
  colorStops: Array<{ offset: number; color: string }>;
  gradientAngle: number;
  strokeColor: string;
  strokeWidth: number;
  // 3D Texture Modeling
  is3D?: boolean;
  depth3D?: number; // 3D extrusion depth (0 - 50)
  lightAngle3D?: number; // Light angle azimuth (0 - 360)
  lightElevation3D?: number; // Light elevation (10 - 90)
  specularShine3D?: number; // Specular shine (0 - 100)
  metallicGloss?: number; // Metallic specular gloss (0 - 100)
  shadowColor3D?: string;
  // 3D Watermark Modeling
  watermark3D?: {
    enabled: boolean;
    type: 'guilloche' | 'embossed-seal' | 'hologram' | 'postal-stamp' | 'security-pattern';
    opacity: number;
    depth: number;
    extrusion?: number; // 3D watermark extrusion
    metallicGloss?: number; // 3D watermark metallic gloss
    scale: number;
    angle: number;
    blendMode: string;
    repeat: boolean;
  };
}

export interface FontTemplate {
  id: string;
  name: string;
  tagline: string;
  classification: string;
  description: string;
  badge: string;
  metrics: FontMetrics;
  weights: FontWeightPreset[];
  defaultWeight: string;
  kerning: KerningPair[];
  features: OpenTypeFeature[];
  sampleGlyphs: CustomGlyph[];
  suggestedTexture: TexturePresetId;
  previewWords: string[];
}

export interface FontProject {
  id: string;
  name: string;
  updatedAt?: string;
  lastModified?: string;
  isDirty?: boolean;
  info: FontInfo;
  metrics: FontMetrics;
  glyphs: CustomGlyph[];
  activeWeight: string;
  weights: FontWeightPreset[];
  kerningPairs: KerningPair[];
  kerning?: KerningPair[];
  features: OpenTypeFeature[];
  referenceImages: ReferenceImage[];
  references?: ReferenceImage[];
  textureConfig?: FontTextureConfig;
}

export type EditorTool =
  | 'select'
  | 'node'
  | 'pen'
  | 'shape'
  | 'text'
  | 'measure'
  | 'transform'
  | 'warp'
  | 'symmetry'
  | 'stroke'
  | 'outline'
  | 'texture'
  | 'texture-brush'
  | 'material'
  | 'light'
  | '3d'
  | 'ornament'
  | 'pattern'
  | 'component'
  | 'anchor'
  | 'guide'
  | 'shape-rect'
  | 'shape-circle'
  | 'shape-line'
  | 'knife'
  | 'image'
  | 'grid'
  | 'guides'
  | 'zoom';
