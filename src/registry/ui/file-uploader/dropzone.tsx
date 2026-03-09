"use client"

import * as React from "react"
import { Upload } from "lucide-react"
import { useFileUpload } from "@/registry/hooks/use-file-upload"
import { formatBytes } from "@/registry/lib/format-bytes"
import { cn } from "@/lib/utils"

export interface FileUploaderDropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
    maxSize: number
    maxFiles: number
    isHovering: boolean
    onDragEnter: (e: React.DragEvent) => void
    onDragLeave: (e: React.DragEvent) => void
    onDrop: (e: React.DragEvent) => void
}

export function FileUploaderDropzone({
    className,
    maxSize,
    maxFiles,
    isHovering,
    onDragEnter,
    onDragLeave,
    onDrop,
    ...props
}: FileUploaderDropzoneProps) {
    return (
        <div
            onDragEnter={onDragEnter}
            onDragOver={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={cn(
                "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg transition-colors bg-muted/20",
                isHovering ? "border-primary bg-primary/5" : "border-muted-foreground/25",
                "hover:bg-primary/5 hover:border-primary/50 cursor-pointer",
                className
            )}
            {...props}
        >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none">
                <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                    Up to {maxFiles} files, MAX. {formatBytes(maxSize)}
                </p>
            </div>
        </div>
    )
}
