import { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ComponentPreview } from "@/components/component-preview";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Component Showcase",
    description: "A collection of custom, interactive UI components and tools.",
};

export default function ComponentsShowcasePage() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">
            <SiteHeader />
            
            <main className="flex-1 container-wrapper py-16 md:py-24">
                <div className="container px-6">
                    {/* Page Header */}
                    <div className="space-y-4 mb-16 text-center md:text-left">
                        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                            Component Showcase
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto md:mx-0">
                            A collection of custom, interactive UI components I've built. 
                            These range from 3D physics experiments to complex file uploaders.
                        </p>
                    </div>

                    {/* Showcase Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        
                        {/* Item 1: Physics Badge */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground">Physics Badge</h2>
                                    <p className="text-muted-foreground text-sm">Interactive 3D component with React Three Fiber.</p>
                                </div>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/docs/physics-badge">Docs <ArrowRight className="ml-2 size-4"/></Link>
                                </Button>
                            </div>
                            {/* This magically loads the demo from your registry! */}
                            <ComponentPreview name="physics-badge-demo" className="min-h-[400px]" />
                        </div>

                        {/* Item 2: File Uploader */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground">Advanced File Uploader</h2>
                                    <p className="text-muted-foreground text-sm">Drag & drop with size validation.</p>
                                </div>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/docs/file-uploader">Docs <ArrowRight className="ml-2 size-4"/></Link>
                                </Button>
                            </div>
                            <ComponentPreview name="file-uploader-demo" className="min-h-[400px]" />
                        </div>

                        {/* Item 3: Your standard Button */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground">Custom Buttons</h2>
                                    <p className="text-muted-foreground text-sm">CVA-based custom button variants.</p>
                                </div>
                            </div>
                            <ComponentPreview name="my-button-demo" className="min-h-[200px]" />
                        </div>

                    </div>
                </div>
            </main>
            
            <SiteFooter />
        </div>
    );
}
