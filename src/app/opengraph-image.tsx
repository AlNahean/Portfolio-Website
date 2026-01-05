import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";

export const runtime = "edge";

export const alt = siteConfig.name;
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    backgroundImage:
                        "linear-gradient(to bottom right, #e5e5e5 25%, #ffffff 50%, #e5e5e5 75%)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        padding: "0 4rem",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "4.5rem",
                            fontWeight: 700,
                            lineHeight: 1.1,
                            color: "#111",
                            fontFamily: "Geist, sans-serif",
                        }}
                    >
                        Botany Suggestions
                    </h1>
                    <p
                        style={{
                            fontSize: "1.75rem",
                            marginTop: "1.5rem",
                            color: "#555",
                            lineHeight: 1.4,
                            fontFamily: "Geist, sans-serif",
                        }}
                    >
                        Botany Suggestions for hons 2nd year exam
                    </p>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
