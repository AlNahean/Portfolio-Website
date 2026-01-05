import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/lib/config"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export function GitHubLink() {
    const repoPath = new URL(siteConfig.author.links.github).pathname;
    return (
        <Button asChild size="sm" variant="ghost" className="h-8 shadow-none">
            <Link href={siteConfig.author.links.github} target="_blank" rel="noreferrer">
                <Icons.gitHub />
                <React.Suspense fallback={<Skeleton className="h-4 w-8" />}>
                    <StarsCount repo={repoPath} />
                </React.Suspense>
            </Link>
        </Button>
    )
}

export async function StarsCount({ repo }: { repo: string }) {
    try {
        const data = await fetch(`https://api.github.com/repos${repo}`, {
            next: { revalidate: 86400 }, // Cache for 1 day
        })

        if (!data.ok) {
            return null;
        }

        const json = await data.json()
        const stars = json.stargazers_count;

        if (typeof stars !== 'number') {
            return null;
        }

        return (
            <span className="text-muted-foreground w-8 text-xs tabular-nums">
                {stars >= 1000
                    ? `${(stars / 1000).toFixed(1)}k`
                    : stars.toLocaleString()}
            </span>
        )
    } catch (error) {
        console.error("Failed to fetch GitHub stars:", error);
        return null;
    }
}