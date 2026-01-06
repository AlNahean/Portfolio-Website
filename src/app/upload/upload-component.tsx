"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";

export function UploadComponent() {
    const router = useRouter();

    return (
        <Card className="border-dashed border-2 bg-muted/20">
            <CardContent className="p-6">
                <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        console.log("Files: ", res);
                        toast.success("Upload Completed");
                        router.refresh();
                    }}
                    onUploadError={(error: Error) => {
                        toast.error(`ERROR! ${error.message}`);
                    }}
                    // Customizing the appearance to match shadcn
                    appearance={{
                        container: "w-full border-none p-0",
                        button: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 w-auto h-10 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                        label: "text-muted-foreground hover:text-primary transition-colors cursor-pointer",
                        allowedContent: "text-muted-foreground/70 text-xs",
                    }}
                    content={{
                        uploadIcon: <UploadCloud className="w-10 h-10 text-muted-foreground/50 mb-2" />,
                        label: "Choose files or drag and drop",
                    }}
                />
            </CardContent>
        </Card>
    );
}