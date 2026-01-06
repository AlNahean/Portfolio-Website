import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";

export function HeroSection() {
    return (
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
    );
}
