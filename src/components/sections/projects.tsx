import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";

const PROJECTS = [
    {
        id: 1,
        title: "Hyper Admin Dashboard",
        description: "A comprehensive React admin dashboard featuring dynamic charts, dark/light mode switching, and modular component architecture using Chart.js.",
        tech: ["React", "Chart.js", "Bootstrap", "SCSS"],
        video: "/projects/video/2023-02-18 10-06-24.mp4",
        image: "/projects/hyper admin dashboard.png",
        live: "https://admin-dashboard-react-chartjs.netlify.app/e-commerse",
        github: "https://github.com/AlNahean/Admin-Dashboard",
    },
    {
        id: 15,
        title: "Tasky",
        description: "A high-performance task management application built with Next.js server actions and optimistic UI updates.",
        tech: ["Next.js", "Server Actions", "Prisma", "Tailwind"],
        video: "/projects/video/Https   Next-Js-Projects-Pf8p.Vercel.App Tasky.mp4",
        image: "/projects/localhost_3000_tasky (1).png",
        live: "https://next-js-projects-pf8p.vercel.app/tasky",
        github: "https://github.com/AlNahean/next-js-projects",
    },
    {
        id: 3,
        title: "Daraz E-Commerce Clone",
        description: "Full-stack e-commerce platform replica with cart management, user authentication, and backend integration using Node.js.",
        tech: ["React", "Node.js", "Express", "MongoDB"],
        video: "/projects/video/2022-04-20 14-24-43.mp4",
        image: "/projects/daraz clone.png",
        live: "https://ecommerce-clone-daraz.netlify.app/",
        github: "https://github.com/AlNahean/daraz-clone-client",
    },
    {
        id: 6,
        title: "AI Image Generator",
        description: "SaaS application leveraging OpenAI's DALL-E API to generate custom images from text prompts.",
        tech: ["React", "OpenAI API", "Vite"],
        video: "", // No video available
        image: "/projects/image-generator.png",
        live: "https://openaiapi.vercel.app/openai/generate-image",
        github: "https://github.com/AlNahean/openaiapi",
    },
    {
        id: 7,
        title: "AI Text Generator",
        description: "An AI-powered text completion tool capable of answering questions and generating creative writing using GPT-3.",
        tech: ["React", "OpenAI API", "Vite"],
        video: "", // No video available
        image: "/projects/text-generator.png",
        live: "https://openaiapi.vercel.app/openai/text-completion",
        github: "https://github.com/AlNahean/openaiapi",
    },
    {
        id: 8,
        title: "Casio Watch Slider",
        description: "A highly interactive product slider built with Next.js, featuring smooth transitions and product detailing.",
        tech: ["Next.js", "Framer Motion", "Tailwind"],
        video: "/projects/video/Localhost 3000 Casio-Slider.mp4",
        image: "/projects/localhost_3000_casio-slider.png",
        live: "https://next-js-projects-pf8p.vercel.app/casio-slider",
        github: "https://github.com/AlNahean/next-js-projects",
    },
    {
        id: 14,
        title: "Shoe Showcase",
        description: "An interactive product showcase with smooth animations, color switching, and detail zooming.",
        tech: ["Next.js", "Framer Motion", "Tailwind"],
        video: "/projects/video/Localhost 3000 Shoe-Showcase.mp4",
        image: "/projects/localhost_3000_shoe-showcase.png",
        live: "https://next-js-projects-pf8p.vercel.app/shoe-showcase",
        github: "https://github.com/AlNahean/next-js-projects",
    },
    {
        id: 5,
        title: "Phoenix Agency",
        description: "A modern, high-conversion agency landing page featuring GSAP animations, clean typography, and a responsive layout.",
        tech: ["React", "GSAP", "Bootstrap"],
        video: "/projects/video/React App.mp4",
        image: "/projects/phoenix-clone.png",
        live: "https://phoenix-clone.netlify.app/",
        github: "https://github.com/AlNahean/phoenix-landing-page",
    },
    {
        id: 2,
        title: "Legacy Portfolio",
        description: "My previous portfolio website built with React. Features a unique cyberpunk aesthetic, 3D models, and custom animations.",
        tech: ["React", "Three.js", "GSAP", "SCSS"],
        video: "", // No video available
        image: "/projects/portfolio website.png",
        live: "https://nahean.netlify.app/",
        github: "https://github.com/AlNahean/Portfolio-Website",
    },
    {
        id: 4,
        title: "Rick and Morty Wiki",
        description: "A frontend application consuming the Rick and Morty API. Features character search, pagination, and detailed character views.",
        tech: ["React", "REST API", "Bootstrap"],
        video: "/projects/video/React App (2).mp4",
        image: "/projects/rick-and-morty.png",
        live: "https://rick-and-morty-wiikii.netlify.app/",
        github: "https://github.com/AlNahean/rick-and-morty",
    },
    {
        id: 9,
        title: "Discover World",
        description: "A travel concept website featuring immersive parallax scrolling and dynamic destination cards.",
        tech: ["Next.js", "CSS Modules", "React"],
        video: "/projects/video/Localhost 3000 Discover-World.mp4",
        image: "/projects/localhost_3000_discover-world.png",
        live: "https://next-js-projects-pf8p.vercel.app/discover-world",
        github: "https://github.com/AlNahean/next-js-projects",
    },
    {
        id: 10,
        title: "Modern Grid Layout",
        description: "An experimental grid-based website layout testing modern CSS Grid capabilities and responsive design patterns.",
        tech: ["Next.js", "CSS Grid", "React"],
        video: "/projects/video/Localhost 3000 Grid-Website.mp4",
        image: "/projects/localhost_3000_grid-website.png",
        live: "https://next-js-projects-pf8p.vercel.app/grid-website",
        github: "https://github.com/AlNahean/next-js-projects",
    },
    {
        id: 11,
        title: "Netflix Redesign",
        description: "A UI redesign concept for Netflix, focusing on improved content discovery and visual hierarchy.",
        tech: ["Next.js", "Tailwind CSS", "TMDB API"],
        video: "/projects/video/Localhost 3000 Home.mp4",
        image: "/projects/localhost_3000_home.png",
        live: "https://next-js-projects-pf8p.vercel.app/netflix-redesign",
        github: "https://github.com/AlNahean/next-js-projects",
    },
    {
        id: 12,
        title: "Instagram Redesign",
        description: "A fresh take on the Instagram web interface, implementing a cleaner layout and improved dark mode support.",
        tech: ["Next.js", "Tailwind CSS", "React Icons"],
        video: "/projects/video/Localhost 3000 Instagram-Redesign.mp4",
        image: "/projects/localhost_3000_instagram-redesign.png",
        live: "https://next-js-projects-pf8p.vercel.app/instagram-redesign",
        github: "https://github.com/AlNahean/next-js-projects",
    },
    {
        id: 13,
        title: "Knives Slider",
        description: "A showcase slider for culinary knives, emphasizing product photography and smooth interactions.",
        tech: ["Next.js", "Framer Motion", "React"],
        video: "/projects/video/Localhost 3000 Knives-Slider.mp4",
        image: "/projects/localhost_3000_knives-slider.png",
        live: "https://next-js-projects-pf8p.vercel.app/knives-slider",
        github: "https://github.com/AlNahean/next-js-projects",
    },
];

export function ProjectsSection() {
    return (
        <section id="projects" className="py-24 bg-muted/30 border-y scroll-mt-16">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <div className="space-y-2">
                        <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
                            All Projects
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            A complete archive of my work, ranging from full-stack applications to UI experiments. Hover over cards to preview.
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        <a href="https://github.com/AlNahean" target="_blank">
                            View GitHub Profile
                        </a>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}