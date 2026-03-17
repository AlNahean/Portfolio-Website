"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const HYDROPHOBIC =['A','I','L','M','F','W','V'];
const POLAR =['S','T','N','Q','Y','C'];
const CHARGED = ['R','K','H','D','E']; 

export default function SequenceViewer() {
  const [input, setInput] = useState("MVLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHFDLSHGSAQVKGHGKKVADALTNAVAHVDDMPNALSALSDLHAHKLRVDPVNFKLLSHCLLVTLAAHLPAEFTPAVHASLDKFLASVSTVLTSKYR");
  const [visualizedSeq, setVisualizedSeq] = useState<string[]>([]);

  const renderViewer = () => {
    setVisualizedSeq(input.toUpperCase().split(''));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold font-heading mb-1">Sequence Viewer & Highlighter</h2>
        <p className="text-muted-foreground text-sm">Highlights Hydrophobic (Red), Polar (Teal), and Charged (Purple) residues.</p>
      </div>

      <Card className="p-6 space-y-4">
        <Textarea 
          rows={4} 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste Protein Sequence here..."
          className="font-mono bg-muted/50"
        />
        <Button onClick={renderViewer} className="font-bold">Visualize Properties</Button>
        
        {visualizedSeq.length > 0 && (
          <div className="pt-4 mt-4 border-t border-border">
            <div className="font-mono text-lg leading-relaxed tracking-widest break-all bg-muted/10 p-4 rounded-lg border">
              {visualizedSeq.map((aa, idx) => {
                let colorClass = "text-foreground";
                if(HYDROPHOBIC.includes(aa)) colorClass = "text-red-500 font-bold";
                else if(POLAR.includes(aa)) colorClass = "text-teal-500 font-bold";
                else if(CHARGED.includes(aa)) colorClass = "text-purple-500 font-bold";

                return <span key={idx} className={colorClass}>{aa}</span>;
              })}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
