import { DocsSidebar } from "@/components/docs-sidebar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ragSource } from "@/lib/source";

export default function RagLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-background">
            <SiteHeader />
            <div className="container-wrapper flex flex-1 flex-col px-2">
                <SidebarProvider className="3xl:fixed:container 3xl:fixed:px-3 min-h-min flex-1 items-start px-0 [--sidebar-width:220px] [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--sidebar-width:240px] lg:[--top-spacing:calc(var(--spacing)*4)]">
                    <DocsSidebar tree={ragSource.pageTree} />
                    {children}
                </SidebarProvider>
            </div>
            <SiteFooter />
        </div>
    );
}
