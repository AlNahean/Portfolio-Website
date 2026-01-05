import { loader } from "fumadocs-core/source";
import { docs, study, blog } from "../../.source";

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});

// Add a new loader for the study section
export const studySource = loader({
  baseUrl: "/study",
  source: study.toFumadocsSource(),
});

// Add a new loader for the blog section
export const blogSource = loader({
  baseUrl: "/blog",
  source: blog.toFumadocsSource(),
});
