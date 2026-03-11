import { ThemeProvider } from "@/components/theme-provider";

export default function ViewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background antialiased min-h-screen w-full">
        <ThemeProvider>
            {children}
        </ThemeProvider>
    </div>
  );
}
