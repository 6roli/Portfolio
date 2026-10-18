import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { focusAreas } from './config/site';

const focusAreaIds = focusAreas.map((area) => area.id) as [string, ...string[]];

/**
 * A section is either confirmed text or `null`. `null` renders as a visible
 * "pending" marker, so a missing result is never silently replaced by filler.
 */
const section = z.string().min(1).nullable();

const projects = defineCollection({
  // Projects live in src/content/projects/<locale>/<slug>.md
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1).max(220),
    status: z.enum(['live', 'in-progress', 'repository']),
    featured: z.boolean().default(false),
    /** Lower numbers appear first. */
    order: z.number().int().default(100),
    areas: z.array(z.enum(focusAreaIds)).min(1),
    technologies: z.array(z.string()).default([]),
    image: z
      .object({
        src: z.string().startsWith('/'),
        alt: z.string().min(1),
        credit: z.string().optional(),
      })
      .optional(),
    demoUrl: z.url().optional(),
    repoUrl: z.url().optional(),
    repoIsPublic: z.boolean().default(true),
    /** True when Gabriel has not yet confirmed the text. Shown as a notice. */
    needsReview: z.boolean().default(false),
    problem: section,
    data: section,
    method: section,
    results: section,
    limitations: section,
    architecture: section,
  }),
});

export const collections = { projects };
