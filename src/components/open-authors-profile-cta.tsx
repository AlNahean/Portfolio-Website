import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { siteConfig } from "@/lib/config"
import Image from "next/image"
import { Globe, User } from "lucide-react"
import Link from "next/link"

export function OpenAuthorsProfileCta({ className, authors =[] }: React.ComponentProps<"div"> & { authors?: any[] }) {
    // If no authors provided, fallback to siteConfig
    if (!authors || authors.length === 0) {
        return (
            <div
                className={cn(
                    "group bg-card text-card-foreground relative flex flex-col gap-3 rounded-lg border p-4 text-sm",
                    className
                )}
            >
                <div className="text-base font-semibold text-balance">
                    Connect with the Author
                </div>
                <div className="text-muted-foreground">
                    Have questions or suggestions? Feel free to reach out.
                </div>
                <div className="mt-2 flex items-center gap-2">
                    <Button asChild size="icon" variant="outline" className="h-8 w-8">
                        <a href={siteConfig.author.links.github} target="_blank" rel="noreferrer">
                            <Icons.gitHub className="size-4" />
                            <span className="sr-only">GitHub</span>
                        </a>
                    </Button>
                    <Button asChild size="icon" variant="outline" className="h-8 w-8">
                        <a href={siteConfig.author.links.twitter} target="_blank" rel="noreferrer">
                            <Icons.twitter className="size-4 fill-current" />
                            <span className="sr-only">Twitter</span>
                        </a>
                    </Button>
                    <Button asChild size="icon" variant="outline" className="h-8 w-8">
                        <a href={siteConfig.author.links.linkedin} target="_blank" rel="noreferrer">
                            <Icons.linkedin className="size-4" />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                    </Button>
                    <Button asChild size="icon" variant="outline" className="h-8 w-8">
                        <a href={siteConfig.author.links.facebook} target="_blank" rel="noreferrer">
                            <Icons.facebook className="size-4" />
                            <span className="sr-only">Facebook</span>
                        </a>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className={cn("flex flex-col gap-4", className)}>
            {authors.map((author) => (
                <div key={author.url} className="group bg-card text-card-foreground relative flex flex-col gap-3 rounded-lg border p-4 text-sm">
                    <Link href={author.url} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        {author.data.avatar ? (
                            <Image 
                                src={author.data.avatar} 
                                alt={author.data.title} 
                                width={48} 
                                height={48} 
                                className="rounded-full object-cover border border-border shrink-0"
                            />
                        ) : (
                            <div className="size-12 rounded-full bg-muted flex items-center justify-center border border-border shrink-0">
                                <User className="size-6 text-muted-foreground" />
                            </div>
                        )}
                        <div className="min-w-0">
                            <div className="text-base font-semibold text-balance truncate">
                                {author.data.title}
                            </div>
                            {author.data.role && (
                                <div className="text-[10px] font-bold text-primary uppercase tracking-wider truncate">
                                    {author.data.role}
                                </div>
                            )}
                        </div>
                    </Link>
                    
                    <div className="text-muted-foreground text-xs leading-relaxed mt-1">
                        {author.data.bio || "Have questions or suggestions? Feel free to reach out."}
                    </div>
                    
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                        {author.data.github && (
                            <Button asChild size="icon" variant="outline" className="h-8 w-8">
                                <a href={author.data.github} target="_blank" rel="noreferrer">
                                    <Icons.gitHub className="size-4" />
                                    <span className="sr-only">GitHub</span>
                                </a>
                            </Button>
                        )}
                        {author.data.twitter && (
                            <Button asChild size="icon" variant="outline" className="h-8 w-8">
                                <a href={`https://twitter.com/${author.data.twitter.replace('@', '')}`} target="_blank" rel="noreferrer">
                                    <Icons.twitter className="size-4 fill-current" />
                                    <span className="sr-only">Twitter</span>
                                </a>
                            </Button>
                        )}
                        {author.data.linkedin && (
                            <Button asChild size="icon" variant="outline" className="h-8 w-8">
                                <a href={author.data.linkedin} target="_blank" rel="noreferrer">
                                    <Icons.linkedin className="size-4" />
                                    <span className="sr-only">LinkedIn</span>
                                </a>
                            </Button>
                        )}
                        {author.data.website && (
                            <Button asChild size="icon" variant="outline" className="h-8 w-8">
                                <a href={author.data.website} target="_blank" rel="noreferrer">
                                    <Globe className="size-4" />
                                    <span className="sr-only">Website</span>
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}