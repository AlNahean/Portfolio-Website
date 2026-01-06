import Link from "next/link"
import { siteConfig } from "@/lib/config"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function SiteFooter() {
    return (
        <footer className="relative border-t bg-background overflow-hidden">
            <div className="container relative z-10 px-4 py-12 md:px-6 md:py-16 lg:py-20">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8 pb-20">
                    {/* Brand Column */}
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-2">
                            <Icons.logo className="size-6" />
                            <span className="font-bold text-lg">{siteConfig.name}</span>
                        </Link>
                        <p className="text-sm leading-6 text-muted-foreground max-w-sm">
                            {siteConfig.description}
                        </p>
                        <div className="flex space-x-4">
                            <Button variant="ghost" size="icon" asChild className="h-9 w-9 rounded-md">
                                <a href={siteConfig.author.links.github} target="_blank" rel="noreferrer">
                                    <Icons.gitHub className="size-4" />
                                    <span className="sr-only">GitHub</span>
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild className="h-9 w-9 rounded-md">
                                <a href={siteConfig.author.links.twitter} target="_blank" rel="noreferrer">
                                    <Icons.twitter className="size-4" />
                                    <span className="sr-only">Twitter</span>
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild className="h-9 w-9 rounded-md">
                                <a href={siteConfig.author.links.linkedin} target="_blank" rel="noreferrer">
                                    <Icons.linkedin className="size-4" />
                                    <span className="sr-only">LinkedIn</span>
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-foreground">Resources</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <Link href="/blog" className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors">
                                            Blog
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/docs" className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors">
                                            Documentation
                                        </Link>
                                    </li>
                                    <li>
                                        <a href={siteConfig.author.links.github} target="_blank" rel="noreferrer" className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors">
                                            Source Code
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs leading-5 text-muted-foreground">
                        &copy; {new Date().getFullYear()} {siteConfig.author.name}. All rights reserved.
                    </p>
                </div>
            </div>

            {/* Big "Cut" Text */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none select-none overflow-hidden">
                <h1 className="text-[23vw] font-bold leading-none tracking-tighter text-foreground/5 dark:text-foreground/10 translate-y-[35%]">
                    nahean
                </h1>
            </div>
        </footer>
    )
}