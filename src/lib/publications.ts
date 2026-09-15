import record from '../data/publications.json';
import site from '../data/site.json';

export type Publication = {
  key: string;
  type: string;
  title: string;
  authors: string[];
  /** empty while the paper is under review — see scripts/build-data.mjs */
  venue: string;
  abbr: string;
  year: number | null;
  /** the raw note, e.g. "Published, Extended Abstract" */
  status: string;
  /** "Published" | "Accepted" | "In review" */
  state: string;
  /** "Workshop" | "Poster" | "Extended Abstract" | "Preprint" | "Paper" | "" */
  form: string;
  underReview: boolean;
  doi: string;
  citations: number;
  /** reading order at the front of the record, 1 first; 0 means not selected */
  selected: number;
  scholarId: string;
  links: { label: string; href: string }[];
  raw: string;
};

export const publications = record.entries as Publication[];

/**
 * The date the record was built from papers.bib.
 *
 * Citation counts are copied into the bib by hand, so they are a snapshot. An
 * undated count reads as live; this lets the page say "as of".
 */
export const generated = record.generated as string;

export const landed = publications.filter((p) => /^(Published|Accepted)/i.test(p.state));
export const inReview = publications.filter((p) => p.underReview);

/**
 * Published and under-review work, counted apart.
 *
 * "31 publications" counts ten manuscripts under review and a preprint beside
 * twenty peer-reviewed items. This audience counts too, and finds the
 * difference; saying both numbers costs nothing and survives the check.
 */
export const tally = {
  total: publications.length,
  landed: landed.length,
  inReview: inReview.length,
};

/** the front of the record, in the order it should be read */
export const selected = publications
  .filter((p) => p.selected > 0)
  .sort((a, b) => a.selected - b.selected);

/**
 * Everyone he has published with.
 *
 * This used to count name variants as separate people — Soon-gyo and Soon-Gyo
 * Jung, three spellings of Thi Thu Trang Xuan, Jinan Azem with and without the
 * initial, Faizan and Faizaan Malik — which inflated the figure by five. The
 * spellings are fixed in papers.bib; this is now just the count.
 */
export const coauthors = new Set(
  publications.flatMap((p) => p.authors).filter((a) => a !== site.name),
);

export const years = publications.map((p) => p.year).filter(Boolean) as number[];
export const span = `${Math.min(...years)}–${Math.max(...years)}`;

/** what to print as the venue: nothing at all while a paper is under review */
export const venueOf = (p: Publication) => p.abbr || p.venue;

/**
 * The badge beside a paper.
 *
 * "Published" on its own is the ordinary case and says nothing, so it is left
 * off — but the note packed the state and the form into one string, so a poster
 * read "Published, Poster" while an ordinary paper read nothing, and IUI, DSS
 * and PEP looked like entries someone had forgotten to finish.
 */
export const badgeOf = (p: Publication) =>
  /^published$/i.test(p.state) ? p.form : [p.state, p.form].filter(Boolean).join(' · ');
