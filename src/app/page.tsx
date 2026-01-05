
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";
import Link from "next/link";
import {
  ArrowRight,
  Code,
  ExternalLink,
  Mail,
  MapPin,
  Phone
} from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">
        {/* --- Hero Section --- */}
        <section className="container flex flex-col items-center justify-center space-y-8 py-24 text-center md:py-32 lg:py-40">
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-1000">
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Md. Nahean Fardous
            </h1>
            <p className="text-xl font-medium text-muted-foreground sm:text-2xl">
              Front-End Developer
            </p>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl text-balance">
              Adept web developer specializing in Javascript and ReactJs. I build exceptional digital experiences with modern technologies.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
            <Button asChild size="lg">
              <Link href="#contact">
                Contact Me <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#projects">
                View Projects
              </Link>
            </Button>
          </div>
        </section>

        {/* --- About & Skills Section --- */}
        {/* Added scroll-mt-24 to fix the scroll into view issue caused by sticky header */}
        <section id="about" className="container scroll-mt-24 py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            {/* About Me */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">About Me</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I am an adept web developer specializing in Javascript and ReactJs. I am proficient in building frontend applications and efficient in working with modern web technologies. Highly adaptive, I can quickly learn new technologies that are best suited for certain tasks and deliver quality products within a given period.
              </p>

              <div className="space-y-4 pt-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  Education
                </h3>
                <div className="border-l-2 border-primary/20 pl-6 ml-1 space-y-1">
                  <h4 className="font-bold text-lg">Bachelor of Science</h4>
                  <p className="text-foreground/80 font-medium">Netrokona Govt. College</p>
                  <p className="text-sm text-muted-foreground">2021 - present</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-6" id="skills">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "Javascript", "React", "GSAP", "Next.js", "Tailwind CSS",
                  "Bootstrap", "Typescript", "SCSS", "Three.js", "Chart.js"
                ].map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-base px-4 py-2 hover:bg-primary/20 transition-colors cursor-default">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- Projects Section --- */}
        <section id="projects" className="container scroll-mt-24 py-12 md:py-24 lg:py-32">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Projects</h2>
            <p className="text-muted-foreground text-lg">A selection of my recent work</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Project 1 */}
            <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg border-muted">
              <CardHeader>
                <CardTitle className="text-xl">Daraz Clone</CardTitle>
                <CardDescription>Full-Stack React App</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  A clone of Daraz where visitors can browse items, add to cart, search for items, create accounts, and list products for sale. Built using React.js for the UI and Node.js for the backend.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">React.js</Badge>
                  <Badge variant="outline" className="text-xs">Node.js</Badge>
                </div>
              </CardContent>
              {/* Fix: Changed flex layout to handle overflow better */}
              <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6 border-t bg-muted/20">
                <Button asChild size="sm" variant="outline" className="flex-1 w-full sm:w-auto gap-2">
                  <Link href="#" target="_blank"> <Code className="size-4" /> Code</Link>
                </Button>
                <Button asChild size="sm" className="flex-1 w-full sm:w-auto gap-2">
                  <Link href="#" target="_blank"> <ExternalLink className="size-4" /> Live Demo</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Project 2 */}
            <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg border-muted">
              <CardHeader>
                <CardTitle className="text-xl">Admin Dashboard</CardTitle>
                <CardDescription>React & Chart.js</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  A comprehensive admin dashboard featuring toggleable Dark/Light modes. Utilizes Chart.js to visualize data through interactive graphs.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">React</Badge>
                  <Badge variant="outline" className="text-xs">Chart.js</Badge>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6 border-t bg-muted/20">
                <Button asChild size="sm" variant="outline" className="flex-1 w-full sm:w-auto gap-2">
                  <Link href="#" target="_blank"> <Code className="size-4" /> Code</Link>
                </Button>
                <Button asChild size="sm" className="flex-1 w-full sm:w-auto gap-2">
                  <Link href="#" target="_blank"> <ExternalLink className="size-4" /> Live Demo</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Project 3 */}
            <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg border-muted">
              <CardHeader>
                <CardTitle className="text-xl">Phoenix Clone</CardTitle>
                <CardDescription>Agency Website</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  An agency website built with React and Bootstrap. Features a robust dark and light mode switch for better user experience.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">React</Badge>
                  <Badge variant="outline" className="text-xs">Bootstrap</Badge>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6 border-t bg-muted/20">
                <Button asChild size="sm" variant="outline" className="flex-1 w-full sm:w-auto gap-2">
                  <Link href="#" target="_blank"> <Code className="size-4" /> Code</Link>
                </Button>
                <Button asChild size="sm" className="flex-1 w-full sm:w-auto gap-2">
                  <Link href="#" target="_blank"> <ExternalLink className="size-4" /> Live Demo</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* --- Contact Section --- */}
        <section id="contact" className="container scroll-mt-24 py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Get In Touch</h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Feel free to reach out for collaborations or just a friendly hello.
            </p>
          </div>

          <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Email */}
            <Card className="hover:border-primary/50 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Mail className="size-5 text-primary" /> Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="mailto:nahean.fardous@gmail.com" className="hover:underline text-sm sm:text-base break-words">
                  nahean.fardous@gmail.com
                </a>
              </CardContent>
            </Card>

            {/* Phone */}
            <Card className="hover:border-primary/50 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Phone className="size-5 text-primary" /> Phone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="tel:+8801688961770" className="hover:underline text-sm sm:text-base">
                  +8801688961770
                </a>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="hover:border-primary/50 transition-colors md:col-span-2 lg:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="size-5 text-primary" /> Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base">Digarkanda, Mymensingh</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 flex justify-center gap-6">
            <Button asChild variant="ghost" size="icon" className="h-12 w-12 rounded-full border">
              <a href={siteConfig.author.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Icons.linkedin className="size-6" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="h-12 w-12 rounded-full border">
              <a href={siteConfig.author.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Icons.gitHub className="size-6" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="h-12 w-12 rounded-full border">
              <a href={siteConfig.author.links.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                <Icons.facebook className="size-6" />
              </a>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
