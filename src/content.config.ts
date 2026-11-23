import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const link = z.string().refine(value => /^https?:\/\//.test(value) || /^\/(?!\/)/.test(value), 'Use an https:// URL or a local /files/ path');
const image = { thumbnail: z.string().optional(), thumbnailAlt: z.string().optional() };
const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string().min(1), authors: z.array(z.string().min(1)).min(1), date: z.coerce.date(),
    venue: z.string().min(1), venueShort: z.string().optional(), summary: z.string().min(1),
    featured: z.boolean().default(false), flagship: z.boolean().default(false), paperUrl: link.optional(), codeUrl: link.optional(),
    bibtexUrl: link.optional(), citation: z.string().optional(), bibtex: z.string().optional(), thumbnailCaption: z.string().optional(), ...image,
  }),
});
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({ title: z.string().min(1), summary: z.string().min(1), role: z.string().min(1),
    order: z.number().default(0), dates: z.string().optional(), featured: z.boolean().default(false),
    projectUrl: link.optional(), codeUrl: link.optional(), ...image }),
});
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({ title: z.string().min(1), date: z.coerce.date(), link: link.optional() }),
});
const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({ title: z.string().min(1), institution: z.string().min(1), period: z.string().min(1), order: z.number() }),
});
const awards = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/awards' }),
  schema: z.object({ title: z.string().min(1), year: z.number(), description: z.string().min(1) }),
});
export const collections = { publications, projects, news, experience, awards };
