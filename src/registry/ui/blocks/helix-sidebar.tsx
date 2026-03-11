"use client";

import * as React from "react";
import { 
    LayoutDashboard, 
    Settings, 
    Database, 
    Microscope, 
    Dna, 
    ChevronRight,
    Search,
    Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function HelixSidebar() {
    return (
        <div className="flex h-[600px] w-full max-w-[280px] flex-col border-r bg-background">
            <div className="flex h-14 items-center border-b px-4 gap-2">
                <Dna className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg tracking-tight">Helix Labs</span>
            </div>
            
            <div className="flex-1 overflow-auto py-4">
                <div className="px-3 mb-4">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Quick search..."
                            className="w-full bg-muted/50 rounded-md py-2 pl-9 pr-4 text-sm outline-none focus:ring-1 focus:ring-primary/20"
                        />
                    </div>
                </div>

                <div className="space-y-1 px-2">
                    <NavItem icon={<LayoutDashboard className="h-4 w-4" />} label="Dashboard" active />
                    <NavItem icon={<Database className="h-4 w-4" />} label="Data Repository" />
                    <NavItem icon={<Microscope className="h-4 w-4" />} label="Specimen Analysis" />
                    <NavItem icon={<Dna className="h-4 w-4" />} label="Genomic Viewer" />
                </div>

                <div className="mt-8 px-4">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Projects</h4>
                    <div className="space-y-1">
                        <ProjectItem label="Project Alpha-9" color="bg-blue-500" />
                        <ProjectItem label="Genomic Sequencing" color="bg-green-500" />
                        <ProjectItem label="Lab Experiments" color="bg-purple-500" />
                    </div>
                </div>
            </div>

            <div className="mt-auto border-t p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">NF</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">Nahean F.</span>
                        <span className="text-xs text-muted-foreground">Pro Researcher</span>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <button
            className={cn(
                "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
        >
            {icon}
            <span>{label}</span>
            {active && <ChevronRight className="ml-auto h-4 w-4" />}
        </button>
    );
}

function ProjectItem({ label, color }: { label: string, color: string }) {
    return (
        <button className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors group">
            <div className={cn("h-2 w-2 rounded-full", color)} />
            <span className="truncate">{label}</span>
        </button>
    );
}
