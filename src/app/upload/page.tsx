import { UTApi } from "uploadthing/server";
import { UploadComponent } from "./upload-component";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { Download, Trash2, FileIcon, Copy, Image as ImageIcon } from "lucide-react";
import { revalidatePath } from "next/cache";
import { CopyButton } from "@/components/copy-button"; // Re-using your existing component if possible, or inline logic

// Initialize UTApi
const utapi = new UTApi();

// Server Action to delete file
async function deleteFile(fileKey: string) {
    "use server";
    await utapi.deleteFiles(fileKey);
    revalidatePath("/upload");
}

export default async function UploadPage() {
    const filesList = await utapi.listFiles({ limit: 50 });
    const files = filesList.files;

    return (
        <div className="container max-w-6xl py-12 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your uploaded assets.
                    </p>
                </div>
                <Badge variant="outline" className="px-3 py-1 text-sm">
                    {files.length} {files.length === 1 ? "File" : "Files"}
                </Badge>
            </div>

            <Separator />

            {/* Upload Section */}
            <div className="grid gap-8">
                <UploadComponent />

                {/* Gallery Section */}
                {files.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 border border-dashed rounded-xl bg-muted/10 text-muted-foreground">
                        <div className="bg-muted p-4 rounded-full mb-4">
                            <ImageIcon className="size-8 opacity-50" />
                        </div>
                        <h3 className="text-lg font-medium">No files uploaded</h3>
                        <p className="text-sm">Upload your first image to get started.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {files.map((file) => (
                            <Card key={file.key} className="group overflow-hidden transition-all hover:shadow-md border-muted">
                                {/* Image Preview Area */}
                                <div className="relative aspect-square bg-secondary/30 flex items-center justify-center overflow-hidden">
                                    {file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                                        <Image
                                            src={`https://utfs.io/f/${file.key}`}
                                            alt={file.name}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <FileIcon className="size-16 text-muted-foreground/40" />
                                    )}

                                    {/* Hover Overlay for quick actions (Optional, but looks nice) */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <Button asChild size="icon" variant="secondary" className="h-9 w-9 rounded-full">
                                            <Link href={`https://utfs.io/f/${file.key}`} target="_blank">
                                                <Download className="size-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>

                                {/* Card Info */}
                                <CardContent className="p-4 space-y-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="font-medium text-sm truncate" title={file.name}>
                                            {file.name}
                                        </p>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {(file.size / 1024).toFixed(2)} KB
                                    </p>
                                </CardContent>

                                <Separator />

                                {/* Footer Actions */}
                                <CardFooter className="p-2 flex items-center gap-1 bg-muted/10">
                                    <div className="flex-1">
                                        {/* Reusing your generic CopyButton if it accepts raw values, 
                         otherwise using a simple styled button logic for layout demo */}
                                        <CopyButton
                                            value={`https://utfs.io/f/${file.key}`}
                                            variant="ghost"
                                            className="w-full justify-start h-8 px-2 text-xs text-muted-foreground hover:text-foreground relative top-0 right-0 bg-transparent"
                                        />
                                        {/* If your CopyButton style is absolute, remove className above and wrap in relative div */}
                                    </div>

                                    <Separator orientation="vertical" className="h-4" />

                                    <form action={deleteFile.bind(null, file.key)}>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                            type="submit"
                                        >
                                            <Trash2 className="size-4" />
                                            <span className="sr-only">Delete</span>
                                        </Button>
                                    </form>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}