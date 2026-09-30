import { BezierPoint, GlyphContour, CustomGlyph } from '../types/fontLab';

/**
 * Calculates perpendicular distance from a point P to a line segment AB.
 */
function perpendicularDistance(
  p: { x: number; y: number },
  a: { x: number; y: number },
  b: { x: number; y: number }
): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const magSq = dx * dx + dy * dy;

  if (magSq === 0) {
    return Math.hypot(p.x - a.x, p.y - a.y);
  }

  // Projection scalar t
  const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / magSq));
  const projX = a.x + t * dx;
  const projY = a.y + t * dy;

  return Math.hypot(p.x - projX, p.y - projY);
}

/**
 * Standard Ramer-Douglas-Peucker algorithm for polyline simplification.
 */
function rdpSimplify(points: BezierPoint[], epsilon: number): BezierPoint[] {
  if (points.length <= 2) return points;

  let dmax = 0;
  let index = 0;
  const end = points.length - 1;

  for (let i = 1; i < end; i++) {
    const d = perpendicularDistance(points[i], points[0], points[end]);
    if (d > dmax) {
      index = i;
      dmax = d;
    }
  }

  if (dmax > epsilon) {
    const rec1 = rdpSimplify(points.slice(0, index + 1), epsilon);
    const rec2 = rdpSimplify(points.slice(index), epsilon);
    return [...rec1.slice(0, rec1.length - 1), ...rec2];
  } else {
    return [points[0], points[end]];
  }
}

/**
 * Collinear angle check to remove redundant nodes lying on a straight line.
 */
function removeCollinearPoints(points: BezierPoint[], angleToleranceDeg = 3): BezierPoint[] {
  if (points.length <= 2) return points;

  const radTol = (angleToleranceDeg * Math.PI) / 180;
  const result: BezierPoint[] = [points[0]];

  for (let i = 1; i < points.length - 1; i++) {
    const prev = result[result.length - 1];
    const curr = points[i];
    const next = points[i + 1];

    // If point has smooth handles, preserve it
    if (curr.type === 'smooth' && (curr.handleIn || curr.handleOut)) {
      result.push(curr);
      continue;
    }

    const v1x = curr.x - prev.x;
    const v1y = curr.y - prev.y;
    const v2x = next.x - curr.x;
    const v2y = next.y - curr.y;

    const angle1 = Math.atan2(v1y, v1x);
    const angle2 = Math.atan2(v2y, v2x);
    let diff = Math.abs(angle1 - angle2);
    if (diff > Math.PI) diff = 2 * Math.PI - diff;

    if (diff > radTol) {
      result.push(curr);
    }
  }

  result.push(points[points.length - 1]);
  return result;
}

/**
 * Simplifies a closed or open contour using tolerance threshold (in font units).
 */
export function simplifyContour(contour: GlyphContour, tolerance: number): GlyphContour {
  const points = contour.points;
  if (!points || points.length <= 3) return contour;

  const isClosed = contour.closed ?? contour.isClosed ?? true;

  if (isClosed) {
    // Find the point with highest curvature or corner as the split anchor
    let bestAnchorIdx = 0;
    for (let i = 0; i < points.length; i++) {
      if (points[i].type === 'corner') {
        bestAnchorIdx = i;
        break;
      }
    }

    const reordered = [...points.slice(bestAnchorIdx), ...points.slice(0, bestAnchorIdx)];
    const closedArray = [...reordered, reordered[0]];

    const simplified = rdpSimplify(closedArray, tolerance);
    // Remove the duplicated endpoint
    let finalPts = simplified.slice(0, -1);
    finalPts = removeCollinearPoints(finalPts, 2.5);

    if (finalPts.length < 3) {
      finalPts = points; // Keep original if over-simplified
    }

    return {
      ...contour,
      points: finalPts
    };
  } else {
    const simplified = rdpSimplify(points, tolerance);
    const finalPts = removeCollinearPoints(simplified, 2.5);
    return {
      ...contour,
      points: finalPts
    };
  }
}

/**
 * Simplifies all contours of a glyph based on the specified threshold tolerance.
 */
export function simplifyGlyphContours(glyph: CustomGlyph, tolerance: number): CustomGlyph {
  const newContours = glyph.contours.map((c) => simplifyContour(c, tolerance));
  return {
    ...glyph,
    contours: newContours
  };
}
