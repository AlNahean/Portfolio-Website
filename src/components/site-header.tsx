import Link from "next/link"
import { siteConfig } from "@/lib/config"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeSwitcher } from "@/components/mode-switcher"
import { SiteConfig } from "@/components/site-config"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CommandMenu } from "@/components/command-menu"
import { source, blogSource, studySource } from "@/lib/source"

export function SiteHeader() {
    return (
        <header className="bg-background/80 backdrop-blur-md sticky top-0 z-50 w-full border-b">
            <div className="container-wrapper 3xl:fixed:px-0 px-6">
                <div className="3xl:fixed:container flex h-[var(--header-height)] items-center gap-2">
                    <MobileNav
                        items={siteConfig.navItems}
                        studyItems={[]}
                        className="flex lg:hidden"
                    />
                    <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="hidden size-8 lg:flex"
                    >
                        <Link href="/">
                            <Icons.logo className="size-5" />
                            <span className="sr-only">{siteConfig.name}</span>
                        </Link>
                    </Button>
                    <MainNav items={siteConfig.navItems} className="hidden lg:flex" />

                    <div className="ml-auto flex items-center gap-1 sm:gap-2">
                        {/* Wrapper: changed 'hidden md:flex' to 'flex' so it shows on mobile */}
                        <div className="flex items-center">
                            <CommandMenu
                                trees={[
                                    { name: "Docs", tree: source.pageTree },
                                    { name: "Blog", tree: blogSource.pageTree },
                                    { name: "Study", tree: studySource.pageTree },
                                ]}
                                navItems={siteConfig.navItems}
                            />
                        </div>

                        <Separator
                            orientation="vertical"
                            className="ml-1 hidden h-4 lg:block"
                        />

                        <Button asChild size="icon" variant="ghost" className="size-8">
                            <a href={siteConfig.author.links.github} target="_blank" rel="noreferrer">
                                <Icons.gitHub className="size-4" />
                                <span className="sr-only">Github</span>
                            </a>
                        </Button>

                        <Button asChild size="icon" variant="ghost" className="hidden size-8 sm:flex">
                            <a href={siteConfig.author.links.facebook} target="_blank" rel="noreferrer">
                                <Icons.facebook className="size-4" />
                                <span className="sr-only">Facebook</span>
                            </a>
                        </Button>

                        <SiteConfig className="hidden lg:flex" />
                        <Separator orientation="vertical" className="h-4" />
                        <ModeSwitcher />
                    </div>
                </div>
            </div>
        </header>
    )
}