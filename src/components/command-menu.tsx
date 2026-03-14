/* 
 * CMDK v1.0.0+ Focus & Keyboard Navigation Fixes:
 * 1. e.stopPropagation(): Added to the `Cmd+K` listener so the 'k' keypress doesn't bleed into the modal and break cmdk's internal navigation state.
 * 2. setTimeout(..., 0): Replaced `requestAnimationFrame` for delayed rendering to ensure list items exist in the DOM *before* focus settles.
 * 3. onOpenAutoFocus: Overrode Radix Dialog's default focus trap with `e.preventDefault()` and manually focused the input via `inputRef`.
 */

"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { type DialogProps } from "@radix-ui/react-dialog"
import { ArrowRight } from 'lucide-react';

import { CornerDownLeftIcon, SquareDashedIcon } from "lucide-react"

import { showMcpDocs } from "@/lib/flags"
import { source } from "@/lib/source"
import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/use-config"
import { useIsMac } from "@/hooks/use-is-mac"
import { useMutationObserver } from "@/hooks/use-mutation-observer"
import { copyToClipboardWithMeta } from "@/components/copy-button"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Separator } from "@/components/ui/separator"

export function CommandMenu({
    trees,
    navItems,
    ...props
}: DialogProps & {
    trees: { name: string; tree: typeof source.pageTree }[]
    navItems?: { href: string; label: string }[]
}) {
    const router = useRouter()
    const isMac = useIsMac()
    const [config] = useConfig()
    const [open, setOpen] = React.useState(false)
    const [renderDelayedGroups, setRenderDelayedGroups] = React.useState(false)
    const [selectedType, setSelectedType] = React.useState<
        "page" | "component" | null
    >(null)
    const [copyPayload, setCopyPayload] = React.useState("")
    const packageManager = config.packageManager || "pnpm"

    const inputRef = React.useRef<HTMLInputElement>(null)

    const toolsAndPages = [
        { name: "Journey", url: "/journey", keywords: ["life", "timeline"] },
        { name: "Blocks", url: "/blocks", keywords: ["layouts", "templates", "sections", "gallery"] },
        { name: "Components", url: "/components", keywords: ["ui", "gallery", "showcase", "library"] },
        { name: "Photos", url: "/photos", keywords: ["gallery", "images"] },
        { name: "Guestbook", url: "/guestbook", keywords: ["messages", "comments"] },
        { name: "Changelog", url: "/changelog", keywords: ["updates", "logs"] },
        { name: "Todo App", url: "/todo", keywords: ["task", "management"] },
    ]

    const handlePageHighlight = React.useCallback(
        (isComponent: boolean, item: { url: string; name?: React.ReactNode }) => {
            if (isComponent) {
                const componentName = item.url.split("/").pop()
                setSelectedType("component")
                setCopyPayload(
                    `${packageManager} dlx shadcn@latest add ${componentName}`
                )
            } else {
                setSelectedType("page")
                setCopyPayload("")
            }
        }, [packageManager, setSelectedType, setCopyPayload]
    )

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false)
        command()
    }, [])

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
                if (
                    (e.target instanceof HTMLElement && e.target.isContentEditable) ||
                    e.target instanceof HTMLInputElement ||
                    e.target instanceof HTMLTextAreaElement ||
                    e.target instanceof HTMLSelectElement
                ) {
                    return
                }

                e.preventDefault()
                // FIX 1: Stop the event from bleeding into the dialog and messing up cmdk
                e.stopPropagation()
                setOpen((open) => !open)
            }

            if (e.key === "c" && (e.metaKey || e.ctrlKey)) {
                runCommand(() => {
                    if (selectedType === "page" || selectedType === "component") {
                        copyToClipboardWithMeta(copyPayload, {
                            name: "copy_npm_command",
                            properties: { command: copyPayload, pm: packageManager },
                        })
                    }
                })
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [copyPayload, runCommand, selectedType, packageManager])

    // FIX 2: Use setTimeout instead of requestAnimationFrame so the items exist
    // in the DOM before focus is fully settled and navigation is attempted.
    React.useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                setRenderDelayedGroups(true)
            }, 0)
            return () => clearTimeout(timer)
        }
        setRenderDelayedGroups(false)
    }, [open])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="secondary"
                    className={cn(
                        "bg-surface text-foreground dark:bg-card relative h-8 w-full justify-start pl-3 font-medium shadow-none sm:pr-12 md:w-48 lg:w-56 xl:w-64"
                    )}
                    onClick={() => setOpen(true)}
                    {...props}
                >
                    <span className="hidden lg:inline-flex">Search documentation...</span>
                    <span className="inline-flex lg:hidden">Search...</span>
                    <div className="absolute top-1.5 right-1.5 hidden gap-1 sm:flex">
                        <KbdGroup>
                            <Kbd className="border">{isMac ? "⌘" : "Ctrl"}</Kbd>
                            <Kbd className="border">K</Kbd>
                        </KbdGroup>
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent
                showCloseButton={false}
                onOpenAutoFocus={(e) => {
                    // FIX 3: Prevent Radix from stealing focus, and point it directly to our ref
                    e.preventDefault();
                    inputRef.current?.focus();
                }}
                className="rounded-xl border-none bg-clip-padding p-2 pb-11 shadow-2xl ring-4 ring-neutral-200/80 dark:bg-neutral-900 dark:ring-neutral-800"
            >
                <DialogHeader className="sr-only">
                    <DialogTitle>Search documentation...</DialogTitle>
                    <DialogDescription>Search for a command to run...</DialogDescription>
                </DialogHeader>
                <Command
                    className="**:data-[slot=command-input-wrapper]:bg-input/50 **:data-[slot=command-input-wrapper]:border-input rounded-none bg-transparent **:data-[slot=command-input]:!h-9 **:data-[slot=command-input]:py-0 **:data-[slot=command-input-wrapper]:mb-0 **:data-[slot=command-input-wrapper]:!h-9 **:data-[slot=command-input-wrapper]:rounded-md **:data-[slot=command-input-wrapper]:border"
                    filter={(value, search, keywords) => {
                        const extendValue = value + " " + (keywords?.join(" ") || "")
                        if (extendValue.toLowerCase().includes(search.toLowerCase())) {
                            return 1
                        }
                        return 0
                    }}
                >
                    <CommandInput
                        ref={inputRef}
                        placeholder="Search everything..."
                    />
                    <CommandList className="no-scrollbar min-h-80 scroll-pt-2 scroll-pb-1.5">
                        <CommandEmpty className="text-muted-foreground py-12 text-center text-sm">
                            No results found.
                        </CommandEmpty>

                        {renderDelayedGroups ? (
                            <>
                                <CommandGroup
                                    heading="Tools & Pages"
                                    className="!p-0 [&_[cmdk-group-heading]]:scroll-mt-16[&_[cmdk-group-heading]]:!p-3 [&_[cmdk-group-heading]]:!pb-1"
                                >
                                    {toolsAndPages.map((item) => (
                                        <CommandMenuItem
                                            key={item.url}
                                            value={`Tools ${item.name}`}
                                            keywords={item.keywords}
                                            onHighlight={() => {
                                                setSelectedType("page")
                                                setCopyPayload("")
                                            }}
                                            onSelect={() => {
                                                runCommand(() => router.push(item.url))
                                            }}
                                        >
                                            <SquareDashedIcon className="size-4" />
                                            {item.name}
                                        </CommandMenuItem>
                                    ))}
                                </CommandGroup>

                                {navItems && navItems.length > 0 && (
                                    <CommandGroup
                                        heading="Navigation"
                                        className="!p-0 [&_[cmdk-group-heading]]:scroll-mt-16 [&_[cmdk-group-heading]]:!p-3 [&_[cmdk-group-heading]]:!pb-1"
                                    >
                                        {navItems.map((item) => (
                                            <CommandMenuItem
                                                key={item.href}
                                                value={`Navigation ${item.label}`}
                                                keywords={["nav", "navigation", item.label.toLowerCase()]}
                                                onHighlight={() => {
                                                    setSelectedType("page")
                                                    setCopyPayload("")
                                                }}
                                                onSelect={() => {
                                                    runCommand(() => router.push(item.href))
                                                }}
                                            >
                                                <ArrowRight />
                                                {item.label}
                                            </CommandMenuItem>
                                        ))}
                                    </CommandGroup>
                                )}

                                {trees.map(({ name: sourceName, tree }) => (
                                    <React.Fragment key={sourceName}>
                                        {tree.children.map((groupOrPage) => {
                                            if (groupOrPage.type === "folder") {
                                                return (
                                                    <CommandGroup
                                                        key={groupOrPage.$id || groupOrPage.name?.toString()}
                                                        heading={sourceName === "Docs" ? groupOrPage.name : `${sourceName}: ${groupOrPage.name}`}
                                                        className="!p-0 [&_[cmdk-group-heading]]:scroll-mt-16 [&_[cmdk-group-heading]]:!p-3 [&_[cmdk-group-heading]]:!pb-1"
                                                    >
                                                        {groupOrPage.children.map((item) => {
                                                            if (item.type === "page") {
                                                                const isComponent = item.url.includes("/components/") || item.url.includes("/file-uploader") || item.url.includes("/my-button") || item.url.includes("docs");
                                                                if (!showMcpDocs && item.url.includes("/mcp")) return null;
                                                                return (
                                                                    <CommandMenuItem
                                                                        key={item.url}
                                                                        value={`${sourceName} ${groupOrPage.name} ${item.name}`}
                                                                        keywords={isComponent ? ["component"] : undefined}
                                                                        onHighlight={() => handlePageHighlight(isComponent, item)}
                                                                        onSelect={() => runCommand(() => router.push(item.url))}
                                                                    >
                                                                        {isComponent ? <div className="border-muted-foreground aspect-square size-4 rounded-full border border-dashed" /> : <ArrowRight />}
                                                                        {item.name}
                                                                    </CommandMenuItem>
                                                                )
                                                            }
                                                            return null;
                                                        })}
                                                    </CommandGroup>
                                                )
                                            }
                                            if (groupOrPage.type === "page") {
                                                const isComponent = groupOrPage.url.includes("/components/") || groupOrPage.url.includes("/file-uploader") || groupOrPage.url.includes("/my-button") || groupOrPage.url.includes("docs");
                                                if (!showMcpDocs && groupOrPage.url.includes("/mcp")) return null;
                                                return (
                                                    <CommandMenuItem
                                                        key={groupOrPage.url}
                                                        value={`${sourceName} ${groupOrPage.name?.toString() || ""}`}
                                                        keywords={isComponent ? ["component"] : undefined}
                                                        onHighlight={() => handlePageHighlight(isComponent, groupOrPage)}
                                                        onSelect={() => runCommand(() => router.push(groupOrPage.url))}
                                                    >
                                                        {isComponent ? <div className="border-muted-foreground aspect-square size-4 rounded-full border border-dashed" /> : <ArrowRight />}
                                                        {groupOrPage.name}
                                                    </CommandMenuItem>
                                                )
                                            }
                                            return null;
                                        })}
                                    </React.Fragment>
                                ))}
                            </>
                        ) : null}
                    </CommandList>
                </Command>
                <div className="text-muted-foreground absolute inset-x-0 bottom-0 z-20 flex h-10 items-center gap-2 rounded-b-xl border-t border-t-neutral-100 bg-neutral-50 px-4 text-xs font-medium dark:border-t-neutral-700 dark:bg-neutral-800">
                    <div className="flex items-center gap-2">
                        <CommandMenuKbd>
                            <CornerDownLeftIcon />
                        </CommandMenuKbd>{" "}
                        {selectedType === "page" || selectedType === "component"
                            ? "Go to Page"
                            : null}
                    </div>
                    {copyPayload && (
                        <>
                            <Separator orientation="vertical" className="!h-4" />
                            <div className="flex items-center gap-1">
                                <CommandMenuKbd>{isMac ? "⌘" : "Ctrl"}</CommandMenuKbd>
                                <CommandMenuKbd>C</CommandMenuKbd>
                                {copyPayload}
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

function CommandMenuItem({
    children,
    className,
    onHighlight,
    ...props
}: React.ComponentProps<typeof CommandItem> & {
    onHighlight?: () => void
    "data-selected"?: string
    "aria-selected"?: string
}) {
    const ref = React.useRef<HTMLDivElement>(null)

    useMutationObserver(ref, (mutations) => {
        mutations.forEach((mutation) => {
            if (
                mutation.type === "attributes" &&
                mutation.attributeName === "aria-selected" &&
                ref.current?.getAttribute("aria-selected") === "true"
            ) {
                onHighlight?.()
            }
        })
    })

    return (
        <CommandItem
            ref={ref}
            className={cn(
                "data-[selected=true]:border-input data-[selected=true]:bg-input/50 h-9 rounded-md border border-transparent !px-3 font-medium",
                className
            )}
            {...props}
        >
            {children}
        </CommandItem>
    )
}

function CommandMenuKbd({ className, ...props }: React.ComponentProps<"kbd">) {
    return (
        <kbd
            className={cn(
                "bg-background text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border px-1 font-sans text-[0.7rem] font-medium select-none[&_svg:not([class*='size-'])]:size-3",
                className
            )}
            {...props}
        />
    )
}