import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const baseSchema = () =>
  z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    slug: z.string(),
    legacyIds: z.array(z.string()).default([]),
    tags: z.array(reference("tag")).default([]),
    heroImage: z.string().optional(),
  });

const post = defineCollection({
  loader: glob({ base: "./src/content/post", pattern: "**/*.{md,mdx}" }),
  schema: baseSchema,
});

const note = defineCollection({
  loader: glob({ base: "./src/content/note", pattern: "**/*.{md,mdx}" }),
  schema: baseSchema,
});

const tag = defineCollection({
  loader: glob({ base: "./src/content/tag", pattern: "**/*.{yaml,yml,json}" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { post, note, tag };
