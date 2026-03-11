import { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProjectCard } from "@/components/project-card";
import { PROJECTS } from "@/data/projects";

export const metadata: Metadata = {
    title: "Projects",
    description: "A complete archive of my work, ranging from full-stack applications to UI experiments.",
};

export default function ProjectsPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">
            <SiteHeader />
            
            <main className="flex-1 container py-16 md:py-24">
                <div className="space-y-4 mb-16 text-center md:text-left">
                    <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                        All Projects
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto md:mx-0">
                        A complete archive of my work, ranging from full-stack applications to UI experiments. Hover over cards to preview live interactions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </main>
            
            <SiteFooter />
        </div>
    );
}
