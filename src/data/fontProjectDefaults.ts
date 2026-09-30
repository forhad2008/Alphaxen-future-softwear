import { CustomGlyph, FontInfo, FontMetrics, FontProject, KerningPair } from '../types/fontLab';
import { OPENTYPE_FEATURES_LIST } from './fontsData';

export const DEFAULT_METRICS: FontMetrics = {
  unitsPerEm: 1000,
  ascender: 800,
  capHeight: 700,
  xHeight: 500,
  baseline: 0,
  descender: -200
};

export const DEFAULT_FONT_INFO: FontInfo = {
  familyName: 'Alphaxen Obsidian',
  styleName: 'Display Heavy',
  fullName: 'Alphaxen Obsidian Display Heavy',
  postScriptName: 'AlphaxenObsidian-DisplayHeavy',
  version: '1.000; 2026; OpenType build',
  designer: 'Alphaxen Creative Studio',
  foundry: 'Alphaxen-FontLab',
  copyright: '© 2026 Alphaxen-FontLab. All rights reserved.',
  license: 'Commercial End User License Agreement (EULA)',
  description: 'A futuristic monumental display typeface with mineral chiseled serifs and controlled crimson energy.',
  trademark: 'Alphaxen-FontLab™ is a registered trademark of Alphaxen Foundry.'
};

export const INITIAL_KERNING_PAIRS: KerningPair[] = [
  { id: 'k1', left: 'A', right: 'V', value: -75 },
  { id: 'k2', left: 'A', right: 'W', value: -60 },
  { id: 'k3', left: 'A', right: 'Y', value: -80 },
  { id: 'k4', left: 'T', right: 'o', value: -90 },
  { id: 'k5', left: 'T', right: 'a', value: -70 },
  { id: 'k6', left: 'T', right: 'e', value: -65 },
  { id: 'k7', left: 'W', right: 'a', value: -45 },
  { id: 'k8', left: 'Y', right: 'o', value: -70 },
  { id: 'k9', left: 'L', right: 'T', value: -90 },
  { id: 'k10', left: 'P', right: 'A', value: -60 }
];

export const FONT_WEIGHT_PRESETS = [
  { name: 'Thin', weightClass: 100 },
  { name: 'ExtraLight', weightClass: 200 },
  { name: 'Light', weightClass: 300 },
  { name: 'Regular', weightClass: 400 },
  { name: 'Medium', weightClass: 500 },
  { name: 'SemiBold', weightClass: 600 },
  { name: 'Bold', weightClass: 700, isDefault: true },
  { name: 'ExtraBold', weightClass: 800 },
  { name: 'Black', weightClass: 900 }
];

// Comprehensive initial glyph library
export const DEFAULT_GLYPHS_MAP: Record<string, CustomGlyph> = {
  // Uppercase
  'A': {
    char: 'A',
    unicode: 65,
    advanceWidth: 700,
    leftSideBearing: 50,
    rightSideBearing: 50,
    contours: [
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
  'B': {
    char: 'B',
    unicode: 66,
    advanceWidth: 680,
    leftSideBearing: 70,
    rightSideBearing: 60,
    contours: [
      {
        closed: true,
        points: [
          { id: 'b1', x: 90, y: 710, type: 'corner' },
          { id: 'b2', x: 420, y: 710, type: 'smooth', handleIn: { x: 300, y: 710 }, handleOut: { x: 540, y: 710 } },
          { id: 'b3', x: 580, y: 550, type: 'smooth', handleIn: { x: 580, y: 640 }, handleOut: { x: 580, y: 460 } },
          { id: 'b4', x: 410, y: 390, type: 'corner' },
          { id: 'b5', x: 610, y: 200, type: 'smooth', handleIn: { x: 610, y: 310 }, handleOut: { x: 610, y: 90 } },
          { id: 'b6', x: 440, y: 0, type: 'smooth', handleIn: { x: 550, y: 0 }, handleOut: { x: 320, y: 0 } },
          { id: 'b7', x: 90, y: 0, type: 'corner' }
        ]
      },
      {
        closed: true,
        points: [
          { id: 'bi1', x: 220, y: 600, type: 'corner' },
          { id: 'bi2', x: 400, y: 600, type: 'smooth', handleOut: { x: 480, y: 600 } },
          { id: 'bi3', x: 480, y: 520, type: 'smooth' },
          { id: 'bi4', x: 380, y: 450, type: 'corner' },
          { id: 'bi5', x: 220, y: 450, type: 'corner' }
        ]
      }
    ]
  },
  'C': {
    char: 'C',
    unicode: 67,
    advanceWidth: 720,
    leftSideBearing: 60,
    rightSideBearing: 50,
    contours: [
      {
        closed: true,
        points: [
          { id: 'c1', x: 640, y: 570, type: 'corner' },
          { id: 'c2', x: 420, y: 720, type: 'smooth', handleIn: { x: 560, y: 720 }, handleOut: { x: 260, y: 720 } },
          { id: 'c3', x: 90, y: 360, type: 'smooth', handleIn: { x: 90, y: 560 }, handleOut: { x: 90, y: 160 } },
          { id: 'c4', x: 410, y: -10, type: 'smooth', handleIn: { x: 240, y: -10 }, handleOut: { x: 560, y: -10 } },
          { id: 'c5', x: 640, y: 140, type: 'corner' },
          { id: 'c6', x: 540, y: 120, type: 'corner' },
          { id: 'c7', x: 380, y: 110, type: 'smooth', handleOut: { x: 230, y: 110 } },
          { id: 'c8', x: 220, y: 360, type: 'smooth', handleIn: { x: 220, y: 220 }, handleOut: { x: 220, y: 500 } },
          { id: 'c9', x: 380, y: 600, type: 'smooth', handleIn: { x: 230, y: 600 }, handleOut: { x: 520, y: 600 } }
        ]
      }
    ]
  },
  'D': {
    char: 'D',
    unicode: 68,
    advanceWidth: 720,
    leftSideBearing: 70,
    rightSideBearing: 60,
    contours: [
      {
        closed: true,
        points: [
          { id: 'd1', x: 90, y: 710, type: 'corner' },
          { id: 'd2', x: 380, y: 710, type: 'smooth', handleIn: { x: 270, y: 710 }, handleOut: { x: 560, y: 710 } },
          { id: 'd3', x: 650, y: 355, type: 'smooth', handleIn: { x: 650, y: 550 }, handleOut: { x: 650, y: 160 } },
          { id: 'd4', x: 380, y: 0, type: 'smooth', handleIn: { x: 560, y: 0 }, handleOut: { x: 270, y: 0 } },
          { id: 'd5', x: 90, y: 0, type: 'corner' }
        ]
      },
      {
        closed: true,
        points: [
          { id: 'di1', x: 230, y: 580, type: 'corner' },
          { id: 'di2', x: 360, y: 580, type: 'smooth', handleOut: { x: 500, y: 580 } },
          { id: 'di3', x: 500, y: 355, type: 'smooth', handleIn: { x: 500, y: 480 }, handleOut: { x: 500, y: 230 } },
          { id: 'di4', x: 360, y: 130, type: 'smooth', handleIn: { x: 500, y: 130 }, handleOut: { x: 230, y: 130 } },
          { id: 'di5', x: 230, y: 130, type: 'corner' }
        ]
      }
    ]
  },
  'E': {
    char: 'E',
    unicode: 69,
    advanceWidth: 630,
    leftSideBearing: 70,
    rightSideBearing: 50,
    contours: [
      {
        closed: true,
        points: [
          { id: 'e1', x: 90, y: 710, type: 'corner' },
          { id: 'e2', x: 560, y: 710, type: 'corner' },
          { id: 'e3', x: 560, y: 590, type: 'corner' },
          { id: 'e4', x: 230, y: 590, type: 'corner' },
          { id: 'e5', x: 230, y: 420, type: 'corner' },
          { id: 'e6', x: 510, y: 420, type: 'corner' },
          { id: 'e7', x: 510, y: 310, type: 'corner' },
          { id: 'e8', x: 230, y: 310, type: 'corner' },
          { id: 'e9', x: 230, y: 120, type: 'corner' },
          { id: 'e10', x: 570, y: 120, type: 'corner' },
          { id: 'e11', x: 570, y: 0, type: 'corner' },
          { id: 'e12', x: 90, y: 0, type: 'corner' }
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
          { id: 'f1', x: 90, y: 710, type: 'corner' },
          { id: 'f2', x: 510, y: 710, type: 'corner' },
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
  },
  'O': {
    char: 'O',
    unicode: 79,
    advanceWidth: 750,
    leftSideBearing: 55,
    rightSideBearing: 55,
    contours: [
      {
        closed: true,
        points: [
          { id: 'o1', x: 375, y: 720, type: 'smooth', handleIn: { x: 230, y: 720 }, handleOut: { x: 520, y: 720 } },
          { id: 'o2', x: 670, y: 355, type: 'smooth', handleIn: { x: 670, y: 540 }, handleOut: { x: 670, y: 170 } },
          { id: 'o3', x: 375, y: -10, type: 'smooth', handleIn: { x: 520, y: -10 }, handleOut: { x: 230, y: -10 } },
          { id: 'o4', x: 80, y: 355, type: 'smooth', handleIn: { x: 80, y: 170 }, handleOut: { x: 80, y: 540 } }
        ]
      },
      {
        closed: true,
        points: [
          { id: 'io1', x: 375, y: 580, type: 'smooth', handleIn: { x: 280, y: 580 }, handleOut: { x: 470, y: 580 } },
          { id: 'io2', x: 530, y: 355, type: 'smooth', handleIn: { x: 530, y: 470 }, handleOut: { x: 530, y: 240 } },
          { id: 'io3', x: 375, y: 130, type: 'smooth', handleIn: { x: 470, y: 130 }, handleOut: { x: 280, y: 130 } },
          { id: 'io4', x: 220, y: 355, type: 'smooth', handleIn: { x: 220, y: 240 }, handleOut: { x: 220, y: 470 } }
        ]
      }
    ]
  },
  'T': {
    char: 'T',
    unicode: 84,
    advanceWidth: 640,
    leftSideBearing: 40,
    rightSideBearing: 40,
    contours: [
      {
        closed: true,
        points: [
          { id: 't1', x: 40, y: 710, type: 'corner' },
          { id: 't2', x: 600, y: 710, type: 'corner' },
          { id: 't3', x: 600, y: 590, type: 'corner' },
          { id: 't4', x: 385, y: 590, type: 'corner' },
          { id: 't5', x: 385, y: 0, type: 'corner' },
          { id: 't6', x: 255, y: 0, type: 'corner' },
          { id: 't7', x: 255, y: 590, type: 'corner' },
          { id: 't8', x: 40, y: 590, type: 'corner' }
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
          { id: 'x1', x: 90, y: 710, type: 'corner' },
          { id: 'x2', x: 240, y: 710, type: 'corner' },
          { id: 'x3', x: 340, y: 440, type: 'corner' },
          { id: 'x4', x: 440, y: 710, type: 'corner' },
          { id: 'x5', x: 590, y: 710, type: 'corner' },
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
  // Numerals
  '0': {
    char: '0',
    unicode: 48,
    advanceWidth: 650,
    leftSideBearing: 50,
    rightSideBearing: 50,
    contours: [
      {
        closed: true,
        points: [
          { id: 'n0_1', x: 325, y: 710, type: 'smooth', handleIn: { x: 200, y: 710 }, handleOut: { x: 450, y: 710 } },
          { id: 'n0_2', x: 580, y: 355, type: 'smooth', handleIn: { x: 580, y: 530 }, handleOut: { x: 580, y: 180 } },
          { id: 'n0_3', x: 325, y: 0, type: 'smooth', handleIn: { x: 450, y: 0 }, handleOut: { x: 200, y: 0 } },
          { id: 'n0_4', x: 70, y: 355, type: 'smooth', handleIn: { x: 70, y: 180 }, handleOut: { x: 70, y: 530 } }
        ]
      },
      {
        closed: true,
        points: [
          { id: 'n0_i1', x: 325, y: 580, type: 'smooth' },
          { id: 'n0_i2', x: 450, y: 355, type: 'smooth' },
          { id: 'n0_i3', x: 325, y: 130, type: 'smooth' },
          { id: 'n0_i4', x: 200, y: 355, type: 'smooth' }
        ]
      }
    ]
  },
  '1': {
    char: '1',
    unicode: 49,
    advanceWidth: 480,
    leftSideBearing: 60,
    rightSideBearing: 60,
    contours: [
      {
        closed: true,
        points: [
          { id: 'n1_1', x: 80, y: 540, type: 'corner' },
          { id: 'n1_2', x: 260, y: 710, type: 'corner' },
          { id: 'n1_3', x: 340, y: 710, type: 'corner' },
          { id: 'n1_4', x: 340, y: 120, type: 'corner' },
          { id: 'n1_5', x: 440, y: 120, type: 'corner' },
          { id: 'n1_6', x: 440, y: 0, type: 'corner' },
          { id: 'n1_7', x: 120, y: 0, type: 'corner' },
          { id: 'n1_8', x: 120, y: 120, type: 'corner' },
          { id: 'n1_9', x: 220, y: 120, type: 'corner' },
          { id: 'n1_10', x: 220, y: 540, type: 'corner' }
        ]
      }
    ]
  },
  '8': {
    char: '8',
    unicode: 56,
    advanceWidth: 640,
    leftSideBearing: 55,
    rightSideBearing: 55,
    contours: [
      {
        closed: true,
        points: [
          { id: 'n8_1', x: 320, y: 710, type: 'smooth', handleIn: { x: 210, y: 710 }, handleOut: { x: 430, y: 710 } },
          { id: 'n8_2', x: 530, y: 540, type: 'smooth' },
          { id: 'n8_3', x: 380, y: 380, type: 'corner' },
          { id: 'n8_4', x: 560, y: 180, type: 'smooth' },
          { id: 'n8_5', x: 320, y: 0, type: 'smooth', handleIn: { x: 450, y: 0 }, handleOut: { x: 190, y: 0 } },
          { id: 'n8_6', x: 80, y: 180, type: 'smooth' },
          { id: 'n8_7', x: 260, y: 380, type: 'corner' },
          { id: 'n8_8', x: 110, y: 540, type: 'smooth' }
        ]
      }
    ]
  },
  // Punctuation & Symbols
  '!': {
    char: '!',
    unicode: 33,
    advanceWidth: 320,
    leftSideBearing: 80,
    rightSideBearing: 80,
    contours: [
      {
        closed: true,
        points: [
          { id: 'ex1', x: 110, y: 710, type: 'corner' },
          { id: 'ex2', x: 210, y: 710, type: 'corner' },
          { id: 'ex3', x: 180, y: 220, type: 'corner' },
          { id: 'ex4', x: 140, y: 220, type: 'corner' }
        ]
      },
      {
        closed: true,
        points: [
          { id: 'ex5', x: 110, y: 120, type: 'corner' },
          { id: 'ex6', x: 210, y: 120, type: 'corner' },
          { id: 'ex7', x: 210, y: 0, type: 'corner' },
          { id: 'ex8', x: 110, y: 0, type: 'corner' }
        ]
      }
    ]
  },
  '?': {
    char: '?',
    unicode: 63,
    advanceWidth: 540,
    leftSideBearing: 60,
    rightSideBearing: 60,
    contours: [
      {
        closed: true,
        points: [
          { id: 'q1', x: 100, y: 560, type: 'corner' },
          { id: 'q2', x: 270, y: 710, type: 'smooth', handleIn: { x: 150, y: 710 }, handleOut: { x: 420, y: 710 } },
          { id: 'q3', x: 460, y: 540, type: 'smooth' },
          { id: 'q4', x: 330, y: 360, type: 'corner' },
          { id: 'q5', x: 330, y: 220, type: 'corner' },
          { id: 'q6', x: 210, y: 220, type: 'corner' },
          { id: 'q7', x: 210, y: 390, type: 'corner' },
          { id: 'q8', x: 340, y: 520, type: 'smooth' },
          { id: 'q9', x: 220, y: 580, type: 'smooth' }
        ]
      },
      {
        closed: true,
        points: [
          { id: 'qd1', x: 210, y: 110, type: 'corner' },
          { id: 'qd2', x: 320, y: 110, type: 'corner' },
          { id: 'qd3', x: 320, y: 0, type: 'corner' },
          { id: 'qd4', x: 210, y: 0, type: 'corner' }
        ]
      }
    ]
  },
  '$': {
    char: '$',
    unicode: 36,
    advanceWidth: 620,
    leftSideBearing: 60,
    rightSideBearing: 60,
    contours: [
      {
        closed: true,
        points: [
          { id: 'dl1', x: 330, y: 760, type: 'corner' },
          { id: 'dl2', x: 330, y: 710, type: 'corner' },
          { id: 'dl3', x: 480, y: 640, type: 'smooth' },
          { id: 'dl4', x: 330, y: 500, type: 'corner' },
          { id: 'dl5', x: 180, y: 380, type: 'smooth' },
          { id: 'dl6', x: 330, y: 220, type: 'corner' },
          { id: 'dl7', x: 330, y: -60, type: 'corner' },
          { id: 'dl8', x: 270, y: -60, type: 'corner' },
          { id: 'dl9', x: 270, y: 0, type: 'corner' },
          { id: 'dl10', x: 130, y: 70, type: 'smooth' },
          { id: 'dl11', x: 270, y: 220, type: 'corner' },
          { id: 'dl12', x: 430, y: 340, type: 'smooth' },
          { id: 'dl13', x: 270, y: 500, type: 'corner' },
          { id: 'dl14', x: 270, y: 760, type: 'corner' }
        ]
      }
    ]
  }
};

export const STARTER_PROJECT_GLYPHS: CustomGlyph[] = Object.values(DEFAULT_GLYPHS_MAP);

export const DEFAULT_INFO = DEFAULT_FONT_INFO;
export const DEFAULT_WEIGHTS = FONT_WEIGHT_PRESETS;
export const DEFAULT_KERNING_PAIRS = INITIAL_KERNING_PAIRS;

export const DEFAULT_PROJECT: FontProject = {
  id: 'proj-obsidian-01',
  name: 'Alphaxen Obsidian Pro',
  updatedAt: 'Just now',
  lastModified: 'Just now',
  isDirty: false,
  info: DEFAULT_FONT_INFO,
  metrics: DEFAULT_METRICS,
  glyphs: STARTER_PROJECT_GLYPHS,
  activeWeight: 'Bold',
  weights: FONT_WEIGHT_PRESETS,
  kerningPairs: INITIAL_KERNING_PAIRS,
  kerning: INITIAL_KERNING_PAIRS,
  features: OPENTYPE_FEATURES_LIST,
  referenceImages: [],
  references: []
};

export const INITIAL_FONT_PROJECT = DEFAULT_PROJECT;

export const CATEGORY_CHARACTERS: Record<string, string[]> = {
  uppercase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  lowercase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  punctuation: ['!', '?', '.', ',', ':', ';', '-', '_', '/', '\\', '(', ')', '[', ']', '{', '}', '"', "'"],
  symbols: ['@', '#', '%', '&', '*', '+', '=', '^', '~', '<', '>', '|'],
  currency: ['$', '€', '£', '¥', '₹', '₿', '¢'],
  math: ['+', '-', '×', '÷', '=', '≠', '±', '∞', '√', '∑', '∫'],
  arrows: ['←', '→', '↑', '↓', '↔', '⇒', '⇐'],
  ligatures: ['fi', 'fl', 'ff', 'ffi', 'ffl', 'st', 'ct'],
  alternates: ['A.alt1', 'R.alt1', 'K.alt1', 'Q.swash', 'g.alt']
};

/**
 * Parses basic SVG path commands into BezierPoint array for vector glyph editing
 */
export function parseSvgPathToPoints(d: string): import('../types/fontLab').BezierPoint[] {
  const points: import('../types/fontLab').BezierPoint[] = [];
  const commands = d.match(/[a-df-z][^a-df-z]*/gi) || [];
  let currentX = 0;
  let currentY = 0;

  commands.forEach((cmd, idx) => {
    const type = cmd[0];
    const nums = (cmd.slice(1).trim().match(/[-+]?[0-9]*\.?[0-9]+/g) || []).map(Number);
    if (type.toUpperCase() === 'M' && nums.length >= 2) {
      currentX = nums[0];
      currentY = nums[1];
      points.push({
        id: `pt_${idx}_${Date.now()}`,
        x: currentX,
        y: currentY,
        type: 'corner',
        onCurve: true
      });
    } else if (type.toUpperCase() === 'L' && nums.length >= 2) {
      currentX = nums[0];
      currentY = nums[1];
      points.push({
        id: `pt_${idx}_${Date.now()}`,
        x: currentX,
        y: currentY,
        type: 'corner',
        onCurve: true
      });
    } else if (type.toUpperCase() === 'C' && nums.length >= 6) {
      currentX = nums[4];
      currentY = nums[5];
      points.push({
        id: `pt_${idx}_${Date.now()}`,
        x: currentX,
        y: currentY,
        type: 'smooth',
        onCurve: true,
        handleIn: { x: nums[2], y: nums[3] },
        handleOut: { x: nums[0], y: nums[1] }
      });
    }
  });

  if (points.length === 0) {
    // Fallback default rectangle
    return [
      { id: 'fb1', x: 100, y: 0, type: 'corner', onCurve: true },
      { id: 'fb2', x: 100, y: 700, type: 'corner', onCurve: true },
      { id: 'fb3', x: 600, y: 700, type: 'corner', onCurve: true },
      { id: 'fb4', x: 600, y: 0, type: 'corner', onCurve: true }
    ];
  }

  return points;
}
