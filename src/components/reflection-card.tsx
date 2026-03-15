import Link from "next/link";
import { Send } from "lucide-react";

// Helper to determine the category color
function getCategoryColor(category: string) {
    switch (category.toLowerCase()) {
        case "philosophy": return "text-blue-500";
        case "mentorship": return "text-purple-500";
        case "daily life": return "text-orange-500";
        default: return "text-primary";
    }
}

// Format date to "MARCH 2026"
function formatMonthYear(dateString: string | Date) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" }).toUpperCase();
}

export function ReflectionCard({ note }: { note: any }) {
    return (
        <Link href={note.url} className="group flex flex-col justify-between rounded-3xl border border-border/50 bg-card p-8 hover:border-primary/20 hover:shadow-md transition-all h-full min-h-[320px]">
            
            <div>
                {/* Top Row: Category & Read Time */}
                <div className="flex justify-between items-center text-[10px] font-black tracking-widest uppercase mb-8">
                    <span className={getCategoryColor(note.data.category)}>
                        {note.data.category}
                    </span>
                    <span className="text-muted-foreground">
                        {note.data.readTime}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                    {note.data.title}
                </h3>

                {/* Quote / Description */}
                <p className="text-muted-foreground italic text-sm leading-relaxed">
                    "{note.data.description}"
                </p>
            </div>

            {/* Bottom Row: Date & Icon */}
            <div className="flex justify-between items-end mt-12">
                <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground/60 tracking-widest">
                    <div className="w-6 h-[1px] bg-border" />
                    {formatMonthYear(note.data.date)}
                </div>
                <div className="size-10 rounded-full border border-border bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-foreground group-hover:text-background transition-all duration-300 group-hover:-rotate-12">
                    <Send className="size-4" />
                </div>
            </div>
            
        </Link>
    );
}
