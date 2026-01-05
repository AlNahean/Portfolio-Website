import { DocsSidebar } from "@/components/docs-sidebar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { studySource } from "@/lib/source"; // Import the new source

export default function StudyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-background">
            <SiteHeader />
            <div className="container-wrapper flex flex-1 flex-col px-2">
                <SidebarProvider className="3xl:fixed:container 3xl:fixed:px-3 min-h-min flex-1 items-start px-0 lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
                    {/* Pass the study page tree to the sidebar */}
                    <DocsSidebar tree={studySource.pageTree} />
                    {children}
                </SidebarProvider>
            </div>
            <SiteFooter />
        </div>
    );
}
