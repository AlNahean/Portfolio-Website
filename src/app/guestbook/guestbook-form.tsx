"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from "@/lib/uploadthing";
import { createGuestbookEntry } from "./actions";
import { toast } from "sonner";
import { Loader2, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export function GuestbookForm() {
    const [open, setOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // Stop standard form submission
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);

        // Explicitly set the imageUrl in formData
        if (imageUrl) {
            formData.set("imageUrl", imageUrl);
        } else {
            formData.delete("imageUrl");
        }

        const result = await createGuestbookEntry(formData);

        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success("Note posted!");
            setOpen(false);
            setImageUrl(""); // Reset image
            formRef.current?.reset(); // Reset text inputs
        }

        setIsSubmitting(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="font-bold">
                    Write me a note
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Leave a Note</DialogTitle>
                </DialogHeader>

                {/* Use standard onSubmit handler */}
                <form ref={formRef} onSubmit={onSubmit} className="grid gap-4 py-4">

                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" placeholder="Your name" required disabled={isSubmitting} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            name="message"
                            placeholder="Say something nice..."
                            required
                            maxLength={200}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Add an Image (Optional)</Label>
                        {imageUrl ? (
                            <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted group">
                                <Image
                                    src={imageUrl}
                                    alt="Upload preview"
                                    fill
                                    className="object-cover transition-opacity group-hover:opacity-90"
                                />
                                <button
                                    type="button"
                                    onClick={() => setImageUrl("")}
                                    className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-red-600 transition-colors"
                                >
                                    <X className="size-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="border-2 border-dashed rounded-lg p-4 hover:bg-muted/50 transition-colors">
                                <UploadDropzone
                                    endpoint="imageUploader"
                                    appearance={{
                                        container: "h-32 border-none",
                                        button: "bg-primary text-primary-foreground h-8 text-xs font-medium px-4",
                                        label: "text-muted-foreground hover:text-primary text-sm",
                                        allowedContent: "hidden"
                                    }}
                                    content={{
                                        uploadIcon: <ImageIcon className="size-8 text-muted-foreground mb-2" />
                                    }}
                                    onClientUploadComplete={(res) => {
                                        if (res && res[0]) {
                                            setImageUrl(res[0].url);
                                            toast.success("Image attached");
                                        }
                                    }}
                                    onUploadError={(error: Error) => {
                                        toast.error(`Upload failed: ${error.message}`);
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Posting...
                            </>
                        ) : (
                            "Post Note"
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}