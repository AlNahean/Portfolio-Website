"use client";

import { useState, useMemo, ChangeEvent } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

type Variant = {
  chrom: string;
  pos: string;
  id: string;
  ref: string;
  alt: string;
  qual: string;
  filter: string;
  info: string;
  raw: string;
};

export default function VcfViewer() {
  const [allVariants, setAllVariants] = useState<Variant[]>([]);
  const [search, setSearch] = useState("");
  const[passOnly, setPassOnly] = useState(false);
  const [selectedVarIndex, setSelectedVarIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Parse file on upload
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setAllVariants([]);
    setSelectedVarIndex(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      // Use setTimeout to allow the UI loader to render before locking the main thread
      setTimeout(() => {
        const text = event.target?.result as string;
        const lines = text.split("\n");
        const data: Variant[] =[];

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line || line.startsWith("#")) continue;

          const cols = line.split("\t");
          if (cols.length < 8) continue;

          data.push({
            chrom: cols[0],
            pos: cols[1],
            id: cols[2],
            ref: cols[3],
            alt: cols[4],
            qual: cols[5],
            filter: cols[6],
            info: cols[7],
            raw: line,
          });
        }
        setAllVariants(data);
        setIsLoading(false);
      }, 50);
    };
    reader.readAsText(file);
  };

  // Filter Data efficiently
  const filteredVariants = useMemo(() => {
    let result = allVariants;
    if (passOnly) {
      result = result.filter((v) => v.filter === "PASS");
    }
    if (search.trim() !== "") {
      const query = search.toLowerCase();
      result = result.filter((v) => {
        const str = `${v.chrom} ${v.pos} ${v.id} ${v.info}`.toLowerCase();
        return str.includes(query);
      });
    }
    return result;
  }, [allVariants, search, passOnly]);

  const displayData = filteredVariants.slice(0, 500); // Cap at 500 for DOM performance
  const selectedVariant = selectedVarIndex !== null ? displayData[selectedVarIndex] : null;

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 md:min-h-[600px]">
      
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-heading mb-1">VCF Studio Web</h2>
          <p className="text-muted-foreground text-xs md:text-sm flex items-center gap-2">
            Variants: {allVariants.length.toLocaleString()} 
            {filteredVariants.length !== allVariants.length && ` (Showing ${filteredVariants.length.toLocaleString()})`}
          </p>
        </div>
        
        {/* Wrapping items for smaller screens */}
        <div className="flex flex-wrap items-center gap-2 md:gap-4 bg-muted/50 p-2 rounded-lg border border-border w-full md:w-auto">
          <Input 
            type="file" 
            accept=".vcf,.txt" 
            onChange={handleFileUpload} 
            className="w-full sm:w-auto h-9 text-xs cursor-pointer file:text-primary file:bg-primary/10 file:border-0 file:rounded-md file:mr-2 file:font-semibold" 
          />
          <Input 
            placeholder="Search Chrom, ID, Info..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={allVariants.length === 0}
            className="h-9 w-full sm:w-48 bg-background"
          />
          <label className="flex items-center gap-2 text-xs md:text-sm font-medium cursor-pointer w-full sm:w-auto">
            <Checkbox 
              checked={passOnly} 
              onCheckedChange={(checked) => setPassOnly(!!checked)} 
              disabled={allVariants.length === 0}
            />
            PASS Only
          </label>
        </div>
      </div>

      {/* Main Grid: Stack vertically on mobile, side-by-side on desktop */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-hidden">
        
        {/* Table Area */}
        <Card className="flex-1 overflow-hidden flex flex-col relative border-border shadow-sm min-h-[300px] lg:min-h-0">
          {isLoading && (
            <div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
              <Loader2 className="size-8 text-primary animate-spin mb-4" />
              <p className="font-bold text-sm tracking-widest uppercase">Parsing VCF...</p>
            </div>
          )}
          
          <div className="flex-1 overflow-auto relative">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="sticky top-0 bg-muted/90 backdrop-blur z-10 border-b border-border">
                <tr>
                  <th className="p-3 font-semibold text-primary uppercase tracking-wider">CHROM</th>
                  <th className="p-3 font-semibold text-primary uppercase tracking-wider text-right">POS</th>
                  <th className="p-3 font-semibold text-primary uppercase tracking-wider">ID</th>
                  <th className="p-3 font-semibold text-primary uppercase tracking-wider">REF</th>
                  <th className="p-3 font-semibold text-primary uppercase tracking-wider">ALT</th>
                  <th className="p-3 font-semibold text-primary uppercase tracking-wider text-right">QUAL</th>
                  <th className="p-3 font-semibold text-primary uppercase tracking-wider">FILTER</th>
                  <th className="p-3 font-semibold text-primary uppercase tracking-wider">INFO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {displayData.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-muted-foreground italic">
                      {allVariants.length === 0 ? "Upload a VCF file to view variants." : "No variants match the current filters."}
                    </td>
                  </tr>
                )}
                {displayData.map((v, i) => {
                  const isSelected = selectedVarIndex === i;
                  const isPass = v.filter === "PASS";
                  return (
                    <tr 
                      key={i} 
                      onClick={() => setSelectedVarIndex(i)}
                      className={`cursor-pointer transition-colors hover:bg-muted/50 ${isSelected ? 'bg-primary/10 border-l-2 border-l-primary' : 'border-l-2 border-l-transparent'}`}
                    >
                      <td className="p-2 font-mono">{v.chrom}</td>
                      <td className="p-2 font-mono text-right">{v.pos}</td>
                      <td className="p-2">{v.id === '.' ? '' : v.id}</td>
                      <td className="p-2 text-muted-foreground font-mono">{v.ref}</td>
                      <td className="p-2 text-foreground font-mono">{v.alt}</td>
                      <td className="p-2 text-right">{v.qual === '.' ? '' : v.qual}</td>
                      <td className="p-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${isPass ? 'bg-green-500/20 text-green-600 dark:text-green-400' : 'bg-red-500/20 text-red-600 dark:text-red-400'}`}>
                          {v.filter}
                        </span>
                      </td>
                      <td className="p-2 truncate max-w-[200px] text-muted-foreground">{v.info}</td>
                    </tr>
                  );
                })}
                {filteredVariants.length > 500 && (
                  <tr>
                    <td colSpan={8} className="p-4 text-center text-muted-foreground bg-muted/20 text-xs">
                      ... {filteredVariants.length - 500} more variants hidden for performance. Use filters to narrow down. ...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Detail Panel - Allow it to sit at bottom of scroll on mobile */}
        <Card className="w-full lg:w-80 shrink-0 p-4 bg-zinc-950 flex flex-col h-[250px] lg:h-auto overflow-hidden">
          <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary mb-3 shrink-0">Variant Details</h3>
          <div className="flex-1 overflow-auto font-mono text-xs text-zinc-300 whitespace-pre-wrap break-all custom-scrollbar pr-2">
            {selectedVariant ? (
              <>
                <div className="text-green-400 mb-2">=== LOCATION & IDS ===</div>
                Location:  {selectedVariant.chrom}:{selectedVariant.pos}<br/>
                ID:        {selectedVariant.id}<br/>
                Ref / Alt: {selectedVariant.ref} -{">"} {selectedVariant.alt}<br/>
                Quality:   {selectedVariant.qual}<br/>
                Filter:    {selectedVariant.filter}<br/><br/>
                
                <div className="text-blue-400 mb-2">--- INFO FIELDS ---</div>
                {selectedVariant.info.split(';').join('\n')}<br/><br/>
                
                <div className="text-yellow-400 mb-2">--- RAW VCF LINE ---</div>
                <span className="text-zinc-500">{selectedVariant.raw}</span>
              </>
            ) : (
              <span className="text-zinc-600 italic">Select a variant from the table to view full details...</span>
            )}
          </div>
        </Card>

      </div>
    </div>
  );
}
