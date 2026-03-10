"use client"

import { Badge } from "@/components/ui/badge";
import { Briefcase, Code2, MapPin } from "lucide-react";
import { Map, MapMarker, MarkerContent } from "@/components/ui/map";

export function AboutSection() {
    return (
        <section id="about" className="py-24 container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
                {/* Bio Card */}
                <div className="md:col-span-2 row-span-2 rounded-2xl border bg-card p-8 flex flex-col justify-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Code2 className="size-32" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Engineering Output & Value</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-prose">
                        I don't just write code; I solve problems. By combining scalable web architecture with biological data analysis, I deliver robust software solutions. Whether it's a sleek frontend or a data-heavy backend pipeline, I bridge the gap between complex technical requirements and seamless user experiences.
                    </p>
                    <div className="mt-8 flex gap-4">
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold">3+</span>
                            <span className="text-sm text-muted-foreground">Years Exp.</span>
                        </div>
                        <div className="w-px bg-border h-full mx-2"></div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold">20+</span>
                            <span className="text-sm text-muted-foreground">Projects</span>
                        </div>
                    </div>
                </div>

                {/* Location Card with Map */}
                <div className="rounded-2xl border bg-zinc-900 text-white p-0 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                    <div className="absolute inset-0 z-0">
                        <Map
                            zoom={11}
                            center={[90.4125, 24.7471]}
                            className="grayscale contrast-[1.2] brightness-[0.7] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                            interactive={false}
                        >
                            <MapMarker longitude={90.4125} latitude={24.7471}>
                                <MarkerContent>
                                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-8 ring-white/5 animate-pulse">
                                        <MapPin className="size-6 text-white" />
                                    </div>
                                </MarkerContent>
                            </MapMarker>
                        </Map>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent z-10 pointer-events-none" />

                    <div className="relative z-20 p-6 flex flex-col items-center mt-auto">
                        <h3 className="font-bold text-lg">Mymensingh, BD</h3>
                        <p className="text-zinc-400 text-sm">Remote / Relocate</p>
                    </div>
                </div>

                {/* Availability Card */}
                <div className="rounded-2xl border bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 flex flex-col justify-between border-green-500/20">
                    <div className="flex justify-between items-start">
                        <Briefcase className="size-6 text-green-600" />
                        <Badge className="bg-green-600 hover:bg-green-700 font-medium">Active</Badge>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Open for Work</h3>
                        <p className="text-sm text-muted-foreground">Full-time or Contract</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
