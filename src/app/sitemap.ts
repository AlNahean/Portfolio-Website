import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { blogSource, source, projectSource, publicationSource, caseStudySource, reflectionSource, guidesSource, authorSource, ragSource } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes =[
    "",
    "/blog",
    "/components",
    "/docs",
    "/projects",
    "/case-studies",
    "/reflections",
    "/changelog",
    "/guides",
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

  const projectRoutes = projectSource.getPages().map((page) => ({
    url: `${siteConfig.url}${page.url}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const publicationRoutes = publicationSource.getPages().map((page) => ({
    url: `${siteConfig.url}${page.url}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const caseStudyRoutes = caseStudySource.getPages().map((page) => ({
    url: `${siteConfig.url}${page.url}`,
    lastModified: page.data.date ? new Date(page.data.date) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const reflectionRoutes = reflectionSource.getPages().map((page) => ({
    url: `${siteConfig.url}${page.url}`,
    lastModified: page.data.date ? new Date(page.data.date) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const guidesRoutes = guidesSource.getPages().map((page) => ({
    url: `${siteConfig.url}${page.url}`,
    lastModified: page.data.date ? new Date(page.data.date) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const authorRoutes = authorSource.getPages().map((page) => ({
    url: `${siteConfig.url}${page.url}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const ragRoutes = ragSource.getPages().map((page) => ({
    url: `${siteConfig.url}${page.url}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return[...staticRoutes, ...blogRoutes, ...docRoutes, ...projectRoutes, ...publicationRoutes, ...caseStudyRoutes, ...reflectionRoutes, ...guidesRoutes, ...authorRoutes, ...ragRoutes];
}
