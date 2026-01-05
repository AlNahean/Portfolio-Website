import * as React from "react"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"

function extractText(node: React.ReactNode): string {
    if (typeof node === "string") return node
    if (Array.isArray(node)) return node.map(extractText).join("")
    if (React.isValidElement(node)) return extractText(node.props.children)
    return ""
}

export const CodeComponent = ({
    className,
    __raw__,
    __src__,
    __npm__,
    __yarn__,
    __pnpm__,
    __bun__,
    ...props
}: React.ComponentProps<"code"> & {
    __raw__?: string
    __src__?: string
    __npm__?: string
    __yarn__?: string
    __pnpm__?: string
    __bun__?: string
}) => {
    const isInline = typeof props.children === "string"
    const rawText = __raw__ ?? extractText(props.children)
    const language = className?.replace(/language-/, "") ?? ""

    // Inline code
    if (isInline) {
        return (
            <code
                className={cn(
                    "rounded-md bg-muted px-[0.35rem] py-[0.2rem] font-mono text-[0.85em] text-foreground/90",
                    className
                )}
                {...props}
            />
        )
    }

    // Block code
    return (
        <div className="relative group my-4 overflow-hidden rounded-xl border border-border bg-muted/40 shadow-sm">
            {/* Language Label */}
            {language && (
                <div className="absolute left-3 top-2 text-[10px] uppercase text-muted-foreground tracking-wider">
                    {language}
                </div>
            )}

            {/* Copy Button */}
            {rawText && (
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition">
                    <CopyButton value={rawText} src={__src__} />
                </div>
            )}

            <pre className="overflow-x-auto scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground/50 p-4 pt-6 text-sm font-mono leading-relaxed">
                <code className={cn("text-sm font-mono", className)} {...props} />
            </pre>
        </div>
    )
}
