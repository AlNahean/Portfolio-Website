import { ThemeProvider } from "@/components/theme-provider";

export default function ViewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background antialiased h-screen w-full overflow-hidden">
        <ThemeProvider>
            {children}
        </ThemeProvider>
    </div>
  );
}
