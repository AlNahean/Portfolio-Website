export const siteConfig = {
  name: "Nahean",
  url: "https://nahean-study-hub.netlify.app", // Example URL, you can change this
  ogImage: "https://nahean-study-hub.netlify.app/og.jpg", // Example OG image URL
  description:
    "A personal knowledge base for mastering Botany. Built for clarity, speed, and focus.",
  author: {
    name: "Nahean Fardous",
    links: {
      twitter: "https://x.com/nahean95",
      github: "https://github.com/AlNahean",
      linkedin: "https://www.linkedin.com/in/nahean-fardous-30b8a9238/",
      facebook: "https://www.facebook.com/al.nahean.2025/",
    },
  },
  navItems: [
    { href: "/", label: "Home" },
    {
      href: "/study",
      label: "Study",
    },
    {
      href: "/blog",
      label: "Blog",
    },
  ],
  footerText: "Built by Nahean Fardous.",
};

export type SiteConfig = typeof siteConfig;

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};