import * as React from "react"
import { cn } from "@/lib/utils"

export function ComponentsList({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLUListElement>) {
    return (
        <ul
            className={cn(
                "my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
                className
            )}
            {...props}
        >
            {children}
        </ul>
    )
}