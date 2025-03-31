import { z, defineCollection } from 'astro:content'

const blog = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
    author: z.string(),
    image: image(),
    // isDraft: z.boolean(),
    // publishedDate: z.string().transform((str) => new Date(str)),
    // tags: z.array(z.string()),
    // canonicalURL: z.string().url(),
  }),
})



export const collections = { blog }

