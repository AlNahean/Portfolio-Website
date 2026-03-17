"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

// Dynamic import for Cytoscape to prevent SSR errors
const CytoscapeComponent = dynamic(() => import("react-cytoscapejs"), { 
  ssr: false,
  loading: () => <div className="h-full flex items-center justify-center text-muted-foreground animate-pulse">Loading Cytoscape Engine...</div> 
});

const DEMO_NET = `TP53 MDM2 inhibits
EGFR GRB2 binds
GRB2 SOS1 binds
SOS1 RAS activates
RAS RAF activates
RAF MEK phosphorylates
MEK ERK phosphorylates
ERK TP53 regulates`;

export default function NetworkBuilder() {
  const [mounted, setMounted] = useState(false);
  const [rawData, setRawData] = useState(DEMO_NET);
  const[layoutName, setLayoutName] = useState("cose");

  // Ensure component only renders on the client
  useEffect(() => {
    setMounted(true);
  },[]);

  // Parse elements
  const elements = useMemo(() => {
    const lines = rawData.trim().split('\n');
    const els: any[] =[];
    const nodes = new Set();

    lines.forEach(line => {
      let parts = line.trim().split(/\s+/);
      if (parts.length >= 2) {
        let source = parts[0];
        let target = parts[1];
        let label = parts[2] || "";
        
        if (!nodes.has(source)) { els.push({ data: { id: source } }); nodes.add(source); }
        if (!nodes.has(target)) { els.push({ data: { id: target } }); nodes.add(target); }
        
        els.push({ data: { source, target, label } });
      }
    });
    return els;
  }, [rawData]);

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-bold font-heading mb-1">Interaction Network Builder</h2>
        <p className="text-muted-foreground text-sm">Construct and visualize biological networks (Source Target Interaction).</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
        <Card className="w-full md:w-80 shrink-0 p-4 flex flex-col gap-4 bg-muted/20">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Interaction List</h3>
          </div>
          <Textarea 
            className="flex-1 h-[150px] md:min-h-[200px] font-mono text-xs whitespace-pre bg-background" 
            value={rawData}
            onChange={(e) => setRawData(e.target.value)}
          />
          
          <div className="pt-4 border-t space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Layout Style</h3>
            <select 
              value={layoutName} 
              onChange={(e) => setLayoutName(e.target.value)}
              className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="cose">Physics (Force Directed)</option>
              <option value="circle">Circle</option>
              <option value="grid">Grid</option>
              <option value="breadthfirst">Hierarchy / Tree</option>
              <option value="concentric">Concentric</option>
            </select>
          </div>
        </Card>

        {/* Enforce min-height for cytoscape on mobile */}
        <Card className="flex-1 p-2 relative bg-zinc-950 overflow-hidden min-h-[350px] md:min-h-0">
          {mounted && (
            <CytoscapeComponent 
              key={`${rawData}-${layoutName}`} // <-- MAGIC FIX: Forces clean remount, stops the 'notify' crash!
              elements={elements} 
              layout={{ name: layoutName, animate: true }} 
              style={{ width: '100%', height: '100%' }} 
              stylesheet={[
                {
                  selector: 'node',
                  style: {
                    'background-color': '#0ea5e9',
                    'label': 'data(id)',
                    'color': '#fff',
                    'text-valign': 'center',
                    'text-halign': 'center',
                    'font-size': '10px',
                    'font-weight': 'bold',
                    'width': 40,
                    'height': 40
                  }
                },
                {
                  selector: 'edge',
                  style: {
                    'width': 2,
                    'line-color': '#444',
                    'target-arrow-color': '#444',
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier',
                    'label': 'data(label)',
                    'color': '#aaa',
                    'font-size': '9px',
                    'text-rotation': 'autorotate',
                    'text-margin-y': -10 as any
                  }
                }
              ]}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
