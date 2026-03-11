import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { PROJECTS } from "@/data/projects";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ProjectsSection() {
    // Only show the first 3 projects on the homepage
    const featuredProjects = PROJECTS.slice(0, 3);

    return (
        <section id="projects" className="py-24 bg-muted/30 border-y scroll-mt-16">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <div className="space-y-2">
                        <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
                            Featured Projects
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            A selection of my best work, ranging from full-stack applications to UI experiments.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/projects">
                            View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}