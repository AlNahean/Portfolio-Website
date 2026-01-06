import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";

export const runtime = "edge";
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
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
                    backgroundColor: "#09090b", // Zinc 950
                    backgroundImage: "radial-gradient(circle at 25px 25px, #27272a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #27272a 2%, transparent 0%)",
                    backgroundSize: "100px 100px",
                    color: "white",
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                    {/* Abstract Logo Shape */}
                    <div style={{ width: 60, height: 60, background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', borderRadius: '12px' }} />
                </div>

                <h1 style={{ fontSize: 80, fontWeight: 800, letterSpacing: '-0.05em', margin: 0, fontFamily: 'sans-serif' }}>
                    {siteConfig.name}
                </h1>
                <p style={{ fontSize: 32, color: '#a1a1aa', marginTop: 20, fontFamily: 'monospace' }}>
                    Full-Stack Developer & UI Specialist
                </p>
            </div>
        ),
        { ...size }
    );
}
