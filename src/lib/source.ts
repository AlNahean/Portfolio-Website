import { loader } from "fumadocs-core/source";
import { docs, study } from "../../.source";

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});

// Add a new loader for the study section
export const studySource = loader({
  baseUrl: "/study",
  source: study.toFumadocsSource(),
});
