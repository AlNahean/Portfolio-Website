"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
    className?: string;
}

export function ScrollProgress({ className }: ScrollProgressProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            if (windowHeight === 0) return setProgress(0);

            const scroll = totalScroll / windowHeight;
            setProgress(Number(scroll));
        };

        window.addEventListener("scroll", handleScroll);

        // Initial calculation
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] h-1 bg-transparent",
                className
            )}
        >
            <div
                className="h-full bg-primary transition-all duration-100 ease-out origin-left"
                style={{ width: `${progress * 100}%` }}
            />
        </div>
    );
}