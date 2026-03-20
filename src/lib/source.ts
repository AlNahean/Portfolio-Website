import { loader } from "fumadocs-core/source";
import { docs, study, blog, publications, projects, caseStudies, reflections, authors, guides, rag } from "../../.source";

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

// Publication Source
export const publicationSource = loader({
  baseUrl: "/publications",
  source: publications.toFumadocsSource(),
});

// Project Source
export const projectSource = loader({
  baseUrl: "/projects",
  source: projects.toFumadocsSource(),
});

// Case Study Source
export const caseStudySource = loader({
  baseUrl: "/case-studies",
  source: caseStudies.toFumadocsSource(),
});

// Add Reflections Source
export const reflectionSource = loader({
  baseUrl: "/reflections",
  source: reflections.toFumadocsSource(),
});

// Author Source
export const authorSource = loader({
  baseUrl: "/authors",
  source: authors.toFumadocsSource(),
});

export const guidesSource = loader({
  baseUrl: "/guides",
  source: guides.toFumadocsSource(),
});

export const ragSource = loader({
  baseUrl: "/rag",
  source: rag.toFumadocsSource(),
});