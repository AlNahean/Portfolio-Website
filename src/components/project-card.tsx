"use client";

import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Play } from "lucide-react";
import { Icons } from "@/components/icons";
import Link from "next/link";

// Define the serializable shape for the project card
export interface ProjectCardData {
    url: string;
    title: string;
    description: string;
    tech: string[];
    video?: string;
    image: string;
    live?: string;
    github?: string;
}

export function ProjectCard({ project }: { project: ProjectCardData }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const hasVideo = project.video && project.video.trim().length > 0 && !project.video.includes("Placeholder");

    const handleMouseEnter = () => {
        if (!hasVideo) return;
        setIsPlaying(true);
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch((e) => console.log("Autoplay prevented", e));
        }
    };

    const handleMouseLeave = () => {
        if (!hasVideo) return;
        setIsPlaying(false);
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    return (
        <div
            className="group relative flex flex-col overflow-hidden rounded-2xl border-none bg-card/40 text-card-foreground shadow-lg ring-1 ring-border/30 transition-all hover:bg-card/60 hover:shadow-xl hover:ring-border/80 h-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Media Container - Wrapped in Link to go to MDX page */}
            <Link href={project.url} className="relative aspect-video w-full overflow-hidden bg-muted block">
                <div
                    className={`absolute inset-0 z-10 transition-opacity duration-500 flex items-center justify-center bg-secondary/20 ${isPlaying ? "opacity-0" : "opacity-100"
                        }`}
                >
                    {project.image ? (
                        <img
                            src={project.image}
                            alt={project.title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    ) : (
                        <Icons.logo className="h-12 w-12 text-muted-foreground/20" />
                    )}

                    {hasVideo && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
                                <Play className="size-6 fill-current text-primary" />
                            </div>
                        </div>
                    )}
                </div>

                {hasVideo && (
                    <video
                        ref={videoRef}
                        src={project.video}
                        muted
                        loop
                        playsInline
                        className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-0"
                            }`}
                    />
                )}

                <div className="absolute top-3 right-3 z-20">
                    <Badge className="bg-zinc-950/90 text-zinc-50 hover:bg-zinc-950/90 border border-zinc-800 shadow-sm rounded-md px-2.5 py-0.5 text-xs font-semibold backdrop-blur-md">
                        {project.tech[0]}
                    </Badge>
                </div>
            </Link>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="mb-2">
                    <Link href={project.url}>
                        <h3 className="font-bold text-xl tracking-tight group-hover:text-primary transition-colors">
                            {project.title}
                        </h3>
                    </Link>
                </div>

                <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed mb-4">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {project.tech.slice(1).map((t) => (
                        <span
                            key={t}
                            className="inline-flex items-center rounded-md bg-secondary/60 px-2 py-1 text-[11px] font-medium text-secondary-foreground"
                        >
                            {t}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-3 mt-auto relative z-20">
                    {project.live && (
                        <Button className="flex-1 font-semibold" asChild>
                            <a href={project.live} target="_blank" rel="noopener noreferrer">
                                Visit Site <ExternalLink className="ml-2 size-4" />
                            </a>
                        </Button>
                    )}
                    {project.github && (
                        <Button variant="outline" className="flex-1 font-semibold" asChild>
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                                Source <Github className="ml-2 size-4" />
                            </a>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}