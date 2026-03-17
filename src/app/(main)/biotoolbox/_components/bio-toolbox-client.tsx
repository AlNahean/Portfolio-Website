"use client";

import { useState } from "react";
import { 
  Search, Hexagon, AlignLeft, Calculator, 
  LineChart, Table, AlignCenter, Network, FileCode 
} from "lucide-react";

import FastaFormatter from "./fasta-formatter";
import SequenceDashboard from "./sequence-dashboard";
import SequenceViewer from "./sequence-viewer";
// import AlphaFoldColab from "./alphafold-colab"; // Hidden for now
import PairwiseAlignment from "./pairwise-alignment";
import VcfViewer from "./vcf-viewer";
import VolcanoPlot from "./volcano-plot";
import NetworkBuilder from "./network-builder";
import Protein3D from "./protein-3d";
import GenomeBrowser from "./genome-browser";

const TOOLS = [
  { id: "dashboard", name: "Sequence Dashboard", icon: Calculator, component: <SequenceDashboard /> },
  { id: "viewer", name: "Sequence Viewer", icon: AlignLeft, component: <SequenceViewer /> },
  { id: "formatter", name: "FASTA Formatter", icon: FileCode, component: <FastaFormatter /> },
  // { id: "alphafold", name: "AlphaFold Colab", icon: Dna, component: <AlphaFoldColab /> }, // Hidden
  { id: "vcf-viewer", name: "VCF Viewer", icon: Table, component: <VcfViewer /> },
  { id: "alignment", name: "Pairwise Alignment", icon: AlignCenter, component: <PairwiseAlignment /> },
  { id: "volcano", name: "Volcano Plot", icon: LineChart, component: <VolcanoPlot /> },
  { id: "structure", name: "3D Protein Structure", icon: Hexagon, component: <Protein3D /> },
  { id: "genome", name: "Genome Browser", icon: Search, component: <GenomeBrowser /> },
  { id: "network", name: "Network Builder", icon: Network, component: <NetworkBuilder /> },
];

export default function BioToolboxClient() {
  const [activeTool, setActiveTool] = useState(TOOLS[0].id);
  const ActiveComponent = TOOLS.find((t) => t.id === activeTool)?.component;

  return (
    <div className="3xl:fixed:container max-w-7xl mx-auto flex flex-col h-full">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:h-[calc(100vh-180px)] min-h-[600px]">
        
        {/* Navigation: Horizontal scroll on mobile, Vertical on desktop */}
        <div className="w-full md:w-64 bg-card border rounded-2xl p-2 md:p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto shrink-0 shadow-sm no-scrollbar">
          <h2 className="hidden md:block text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3 px-2 mt-2">
            BioToolbox
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
        This BioToolbox section was inspired by the work of <a href="https://ayyucedemirbas.github.io/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Ayyuce Demirbas</a>.
      </div>
    </div>
  );
}
