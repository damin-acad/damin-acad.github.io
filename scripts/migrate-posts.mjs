/**
 * Moves the Jekyll _posts into an Astro content collection.
 *
 * These are the FULL essays — 48,622 words across 27 pieces with 426 section
 * headings. The portfolio carries ~300-word extracts of the same pieces and
 * links here for the rest, so this site is the canonical home for the long form.
 *
 * Jekyll frontmatter is rewritten to the collection schema; the body is left
 * exactly as written, including the inline callout <div>s, which the stylesheet
 * handles generically.
 *
 *   npm run posts
 */
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { load as loadYaml } from 'js-yaml';

const SRC = '_legacy/_posts';
const OUT = 'src/content/writing';

await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).filter((f) => f.endsWith('.md')).sort();
let words = 0;
let headings = 0;
const index = [];

for (const file of files) {
  const raw = await readFile(path.join(SRC, file), 'utf8');
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(raw);
  if (!m) {
    console.warn(`  skipped (no frontmatter): ${file}`);
    continue;
  }

  const fm = loadYaml(m[1]) ?? {};
  const body = raw.slice(m[0].length).replace(/^\s+/, '');

  // Astro lowercases content-collection ids, so every generated URL — here and
  // in the portfolio's map — has to be lowercased or the three filenames with
  // capitals (RAG-works, Specialist-vs-Generalist, AI-Ethics) 404.
  const slug = file.replace(/\.md$/, '').toLowerCase();
  // Jekyll dates can be strings or Date objects depending on quoting
  const date =
    fm.date instanceof Date
      ? fm.date.toISOString().slice(0, 10)
      : String(fm.date ?? slug.slice(0, 10)).slice(0, 10);

  const tags = Array.isArray(fm.tags)
    ? fm.tags
    : String(fm.tags ?? '')
        .split(/\s+/)
        .filter(Boolean);

  const title = String(fm.title ?? slug).replace(/"/g, '\\"');
  const excerpt = String(fm.description ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/"/g, '\\"');

  const out = [
    '---',
    `title: "${title}"`,
    `date: ${date}`,
    excerpt ? `excerpt: "${excerpt}"` : 'excerpt: ""',
    tags.length ? `tags: [${tags.map((t) => JSON.stringify(t)).join(', ')}]` : 'tags: []',
    fm.featured ? 'featured: true' : 'featured: false',
    // just the slug; the page composes the URL from the current environment's
    // origin, so local runs link to the local portfolio
    `extractSlug: "${slug}"`,
    '---',
    '',
    body,
  ].join('\n');

  await writeFile(path.join(OUT, `${slug}.md`), out.endsWith('\n') ? out : out + '\n');

  const w = body.split(/\s+/).filter(Boolean).length;
  const h = (body.match(/^##+ /gm) ?? []).length;
  words += w;
  headings += h;
  index.push({ slug, title: fm.title ?? slug, date, words: w, headings: h });
}

console.log(`migrated ${index.length} posts · ${words.toLocaleString('en-GB')} words · ${headings} section headings`);
const thin = index.filter((p) => p.words < 400);
if (thin.length) console.warn('  unexpectedly short (check these):', thin.map((p) => p.slug));
console.log('  longest:');
[...index]
  .sort((a, b) => b.words - a.words)
  .slice(0, 5)
  .forEach((p) => console.log(`    ${p.slug.padEnd(44)} ${String(p.words).padStart(5)}w  ${p.headings} headings`));

// the portfolio reads this to link each extract to its full version
await writeFile(
  'src/data/full-versions.json',
  JSON.stringify(
    index.map(({ slug, title, date, words }) => ({
      slug,
      title,
      date,
      words,
      full: `https://academic.danialamin.com/writing/${slug}`,
    })),
    null,
    2,
  ) + '\n',
);
console.log('  wrote src/data/full-versions.json');
