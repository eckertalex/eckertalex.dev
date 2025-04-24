import { defineCollection, z } from "astro:content";

const page = defineCollection({
  schema: z.object({
    title: z.string(),
  }),
});

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    modDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { page, blog };
