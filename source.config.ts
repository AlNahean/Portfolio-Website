import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import rehypePrettyCode from "rehype-pretty-code";
import { z } from "zod";

// import { transformers } from "@/lib/highlight-code";




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
// Updated Blog Schema
export const blog = defineDocs({
  dir: "content/blog",
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string().date().or(z.date()).optional(),
      author: z.string().optional(),
      image: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
  },
});

