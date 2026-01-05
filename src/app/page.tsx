// import { SiteFooter } from "@/components/site-footer";
// import { SiteHeader } from "@/components/site-header";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Kbd } from "@/components/ui/kbd";
// import Link from "next/link";
// import {
//   ArrowRight,
//   BookOpen,
//   Code,
//   FileText,
//   Github,
//   Library,
//   Lightbulb,
//   Rocket,
//   Search,
//   Sparkles,
//   Scale,
// } from "lucide-react";

// // A minimal, clean-looking card for navigation
// const LinkedCard = ({
//   href,
//   children,
//   className,
// }: {
//   href: string;
//   children: React.ReactNode;
//   className?: string;
// }) => (
//   <Link
//     href={href}
//     className={`group block overflow-hidden rounded-lg border bg-transparent text-card-foreground transition-all duration-300 ease-in-out hover:border-foreground/30 hover:bg-muted/30 hover:shadow-sm ${className}`}
//   >
//     {children}
//   </Link>
// );

// // A reusable component for listing features with icons
// const FeatureItem = ({
//   icon: Icon,
//   title,
//   children,
// }: {
//   icon: React.ElementType;
//   title: string;
//   children: React.ReactNode;
// }) => (
//   <div className="flex items-start gap-4">
//     <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border bg-background">
//       <Icon className="size-5 text-muted-foreground" />
//     </div>
//     <div>
//       <h3 className="text-xl font-semibold">{title}</h3>
//       <p className="text-muted-foreground mt-1 text-balance">{children}</p>
//     </div>
//   </div>
// );

// export default function Home() {
//   return (
//     <div className="flex min-h-screen flex-col bg-background text-foreground">
//       <SiteHeader />
//       <main className="flex-1">
//         {/* --- Hero Section --- */}
//         <section className="w-full py-28 md:py-36 lg:py-48">
//           <div className="container px-4 text-center md:px-6">
//             <div className="mx-auto flex max-w-3xl flex-col items-center space-y-6">
//               <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
//                 Nahean's Study Hub
//               </h1>
//               <p className="text-muted-foreground max-w-2xl text-lg md:text-xl">
//                 A personal knowledge base for mastering Botany. Built for clarity, speed, and focus.
//               </p>
//               <div className="mt-6 flex flex-col gap-4 sm:flex-row">
//                 <Button asChild size="lg">
//                   <Link href="/study/higher-cryptogams/answer">
//                     Start Studying <ArrowRight className="ml-2 size-4" />
//                   </Link>
//                 </Button>
//                 <Button asChild size="lg" variant="outline">
//                   <a href="https://github.com/alnahean" target="_blank" rel="noopener noreferrer">
//                     <Github className="mr-2 size-4" /> View on GitHub
//                   </a>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* --- Introduction Section --- */}
//         <section className="w-full border-y bg-muted/30 py-20 md:py-24">
//           <div className="container px-4 md:px-6">
//             <div className="mx-auto max-w-3xl text-center">
//               <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
//                 From Personal Notes to a Public Resource
//               </h2>
//               <p className="text-muted-foreground mt-4 text-lg text-balance">
//                 This project began as a simple need: to organize complex botany notes into a clear, searchable format. It evolved into a demonstration of how modern web technologies can transform the way we learn and share knowledge.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* --- Subjects Section --- */}
//         <section className="w-full py-20 md:py-24 lg:py-32 relative overflow-hidden">
//           {/* Decorative background elements */}
//           <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-muted/30 to-transparent rounded-full blur-3xl" />
//           <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-muted/30 to-transparent rounded-full blur-3xl" />

//           <div className="container px-4 md:px-6 relative">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-3">
//                 <div className="inline-block">
//                   <h2 className="font-heading text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
//                     Explore The Core Subjects
//                   </h2>
//                   <div className="mt-2 h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-foreground/50 to-transparent rounded-full" />
//                 </div>
//                 <p className="text-muted-foreground mx-auto max-w-3xl text-balance md:text-xl/relaxed">
//                   Detailed notes, curated from trusted suggestions, and organized for focused study.
//                 </p>
//               </div>
//             </div>

//             <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
//               {/* Card 1 */}
//               <a
//                 href="/study/higher-cryptogams/answer"
//                 className="group relative overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-muted/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 <div className="p-6 pb-4">
//                   <div className="relative">
//                     <div className="absolute inset-0 bg-muted/40 rounded-xl blur-xl" />
//                     <div className="relative flex size-14 items-center justify-center rounded-xl border-2 bg-background shadow-lg">
//                       <BookOpen className="size-7 text-muted-foreground" strokeWidth={2.5} />
//                     </div>
//                   </div>
//                   <h3 className="mt-4 text-xl font-bold tracking-tight">Higher Cryptogams</h3>
//                 </div>
//                 <div className="px-6 pb-6">
//                   <p className="text-muted-foreground leading-relaxed">
//                     Dive into the world of Bryophytes and Pteridophytes. Explore their characteristics, life cycles, and economic importance.
//                   </p>
//                 </div>
//               </a>

//               {/* Card 2 */}
//               <a
//                 href="/study/plant-anatomy/answers"
//                 className="group relative overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-muted/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 <div className="p-6 pb-4">
//                   <div className="relative">
//                     <div className="absolute inset-0 bg-muted/40 rounded-xl blur-xl" />
//                     <div className="relative flex size-14 items-center justify-center rounded-xl border-2 bg-background shadow-lg">
//                       <Scale className="size-7 text-muted-foreground" strokeWidth={2.5} />
//                     </div>
//                   </div>
//                   <h3 className="mt-4 text-xl font-bold tracking-tight">Plant Anatomy</h3>
//                 </div>
//                 <div className="px-6 pb-6">
//                   <p className="text-muted-foreground leading-relaxed">
//                     Uncover the internal structure of plants. Learn about tissues, cellular components, growth, and the systems that support plant life.
//                   </p>
//                 </div>
//               </a>

//               {/* Card 3 */}
//               <a
//                 href="/study/taxonomy-of-angiosperms/answers"
//                 className="group relative overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-muted/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 <div className="p-6 pb-4">
//                   <div className="relative">
//                     <div className="absolute inset-0 bg-muted/40 rounded-xl blur-xl" />
//                     <div className="relative flex size-14 items-center justify-center rounded-xl border-2 bg-background shadow-lg">
//                       <Library className="size-7 text-muted-foreground" strokeWidth={2.5} />
//                     </div>
//                   </div>
//                   <h3 className="mt-4 text-xl font-bold tracking-tight">Taxonomy of Angiosperms</h3>
//                 </div>
//                 <div className="px-6 pb-6">
//                   <p className="text-muted-foreground leading-relaxed">
//                     Master the classification of flowering plants. This section covers taxonomic principles, family characteristics, and nomenclature.
//                   </p>
//                 </div>
//               </a>
//             </div>
//           </div>
//         </section>

//         {/* --- Features Section --- */}
//         <section className="bg-muted/30 w-full border-y py-20 md:py-24 lg:py-32">
//           <div className="container grid max-w-6xl items-start gap-12 px-4 md:px-6 lg:grid-cols-2">
//             <div className="space-y-4">
//               <Badge variant="outline">Why it works</Badge>
//               <h2 className="font-heading text-3xl font-bold tracking-tighter sm:text-4xl">A Tool for Focused Learning</h2>
//               <p className="text-muted-foreground text-lg">
//                 Beyond just text on a screen, this platform incorporates features designed to enhance the study experience.
//               </p>
//             </div>
//             <div className="grid gap-8">
//               <FeatureItem icon={Rocket} title="Built for Speed">
//                 Powered by Next.js and hosted on Vercel, the site is incredibly fast. Access your notes instantly without waiting for slow page loads.
//               </FeatureItem>
//               <FeatureItem icon={Search} title="Instant Search">
//                 Find any topic or question across all subjects with a powerful global search. Just press <Kbd>⌘</Kbd> + <Kbd>K</Kbd>.
//               </FeatureItem>
//               <FeatureItem icon={Sparkles} title="Clean & Minimalist UI">
//                 The interface is designed to be clean and distraction-free, letting you focus on the content.
//               </FeatureItem>
//             </div>
//           </div>
//         </section>

//         {/* --- Tech Stack & Philosophy --- */}
//         <section className="w-full py-20 md:py-24 lg:py-32">
//           <div className="container grid max-w-6xl items-center gap-16 px-4 md:px-6 lg:grid-cols-2">
//             <div className="space-y-4">
//               <Badge variant="outline">The Technology</Badge>
//               <h2 className="font-heading text-3xl font-bold tracking-tighter sm:text-4xl">The Tools Behind the Hub</h2>
//               <p className="text-muted-foreground text-lg">
//                 Leveraging the best of the modern web ecosystem to create a high-quality, maintainable, and performant platform.
//               </p>
//               <div className="mt-4 flex flex-wrap gap-2">
//                 <Badge variant="secondary" className="px-3 py-1">Next.js</Badge>
//                 <Badge variant="secondary" className="px-3 py-1">React</Badge>
//                 <Badge variant="secondary" className="px-3 py-1">TypeScript</Badge>
//                 <Badge variant="secondary" className="px-3 py-1">Tailwind CSS</Badge>
//                 <Badge variant="secondary" className="px-3 py-1">Shadcn UI</Badge>
//                 <Badge variant="secondary" className="px-3 py-1">Fumadocs</Badge>
//               </div>
//             </div>
//             <div className="grid gap-8">
//               <FeatureItem icon={Code} title="Open Source & Modern">
//                 The entire project is built with a modern tech stack and is completely open source on GitHub. It serves as a real-world example of a documentation site.
//               </FeatureItem>
//               <FeatureItem icon={FileText} title="Content-First with MDX">
//                 All notes are written in MDX, allowing for rich content that blends text with interactive React components for a more dynamic learning experience.
//               </FeatureItem>
//               <FeatureItem icon={Lightbulb} title="A Living Project">
//                 This is an ongoing project. New notes and features will be added over time. Contributions and suggestions are always welcome.
//               </FeatureItem>
//             </div>
//           </div>
//         </section>
//       </main>
//       <SiteFooter />
//     </div>
//   );
// }

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Github,
  Library,
  Scale,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">
        {/* --- Hero Section --- */}
        <section className="w-full py-28 md:py-36 lg:py-48">
          <div className="container px-4 text-center md:px-6">
            <div className="mx-auto flex max-w-3xl flex-col items-center space-y-6">
              <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Nahean's Study Hub
              </h1>
              <p className="text-muted-foreground max-w-2xl text-lg md:text-xl">
                A personal knowledge base for mastering Botany. Built for clarity, speed, and focus.
              </p>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/study">
                    Start Studying <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="https://github.com/AlNahean" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 size-4" /> View on GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* --- Subjects Section --- */}
        <section className="w-full border-t bg-muted/30 py-20 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-3">
                <h2 className="font-heading text-3xl font-bold tracking-tighter sm:text-5xl">
                  Explore The Core Subjects
                </h2>
                <p className="text-muted-foreground mx-auto max-w-3xl text-balance md:text-xl/relaxed">
                  Detailed notes, curated from trusted suggestions, and organized for focused study.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card 1 */}
              <Link
                href="/study/higher-cryptogams/answers"
                className="block rounded-lg border bg-card p-6 transition-colors hover:bg-muted/50"
              >
                <div className="flex size-12 items-center justify-center rounded-lg border bg-background">
                  <BookOpen className="size-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Higher Cryptogams</h3>
                <p className="text-muted-foreground mt-2 text-balance">
                  Dive into the world of Bryophytes and Pteridophytes. Explore their characteristics, life cycles, and economic importance.
                </p>
              </Link>

              {/* Card 2 */}
              <Link
                href="/study/plant-anatomy/answers"
                className="block rounded-lg border bg-card p-6 transition-colors hover:bg-muted/50"
              >
                <div className="flex size-12 items-center justify-center rounded-lg border bg-background">
                  <Scale className="size-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Plant Anatomy</h3>
                <p className="text-muted-foreground mt-2 text-balance">
                  Uncover the internal structure of plants, from tissues and cells to overall growth and development.
                </p>
              </Link>

              {/* Card 3 */}
              <Link
                href="/study/taxonomy-of-angiosperms/answers"
                className="block rounded-lg border bg-card p-6 transition-colors hover:bg-muted/50"
              >
                <div className="flex size-12 items-center justify-center rounded-lg border bg-background">
                  <Library className="size-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Taxonomy of Angiosperms</h3>
                <p className="text-muted-foreground mt-2 text-balance">
                  Master the classification of flowering plants, covering principles, family characteristics, and nomenclature.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}