import { defineCollection } from 'astro:content';
import { z } from 'zod';

const docs = defineCollection({
  schema: z.object({
    title: z.string().optional(),
  }),
});

// Removed unused collections `models` and `model_gallery` to avoid warnings for missing directories

const visualizations = defineCollection({
  schema: z.object({
    title: z.string().optional(),
  }),
});

export const collections = { docs, visualizations };
