import { User, Linkedin, Twitter, Globe, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const PEOPLE = [
    // {
    //     name: "Ayyüce Demirbaş",
    //     role: "PH.D. STUDENT & RESEARCH ASSISTANT",
    //     tag: "Computer Science and Engineering",
    //     bio: "\"Research focuses on graph-based multi-omics integration and drug discovery.\""
    // },
    {
        name: "Al-Nahean",
        role: "SOFTWARE DEVELOPER & RESEARCHER",
        tag: "National University, Bangladesh",
        bio: "\"Lead developer for current portfolio projects and bioinformatics tool development.\""
    }
];

export function PeopleSection() {
    return (
        <section className="py-24 container px-4">
            <div className="mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-2">People</h2>
                <p className="text-muted-foreground text-sm max-w-lg">
                    Collaborators, mentors, and brilliant researchers I've had the pleasure of working with or learning from.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PEOPLE.map((person, i) => (
                    <div key={i} className="bg-card border rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-6 mb-6">
                            <div className="size-24 rounded-2xl bg-muted border flex items-center justify-center shrink-0">
                                <User className="size-10 text-muted-foreground/50" />
                            </div>
                            <div className="space-y-2 pt-1">
                                <h3 className="text-xl font-bold leading-none">{person.name}</h3>
                                <p className="text-[10px] font-black tracking-wider uppercase text-muted-foreground">
                                    {person.role}
                                </p>
                                <div className="inline-block border border-border/60 bg-muted/30 text-muted-foreground text-[10px] px-2 py-0.5 rounded-md font-mono mt-1">
                                    {person.tag}
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground italic mb-8 flex-1">
                            {person.bio}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <button className="size-9 rounded-xl border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                                    <Linkedin className="size-4" />
                                </button>
                                <button className="size-9 rounded-xl border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                                    <Twitter className="size-4" />
                                </button>
                                <button className="size-9 rounded-xl border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                                    <Globe className="size-4" />
                                </button>
                            </div>
                            <Button variant="secondary" className="rounded-full bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white border-zinc-700 h-9 px-5 text-xs font-semibold">
                                <MessageSquare className="size-3.5 mr-2" /> Message
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
