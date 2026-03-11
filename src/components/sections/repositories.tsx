import { GitFork, Star, BookOpen } from "lucide-react";
import { Icons } from "@/components/icons";

const REPOS =[
    {
        name: "py-seq-align",
        desc: "Python implementation of dynamic programming algorithms for local and global sequence alignment.",
        lang: "Python",
        langColor: "bg-blue-500",
        stars: 12,
        forks: 3
    },
    {
        name: "tg-summarizer-llm",
        desc: "A self-hosted bot that securely summarizes long Telegram group chats using Llama.cpp.",
        lang: "Python",
        langColor: "bg-blue-500",
        stars: 8,
        forks: 1
    },
    {
        name: "rusty-bio-tools",
        desc: "Command line utilities for FASTA/FASTQ parsing written purely in Rust for speed.",
        lang: "Rust",
        langColor: "bg-orange-500",
        stars: 24,
        forks: 5
    },
    {
        name: "scAnalyzer",
        desc: "Single-cell RNA sequencing data Analysis pipeline with PCA and clustering.",
        lang: "Python",
        langColor: "bg-blue-500",
        stars: 15,
        forks: 4
    },
    {
        name: "sc-genomics",
        desc: "R package for statistical analysis of genomic data.",
        lang: "R",
        langColor: "bg-purple-500",
        stars: 10,
        forks: 2
    },
    {
        name: "bio-viz",
        desc: "Web-based visualization library for protein structures.",
        lang: "TypeScript",
        langColor: "bg-blue-400",
        stars: 20,
        forks: 6
    }
];

export function RepositoriesSection() {
    return (
        <section className="py-24 container px-4">
            <div className="flex justify-between items-start mb-12">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Code Repositories</h2>
                    <p className="text-muted-foreground text-sm max-w-lg">
                        Open-source implementations, research code, and tools for the bioinformatics community.
                    </p>
                </div>
                <div className="p-3 rounded-2xl bg-card border shadow-sm">
                    <Icons.gitHub className="size-6" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {REPOS.map((repo, i) => (
                    <a key={i} href={`https://github.com/AlNahean/${repo.name}`} target="_blank" rel="noopener noreferrer" className="group block h-full">
                        <div className="bg-card border rounded-2xl p-6 flex flex-col h-full hover:border-primary/40 transition-colors">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold font-mono text-sm flex items-center gap-2 group-hover:text-primary transition-colors">
                                    <BookOpen className="size-4 text-muted-foreground" />
                                    {repo.name}
                                </h3>
                                <span className="text-[9px] font-bold tracking-widest text-muted-foreground border border-border/60 px-2 py-0.5 rounded-full uppercase">
                                    Public
                                </span>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-6 flex-1 line-clamp-3">
                                {repo.desc}
                            </p>

                            <div className="flex items-center gap-5 text-xs text-muted-foreground font-medium">
                                <div className="flex items-center gap-1.5">
                                    <span className={`size-2.5 rounded-full ${repo.langColor}`} />
                                    {repo.lang}
                                </div>
                                <div className="flex items-center gap-1 hover:text-foreground transition-colors">
                                    <Star className="size-3.5" /> {repo.stars}
                                </div>
                                <div className="flex items-center gap-1 hover:text-foreground transition-colors">
                                    <GitFork className="size-3.5" /> {repo.forks}
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
