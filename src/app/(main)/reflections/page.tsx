import { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ReflectionCard } from "@/components/reflection-card";
import { reflectionSource } from "@/lib/source";

export const metadata: Metadata = {
    title: "Reflections & Life Notes | Al Nahean",
    description: "Personal musings on tech, science, and life.",
};

export default function ReflectionsPage() {
    const notes = [...reflectionSource.getPages()].sort(
        (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    );

    return (
        <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-white">
            <SiteHeader />
            <main className="flex-1 container max-w-7xl py-16 md:py-24">
                <div className="mb-16">
                    <div className="inline-flex items-center text-[10px] font-black tracking-widest uppercase text-zinc-400 border border-zinc-800 rounded-full px-3 py-1 mb-4">
                        # Personal Thoughts
                    </div>
                    <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Reflections & Life Notes
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-3xl">
                        A collection of thoughts, observations, and essays written during my journey through technology and bioinformatics.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.map((note) => (
                        <ReflectionCard key={note.url} note={note} />
                    ))}
                </div>
            </main>
            <SiteFooter />
        </div>
    );
}
