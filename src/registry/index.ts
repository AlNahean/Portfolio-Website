import { RegistryItem } from "./schema";

export const registry: Record<string, RegistryItem> = {
  "my-button": {
    name: "my-button",
    type: "components:ui",
    files: ["src/registry/ui/my-button.tsx"],
    dependencies: ["lucide-react"],
  },
  "my-button-demo": {
    name: "my-button-demo",
    type: "components:example",
    files: ["src/registry/example/my-button-demo.tsx"],
    registryDependencies: ["my-button"],
  },
};
