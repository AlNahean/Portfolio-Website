import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MicroCardsSection() {
    return (
        <section className="py-24 bg-muted/40">
            <div className="container">
                <div className="text-center mb-16 space-y-2">
                    <span className="text-primary font-bold tracking-widest text-sm uppercase">About</span>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
                        Here&apos;s what sets me apart<br className="hidden md:block" /> and makes me unique
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {/* Card 1: Bio */}
                    <div className="group relative overflow-hidden rounded-[2rem] bg-background border p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex flex-col-reverse md:flex-row gap-6 items-center justify-between h-full">
                            <div className="space-y-4 text-center md:text-left z-10">
                                <h3 className="font-bold text-xl">Learn more about me</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed max-w-[200px]">
                                    Good evening! I&apos;m Nahean, an experienced full-stack engineer.
                                </p>
                            </div>
                            <div className="relative size-32 shrink-0 rounded-full overflow-hidden border-4 border-muted/50 group-hover:scale-110 transition-transform duration-500">
                                <Image
                                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop"
                                    alt="Profile"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        {/* Arrow Icon */}
                        <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                            <div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                <ArrowUpRight className="size-4" />
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Connections */}
                    <div className="group relative overflow-hidden rounded-[2rem] bg-background border p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-center items-center text-center">
                        <div className="flex items-center justify-center -space-x-4 mb-6 group-hover:space-x-1 transition-all duration-300 ease-out">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="relative size-12 rounded-full border-2 border-background overflow-hidden bg-muted">
                                    <Image
                                        src={`https://i.pravatar.cc/150?u=${i + 20}`}
                                        alt="Avatar"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <h3 className="font-bold text-xl">Connections</h3>
                        <p className="text-muted-foreground text-sm mt-2 max-w-[250px]">
                            An evolving list of people I&apos;ve met and those I wish to meet.
                        </p>
                        <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                            <div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                <ArrowUpRight className="size-4" />
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Toolbox */}
                    <div className="group relative overflow-hidden rounded-[2rem] bg-background border p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="h-full flex flex-col justify-between">
                            <div className="space-y-2 mb-6">
                                <h3 className="font-bold text-xl">Toolbox</h3>
                                <p className="text-muted-foreground text-sm max-w-[250px]">
                                    Check out my favorite tools and spots around the web.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                {/* React */}
                                <div className="size-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 group-hover:-translate-y-2 transition-transform duration-300 delay-0 shadow-sm border border-blue-100">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-7"><path d="M12 0c-1.32 0-2.58.1-3.76.28C6.1 1.7 4.25 4.1 4.25 7s1.85 5.3 3.99 6.72c1.18.18 2.44.28 3.76.28s2.58-.1 3.76-.28c2.14-1.42 3.99-3.82 3.99-6.72s-1.85-5.3-3.99-6.72C14.58.1 13.32 0 12 0zM7 7c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5z" /></svg>
                                </div>
                                {/* VS Code */}
                                <div className="size-14 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-500 group-hover:-translate-y-2 transition-transform duration-300 delay-75 shadow-sm border border-sky-100">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-7"><path d="M23.5 18c0 .8-.7 1.5-1.5 1.5H2c-.8 0-1.5-.7-1.5-1.5V6c0-.8.7-1.5 1.5-1.5h20c.8 0 1.5.7 1.5 1.5v12zm-22 0h20V6H1.5v12z" /></svg>
                                </div>
                                {/* Figma */}
                                <div className="size-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 group-hover:-translate-y-2 transition-transform duration-300 delay-150 shadow-sm border border-orange-100">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-7"><path d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 9 9.5 11 12 11C14.5 11 16.5 9 16.5 6.5C16.5 4 14.5 2 12 2ZM7.5 11.5C5 11.5 3 13.5 3 16C3 18.5 5 20.5 7.5 20.5C10 20.5 12 18.5 12 16V11.5H7.5ZM12 11.5V16C12 18.5 14 20.5 16.5 20.5C19 20.5 21 18.5 21 16C21 13.5 19 11.5 16.5 11.5H12ZM16.5 2C19 2 21 4 21 6.5C21 9 19 11 16.5 11H12V2H16.5Z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                            <div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                <ArrowUpRight className="size-4" />
                            </div>
                        </div>
                    </div>

                    {/* Card 4: Book a call */}
                    <div className="group relative overflow-hidden rounded-[2rem] bg-background border p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex flex-row justify-between gap-4 h-full">
                            <div className="flex flex-col justify-between flex-1">
                                <div className="space-y-2">
                                    <h3 className="font-bold text-xl">Book a call with me</h3>
                                    <p className="text-muted-foreground text-sm max-w-[150px]">
                                        I&apos;d love to chat even if there&apos;s no agenda!
                                    </p>
                                </div>
                                <Button className="w-fit rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90">
                                    Book Now
                                </Button>
                            </div>

                            {/* Calendar Visual */}
                            <div className="w-32 shrink-0 bg-muted/10 rounded-xl border border-border/50 p-3 select-none group-hover:border-primary/20 group-hover:bg-muted/20 transition-colors">
                                <div className="text-[10px] font-semibold mb-2 text-center">January 2026</div>
                                <div className="grid grid-cols-7 gap-1 text-[8px] text-center text-muted-foreground">
                                    <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>

                                    <div className="opacity-20">28</div><div className="opacity-20">29</div><div className="opacity-20">30</div>
                                    <div className="opacity-20">31</div><div>1</div><div>2</div><div>3</div>

                                    <div>4</div><div>5</div><div>6</div><div>7</div><div className="bg-primary text-white rounded-full">8</div><div>9</div><div>10</div>

                                    <div>11</div><div>12</div><div>13</div><div>14</div><div>15</div><div>16</div><div>17</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}