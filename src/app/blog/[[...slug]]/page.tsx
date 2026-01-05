import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { blogSource } from "@/lib/source";
import { mdxComponents } from "@/mdx-components";
import { DocsDesktopTOC, DocsMobileTOC } from "@/components/docs-toc";
import { OpenAuthorsProfileCta } from "@/components/open-authors-profile-cta";
import { DocsCopyPage } from "@/components/docs-copy-page";
import { absoluteUrl, cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { CalendarIcon, UserIcon, ArrowLeftIcon } from "lucide-react";
import { Metadata } from "next";

export async function generateStaticParams() {
    return await blogSource.generateParams();
}

export async function generateMetadata(props: {
    params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
    const params = await props.params;
    const page = blogSource.getPage(params.slug);

    if (!page) {
        return {
            title: "Blog",
            description: "Latest updates and articles.",
        };
    }

    return {
        title: page.data.title,
        description: page.data.description,
        openGraph: {
            type: "article",
            title: page.data.title,
            description: page.data.description,
            publishedTime: page.data.date ? new Date(page.data.date).toISOString() : undefined,
            authors: page.data.author ? [page.data.author] : undefined,
            images: page.data.image ? [page.data.image] : undefined,
        },
    };
}

export default async function Page(props: {
    params: Promise<{ slug?: string[] }>;
}) {
    const params = await props.params;

    // --- 1. BLOG INDEX VIEW (No Slug) ---
    if (!params.slug || params.slug.length === 0) {
        const posts = [...blogSource.getPages()].sort((a, b) => {
            if (!a.data.date || !b.data.date) return 0;
            return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
        });

        // Remove the "index" page from the list if it exists in the content folder
        const filteredPosts = posts.filter(post => post.slugs.length > 0 && post.slugs[0] !== 'index');

        return (
            <div className="container max-w-5xl py-12 md:py-24">
                <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
                    <div className="flex-1 space-y-4">
                        <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
                            Blog
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Thoughts, updates, and deep dives into Botany and Web Development.
                        </p>
                    </div>
                </div>
                <hr className="my-8" />
                {filteredPosts.length ? (
                    <div className="grid gap-10 sm:grid-cols-2">
                        {filteredPosts.map((post) => (
                            <Link
                                key={post.url}
                                href={post.url}
                                className="group flex flex-col space-y-3"
                            >
                                {post.data.image && (
                                    <div className="relative aspect-video overflow-hidden rounded-xl border bg-muted transition-colors group-hover:opacity-80">
                                        <Image
                                            src={post.data.image}
                                            alt={post.data.title}
                                            fill
                                            className="object-cover"
                                            priority={false}
                                        />
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold leading-tight tracking-tight group-hover:underline">
                                        {post.data.title}
                                    </h2>
                                    {post.data.description && (
                                        <p className="text-muted-foreground line-clamp-3">
                                            {post.data.description}
                                        </p>
                                    )}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    {post.data.date && (
                                        <div className="flex items-center gap-1">
                                            <CalendarIcon className="size-3" />
                                            <time dateTime={new Date(post.data.date).toISOString()}>
                                                {new Date(post.data.date).toLocaleDateString()}
                                            </time>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p>No posts published yet.</p>
                )}
            </div>
        );
    }

    // --- 2. BLOG POST VIEW (Has Slug) ---
    const page = blogSource.getPage(params.slug);

    if (!page) {
        notFound();
    }

    const MDX = page.data.body;

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: page.data.title,
        description: page.data.description,
        author: page.data.author ? {
            '@type': 'Person',
            name: page.data.author,
        } : undefined,
        datePublished: page.data.date,
        image: page.data.image,
    };

    return (
        <div className="container relative py-10 lg:py-14">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Link
                href="/blog"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute left-[-200px] top-14 hidden xl:inline-flex"
                )}
            >
                <ArrowLeftIcon className="mr-2 size-4" />
                See all posts
            </Link>

            <div className="grid grid-cols-1 gap-10 xl:grid-cols-[1fr_300px]">
                {/* Main Content */}
                <article className="prose dark:prose-invert max-w-none">
                    <div className="space-y-4 mb-8 not-prose">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {page.data.date && (
                                <time dateTime={new Date(page.data.date).toISOString()} className="flex items-center gap-1">
                                    <CalendarIcon className="size-3.5" />
                                    {new Date(page.data.date).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </time>
                            )}
                            {page.data.tags && (
                                <>
                                    <span>•</span>
                                    <div className="flex gap-1">
                                        {page.data.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="rounded-sm px-1 font-normal text-xs">
                                                #{tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        <h1 className="font-heading text-4xl font-bold tracking-tight lg:text-5xl mb-4">
                            {page.data.title}
                        </h1>

                        {page.data.author && (
                            <div className="flex items-center gap-2 text-sm">
                                <div className="flex size-8 items-center justify-center rounded-full bg-muted">
                                    <UserIcon className="size-4" />
                                </div>
                                <span className="font-medium">{page.data.author}</span>
                            </div>
                        )}

                        {page.data.image && (
                            <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted mt-6">
                                <Image
                                    src={page.data.image}
                                    alt={page.data.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}
                    </div>

                    {page.data.toc?.length ? (
                        <div className="block xl:hidden mb-8 not-prose">
                            <DocsMobileTOC toc={page.data.toc} />
                        </div>
                    ) : null}

                    <div className="mdx-content">
                        <MDX components={mdxComponents} />
                    </div>
                </article>

                {/* Sidebar */}
                <div className="hidden xl:block">
                    <div className="sticky top-24 flex flex-col gap-8">
                        {/* Table of Contents */}
                        {page.data.toc && page.data.toc.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                                    On This Page
                                </h3>
                                <DocsDesktopTOC toc={page.data.toc} className="p-0 border-l pl-4" />
                            </div>
                        )}

                        <div className="space-y-4">
                            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                                Actions
                            </h3>
                            <div className="flex flex-col gap-2">
                                <DocsCopyPage
                                    page={page?.data?.content ?? "content not available"}
                                    url={absoluteUrl(page.url)}
                                />
                            </div>
                        </div>

                        {/* CTA / Author Card */}
                        <OpenAuthorsProfileCta />
                    </div>
                </div>
            </div>
        </div>
    );
}
