import { registryComponents } from "@/registry/components";
import { notFound } from "next/navigation";

export default async function BlockViewPage({
    params,
}: {
    params: Promise<{ name: string }>;
}) {
    const { name } = await params;
    const Component = registryComponents[name];

    if (!Component) {
        notFound();
    }

    return (
        <div className="h-screen w-full flex items-center justify-center overflow-hidden">
            <Component />
        </div>
    );
}
