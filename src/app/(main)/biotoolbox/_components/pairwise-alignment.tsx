"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

type AlignmentResult = {
  score: number;
  align1: string;
  align2: string;
  matrix: number[][];
  path: [number, number][];
  type: string;
  identity: number;
} | null;

export default function PairwiseAlignment() {
  const [seqA, setSeqA] = useState("GCATGCU");
  const[seqB, setSeqB] = useState("GATTACA");
  const [algo, setAlgo] = useState("nw");
  const [match, setMatch] = useState(1);
  const [mismatch, setMismatch] = useState(-1);
  const [gap, setGap] = useState(-2);
  const [result, setResult] = useState<AlignmentResult>(null);

  const runAlignment = () => {
    const s1 = seqA.toUpperCase().trim();
    const s2 = seqB.toUpperCase().trim();
    if (!s1 || !s2) return;

    let res;
    if (algo === "lev") res = levenshtein(s1, s2);
    else if (algo === "nw") res = needlemanWunsch(s1, s2, match, mismatch, gap);
    else res = smithWaterman(s1, s2, match, mismatch, gap);

    setResult(res);
  };

  // -- ALGORITHMS --
  const levenshtein = (s1: string, s2: string) => {
    let n = s1.length, m = s2.length;
    let matrix = Array(n + 1).fill(null).map(() => Array(m + 1).fill(0));
    for (let i = 0; i <= n; i++) matrix[i][0] = i;
    for (let j = 0; j <= m; j++) matrix[0][j] = j;

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        if (s1[i - 1] === s2[j - 1]) matrix[i][j] = matrix[i - 1][j - 1];
        else matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
      }
    }

    let path: [number, number][] =[], i = n, j = m;
    path.push([i, j]);
    while (i > 0 || j > 0) {
      let curr = matrix[i][j];
      if (i > 0 && j > 0 && s1[i - 1] === s2[j - 1] && matrix[i - 1][j - 1] === curr) { i--; j--; }
      else if (i > 0 && j > 0 && matrix[i - 1][j - 1] + 1 === curr) { i--; j--; }
      else if (i > 0 && matrix[i - 1][j] + 1 === curr) i--;
      else j--;
      path.push([i, j]);
    }
    return { score: matrix[n][m], align1: s1, align2: s2, matrix, path, type: "Levenshtein Distance", identity: 0 };
  };

  const needlemanWunsch = (s1: string, s2: string, match: number, mismatch: number, gap: number) => {
    let n = s1.length, m = s2.length;
    let matrix = Array(n + 1).fill(null).map(() => Array(m + 1).fill(0));
    for (let i = 0; i <= n; i++) matrix[i][0] = i * gap;
    for (let j = 0; j <= m; j++) matrix[0][j] = j * gap;

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        let scoreDiag = matrix[i - 1][j - 1] + (s1[i - 1] === s2[j - 1] ? match : mismatch);
        let scoreUp = matrix[i - 1][j] + gap;
        let scoreLeft = matrix[i][j - 1] + gap;
        matrix[i][j] = Math.max(scoreDiag, scoreUp, scoreLeft);
      }
    }

    let a1 = "", a2 = "", i = n, j = m, matches = 0;
    let path: [number, number][] =[];
    path.push([i, j]);

    while (i > 0 || j > 0) {
      let score = matrix[i][j];
      if (i > 0 && j > 0 && score === matrix[i - 1][j - 1] + (s1[i - 1] === s2[j - 1] ? match : mismatch)) {
        a1 = s1[i - 1] + a1; a2 = s2[j - 1] + a2;
        if (s1[i - 1] === s2[j - 1]) matches++;
        i--; j--;
      } else if (i > 0 && score === matrix[i - 1][j] + gap) {
        a1 = s1[i - 1] + a1; a2 = "-" + a2; i--;
      } else {
        a1 = "-" + a1; a2 = s2[j - 1] + a2; j--;
      }
      path.push([i, j]);
    }
    const identity = a1.length > 0 ? (matches / a1.length) * 100 : 0;
    return { score: matrix[n][m], align1: a1, align2: a2, matrix, path, type: "Global (Needleman-Wunsch)", identity };
  };

  const smithWaterman = (s1: string, s2: string, match: number, mismatch: number, gap: number) => {
    let n = s1.length, m = s2.length;
    let matrix = Array(n + 1).fill(null).map(() => Array(m + 1).fill(0));
    let maxScore = 0, maxI = 0, maxJ = 0;

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        let scoreDiag = matrix[i - 1][j - 1] + (s1[i - 1] === s2[j - 1] ? match : mismatch);
        let scoreUp = matrix[i - 1][j] + gap;
        let scoreLeft = matrix[i][j - 1] + gap;
        matrix[i][j] = Math.max(0, scoreDiag, scoreUp, scoreLeft);
        if (matrix[i][j] > maxScore) { maxScore = matrix[i][j]; maxI = i; maxJ = j; }
      }
    }

    let a1 = "", a2 = "", i = maxI, j = maxJ, matches = 0;
    let path: [number, number][] =[];
    path.push([i, j]);

    while (matrix[i][j] > 0) {
      let score = matrix[i][j];
      if (i > 0 && j > 0 && score === matrix[i - 1][j - 1] + (s1[i - 1] === s2[j - 1] ? match : mismatch)) {
        a1 = s1[i - 1] + a1; a2 = s2[j - 1] + a2;
        if (s1[i - 1] === s2[j - 1]) matches++;
        i--; j--;
      } else if (i > 0 && score === matrix[i - 1][j] + gap) {
        a1 = s1[i - 1] + a1; a2 = "-" + a2; i--;
      } else {
        a1 = "-" + a1; a2 = s2[j - 1] + a2; j--;
      }
      path.push([i, j]);
    }
    const identity = a1.length > 0 ? (matches / a1.length) * 100 : 0;
    return { score: maxScore, align1: a1, align2: a2, matrix, path, type: "Local (Smith-Waterman)", identity };
  };

  // Rendering the dynamic visual match line
  const renderVisualLine = (a1: string, a2: string) => {
    let visual = "";
    for (let i = 0; i < a1.length; i++) {
      if (a1[i] === a2[i] && a1[i] !== '-') visual += "|";
      else if (a1[i] === '-' || a2[i] === '-') visual += " ";
      else visual += ".";
    }
    return visual;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-xl md:text-2xl font-bold font-heading mb-1">Pairwise Sequence Alignment</h2>
        <p className="text-muted-foreground text-sm">Dynamic programming algorithms for DNA/RNA sequence matching.</p>
      </div>

      <Card className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-primary uppercase tracking-wider">Sequence A (Vertical)</label>
            <Textarea rows={3} value={seqA} onChange={(e) => setSeqA(e.target.value)} className="font-mono uppercase bg-muted/50" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-primary uppercase tracking-wider">Sequence B (Horizontal)</label>
            <Textarea rows={3} value={seqB} onChange={(e) => setSeqB(e.target.value)} className="font-mono uppercase bg-muted/50" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6 md:items-end">
          <div className="w-full md:w-1/3 space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Algorithm</label>
            <select 
              value={algo} 
              onChange={(e) => setAlgo(e.target.value)}
              className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="nw" className="bg-background text-foreground">Needleman-Wunsch (Global)</option>
              <option value="sw" className="bg-background text-foreground">Smith-Waterman (Local)</option>
              <option value="lev" className="bg-background text-foreground">Levenshtein Distance</option>
            </select>
          </div>
          <div className={`w-full md:w-2/3 grid grid-cols-3 gap-2 ${algo === 'lev' ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider">Match</label>
              <Input type="number" value={match} onChange={(e) => setMatch(parseInt(e.target.value))} className="bg-muted/50" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider">Mismatch</label>
              <Input type="number" value={mismatch} onChange={(e) => setMismatch(parseInt(e.target.value))} className="bg-muted/50" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider">Gap</label>
              <Input type="number" value={gap} onChange={(e) => setGap(parseInt(e.target.value))} className="bg-muted/50" />
            </div>
          </div>
        </div>

        <Button onClick={runAlignment} className="w-full font-bold">Run Alignment</Button>

        {result && (
          <div className="mt-8 space-y-6 border-t pt-6">
            <div>
              <h5 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Result: {result.type}</h5>
              <div className="bg-zinc-950 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-border text-zinc-300">
                <p className="text-green-400 mb-4">Score: {result.score} | Identity: {result.identity.toFixed(1)}%</p>
                <div className="leading-tight whitespace-pre">
                  <p>Seq A: {result.align1}</p>
                  <p>       {renderVisualLine(result.align1, result.align2)}</p>
                  <p>Seq B: {result.align2}</p>
                </div>
              </div>
            </div>

            <div className="w-full overflow-hidden">
              <h5 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Dynamic Programming Matrix</h5>
              <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
                <table className="border-collapse font-mono text-xs mx-auto min-w-max">
                  <tbody>
                    <tr>
                      <td className="p-2 border border-border/50 bg-muted/20 font-bold text-primary"></td>
                      <td className="p-2 border border-border/50 bg-muted/20 font-bold text-primary"></td>
                      {seqB.toUpperCase().split('').map((b, i) => (
                        <td key={i} className="p-2 border border-border/50 bg-muted/20 font-bold text-primary text-center min-w-[40px]">{b}</td>
                      ))}
                    </tr>
                    {result.matrix.map((row, i) => (
                      <tr key={i}>
                        <td className="p-2 border border-border/50 bg-muted/20 font-bold text-primary text-center">
                          {i === 0 ? "" : seqA.toUpperCase()[i - 1]}
                        </td>
                        {row.map((cell, j) => {
                          const isPath = result.path.some(p => p[0] === i && p[1] === j);
                          return (
                            <td 
                              key={j} 
                              className={`p-2 border border-border/50 text-center min-w-[40px] ${
                                isPath ? "bg-primary text-primary-foreground font-bold shadow-inner" : "text-muted-foreground"
                              }`}
                            >
                              {cell}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
