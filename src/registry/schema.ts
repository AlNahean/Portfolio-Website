import { z } from "zod";

export const registryItemFileSchema = z.union([
  z.string(),
  z.object({
    path: z.string(),
    type: z.enum(["registry:ui", "registry:hook", "registry:lib", "registry:component", "registry:example"]),
    target: z.string().optional(),
  })
]);

export const registryItemSchema = z.object({
  name: z.string(),
  type: z.enum(["registry:ui", "registry:example"]),
  files: z.array(registryItemFileSchema),
  dependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
});

export type RegistryItem = z.infer<typeof registryItemSchema>;
