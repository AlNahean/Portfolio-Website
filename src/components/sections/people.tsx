import { User, Linkedin, Twitter, Globe, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authorSource } from "@/lib/source";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function PeopleSection() {
    const authors = authorSource.getPages();

    if (!authors || authors.length === 0) {
        return null;
    }

    return (
        <section className="py-24 container px-4">
            <div className="mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-2">People</h2>
                <p className="text-muted-foreground text-sm max-w-lg">
                    Collaborators, mentors, and brilliant researchers I've had the pleasure of working with or learning from.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {authors.map((person) => (
                    <div key={person.url} className="bg-card border rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-6 mb-6">
                            <Link href={person.url} className="shrink-0 transition-transform hover:scale-105">
                                {person.data.avatar ? (
                                    <Image
                                        src={person.data.avatar}
                                        alt={person.data.title}
                                        width={96}
                                        height={96}
                                        className="size-24 rounded-2xl object-cover border border-border bg-muted shadow-sm"
                                    />
                                ) : (
                                    <div className="size-24 rounded-2xl bg-muted border border-border flex items-center justify-center">
                                        <User className="size-10 text-muted-foreground/50" />
                                    </div>
                                )}
                            </Link>
                            <div className="space-y-2 pt-1 min-w-0">
                                <Link href={person.url} className="hover:text-primary transition-colors">
                                    <h3 className="text-xl font-bold leading-none truncate">{person.data.title}</h3>
                                </Link>
                                {person.data.role && (
                                    <p className="text-[10px] font-black tracking-wider uppercase text-muted-foreground truncate">
                                        {person.data.role}
                                    </p>
                                )}
                                {person.data.github && (
                                    <div className="inline-block border border-border/60 bg-muted/30 text-muted-foreground text-[10px] px-2 py-0.5 rounded-md font-mono mt-1">
                                        Verified Contributor
                                    </div>
                                )}
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground italic mb-8 flex-1 line-clamp-3">
                            {person.data.bio ? `"${person.data.bio}"` : "Active collaborator and researcher in the web and bioinformatics space."}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                {person.data.linkedin && (
                                    <a href={person.data.linkedin} target="_blank" rel="noreferrer" className="size-9 rounded-xl border bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all">
                                        <Linkedin className="size-4" />
                                    </a>
                                )}
                                {person.data.twitter && (
                                    <a href={`https://twitter.com/${person.data.twitter.replace('@', '')}`} target="_blank" rel="noreferrer" className="size-9 rounded-xl border bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all">
                                        <Twitter className="size-4" />
                                    </a>
                                )}
                                {person.data.github && (
                                    <a href={person.data.github} target="_blank" rel="noreferrer" className="size-9 rounded-xl border bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all">
                                        <Github className="size-4" />
                                    </a>
                                )}
                                {person.data.website && (
                                    <a href={person.data.website} target="_blank" rel="noreferrer" className="size-9 rounded-xl border bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all">
                                        <Globe className="size-4" />
                                    </a>
                                )}
                            </div>
                            <Button variant="secondary" asChild className="rounded-full bg-zinc-800 text-white hover:bg-zinc-700 border-zinc-700 h-9 px-5 text-xs font-semibold">
                                <Link href={person.url}>
                                    View Profile
                                </Link>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}