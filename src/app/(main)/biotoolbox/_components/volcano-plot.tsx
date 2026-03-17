"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import("react-plotly.js"), { 
  ssr: false, 
  loading: () => <div className="h-full flex items-center justify-center text-muted-foreground animate-pulse">Loading Plotly Engine...</div> 
});

const DEMO_DATA = `Gene,Log2FC,PValue
TP53,2.5,0.0001
EGFR,1.8,0.005
BRCA1,-2.1,0.0002
PTEN,-1.5,0.004
MYC,3.2,0.00001
GAPDH,0.1,0.8
ACTB,-0.2,0.6
VEGFA,1.2,0.03
RB1,-1.1,0.045
KRAS,0.5,0.2
IL6,4.5,0.000001
TNF,3.8,0.00005
INS,-3.5,0.0001`;

export default function VolcanoPlot() {
  const [rawData, setRawData] = useState(DEMO_DATA);
  const [pCutoff, setPCutoff] = useState(0.05);
  const [fcCutoff, setFcCutoff] = useState(1.0);

  const plotData = useMemo(() => {
    if (!rawData) return null;
    const rows = rawData.trim().split("\n");
    let genes: string[] =[], x: number[] =[], y: number[] =[], colors: string[] =[], texts: string[] =[];
    
    let startIndex = rows[0].toLowerCase().includes("gene") ? 1 : 0;

    for (let i = startIndex; i < rows.length; i++) {
      let cols = rows[i].split(/[\t,]+/);
      if (cols.length < 3) continue;
      
      let gene = cols[0];
      let fc = parseFloat(cols[1]);
      let p = parseFloat(cols[2]);
      let negLogP = -Math.log10(p);

      genes.push(gene);
      x.push(fc);
      y.push(negLogP);
      
      if (p < pCutoff && fc > fcCutoff) {
        colors.push("#ef4444"); // Up - Red
        texts.push(`UP: ${gene}`);
      } else if (p < pCutoff && fc < -fcCutoff) {
        colors.push("#3b82f6"); // Down - Blue
        texts.push(`DOWN: ${gene}`);
      } else {
        colors.push("#888888"); // NS - Gray
        texts.push(gene);
      }
    }

    return[{
      x, y, text: texts,
      mode: "markers" as const,
      type: "scatter" as const,
      marker: { size: 10, color: colors, opacity: 0.8 },
      hoverinfo: "x+y+text" as const
    }];
  }, [rawData, pCutoff, fcCutoff]);

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-bold font-heading mb-1">Volcano Plot Generator</h2>
        <p className="text-muted-foreground text-sm">Visualize differentially expressed genes interactively.</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
        {/* Left Controls */}
        <Card className="w-full md:w-80 shrink-0 p-4 flex flex-col gap-4 bg-muted/20">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Data Input</h3>
            <Button variant="ghost" size="sm" className="h-6 text-[10px]" onClick={() => setRawData(DEMO_DATA)}>Load Demo</Button>
          </div>
          <Textarea 
            className="flex-1 h-[150px] md:min-h-[200px] font-mono text-xs whitespace-pre bg-background" 
            placeholder="Gene,Log2FC,PValue..."
            value={rawData}
            onChange={(e) => setRawData(e.target.value)}
          />
          
          <div className="pt-4 border-t space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Thresholds</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground">P-value (e.g. 0.05)</label>
                <Input type="number" step="0.01" value={pCutoff} onChange={e => setPCutoff(parseFloat(e.target.value))} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground">Log2FC (e.g. 1.0)</label>
                <Input type="number" step="0.1" value={fcCutoff} onChange={e => setFcCutoff(parseFloat(e.target.value))} />
              </div>
            </div>
          </div>
        </Card>

        {/* Right Plot Area: Enforce min-height on mobile */}
        <Card className="flex-1 flex items-center justify-center p-2 relative bg-background shadow-inner min-h-[350px] md:min-h-0">
          {plotData && (
            <Plot
              data={plotData as any}
              layout={{
                autosize: true,
                paper_bgcolor: "transparent",
                plot_bgcolor: "transparent",
                margin: { l: 40, r: 10, t: 30, b: 40 }, // Tighter margins for mobile
                xaxis: { title: "Log2 Fold Change", gridcolor: "#333", zerolinecolor: "#555" },
                yaxis: { title: "-Log10 P-Value", gridcolor: "#333", zerolinecolor: "#555" },
                font: { color: "#888", size: 10 }, // Smaller font for mobile
                hovermode: "closest"
              }}
              style={{ width: "100%", height: "100%" }}
              useResizeHandler={true}
              config={{ displayModeBar: true, responsive: true }}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
