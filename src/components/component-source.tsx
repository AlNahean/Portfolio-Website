"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function ComponentSource({
    name,
    className,
}: { name: string, className?: string }) {
    const [code, setCode] = React.useState<string>("Loading source...");

    React.useEffect(() => {
        async function fetchSource() {
            try {
                const res = await fetch(`/r/${name}.json`);
                const data = await res.json();

                if (data.files && data.files.length > 0) {
                    // Use the first file's content
                    setCode(data.files[0].content);
                } else {
                    setCode("// No source code available");
                }
            } catch (e) {
                setCode("// Failed to load source code.");
            }
        }
        fetchSource();
    }, [name]);

    return (
        <div className={cn("my-6 rounded-lg border bg-muted/30 overflow-hidden", className)}>
            <div className="border-b px-4 py-2 text-xs font-mono text-muted-foreground bg-muted/50">
                {name}.tsx
            </div>
            {/* Added overflow-x-auto and min-w-0 to fix the layout break */}
            <div className="overflow-x-auto min-w-0">
                <pre className="p-4 text-sm font-mono leading-relaxed whitespace-pre">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    )
}