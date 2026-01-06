import Link from "next/link";
import Image from "next/image";
import { blogSource } from "@/lib/source";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Resources and Insights",
    description: "The latest industry news, interviews, technologies, and resources.",
};

export default function BlogPage() {
    const posts = [...blogSource.getPages()].sort(
        (a, b) =>
            new Date(b.data.date ?? 0).getTime() - new Date(a.data.date ?? 0).getTime()
    );

    const heroPost = posts[0];
    const recentPosts = posts.slice(1);

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <SiteHeader />
            <main className="flex-1 container py-12">
                {/* Header */}
                <div className="mb-12 space-y-4">
                    <p className="text-sm font-medium text-muted-foreground">Blog</p>
                    <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
                        Resources and insights
                    </h1>
                    <p className="text-muted-foreground max-w-2xl text-lg">
                        The latest industry news, interviews, technologies, and resources.
                    </p>
                </div>

                {/* Hero Section */}
                {heroPost && (
                    <Link href={heroPost.url} className="group block relative mb-16">
                        <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl border bg-muted">
                            {heroPost.data.image && (
                                <Image
                                    src={heroPost.data.image}
                                    alt={heroPost.data.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white">
                                <div className="mb-4 flex gap-2">
                                    {heroPost.data.tags?.map(tag => (
                                        <Badge key={tag} variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">{tag}</Badge>
                                    ))}
                                </div>
                                <h2 className="mb-4 text-3xl font-bold leading-tight md:text-4xl text-balance">
                                    {heroPost.data.title}
                                </h2>
                                <p className="max-w-2xl text-lg text-white/80 line-clamp-2">
                                    {heroPost.data.description}
                                </p>
                                <div className="mt-6 flex items-center gap-4 text-sm font-medium text-white/70">
                                    <span>{heroPost.data.author}</span>
                                    <span>•</span>
                                    <span>{new Date(heroPost.data.date ?? "").toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                )}

                {/* Filter Bar (Static for visuals) */}
                <div className="mb-10 flex flex-wrap items-center gap-2 border-b pb-4">
                    <Button variant="link" className="text-foreground font-bold px-0 underline decoration-2 underline-offset-8 decoration-primary">View all</Button>
                    <Button variant="ghost" className="text-muted-foreground">Design</Button>
                    <Button variant="ghost" className="text-muted-foreground">Product</Button>
                    <Button variant="ghost" className="text-muted-foreground">Software Engineering</Button>
                    <Button variant="ghost" className="text-muted-foreground">Customer Success</Button>
                </div>

                {/* Posts Grid */}
                <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                    {recentPosts.map((post) => (
                        <Link key={post.url} href={post.url} className="group flex flex-col gap-4">
                            <div className="relative aspect-video overflow-hidden rounded-lg bg-muted border">
                                {post.data.image && (
                                    <Image
                                        src={post.data.image}
                                        alt={post.data.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                )}
                            </div>
                            <div className="space-y-2">
                                <div className="flex gap-2">
                                    <span className="text-xs font-semibold text-primary">
                                        {post.data.tags?.[0] || "Blog"}
                                    </span>
                                    <span className="text-xs text-muted-foreground">8 min read</span>
                                </div>
                                <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                                    {post.data.title}
                                </h3>
                                <p className="text-muted-foreground line-clamp-2 text-sm">
                                    {post.data.description}
                                </p>
                                <div className="flex items-center gap-3 pt-2">
                                    <div className="size-8 rounded-full bg-muted overflow-hidden">
                                        {/* Placeholder avatar */}
                                        <div className="size-full bg-gradient-to-br from-primary/20 to-primary/50" />
                                    </div>
                                    <div className="text-xs">
                                        <p className="font-medium text-foreground">{post.data.author}</p>
                                        <p className="text-muted-foreground">{new Date(post.data.date ?? "").toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination (Visual) */}
                <div className="mt-20 flex justify-between border-t pt-6">
                    <Button variant="ghost" disabled className="text-muted-foreground">
                        ← Previous
                    </Button>
                    <div className="flex gap-1">
                        <Button variant="outline" size="icon" className="bg-primary text-primary-foreground border-primary">1</Button>
                        <Button variant="ghost" size="icon">2</Button>
                        <Button variant="ghost" size="icon">3</Button>
                        <span className="flex items-end px-2">...</span>
                        <Button variant="ghost" size="icon">8</Button>
                    </div>
                    <Button variant="ghost">
                        Next →
                    </Button>
                </div>
            </main>
            <SiteFooter />
        </div>
    );
}
