import { notFound } from "next/navigation";
import { authorSource } from "@/lib/source";
import { mdxComponents } from "@/mdx-components";
import Image from "next/image";
import { Globe, User } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
    return authorSource.generateParams().map((page) => ({
        slug: page.slug[0],
    }));
}

export default async function AuthorSinglePage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const resolvedParams = await params;
    const page = authorSource.getPage([resolvedParams.slug]);

    if (!page) notFound();

    const MDX = page.data.body;

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <SiteHeader />

            <main className="flex-1 container max-w-3xl py-12 md:py-20">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 text-center sm:text-left">
                    {page.data.avatar ? (
                        <Image 
                            src={page.data.avatar} 
                            alt={page.data.title} 
                            width={120} 
                            height={120} 
                            className="rounded-full object-cover border-4 border-muted shadow-sm shrink-0"
                        />
                    ) : (
                        <div className="size-[120px] rounded-full bg-muted flex items-center justify-center border-4 border-border shadow-sm shrink-0">
                            <User className="size-12 text-muted-foreground" />
                        </div>
                    )}
                    <div className="flex flex-col gap-3 min-w-0">
                        <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight truncate">
                            {page.data.title}
                        </h1>
                        {page.data.role && (
                            <p className="text-sm font-bold text-primary uppercase tracking-wider truncate">
                                {page.data.role}
                            </p>
                        )}
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
                            {page.data.github && (
                                <Button asChild size="icon" variant="outline" className="h-8 w-8">
                                    <a href={page.data.github} target="_blank" rel="noreferrer">
                                        <Icons.gitHub className="size-4" />
                                    </a>
                                </Button>
                            )}
                            {page.data.twitter && (
                                <Button asChild size="icon" variant="outline" className="h-8 w-8">
                                    <a href={`https://twitter.com/${page.data.twitter.replace('@', '')}`} target="_blank" rel="noreferrer">
                                        <Icons.twitter className="size-4 fill-current" />
                                    </a>
                                </Button>
                            )}
                            {page.data.linkedin && (
                                <Button asChild size="icon" variant="outline" className="h-8 w-8">
                                    <a href={page.data.linkedin} target="_blank" rel="noreferrer">
                                        <Icons.linkedin className="size-4" />
                                    </a>
                                </Button>
                            )}
                            {page.data.website && (
                                <Button asChild size="icon" variant="outline" className="h-8 w-8">
                                    <a href={page.data.website} target="_blank" rel="noreferrer">
                                        <Globe className="size-4" />
                                    </a>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {page.data.bio && (
                    <p className="text-lg text-muted-foreground leading-relaxed mb-10 pb-10 border-b">
                        {page.data.bio}
                    </p>
                )}

                <article className="prose prose-neutral dark:prose-invert max-w-none">
                    <MDX components={mdxComponents} />
                </article>
            </main>

            <SiteFooter />
        </div>
    );
}
