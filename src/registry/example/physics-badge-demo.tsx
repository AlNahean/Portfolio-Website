"use client";

import dynamic from "next/dynamic";

// Dynamically import the badge with SSR disabled to prevent 
// WebGL/WASM crashes during Next.js server-side rendering.
const PhysicsBadge = dynamic(() => import("@/registry/ui/physics-badge"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center text-muted-foreground animate-pulse">
            Loading 3D Physics...
        </div>
    )
});

export default function PhysicsBadgeDemo() {
    return (
        <div className="w-full h-[600px] flex items-center justify-center bg-muted/20 border rounded-lg relative overflow-hidden">
            {/* Note: Ensure the 3D assets exist in your public directory */}
            <PhysicsBadge
                className="w-full h-full"
            />
        </div>
    );
}
