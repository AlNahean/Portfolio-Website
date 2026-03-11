import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function CaseStudyCard({ study }: { study: any }) {
    return (
        <Link href={study.url} className="group relative flex flex-col md:flex-row gap-6 lg:gap-10 border rounded-3xl p-4 lg:p-6 bg-card hover:bg-muted/20 transition-colors hover:border-primary/30">
            <div className="relative aspect-video md:aspect-[4/3] md:w-2/5 overflow-hidden rounded-2xl bg-muted shrink-0">
                <Image
                    src={study.data.image}
                    alt={study.data.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            
            <div className="flex flex-col justify-center flex-1 py-2 pr-4">
                <div className="flex flex-wrap gap-2 mb-4">
                    {study.data.tags?.slice(0, 3).map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="bg-primary/5 text-primary border-primary/10">
                            {tag}
                        </Badge>
                    ))}
                </div>
                
                <h3 className="font-heading text-2xl lg:text-3xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors">
                    {study.data.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                    {study.data.description}
                </p>
                
                <div className="mt-auto flex items-center text-sm font-semibold text-foreground">
                    Read Case Study <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </Link>
    );
}
