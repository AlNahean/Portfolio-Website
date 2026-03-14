import * as React from "react"
import { Info, AlertTriangle, CheckCircle2, XCircle, Terminal, MessageSquare, Lightbulb, HelpCircle, BookOpen, Zap } from "lucide-react"
import { Alert as BaseAlert, AlertTitle as BaseTitle, AlertDescription as BaseDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

const alertConfig = {
    info: { icon: <Info className="size-4 text-blue-600" />, class: "border-blue-200 bg-blue-50/50 text-blue-900 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-200" },
    warning: { icon: <AlertTriangle className="size-4 text-amber-600" />, class: "border-amber-200 bg-amber-50/50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200" },
    success: { icon: <CheckCircle2 className="size-4 text-emerald-600" />, class: "border-emerald-200 bg-emerald-50/50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200" },
    error: { icon: <XCircle className="size-4 text-red-600" />, class: "border-red-200 bg-red-50/50 text-red-900 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200" },
    note: { icon: <MessageSquare className="size-4 text-zinc-600" />, class: "border-zinc-200 bg-zinc-50/50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/30 dark:text-zinc-200" },
    tip: { icon: <Lightbulb className="size-4 text-purple-600" />, class: "border-purple-200 bg-purple-50/50 text-purple-900 dark:border-purple-900 dark:bg-purple-950/30 dark:text-purple-200" },
    important: { icon: <HelpCircle className="size-4 text-rose-600" />, class: "border-rose-200 bg-rose-50/50 text-rose-900 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-200" },
    bug: { icon: <Terminal className="size-4 text-orange-600" />, class: "border-orange-200 bg-orange-50/50 text-orange-900 dark:border-orange-900 dark:bg-orange-950/30 dark:text-orange-200" },
    default: { icon: <Info className="size-4" />, class: "border-border bg-muted/30" }
};

export function Alert({ variant = "default", title, children, className, ...props }: any) {
    const active = alertConfig[variant as keyof typeof alertConfig] || alertConfig.default;

    return (
        <BaseAlert className={cn("my-6 rounded-lg border", active.class, className)} {...props}>
            {/* 
               We remove border-l-4 and use full borders to make it look like a 
               proper Alert block instead of a side-striped callout.
            */}
            {active.icon}
            {title && <BaseTitle className="font-bold mb-1">{title}</BaseTitle>}
            <BaseDescription className="text-sm opacity-90">{children}</BaseDescription>
        </BaseAlert>
    )
}

export const AlertTitle = BaseTitle
export const AlertDescription = BaseDescription