import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";

export const runtime = "edge";

export const size = {
    width: 32,
    height: 32,
};
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 24,
                    background: "#0a0a0a",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    borderRadius: "8px",
                    fontFamily: "Geist, sans-serif",
                    fontWeight: 600,
                }}
            >
                {siteConfig.name.charAt(0)}
            </div>
        ),
        {
            ...size,
        }
    );
}