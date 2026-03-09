import { RegistryItem } from "./schema";

export const registry: Record<string, RegistryItem> = {
  "my-button": {
    name: "my-button",
    type: "registry:ui",
    files: ["src/registry/ui/my-button.tsx"],
    dependencies: ["lucide-react"],
  },
  "my-button-demo": {
    name: "my-button-demo",
    type: "registry:example",
    files: ["src/registry/example/my-button-demo.tsx"],
    registryDependencies: ["my-button"],
  },
  "file-uploader": {
    name: "file-uploader",
    type: "registry:ui",
    dependencies: ["lucide-react"],
    files: [
      { path: "src/registry/ui/file-uploader/index.tsx", type: "registry:component", target: "components/ui/file-uploader/index.tsx" },
      { path: "src/registry/ui/file-uploader/dropzone.tsx", type: "registry:component", target: "components/ui/file-uploader/dropzone.tsx" },
      { path: "src/registry/ui/file-uploader/list.tsx", type: "registry:component", target: "components/ui/file-uploader/list.tsx" },
      { path: "src/registry/hooks/use-file-upload.ts", type: "registry:hook" },
      { path: "src/registry/lib/format-bytes.ts", type: "registry:lib" }
    ],
  },
  "file-uploader-demo": {
    name: "file-uploader-demo",
    type: "registry:example",
    files: ["src/registry/example/file-uploader-demo.tsx"],
    registryDependencies: ["file-uploader"],
  },
};
