import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const nodeKind = z.enum(['boundary', 'decision', 'evidence', 'risk']);

/**
 * Dossiês e laboratórios. O schema é o contrato editorial: um caso não entra
 * no site sem restrição, decisão, evidência e limite declarado — é essa
 * quádrupla que separa um dossiê de um cartão de projeto.
 */
const systems = defineCollection({
  loader: glob({ base: './src/content/systems', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    /** dossier ocupa um painel próprio na home; lab entra na grade. */
    kind: z.enum(['dossier', 'lab']),
    status: z.enum(['implemented', 'experimental']),
    category: z.string(),
    summary: z.string(),
    repo: z.url(),
    commit: z.string(),
    license: z.string(),
    /** Ordem de leitura dentro do próprio grupo. */
    order: z.number().int().positive(),
    /*
     * Opcional de propósito. `resulta.webp` era byte a byte a arte do Hush, e
     * a página publicava a ilustração de um projeto com a legenda de outro —
     * um alt descrevendo um arquivo que não é aquele. Sem arte própria, o caso
     * entra sem imagem: a página já trata `atlas` como ausente. Voltar a
     * preencher exige uma arte que seja daquele sistema.
     */
    atlas: z.string().optional(),
    constraints: z.array(z.string()).min(1),
    decisions: z.array(z.object({ title: z.string(), body: z.string() })).min(1),
    qualities: z
      .array(z.object({ attribute: z.string(), approach: z.string(), evidence: z.string() }))
      .optional(),
    evidence: z
      .array(z.object({ title: z.string(), body: z.string(), href: z.url().optional() }))
      .min(1),
    limits: z.array(z.string()).min(1),
    map: z.array(z.object({ label: z.string(), kind: nodeKind, note: z.string() })).min(2),
  }),
});

export const collections = { systems };
