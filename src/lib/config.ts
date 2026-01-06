export const siteConfig = {
  name: "Nahean Fardous",
  url: "https://nahean.dev",
  ogImage: "https://nahean.dev/og.png",
  description:
    "Full-Stack Engineer specializing in React, Next.js, and scalable web architecture.",
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
    { href: "#about", label: "About" },
    { href: "#projects", label: "Work" },
    { href: "#contact", label: "Contact" },
  ],
  footerText: "© 2024 Nahean Fardous. Crafted with Next.js.",
};

export type SiteConfig = typeof siteConfig;