"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <header className="bg-background/80 backdrop-blur-md sticky top-0 z-50 w-full border-b px-6">
                <div className="flex h-14 items-center gap-2">
                    <Button asChild variant="ghost" size="icon" className="size-8">
                        <Link href="/">
                            <Icons.logo className="size-5" />
                            <span className="sr-only">Home</span>
                        </Link>
                    </Button>
                </div>
            </header>
            <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
                <h1 className="font-heading text-9xl font-bold text-muted-foreground/20">500</h1>
                <h2 className="text-3xl font-bold tracking-tight mt-4">Something went wrong!</h2>
                <p className="text-muted-foreground mt-4 max-w-md">
                    An unexpected error occurred. We apologize for the inconvenience.
                </p>
                <div className="mt-8 flex gap-4">
                    <Button onClick={() => reset()} size="lg">
                        Try again
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/">Return Home</Link>
                    </Button>
                </div>
            </main>
            <footer className="border-t py-6 md:py-8">
                <div className="container flex flex-col items-center justify-center text-center">
                    <p className="text-xs text-muted-foreground">
                        An unexpected error occurred.
                    </p>
                </div>
            </footer>
        </div>
    );
}
