"use client";

import * as React from "react"
import { cn } from "@/lib/utils"
import { registryComponents } from "@/registry/components"

export function ComponentPreview({
    children,
    name,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement> & { name?: string }) {
    const Component = name ? registryComponents[name] : null;

    return (
        <div
            className={cn(
                "my-6 flex min-h-[350px] w-full flex-col items-center justify-center rounded-lg border-2 bg-background/50 p-10 ",
                className
            )}
            {...props}
        >
            <div className="w-full flex items-center justify-center">
                {name && Component ? (
                    <React.Suspense fallback={<div className="text-muted-foreground animate-pulse text-sm">Loading component...</div>}>
                        <Component />
                    </React.Suspense>
                ) : (
                    children
                )}
            </div>
        </div>
    )
}