import { notFound } from "next/navigation";
import { caseStudySource } from "@/lib/source";
import { mdxComponents } from "@/mdx-components";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export async function generateStaticParams() {
    return caseStudySource.generateParams().map((page) => ({
        slug: page.slug[0],
    }));
}

export default async function CaseStudySinglePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const page = caseStudySource.getPage([resolvedParams.slug]);

    if (!page) notFound();

    const MDX = (page.data as any).body;

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <SiteHeader />
            <main className="flex-1 container max-w-4xl py-12 md:py-20">
                <Link href="/case-studies" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-12">
                    <ArrowLeft className="mr-2 size-4" /> Back to Case Studies
                </Link>

                <div className="space-y-6 mb-12 text-center md:text-left">
                    <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight text-balance">
                        {page.data.title}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                        {page.data.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center md:justify-start justify-center gap-6 pt-6 border-t mt-8 text-sm">
                        {(page.data as any).role && (
                            <div><span className="text-muted-foreground block mb-1 uppercase text-xs tracking-wider">Role</span><span className="font-medium">{(page.data as any).role}</span></div>
                        )}
                        {(page.data as any).timeline && (
                            <div><span className="text-muted-foreground block mb-1 uppercase text-xs tracking-wider">Timeline</span><span className="font-medium">{(page.data as any).timeline}</span></div>
                        )}
                    </div>
                </div>

                <div className="relative aspect-video w-full overflow-hidden rounded-3xl border bg-muted mb-16 shadow-xl">
                    <Image src={(page.data as any).image} alt={page.data.title} fill className="object-cover" priority />
                </div>

                <article className="prose prose-lg prose-neutral dark:prose-invert max-w-none prose-img:rounded-2xl prose-headings:font-heading">
                    <MDX components={mdxComponents} />
                </article>
            </main>
            <SiteFooter />
        </div>
    );
}
