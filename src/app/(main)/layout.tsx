import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollProgress } from "@/components/scroll-progress";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (

    <>
      <ScrollProgress className="bg-primary/20" />
      <div className="flex min-h-screen flex-col">

        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>

    </>
  );
}
