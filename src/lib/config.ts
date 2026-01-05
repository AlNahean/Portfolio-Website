export const siteConfig = {
  name: "Nahean",
  url: "https://botany-suggestions.vercel.app",
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
  ],
  footerText: "Built by Nahean Fardous.",
};

export type SiteConfig = typeof siteConfig;

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};
