import { notFound } from "next/navigation";
import { blogSource } from "@/lib/source";
import { mdxComponents } from "@/mdx-components";
import Link from "next/link";
import Image from "next/image";
import { findNeighbour } from "fumadocs-core/server";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";

import { absoluteUrl, cn } from "@/lib/utils";
import { DocsCopyPage } from "@/components/docs-copy-page";
import { DocsDesktopTOC, DocsMobileTOC } from "@/components/docs-toc";
import { Button } from "@/components/ui/button";
import { OpenAuthorsProfileCta } from "@/components/open-authors-profile-cta";
import { Separator } from "@/components/ui/separator";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export async function generateStaticParams() {
    return blogSource.generateParams();
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug?: string[] }>;
}) {
    const resolvedParams = await params;
    const page = blogSource.getPage(resolvedParams.slug);

    if (!page) {
        notFound();
    }

    const MDX = page.data.body;
    const neighbours = await findNeighbour(blogSource.pageTree, page.url);

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <SiteHeader />

            <div
                data-slot="docs"
                className="container-wrapper flex-1 items-stretch text-[1.05rem] sm:text-[15px] xl:w-full"
            >
                <div className="3xl:fixed:container 3xl:fixed:px-3 grid grid-cols-1 gap-10 min-h-min flex-1 items-start lg:grid-cols-[minmax(0,1fr)_280px] px-4 md:px-8 py-8">

                    {/* Main Content Column */}
                    <div className="flex min-w-0 flex-1 flex-col">
                        {page.data.toc?.length ? <DocsMobileTOC toc={page.data.toc} /> : null}

                        <div className="mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-8">

                            {/* Blog Header (Title, Meta, Image) */}
                            <div className="flex flex-col gap-6">
                                <div className="space-y-4">
                                    <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                                        <ArrowLeft className="mr-2 size-4" /> Back to blog
                                    </Link>
                                    <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance">
                                        {page.data.title}
                                    </h1>

                                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <div className="size-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />
                                            <span className="font-medium text-foreground">{page.data.author}</span>
                                        </div>
                                        <Separator orientation="vertical" className="h-4" />
                                        <div className="flex items-center gap-2">
                                            <Calendar className="size-4" />
                                            <span>{new Date(page.data.date ?? "").toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {page.data.image && (
                                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border bg-muted">
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

                            {/* MDX Content */}
                            <div className="w-full flex-1 prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-m-28 prose-img:rounded-xl">
                                <MDX components={mdxComponents} />
                            </div>

                            {/* Bottom Navigation & Copy */}
                            <div className="flex items-center justify-between border-t pt-8 mt-8">
                                <DocsCopyPage
                                    page={page?.data?.content ?? "failed to get content"}
                                    url={absoluteUrl(page.url)}
                                />
                            </div>

                            {/* Neighbours Navigation */}
                            <div className="grid grid-cols-2 gap-4 pb-12">
                                {neighbours.previous ? (
                                    <Button
                                        variant="outline"
                                        className="h-auto flex-col items-start gap-1 p-4 whitespace-normal text-left"
                                        asChild
                                    >
                                        <Link href={neighbours.previous.url}>
                                            <span className="text-muted-foreground text-xs flex items-center gap-1">
                                                <ArrowLeft className="size-3" /> Previous
                                            </span>
                                            <span className="font-medium">{neighbours.previous.name}</span>
                                        </Link>
                                    </Button>
                                ) : <div />}

                                {neighbours.next && (
                                    <Button
                                        variant="outline"
                                        className="h-auto flex-col items-end gap-1 p-4 whitespace-normal text-right"
                                        asChild
                                    >
                                        <Link href={neighbours.next.url}>
                                            <span className="text-muted-foreground text-xs flex items-center gap-1">
                                                Next <ArrowRight className="size-3" />
                                            </span>
                                            <span className="font-medium">{neighbours.next.name}</span>
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar (TOC + CTA) - Hidden on mobile, visible on LG+ */}
                    <div className="sticky top-[calc(var(--header-height)+2rem)] hidden h-[calc(100svh-var(--header-height)-4rem)] flex-col gap-8 overflow-y-auto pb-8 lg:flex">
                        {page.data.toc?.length ? (
                            <div className="flex flex-col gap-4">
                                <span className="font-semibold text-sm">On This Page</span>
                                <DocsDesktopTOC toc={page.data.toc} className="p-0 !pt-0" />
                            </div>
                        ) : null}

                        <Separator />

                        <div className="flex flex-col gap-4">
                            <OpenAuthorsProfileCta />
                        </div>
                    </div>

                </div>
            </div>
            <SiteFooter />
        </div>
    );
}