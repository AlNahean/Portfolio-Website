import { z } from "zod";

export const registryItemSchema = z.object({
  name: z.string(),
  type: z.enum(["registry:ui", "registry:example"]),
  files: z.array(z.string()),
  dependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
});

export type RegistryItem = z.infer<typeof registryItemSchema>;
