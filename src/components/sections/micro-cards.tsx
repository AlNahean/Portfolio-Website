"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Terminal, Globe, Code2, BrainCircuit, PenTool } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookingCalendar } from "@/components/booking-calendar";

// ----------------------------------------------------------------------
// Reusable Framer Motion Arrow Icon
// ----------------------------------------------------------------------


// idea from https://www.braydoncoyer.dev/ 
const ArrowIcon = () => (
    <motion.div
        variants={{
            initial: { opacity: 0, y: 0, rotate: 6 },
            hover: { opacity: 1, y: -8, rotate: 0 },
        }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-4 right-4 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50"
    >
        <svg className="h-5 w-5 text-purple-600 dark:text-purple-400" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.25 15.25V6.75H8.75"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 7L6.75 17.25"></path>
        </svg>
    </motion.div>
);

export function MicroCardsSection() {
    return (
        <section id="about" className="relative space-y-10 md:space-y-16 py-24 container-wrapper px-6 3xl:fixed:px-0">
            <div className="3xl:fixed:container max-w-6xl mx-auto">

                {/* --- Header Section --- */}
                <div className="space-y-4 mb-16 text-center md:text-left">
                    <span className="text-primary font-bold tracking-widest text-sm uppercase">
                        About
                    </span>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-balance">
                        Here&apos;s what sets me apart and makes me unique
                    </h2>
                </div>

                <div className="relative w-full">
                    {/* --- Bento Grid --- */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-12 lg:grid-rows-[14]">

                        {/* CARD 1: Learn More About Me */}
                        <div className="col-span-1 md:col-span-5 lg:col-span-5 lg:row-span-6">
                            <Link href="/authors/nahean" className="block outline-none h-full">
                                <motion.div
                                    initial="initial"
                                    whileHover="hover"
                                    className="group relative flex flex-col rounded-[2rem] border-2 border-border bg-card p-6 overflow-hidden h-[275px] md:h-[304px] lg:h-[220px]"
                                >
                                    <ArrowIcon />
                                    <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-tl from-purple-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />

                                    <div className="flex h-full relative z-40">
                                        <div className="text-balance flex-1 pr-4">
                                            <h2 className="mb-4 text-base font-bold text-foreground">Learn more about me</h2>
                                            <p className="mb-2 text-sm text-muted-foreground leading-relaxed">
                                                Good afternoon! <br />
                                                I'm Nahean, an experienced full-stack developer.
                                            </p>
                                        </div>
                                        <div className="relative shrink-0">
                                            <div className="inline-block text-center">
                                                <motion.div
                                                    variants={{
                                                        initial: { borderColor: "var(--border)" },
                                                        hover: { borderColor: "#a855f7" }, // purple-500
                                                    }}
                                                    className="rounded-[20px] border p-2 transition-colors duration-500 ease-out"
                                                    style={{ width: "188px", height: "278px" }}
                                                >
                                                    <div className="grid h-full place-items-center rounded-xl border-2 border-border/50 bg-secondary shadow-[inset_0px_2px_1.5px_0px_rgba(0,0,0,0.05)] dark:shadow-[inset_0px_2px_1.5px_0px_rgba(255,255,255,0.05)]" />
                                                </motion.div>
                                            </div>
                                            <motion.img
                                                variants={{
                                                    initial: { rotate: 8, scale: 1 },
                                                    hover: { rotate: 4, scale: 1.05 },
                                                }}
                                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                                className="absolute -top-1 left-0 h-[270px] w-[180px] rounded-lg object-cover shadow-xl grayscale-[0.2]"
                                                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop"
                                                alt="A headshot"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        </div>

                        {/* CARD 2: Connections */}
                        <div className="md:col-span-12 lg:col-span-7 lg:row-span-8 ">
                            <Link href="/connections" className="block outline-none h-full">
                                <motion.div
                                    initial="initial"
                                    whileHover="hover"
                                    className="group relative flex flex-col rounded-[2rem] border-2 border-border bg-card overflow-hidden h-[300px]"
                                >
                                    <ArrowIcon />
                                    <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-tl from-purple-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />

                                    <div className="flex h-full flex-col relative z-20 p-6">
                                        <div className="absolute inset-y-0 left-0 z-20 w-1/3 bg-gradient-to-r from-card to-transparent group-hover:from-muted/30 transition-colors duration-300" />
                                        <div className="absolute inset-y-0 right-0 z-20 w-1/3 bg-gradient-to-l from-card to-transparent group-hover:from-muted/30 transition-colors duration-300" />

                                        <div className="relative h-full overflow-hidden">
                                            {/* Original Background SVG */}
                                            <svg className="absolute left-1/2 top-0 -translate-x-1/2 text-foreground opacity-5 dark:opacity-10" width="704" height="250" viewBox="0 0 637 250">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M-24.5145 175.237C5.95935 205.744 55.3673 205.744 85.8412 175.237C116.315 144.731 116.315 95.2694 85.8412 64.7626C55.3673 34.2558 5.95935 34.2558 -24.5145 64.7626L-79.6924 120L-24.5145 175.237ZM-30.1683 59.1027L-85.3462 114.34L-91 120L-85.3462 125.66L-30.1683 180.897C3.42807 214.53 57.8986 214.53 91.495 180.897C102.486 169.894 109.882 156.654 113.681 142.641C117.481 156.654 124.876 169.894 135.868 180.897C169.464 214.53 223.935 214.53 257.531 180.897L312.709 125.66L318.363 120L312.709 114.34L257.531 59.1027C223.935 25.47 169.464 25.47 135.868 59.1027C124.876 70.106 117.481 83.3459 113.681 97.359C109.882 83.3459 102.486 70.106 91.495 59.1027C57.8986 25.47 3.42807 25.47 -30.1683 59.1027ZM251.877 175.237C221.403 205.744 171.995 205.744 141.522 175.237C111.048 144.731 111.048 95.2694 141.522 64.7626C171.995 34.2558 221.403 34.2558 251.877 64.7626L307.055 120L251.877 175.237ZM385.118 175.237C415.592 205.744 465 205.744 495.474 175.237C525.948 144.731 525.948 95.2694 495.474 64.7626C465 34.2558 415.592 34.2558 385.118 64.7626L329.94 120L385.118 175.237ZM379.464 59.1027L324.287 114.34L318.633 120L324.287 125.66L379.464 180.897C413.061 214.53 467.531 214.53 501.128 180.897C511.657 170.356 518.887 157.762 522.816 144.403C526.746 157.762 533.975 170.356 544.505 180.897C578.101 214.53 632.572 214.53 666.168 180.897L721.346 125.66L727 120L721.346 114.34L666.168 59.1027C632.572 25.47 578.101 25.47 544.505 59.1027C533.975 69.6438 526.746 82.2376 522.816 95.5975C518.887 82.2376 511.657 69.6438 501.128 59.1027C467.531 25.47 413.061 25.47 379.464 59.1027ZM550.159 175.237C580.633 205.744 630.041 205.744 660.514 175.237L715.692 120L660.514 64.7626C630.041 34.2558 580.633 34.2558 550.159 64.7626C519.685 95.2694 519.685 144.731 550.159 175.237Z" fill="currentColor"></path>
                                            </svg>

                                            {/* Center Avatar */}
                                            <span className="absolute left-1/2 top-2.5 -translate-x-1/2">
                                                <div className="relative mt-9">
                                                    <svg className="mx-auto" width="148" height="148" viewBox="0 0 148 148" fill="none">
                                                        <rect x="16" y="16" width="116" height="116" rx="58" className="fill-muted"></rect>
                                                        <motion.rect
                                                            variants={{
                                                                initial: { stroke: "var(--border)" },
                                                                hover: { stroke: "#a855f7" }
                                                            }}
                                                            transition={{ duration: 0.5, delay: 0.2 }}
                                                            x="16.75" y="16.75" width="114.5" height="114.5" rx="57.25" strokeWidth="1.5"
                                                        />
                                                    </svg>
                                                    <img
                                                        className="absolute left-1/2 top-1/2 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-background"
                                                        src="https://api.dicebear.com/7.x/notionists/svg?seed=Nahean&backgroundColor=f4f4f4"
                                                        alt="Me"
                                                    />
                                                </div>
                                            </span>

                                            {/* Floating Avatars */}
                                            <motion.span
                                                className="hidden md:block"
                                                variants={{
                                                    hover: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
                                                }}
                                            >
                                                {[
                                                    { seed: "1", top: "55%", left: "23%", size: "w-12 h-12" },
                                                    { seed: "2", top: "53%", left: "67%", size: "w-16 h-16" },
                                                    { seed: "3", top: "4%", left: "32%", size: "w-14 h-14" },
                                                    { seed: "4", top: "15%", left: "78%", size: "w-10 h-10" },
                                                    { seed: "5", top: "5%", left: "7%", size: "w-9 h-9" },
                                                ].map((avatar, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        variants={{
                                                            initial: { opacity: 0, scale: 0.5, y: 15 },
                                                            hover: { opacity: 1, scale: 1, y: 0 },
                                                        }}
                                                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                                        className={`absolute ${avatar.size} p-1 z-10`}
                                                        style={{ top: avatar.top, left: avatar.left }}
                                                    >
                                                        <div className="rounded-full border border-border bg-background p-1 w-full h-full">
                                                            <img className="rounded-full w-full h-full bg-muted object-cover" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatar.seed}`} alt="Connection" />
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </motion.span>
                                        </div>

                                        <div className="z-20 mt-auto w-full text-balance text-center">
                                            <h2 className="text-base font-bold text-foreground">Connections</h2>
                                            <p className="mt-1 text-sm text-muted-foreground">An evolving list of people I've met and those I wish to meet.</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        </div>

                        {/* CARD 3: Toolbox */}
                        <div className="md:col-span-7 md:row-start-1 lg:col-span-5 lg:row-span-7">
                            <Link href="/toolbox" className="block outline-none h-full">
                                <motion.div
                                    initial="initial"
                                    whileHover="hover"
                                    className="group relative flex flex-col rounded-[2rem] border-2 border-border bg-card p-6 overflow-hidden md:h-[304px] lg:h-[300px]"
                                >
                                    <ArrowIcon />
                                    <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-tl from-purple-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />

                                    <div className="absolute inset-y-0 left-0 z-20 w-1/5 bg-gradient-to-r from-card to-transparent group-hover:from-muted/30 transition-colors duration-300" />
                                    <div className="absolute inset-y-0 right-0 z-20 w-1/5 bg-gradient-to-l from-card to-transparent group-hover:from-muted/30 transition-colors duration-300" />

                                    <div className="z-20 text-center">
                                        <h2 className="text-base font-bold text-foreground">Toolbox</h2>
                                        <p className="mt-1 text-sm text-muted-foreground">Check out my favorite tools and spots around the web.</p>
                                    </div>

                                    <motion.div
                                        className="mt-10 flex items-center justify-center gap-3 z-30 md:mt-12"
                                        variants={{
                                            hover: { transition: { staggerChildren: 0.05 } }
                                        }}
                                    >
                                        {[
                                            { icon: <Terminal className="size-8 text-red-500" />, size: 110 },
                                            { icon: <Globe className="size-8 text-blue-500" />, size: 110 },
                                            { icon: <Code2 className="size-10 text-sky-500" />, size: 130 },
                                            { icon: <BrainCircuit className="size-8 text-purple-500" />, size: 110 },
                                            { icon: <PenTool className="size-8 text-green-500" />, size: 110 },
                                        ].map((tool, idx) => (
                                            <motion.div
                                                key={idx}
                                                variants={{
                                                    initial: { y: 0 },
                                                    hover: { y: -12 }
                                                }}
                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                className="inline-block text-center shrink-0"
                                            >
                                                {/* Original precise DOM structure for the boxes */}
                                                <motion.div
                                                    variants={{
                                                        initial: { borderColor: "var(--border)" },
                                                        hover: { borderColor: "#a855f7" }
                                                    }}
                                                    className="rounded-[20px] border p-2 transition-colors duration-500 bg-background"
                                                    style={{ width: tool.size, height: tool.size }}
                                                >
                                                    <div className="grid h-full place-items-center rounded-xl border-2 hover:border-purple-500/50  bg-secondary shadow-[inset_0px_2px_1.5px_0px_rgba(0,0,0,0.05)] dark:shadow-[inset_0px_2px_1.5px_0px_rgba(255,255,255,0.05)]">
                                                        {tool.icon}
                                                    </div>
                                                </motion.div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            </Link>
                        </div>

                        {/* CARD 4: Book a call */}
                        <div className="md:col-span-12 lg:col-span-7 lg:row-span-5">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="block outline-none h-full cursor-pointer">
                                        <motion.div
                                            initial="initial"
                                            whileHover="hover"
                                            className="group relative flex flex-col rounded-[2rem] border-2 border-border bg-card p-6 overflow-hidden h-[220px]"
                                        >
                                            <ArrowIcon />
                                            <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-tl from-purple-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />

                                            <div className="grid h-full grid-cols-12 gap-5 z-40">
                                                <div className="col-span-5 text-balance md:col-span-5">
                                                    <h2 className="mb-4 text-base font-bold text-foreground">Book a call with me</h2>
                                                    <p className="mb-2 text-sm text-muted-foreground">I'd love to chat even if there's no agenda!</p>
                                                </div>

                                                <div className="absolute left-[43%] top-7 md:-right-14 md:left-auto">
                                                    <motion.div
                                                        variants={{
                                                            initial: { x: 0, y: 0 },
                                                            hover: { x: -24, y: -12 }
                                                        }}
                                                        transition={{ type: "spring", stiffness: 150, damping: 20 }}
                                                    >
                                                        {/* Original exact DOM structure for calendar */}
                                                        <motion.div
                                                            variants={{
                                                                initial: { borderColor: "var(--border)" },
                                                                hover: { borderColor: "#a855f7" }
                                                            }}
                                                            className="h-[278px] w-[550px] rounded-[20px] border p-2 transition-colors duration-300 bg-background"
                                                        >
                                                            <div className="h-full rounded-xl border-2 border-border/50 bg-secondary shadow-[inset_0px_2px_1.5px_0px_rgba(0,0,0,0.05)] dark:shadow-[inset_0px_2px_1.5px_0px_rgba(255,255,255,0.05)] p-3">
                                                                <div className="flex items-center space-x-2">
                                                                    <p className="text-sm text-foreground font-semibold">January, 2026</p>
                                                                    <span className="h-1 w-1 rounded-full bg-muted-foreground/50">&nbsp;</span>
                                                                    <p className="text-xs text-muted-foreground">30 min call</p>
                                                                </div>

                                                                <div className="mt-4 grid grid-cols-7 grid-rows-5 gap-2 px-4">
                                                                    {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(day => (
                                                                        <div key={day} className="col-span-1 row-span-1 flex h-8 w-8 items-center justify-center text-muted-foreground">
                                                                            <span className="font-semibold text-[10px]">{day}</span>
                                                                        </div>
                                                                    ))}

                                                                    {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => {
                                                                        const isAvailable = [5, 7, 8, 9, 10, 13, 22, 23, 25, 29, 30].includes(date);
                                                                        return (
                                                                            <div
                                                                                key={date}
                                                                                className={cn(
                                                                                    "col-span-1 row-span-1 flex h-8 w-8 items-center justify-center rounded transition-colors text-sm font-medium",
                                                                                    isAvailable
                                                                                        ? "bg-background shadow-sm border border-border text-foreground group-hover:bg-purple-500 group-hover:text-white group-hover:border-transparent cursor-pointer"
                                                                                        : "text-muted-foreground/40"
                                                                                )}
                                                                            >
                                                                                <span>{date}</span>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none shadow-none md:max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar">
                                    <DialogTitle className="sr-only">Book a Call</DialogTitle>
                                    <DialogDescription className="sr-only">Schedule a 30-minute call using the calendar.</DialogDescription>
                                    <BookingCalendar embedded />
                                </DialogContent>
                            </Dialog>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

