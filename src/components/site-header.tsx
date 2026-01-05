import Link from "next/link"

import { siteConfig } from "@/lib/config"
import { source, studySource } from "@/lib/source"
import { CommandMenu } from "@/components/command-menu"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeSwitcher } from "@/components/mode-switcher"
import { SiteConfig } from "@/components/site-config"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function SiteHeader() {
    const combinedPageTree = {
        ...source.pageTree,
        children: [...source.pageTree.children, ...studySource.pageTree.children],
    };

    return (
        <header className="bg-background sticky top-0 z-50 w-full border-b">
            <div className="container-wrapper 3xl:fixed:px-0 px-6">
                <div className="3xl:fixed:container flex h-[var(--header-height)] items-center gap-2">
                    <MobileNav
                        items={siteConfig.navItems}
                        studyItems={studySource.pageTree.children}
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
                    <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
                        <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
                            <CommandMenu
                                tree={combinedPageTree}
                                navItems={siteConfig.navItems}
                            />
                        </div>
                        <Separator
                            orientation="vertical"
                            className="ml-2 hidden h-4 lg:block"
                        />
                        <Button asChild size="icon" variant="ghost" className="h-8 w-8">
                            <a href={siteConfig.author.links.facebook} target="_blank" rel="noreferrer">
                                <Icons.facebook className="size-4" />
                                <span className="sr-only">Facebook</span>
                            </a>
                        </Button>
                        <SiteConfig className="3xl:flex hidden" />
                        <Separator orientation="vertical" className="h-4" />
                        <ModeSwitcher />
                    </div>
                </div>
            </div>
        </header>
    )
}