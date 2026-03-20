import { notFound } from "next/navigation";
import { ragSource } from "@/lib/source";
import { mdxComponents } from "@/mdx-components";
import Link from "next/link";
import { findNeighbour } from "fumadocs-core/server";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { absoluteUrl } from "@/lib/utils";
import { DocsCopyPage } from "@/components/docs-copy-page";
import { DocsDesktopTOC, DocsMobileTOC } from "@/components/docs-toc";
import { Button } from "@/components/ui/button";
import { OpenAuthorsProfileCta } from "@/components/open-authors-profile-cta";

export default async function RagIndexPage() {
    const page = await ragSource.getPage([]);

    if (!page) {
        notFound();
    }

    const MDX = page.data.body;
    const neighbours = await findNeighbour(ragSource.pageTree, page.url);

    return (
        <main
            data-slot="docs"
            className="flex items-stretch text-[1.05rem] sm:text-[15px] xl:w-full"
        >
            <div className="flex min-w-0 flex-1 flex-col">
                {page.data.toc?.length ? <DocsMobileTOC toc={page.data.toc} /> : null}
                <div className="h-(--top-spacing) shrink-0" />
                <div className="mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-10 px-4 py-10 text-neutral-800 md:px-0 lg:py-16 dark:text-neutral-300">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-start justify-between">
                                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight sm:text-4xl xl:text-5xl">
                                    {page.data.title}
                                </h1>
                                <div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
                                    <DocsCopyPage
                                        page={page?.data?.content ?? "failed to get content"}
                                        url={absoluteUrl(page.url)}
                                    />
                                    {neighbours.next && (
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="size-8 shadow-sm md:size-8"
                                            asChild
                                        >
                                            <Link href={neighbours.next.url}>
                                                <span className="sr-only">Next</span>
                                                <ArrowRight className="size-4" />
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </div>
                            {page.data.description && (
                                <p className="text-muted-foreground mt-4 text-[1.1rem] leading-relaxed text-balance">
                                    {page.data.description}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="w-full flex-1 *:data-[slot=alert]:first:mt-0 prose dark:prose-invert max-w-none">
                        <MDX components={mdxComponents} />
                    </div>
                </div>
                <div className="mx-auto hidden h-24 w-full max-w-3xl items-center gap-4 px-4 sm:flex md:px-0 border-t border-border/40 mt-12 mb-8">
                    {neighbours.next && (
                        <div className="ml-auto flex flex-col items-end gap-1 text-right">
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold px-2">Next Page</span>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-10 px-4 rounded-xl shadow-none hover:bg-muted"
                                asChild
                            >
                                <Link href={neighbours.next.url}>
                                    {neighbours.next.name} <ArrowRight className="size-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <div className="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[calc(100svh-var(--header-height)+2rem)] w-72 flex-col gap-4 overflow-hidden overscroll-none pb-8 xl:flex">
                <div className="h-(--top-spacing) shrink-0" />
                {page.data.toc?.length ? (
                    <div className="no-scrollbar overflow-y-auto px-8">
                        <DocsDesktopTOC toc={page.data.toc} />
                        <div className="h-12" />
                    </div>
                ) : null}
                <div className="flex flex-1 flex-col gap-12 px-6">
                    <OpenAuthorsProfileCta />
                </div>
            </div>
        </main>
    );
}
