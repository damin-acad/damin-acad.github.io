# academic.danialamin.com

Astro rebuild of the al-folio Jekyll site, in the "quiet print" variant of the
design system used on [danialamin.com](https://danialamin.com).

## Data flow

`_legacy/_bibliography/papers.bib` and `_legacy/_data/cv.yml` remain the sources
of truth. `npm run data` parses them into `src/data/*.json`; `npm run map`
derives the Fig. 1 co-word map from the parsed publications. Both run
automatically via `prebuild`, so adding a paper is one BibTeX entry and a build.

```
npm install
npm run dev          # localhost:4321
npm run build        # data + map + astro build
npm start            # serve dist/server/entry.mjs
```

## Deploy

Railway, via the Dockerfile. Every page is prerendered; the Node adapter is for
hosting, not SSR.

## What was dropped from the Jekyll site

al-folio demo content that was live but never filled in: 9 placeholder projects,
6 placeholder news announcements, the bookshelf, the "people" and submenu demo
pages, and `teaching.md` (which still contained "Replace this text with your
description"). The old tree is preserved under `_legacy/` for reference.
