import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/**
 * The al-folio blog, redirected onto /writing.
 *
 * The previous site published these 27 essays under Jekyll's
 * `permalink: /blog/:year/:title/`, and those are the URLs that went out on
 * LinkedIn. They have to keep resolving, so this answers every path under /blog
 * with a 301 rather than letting the deploy quietly drop a year of shared links.
 *
 * Rendered on demand, not prerendered, on purpose: a prerendered redirect is an
 * HTML page with a meta refresh, which search engines treat as a soft redirect
 * and which passes the old URL's standing along slowly if at all. Railway runs a
 * Node server, so a real 301 costs nothing.
 *
 * The map is derived from the collection rather than written down — an essay's
 * id is `YYYY-MM-DD-slug` and Jekyll's `:title` was that same slug, lower-cased,
 * so a hand-maintained table could only go stale.
 */
export const prerender = false;

const posts = await getCollection('writing');

/** "/blog/2026/timeseries-blind-spot" -> "2026-01-09-timeseries-blind-spot" */
const byYearAndSlug = new Map(
  posts.map((p) => {
    const id = p.id.toLowerCase();
    const m = /^(\d{4})-\d{2}-\d{2}-(.+)$/.exec(id);
    return [m ? `${m[1]}/${m[2]}` : id, id];
  }),
);

export const GET: APIRoute = ({ params, redirect }) => {
  const path = (params.path ?? '')
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '');

  // /blog, /blog/2026, /blog/tag/personas, /blog/category/academia — the index
  if (!path) return redirect('/writing', 301);

  const post = byYearAndSlug.get(path);
  if (post) return redirect(`/writing/${post}`, 301);

  /**
   * Anything else under /blog — a year archive, a tag, a category, a slug that
   * no longer exists — goes to the index rather than a 404. These are old
   * inbound links; the index is where a reader can still find what they came
   * for, and a 301 to it keeps whatever standing the URL had.
   */
  return redirect('/writing', 301);
};
