import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const notes = defineCollection({
  loader: glob({ base: "./src/content/notes", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    draft: z.boolean().optional(),
    date: z.date(),
  }),
});

const visualizations = defineCollection({
  loader: glob({ base: "./src/content/visualizations", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    draft: z.boolean().optional(),
    date: z.date(),
  }),
});

const certificates = defineCollection({
  loader: glob({ base: "./src/content/certificates", pattern: "**/*.{yaml,yml,json}" }),
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
