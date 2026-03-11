"use client";

import { useState } from "react";
import { Network, MessageSquare, Video, GitFork, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const TABS = ["ALL", "BIOINFORMATICS", "AI / ML"];

const PROJECTS = [
    {
        id: 1,
        title: "Local Sequence Alignment Tool",
        category: "BIOINFORMATICS",
        desc: "A Python-based tool to analyze DNA sequence similarity using dynamic programming. Features Needleman-Wunsch and Smith-Waterman implementations locally with a CLI interface.",
        tags: ["PYTHON", "ALGORITHMS", "BIOINFORMATICS"],
        icon: <Network className="size-6 text-foreground" />,
        iconBg: "bg-muted",
        wide: false
    },
    {
        id: 2,
        title: "Telegram Chat Summarizer",
        category: "AI / ML",
        desc: "Local AI client that summarizes group conversations automatically using open-source LLMs. Respects privacy by keeping analysis computation entirely on-device.",
        tags: ["LLM", "LLAMA.CPP", "PYTHON"],
        icon: <MessageSquare className="size-6 text-blue-400" />,
        iconBg: "bg-blue-500/10 border-blue-500/20",
        wide: false
    },
    {
        id: 3,
        title: "FFmpeg Desktop GUI",
        category: "ALL", // Show everywhere or specific if needed
        desc: "A blazing fast desktop GUI wrapper for FFmpeg built with Rust and Tauri. Makes complex video encoding tasks accessible through a clean, native UI with real-time progress and intuitive controls.",
        tags: ["RUST", "TAURI", "FFMPEG", "NATIVE UX"],
        icon: <Video className="size-6 text-orange-500" />,
        iconBg: "bg-orange-500/10 border-orange-500/20",
        wide: true
    }
];

export function CaseStudiesSection() {
    const [activeTab, setActiveTab] = useState("ALL");

    const filteredProjects = PROJECTS.filter(p =>
        activeTab === "ALL" || p.category === activeTab || p.category === "ALL"
    );

    return (
        <section className="py-24 container px-4">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        <Sparkles className="size-3" /> SELECTED WORKS
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                        Projects <span className="text-muted-foreground">&&</span> Case Studies
                    </h2>
                    <p className="text-muted-foreground text-sm max-w-lg leading-relaxed">
                        From high-performance bioinformatics pipelines to local AI integration, I build with performance and privacy in mind.
                    </p>
                </div>

                {/* Custom Pill Tabs */}
                <div className="inline-flex bg-card border p-1.5 rounded-full overflow-x-auto max-w-full">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap ${activeTab === tab
                                    ? "bg-zinc-800 text-white shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProjects.map((project) => (
                    <div
                        key={project.id}
                        className={`bg-card border rounded-[2rem] p-8 flex flex-col ${project.wide ? 'lg:col-span-2 lg:flex-row lg:items-stretch gap-8' : ''}`}
                    >
                        {/* Content side */}
                        <div className={`flex flex-col flex-1 ${project.wide ? 'lg:w-1/2' : ''}`}>
                            <div className="flex justify-between items-start mb-8">
                                <div className={`size-14 rounded-2xl border flex items-center justify-center ${project.iconBg}`}>
                                    {project.icon}
                                </div>
                                <div className="flex flex-wrap gap-2 justify-end max-w-[60%]">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-[9px] font-bold tracking-wider text-muted-foreground bg-muted/50 border px-2 py-1 rounded-md uppercase">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold tracking-tight mb-3">{project.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
                                {project.desc}
                            </p>

                            <div className="mt-auto">
                                <Button variant="outline" className="rounded-full bg-background hover:bg-muted font-medium text-xs px-5 h-9">
                                    <GitFork className="size-3.5 mr-2" /> Source Code
                                </Button>
                            </div>
                        </div>

                        {/* Visual side for wide cards */}
                        {project.wide && (
                            <div className="hidden lg:flex flex-1 bg-orange-950/20 border border-orange-500/10 rounded-3xl relative items-center justify-center overflow-hidden group">
                                {/* Dot pattern overlay */}
                                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ea580c_1px,transparent_1px)][background-size:16px_16px]"></div>

                                {/* Icon/Graphic wrapper */}
                                <div className="relative z-10 size-24 rounded-3xl border border-orange-500/30 flex items-center justify-center bg-background/50 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                                    {project.icon}
                                </div>

                                <div className="absolute top-4 right-4 size-8 rounded-full bg-background border flex items-center justify-center text-muted-foreground">
                                    <Sparkles className="size-4" />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
