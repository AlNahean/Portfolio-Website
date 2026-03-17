"use client";

import { useState, useRef } from "react";
import Script from "next/script";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Protein3D() {
  const[pdbId, setPdbId] = useState("4HHB");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadPDB = () => {
    // @ts-ignore
    if (!isScriptLoaded || !containerRef.current || !window.$3Dmol) return;

    containerRef.current.innerHTML = ""; // Clear existing canvas

    // @ts-ignore
    const viewer = window.$3Dmol.createViewer(containerRef.current, {
      backgroundColor: "transparent",
    });

    // @ts-ignore
    window.$3Dmol.download(`pdb:${pdbId}`, viewer, { doAssembly: true }, function () {
      viewer.setStyle({}, { cartoon: { color: "spectrum" } });
      viewer.zoomTo();
      viewer.render();
    });
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      
      {/* Script Loader */}
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/3Dmol/2.0.4/3Dmol-min.js" 
        onLoad={() => setIsScriptLoaded(true)}
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-heading mb-1">3D Protein Structure</h2>
          <p className="text-muted-foreground text-sm">Powered by 3Dmol.js. Search by PDB ID.</p>
        </div>
        <div className="flex gap-2 items-center w-full md:w-auto">
          <Input 
            value={pdbId} 
            onChange={(e) => setPdbId(e.target.value)} 
            className="flex-1 md:w-24 uppercase font-mono font-bold"
            placeholder="e.g. 4HHB"
          />
          <Button onClick={loadPDB} disabled={!isScriptLoaded}>Render</Button>
        </div>
      </div>

      {/* Set a min-height for mobile so the canvas doesn't crush */}
      <Card className="flex-1 min-h-[400px] md:min-h-[500px] relative overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950 border-border">
        {/* Anchor div for 3Dmol */}
        <div ref={containerRef} className="absolute inset-0 w-full h-full z-10 cursor-move" />
        
        {!isScriptLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground animate-pulse">
            Loading 3D Engine...
          </div>
        )}
      </Card>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground text-center mt-3">
        Left click to rotate • Scroll to zoom
      </p>
    </div>
  );
}
