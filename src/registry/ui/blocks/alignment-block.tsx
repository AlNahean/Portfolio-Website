"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const SEQUENCE = "ATGCGTAACGTTAGCCGTAACGTTAGCCGTAACGTTAGCCGTAACGTTAGCCGTAACGTTAGCCGTAA".split("");
const COLORS = {
    A: "bg-red-500/20 text-red-500 border-red-500/30",
    T: "bg-blue-500/20 text-blue-500 border-blue-500/30",
    G: "bg-green-500/20 text-green-500 border-green-500/30",
    C: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
};

export default function AlignmentBlock() {
    return (
        <div className="w-full p-6 space-y-8 bg-background overflow-hidden">
            <div className="space-y-2">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    Sequence Alignment Visualizer
                    <span className="text-xs font-mono px-2 py-0.5 bg-primary/10 text-primary rounded-full">BETA</span>
                </h3>
                <p className="text-sm text-muted-foreground">
                    Interactive matrix representation of genomic sequence fragments and their pairwise alignment scores.
                </p>
            </div>

            <div className="relative overflow-auto pb-4 custom-scrollbar">
                <div className="flex flex-col gap-1 min-w-max">
                    {/* Header Row */}
                    <div className="flex gap-1 ml-10">
                        {SEQUENCE.slice(0, 24).map((base, i) => (
                            <div key={`h-${i}`} className="w-8 h-8 flex items-center justify-center text-xs font-mono text-muted-foreground border-b italic">
                                {i + 1}
                            </div>
                        ))}
                    </div>

                    {/* Sequence Row 1 */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 font-mono text-xs font-bold text-muted-foreground">REF</div>
                        <div className="flex gap-1">
                            {SEQUENCE.slice(0, 24).map((base, i) => (
                                <SequenceBase key={`s1-${i}`} base={base} delay={i * 0.05} />
                            ))}
                        </div>
                    </div>

                    {/* Gap Row */}
                    <div className="h-4 flex items-center gap-1 ml-10">
                        {SEQUENCE.slice(0, 24).map((_, i) => (
                            <div key={`g-${i}`} className="w-8 flex justify-center">
                                <div className="w-0.5 h-full bg-border" />
                            </div>
                        ))}
                    </div>

                    {/* Sequence Row 2 */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 font-mono text-xs font-bold text-muted-foreground">OBJ</div>
                        <div className="flex gap-1">
                            {SEQUENCE.slice(0, 24).map((base, i) => {
                                // Simulate some mismatches/gaps
                                const isMismatch = i === 5 || i === 12 || i === 18;
                                const displayBase = isMismatch ? (["A", "T", "G", "C"].filter(b => b !== base)[Math.floor(Math.random() * 3)]) : base;
                                return (
                                    <SequenceBase 
                                        key={`s2-${i}`} 
                                        base={displayBase} 
                                        delay={i * 0.05 + 0.5} 
                                        highlight={isMismatch}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard label="Score" value="248.5" trend="+12.2" />
                <MetricCard label="Identity" value="87.5%" trend="-2.1%" />
                <MetricCard label="Gaps" value="0.4%" trend="0.0%" />
                <MetricCard label="E-Value" value="2.1e-45" trend="Stable" />
            </div>
        </div>
    );
}

function SequenceBase({ base, delay, highlight = false }: { base: string, delay: number, highlight?: boolean }) {
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay, duration: 0.3 }}
            className={cn(
                "w-8 h-8 flex items-center justify-center rounded border font-mono font-bold text-xs transition-colors",
                COLORS[base as keyof typeof COLORS],
                highlight && "ring-2 ring-primary ring-offset-2 ring-offset-background"
            )}
        >
            {base}
        </motion.div>
    );
}

function MetricCard({ label, value, trend }: { label: string, value: string, trend: string }) {
    const isNegative = trend.startsWith("-");
    const isStable = trend === "Stable" || trend === "0.0%";
    
    return (
        <div className="p-3 rounded-lg border bg-muted/50 space-y-1">
            <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">{label}</div>
            <div className="text-xl font-bold font-mono">{value}</div>
            <div className={cn(
                "text-[10px] font-medium",
                isNegative ? "text-red-500" : isStable ? "text-muted-foreground" : "text-green-500"
            )}>
                {trend} {!isStable && (isNegative ? "↓" : "↑")}
            </div>
        </div>
    );
}
