import { loader } from "fumadocs-core/source";
import { docs, study, blog } from "../../.source";

// Restored: Legacy Docs Source (Required for /app/docs)
export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});

// Restored: Legacy Study Source (Required for /app/study)
export const studySource = loader({
  baseUrl: "/study",
  source: study.toFumadocsSource(),
});

// Blog Source
export const blogSource = loader({
  baseUrl: "/blog",
  source: blog.toFumadocsSource(),
});