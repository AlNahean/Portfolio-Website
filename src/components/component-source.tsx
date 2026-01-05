import * as React from "react"
import { cn } from "@/lib/utils"

export function ComponentSource({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "my-6 overflow-hidden rounded-md border",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}