"use client";
import { useState } from "react";
import { Activity, AlignHorizontalSpaceAround, Box, Calculator, TerminalSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const TOOLS = [
    { name: "Sequence Alignment", icon: <AlignHorizontalSpaceAround className="size-4" /> },
    { name: "3D Protein Viewer", icon: <Box className="size-4" /> },
    { name: "Bio Calculators", icon: <Calculator className="size-4" /> },
    { name: "Gradio Demos", icon: <TerminalSquare className="size-4" /> },
];

export function BioToolboxSection() {
    const [activeTool, setActiveTool] = useState("Sequence Alignment");

    return (
        <section className="py-24 container-wrapper 3xl:fixed:px-0 px-6">
            <div className="3xl:fixed:container max-w-8xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-2 text-foreground">
                        BioToolbox
                    </h2>
                    <p className="text-muted-foreground font-mono text-sm">
                        Interactive web-based bioinformatics tools and research utilities.
                    </p>
                </div>

                <div className="grid lg:grid-cols-[260px_1fr] gap-8 md:gap-12">
                    {/* Sidebar Navigation */}
                    <div className="flex flex-col gap-2">
                        {TOOLS.map((tool) => (
                            <button
                                key={tool.name}
                                onClick={() => setActiveTool(tool.name)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 text-sm font-bold transition-all border rounded-lg text-left",
                                    activeTool === tool.name
                                        ? "bg-foreground text-background border-foreground shadow-sm"
                                        : "bg-transparent border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                {tool.icon}
                                {tool.name}
                            </button>
                        ))}
                    </div>

                    {/* Main Tool Application Area */}
                    <div className="bg-muted/30 border border-border rounded-3xl p-6 md:p-10 relative overflow-hidden">
                        {/* Status Bar */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                            <div>
                                <div className="flex items-center gap-2 text-primary mb-2">
                                    <Activity className="size-5" />
                                    <span className="font-mono text-xs uppercase tracking-widest font-black">
                                        Sequence Alignment Playground
                                    </span>
                                </div>
                                <p className="text-muted-foreground text-sm max-w-md">
                                    Paste two DNA/RNA sequences to calculate alignment score in real-time.
                                </p>
                            </div>
                            <span className="text-[10px] font-black font-mono border border-border px-3 py-1.5 rounded-full text-muted-foreground bg-background/50 uppercase tracking-tight">
                                V1.2.0 STABLE
                            </span>
                        </div>

                        <div className="space-y-8">
                            {/* Input Fields */}
                            <div className="grid gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                                        Sequence 1 (Template)
                                    </label>
                                    <Textarea
                                        className="bg-background border-input font-mono text-sm h-28 focus-visible:ring-primary/30 resize-none shadow-sm"
                                        placeholder="e.g. ATGCGTATAGC..."
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
                                        Sequence 2 (Query)
                                    </label>
                                    <Textarea
                                        className="bg-background border-input font-mono text-sm h-28 focus-visible:ring-primary/30 resize-none shadow-sm"
                                        placeholder="e.g. ATGGGTATAGC..."
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                <Button className="flex-1 font-black uppercase tracking-widest h-12 shadow-lg hover:scale-[1.02] transition-transform">
                                    Calculate Score
                                </Button>
                                <Button variant="outline" className="border-border text-muted-foreground uppercase tracking-widest font-bold h-12 hover:bg-background">
                                    Clear Input
                                </Button>
                            </div>

                            {/* Result Area Placeholder */}
                            <div className="border-2 border-dashed border-border rounded-2xl h-40 flex flex-col items-center justify-center text-center p-6 bg-background/20 mt-4 transition-colors">
                                <div className="bg-muted p-3 rounded-full mb-3">
                                    <Activity className="size-6 text-muted-foreground/40" />
                                </div>
                                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground/60 max-w-xs">
                                    Enter genomic sequences above to compute the alignment matrix
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}