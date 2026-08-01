import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.string(),
    readTime: z.string(),
    tags: z.array(z.string()).default([]),
    category: z.enum(['technical', 'career', 'insights']),
    author: z.string().optional(),
    videoUrl: z.string().optional(),
  }),
});

const systems = defineCollection({
  loader: glob({
    pattern: '**/*.json',
    base: './src/content/systems',
    generateId: ({ entry }) => entry.replace(/\.json$/, ''),
  }),
  schema: z.object({
    locale: z.enum(['pt-BR', 'en']),
    slug: z.string(),
    tier: z.enum(['dossier', 'lab']),
    status: z.enum(['verified', 'implemented', 'experimental', 'planned']),
    sourceRepo: z.string().url(),
    sourceCommit: z.string().min(4),
    license: z.string().min(1),
    title: z.string(),
    eyebrow: z.string(),
    summary: z.string(),
    card: z
      .object({
        summary: z.string(),
        context: z.string(),
        decision: z.string(),
        evidence: z.string(),
        limit: z.string(),
      })
      .optional(),
    context: z.string(),
    constraints: z.array(z.string()).min(1),
    decisions: z.array(z.object({ title: z.string(), body: z.string() })).min(1),
    qualityAttributes: z
      .array(z.object({ name: z.string(), approach: z.string(), evidence: z.string() }))
      .default([]),
    evidence: z
      .array(z.object({ label: z.string(), detail: z.string(), href: z.string().optional() }))
      .min(1),
    limits: z.array(z.string()).min(1),
    diagram: z
      .array(
        z.object({
          label: z.string(),
          detail: z.string(),
          tone: z.enum(['boundary', 'decision', 'evidence', 'risk']),
        }),
      )
      .min(2),
  }),
});

export const collections = { blog, systems };
