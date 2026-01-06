import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";
import {
  ArrowRight,
  Briefcase,
  Cpu,
  GraduationCap,
  LayoutTemplate,
  Mail,
  MapPin,
  MoveUpRight,
  PenTool,
  Terminal,
  Zap,
} from "lucide-react";
import { siteConfig } from "@/lib/config";

// --- Mock Data (Demo) ---
const PROJECTS = [
  {
    title: "Daraz Clone",
    desc: "A full-stack e-commerce replica with cart logic, user auth, and payment integration.",
    tags: ["React", "Node.js", "MongoDB"],
    link: "#",
  },
  {
    title: "Admin Dashboard",
    desc: "Data visualization dashboard with dark mode, charts, and real-time data updates.",
    tags: ["Next.js", "Chart.js", "Tailwind"],
    link: "#",
  },
  {
    title: "Phoenix Agency",
    desc: "High-performance agency landing page with GSAP animations and modern layout.",
    tags: ["React", "GSAP", "Bootstrap"],
    link: "#",
  },
];

const EXPERIENCE = [
  {
    company: "Tech Solutions Inc.",
    role: "Frontend Developer Intern",
    date: "2023 - Present",
    desc: "Building accessible UI components and optimizing core web vitals.",
  },
  {
    company: "Freelance",
    role: "Web Developer",
    date: "2021 - 2023",
    desc: "Delivered 10+ custom websites for local businesses using React ecosystem.",
  },
];

const SERVICES = [
  {
    icon: <LayoutTemplate className="size-6" />,
    title: "Frontend Dev",
    desc: "Pixel-perfect conversion of designs into React/Next.js code.",
  },
  {
    icon: <Cpu className="size-6" />,
    title: "Backend Integration",
    desc: "Connecting UIs to robust APIs and database architectures.",
  },
  {
    icon: <Zap className="size-6" />,
    title: "Performance",
    desc: "Optimizing applications for speed, SEO, and accessibility.",
  },
];

const STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Docker",
  "Figma",
  "Git",
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">
      <SiteHeader />

      <main className="flex-1 selection:bg-primary/20">

        {/* --- Section 1: Hero with Grid Background --- */}
        <section className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
          </div>

          <div className="container px-4 md:px-6 flex flex-col items-center text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm border-primary/20 bg-primary/5 text-primary rounded-full">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Available for new projects
            </Badge>
            <h1 className="font-heading text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl max-w-4xl">
              Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">web of tomorrow</span>
            </h1>
            <p className="mt-6 max-w-[700px] text-muted-foreground md:text-xl leading-relaxed">
              I am <span className="font-semibold text-foreground">Nahean</span>. A Full-Stack Developer obsessed with performance, clean code, and intuitive design.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-full h-12 px-8 text-base">
                View My Work <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full h-12 px-8 text-base" asChild>
                <a href="https://github.com/AlNahean" target="_blank">
                  <Icons.gitHub className="mr-2 size-4" /> GitHub
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* --- Section 2: Infinite Marquee (Tech Stack) --- */}
        <section className="border-b bg-muted/30 py-10 overflow-hidden">
          <div className="container">
            <p className="text-center text-sm font-medium text-muted-foreground mb-6">POWERED BY MODERN TECH</p>
            <div className="relative flex overflow-x-hidden group">
              <div className="animate-marquee whitespace-nowrap flex gap-16 items-center">
                {/* Repeat list twice for seamless loop */}
                {[...STACK, ...STACK].map((tech, i) => (
                  <span key={i} className="text-2xl font-bold text-foreground/20 uppercase tracking-widest hover:text-primary/50 transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- Section 3: Bento Grid (About) --- */}
        <section id="about" className="container py-24">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Who am I?</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              A glimpse into my world, my location, and my coding stats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[300px]">
            {/* Bento Item 1: Large Bio */}
            <Card className="md:col-span-2 md:row-span-2 flex flex-col justify-center bg-gradient-to-br from-background to-muted/50 border-none ring-1 ring-border">
              <CardHeader>
                <CardTitle className="text-3xl">Passionate about <br /> solving problems.</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  I specialize in the JavaScript ecosystem, focusing on React, Next.js, and Node.js. My goal is to bridge the gap between complex back-end logic and beautiful front-end experiences. I love contributing to open source and learning new patterns.
                </p>
                <div className="mt-6 flex gap-2">
                  <Badge variant="secondary">Adaptable</Badge>
                  <Badge variant="secondary">Fast Learner</Badge>
                  <Badge variant="secondary">Team Player</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Bento Item 2: Map/Location */}
            <Card className="relative overflow-hidden border-none ring-1 ring-border bg-zinc-900 text-white">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <CardContent className="flex flex-col items-center justify-center h-full z-10 relative">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 animate-pulse">
                  <MapPin className="size-8 text-primary" />
                </div>
                <h3 className="font-bold text-xl">Mymensingh</h3>
                <p className="text-zinc-400">Bangladesh</p>
              </CardContent>
            </Card>

            {/* Bento Item 3: Github Stats */}
            <Card className="flex flex-col justify-between border-none ring-1 ring-border bg-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icons.gitHub className="size-5" /> Open Source
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Contributions</span>
                    <span className="font-mono font-bold">450+</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Repositories</span>
                    <span className="font-mono font-bold">25</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Stars Earned</span>
                    <span className="font-mono font-bold">120</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-xs" asChild>
                  <Link href={siteConfig.author.links.github} target="_blank">View Profile <ArrowRight className="ml-1 size-3" /></Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* --- Section 4: Featured Projects --- */}
        <section id="projects" className="bg-muted/30 py-24 border-y">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Work</h2>
                <p className="text-muted-foreground mt-4 max-w-xl">
                  Projects that showcase my ability to handle complexity and design.
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/projects">View All Archives</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {PROJECTS.map((project, i) => (
                <div key={i} className="group relative flex flex-col gap-4">
                  <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted border relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60" />
                    <div className="absolute bottom-4 left-4 p-2 bg-background/90 backdrop-blur rounded-lg border shadow-sm">
                      <Terminal className="size-5 text-primary" />
                    </div>
                    {/* Placeholder for project image */}
                    <div className="h-full w-full bg-zinc-100 dark:bg-zinc-800 transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-xl group-hover:text-primary transition-colors">{project.title}</h3>
                      <Link href={project.link} className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-accent rounded-full">
                        <MoveUpRight className="size-4" />
                      </Link>
                    </div>
                    <p className="text-muted-foreground line-clamp-2">{project.desc}</p>
                    <div className="flex gap-2 flex-wrap pt-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs font-medium text-foreground/80 bg-background border px-2 py-1 rounded-md">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Section 5: Guestbook Promo (Replaced Study Hub) --- */}
        <section className="container py-24">
          <div className="rounded-3xl bg-zinc-950 text-zinc-50 p-8 md:p-16 overflow-hidden relative border border-zinc-800">
            {/* Decorative background effects */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[300px] w-[300px] rounded-full bg-purple-900/20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[200px] w-[200px] rounded-full bg-blue-900/20 blur-3xl"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-zinc-800 px-4 py-1.5 text-sm font-medium text-zinc-200 border border-zinc-700 mb-6">
                <PenTool className="size-4" /> Leave your mark
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Sign the Guestbook</h2>
              <p className="text-zinc-400 text-lg max-w-xl mb-10">
                Drop a note, say hello, or leave some feedback. Join the community wall and let me know you were here!
              </p>
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 h-12 px-8 rounded-full" asChild>
                <Link href="/guestbook">Go to Guestbook</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* --- Section 6: Experience & Education --- */}
        <section className="container py-12 md:py-24 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Experience Column */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="size-6 text-primary" />
                <h3 className="text-2xl font-bold">Experience</h3>
              </div>
              <div className="relative border-l border-muted pl-8 ml-3 space-y-10">
                {EXPERIENCE.map((job, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[37px] mt-1.5 size-4 rounded-full border-2 border-primary bg-background" />
                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">{job.date}</span>
                    <h4 className="text-lg font-bold mt-2">{job.role}</h4>
                    <p className="text-sm font-medium text-foreground/80">{job.company}</p>
                    <p className="text-muted-foreground mt-2 text-sm">{job.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Column */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="size-6 text-primary" />
                <h3 className="text-2xl font-bold">Education</h3>
              </div>
              <div className="relative border-l border-muted pl-8 ml-3 space-y-10">
                <div className="relative">
                  <div className="absolute -left-[37px] mt-1.5 size-4 rounded-full border-2 border-primary bg-background" />
                  <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">2021 - Present</span>
                  <h4 className="text-lg font-bold mt-2">Bachelor of Science</h4>
                  <p className="text-sm font-medium text-foreground/80">Netrokona Govt. College</p>
                  <p className="text-muted-foreground mt-2 text-sm">Focusing on Botany and biological sciences while pursuing full-stack development.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Section 7: Services --- */}
        <section className="bg-muted/30 py-24 border-y">
          <div className="container text-center max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter mb-12">How can I help you?</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {SERVICES.map((service, i) => (
                <div key={i} className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-background border shadow-sm hover:shadow-md transition-shadow">
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {service.icon}
                  </div>
                  <h3 className="font-bold">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Section 8: Stack (Grid) --- */}
        <section className="container py-24">
          <h2 className="text-2xl font-bold mb-8">Preferred Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {STACK.map((tech) => (
              <div key={tech} className="flex items-center justify-center p-4 border rounded-lg bg-card hover:border-primary/50 transition-colors">
                <span className="font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </section>

        {/* --- Section 9: CTA / Contact --- */}
        <section id="contact" className="container py-24 md:py-32">
          <div className="relative rounded-3xl overflow-hidden border bg-background px-6 py-16 md:px-16 md:py-24 text-center">
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <h2 className="font-heading text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Ready to start your project?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Whether you have a specific idea or just want to say hi, my inbox is always open.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full" asChild>
                <a href="mailto:nahean.fardous@gmail.com">
                  <Mail className="mr-2 size-5" /> Send an Email
                </a>
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full" asChild>
                <Link href="/book-call">
                  Book a 15min call
                </Link>
              </Button>
            </div>

            <div className="mt-16 flex justify-center gap-8 text-muted-foreground">
              <a href={siteConfig.author.links.twitter} target="_blank" className="hover:text-primary transition-colors">
                <Icons.twitter className="size-6" />
              </a>
              <a href={siteConfig.author.links.linkedin} target="_blank" className="hover:text-primary transition-colors">
                <Icons.linkedin className="size-6" />
              </a>
              <a href={siteConfig.author.links.github} target="_blank" className="hover:text-primary transition-colors">
                <Icons.gitHub className="size-6" />
              </a>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}