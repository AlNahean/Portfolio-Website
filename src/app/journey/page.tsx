import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const JOURNEY_ITEMS = [
    {
        year: "2025",
        title: "Just got myself a new Tesla Model Y Juniper",
        description: "Just hit another milestone after buying a house. I'm super excited and totally in love with my very first car. It feels like the culmination of years of hard work.",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop",
        tags: ["Life", "Milestone"],
    },
    {
        year: "2024",
        title: "Promoted to Senior Full-Stack Engineer",
        description: "After leading the migration of our legacy monolith to a microservices architecture, I was promoted to Senior Engineer. Now mentoring three juniors and overseeing the architectural decisions for the core product.",
        tags: ["Career", "Work"],
    },
    {
        year: "2024",
        title: "Launched my first SaaS: 'DevFlow'",
        description: "Spent weekends and nights building a developer productivity tool. Launched on Product Hunt and got #3 Product of the Day. It's now generating steady MRR and helping 500+ devs manage their workflows.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
        tags: ["Project", "SaaS"],
    },
    {
        year: "2023",
        title: "Spoke at React Summit",
        description: "Overcame my fear of public speaking and gave a talk on 'Optimizing Next.js for High Traffic Applications'. Met amazing people and learned so much from the community.",
        image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop",
        tags: ["Speaking", "Community"],
    },
    {
        year: "2023",
        title: "Bought my first House",
        description: "Finally put down roots! It's a fixer-upper, but it has a perfect space for a home office. Let the renovation projects begin.",
        tags: ["Life", "Home"],
    },
    {
        year: "2022",
        title: "Contributed to core shadcn/ui",
        description: "Made my first significant open source contribution. Fixed a complex accessibility bug in the Combobox component. The feeling of seeing my PR merged was unmatched.",
        tags: ["Open Source"],
    },
    {
        year: "2021",
        title: "Graduated University",
        description: "Earned my Bachelor of Science in Computer Science. It was a long road with lots of coffee and late-night coding sessions, but I made lifelong friends.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
        tags: ["Education"],
    },
    {
        year: "2020",
        title: "Hello World",
        description: "Wrote my very first line of JavaScript. I built a simple To-Do app that didn't even save data, but it sparked a curiosity that hasn't faded since.",
        tags: ["Beginning"],
    },
];

export default function JourneyPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <SiteHeader />

            <main className="flex-1 container max-w-4xl py-16 md:py-24">
                <div className="mb-16">
                    <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
                        Journey
                    </h1>
                    <p className="text-muted-foreground mt-4 text-lg">
                        A timeline of my professional career, personal milestones, and the projects I've built along the way.
                    </p>
                </div>

                <div className="relative">
                    {JOURNEY_ITEMS.map((item, index) => (
                        <div key={index} className="group relative pb-12 last:pb-0">
                            {/* Desktop Grid Layout */}
                            <div className="md:grid md:grid-cols-[100px_40px_1fr] md:gap-4">

                                {/* Left Column: Year */}
                                <div className="mb-2 md:mb-0 md:text-right pt-2 md:pt-1">
                                    <span className="font-heading text-xl font-bold tabular-nums tracking-tight">
                                        {item.year}
                                    </span>
                                </div>

                                {/* Middle Column: Timeline Line & Dot */}
                                <div className="absolute left-0 top-0 h-full md:relative md:flex md:justify-center">

                                    {/* Continuous Vertical Line */}
                                    <div
                                        className={cn(
                                            "absolute w-[2px] bg-border left-[5px] md:left-1/2 md:-translate-x-1/2 z-0",
                                            // 1. First Item: Start at dot center, go down through padding
                                            index === 0 && "top-[14px] h-[calc(100%+3rem-14px)] md:top-[16px] md:h-[calc(100%+3rem-16px)]",

                                            // 2. Last Item: Start at top, stop at dot center
                                            index === JOURNEY_ITEMS.length - 1 && "top-0 h-[14px] md:h-[16px]",

                                            // 3. Middle Items: Start at top, go down through padding (connects previous to next)
                                            index !== 0 && index !== JOURNEY_ITEMS.length - 1 && "top-0 h-[calc(100%+3rem)]"
                                        )}
                                    />

                                    {/* The Dot */}
                                    <div className="relative z-10 mt-2 md:mt-2.5 size-3 shrink-0 rounded-full border border-blue-500 bg-blue-500 ring-4 ring-background shadow-sm">
                                        {/* Optional: Add a subtle pulse only for the first item (current status) */}
                                        {index === 0 && (
                                            <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75" />
                                        )}
                                    </div>
                                </div>

                                {/* Right Column: Content */}
                                <div className="pl-8 md:pl-0 pt-1">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-start justify-between gap-4">
                                            <h3 className="text-lg font-semibold leading-tight">
                                                {item.title}
                                            </h3>
                                        </div>

                                        <p className="text-muted-foreground leading-relaxed text-[15px]">
                                            {item.description}
                                        </p>

                                        {item.tags && (
                                            <div className="flex flex-wrap gap-2">
                                                {item.tags.map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        variant="secondary"
                                                        className="text-xs font-normal text-muted-foreground bg-muted/50 hover:bg-muted"
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}

                                        {item.image && (
                                            <div className="mt-2 overflow-hidden rounded-xl border bg-muted shadow-sm">
                                                <div className="relative aspect-[16/9] md:aspect-[2/1]">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}