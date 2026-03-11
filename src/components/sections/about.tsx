"use client"

import { Badge } from "@/components/ui/badge";
import { Briefcase, Code2, MapPin, ArrowUpRight } from "lucide-react";
import { Map, MapMarker, MarkerContent } from "@/components/ui/map";

export function AboutSection() {
    return (
        <section id="about" className="container-wrapper 3xl:fixed:px-0 px-6 py-24">
            <div className="3xl:fixed:container max-w-8xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">

                    {/* Bio Card */}
                    <div className="md:col-span-2 row-span-2 rounded-2xl border bg-card p-8 flex flex-col justify-center relative overflow-hidden group cursor-pointer hover:border-primary/30 transition-colors duration-500">
                        {/* Background Decor Icon with smooth rotation/scale */}
                        <div className="absolute -top-6 -right-6 p-8 opacity-5 group-hover:opacity-10 transition-all duration-700 ease-out group-hover:scale-110 group-hover:-rotate-12 pointer-events-none">
                            <Code2 className="size-48" />
                        </div>

                        {/* Slide-in Action Arrow (matches the video style) */}
                        <div className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary opacity-0 scale-75 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 overflow-hidden">
                            {/* Outgoing Arrow */}
                            <ArrowUpRight className="absolute size-5 transition-transform duration-300 ease-out group-hover:translate-x-full group-hover:-translate-y-full" />
                            {/* Incoming Arrow */}
                            <ArrowUpRight className="absolute size-5 -translate-x-full translate-y-full transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
                        </div>

                        <div className="relative z-10 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                            <h2 className="text-3xl font-bold mb-4">Bridging Data & Design</h2>
                            <p className="text-muted-foreground text-lg leading-relaxed max-w-prose">
                                I specialize in translating heavy technical requirements into clean, accessible web applications. From crafting seamless user interfaces with modern frameworks to building robust backend pipelines for scientific data, I care deeply about performance, architecture, and the final user experience.
                            </p>
                            <div className="mt-8 flex gap-6">
                                <div className="flex flex-col group/stat">
                                    <span className="text-3xl font-bold transition-transform duration-300 group-hover/stat:-translate-y-1">3+</span>
                                    <span className="text-sm text-muted-foreground">Years Exp.</span>
                                </div>
                                <div className="w-px bg-border h-full"></div>
                                <div className="flex flex-col group/stat">
                                    <span className="text-3xl font-bold transition-transform duration-300 group-hover/stat:-translate-y-1">20+</span>
                                    <span className="text-sm text-muted-foreground">Projects</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Location Card with Map */}
                    <div className="rounded-2xl border bg-zinc-900 text-white p-0 flex flex-col items-center justify-center text-center relative overflow-hidden group cursor-pointer hover:border-zinc-700 transition-colors duration-500">
                        {/* Map Container scaling on hover for depth */}
                        <div className="absolute inset-0 z-0 scale-100 group-hover:scale-110 transition-transform duration-700 ease-in-out">
                            <Map
                                zoom={11}
                                center={[90.4125, 24.7471]}
                                className="grayscale contrast-[1.2] brightness-[0.7] opacity-60 group-hover:opacity-90 transition-opacity duration-500"
                                interactive={false}
                            >
                                <MapMarker longitude={90.4125} latitude={24.7471}>
                                    <MarkerContent>
                                        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-8 ring-white/5 transition-transform duration-500 group-hover:-translate-y-2">
                                            <MapPin className="size-6 text-white" />
                                            {/* Pulse effect rings */}
                                            <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-white"></div>
                                        </div>
                                    </MarkerContent>
                                </MapMarker>
                            </Map>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-80" />

                        <div className="relative z-20 p-6 flex flex-col items-center mt-auto transition-transform duration-500 ease-out group-hover:-translate-y-2">
                            <h3 className="font-bold text-lg text-white drop-shadow-md">Mymensingh, BD</h3>
                            <p className="text-zinc-300 text-sm drop-shadow-md">Remote / Relocate</p>
                        </div>
                    </div>

                    {/* Availability Card */}
                    <div className="rounded-2xl border bg-gradient-to-br from-green-500/10 to-emerald-500/5 p-6 flex flex-col justify-between border-green-500/20 group cursor-pointer hover:border-green-500/40 hover:from-green-500/15 hover:to-emerald-500/10 transition-all duration-500 relative overflow-hidden">

                        {/* Slide-in Arrow for the small card */}
                        <div className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 text-green-600 opacity-0 scale-75 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 overflow-hidden">
                            <ArrowUpRight className="absolute size-4 transition-transform duration-300 ease-out group-hover:translate-x-full group-hover:-translate-y-full" />
                            <ArrowUpRight className="absolute size-4 -translate-x-full translate-y-full transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
                        </div>

                        <div className="flex justify-between items-start">
                            {/* Briefcase wave/bounce animation on hover */}
                            <Briefcase className="size-6 text-green-600 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-12" />
                            <Badge className="bg-green-600 hover:bg-green-700 font-medium transition-transform duration-300 group-hover:scale-105 shadow-sm">
                                Active
                            </Badge>
                        </div>
                        <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1 mt-6">
                            <h3 className="font-bold text-lg text-green-700 dark:text-green-400">Open for Work</h3>
                            <p className="text-sm text-green-600/80 dark:text-green-500/80">Full-time or Contract</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}