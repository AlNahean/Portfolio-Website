import { notFound } from "next/navigation";
import { projectSource } from "@/lib/source";
import { mdxComponents } from "@/mdx-components";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
    return projectSource.generateParams().map((page) => ({
        slug: page.slug[0],
    }));
}

export default async function ProjectSinglePage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const resolvedParams = await params;
    const page = projectSource.getPage([resolvedParams.slug]);

    if (!page) notFound();

    const MDX = page.data.body;

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <SiteHeader />

            <main className="flex-1 container max-w-4xl py-12 md:py-20">
                <Link href="/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
                    <ArrowLeft className="mr-2 size-4" /> Back to projects
                </Link>

                {/* Header Area */}
                <div className="space-y-6 mb-12">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
                        {page.data.title}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {page.data.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex flex-wrap gap-2">
                            {page.data.tech.map((t: string) => (
                                <Badge key={t} variant="secondary">{t}</Badge>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 border-l pl-4 ml-2">
                            {page.data.live && (
                                <Button size="sm" asChild>
                                    <a href={page.data.live} target="_blank" rel="noopener noreferrer">
                                        Live Site <ExternalLink className="ml-2 size-3" />
                                    </a>
                                </Button>
                            )}
                            {page.data.github && (
                                <Button size="sm" variant="outline" asChild>
                                    <a href={page.data.github} target="_blank" rel="noopener noreferrer">
                                        Source <Github className="ml-2 size-3" />
                                    </a>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Hero Image / Video */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border bg-muted mb-12 shadow-lg">
                    {page.data.video && !page.data.video.includes("Placeholder") ? (
                        <video src={page.data.video} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                    ) : (
                        <Image src={page.data.image} alt={page.data.title} fill className="object-cover" priority />
                    )}
                </div>

                {/* Content */}
                <article className="prose prose-neutral dark:prose-invert max-w-none prose-img:rounded-xl">
                    <MDX components={mdxComponents} />
                </article>
            </main>

            <SiteFooter />
        </div>
    );
}
