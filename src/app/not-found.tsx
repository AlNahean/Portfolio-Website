import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <SiteHeader />
            <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
                <h1 className="font-heading text-9xl font-bold text-muted-foreground/20">404</h1>
                <h2 className="text-3xl font-bold tracking-tight mt-4">Page not found</h2>
                <p className="text-muted-foreground mt-4 max-w-md">
                    Sorry, we couldn't find the page you're looking for. It might have been removed or renamed.
                </p>
                <Button asChild size="lg" className="mt-8">
                    <Link href="/">Return Home</Link>
                </Button>
            </main>
            <SiteFooter />
        </div>
    );
}