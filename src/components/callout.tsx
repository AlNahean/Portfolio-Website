import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
    Info,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    HelpCircle,
    Lightbulb,
    MessageSquare,
    Terminal
} from "lucide-react"

export function Callout({
    title,
    children,
    className,
    variant = "default",
    ...props
}: React.ComponentProps<typeof Alert> & {
    variant?: "default" | "info" | "warning" | "success" | "error" | "note" | "tip" | "important" | "bug"
}) {
    // Map variants to specific icons and base colors
    const config = {
        default: { icon: <Info className="size-4" />, color: "border-border" },
        info: { icon: <Info className="size-4 text-blue-500" />, color: "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20" },
        warning: { icon: <AlertTriangle className="size-4 text-amber-500" />, color: "border-amber-500 bg-amber-50/50 dark:bg-amber-950/20" },
        success: { icon: <CheckCircle2 className="size-4 text-green-500" />, color: "border-green-500 bg-green-50/50 dark:bg-green-950/20" },
        error: { icon: <XCircle className="size-4 text-red-500" />, color: "border-red-500 bg-red-50/50 dark:bg-red-950/20" },
        note: { icon: <MessageSquare className="size-4 text-zinc-500" />, color: "border-zinc-500 bg-zinc-50/50 dark:bg-zinc-900/50" },
        tip: { icon: <Lightbulb className="size-4 text-purple-500" />, color: "border-purple-500 bg-purple-50/50 dark:bg-purple-950/20" },
        important: { icon: <HelpCircle className="size-4 text-rose-500" />, color: "border-rose-500 bg-rose-50/50 dark:bg-rose-950/20" },
        bug: { icon: <Terminal className="size-4 text-orange-600" />, color: "border-orange-600 bg-orange-50/50 dark:bg-orange-950/20" },
    }

    const active = config[variant] || config.default

    return (
        <Alert
            className={cn("mt-6 border-l-4", active.color, className)}
            {...props}
        >
            {active.icon}
            {title && <AlertTitle className="font-bold">{title}</AlertTitle>}
            <AlertDescription className="text-foreground/90">{children}</AlertDescription>
        </Alert>
    )
}