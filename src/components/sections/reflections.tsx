import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { reflectionSource } from "@/lib/source";
import { ReflectionCard } from "@/components/reflection-card";

export function ReflectionsSection() {
    // Sort and get top 3
    const notes = [...reflectionSource.getPages()]
        .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
        .slice(0, 3);

    return (
        <section id="reflections" className="py-32 bg-background border-y border-border">
            <div className="container-wrapper 3xl:fixed:px-0 px-6">
                <div className="3xl:fixed:container max-w-8xl mx-auto">
                    
                    {/* Header Area */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                        <div className="space-y-4">
                            <div className="inline-flex items-center text-[10px] font-black tracking-widest uppercase text-muted-foreground border border-border rounded-full px-3 py-1">
                                # Personal Thoughts
                            </div>
                            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                                Reflections & Life Notes
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl">
                                Personal musings on bioinformatics, philosophy, and the journey of a lifelong learner in the age of rapid technological shifts.
                            </p>
                        </div>
                        <Button variant="outline" className="rounded-full px-6 border-border text-foreground hover:bg-muted transition-colors bg-transparent" asChild>
                            <Link href="/reflections">
                                View All Notes <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <ReflectionCard key={note.url} note={note} />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
