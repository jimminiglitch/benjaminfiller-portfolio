import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()).default([]),
    heroImage: z
      .object({
        src: z.string(),
        alt: z.string()
      })
      .optional(),
    minutesRead: z.number().int().positive().optional(),
    draft: z.boolean().optional()
  })
});

export const collections = {
  blog: blogCollection
};
