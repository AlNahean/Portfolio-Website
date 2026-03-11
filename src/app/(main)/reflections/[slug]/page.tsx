import { notFound } from "next/navigation";
import { reflectionSource } from "@/lib/source";
import { mdxComponents } from "@/mdx-components";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export async function generateStaticParams() {
    return reflectionSource.generateParams().map((page) => ({
        slug: page.slug[0],
    }));
}

export default async function ReflectionSinglePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page = reflectionSource.getPage([slug]);

    if (!page) notFound();

    const MDX = page.data.body;

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <SiteHeader />
            <main className="flex-1 container max-w-3xl py-12 md:py-20">
                <Link href="/reflections" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-12">
                    <ArrowLeft className="mr-2 size-4" /> Back to Notes
                </Link>

                <div className="space-y-6 mb-12 border-b pb-10">
                    <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase">
                        <span className="text-primary">{page.data.category}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{page.data.readTime}</span>
                    </div>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-balance">
                        {page.data.title}
                    </h1>
                    <p className="text-xl text-muted-foreground italic border-l-4 pl-4 border-muted">
                        "{page.data.description}"
                    </p>
                    <p className="text-sm text-muted-foreground pt-4">
                        Published on {new Date(page.data.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                </div>

                <article className="prose prose-lg prose-neutral dark:prose-invert max-w-none prose-img:rounded-2xl">
                    <MDX components={mdxComponents} />
                </article>
            </main>
            <SiteFooter />
        </div>
    );
}
