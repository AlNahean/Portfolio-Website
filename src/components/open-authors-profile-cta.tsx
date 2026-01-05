import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { siteConfig } from "@/lib/config"

export function OpenAuthorsProfileCta({ className }: React.ComponentProps<"div">) {
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