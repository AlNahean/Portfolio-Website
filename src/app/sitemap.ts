import { MetadataRoute } from "next";
import { source, studySource } from "@/lib/source";
import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const docsPages = source.getPages().map((page) => ({
    url: `${siteConfig.url}${page.url}`,
    lastModified: page.data.lastModified
      ? new Date(page.data.lastModified)
      : new Date(),
  }));

  const studyPages = studySource.getPages().map((page) => ({
    url: `${siteConfig.url}${page.url}`,
    lastModified: page.data.lastModified
      ? new Date(page.data.lastModified)
      : new Date(),
  }));

  const routes = ["", "/study", "/docs"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  return [...routes, ...docsPages, ...studyPages];
}
