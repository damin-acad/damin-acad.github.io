/**
 * A printing plate per piece, composed from its slug.
 *
 * Shared, by copy, with the portfolio at danialamin.com — the two sites are
 * separate repos with the same press, and a piece that exists on both (an extract
 * there, the full essay here) gets the same mark on both, because the mark is
 * derived from the same slug rather than stored anywhere.
 *
 * Every post needs a mark, and 51 of them cannot be drawn by hand — so each one
 * is derived from its own id: same slug, same plate, forever, with no asset to
 * store and nothing to keep in sync when a post is published from the studio.
 *
 * It is deliberately a small grammar rather than noise. Three to five motifs on a
 * 3x3 grid, one of them usually double-size so there is a focal point, drawn twice
 * in two inks with the second pass slightly out of register — which is the same
 * gesture the wordmark makes, at figure scale.
 */

export type Motif = 'block' | 'quarter' | 'half' | 'ring' | 'bars' | 'diag';

export type PlateShape = {
  kind: Motif;
  /** cell origin and size, in a 100-unit square */
  x: number;
  y: number;
  s: number;
  /** quarter turns, so motifs point in different directions */
  turn: 0 | 1 | 2 | 3;
};

export type PlateSpec = {
  shapes: PlateShape[];
  /** how far the second ink missed register, in units */
  offset: [number, number];
  /** whole-plate rotation, degrees */
  rotate: number;
};

/* ---------- deterministic randomness ---------- */

/** xmur3: string -> 32-bit seed */
function seedOf(str: string) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
  };
}

/** mulberry32: seed -> uniform [0,1) */
function rngOf(seed: string) {
  let a = seedOf(seed)();
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const MOTIFS: Motif[] = ['block', 'quarter', 'half', 'ring', 'bars', 'diag'];

const MARGIN = 6;

/**
 * Two grids, so a plate can hold its place in a hierarchy instead of being the
 * same mark at two sizes. `stamp` is the 3x3 used in list rails; `poster` is a 2x2
 * of much larger motifs, for the section heads and case headers where the plate is
 * doing the work an image would.
 */
export type Variant = 'stamp' | 'poster';
const GRID_FOR: Record<Variant, number> = { stamp: 3, poster: 2 };

export function plateFor(seed: string, variant: Variant = 'stamp'): PlateSpec {
  const GRID = GRID_FOR[variant];
  const CELL = (100 - MARGIN * 2) / GRID;
  const rnd = rngOf(seed);
  const pick = <T,>(xs: T[]) => xs[Math.floor(rnd() * xs.length)];

  // Cells are chosen from a shuffled list, so no cell is ever used twice and the
  // composition cannot collapse into a single corner.
  const cells: [number, number][] = [];
  for (let r = 0; r < GRID; r++) for (let c = 0; c < GRID; c++) cells.push([c, r]);
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }

  /**
   * Three or four motifs on the stamp — five shapes on a 3x3 grid stopped reading
   * as a mark at 32px and started reading as a smudge. The poster keeps two or
   * three, because its cells are half the plate each.
   */
  const count = variant === 'poster' ? 2 + Math.floor(rnd() * 2) : 3 + Math.floor(rnd() * 2);
  const shapes: PlateShape[] = [];

  // One motif is double-size when it fits, so the plate has a focal point rather
  // than reading as an even scatter.
  let bigUsed = false;
  const taken = new Set<string>();

  for (const [c, r] of cells) {
    if (shapes.length >= count) break;
    if (taken.has(`${c},${r}`)) continue;

    const canBeBig = !bigUsed && c < GRID - 1 && r < GRID - 1 &&
      !taken.has(`${c + 1},${r}`) && !taken.has(`${c},${r + 1}`) && !taken.has(`${c + 1},${r + 1}`);
    const big = variant === 'stamp' && canBeBig && rnd() < 0.55;

    const span = big ? 2 : 1;
    for (let dc = 0; dc < span; dc++) for (let dr = 0; dr < span; dr++) taken.add(`${c + dc},${r + dr}`);
    if (big) bigUsed = true;

    shapes.push({
      kind: pick(MOTIFS),
      x: MARGIN + c * CELL,
      y: MARGIN + r * CELL,
      s: CELL * span,
      turn: Math.floor(rnd() * 4) as 0 | 1 | 2 | 3,
    });
  }

  return {
    shapes,
    offset: [1.6 + rnd() * 2.4, 1.4 + rnd() * 2.2],
    rotate: (rnd() - 0.5) * 4,
  };
}

/** SVG path/geometry for one motif, in its own cell's coordinates */
export function pathFor(shape: PlateShape): { d?: string; circle?: { cx: number; cy: number; r: number; w: number }; rects?: [number, number, number, number][] } {
  const { x, y, s, kind } = shape;

  switch (kind) {
    case 'block':
      return { rects: [[x, y, s, s]] };

    case 'quarter':
      // a quarter disc filling the cell, hinged on the top-left corner
      return { d: `M ${x} ${y} L ${x + s} ${y} A ${s} ${s} 0 0 1 ${x} ${y + s} Z` };

    case 'half':
      // a half disc sitting on the cell's top edge
      return { d: `M ${x} ${y + s / 2} A ${s / 2} ${s / 2} 0 0 1 ${x + s} ${y + s / 2} Z` };

    case 'ring':
      return { circle: { cx: x + s / 2, cy: y + s / 2, r: s * 0.33, w: s * 0.15 } };

    case 'bars': {
      const w = s / 5;
      return { rects: [0, 2, 4].map((i) => [x + i * w, y, w, s] as [number, number, number, number]) };
    }

    case 'diag':
      return { d: `M ${x} ${y} L ${x + s} ${y} L ${x} ${y + s} Z` };
  }
}
