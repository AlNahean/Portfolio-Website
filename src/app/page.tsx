import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "@/components/sections/hero";
import { TechStackSection } from "@/components/sections/tech-stack";
import { AboutSection } from "@/components/sections/about";
import { ProjectsSection } from "@/components/sections/projects";
import { ExperienceSection } from "@/components/sections/experience";
import { GithubStatsSection } from "@/components/github-stats";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground font-sans selection:bg-blue-500/20 selection:text-blue-600">
            <SiteHeader />
            <main className="flex-1">
                <HeroSection />
                <TechStackSection />
                <AboutSection />
                <ProjectsSection />
                <ExperienceSection />
                <GithubStatsSection />
                <ContactSection />
            </main>
            <SiteFooter />
        </div>
    );
}