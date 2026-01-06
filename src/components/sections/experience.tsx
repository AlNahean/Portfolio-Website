const EXPERIENCE = [
    {
        company: "Tech Solutions Inc.",
        role: "Frontend Developer",
        date: "2023 - Present",
        description: "Spearheaded the migration of legacy UI to Next.js 14, improving LCP by 40%. Developed reusable component libraries used across 5 internal products.",
    },
    {
        company: "Freelance",
        role: "Full Stack Developer",
        date: "2021 - 2023",
        description: "Delivered 10+ custom web solutions for SMBs. Integrated payment gateways (Stripe), headless CMS solutions, and complex backend logic.",
    },
];

export function ExperienceSection() {
    return (
        <section className="py-24 bg-muted/30 border-y">
            <div className="container max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="font-heading text-3xl font-bold tracking-tight">Professional Journey</h2>
                </div>

                <div className="space-y-12">
                    {EXPERIENCE.map((item, index) => (
                        <div key={index} className="relative pl-8 md:pl-0">
                            <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-border -translate-x-1/2"></div>

                            <div className={`md:flex items-center justify-between gap-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                <div className="hidden md:block w-1/2 text-center md:text-left mb-4 md:mb-0">
                                    <div className={`inline-block px-4 py-1.5 rounded-full border bg-background text-sm font-medium ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>
                                        {item.date}
                                    </div>
                                </div>

                                <div className="absolute left-0 md:left-[50%] top-0 md:top-1/2 -translate-y-1/2 -translate-x-[5px] md:-translate-x-1/2 h-3 w-3 rounded-full border-2 border-primary bg-background z-10"></div>

                                <div className="md:w-1/2">
                                    <div className="bg-card border rounded-xl p-6 shadow-sm">
                                        <div className="flex justify-between items-start mb-2 md:hidden">
                                            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">{item.date}</span>
                                        </div>
                                        <h3 className="font-bold text-xl">{item.role}</h3>
                                        <p className="text-primary font-medium mb-3">{item.company}</p>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
