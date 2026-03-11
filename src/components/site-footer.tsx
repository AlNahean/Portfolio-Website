import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { Icons } from "@/components/icons";
import { ArrowUpRight } from "lucide-react";

export function SiteFooter() {
    return (
        <footer className="border-t border-border/40 bg-background text-foreground">
            <div className="container-wrapper 3xl:fixed:px-0 px-6 ">
                <div className="3xl:fixed:container max-w-8xl mx-auto py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

                        {/* Column 1: Brand & Intro */}
                        <div className="md:col-span-2 space-y-6">
                            <Link href="/" className="flex items-center gap-3 w-fit group">
                                <div className="bg-muted/50 p-2 rounded-lg border border-border group-hover:border-primary/50 transition-colors">
                                    <Icons.logo className="size-5 text-primary" />
                                </div>
                                <span className="font-bold text-xl tracking-tight">{siteConfig.author.name}</span>
                            </Link>

                            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                                Bridging the gap between complex biological data analysis and robust web software. Building high-performance tools for the modern web.
                            </p>

                            {/* Status Indicator */}
                            <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground bg-muted/30 w-fit px-3 py-1.5 rounded-md border border-border/50">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                All systems operational
                            </div>
                        </div>

                        {/* Column 2: Navigation */}
                        <div className="space-y-5">
                            <h3 className="text-xs font-bold tracking-widest uppercase text-foreground/80">Navigation</h3>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li><Link href="/projects" className="hover:text-primary transition-colors">Projects</Link></li>
                                <li><Link href="/case-studies" className="hover:text-primary transition-colors">Case Studies</Link></li>
                                <li><Link href="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
                                <li><Link href="/blog" className="hover:text-primary transition-colors">Blog & Resources</Link></li>
                                <li><Link href="/reflections" className="hover:text-primary transition-colors">Reflections</Link></li>
                            </ul>
                        </div>

                        {/* Column 3: Connect */}
                        <div className="space-y-5">
                            <h3 className="text-xs font-bold tracking-widest uppercase text-foreground/80">Connect</h3>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li>
                                    <a href={siteConfig.author.links.github} target="_blank" rel="noreferrer" className="group flex items-center w-fit hover:text-primary transition-colors">
                                        <Icons.gitHub className="mr-2 size-4" />
                                        GitHub
                                        <ArrowUpRight className="ml-1 size-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
                                    </a>
                                </li>
                                <li>
                                    <a href={siteConfig.author.links.linkedin} target="_blank" rel="noreferrer" className="group flex items-center w-fit hover:text-primary transition-colors">
                                        <Icons.linkedin className="mr-2 size-4" />
                                        LinkedIn
                                        <ArrowUpRight className="ml-1 size-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
                                    </a>
                                </li>
                                <li>
                                    <a href={siteConfig.author.links.email} className="group flex items-center w-fit hover:text-primary transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 size-4"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                        Email
                                        <ArrowUpRight className="ml-1 size-3 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                        <p>
                            &copy; {new Date().getFullYear()} {siteConfig.author.name}. All rights reserved.
                        </p>
                        <p className="font-mono flex items-center gap-2">
                            Designed in BD <span className="text-border">|</span> Deployed on Vercel
                        </p>
                    </div>
                </div>
            </div>
        </footer>

    );
}