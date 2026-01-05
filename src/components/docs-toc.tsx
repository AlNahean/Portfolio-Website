"use client"

import * as React from "react"
import { Check, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function useActiveItem(itemIds: string[]) {
    const [activeId, setActiveId] = React.useState<string | null>(null)

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                }
            },
            { rootMargin: "0% 0% -80% 0%" }
        )

        for (const id of itemIds ?? []) {
            const element = document.getElementById(id)
            if (element) {
                observer.observe(element)
            }
        }

        return () => {
            for (const id of itemIds ?? []) {
                const element = document.getElementById(id)
                if (element) {
                    observer.unobserve(element)
                }
            }
        }
    }, [itemIds])

    return activeId
}

type TocProps = {
    toc: {
        title?: React.ReactNode
        url: string
        depth: number
    }[]
}

export function DocsMobileTOC({ toc }: TocProps) {
    const [open, setOpen] = React.useState(false)
    const itemIds = React.useMemo(
        () => toc.map((item) => item.url.replace("#", "")),
        [toc]
    )
    const activeHeading = useActiveItem(itemIds)
    const activeItem = toc.find((item) => item.url === `#${activeHeading}`)

    if (!toc?.length) {
        return null
    }

    return (
        <div className="sticky top-[var(--header-height)] z-40 -mt-px block w-full border-b bg-background/80 py-2 px-4 backdrop-blur-sm xl:hidden ">
            <div className="max-w-[80vw] mx-auto">
                <DropdownMenu open={open} onOpenChange={setOpen} >
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-2 overflow-hidden p-0 text-sm"
                        >
                            <span className="shrink-0 text-muted-foreground">On this page</span>
                            <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                            <div className="min-w-0 flex-1 text-left">
                                <p className="truncate font-medium text-primary">
                                    {(activeItem?.title as string) ?? toc[0]?.title}
                                </p>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="start"
                        className="no-scrollbar max-h-[70svh] w-[var(--radix-dropdown-menu-trigger-width)] bg-background/80 backdrop-blur-sm"
                    >
                        {toc.map((item) => (
                            <DropdownMenuItem
                                key={item.url}
                                asChild
                                onClick={() => setOpen(false)}
                                data-depth={item.depth}
                                className="data-[depth=3]:pl-6 data-[depth=4]:pl-8"
                            >
                                <a
                                    href={item.url}
                                    className={cn("flex w-full items-center justify-between")}
                                >
                                    <span className="truncate">{item.title}</span>
                                    {item.url === `#${activeHeading}` && (
                                        <Check className="size-4 text-primary" />
                                    )}
                                </a>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export function DocsDesktopTOC({ toc, className }: TocProps & { className?: string }) {
    const itemIds = React.useMemo(
        () => toc.map((item) => item.url.replace("#", "")),
        [toc]
    )
    const activeHeading = useActiveItem(itemIds)

    if (!toc?.length) {
        return null
    }

    return (
        <div className={cn("flex flex-col gap-2 p-4 pt-0 text-sm", className)}>
            <p className="text-muted-foreground bg-background sticky top-0 h-6 text-xs">
                On This Page
            </p>
            {toc.map((item) => (
                <a
                    key={item.url}
                    href={item.url}
                    className="text-muted-foreground hover:text-foreground data-[active=true]:text-foreground data-[depth=3]:pl-4 data-[depth=4]:pl-6 text-[0.8rem] no-underline transition-colors"
                    data-active={item.url === `#${activeHeading}`}
                    data-depth={item.depth}
                >
                    {item.title}
                </a>
            ))}
        </div>
    )
}