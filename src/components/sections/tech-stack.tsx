const SKILLS = [
    "React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS",
    "PostgreSQL", "Prisma", "Redux", "Docker", "AWS", "Git"
];

export function TechStackSection() {
    return (
        <section className="border-b bg-muted/40 py-10 overflow-hidden">
            <div className="container">
                <p className="text-center text-xs font-semibold text-muted-foreground mb-8 uppercase tracking-[0.2em]">
                    Powering solutions with modern tech
                </p>
                <div className="relative flex overflow-hidden mask-linear-fade">
                    <div className="flex animate-marquee space-x-16 whitespace-nowrap items-center">
                        {[...SKILLS, ...SKILLS].map((skill, i) => (
                            <span key={i} className="text-xl font-bold text-muted-foreground/40 uppercase tracking-widest hover:text-primary transition-colors cursor-default">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
