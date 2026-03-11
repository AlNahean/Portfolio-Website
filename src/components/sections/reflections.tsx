import { ArrowUpRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const NOTES = [
    {
        category: "PHILOSOPHY",
        categoryColor: "text-blue-400",
        readTime: "5 MIN READ",
        title: "Navigating the Biological Complexity",
        excerpt: "\"Biological systems are the ultimate high-dimensional problem. Bioinformatics isn't just about parsing sequences; it's about structural thinking in the face of immense entropy.\"",
        date: "MARCH 2026"
    },
    {
        category: "MENTORSHIP",
        categoryColor: "text-purple-400",
        readTime: "8 MIN READ",
        title: "The Human Element in High-Tech Research",
        excerpt: "\"Collaborating with researchers across the globe taught me that language is the only true barrier. Science and code are universal, but intent and shared passion are the real drivers of innovation.\"",
        date: "FEB 2026"
    },
    {
        category: "DAILY LIFE",
        categoryColor: "text-orange-400",
        readTime: "4 MIN READ",
        title: "Life in the Lab and the Terminal",
        excerpt: "\"The constant shift between Pipettes and Python scripts defined my 2025. It's a duality that I've come to embrace as a modern researcher.\"",
        date: "JAN 2026"
    }
];

export function ReflectionsSection() {
    return (
        <section className="py-24 container px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        <span className="text-foreground">#</span> PERSONAL THOUGHTS
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight">Reflections & Life Notes</h2>
                    <p className="text-muted-foreground text-sm max-w-lg leading-relaxed">
                        Personal musings on bioinformatics, philosophy, and the journey of a lifelong learner in the age of rapid technological shifts.
                    </p>
                </div>
                <Button variant="outline" className="rounded-full bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800 text-sm h-10 px-6">
                    View All Notes <ArrowUpRight className="ml-2 size-4" />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {NOTES.map((note, i) => (
                    <div key={i} className="relative bg-card border rounded-[2rem] p-8 flex flex-col h-full overflow-hidden hover:border-primary/30 transition-colors group">
                        {/* Huge background quote mark */}
                        <div className="absolute top-4 right-6 text-9xl font-serif text-muted/20 select-none leading-none pointer-events-none group-hover:text-muted/30 transition-colors">
                            "
                        </div>

                        <div className="flex justify-between items-center mb-6 relative z-10">
                            <span className={`text-[10px] font-bold tracking-widest uppercase border border-border/50 bg-background/50 rounded-full px-3 py-1 ${note.categoryColor}`}>
                                {note.category}
                            </span>
                            <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                {note.readTime}
                            </span>
                        </div>

                        <h3 className="text-2xl font-bold leading-tight mb-4 relative z-10">{note.title}</h3>

                        <p className="text-muted-foreground text-sm italic leading-relaxed flex-1 relative z-10">
                            {note.excerpt}
                        </p>

                        <div className="flex justify-between items-center mt-8 relative z-10">
                            <span className="text-[10px] font-bold tracking-widest text-muted-foreground flex items-center gap-2">
                                <span className="w-4 h-px bg-muted-foreground/30"></span>
                                {note.date}
                            </span>
                            <div className="size-10 rounded-full bg-background border flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all cursor-pointer">
                                <Send className="size-4" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
