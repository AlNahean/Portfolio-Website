"use client";

import { useState, useRef } from "react";
import Script from "next/script";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, RotateCcw } from "lucide-react";

export default function GenomeBrowser() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const igvBrowserRef = useRef<any>(null); // Store the browser instance

  const initIGV = () => {
    // @ts-ignore
    if (!isScriptLoaded || !containerRef.current || !window.igv) return;

    // Destroy previous instance to prevent duplicates in React Strict Mode
    if (igvBrowserRef.current) {
      // @ts-ignore
      window.igv.removeBrowser(igvBrowserRef.current);
      containerRef.current.innerHTML = "";
    }

    const options = { 
      genome: "hg19", 
      locus: "chr8:128,747,267-128,754,546" 
    };

    // @ts-ignore
    window.igv.createBrowser(containerRef.current, options).then((browser: any) => {
      igvBrowserRef.current = browser;
    });
  };

  const runSearch = () => {
    if (igvBrowserRef.current && searchQuery) {
      igvBrowserRef.current.search(searchQuery);
    }
  };

  const handleBedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !igvBrowserRef.current) return;

    // Load track locally
    igvBrowserRef.current.loadTrack({
        name: file.name,
        type: 'annotation',
        format: 'bed',
        url: file, 
        displayMode: "EXPANDED",
        color: "#3b82f6" // blue
    });

    e.target.value = ''; // Reset input
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      
      {/* Script Loader */}
      <Script 
        src="https://cdn.jsdelivr.net/npm/igv@2.15.5/dist/igv.min.js" 
        onLoad={() => setIsScriptLoaded(true)}
      />

      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-4 gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-heading mb-1">Genome Browser</h2>
          <p className="text-muted-foreground text-sm">Powered by IGV.js. Analyze tracks mapped to HG19.</p>
        </div>
        
        <div className="flex flex-wrap gap-2 w-full xl:w-auto">
          <Button variant="outline" onClick={initIGV} disabled={!isScriptLoaded} className="w-full sm:w-auto">
            <RotateCcw className="size-4 mr-2" /> Initialize / Reset
          </Button>

          <div className="flex items-center gap-1 bg-muted/50 rounded-md border p-1 w-full sm:w-auto flex-1">
            <Input 
              placeholder="Gene (e.g. EGFR)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 flex-1 border-none bg-transparent min-w-[100px]"
            />
            <Button size="icon" variant="secondary" className="h-8 w-8 shrink-0" onClick={runSearch}>
              <Search className="size-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 bg-muted/50 rounded-md border px-3 py-1 w-full sm:w-auto overflow-hidden">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest shrink-0">Add .bed</span>
            <Input 
              type="file" 
              accept=".bed,.bed.gz" 
              onChange={handleBedUpload} 
              className="h-8 text-xs file:hidden cursor-pointer flex-1 min-w-0" 
            />
          </div>
        </div>
      </div>

      <Card className="flex-1 relative overflow-hidden bg-white text-black border-border min-h-[400px] md:min-h-[500px] p-2">
        {/* Anchor div for IGV */}
        <div ref={containerRef} className="w-full h-full relative z-10 overflow-auto" />
        
        {!isScriptLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground animate-pulse bg-background/80 z-20">
            Downloading IGV Engine...
          </div>
        )}
      </Card>
    </div>
  );
}
