/**
 * Turns the Jekyll sources into JSON the Astro site can import.
 *
 *   _legacy/_bibliography/papers.bib  ->  src/data/publications.json
 *   _legacy/_data/cv.yml              ->  src/data/cv.json
 *
 * papers.bib stays the source of truth for publications, so adding a paper is
 * still one BibTeX entry and `npm run data`.
 *
 *   npm run data
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
// js-yaml v4 ships named ESM exports, not a default
import { load as loadYaml } from 'js-yaml';

const BIB = '_legacy/_bibliography/papers.bib';
const CV = '_legacy/_data/cv.yml';

/* ---------- bibtex ---------- */

/**
 * Reads one {...} group with balanced braces, so titles containing their own
 * braces survive — "Introducing Persona Ecosystem Playground {(PEP)}" and the
 * ``quoted'' titles in this file both need this.
 */
function readGroup(src, start) {
  let depth = 0;
  for (let i = start; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') {
      depth--;
      if (depth === 0) return { value: src.slice(start + 1, i), end: i + 1 };
    }
  }
  return { value: src.slice(start + 1), end: src.length };
}

function cleanTex(s) {
  return s
    .replace(/``/g, '“')
    .replace(/''/g, '”')
    .replace(/\\&/g, '&')
    .replace(/\\%/g, '%')
    .replace(/\\_/g, '_')
    .replace(/\\textquotesingle/g, '’')
    .replace(/---/g, '—')
    .replace(/--/g, '–')
    .replace(/[{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** "Amin, Danial and Salminen, Joni" -> ["Danial Amin", "Joni Salminen"] */
function parseAuthors(raw) {
  if (!raw) return [];
  return raw
    .split(/\s+and\s+/i)
    .map((a) => {
      const p = a.split(',').map((x) => cleanTex(x));
      return p.length > 1 ? `${p.slice(1).join(' ')} ${p[0]}`.replace(/\s+/g, ' ').trim() : cleanTex(a);
    })
    .filter(Boolean);
}

function parseBib(src) {
  const out = [];
  const re = /@(\w+)\s*\{\s*([^,\s]+)\s*,/g;
  let m;
  while ((m = re.exec(src))) {
    const type = m[1].toLowerCase();
    if (type === 'string' || type === 'comment' || type === 'preamble') continue;

    // walk fields until the entry's closing brace
    let i = re.lastIndex;
    const fields = {};
    let depth = 1;

    while (i < src.length && depth > 0) {
      const ch = src[i];
      if (ch === '}') {
        depth--;
        i++;
        continue;
      }
      if (/\s|,/.test(ch)) {
        i++;
        continue;
      }
      const keyMatch = /^([a-zA-Z_][\w-]*)\s*=\s*/.exec(src.slice(i));
      if (!keyMatch) {
        i++;
        continue;
      }
      const key = keyMatch[1].toLowerCase();
      let vStart = i + keyMatch[0].length;

      if (src[vStart] === '{') {
        const g = readGroup(src, vStart);
        fields[key] = g.value;
        i = g.end;
      } else if (src[vStart] === '"') {
        const close = src.indexOf('"', vStart + 1);
        fields[key] = src.slice(vStart + 1, close);
        i = close + 1;
      } else {
        const stop = /[,}]/.exec(src.slice(vStart));
        fields[key] = src.slice(vStart, vStart + (stop ? stop.index : 0));
        i = vStart + (stop ? stop.index : 0);
      }
    }

    const venue = fields.booktitle ?? fields.journal ?? fields.publisher ?? fields.school ?? '';
    const links = {};
    for (const k of ['url_code', 'url_poster', 'url_video', 'url_slides', 'url_data', 'html', 'url']) {
      const v = (fields[k] ?? '').trim();
      if (v) links[k.replace(/^url_/, '')] = cleanTex(v);
    }

    out.push({
      key: m[2],
      type,
      title: cleanTex(fields.title ?? ''),
      authors: parseAuthors(fields.author),
      venue: cleanTex(venue),
      abbr: cleanTex(fields.abbr ?? ''),
      year: Number((fields.year ?? '').replace(/\D/g, '')) || null,
      status: cleanTex(fields.note ?? ''),
      doi: cleanTex(fields.doi ?? ''),
      citations: Number((fields.citations ?? '').replace(/\D/g, '')) || 0,
      selected: /true/i.test(fields.selected ?? ''),
      links,
      // kept so the site can offer a real .bib download per entry
      raw: `@${type}{${m[2]},\n${Object.entries(fields)
        .filter(([k, v]) => v && !k.startsWith('url_') && !['img', 'bibtex_show', 'google_scholar_id'].includes(k))
        .map(([k, v]) => `  ${k} = {${v.replace(/\s+/g, ' ').trim()}}`)
        .join(',\n')}\n}`,
    });
  }
  return out;
}

/* ---------- run ---------- */

await mkdir('src/data', { recursive: true });

const pubs = parseBib(await readFile(BIB, 'utf8'));
pubs.sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.title.localeCompare(b.title));

const missing = pubs.filter((p) => !p.title || !p.year);
if (missing.length) {
  console.warn(`  warning: ${missing.length} entr(y|ies) missing title or year:`, missing.map((p) => p.key));
}

await writeFile('src/data/publications.json', JSON.stringify(pubs, null, 2) + '\n');

const byYear = pubs.reduce((acc, p) => ((acc[p.year] = (acc[p.year] ?? 0) + 1), acc), {});
console.log(`publications.json: ${pubs.length} entries`);
console.log('  by year:', Object.entries(byYear).sort((a, b) => b[0] - a[0]).map(([y, n]) => `${y}:${n}`).join(' '));
console.log('  by type:', Object.entries(pubs.reduce((a, p) => ((a[p.type] = (a[p.type] ?? 0) + 1), a), {})).map(([t, n]) => `${t}:${n}`).join(' '));
console.log('  selected:', pubs.filter((p) => p.selected).length, '| with doi:', pubs.filter((p) => p.doi).length);

const cv = loadYaml(await readFile(CV, 'utf8'));
await writeFile('src/data/cv.json', JSON.stringify(cv, null, 2) + '\n');
console.log(`cv.json: ${Array.isArray(cv) ? cv.length : 0} sections`);
if (Array.isArray(cv)) for (const s of cv) console.log('  -', s.title);
