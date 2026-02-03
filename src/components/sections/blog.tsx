import Link from "next/link";
import Image from "next/image";
import { blogSource } from "@/lib/source";

export function BlogSection() {
    const posts = [...blogSource.getPages()]
        .sort(
            (a, b) =>
                new Date(b.data.date ?? 0).getTime() - new Date(a.data.date ?? 0).getTime()
        )
        .slice(0, 3); // Take the latest 3 posts

    return (
        <section className="py-32 bg-background">
            <div className="container px-4 md:px-6">
                {/* Centered Header */}
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    <span className="text-primary font-medium text-sm tracking-widest uppercase">
                        Blog
                    </span>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance max-w-4xl">
                        I like sharing my experiments <span className="text-muted-foreground">&&</span> knowledge with others
                    </h2>
                </div>

                {/* Blog Grid */}
                <div className="grid gap-8 md:grid-cols-3">
                    {posts.map((post) => (
                        <Link
                            key={post.url}
                            href={post.url}
                            className="group flex flex-col bg-card border rounded-3xl p-2 transition-all duration-300 hover:shadow-lg hover:border-primary/20"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-muted">
                                {post.data.image ? (
                                    <Image
                                        src={post.data.image}
                                        alt={post.data.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center bg-secondary/30">
                                        <span className="text-muted-foreground text-sm font-medium">No Image</span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex flex-col gap-3 p-5 pt-6">
                                <h3 className="font-heading text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                                    {post.data.title}
                                </h3>

                                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                                    {post.data.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}