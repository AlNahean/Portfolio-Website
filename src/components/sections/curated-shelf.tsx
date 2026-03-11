import { BookOpenText, ArrowRight } from "lucide-react";
import Link from "next/link";

// src/components/sections/curated-shelf.tsx

export function CuratedShelf() {
    const books = Array.from({ length: 31 }, (_, i) => ({ id: i }));

    return (
        <section className="py-20 container-wrapper 3xl:fixed:px-0 px-6 ">
            <div className="3xl:fixed:container max-w-8xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                            <div className="p-1.5 bg-white text-black rounded-sm">
                                <BookOpenText className="size-4" />
                            </div>
                            Nahean's curated shelf
                        </h2>
                        <p className="text-muted-foreground font-mono text-[11px] uppercase tracking-wide">
                            A selection of foundational books that shaped my perspective.
                        </p>
                    </div>
                    <div className="text-[10px] font-black font-mono tracking-widest text-zinc-500 uppercase border border-zinc-800 px-3 py-1 bg-zinc-900/50">
                        32 total influences
                    </div>
                </div>

                {/* Grid: Increased columns for smaller box size */}
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2">
                    {books.map((book) => (
                        <div
                            key={book.id}
                            className="aspect-[2/3] bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-zinc-500 transition-all cursor-pointer"
                        >
                            <BookOpenText className="size-3 text-zinc-800" />
                        </div>
                    ))}

                    {/* View Full List Card */}
                    <Link
                        href="/books"
                        className="aspect-[2/3] border border-zinc-800 flex flex-col items-center justify-center text-center p-1 hover:border-white hover:bg-white hover:text-black transition-all group"
                    >
                        <span className="text-[8px] font-black uppercase leading-[0.8] tracking-tighter">
                            View<br />Full<br />List
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}