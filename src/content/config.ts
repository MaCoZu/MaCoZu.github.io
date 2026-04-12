import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
  }),
});

const visualizations = defineCollection({
  schema: z.object({
    title: z.string().optional(),
  }),
});

const certificates = defineCollection({
  type: 'data',
  schema: z.object({
    category: z.string(),
    order: z.number(),
    colorClasses: z.string(),
    certificates: z.array(
      z.object({
        name: z.string(),
        link: z.string().url(),
      }),
    ),
  }),
});

export const collections = { notes, visualizations, certificates };
