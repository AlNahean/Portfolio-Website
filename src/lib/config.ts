export const siteConfig = {
  name: "Nahean Fardous | Full-Stack Developer & Bioinformatician",
  url: "https://nahean.vercel.app",
  ogImage: "https://nahean.vercel.app/opengraph-image",
  description:
    "I bridge the gap between complex biological data analysis and robust web software.",
  author: {
    name: "Nahean Fardous",
    links: {
      twitter: "https://x.com/nahean95",
      github: "https://github.com/AlNahean",
      linkedin: "https://www.linkedin.com/in/nahean-fardous-30b8a9238/",
      facebook: "https://www.facebook.com/al.nahean.2025/", // Restored
      email: "mailto:nahean.fardous@gmail.com",
    },
  },
  navItems: [
    { href: "/", label: "Home" },
    { href: "/blocks", label: "Blocks" },
    { href: "/components", label: "Components" },
    { href: "/blog", label: "Blog" },
    { href: "/docs", label: "Docs" },
    { href: "/rag", label: "RAG" },
    { href: "/guides", label: "Guides" },
    { href: "#about", label: "About" },
    { href: "/projects", label: "Work" },
    { href: "#contact", label: "Contact" },
  ],
  footerText: "© 2024 Nahean Fardous. Crafted with Next.js.",
};

export type SiteConfig = typeof siteConfig;