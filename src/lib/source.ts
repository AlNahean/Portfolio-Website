import { loader } from "fumadocs-core/source";
import { blog } from "../../.source"; // Removed docs and study imports

// We only keep the blog loader if you intend to write articles, 
// otherwise this file can be simplified further.
export const blogSource = loader({
  baseUrl: "/blog",
  source: blog.toFumadocsSource(),
});
