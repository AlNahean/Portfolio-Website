
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { PAGES_NEW } from "@/lib/docs"
import { showMcpDocs } from "@/lib/flags"
import type { source } from "@/lib/source"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export function DocsSidebar({
    tree,
    ...props
}: React.ComponentProps<typeof Sidebar> & { tree: typeof source.pageTree }) {
    const pathname = usePathname()

    // Separate root pages and folders
    const rootPages = tree.children.filter((item) => item.type === "page")
    const folders = tree.children.filter((item) => item.type === "folder")

    return (
        <Sidebar
            className="sticky top-[calc(var(--header-height)+1px)] z-30 hidden h-[calc(100svh-var(--footer-height)+2rem)] bg-transparent lg:flex"
            collapsible="none"
            {...props}
        >
            <SidebarContent className="no-scrollbar overflow-x-hidden px-2 pb-12">
                <div className="h-(--top-spacing) shrink-0" />

                {/* Render root pages if they exist */}
                {rootPages.length > 0 && (
                    <SidebarGroup>
                        {/* <SidebarGroupLabel className="text-muted-foreground font-medium">
                            Study
                        </SidebarGroupLabel> */}
                        <SidebarGroupContent>
                            <SidebarMenu className="gap-0.5">
                                {rootPages.map((page) => (
                                    <SidebarMenuItem key={page.url}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={page.url === pathname}
                                            className="data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:fixed:w-full 3xl:fixed:max-w-48 relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md"
                                        >
                                            <Link href={page.url}>
                                                <span className="absolute inset-0 flex w-(--sidebar-width) bg-transparent" />
                                                {page.name}
                                                {PAGES_NEW.includes(page.url) && (
                                                    <span
                                                        className="ml-2 flex size-2 rounded-full bg-blue-500"
                                                        title="New"
                                                    />
                                                )}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}

                {/* Render folders */}
                {folders.map((item) => {
                    return (
                        <SidebarGroup key={item.name}>
                            <SidebarGroupLabel className="text-muted-foreground font-medium">
                                {item.name}
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu className="gap-0.5">
                                    {item.children.map((child) => {
                                        if (
                                            !showMcpDocs &&
                                            child.type === "page" &&
                                            child.url?.includes("/mcp")
                                        ) {
                                            return null
                                        }

                                        if (child.type === "page") {
                                            return (
                                                <SidebarMenuItem key={child.url}>
                                                    <SidebarMenuButton
                                                        asChild
                                                        isActive={child.url === pathname}
                                                        className="data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:fixed:w-full 3xl:fixed:max-w-48 relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md"
                                                    >
                                                        <Link href={child.url}>
                                                            <span className="absolute inset-0 flex w-(--sidebar-width) bg-transparent" />
                                                            {child.name}
                                                            {PAGES_NEW.includes(child.url) && (
                                                                <span
                                                                    className="ml-2 flex size-2 rounded-full bg-blue-500"
                                                                    title="New"
                                                                />
                                                            )}
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            )
                                        }
                                        return null
                                    })}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    )
                })}
            </SidebarContent>
        </Sidebar>
    )
}