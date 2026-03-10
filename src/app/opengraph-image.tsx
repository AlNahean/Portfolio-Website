import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";
import { loadOgFonts } from "@/lib/og-helper";

export const runtime = "edge";
export const alt = "Nahean Fardous Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    const fonts = await loadOgFonts();

    return new ImageResponse(
        (
            <div
                tw="flex h-full w-full bg-black text-white"
                style={{ fontFamily: "Geist" }}
            >
                <div tw="flex border absolute border-stone-700 border-dashed inset-y-0 left-16 w-[1px]" />
                <div tw="flex border absolute border-stone-700 border-dashed inset-y-0 right-16 w-[1px]" />
                <div tw="flex border absolute border-stone-700 inset-x-0 h-[1px] top-16" />
                <div tw="flex border absolute border-stone-700 inset-x-0 h-[1px] bottom-16" />
                <div tw="flex absolute flex-row bottom-24 right-24 text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                        width={48}
                        height={48}
                    >
                        <rect width="256" height="256" fill="none"></rect>
                        <line
                            x1="208"
                            y1="128"
                            x2="128"
                            y2="208"
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="32"
                        ></line>
                        <line
                            x1="192"
                            y1="40"
                            x2="40"
                            y2="192"
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="32"
                        ></line>
                    </svg>
                </div>
                <div tw="flex flex-col absolute w-[896px] justify-center inset-32">
                    <div
                        tw="tracking-tight flex-grow-1 flex flex-col justify-center leading-[1.1]"
                        style={{
                            textWrap: "balance",
                            fontWeight: 600,
                            fontSize: 80,
                            letterSpacing: "-0.04em",
                        }}
                    >
                        {siteConfig.name}
                    </div>
                    <div
                        tw="text-[40px] leading-[1.5] flex-grow-1 text-stone-400 mt-4"
                        style={{
                            fontWeight: 500,
                            textWrap: "balance",
                        }}
                    >
                        {siteConfig.description}
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
            fonts,
        }
    );
}
