import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string().default(''),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    /** the ~300-word version on the portfolio */
    extract: z.string().url().optional(),
  }),
});

export const collections = { writing };
