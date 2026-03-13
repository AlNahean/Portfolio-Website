import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import rehypePrettyCode from "rehype-pretty-code";
import { z } from "zod";

// import { transformers } from "@/lib/highlight-code";



/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !                                 WARNING                                  !
 * !                                                                          !
 * !  DO NOT EDIT THE `defineConfig` FUNCTION BELOW.                          !
 * !  DO NOT REMOVE THIS COMMENT.                                             !
 * !                                                                          !
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */
export default defineConfig({
  mdxOptions: {
    rehypePlugins: (plugins) => {
      plugins.shift();
      plugins.push([
        // TODO: fix the type.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rehypePrettyCode as any,
        {
          theme: {
            dark: "github-dark",
            light: "github-light-default",
          },
        },
      ]);
      return plugins;
    },
  },
});

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema.extend({
      links: z
        .object({
          doc: z.string().optional(),
          api: z.string().optional(),
        })
        .optional(),
    }),
  },
});

// Add this new source for the study section
export const study = defineDocs({
  dir: "content/study",
});

// 1. Add the authors collection
export const authors = defineDocs({
  dir: "content/authors",
  docs: {
    schema: frontmatterSchema.extend({
      avatar: z.string(),
      twitter: z.string(),
    }),
  },
});
// 2. Update the blog collection
export const blog = defineDocs({
  dir: "content/blog",
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string().date().or(z.date()).optional(),
      authors: z.array(z.string()).optional(), // Changed from 'author' to 'authors' array
      image: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
  },
});

export const publications = defineDocs({
  dir: "content/publications",
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string().date().or(z.date()).optional(),
      venue: z.string().optional(),
      authors: z.string().optional(),
      type: z.string().optional(),
      fullTitle: z.string().optional(),
      links: z.object({
        arxiv: z.string().optional(),
        pdf: z.string().optional(),
        code: z.string().optional(),
        doi: z.string().optional(),
      }).optional(),
    }),
  },
});

export const projects = defineDocs({
  dir: "content/projects",
  docs: {
    schema: frontmatterSchema.extend({
      description: z.string(),
      tech: z.array(z.string()),
      video: z.string().optional(),
      image: z.string(),
      live: z.string().optional(),
      github: z.string().optional(),
      date: z.string().date().or(z.date()).optional(), // Added for sorting
    }),
  },
});

export const caseStudies = defineDocs({
  dir: "content/case-studies",
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string().date().or(z.date()),
      author: z.string().optional(),
      image: z.string(),
      tags: z.array(z.string()),
      timeline: z.string().optional(),
      role: z.string().optional(),
    }),
  },
});

export const reflections = defineDocs({
  dir: "content/reflections",
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string().date().or(z.date()),
      category: z.string(), // E.g., "Philosophy", "Mentorship"
      readTime: z.string(), // E.g., "5 MIN READ"
      description: z.string(), // We will use this for the italicized quote
    }),
  },
});