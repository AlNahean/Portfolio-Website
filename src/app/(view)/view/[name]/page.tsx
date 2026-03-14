import { registryComponents } from "@/registry/components";
import { notFound } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function BlockViewPage({
    params,
}: {
    params: Promise<{ name: string }>;
}) {
    const { name } = await params;
    
    // Prefer the demo component if it exists.
    const Component = registryComponents[`${name}-demo`] || registryComponents[name];

    if (!Component) {
        notFound();
    }

    return (
        <ScrollArea className="h-screen w-full bg-background">
            <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8">
                <Component />
            </div>
        </ScrollArea>
    );
}
