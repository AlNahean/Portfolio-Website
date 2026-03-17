import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import BioToolboxClient from "./_components/bio-toolbox-client";

export const metadata = {
  title: "BioToolbox | Al Nahean",
  description: "A suite of bioinformatics tools and sequence analysis utilities.",
};

export default function BioToolboxPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container-wrapper 3xl:fixed:px-0 px-4 py-8">
        <BioToolboxClient />
      </main>
      <SiteFooter />
    </div>
  );
}
