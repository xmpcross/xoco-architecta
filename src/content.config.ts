import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { categories } from "@/config/categories";

/** One name on a byline. The lead author and every coauthor take this shape. */
const byline = z.object({
  name: z.string(),
  role: z.string(),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      category: z.enum(categories),
      date: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: byline,
      /**
       * Extra names on the byline, read in the order they are listed. The lead
       * `author` still owns the post and always reads first, while every
       * coauthor gets the same avatar, archive page, and author box treatment.
       */
      coauthors: z.array(byline).default([]),
      tags: z.array(z.string()).default([]),
      cover: z.object({
        src: image(),
        alt: z.string(),
        creditName: z.string(),
        creditUrl: z.url(),
        showInPost: z.boolean().optional(),
      }),
      /**
       * Opening treatment for the article page. Every layout uses the same cover
       * image; only its placement, scale, and colour change. A post that sets
       * `cover.showInPost: false` has no photograph to hang an opening on, so it
       * always renders as `standard`.
       */
      heroLayout: z.enum(["standard", "banner", "cover", "immersive"]).default("standard"),
      trending: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

export const collections = { posts };
