"use client";

import * as React from "react";
import { Monitor, Smartphone, Tablet, Check, Copy, Terminal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { registryComponents } from "@/registry/components";

export function BlockPreview({
    name,
    title,
}: {
    name: string;
    title?: string;
}) {
    const Component = registryComponents[name];
    const [device, setDevice] = React.useState<"desktop" | "tablet" | "mobile">("desktop");
    const [copied, setCopied] = React.useState(false);
    const [code, setCode] = React.useState<string>("Loading...");

    // The CLI command to copy
    const cliCommand = `npx shadcn@latest add "https://nahean.vercel.app/r/${name}.json"`;

    // Fetch the raw code from your registry JSON when the component mounts
    React.useEffect(() => {
        async function fetchCode() {
            try {
                const res = await fetch(`/r/${name}.json`);
                const data = await res.json();
                // Get the main file's content
                if (data.files && data.files.length > 0) {
                    setCode(data.files[0].content);
                } else {
                    setCode("// No source code available");
                }
            } catch (e) {
                setCode("Failed to load source code.");
            }
        }
        fetchCode();
    }, [name]);

    const handleCopy = () => {
        navigator.clipboard.writeText(cliCommand);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="group relative my-8 flex flex-col space-y-4">
            <Tabs defaultValue="preview" className="relative mr-auto w-full">
                {/* --- HEADER BAR --- */}
                <div className="flex items-center justify-between pb-3">
                    <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                        <TabsTrigger
                            value="preview"
                            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                        >
                            Preview
                        </TabsTrigger>
                        <TabsTrigger
                            value="code"
                            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                        >
                            Code
                        </TabsTrigger>
                    </TabsList>

                    {/* Right side controls */}
                    <div className="flex items-center gap-4">
                        {/* Viewport Toggles */}
                        <div className="hidden items-center gap-1 md:flex border-r pr-4 border-border/50">
                            <Button variant="ghost" size="icon" className={cn("h-8 w-8 rounded-md", device === "desktop" && "bg-muted")} onClick={() => setDevice("desktop")}>
                                <Monitor className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className={cn("h-8 w-8 rounded-md", device === "tablet" && "bg-muted")} onClick={() => setDevice("tablet")}>
                                <Tablet className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className={cn("h-8 w-8 rounded-md", device === "mobile" && "bg-muted")} onClick={() => setDevice("mobile")}>
                                <Smartphone className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* CLI Copy Button */}
                        <div className="hidden items-center gap-2 md:flex">
                            <div className="flex h-8 items-center rounded-md border border-border bg-muted/50 px-3 text-xs font-mono text-muted-foreground">
                                <Terminal className="mr-2 h-3 w-3" />
                                {cliCommand}
                            </div>
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleCopy}>
                                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* --- PREVIEW TAB --- */}
                <TabsContent value="preview" className="relative rounded-md border bg-background">
                    <div className="flex items-center justify-center p-4 sm:p-12 min-h-[500px] bg-muted/20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px]">
                        {/* Dynamic Viewport Wrapper */}
                        <div
                            className={cn(
                                "relative w-full overflow-hidden rounded-xl border bg-background shadow-xl transition-all duration-300",
                                device === "desktop" && "max-w-full",
                                device === "tablet" && "max-w-[768px]",
                                device === "mobile" && "max-w-[375px]"
                            )}
                        >
                            {Component ? (
                                <React.Suspense fallback={<div className="p-10 text-center animate-pulse">Loading block...</div>}>
                                    <Component />
                                </React.Suspense>
                            ) : (
                                <div className="p-10 text-center text-red-500">Block not found.</div>
                            )}
                        </div>
                    </div>
                </TabsContent>

                {/* --- CODE TAB --- */}
                <TabsContent value="code">
                    <div className="relative w-full rounded-md border bg-zinc-950 p-4">
                        <div className="absolute right-4 top-4">
                            <Button variant="secondary" size="sm" onClick={() => navigator.clipboard.writeText(code)}>
                                Copy Code
                            </Button>
                        </div>
                        <pre className="max-h-[600px] overflow-auto text-sm text-zinc-50 font-mono scrollbar-thin">
                            <code>{code}</code>
                        </pre>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
