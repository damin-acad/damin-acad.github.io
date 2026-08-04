/**
 * Fig. 1 for the academic site — a co-word map of the publication titles.
 *
 * Co-word analysis is a standard bibliometric method: terms that appear
 * together in titles are treated as conceptually adjacent, and the resulting
 * matrix is projected to two dimensions. Same pipeline as the portfolio's
 * concept map, different corpus and much smaller, so the parameters differ:
 * 31 titles instead of 50 essays means a document floor of 2 and roughly 55
 * terms rather than 140.
 *
 * Because the academic site is set in one ink with no magnifier, the map has to
 * be legible at rest — so it keeps fewer nodes and labels all of them.
 *
 * Deterministic throughout (no Math.random), so it only moves when papers.bib
 * does.
 *
 *   npm run map
 */
import { readFile, writeFile } from 'node:fs/promises';

const STOP = new Set(
  `a an and are as at be by for from how in into is it its of on or the to via with within
  their there these this those what when where which who why will would can could may might
  using use used toward towards about between across after before during through over under
  more most less least such than then also both each other same some any all not no than
  we our us you your they them he she his her
  paper papers study studies research work works approach approaches method methods
  new novel towards toward case cases based case-study preprint chapter book section
  introduction introducing proposing examining investigating analyzing exploring understanding
  applying creating evaluating reconceptualizing modeling comparing measuring assessing
  really extent whether does do done make made making
  first second third
  conference proceedings journal international acm ieee springer palgrave press
  volume issue pages vol no pp`
    .split(/\s+/)
    .filter(Boolean),
);

const norm = (w) => w.toLowerCase().replace(/[^a-z0-9-]/g, '');

function tokens(text) {
  const words = text
    .split(/[^A-Za-z0-9'-]+/)
    .map(norm)
    .filter((w) => w.length > 2 && w.length < 26 && !STOP.has(w) && !/^\d+$/.test(w));
  const out = [...words];
  for (let i = 0; i < words.length - 1; i++) out.push(`${words[i]} ${words[i + 1]}`);
  return out;
}

const dot = (a, b) => {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
};

function topEigen(M, k, iters = 300) {
  const n = M.length;
  const out = [];
  const A = M.map((r) => Float64Array.from(r));
  for (let c = 0; c < k; c++) {
    let v = Float64Array.from({ length: n }, (_, i) => Math.sin((i + 1) * (c + 1) * 0.7) + 0.5);
    let m0 = Math.sqrt(v.reduce((s, x) => s + x * x, 0)) || 1;
    v = v.map((x) => x / m0);
    let lambda = 0;
    for (let it = 0; it < iters; it++) {
      const w = new Float64Array(n);
      for (let i = 0; i < n; i++) {
        let s = 0;
        for (let j = 0; j < n; j++) s += A[i][j] * v[j];
        w[i] = s;
      }
      const m = Math.sqrt(w.reduce((s, x) => s + x * x, 0));
      if (m < 1e-12) break;
      for (let i = 0; i < n; i++) w[i] /= m;
      lambda = m;
      v = w;
    }
    out.push({ value: lambda, vector: v });
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) A[i][j] -= lambda * v[i] * v[j];
  }
  return out;
}

function mds(D) {
  const n = D.length;
  const sq = D.map((r) => r.map((d) => d * d));
  const rowMean = sq.map((r) => r.reduce((a, b) => a + b, 0) / n);
  const grand = rowMean.reduce((a, b) => a + b, 0) / n;
  const B = sq.map((r, i) => r.map((v, j) => -0.5 * (v - rowMean[i] - rowMean[j] + grand)));
  const [e1, e2] = topEigen(B, 2);
  const s1 = Math.sqrt(Math.max(e1.value, 0));
  const s2 = Math.sqrt(Math.max(e2.value, 0));
  return Array.from({ length: n }, (_, i) => [e1.vector[i] * s1, e2.vector[i] * s2]);
}

function kmeans(vectors, k, iters = 80) {
  const n = vectors.length;
  const dim = vectors[0].length;
  const centres = [vectors[0]];
  while (centres.length < k) {
    let bi = 0;
    let bd = -1;
    for (let i = 0; i < n; i++) {
      let near = Infinity;
      for (const c of centres) near = Math.min(near, 1 - dot(vectors[i], c));
      if (near > bd) {
        bd = near;
        bi = i;
      }
    }
    centres.push(vectors[bi]);
  }
  const assign = new Array(n).fill(0);
  for (let it = 0; it < iters; it++) {
    let moved = false;
    for (let i = 0; i < n; i++) {
      let best = 0;
      let bs = -Infinity;
      for (let c = 0; c < k; c++) {
        const s = dot(vectors[i], centres[c]);
        if (s > bs) {
          bs = s;
          best = c;
        }
      }
      if (assign[i] !== best) {
        assign[i] = best;
        moved = true;
      }
    }
    for (let c = 0; c < k; c++) {
      const acc = new Float64Array(dim);
      let count = 0;
      for (let i = 0; i < n; i++) {
        if (assign[i] !== c) continue;
        count++;
        for (let d = 0; d < dim; d++) acc[d] += vectors[i][d];
      }
      if (!count) continue;
      let m = 0;
      for (let d = 0; d < dim; d++) m += acc[d] * acc[d];
      m = Math.sqrt(m) || 1;
      centres[c] = Array.from(acc, (x) => x / m);
    }
    if (!moved) break;
  }
  return assign;
}

const dotArr = (a, b) => {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
};

/**
 * Principal components of the term-document matrix.
 *
 * The Projector offers PCA / t-SNE / UMAP; these are the two projections that
 * can be computed here deterministically and honestly labelled, so the switcher
 * offers PCA and MDS rather than pretending to run t-SNE.
 */
function pca(vectors) {
  const n = vectors.length;
  const dim = vectors[0].length;

  const mean = new Float64Array(dim);
  for (const v of vectors) for (let d = 0; d < dim; d++) mean[d] += v[d] / n;
  const X = vectors.map((v) => Float64Array.from(v, (x, d) => x - mean[d]));

  const C = Array.from({ length: dim }, () => new Float64Array(dim));
  for (const x of X) {
    for (let i = 0; i < dim; i++) {
      for (let j = i; j < dim; j++) {
        const p = x[i] * x[j];
        C[i][j] += p;
        if (i !== j) C[j][i] += p;
      }
    }
  }
  const denom = Math.max(n - 1, 1);
  for (let i = 0; i < dim; i++) for (let j = 0; j < dim; j++) C[i][j] /= denom;

  const [e1, e2] = topEigen(
    C.map((r) => Array.from(r)),
    2,
  );
  const varTotal = Array.from({ length: dim }, (_, i) => C[i][i]).reduce((a, b) => a + b, 0) || 1;
  return {
    points: X.map((x) => [dotArr(x, e1.vector), dotArr(x, e2.vector)]),
    explained: [e1.value / varTotal, e2.value / varTotal],
  };
}

/** labels must not collide, because nothing here hides behind a magnifier */
function relax(pts, sizes, rounds = 320) {
  const p = pts.map(([x, y]) => [x, y]);
  for (let r = 0; r < rounds; r++) {
    for (let i = 0; i < p.length; i++) {
      for (let j = i + 1; j < p.length; j++) {
        const need = (sizes[i] + sizes[j]) * 0.5;
        let dx = p[j][0] - p[i][0];
        let dy = p[j][1] - p[i][1];
        const d = Math.hypot(dx, dy);
        if (d > need || d === 0) continue;
        const push = (need - d) / 2;
        dx /= d;
        dy /= d;
        p[i][0] -= dx * push * 0.6;
        p[i][1] -= dy * push * 0.6;
        p[j][0] += dx * push * 0.6;
        p[j][1] += dy * push * 0.6;
      }
    }
  }
  return p;
}

/* ---------- run ---------- */

const pubs = JSON.parse(await readFile('src/data/publications.json', 'utf8'));
const docs = pubs.map((p) => ({ key: p.key, title: p.title, year: p.year, text: p.title }));

const MIN_DF = 2;
const MAX_DF_RATIO = 0.6;
const TOP = 55;

const tf = docs.map(() => new Map());
const df = new Map();
docs.forEach((d, i) => {
  const seen = new Set();
  for (const t of tokens(d.text)) {
    tf[i].set(t, (tf[i].get(t) ?? 0) + 1);
    seen.add(t);
  }
  for (const t of seen) df.set(t, (df.get(t) ?? 0) + 1);
});

const N = docs.length;
const maxDf = Math.floor(N * MAX_DF_RATIO);
const scored = [...df.entries()]
  .filter(([, n]) => n >= MIN_DF && n <= maxDf)
  .map(([t, n]) => {
    const idf = Math.log(N / (n + 1)) + 1;
    let s = 0;
    for (let i = 0; i < N; i++) s += (tf[i].get(t) ?? 0) * idf;
    return { t, s: s * (t.includes(' ') ? 1.3 : 1), df: n };
  })
  .sort((a, b) => b.s - a.s);

const picked = [];
for (const c of scored) {
  if (picked.length >= TOP) break;
  if (picked.some((p) => p.t !== c.t && (p.t.includes(c.t) || c.t.includes(p.t)))) continue;
  picked.push(c);
}

const terms = picked.map((p) => p.t);
const vectors = terms.map((t) => {
  const idf = Math.log(N / (df.get(t) + 1)) + 1;
  const v = new Float64Array(N);
  for (let i = 0; i < N; i++) {
    const c = tf[i].get(t) ?? 0;
    v[i] = c > 0 ? (1 + Math.log(c)) * idf : 0;
  }
  let m = 0;
  for (const x of v) m += x * x;
  m = Math.sqrt(m) || 1;
  for (let i = 0; i < N; i++) v[i] /= m;
  return v;
});

const n = terms.length;
const sim = Array.from({ length: n }, () => new Float64Array(n));
for (let i = 0; i < n; i++) {
  for (let j = i; j < n; j++) {
    const s = dot(vectors[i], vectors[j]);
    sim[i][j] = s;
    sim[j][i] = s;
  }
}
const D = Array.from({ length: n }, (_, i) =>
  Array.from({ length: n }, (_, j) => Math.sqrt(Math.max(0, 2 - 2 * sim[i][j]))),
);

const clusters = kmeans(vectors, 3);

// canvas dimensions: declared before place(), which closes over them
const W = 1000;
const H = 640;

const weights0 = terms.map((t) => df.get(t));
const maxW0 = Math.max(...weights0);
const footprint = terms.map((_, i) => 46 + (weights0[i] / maxW0) * 30);

/** normalise a raw 2D layout into the canvas and pull labels apart */
function place(raw2) {
  const xs = raw2.map((p) => p[0]);
  const ys = raw2.map((p) => p[1]);
  const [mnX, mxX, mnY, mxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const scaled = raw2.map(([x, y]) => [
    70 + ((x - mnX) / (mxX - mnX || 1)) * (W - 190),
    38 + ((y - mnY) / (mxY - mnY || 1)) * (H - 76),
  ]);
  return relax(scaled, footprint).map(([x, y]) => [
    +Math.min(Math.max(x, 24), W - 24).toFixed(1),
    +Math.min(Math.max(y, 20), H - 20).toFixed(1),
  ]);
}

const mdsPts = mds(D);
const pcaOut = pca(vectors);

const layouts = {
  mds: place(mdsPts),
  pca: place(pcaOut.points),
};
const raw = mdsPts;

const xs = raw.map((p) => p[0]);
const ys = raw.map((p) => p[1]);
const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
const scaled = raw.map(([x, y]) => [
  70 + ((x - minX) / (maxX - minX || 1)) * (W - 190),
  38 + ((y - minY) / (maxY - minY || 1)) * (H - 76),
]);

const weights = weights0;
const maxW = maxW0;

const nodes = terms.map((t, i) => ({
  term: t,
  papers: weights[i],
  cluster: clusters[i],
  r: +(3 + (weights[i] / maxW) * 8).toFixed(1),
  // cosine distance, the number the Projector's inspector actually shows
  neighbours: terms
    .map((other, j) => ({ other, s: sim[i][j], j }))
    .filter((c) => c.j !== i && c.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 8)
    .map((c) => ({ term: c.other, d: +(1 - c.s).toFixed(3) })),
  // the actual papers using this term, so a concept is a way into the record
  keys: docs
    .map((d, j) => ({ d, c: tf[j].get(t) ?? 0 }))
    .filter((c) => c.c > 0)
    .sort((a, b) => (b.d.year ?? 0) - (a.d.year ?? 0))
    .map((c) => c.d.key),
}));

const edges = [];
for (let i = 0; i < n; i++) {
  const best = terms
    .map((_, j) => ({ j, s: sim[i][j] }))
    .filter((c) => c.j !== i && c.s > 0.28)
    .sort((a, b) => b.s - a.s)
    .slice(0, 2);
  for (const b of best) {
    const a = Math.min(i, b.j);
    const z = Math.max(i, b.j);
    if (!edges.some((e) => e.a === a && e.b === z)) edges.push({ a, b: z, s: +b.s.toFixed(3) });
  }
}

await writeFile(
  'src/data/research-map.json',
  JSON.stringify(
    {
      method: 'co-word analysis of publication titles; tf-idf term vectors, cosine distance',
      papers: N,
      dims: N,
      width: W,
      height: H,
      projections: [
        { id: 'mds', label: 'MDS', note: 'classical multidimensional scaling on cosine distance' },
        {
          id: 'pca',
          label: 'PCA',
          note: `principal components 1-2 · ${(pcaOut.explained[0] * 100).toFixed(1)}% + ${(pcaOut.explained[1] * 100).toFixed(1)}% variance`,
        },
      ],
      layouts,
      nodes,
      edges,
    },
    null,
    2,
  ) + '\n',
);

console.log(`research-map.json: ${nodes.length} terms from ${N} titles, ${edges.length} edges`);
const byCluster = nodes.reduce((a, nd) => ((a[nd.cluster] = a[nd.cluster] ?? []).push(nd.term), a), {});
for (const [c, list] of Object.entries(byCluster)) {
  console.log(`  cluster ${c} (${list.length}): ${list.slice(0, 10).join(', ')}`);
}
console.log('most frequent:');
[...nodes]
  .sort((a, b) => b.papers - a.papers)
  .slice(0, 10)
  .forEach((nd) => console.log(`  ${nd.term.padEnd(26)} ${nd.papers} papers → ${nd.neighbours.join(', ')}`));
