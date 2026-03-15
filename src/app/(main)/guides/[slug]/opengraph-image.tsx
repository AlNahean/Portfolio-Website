import { ImageResponse } from "next/og";
import { guidesSource } from "@/lib/source";
import { loadOgFonts } from "@/lib/og-helper";

export async function generateImageMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;
    const page = guidesSource.getPage([slug]);
    return [
        {
            alt: page?.data.title || "Guide",
            size: { width: 1200, height: 630 },
            contentType: "image/png",
        },
    ];
}

export default async function Image({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;
    const page = guidesSource.getPage([slug]);
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
                        {page?.data.title || "Guide"}
                    </div>
                    <div
                        tw="text-[40px] leading-[1.5] flex-grow-1 text-stone-400 mt-4"
                        style={{
                            fontWeight: 500,
                            textWrap: "balance",
                            fontFamily: "Geist Mono"
                        }}
                    >
                        {page?.data.description || "Read more in the guides"}
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            fonts,
        }
    );
}
