import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "@/components/project-card";
import {
    ArrowRight,
    Briefcase,
    CheckCircle2,
    Code2,
    Cpu,
    Download,
    Github,
    Globe,
    Layers,
    Layout,
    Mail,
    MapPin,
    Terminal,
    Zap,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { GithubStatsSection } from "@/components/github-stats";

// --- DATA CONFIGURATION ---

const SKILLS = [
    "React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS",
    "PostgreSQL", "Prisma", "Redux", "Docker", "AWS", "Git"
];

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

// NOTE: Ensure these video files exist in your public/projects/video folder
const PROJECTS = [
    {
        id: 1,
        title: "Hyper Admin Dashboard",
        description: "A comprehensive React admin dashboard featuring dynamic charts, dark/light mode switching, and modular component architecture.",
        tech: ["React", "Chart.js", "Bootstrap", "SCSS"],
        video: "/projects/video/2023-02-18 10-06-24.mp4",
        image: "/projects/hyper admin dashboard.png",
        live: "https://admin-dashboard-react-chartjs.netlify.app/e-commerse",
        github: "https://github.com/AlNahean/Admin-Dashboard",
    },
    {
        id: 15,
        title: "Tasky",
        description: "A high-performance task management application built with Next.js server actions and optimistic UI updates.",
        tech: ["Next.js", "Server Actions", "Prisma", "Tailwind"],
        video: "/projects/video/Https   Next-Js-Projects-Pf8p.Vercel.App Tasky.mp4",
        image: "/projects/localhost_3000_tasky (1).png",
        live: "https://next-js-projects-pf8p.vercel.app/tasky",
        github: "https://github.com/AlNahean/next-js-projects",
    },
    {
        id: 3,
        title: "Daraz E-Commerce Clone",
        description: "Full-stack e-commerce platform replica with cart management, user authentication, and payment gateway integration.",
        tech: ["React", "Node.js", "Express", "MongoDB"],
        video: "/projects/video/2022-04-20 14-24-43.mp4",
        image: "/projects/daraz clone.png",
        live: "https://ecommerce-clone-daraz.netlify.app/",
        github: "https://github.com/AlNahean/daraz-clone-client",
    },
    {
        id: 6,
        title: "AI Image Generator",
        description: "SaaS application leveraging OpenAI's DALL-E API to generate custom images from text prompts with a credit system.",
        tech: ["React", "OpenAI API", "Vite"],
        video: "/projects/video/React App (2).mp4", // Using a placeholder video from your list
        image: "/projects/image-generator.png",
        live: "https://openaiapi.vercel.app/openai/generate-image",
        github: "https://github.com/AlNahean/openaiapi",
    },
    {
        id: 14,
        title: "Shoe Showcase",
        description: "An interactive 3D-like product showcase with smooth animations and dynamic color switching.",
        tech: ["Next.js", "Framer Motion", "Tailwind"],
        video: "/projects/video/Localhost 3000 Shoe-Showcase.mp4",
        image: "/projects/localhost_3000_shoe-showcase.png",
        live: "https://next-js-projects-pf8p.vercel.app/shoe-showcase",
        github: "https://github.com/AlNahean/next-js-projects",
    },
    {
        id: 5,
        title: "Phoenix Agency",
        description: "A modern, high-conversion agency landing page featuring GSAP animations and clean typography.",
        tech: ["React", "GSAP", "Bootstrap"],
        video: "/projects/video/React App.mp4",
        image: "/projects/phoenix-clone.png",
        live: "https://phoenix-clone.netlify.app/",
        github: "https://github.com/AlNahean/phoenix-landing-page",
    }
];

const SERVICES = [
    {
        title: "Web Application Development",
        description: "Building robust, scalable web apps from scratch using modern frameworks like Next.js and React.",
        icon: Layout,
    },
    {
        title: "API Design & Integration",
        description: "Creating secure RESTful and GraphQL APIs to power your data-driven applications.",
        icon: Terminal,
    },
    {
        title: "Performance Optimization",
        description: "Auditing and improving website performance for better SEO and user experience.",
        icon: Zap,
    },
    {
        title: "UI/UX Implementation",
        description: "Translating design mockups into pixel-perfect, responsive, and accessible interfaces.",
        icon: Layers,
    },
];

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground font-sans selection:bg-blue-500/20 selection:text-blue-600">
            <SiteHeader />

            <main className="flex-1">

                {/* --- 1. HERO SECTION --- */}
                <section className="relative pt-24 pb-32 md:pt-40 md:pb-48 overflow-hidden border-b bg-background/50 backdrop-blur-sm">
                    <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500/20 opacity-20 blur-[100px]"></div>
                    </div>

                    <div className="container px-4 md:px-6 flex flex-col items-center text-center">
                        <div className="mb-8 inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm font-medium text-muted-foreground shadow-sm">
                            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                            Available for full-time roles
                        </div>

                        <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl max-w-5xl">
                            Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Future</span> of the Web
                        </h1>

                        <p className="mt-6 max-w-[700px] text-muted-foreground md:text-xl leading-relaxed">
                            I'm <span className="font-semibold text-foreground">Nahean Fardous</span>, a Full-Stack Engineer crafting high-performance digital experiences with Next.js, TypeScript, and modern web technologies.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Button size="lg" className="h-12 px-8 rounded-full text-base font-semibold shadow-lg shadow-blue-500/20" asChild>
                                <Link href="#projects">
                                    View Selected Work <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-12 px-8 rounded-full text-base bg-background/50 backdrop-blur-sm" asChild>
                                <Link href="/Resume of Nahean Fardous-v2.pdf" target="_blank" rel="noopener noreferrer">
                                    <Download className="mr-2 h-4 w-4" /> Download CV
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* --- 2. LOGO MARQUEE --- */}
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

                {/* --- 3. ABOUT BENTO GRID --- */}
                <section id="about" className="py-24 container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">

                        {/* Bio Card */}
                        <div className="md:col-span-2 row-span-2 rounded-2xl border bg-card p-8 flex flex-col justify-center relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Code2 className="size-32" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Engineering with Passion</h2>
                            <p className="text-muted-foreground text-lg leading-relaxed max-w-prose">
                                I don't just write code; I solve problems. With a strong foundation in computer science and a keen eye for design, I bridge the gap between technical complexity and user experience. My journey involves everything from optimizing core web vitals to architecting scalable database schemas.
                            </p>
                            <div className="mt-8 flex gap-4">
                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold">3+</span>
                                    <span className="text-sm text-muted-foreground">Years Exp.</span>
                                </div>
                                <div className="w-px bg-border h-full mx-2"></div>
                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold">20+</span>
                                    <span className="text-sm text-muted-foreground">Projects</span>
                                </div>
                                <div className="w-px bg-border h-full mx-2"></div>
                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold">100%</span>
                                    <span className="text-sm text-muted-foreground">Commitment</span>
                                </div>
                            </div>
                        </div>

                        {/* Location Card */}
                        <div className="rounded-2xl border bg-zinc-900 text-white p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
                            <div className="relative z-10">
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 mb-4 animate-pulse">
                                    <MapPin className="size-6" />
                                </div>
                                <h3 className="font-bold text-lg">Mymensingh, BD</h3>
                                <p className="text-zinc-400 text-sm">Remote / Relocate</p>
                            </div>
                        </div>

                        {/* Availability Card */}
                        <div className="rounded-2xl border bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 flex flex-col justify-between border-green-500/20">
                            <div className="flex justify-between items-start">
                                <Briefcase className="size-6 text-green-600" />
                                <Badge className="bg-green-600 hover:bg-green-700">Active</Badge>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Open for Work</h3>
                                <p className="text-sm text-muted-foreground">Full-time or Contract</p>
                            </div>
                        </div>

                        {/* Stack Card */}
                        <div className="md:col-span-3 rounded-2xl border bg-muted/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex-1">
                                <h3 className="text-xl font-bold mb-2">My Tech Stack</h3>
                                <p className="text-muted-foreground">The tools I use to build robust applications.</p>
                            </div>
                            <div className="flex flex-wrap gap-2 justify-center md:justify-end max-w-2xl">
                                {SKILLS.map(skill => (
                                    <Badge key={skill} variant="outline" className="bg-background px-3 py-1.5 text-sm">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 4. FEATURED PROJECTS (VIDEO) --- */}
                <section id="projects" className="py-24 bg-muted/30 border-y">
                    <div className="container">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                            <div className="space-y-2">
                                <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
                                    Featured Projects
                                </h2>
                                <p className="text-muted-foreground text-lg max-w-2xl">
                                    A selection of my best work, showcasing full-stack capabilities and attention to detail. Hover over cards to preview.
                                </p>
                            </div>
                            <Button variant="outline" asChild>
                                <a href="https://github.com/AlNahean" target="_blank">
                                    View GitHub Profile
                                </a>
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {PROJECTS.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- 5. SERVICES --- */}
                <section className="py-24 container">
                    <h2 className="font-heading text-3xl font-bold tracking-tight text-center mb-16">
                        Technical Expertise
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {SERVICES.map((service, idx) => (
                            <div key={idx} className="flex flex-col items-start p-6 rounded-2xl border bg-card hover:bg-muted/50 transition-colors">
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary">
                                    <service.icon className="size-6" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- 6. EXPERIENCE TIMELINE --- */}
                <section className="py-24 bg-muted/30 border-y">
                    <div className="container max-w-4xl">
                        <div className="text-center mb-16">
                            <h2 className="font-heading text-3xl font-bold tracking-tight">Professional Journey</h2>
                        </div>

                        <div className="space-y-12">
                            {EXPERIENCE.map((item, index) => (
                                <div key={index} className="relative pl-8 md:pl-0">
                                    {/* Timeline Line (Desktop) */}
                                    <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-border -translate-x-1/2"></div>

                                    <div className={`md:flex items-center justify-between gap-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                        {/* Date Bubble */}
                                        <div className="hidden md:block w-1/2 text-center md:text-left mb-4 md:mb-0">
                                            <div className={`inline-block px-4 py-1.5 rounded-full border bg-background text-sm font-medium ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>
                                                {item.date}
                                            </div>
                                        </div>

                                        {/* Center Dot */}
                                        <div className="absolute left-0 md:left-[50%] top-0 md:top-1/2 -translate-y-1/2 -translate-x-[5px] md:-translate-x-1/2 h-3 w-3 rounded-full border-2 border-primary bg-background z-10"></div>

                                        {/* Content Card */}
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

                {/* --- 7. OPEN SOURCE / GITHUB STATS --- */}
                <section className="py-24 container">
                    <div className="rounded-3xl border bg-zinc-950 text-white p-8 md:p-12 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>

                        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 text-blue-400 mb-4 font-medium">
                                    <Github className="size-5" />
                                    <span>Open Source</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                                    Contributing to the community one commit at a time.
                                </h2>
                                <p className="text-zinc-400 mb-8 max-w-md">
                                    I believe in open software. My contributions range from bug fixes in popular UI libraries to maintaining my own starter templates.
                                </p>
                                <Button className="bg-white text-black hover:bg-zinc-200 rounded-full px-8" asChild>
                                    <a href={siteConfig.author.links.github} target="_blank">
                                        Explore Repositories
                                    </a>
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 backdrop-blur-sm">
                                    <div className="text-4xl font-bold mb-1">20+</div>
                                    <div className="text-sm text-zinc-500">Public Repos</div>
                                </div>
                                <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 backdrop-blur-sm">
                                    <div className="text-4xl font-bold mb-1">450+</div>
                                    <div className="text-sm text-zinc-500">Contributions (2024)</div>
                                </div>
                                <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 backdrop-blur-sm col-span-2">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="size-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                            <CheckCircle2 className="size-5" />
                                        </div>
                                        <div>
                                            <div className="font-bold">Latest Commit</div>
                                            <div className="text-xs text-zinc-500">Just now</div>
                                        </div>
                                    </div>
                                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-[85%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 8. PROCESS SECTION --- */}
                <section className="py-24 bg-muted/30 border-y">
                    <div className="container text-center max-w-4xl">
                        <h2 className="font-heading text-3xl font-bold tracking-tight mb-16">How I Work</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="relative">
                                <div className="h-16 w-16 mx-auto bg-background border rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-sm z-10 relative">1</div>
                                <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-border -z-0"></div>
                                <h3 className="font-bold text-lg mb-2">Discover</h3>
                                <p className="text-muted-foreground text-sm">Understanding requirements and architectural planning.</p>
                            </div>
                            <div className="relative">
                                <div className="h-16 w-16 mx-auto bg-background border rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-sm z-10 relative">2</div>
                                <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-border -z-0"></div>
                                <h3 className="font-bold text-lg mb-2">Develop</h3>
                                <p className="text-muted-foreground text-sm">Clean code implementation with frequent updates.</p>
                            </div>
                            <div className="relative">
                                <div className="h-16 w-16 mx-auto bg-background border rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-sm z-10 relative">3</div>
                                <h3 className="font-bold text-lg mb-2">Deploy</h3>
                                <p className="text-muted-foreground text-sm">CI/CD pipelines, testing, and performance tuning.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 9. CONTACT / FOOTER CTA --- */}
                <section id="contact" className="py-32 container">
                    <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                        <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mb-8 rotate-3 hover:rotate-0 transition-transform">
                            <Mail className="size-8" />
                        </div>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            Have a project in mind?
                        </h2>
                        <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                            I'm always interested in discussing new opportunities, whether it's a full-time role, freelance gig, or just a tech chat.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Button size="lg" className="h-14 px-8 rounded-full text-lg" asChild>
                                <a href="mailto:nahean.fardous@gmail.com">
                                    Send me an Email
                                </a>
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg" asChild>
                                <a href={siteConfig.author.links.linkedin} target="_blank">
                                    Connect on LinkedIn
                                </a>
                            </Button>
                        </div>
                    </div>
                </section>

            </main>
            <GithubStatsSection />
            <SiteFooter />
        </div>
    );
}