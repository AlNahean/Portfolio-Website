import * as React from "react"
import { cn } from "@/lib/utils"

export function ComponentPreview({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "my-6 flex items-center justify-center rounded-md border p-8",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}