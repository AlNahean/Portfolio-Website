import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "@/components/sections/hero";
import { TechStackSection } from "@/components/sections/tech-stack";
import { AboutSection } from "@/components/sections/about";
import { ProjectsSection } from "@/components/sections/projects";
import { ExperienceSection } from "@/components/sections/experience";
import { GithubStatsSection } from "@/components/github-stats";
import { BlogSection } from "@/components/sections/blog";
import { ContactSection } from "@/components/sections/contact";
import { MicroCardsSection } from "@/components/sections/micro-cards";
import { CuratedShelf } from "@/components/sections/curated-shelf";
import { PublicationsSection } from "@/components/sections/publications";
import { BioToolboxSection } from "@/components/sections/biotoolbox";

// ---> Import the new components here <---
import { ReflectionsSection } from "@/components/sections/reflections";
import { PeopleSection } from "@/components/sections/people";
import { RepositoriesSection } from "@/components/sections/repositories";
import { CaseStudiesSection } from "@/components/sections/case-studies";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground font-sans selection:bg-blue-500/20 selection:text-blue-600">
            <SiteHeader />
            <main className="flex-1">
                <HeroSection />
                <TechStackSection />
                <AboutSection />
                <MicroCardsSection />
                <CuratedShelf />
                <ProjectsSection />
                <ExperienceSection />
                <PublicationsSection />
                <BioToolboxSection />
                <GithubStatsSection />
                <BlogSection />
                {/* --- Newly Added Sections --- */}
                <CaseStudiesSection />
                <RepositoriesSection />
                <ReflectionsSection />
                <PeopleSection />
                {/* ---------------------------- */}
                <ContactSection />
            </main>
            <SiteFooter />
        </div>
    );
}