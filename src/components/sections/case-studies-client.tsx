"use client";

import { useState } from "react";
import { Network, Sparkles, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Study {
    id: string;
    title: string;
    desc: string;
    category: string;
    tags: string[];
    url: string;
    client?: string;
    role?: string;
    image?: string;
    wide: boolean;
}

const TABS = ["ALL", "BIOINFORMATICS", "AI / ML"];

export function CaseStudiesClient({ allStudies }: { allStudies: Study[] }) {
    const [activeTab, setActiveTab] = useState("ALL");

    const filteredProjects = allStudies.filter(p =>
        activeTab === "ALL" || p.category === activeTab || p.tags.includes(activeTab)
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
                                <div className={`size-14 rounded-2xl border flex items-center justify-center bg-muted`}>
                                    <Network className="size-6 text-foreground" />
                                </div>
                                <div className="flex flex-wrap gap-2 justify-end max-w-[60%]">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-[9px] font-bold tracking-wider text-muted-foreground bg-muted/50 border px-2 py-1 rounded-md uppercase">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold tracking-tight mb-1">{project.title}</h3>
                            <div className="flex items-center gap-2 text-primary font-medium text-xs mb-3">
                                <span>{project.client}</span>
                                <span>•</span>
                                <span>{project.role}</span>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
                                {project.desc}
                            </p>

                            <div className="mt-auto">
                                <Button asChild variant="outline" className="rounded-full bg-background hover:bg-muted font-medium text-xs px-5 h-9">
                                    <Link href={project.url}>
                                        <FolderOpen className="size-3.5 mr-2" /> Read Case Study
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Visual side for wide cards */}
                        {project.wide && (
                            <div className="hidden lg:flex flex-1 bg-muted border border-border/50 rounded-3xl relative items-center justify-center overflow-hidden group">
                                {project.image ? (
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#888_1px,transparent_1px)][background-size:16px_16px]"></div>
                                )}

                                <div className="absolute top-4 right-4 size-8 rounded-full bg-background border flex items-center justify-center text-muted-foreground">
                                    <Sparkles className="size-4" />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
            <div className="mt-12 flex justify-center">
                <Button asChild variant="ghost">
                    <Link href="/case-studies">View All Engineering Studies</Link>
                </Button>
            </div>
        </section>
    );
}


