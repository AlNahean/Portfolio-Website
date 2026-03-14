import { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CaseStudyCard } from "@/components/case-study-card";
import { caseStudySource } from "@/lib/source";

export const metadata: Metadata = {
    title: "Case Studies",
    description: "Detailed breakdowns of my engineering process and architectural decisions.",
};

export default function CaseStudiesPage() {
    const studies =[...caseStudySource.getPages()].sort(
        (a, b) => new Date((b.data as any).date).getTime() - new Date((a.data as any).date).getTime()
    );

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <SiteHeader />
            <main className="flex-1 container max-w-6xl py-16 md:py-24">
                <div className="mb-16">
                    <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Case Studies
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl">
                        Deep dives into the technical challenges I've faced, the architectural decisions I made, and the impact of the final delivery.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-3">
                    {studies.map((study) => (
                        <CaseStudyCard key={study.url} study={study} />
                    ))}
                </div>
            </main>
            <SiteFooter />
        </div>
    );
}
