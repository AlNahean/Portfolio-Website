import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/docs/:path*.md",
        destination: "/llm/:path*",
      },
      {
        source: "/study/:path*.md",
        destination: "/llm/:path*",
      },
      {
        source: "/blog/:path*.md",
        destination: "/llm/:path*",
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);