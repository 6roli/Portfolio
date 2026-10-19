import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { focusAreas } from './config/site';
import { themeIds } from './config/themes';

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
    /** Accent colours of the project page and card (see src/config/themes.ts). */
    theme: z.enum(themeIds).default('aurora'),
    technologies: z.array(z.string()).default([]),
    image: z
      .object({
        src: z.string().startsWith('/'),
        alt: z.string().min(1),
        credit: z.string().optional(),
      })
      .optional(),
    demoUrl: z.url().optional(),
    /** Text of the demo button, e.g. "Try Chatbot". Defaults to "Open demo". */
    demoLabel: z.string().min(1).max(40).optional(),
    /** Rules a visitor must follow to use the demo, shown as a numbered box under the buttons. */
    usage: z.array(z.string().min(1)).optional(),
    /**
     * Public JSON snapshot read in the browser to show live data on the project page
     * (currently the weather warehouse's gold/web/snapshot.json).
     */
    liveSnapshot: z.url().optional(),
    /** Short note under the demo button, e.g. that a free server needs time to wake up. */
    demoNote: z.string().optional(),
    /**
     * A real conversation recorded from the live demo, replayed at the top of the
     * project page. Must be copied verbatim from the app, never written by hand.
     */
    transcript: z
      .object({
        caption: z.string().min(1),
        messages: z.array(z.object({ from: z.enum(['user', 'bot']), text: z.string().min(1) })).min(2),
      })
      .optional(),
    /** Block diagram shown in the Architecture section. */
    architectureImage: z.object({ src: z.string().startsWith('/'), alt: z.string().min(1) }).optional(),
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
