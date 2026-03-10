"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Award, Microscope, Video } from "lucide-react";

const PhysicsBadge = dynamic(() => import("@/registry/ui/physics-badge"), {
    ssr: false,
});

export function HeroSection() {
    return (
        <section id="about" className="relative w-full min-h-[85vh] flex items-center overflow-hidden">

            {/* --- 3D BACKGROUND LAYER --- */}
            {/* Positioned absolutely to fill the right half, serving as a backdrop for the whole hero */}
            <div className="absolute inset-0 z-0 hidden lg:block">
                {/* Physics Badge takes full height of the section */}
                <PhysicsBadge className="w-full h-full" />

                {/* Gradient fades to ensure text readability on the left */}
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            </div>

            {/* --- CONTENT LAYER --- */}
            <div className="container relative z-10 px-4 md:px-6 pointer-events-none">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Text & Bio */}
                    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-1000 pointer-events-auto">
                        <div className="space-y-2">
                            <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-primary">
                                Nahean Fardous
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-lg">
                                Botany Student • Bioinformatics & Software Developer
                            </p>
                        </div>

                        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground max-w-xl">
                            <p>
                                Nahean Fardous is a final-year Botany student from Bangladesh merging biological research with modern software engineering.
                            </p>
                            <p>
                                He builds high-performance bioinformatics tools using <span className="text-primary font-semibold">Rust</span> and <span className="text-primary font-semibold">Python</span>, bridging the gap between life sciences and computational power.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" className="h-12 px-8 rounded-full shadow-lg transition-transform hover:scale-105" asChild>
                                <a href="https://github.com/AlNahean" target="_blank" rel="noopener noreferrer">
                                    <Github className="mr-2 h-5 w-5" /> GitHub
                                </a>
                            </Button>
                            <Button size="lg" variant="outline" className="h-12 px-8 rounded-full transition-transform hover:scale-105" asChild>
                                <a href="https://www.linkedin.com/in/nahean-fardous-30b8a9238/" target="_blank" rel="noopener noreferrer">
                                    <Linkedin className="mr-2 h-5 w-5" /> LinkedIn
                                </a>
                            </Button>
                        </div>

                        {/* Highlights List */}
                        <div className="pt-6 space-y-4 border-t border-border/50 max-w-md">
                            <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Highlights</h3>
                            <ul className="grid gap-3">
                                <li className="flex items-center text-sm text-muted-foreground">
                                    <Award className="mr-3 h-4 w-4 text-primary" />
                                    Botany Honours Student – National University
                                </li>
                                <li className="flex items-center text-sm text-muted-foreground">
                                    <Microscope className="mr-3 h-4 w-4 text-primary" />
                                    Independent Bioinformatics Research
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column (Empty for Physics Badge, but needs to be here for grid layout) */}
                    <div className="hidden lg:block h-[600px]" />
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground hidden md:block pointer-events-none">
                <Video className="h-6 w-6 rotate-180 opacity-50" />
            </div>
        </section>
    );
}