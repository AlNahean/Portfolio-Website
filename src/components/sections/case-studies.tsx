import { Button } from "@/components/ui/button";
import { CaseStudyCard } from "@/components/case-study-card";
import { caseStudySource } from "@/lib/source";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CaseStudiesSection() {
    // Sort by date and take top 3
    const studies = [...caseStudySource.getPages()]
        .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
        .slice(0, 3);

    return (
        <section id="case-studies" className="py-24 bg-background border-y">
            <div className="container-wrapper 3xl:fixed:px-0 px-6 ">
                <div className="3xl:fixed:container max-w-8xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="space-y-4">
                            <span className="text-primary font-bold tracking-widest text-sm uppercase">Deep Dives</span>
                            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
                                Case Studies
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl">
                                Detailed breakdowns of my engineering process, architectural decisions, and the problems I've solved.
                            </p>
                        </div>
                        <Button variant="outline" className="rounded-full px-6" asChild>
                            <Link href="/case-studies">
                                View All <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    <div className="flex flex-col gap-8">
                        {studies.map((study) => (
                            <CaseStudyCard key={study.url} study={study} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
