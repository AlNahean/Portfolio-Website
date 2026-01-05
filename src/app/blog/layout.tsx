import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-background min-h-screen flex flex-col">
            <SiteHeader />
            <main className="flex-1">
                {children}
            </main>
            <SiteFooter />
        </div>
    );
}
