// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://academic.danialamin.com',
  trailingSlash: 'never',
  // Railway runs a Node server. Everything here is prerendered; the adapter is
  // for hosting, not for SSR.
  adapter: node({ mode: 'standalone' }),

  /**
   * The al-folio pages that have no equivalent here.
   *
   * The old site published these seven paths for two years. /blog and its 27
   * posts are handled by src/pages/blog/[...path].ts instead, which issues real
   * 301s — those are the URLs that went out on LinkedIn and are worth the Node
   * route. These seven are low-traffic navigation pages, so a redirect page is
   * enough.
   *
   * Written without trailing slashes because `trailingSlash: 'never'` strips one
   * before routing. `/publications/` needs no entry at all for the same reason —
   * it normalises onto the real page — and an entry for it silently REPLACED
   * that page in the build, so the record 404ed.
   *
   * /cv is deliberately absent: public/cv/ serves the PDF itself.
   */
  redirects: {
    '/news': '/#news',
    '/people': '/',
    '/projects': '/',
    '/repositories': '/',
    '/teaching': '/',
    '/books': '/',
  },
});
