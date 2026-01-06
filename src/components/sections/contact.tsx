import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/lib/config";
import { Mail } from "lucide-react";

export function ContactSection() {
    return (
        <section id="contact" className="py-32 container">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mb-8 rotate-3 hover:rotate-0 transition-transform">
                    <Mail className="size-8" />
                </div>
                <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6">
                    Have a project in mind?
                </h2>
                <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                    I'm always interested in discussing new opportunities, whether it's a full-time role, freelance gig, or just a tech chat.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Button size="lg" className="h-14 px-8 rounded-full text-lg" asChild>
                        <a href={siteConfig.author.links.email}>
                            Send me an Email
                        </a>
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg" asChild>
                        <a href={siteConfig.author.links.linkedin} target="_blank">
                            <Icons.linkedin className="mr-2 h-4 w-4" /> Connect on LinkedIn
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    );
}
