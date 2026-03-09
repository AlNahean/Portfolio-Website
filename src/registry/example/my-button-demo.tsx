import { MyButton } from "@/registry/ui/my-button"
import { Rocket } from "lucide-react"

export default function MyButtonDemo() {
    return (
        <div className="flex items-center gap-4">
            <MyButton>
                Standard Button
            </MyButton>
            <MyButton variant="outline">
                <Rocket className="mr-2 h-4 w-4" />
                With Icon
            </MyButton>
        </div>
    )
}
