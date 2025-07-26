import { defineCollection } from 'astro:content';
import { z } from 'zod';

const docs = defineCollection({
  schema: z.object({
    title: z.string().optional(),
  }),
});

const models = defineCollection({
  schema: z.object({
    title: z.string().optional(),
  }),
});

const model_gallery = defineCollection({
  schema: z.object({
    title: z.string().optional(),
  }),
});

const visualizations = defineCollection({
  schema: z.object({
    title: z.string().optional(),
  }),
});

export const collections = { docs, models, model_gallery, visualizations };
