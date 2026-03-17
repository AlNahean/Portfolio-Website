"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function FastaFormatter() {
  const [inputSeq, setInputSeq] = useState("");
  const [header, setHeader] = useState("");
  const [outputSeq, setOutputSeq] = useState("");

  const formatFasta = () => {
    const raw = inputSeq.replace(/\s+/g, "");
    const head = header || "Formatted_Sequence";
    let formatted = `>${head}\n`;
    for (let i = 0; i < raw.length; i += 60) {
      formatted += raw.substring(i, i + 60) + "\n";
    }
    setOutputSeq(formatted);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold font-heading mb-1">FASTA Formatter</h2>
        <p className="text-muted-foreground text-sm">Formats messy sequence strings into standard 60-character per line FASTA format.</p>
      </div>

      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-primary uppercase tracking-wider">Input Messy Sequence</label>
          <Textarea 
            rows={4} 
            value={inputSeq}
            onChange={(e) => setInputSeq(e.target.value)}
            className="font-mono bg-muted/50"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-primary uppercase tracking-wider">Header Name (Optional)</label>
          <Input 
            placeholder="e.g. My_Sequence" 
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            className="bg-muted/50"
          />
        </div>

        <Button onClick={formatFasta} className="font-bold">Format to 60 chars/line</Button>

        <div className="pt-4 mt-4 border-t border-border">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">Output</label>
          <Textarea rows={6} readOnly value={outputSeq} className="font-mono bg-zinc-950 text-green-400" />
        </div>
      </Card>
    </div>
  );
}
