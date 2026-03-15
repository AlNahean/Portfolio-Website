import { BookOpenText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BOOKS } from "@/data/books";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export function CuratedShelf() {
    return (
        <section className="py-24 container-wrapper 3xl:fixed:px-0 px-6">
            <div className="3xl:fixed:container max-w-8xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3 text-foreground">
                            <div className="p-1.5 bg-foreground text-background rounded-sm shadow-sm">
                                <BookOpenText className="size-4" />
                            </div>
                            Books I've Read
                        </h2>
                        <p className="text-muted-foreground font-mono text-[11px] uppercase tracking-wide">
                            "The novels took me on a book based travel journey to new destinations."
                        </p>
                    </div>
                    <div className="text-[10px] font-black font-mono tracking-widest text-muted-foreground uppercase border border-border px-3 py-1 bg-muted/50 rounded-sm">
                        {BOOKS.length} Books Finished
                    </div>
                </div>

                {/* Grid - Clean, No empty placeholders */}
                <TooltipProvider delayDuration={0}>
                    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-5">
                        {BOOKS.map((book) => (
                            <Tooltip key={book.id}>
                                <TooltipTrigger asChild>
                                    <div className="aspect-[2/3] relative group cursor-pointer overflow-hidden rounded-md border border-border bg-muted/30 shadow-sm transition-all hover:shadow-2xl hover:border-primary/40 hover:-translate-y-1">
                                        <Image
                                            src={book.cover}
                                            alt={book.title}
                                            fill
                                            className="object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                            sizes="(max-width: 768px) 150px, 200px"
                                        />
                                        {/* Subtle overlay for light mode depth */}
                                        <div className="absolute inset-0 bg-foreground/5 dark:bg-transparent group-hover:bg-transparent transition-colors" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent 
                                    side="top" 
                                    className="flex flex-col gap-1 p-3 bg-popover text-popover-foreground border-border shadow-2xl max-w-[220px] animate-in fade-in-0 zoom-in-95"
                                >
                                    <span className="font-bold text-xs uppercase tracking-tight leading-snug">
                                        {book.title}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground italic">
                                        by {book.author}
                                    </span>
                                    <div className="mt-2 pt-2 border-t border-border/50 flex items-center">
                                        <span className="text-[9px] font-black text-primary uppercase tracking-[0.1em]">
                                            Set in: {book.location}
                                        </span>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        ))}

                        {/* View Full List Card */}
                        <Link
                            href="/books"
                            className="aspect-[2/3] border-2 border-dashed border-border flex flex-col items-center justify-center text-center p-4 hover:border-primary hover:bg-primary/5 transition-all group rounded-md bg-muted/10"
                        >
                            <span className="text-[10px] font-black uppercase leading-tight tracking-tighter text-muted-foreground group-hover:text-primary transition-colors">
                                Full<br />Reading<br />List
                            </span>
                        </Link>
                    </div>
                </TooltipProvider>
            </div>
        </section>
    );
}