import { BlockViewer } from "@/components/block-viewer";
import { Separator } from "@/components/ui/separator";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import fs from "fs";
import path from "path";
import { Metadata } from "next";
import { codeToHtml } from "shiki";

export const metadata: Metadata = {
    title: "Blocks | Helix UI",
    description: "Production-ready building blocks for bioinformatics and web apps.",
};

function getBlockData(name: string) {
    try {
        const filePath = path.join(process.cwd(), "public/r", `${name}.json`);
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (e) {
        return null;
    }
}

export default async function BlocksPage() {
    // List the blocks you want to show
    const blockNames = ["helix-sidebar", "alignment-block", "file-uploader", "physics-badge", "my-button"];
    const blocksRaw = blockNames.map(name => getBlockData(name)).filter(Boolean);

    // Pre-highlight code on the server so the client component is lightweight
    const blocks = await Promise.all(
        blocksRaw.map(async (block: any) => {
            const highlightedFiles = await Promise.all(
                (block.files || []).map(async (file: any) => {
                    const path = typeof file === "string" ? file : file.path;
                    const target = typeof file === "string" ? file : (file.target || file.path);
                    const content = typeof file === "string" ? file : file.content;

                    const extension = path.split(".").pop() || "tsx";
                    const langMap: Record<string, string> = { tsx: "tsx", ts: "typescript", js: "javascript", jsx: "jsx", json: "json", css: "css", md: "markdown" };
                    const lang = langMap[extension] || "tsx";

                    let highlightedContent = "";
                    try {
                        highlightedContent = await codeToHtml(content, {
                            lang,
                            theme: "github-dark", // Use a static dark theme to generate inline colors
                        });
                    } catch (e) {
                        console.error("Shiki highlight error:", e);
                        highlightedContent = `<pre><code>${content}</code></pre>`;
                    }

                    return { path, target, content, highlightedContent };
                })
            );
            return { ...block, highlightedFiles };
        })
    );

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground font-sans min-w-0">
            {/* Header at the top */}
            <SiteHeader />

            <main className="flex-1 container-wrapper 3xl:fixed:px-0 px-6 py-16 md:py-24  mx-auto md:px-6 min-w-0 w-full">
                <div className="3xl:fixed:container max-w-8xl mx-auto">
                    {/* Page Header */}
                    <div className="mb-12 space-y-4">
                        <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                            Component Gallery
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter sm:text-6xl uppercase">Blocks</h1>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            A collection of enterprise-grade UI blocks.
                            Optimized for scientific data visualization, complex navigation, and high-performance research tools.
                        </p>
                    </div>

                    {/* Blocks Grid */}
                    {blocks.length === 0 ? (
                        <div className="p-20 border border-dashed rounded-xl text-center bg-muted/10">
                            <p className="text-muted-foreground mb-4 font-medium">No blocks found in the registry.</p>
                            <p className="text-sm text-muted-foreground mb-4 italic">Make sure you have registered your components in src/registry/index.ts</p>
                            <code className="bg-muted px-2 py-1 rounded text-sm font-mono text-primary">pnpm run build:registry</code>
                        </div>
                    ) : (
                        <div className="grid gap-24 min-w-0 w-full">
                            {blocks.map((block: any) => (
                                <div key={block.name} className="space-y-6 min-w-0 w-full">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-baseline gap-4">
                                            <h2 className="text-2xl font-bold tracking-tight capitalize">
                                                {block.name.replace(/-/g, " ")}
                                            </h2>
                                            <Separator orientation="vertical" className="h-4 hidden sm:block" />
                                            <span className="text-xs font-mono text-muted-foreground uppercase hidden sm:inline-block">
                                                {block.type}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            {block.dependencies?.map((dep: string) => (
                                                <span key={dep} className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                                                    {dep}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* The Interactive Viewer */}
                                    <BlockViewer item={block} highlightedFiles={block.highlightedFiles} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Footer at the bottom */}
            <SiteFooter />
        </div>
    );
}