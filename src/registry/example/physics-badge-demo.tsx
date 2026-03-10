"use client";

import PhysicsBadge from "@/registry/ui/physics-badge";

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
