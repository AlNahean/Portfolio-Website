import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { blogSource, source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/blog",
    "/docs",
    "/changelog",
    "/journey",
    "/photos",
    "/guestbook",
    "/todo",
    "/upload",
    "/demo",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const blogRoutes = blogSource.getPages().map((page) => ({
    url: `${siteConfig.url}${page.url}`,
    lastModified: page.data.date ? new Date(page.data.date) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const docRoutes = source.getPages().map((page) => ({
    url: `${siteConfig.url}${page.url}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...docRoutes];
}
