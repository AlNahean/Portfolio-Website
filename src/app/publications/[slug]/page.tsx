import { notFound } from "next/navigation";
import { publicationSource } from "@/lib/source";
import { mdxComponents } from "@/mdx-components";
import { DocsCopyPage } from "@/components/docs-copy-page";
import { DocsDesktopTOC, DocsMobileTOC } from "@/components/docs-toc";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DocsSidebar } from "@/components/docs-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { absoluteUrl } from "@/lib/utils";

export async function generateStaticParams() {
    return publicationSource.generateParams().map((page) => ({
        slug: page.slug[0],
    }));
}

export default async function PublicationPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const resolvedParams = await params;
    const page = publicationSource.getPage([resolvedParams.slug]);

    if (!page) notFound();

    const MDX = page.data.body;

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <SiteHeader />
            <div className="container-wrapper flex flex-1 flex-col px-2">
                <SidebarProvider className="3xl:fixed:container 3xl:fixed:px-3 min-h-min flex-1 items-start px-0 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[280px_1fr_280px]">

                    {/* Sidebar listing all publications */}
                    <DocsSidebar tree={publicationSource.pageTree} />

                    {/* Main Content */}
                    <main className="flex min-w-0 flex-1 flex-col px-4 py-10 lg:py-16 max-w-3xl mx-auto w-full">
                        {page.data.toc?.length ? <DocsMobileTOC toc={page.data.toc} /> : null}

                        <div className="flex flex-col gap-4 mb-8">
                            <h1 className="text-4xl font-bold tracking-tight">{page.data.fullTitle ?? page.data.title}</h1>
                            {page.data.authors && (
                                <p className="text-muted-foreground font-medium">{page.data.authors}</p>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                                <DocsCopyPage
                                    page={page?.data?.content ?? ""}
                                    url={absoluteUrl(page.url)}
                                />
                            </div>
                        </div>

                        <article className="prose prose-neutral dark:prose-invert max-w-none">
                            <MDX components={mdxComponents} />
                        </article>
                    </main>

                    {/* Desktop TOC */}
                    <div className="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[calc(100svh-var(--header-height)+2rem)] w-72 flex-col gap-4 overflow-hidden xl:flex pt-16">
                        {page.data.toc?.length ? (
                            <div className="no-scrollbar overflow-y-auto px-8">
                                <DocsDesktopTOC toc={page.data.toc} />
                            </div>
                        ) : null}
                    </div>
                </SidebarProvider>
            </div>
            <SiteFooter />
        </div>
    );
}