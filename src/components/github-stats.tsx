import Link from "next/link";
import { Github, CheckCircle2, GitCommit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGitHubStats } from "@/lib/github";
import { siteConfig } from "@/lib/config";

// Helper to format "Just now", "2 hours ago", etc.
function timeAgo(dateString: string | null) {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
}

export async function GithubStatsSection() {
    const stats = await getGitHubStats();
    const lastActive = timeAgo(stats.lastPush);

    return (
        <section className="py-24 container">
            <div className="rounded-3xl border bg-zinc-950 text-white p-8 md:p-12 overflow-hidden relative">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>

                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Side: Text */}
                    <div>
                        <div className="inline-flex items-center gap-2 text-blue-400 mb-4 font-medium">
                            <Github className="size-5" />
                            <span>Open Source</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                            Contributing to the community one commit at a time.
                        </h2>
                        <p className="text-zinc-400 mb-8 max-w-md">
                            I believe in open software. My contributions range from bug fixes in
                            popular UI libraries to maintaining my own starter templates.
                        </p>
                        <Button
                            className="bg-white text-black hover:bg-zinc-200 rounded-full px-8 h-12 font-semibold"
                            asChild
                        >
                            <Link href={siteConfig.author.links.github} target="_blank">
                                Explore Repositories
                            </Link>
                        </Button>
                    </div>

                    {/* Right Side: Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Repo Count */}
                        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 backdrop-blur-sm">
                            <div className="text-4xl font-bold mb-1">{stats.repos}+</div>
                            <div className="text-sm text-zinc-500">Public Repos</div>
                        </div>

                        {/* Contribution Count */}
                        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 backdrop-blur-sm">
                            <div className="text-4xl font-bold mb-1">{stats.contributions}+</div>
                            <div className="text-sm text-zinc-500">Contributions (Year)</div>
                        </div>

                        {/* Latest Commit Status */}
                        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 backdrop-blur-sm col-span-2 group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="size-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 relative">
                                    <CheckCircle2 className="size-5 relative z-10" />
                                    <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                                </div>
                                <div>
                                    <div className="font-bold flex items-center gap-2">
                                        Latest Commit
                                        <GitCommit className="size-4 text-zinc-500" />
                                    </div>
                                    <div className="text-xs text-zinc-400 font-mono mt-0.5">
                                        {lastActive}
                                    </div>
                                </div>
                            </div>

                            {/* Animated Progress Bar */}
                            <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[85%] animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}