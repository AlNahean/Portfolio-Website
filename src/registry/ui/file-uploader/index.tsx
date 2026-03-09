"use client"

import * as React from "react"
import { useFileUpload } from "@/registry/hooks/use-file-upload"
import { FileUploaderDropzone } from "@/registry/ui/file-uploader/dropzone"
import { FileUploaderList } from "@/registry/ui/file-uploader/list"
import { cn } from "@/lib/utils"

export interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
    maxFiles?: number
    maxSize?: number
    onUpload?: (files: File[]) => void
}

export function FileUploader({
    className,
    maxFiles = 3,
    maxSize = 1024 * 1024 * 4,
    onUpload,
    ...props
}: FileUploaderProps) {
    const {
        files,
        isHovering,
        error,
        handleDragEnter,
        handleDragLeave,
        handleDrop,
        removeFile,
    } = useFileUpload({ maxFiles, maxSize, onUpload })

    return (
        <div className={cn("w-full space-y-4", className)} {...props}>
            <FileUploaderDropzone
                maxFiles={maxFiles}
                maxSize={maxSize}
                isHovering={isHovering}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            />

            {error && (
                <div className="text-sm font-medium text-destructive">{error}</div>
            )}

            <FileUploaderList files={files} onRemove={removeFile} />
        </div>
    )
}
