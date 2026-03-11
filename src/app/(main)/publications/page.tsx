import { publicationSource } from "@/lib/source";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function PublicationsIndexPage() {
    const pubs = publicationSource.getPages();

    return (
        <div className="min-h-screen bg-background">
            <SiteHeader />
            <main className="container py-20 px-4">
                <h1 className="text-4xl font-bold mb-12">Research Publications</h1>
                <div className="space-y-6">
                    {pubs.map((p) => (
                        <Link href={p.url} key={p.url} className="block p-6 border rounded-xl hover:border-primary transition-colors">
                            <h2 className="text-xl font-semibold">{p.data.fullTitle ?? p.data.title}</h2>
                            <p className="text-muted-foreground">{p.data.venue}</p>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
