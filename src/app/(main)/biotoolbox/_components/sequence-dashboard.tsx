"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const CODON_TABLE: Record<string, string> = {
  ATA:'I', ATC:'I', ATT:'I', ATG:'M', ACA:'T', ACC:'T', ACG:'T', ACT:'T',
  AAC:'N', AAT:'N', AAA:'K', AAG:'K', AGC:'S', AGT:'S', AGA:'R', AGG:'R',
  CTA:'L', CTC:'L', CTG:'L', CTT:'L', CCA:'P', CCC:'P', CCG:'P', CCT:'P',
  CAC:'H', CAT:'H', CAA:'Q', CAG:'Q', CGA:'R', CGC:'R', CGG:'R', CGT:'R',
  GTA:'V', GTC:'V', GTG:'V', GTT:'V', GCA:'A', GCC:'A', GCG:'A', GCT:'A',
  GAC:'D', GAT:'D', GAA:'E', GAG:'E', GGA:'G', GGC:'G', GGG:'G', GGT:'G',
  TCA:'S', TCC:'S', TCG:'S', TCT:'S', TTC:'F', TTT:'F', TTA:'L', TTG:'L',
  TAC:'Y', TAT:'Y', TAA:'_', TAG:'_', TGC:'C', TGT:'C', TGA:'_', TGG:'W',
};

export default function SequenceDashboard() {
  const [input, setInput] = useState("");

  const stats = useMemo(() => {
    const seq = input.toUpperCase().replace(/[^ATGCU]/g, '');
    const total = seq.length;
    const gc = (seq.match(/[GC]/g) ||[]).length;
    const gcPercent = total > 0 ? ((gc / total) * 100).toFixed(1) : "0";

    const revCompDict: Record<string, string> = { 'A':'T', 'T':'A', 'U':'A', 'G':'C', 'C':'G' };
    const revComp = seq.split('').reverse().map(b => revCompDict[b] || b).join('');

    let protein = "";
    for(let i = 0; i < seq.length - 2; i += 3) {
        let codon = seq.substring(i, i+3);
        protein += CODON_TABLE[codon] || "?";
    }

    return { total, gcPercent, revComp, protein };
  }, [input]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold font-heading mb-1">Sequence Analysis Dashboard</h2>
        <p className="text-muted-foreground text-sm">Real-time calculation of GC content, reverse complement, and translation.</p>
      </div>

      <Card className="p-6">
        <label className="text-xs font-bold text-primary uppercase tracking-wider block mb-2">Input DNA Sequence</label>
        <Textarea 
          rows={4} 
          placeholder="ATGC..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="font-mono bg-muted/50"
        />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex flex-col items-center justify-center text-center">
          <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">GC Content</h5>
          <h1 className="text-4xl font-bold text-primary mb-1">{stats.gcPercent}%</h1>
          <small className="text-muted-foreground">Length: {stats.total} bp</small>
        </Card>
        
        <Card className="p-6 md:col-span-2 flex flex-col">
          <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Reverse Complement</h5>
          <div className="flex-1 bg-muted/30 border border-dashed rounded-md p-3 font-mono text-sm break-all text-muted-foreground overflow-y-auto max-h-32">
            {stats.revComp || "Waiting for input..."}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Protein Translation (Frame +1)</h5>
        <div className="bg-muted/30 border border-dashed rounded-md p-3 font-mono text-sm break-all text-muted-foreground max-h-40 overflow-y-auto">
          {stats.protein || "Waiting for input..."}
        </div>
      </Card>
    </div>
  );
}
