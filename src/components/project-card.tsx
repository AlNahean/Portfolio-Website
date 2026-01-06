"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Play } from "lucide-react";
import { Icons } from "@/components/icons";

interface Project {
    id: number;
    title: string;
    description: string;
    tech: string[];
    video: string;
    image: string;
    live?: string;
    github?: string;
}

export function ProjectCard({ project }: { project: Project }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleMouseEnter = () => {
        setIsPlaying(true);
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch((e) => console.log("Autoplay prevented", e));
        }
    };

    const handleMouseLeave = () => {
        setIsPlaying(false);
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    return (
        <div
            className="group relative flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-xl hover:border-primary/50 h-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Media Container */}
            <div className="relative aspect-video w-full overflow-hidden bg-muted border-b">
                {/* Static Image / Placeholder */}
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

                    {/* Play Hint */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
                            <Play className="size-6 fill-current text-primary" />
                        </div>
                    </div>
                </div>

                {/* Video Preview */}
                <video
                    ref={videoRef}
                    src={project.video}
                    muted
                    loop
                    playsInline
                    className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-0"
                        }`}
                />

                {/* Tech Badge Overlay */}
                <div className="absolute top-3 right-3 z-20">
                    <Badge variant="secondary" className="backdrop-blur-md bg-background/80 shadow-sm border-none">
                        {project.tech[0]}
                    </Badge>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6">
                <div className="mb-4">
                    <h3 className="font-heading text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-3 leading-relaxed">
                        {project.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {project.tech.slice(1).map((t) => (
                        <span
                            key={t}
                            className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-gray-500/10"
                        >
                            {t}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t mt-auto">
                    {project.live && (
                        <Button size="sm" className="flex-1 font-semibold" asChild>
                            <a href={project.live} target="_blank" rel="noopener noreferrer">
                                Visit Site <ExternalLink className="ml-2 h-3.5 w-3.5" />
                            </a>
                        </Button>
                    )}
                    {project.github && (
                        <Button size="sm" variant="outline" className="flex-1" asChild>
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                                Source <Github className="ml-2 h-3.5 w-3.5" />
                            </a>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}