import { BookOpen, Microscope, GraduationCap, FileText, ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PUBLICATIONS = [
    {
        title: "Graph-Based Multi-Omic Integration Methods for Breast Cancer Research",
        authors: "Nahean Fardous • A. Demirbas",
        venue: "Bioinformatics (Oxford Academic)",
        type: "PREPRINT",
        date: "AUG 2026",
        slug: "graph-based-integration",
        icon: <Microscope className="size-6 text-emerald-500" />,
        iconBg: "bg-emerald-950/30",
        links: { arxiv: "#", pdf: "#", code: "#" }
    },
    {
        title: "Comparing Tensor Processing Unit and CPU Performance for Image Classification",
        authors: "Nahean Fardous • A. Cinar",
        venue: "Journal of Computer Science and Technology, 2024; 1(1): 10-15",
        type: "JOURNAL ARTICLE",
        date: "AUG 2024",
        slug: "comparing-tpu-cpu-performance",
        icon: <BookOpen className="size-6 text-blue-500" />,
        iconBg: "bg-blue-950/30",
        links: { pdf: "#", doi: "#" }
    },
    {
        title: "Sequence Pattern Analysis Using Python",
        authors: "Nahean Fardous",
        venue: "Self-Published Technical Note",
        type: "INDEPENDENT RESEARCH",
        date: "AUG 2023",
        slug: "sequence-pattern-analysis",
        icon: <GraduationCap className="size-6 text-orange-500" />,
        iconBg: "bg-orange-950/30",
        links: { pdf: "#", code: "#" }
    }
];

import Link from "next/link";

export function PublicationsSection() {
    return (
        <section className="py-24 container px-4">
            <div className="mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-3">Research Publications</h2>
                <p className="text-muted-foreground text-sm">
                    Peer-reviewed articles, conference papers, and preprints in bioinformatics and machine learning.
                </p>
            </div>

            <div className="space-y-4">
                {PUBLICATIONS.map((pub, i) => (
                    <div key={i} className="group border border-zinc-800 bg-zinc-900/30 p-6 rounded-2xl flex flex-col md:flex-row md:items-center gap-6 hover:bg-zinc-900/50 transition-colors">
                        {/* Icon */}
                        <div className={`p-4 rounded-2xl ${pub.iconBg}`}>
                            {pub.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                                <Badge variant="outline" className="text-[10px] font-bold tracking-wider text-zinc-400 border-zinc-700 bg-zinc-950">
                                    {pub.type}
                                </Badge>
                                <span className="text-[10px] font-mono text-zinc-500 uppercase">{pub.date}</span>
                            </div>
                            <Link href={`/publications/${pub.slug}`}>
                                <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors cursor-pointer">{pub.title}</h3>
                            </Link>
                            <p className="text-sm text-zinc-400">{pub.authors}</p>
                            <p className="text-xs text-zinc-500 font-mono italic">↳ {pub.venue}</p>
                        </div>

                        {/* Links */}
                        <div className="flex flex-wrap gap-2 shrink-0">
                            {Object.entries(pub.links).map(([key, link]) => (
                                <Button key={key} variant="outline" size="sm" className="rounded-full text-xs h-8 border-zinc-700 hover:bg-zinc-800" asChild>
                                    <a href={link} target="_blank">
                                        {key === 'code' ? <Github className="mr-2 size-3" /> : <FileText className="mr-2 size-3" />}
                                        {key.toUpperCase()}
                                    </a>
                                </Button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}