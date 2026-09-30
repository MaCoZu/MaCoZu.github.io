import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

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

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{yaml,yml,json}" }),
  schema: z.object({
    projects: z.array(
      z.object({
        title: z.string(),
        subtitle: z.string(),
        link: z.string().url(),
        iconName: z.string().nullish(),
        iconSize: z.string().optional(),
        tech: z.array(z.string()),
        description: z.string(),
      }),
    ),
  }),
});

export const collections = { visualizations, certificates, projects };
