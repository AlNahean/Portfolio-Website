import Image from "next/image";
import { Metadata } from "next";
import { photoCollection } from "@/data/photos";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
    title: "Photos",
    description: "A collection of photographs.",
};

export default function PhotosPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <SiteHeader />

            <main className="container max-w-[1600px] py-16 flex-1">
                {/* Minimal Header */}
                <h1 className="font-heading text-4xl font-bold tracking-tight mb-12 text-center">
                    Photos
                </h1>

                {/* Clean Masonry Grid */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                    {photoCollection.map((photo) => (
                        <div key={photo.id} className="break-inside-avoid">
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                width={1200}
                                height={800}
                                className="w-full h-auto rounded-lg bg-muted"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                priority={Number(photo.id) <= 4} // Load first few images immediately
                            />
                        </div>
                    ))}
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}