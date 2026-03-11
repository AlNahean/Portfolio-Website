import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "@/components/sections/hero";
import { TechStackSection } from "@/components/sections/tech-stack";
import { AboutSection } from "@/components/sections/about";
import { MicroCardsSection } from "@/components/sections/micro-cards";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectsSection } from "@/components/sections/projects";
import { CaseStudiesSection } from "@/components/sections/case-studies";
import { RepositoriesSection } from "@/components/sections/repositories";
import { GithubStatsSection } from "@/components/github-stats";
import { BioToolboxSection } from "@/components/sections/biotoolbox";
import { PublicationsSection } from "@/components/sections/publications";
import { BlogSection } from "@/components/sections/blog";
import { ReflectionsSection } from "@/components/sections/reflections";
import { CuratedShelf } from "@/components/sections/curated-shelf";
import { PeopleSection } from "@/components/sections/people";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground font-sans selection:bg-blue-500/20 selection:text-blue-600">
            <SiteHeader />
            <main className="flex-1">
                {/* 1. Introduction & Overview */}
                <HeroSection />
                <TechStackSection />

                {/* 2. Personal Background */}
                <AboutSection />
                <MicroCardsSection />

                {/* 3. Professional Work */}
                {/* <ExperienceSection /> */}
                <ProjectsSection />
                <CaseStudiesSection />

                {/* 4. Open Source Contributions */}
                <RepositoriesSection />
                <GithubStatsSection />

                {/* 5. Specialized Domain (Bioinformatics) */}
                <BioToolboxSection />
                <PublicationsSection />

                {/* 6. Content, Thoughts, & Inspirations */}
                <BlogSection />
                <ReflectionsSection />
                <CuratedShelf />
                <PeopleSection />

                {/* 7. Call to Action */}
                <ContactSection />
            </main>
            <SiteFooter />
        </div>
    );
}