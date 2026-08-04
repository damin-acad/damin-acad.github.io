// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://academic.danialamin.com',
  trailingSlash: 'never',
  // Railway runs a Node server. Everything here is prerendered; the adapter is
  // for hosting, not for SSR.
  adapter: node({ mode: 'standalone' }),
});
