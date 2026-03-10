// src/components/component-source.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export function ComponentSource({
    name,
    className,
}: { name: string, className?: string }) {
    // Note: In a real shadcn-like system, this would fetch the registry JSON 
    // and extract the code. Since we have build-registry, we need to ensure 
    // the source code is passed or fetched.

    // Quick fix: Just display a message if it's empty, or ensure the registry 
    // build includes the raw code.
    return (
        <div className={cn("my-6 rounded-md border p-4 bg-muted/50 overflow-auto", className)}>
            <code className="text-sm">
                {/* This requires your registry to have stored the source */}
                {`// Source code for ${name} will appear here.`}
            </code>
        </div>
    )
}