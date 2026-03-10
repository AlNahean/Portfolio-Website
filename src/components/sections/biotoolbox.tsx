"use client";
import { useState } from "react";
import { Activity, AlignHorizontalSpaceAround, Box, Calculator, TerminalSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const TOOLS = [
    { name: "Sequence Alignment", icon: <AlignHorizontalSpaceAround className="size-4" /> },
    { name: "3D Protein Viewer", icon: <Box className="size-4" /> },
    { name: "Bio Calculators", icon: <Calculator className="size-4" /> },
    { name: "Gradio Demos", icon: <TerminalSquare className="size-4" /> },
];

export function BioToolboxSection() {
    const [activeTool, setActiveTool] = useState("Sequence Alignment");

    return (
        <section className="py-24 container px-4">
            <div className="mb-12">
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">BioToolbox</h2>
                <p className="text-muted-foreground font-mono text-sm">Interactive web-based bioinformatics tools and research utilities.</p>
            </div>

            <div className="grid lg:grid-cols-[240px_1fr] gap-12">
                {/* Sidebar */}
                <div className="space-y-2">
                    {TOOLS.map((tool) => (
                        <button
                            key={tool.name}
                            onClick={() => setActiveTool(tool.name)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold transition-all border ${activeTool === tool.name
                                ? "bg-zinc-900 border-zinc-700 text-white"
                                : "border-transparent text-zinc-500 hover:bg-zinc-900/50 hover:text-zinc-300"}`}
                        >
                            {tool.icon}
                            {tool.name}
                        </button>
                    ))}
                </div>

                {/* Main Tool Area */}
                <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 relative">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <div className="flex items-center gap-2 text-primary mb-2">
                                <Activity className="size-5" />
                                <span className="font-mono text-xs uppercase tracking-widest font-bold">Sequence Alignment Playground</span>
                            </div>
                            <p className="text-zinc-400 text-sm">Paste two DNA/RNA sequences to calculate alignment score in real-time.</p>
                        </div>
                        <span className="text-[10px] font-mono border border-zinc-700 px-2 py-1 rounded text-zinc-400">V1.2.0 STABLE</span>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Sequence 1 (Template)</label>
                            <Textarea className="bg-zinc-950 border-zinc-800 font-mono text-sm h-24" placeholder="e.g. ATGCGTATAGC..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Sequence 2 (Query)</label>
                            <Textarea className="bg-zinc-950 border-zinc-800 font-mono text-sm h-24" placeholder="e.g. ATGGGTATAGC..." />
                        </div>

                        <div className="flex gap-4 pt-2">
                            <Button className="flex-1 bg-white text-black font-black uppercase tracking-widest h-12 hover:bg-zinc-200">
                                Calculate Score
                            </Button>
                            <Button variant="outline" className="border-zinc-800 text-zinc-400 uppercase tracking-widest font-bold">
                                Clear
                            </Button>
                        </div>

                        {/* Result Placeholder */}
                        <div className="border border-dashed border-zinc-800 rounded-lg h-32 flex flex-col items-center justify-center text-zinc-600 mt-8">
                            <Activity className="size-8 mb-2 opacity-20" />
                            <span className="text-xs font-mono uppercase tracking-widest opacity-50">Enter sequences above to visualize the alignment results</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}