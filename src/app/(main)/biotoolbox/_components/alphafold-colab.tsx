"use client";

import { Card } from "@/components/ui/card";
import { CodeComponent } from "@/components/code";
import Image from "next/image";
import { Play } from "lucide-react";

const colabCode = `import py3Dmol
import glob
import matplotlib.pyplot as plt
from colabfold.colabfold import plot_plddt_legend
from colabfold.colabfold import pymol_color_list, alphabet_list

rank_num = 1 #["1", "2", "3", "4", "5"]
color = "lDDT" # ["chain", "lDDT", "rainbow"]
show_sidechains = True
show_mainchains = True

tag = results["rank"][0][rank_num - 1]
jobname_prefix = ".custom" if msa_mode == "custom" else ""
pdb_filename = f"{jobname}/{jobname}{jobname_prefix}_unrelaxed_{tag}.pdb"
pdb_file = glob.glob(pdb_filename)

def show_pdb(rank_num=1, show_sidechains=False, show_mainchains=False, color="lDDT"):
  model_name = f"rank_{rank_num}"
  view = py3Dmol.view(js='https://3dmol.org/build/3Dmol.js',)
  view.addModel(open(pdb_file[0],'r').read(),'pdb')

  if color == "lDDT":
    view.setStyle({'cartoon': {'colorscheme': {'prop':'b','gradient': 'roygb','min':50,'max':90}}})
  elif color == "rainbow":
    view.setStyle({'cartoon': {'color':'spectrum'}})
  elif color == "chain":
    chains = len(queries[0][1]) + 1 if is_complex else 1
    for n,chain,color in zip(range(chains),alphabet_list,pymol_color_list):
       view.setStyle({'chain':chain},{'cartoon': {'color':color}})
  # ... truncated for preview
  view.zoomTo()
  return view

show_pdb(rank_num, show_sidechains, show_mainchains, color).show()
if color == "lDDT":
  plot_plddt_legend().show()`;

export default function AlphaFoldColab() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading mb-1">AlphaFold Protein Prediction</h2>
          <p className="text-muted-foreground text-sm max-w-2xl">
            This tool links to my custom Google Colab notebook for running AlphaFold v2.0 predictions. 
            It utilizes GPU acceleration (T4) to predict 3D protein structures.
          </p>
        </div>
        <a 
          href="https://colab.research.google.com/drive/1PTKWNbQ1FRPk7Jr7RIEdpRKwyZfrIv4y?usp=sharing" 
          target="_blank" 
          className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-900 px-4 py-2 rounded-full text-sm font-bold shadow-sm hover:bg-white transition-colors"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Colaboratory_SVG_Logo.svg" alt="Colab" className="w-5 h-5" />
          Open in Colab
        </a>
      </div>

      <Card className="p-0 overflow-hidden border-border bg-muted/10">
        <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/40">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-xs font-mono text-muted-foreground">Colab Notebook Preview</span>
        </div>

        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x border-border">
          {/* Left: Code Snippet */}
          <div className="w-full md:w-3/5 p-4 bg-zinc-950 relative group">
            <a 
              href="https://colab.research.google.com/drive/1PTKWNbQ1FRPk7Jr7RIEdpRKwyZfrIv4y?usp=sharing"
              target="_blank"
              className="absolute top-6 left-6 z-10 w-8 h-8 rounded-full border-2 border-zinc-500 text-zinc-400 flex items-center justify-center hover:border-white hover:text-white hover:bg-white/10 transition-colors"
            >
               <Play className="size-3 ml-0.5" />
            </a>
            <div className="pl-12">
               {/* Reusing your CodeComponent */}
               <CodeComponent className="language-python !my-0 !bg-transparent !border-none !shadow-none !p-0">
                  {colabCode}
               </CodeComponent>
            </div>
          </div>

          {/* Right: Output Image */}
          <div className="w-full md:w-2/5 p-6 flex flex-col items-center justify-center bg-card">
            <div className="text-xs text-muted-foreground mb-4 uppercase tracking-widest font-bold">Execution Output</div>
            <div className="relative w-full aspect-square max-w-[300px] rounded-lg overflow-hidden border shadow-lg">
                <Image src="/alphafold/af.png" alt="AlphaFold Output" fill className="object-contain bg-white" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
