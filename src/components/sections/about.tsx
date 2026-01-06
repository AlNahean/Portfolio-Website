import { Badge } from "@/components/ui/badge";
import { Briefcase, Code2, MapPin } from "lucide-react";

export function AboutSection() {
    return (
        <section id="about" className="py-24 container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
                {/* Bio Card */}
                <div className="md:col-span-2 row-span-2 rounded-2xl border bg-card p-8 flex flex-col justify-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Code2 className="size-32" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Engineering with Passion</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-prose">
                        I don't just write code; I solve problems. With a strong foundation in computer science and a keen eye for design, I bridge the gap between technical complexity and user experience.
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

                {/* Location Card */}
                <div className="rounded-2xl border bg-zinc-900 text-white p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
                    <div className="relative z-10">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 mb-4 animate-pulse">
                            <MapPin className="size-6" />
                        </div>
                        <h3 className="font-bold text-lg">Mymensingh, BD</h3>
                        <p className="text-zinc-400 text-sm">Remote / Relocate</p>
                    </div>
                </div>

                {/* Availability Card */}
                <div className="rounded-2xl border bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 flex flex-col justify-between border-green-500/20">
                    <div className="flex justify-between items-start">
                        <Briefcase className="size-6 text-green-600" />
                        <Badge className="bg-green-600 hover:bg-green-700">Active</Badge>
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
