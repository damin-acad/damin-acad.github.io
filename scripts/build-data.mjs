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
import { readdir } from 'node:fs/promises';

const BIB = '_legacy/_bibliography/papers.bib';
const CV = '_legacy/_data/cv.yml';
const NEWS = '_legacy/_news';

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

function parseBib(input) {
  /**
   * Commented-out entries are commented out.
   *
   * The entry scanner below looks for `@type{key,` anywhere in the file, which
   * meant a `%`-commented entry was still parsed and still published — the one
   * convention anybody uses to retire a paper from a bibliography did nothing
   * here. Nine entries were retired from the CV that way and would have gone on
   * appearing on the site.
   *
   * Lines whose first non-space character is `%` are dropped before scanning.
   * An escaped `\%` inside a field is mid-line and survives, which is the only
   * place a literal percent appears in this file.
   */
  const src = input
    .split('\n')
    .filter((line) => !/^\s*%/.test(line))
    .join('\n');

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

    const note = cleanTex(fields.note ?? '');

    /**
     * Where a manuscript has been *submitted* is not part of the public record.
     *
     * An entry that reads "In review at IEEE Access" for a year and then appears
     * somewhere else has published its own rejection. papers.bib keeps the
     * target — it is the working record, and he needs to know where things sit —
     * but neither the page nor the BibTeX download carries it until the paper is
     * accepted. Accepted and published work keeps its venue: that part is a fact.
     */
    const underReview = /^in review/i.test(note);

    /**
     * `note` packs two different things into one string: where the paper stands
     * ("Published", "Accepted", "In review") and what form it took ("Workshop",
     * "Poster", "Extended Abstract"). Rendered whole, a plain "Published" paper
     * got no label at all while a poster got "Published, Poster" — so IUI, DSS
     * and PEP looked like they were missing something the others had. Split, the
     * page can say the form and stay quiet about the ordinary case.
     */
    const [state, form = ''] = note.split(',').map((x) => x.trim());
    const rawVenue = fields.booktitle ?? fields.journal ?? fields.publisher ?? fields.school ?? '';
    const venue = underReview ? '' : rawVenue;

    /**
     * Every link al-folio surfaced, in the order it showed them. The first pass
     * only looked at url_* and html, which quietly dropped arxiv, slides and the
     * Scholar id — 20 links across the bibliography.
     */
    const LINKS = [
      ['html', 'HTML'],
      ['url', 'link'],
      ['arxiv', 'arXiv'],
      ['pdf', 'PDF'],
      ['url_pdf', 'PDF'],
      ['url_code', 'code'],
      ['code', 'code'],
      ['url_slides', 'slides'],
      ['slides', 'slides'],
      ['url_poster', 'poster'],
      ['poster', 'poster'],
      ['url_video', 'video'],
      ['video', 'video'],
      ['url_data', 'data'],
      ['website', 'website'],
    ];
    const links = [];
    for (const [key, label] of LINKS) {
      let v = (fields[key] ?? '').trim();
      if (!v) continue;
      v = cleanTex(v);
      // arxiv is often an id rather than a URL
      if (key === 'arxiv' && !/^https?:/.test(v)) v = `https://arxiv.org/abs/${v}`;
      if (!/^https?:/.test(v)) continue;
      if (links.some((l) => l.href === v)) continue;
      links.push({ label, href: v });
    }

    const scholarId = (fields.google_scholar_id ?? '').trim();
    const doi = cleanTex(fields.doi ?? '');

    /**
     * A "HTML" button beside a "doi" button that lands on the same article is
     * two buttons doing one job — dl.acm.org/doi/10.1145/X and
     * doi.org/10.1145/X differ only in which redirect you take. Anything whose
     * URL contains the DOI is that link, so the DOI button stands for it.
     * A publisher page that does not carry the DOI in its URL is a genuinely
     * different landing page and survives.
     */
    const shown = doi ? links.filter((l) => !l.href.includes(doi)) : links;

    out.push({
      key: m[2],
      type,
      title: cleanTex(fields.title ?? ''),
      authors: parseAuthors(fields.author),
      venue: cleanTex(venue),
      // the rows are grouped under a year heading already, so an abbr that
      // carries its own year is both redundant and — CHI'2026 beside CHI'25
      // beside a bare IJHCI — inconsistent about how
      abbr: underReview ? '' : cleanTex(fields.abbr ?? '').replace(/[\u2019'"]\s*\d{2,4}$/, ''),
      year: Number((fields.year ?? '').replace(/\D/g, '')) || null,
      status: note,
      state,
      form,
      underReview,
      doi,
      citations: Number((fields.citations ?? '').replace(/\D/g, '')) || 0,
      /**
       * Reading order for the front of the record, 1 first; 0 means not
       * selected. al-folio used a boolean, which left the order to fall out of
       * the year sort — so whichever paper happened to sort first led the
       * homepage, and for a while that was an under-review submission.
       */
      selected: /^\d+$/.test((fields.selected ?? '').trim())
        ? Number((fields.selected ?? '').trim())
        : 0,
      scholarId,
      links: shown,
      // kept so the site can offer a real .bib download per entry
      raw: `@${type}{${m[2]},\n${Object.entries(fields)
        .filter(([k, v]) => v && !k.startsWith('url_') && !['img', 'bibtex_show', 'google_scholar_id'].includes(k))
        // same rule as the page: a manuscript under review does not name its target
        .filter(([k]) => !(underReview && ['booktitle', 'journal', 'publisher', 'school', 'abbr'].includes(k)))
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

/**
 * When this was built.
 *
 * The citation counts are copied by hand into papers.bib, so they are a snapshot
 * and will drift. An undated number reads as current; a dated one is honest and
 * costs a line. The page prints it beside the total.
 */
const generated = new Date().toISOString().slice(0, 10);

await writeFile(
  'src/data/publications.json',
  JSON.stringify({ generated, entries: pubs }, null, 2) + '\n',
);

const byYear = pubs.reduce((acc, p) => ((acc[p.year] = (acc[p.year] ?? 0) + 1), acc), {});
console.log(`publications.json: ${pubs.length} entries`);
console.log('  by year:', Object.entries(byYear).sort((a, b) => b[0] - a[0]).map(([y, n]) => `${y}:${n}`).join(' '));
console.log('  by type:', Object.entries(pubs.reduce((a, p) => ((a[p.type] = (a[p.type] ?? 0) + 1), a), {})).map(([t, n]) => `${t}:${n}`).join(' '));
console.log('  selected:', pubs.filter((p) => p.selected).length, '| with doi:', pubs.filter((p) => p.doi).length);

// a paper marked selected but unranked would silently drop out of the front of
// the record, which is the failure the ranks were introduced to stop
const stillTrue = (await readFile(BIB, 'utf8')).match(/selected=\{true\}/gi) ?? [];
if (stillTrue.length) {
  console.warn(`  warning: ${stillTrue.length} entr(y|ies) still use selected={true}; give them a rank`);
}

const wrongly = pubs.filter((p) => p.selected && !/^(Published|Accepted)/i.test(p.status));
if (wrongly.length) {
  throw new Error(
    `selected but not published or accepted: ${wrongly.map((p) => p.key).join(', ')}`,
  );
}

/* ---------- news ---------- */

/**
 * The announcements the old site carried, which the new one dropped.
 *
 * Academic visitors read a news strip to see whether someone is active — an
 * acceptance, a talk, a paper landing. Without one the most recent sign of life
 * on any of the three sites was April. These are the al-folio `_news` files,
 * read from the same `_legacy` tree as the bibliography and the CV, so there is
 * one place to add the next one.
 *
 * Each file is Jekyll frontmatter (a `date`) followed by a paragraph of HTML.
 */
function parseNews(src) {
  const m = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(src);
  if (!m) return null;
  const date = /^date:\s*(.+)$/m.exec(m[1])?.[1]?.trim();
  const text = m[2].trim().replace(/\s+/g, ' ');
  return date && text ? { date, text } : null;
}

/**
 * One link in the old news was wrong rather than missing.
 *
 * The April CHI item and the March book-chapter item both pointed at the same
 * LinkedIn post — the book chapter's. A link that goes somewhere confidently
 * wrong is worse than no link, so a duplicate href is stripped from the later
 * item and the text stays. Put the real URL in _legacy/_news and it comes back.
 */
const news = [];
for (const f of (await readdir(NEWS)).filter((n) => n.endsWith('.md')).sort()) {
  const item = parseNews(await readFile(`${NEWS}/${f}`, 'utf8'));
  if (item) news.push({ ...item, file: f });
}
news.sort((a, b) => (a.date < b.date ? 1 : -1));

const seenHref = new Set();
let stripped = 0;
for (const item of news) {
  const href = /href=['"]([^'"]+)['"]/.exec(item.text)?.[1];
  if (!href) continue;
  if (seenHref.has(href)) {
    item.text = item.text.replace(/\s*<a[^>]*>.*?<\/a>\s*/g, ' ').trim();
    item.duplicateLinkRemoved = true;
    stripped++;
  } else {
    seenHref.add(href);
  }
}

await writeFile('src/data/news.json', JSON.stringify(news, null, 2) + '\n');
console.log(`news.json: ${news.length} items, newest ${news[0]?.date}`);
if (stripped) console.log(`  ${stripped} duplicate link(s) stripped — see the note in build-data.mjs`);

const cv = loadYaml(await readFile(CV, 'utf8'));
await writeFile('src/data/cv.json', JSON.stringify(cv, null, 2) + '\n');
console.log(`cv.json: ${Array.isArray(cv) ? cv.length : 0} sections`);
if (Array.isArray(cv)) for (const s of cv) console.log('  -', s.title);
