export interface ChangelogItem {
  version: string;
  date: string;
  title: string;
  description: string;
  changes?: string[];
  image?: string; // Optional image URL
}

export const changelogData: ChangelogItem[] = [
  {
    version: "v1.2.0",
    date: "2024-03-20",
    title: "Visual Dashboard Overhaul",
    description:
      "We've completely redesigned the dashboard interface to be more intuitive, visually appealing, and data-rich.",
    changes: [
      "New dashboard layout with drag-and-drop widgets.",
      "Integrated Chart.js for real-time data visualization.",
      "Fixed cumulative layout shifts (CLS) on mobile devices.",
    ],
    image: "/projects/dashboard.png", // Example image
  },
  {
    version: "v1.1.0",
    date: "2024-02-15",
    title: "Dark Mode & Performance",
    description:
      "Major performance improvements and a brand new system-aware dark mode experience.",
    changes: [
      "Dark Mode: Seamless switching based on system preference.",
      "Faster Load Times: Optimized images and font loading strategies.",
      "Mobile Navigation: Improved touch targets and accessibility.",
    ],
    // No image for this release
  },
  {
    version: "v1.0.0",
    date: "2024-01-01",
    title: "Initial Launch",
    description: "The first public release of Nahean's Study Hub.",
    changes: [
      "Docs Engine powered by Next.js and Fumadocs.",
      "Dedicated Study Notes section for Botany.",
      "Integrated Blog for updates and insights.",
    ],
    image: "/projects/portfolio website.png",
  },
];