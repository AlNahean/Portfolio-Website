import Image from "next/image";
import { Metadata } from "next";
import { changelogData } from "@/data/changelog";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

export const metadata: Metadata = {
    title: "Changelog",
    description: "A timeline of latest updates, improvements, and new features.",
};

export default function ChangelogPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <SiteHeader />

            <main className="container max-w-4xl py-16 flex-1">
                {/* Page Header */}
                <div className="mb-16 text-center sm:text-left">
                    <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
                        Changelog
                    </h1>
                    <p className="text-muted-foreground mt-4 text-lg">
                        Track our journey, product updates, and improvements.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative border-l border-muted pl-8 ml-4 md:pl-10 md:ml-5 space-y-20">
                    {changelogData.map((item, index) => (
                        <div key={index} className="relative group">
                            {/* Timeline Dot */}
                            <div className="absolute -left-[41px] md:-left-[49px] top-1.5 h-5 w-5 rounded-full border bg-background flex items-center justify-center group-hover:border-primary transition-colors z-10">
                                <div className="h-2 w-2 rounded-full bg-primary" />
                            </div>

                            <div className="flex flex-col gap-6">

                                {/* Meta: Version & Date */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                    <div className="flex items-center gap-3">
                                        <Badge
                                            variant="outline"
                                            className="text-base py-1 px-3 border-primary/20 bg-primary/5 text-primary"
                                        >
                                            {item.version}
                                        </Badge>
                                        <span className="text-muted-foreground flex items-center gap-1.5 text-sm font-medium">
                                            <Calendar className="size-4" />
                                            {new Date(item.date).toLocaleDateString(undefined, {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold tracking-tight">
                                        {item.title}
                                    </h2>
                                    <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
                                        {item.description}
                                    </p>

                                    {/* Bullet Points */}
                                    {item.changes && item.changes.length > 0 && (
                                        <ul className="list-disc list-outside ml-5 space-y-2 text-muted-foreground/90">
                                            {item.changes.map((change, i) => (
                                                <li key={i} className="pl-1">{change}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                {/* Optional Image Block */}
                                {item.image && (
                                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted shadow-sm mt-2 max-w-3xl">
                                        <Image
                                            src={item.image}
                                            alt={`Preview for ${item.version}`}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}