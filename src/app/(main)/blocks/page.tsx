import { BlockViewer } from "@/components/block-viewer";
import { Separator } from "@/components/ui/separator";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import fs from "fs";
import path from "path";
import { Metadata } from "next";

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
    const blocks = blockNames.map(name => getBlockData(name)).filter(Boolean);

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground font-sans selection:bg-blue-500/20 selection:text-blue-600">
            {/* Header at the top */}
            <SiteHeader />

            <main className="flex-1 container py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-6">
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
                    <div className="grid gap-24">
                        {blocks.map((block: any) => (
                            <div key={block.name} className="space-y-6">
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
                                <BlockViewer item={block} />
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Footer at the bottom */}
            <SiteFooter />
        </div>
    );
}