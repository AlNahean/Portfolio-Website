"use client";

import { useState } from "react";
import {
    Search, Hexagon, AlignLeft, Calculator,
    LineChart, Table, AlignCenter, Network, FileCode
} from "lucide-react";

// Import the functional components we built in the previous phases
import FastaFormatter from "@/app/(main)/biotoolbox/_components/fasta-formatter";
import SequenceDashboard from "@/app/(main)/biotoolbox/_components/sequence-dashboard";
import SequenceViewer from "@/app/(main)/biotoolbox/_components/sequence-viewer";
import PairwiseAlignment from "@/app/(main)/biotoolbox/_components/pairwise-alignment";
import VcfViewer from "@/app/(main)/biotoolbox/_components/vcf-viewer";
import VolcanoPlot from "@/app/(main)/biotoolbox/_components/volcano-plot";
import NetworkBuilder from "@/app/(main)/biotoolbox/_components/network-builder";
import Protein3D from "@/app/(main)/biotoolbox/_components/protein-3d";
import GenomeBrowser from "@/app/(main)/biotoolbox/_components/genome-browser";

// Notice: AlphaFold Colab is hidden as requested
const TOOLS = [
    { id: "dashboard", name: "Sequence Dashboard", icon: Calculator, component: <SequenceDashboard /> },
    { id: "viewer", name: "Sequence Viewer", icon: AlignLeft, component: <SequenceViewer /> },
    { id: "formatter", name: "FASTA Formatter", icon: FileCode, component: <FastaFormatter /> },
    { id: "vcf-viewer", name: "VCF Viewer", icon: Table, component: <VcfViewer /> },
    { id: "alignment", name: "Pairwise Alignment", icon: AlignCenter, component: <PairwiseAlignment /> },
    { id: "volcano", name: "Volcano Plot", icon: LineChart, component: <VolcanoPlot /> },
    { id: "structure", name: "3D Protein Structure", icon: Hexagon, component: <Protein3D /> },
    { id: "genome", name: "Genome Browser", icon: Search, component: <GenomeBrowser /> },
    { id: "network", name: "Network Builder", icon: Network, component: <NetworkBuilder /> },
];

export function BioToolboxSection() {
    const [activeTool, setActiveTool] = useState(TOOLS[0].id);
    const ActiveComponent = TOOLS.find((t) => t.id === activeTool)?.component;

    return (
        <section id="biotoolbox" className="py-24 container-wrapper 3xl:fixed:px-0 px-6 scroll-mt-16">
            <div className="3xl:fixed:container max-w-8xl mx-auto flex flex-col h-full">

                {/* Section Header */}
                <div className="mb-12">
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-2 text-foreground">
                        BioToolbox
                    </h2>
                    <p className="text-muted-foreground font-mono text-sm max-w-2xl">
                        Interactive web-based bioinformatics tools and research utilities.
                        Select a tool from the menu below to start analyzing data directly in your browser.
                    </p>
                </div>

                {/* Embedded Application Container */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 min-h-[600px] h-[70vh] max-h-[850px]">

                    {/* Navigation: Horizontal scroll on mobile, Vertical on desktop */}
                    <div className="w-full md:w-64 bg-card border rounded-2xl p-2 md:p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto shrink-0 shadow-sm no-scrollbar">
                        <h2 className="hidden md:block text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3 px-2 mt-2">
                            Tools Suite
                        </h2>
                        {TOOLS.map((tool) => (
                            <button
                                key={tool.id}
                                onClick={() => setActiveTool(tool.id)}
                                className={`flex items-center gap-2 md:gap-3 px-3 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-medium transition-colors text-left shrink-0 ${activeTool === tool.id
                                    ? "bg-primary/10 text-primary border-primary/20 border"
                                    : "bg-muted/30 md:bg-transparent border border-transparent hover:bg-muted text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <tool.icon className="size-3.5 md:size-4 shrink-0" />
                                <span className="whitespace-nowrap md:truncate">{tool.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 bg-card border rounded-2xl p-4 md:p-6 overflow-y-auto shadow-sm relative min-h-[60vh] md:min-h-0">
                        {ActiveComponent}
                    </div>

                </div>

                {/* Attribution Footer */}
                <div className="mt-8 text-center text-sm text-muted-foreground">
                    This BioToolbox section was inspired by the work of{" "}
                    <a
                        href="https://ayyucedemirbas.github.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-semibold"
                    >
                        Ayyuce Demirbas
                    </a>.
                </div>

            </div>
        </section>
    );
}