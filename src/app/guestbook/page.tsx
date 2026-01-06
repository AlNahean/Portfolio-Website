import { db } from "@/lib/db";
import { GuestbookForm } from "./guestbook-form";
import Image from "next/image";
import { cn } from "@/lib/utils";

// This prevents the build from failing by fetching data at runtime instead of build time
export const dynamic = "force-dynamic";

// Helper to generate a consistent random rotation based on string ID
function getRotation(id: string) {
    const charCode = id.charCodeAt(id.length - 1);
    // Returns a number between -6 and 6
    return (charCode % 12) - 6;
}

export default async function GuestbookPage() {
    // This fetch will now happen only when a user visits the page, not during build
    const entries = await db.guestbookEntry.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
            {/* ... rest of your JSX code ... */}
            {/* Grid Background Pattern */}
            <div
                className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="container relative z-10 mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-16">
                    <h1 className="text-4xl font-bold tracking-tighter">Guestbook</h1>
                    <GuestbookForm />
                </div>

                {/* Masonry-ish Layout */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-12 pb-20">
                    {entries.length === 0 ? (
                        <div className="text-muted-foreground text-center py-20">
                            It's quiet here... be the first to leave a note!
                        </div>
                    ) : (
                        entries.map((entry) => {
                            const rotation = getRotation(entry.id);

                            return (
                                <div
                                    key={entry.id}
                                    className={cn(
                                        "relative group w-64 bg-white text-black p-3 pb-8 shadow-xl transition-all duration-300 hover:z-20 hover:scale-110"
                                    )}
                                    style={{
                                        transform: `rotate(${rotation}deg)`,
                                    }}
                                >
                                    {/* Pin Effect (Visual) */}
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 size-4 rounded-full bg-red-500 shadow-sm z-10 opacity-80" />

                                    {/* Optional Image */}
                                    {entry.imageUrl && (
                                        <div className="relative aspect-square w-full mb-3 bg-gray-100 overflow-hidden border border-gray-200">
                                            <Image
                                                src={entry.imageUrl}
                                                alt={`Upload by ${entry.name}`}
                                                fill
                                                className="object-cover"
                                                sizes="250px"
                                            />
                                        </div>
                                    )}

                                    {/* Handwriting Font Style for Content */}
                                    <div className="font-mono space-y-2">
                                        <p className="text-sm leading-snug break-words">
                                            {entry.message}
                                        </p>
                                        <p className="text-xs text-gray-500 font-bold mt-2">
                                            - {entry.name}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}