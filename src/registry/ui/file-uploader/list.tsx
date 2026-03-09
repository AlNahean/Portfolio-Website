"use client"

import * as React from "react"
import { X, File as FileIcon } from "lucide-react"
import { formatBytes } from "@/registry/lib/format-bytes"

export interface FileUploaderListProps {
    files: File[]
    onRemove: (index: number) => void
}

export function FileUploaderList({ files, onRemove }: FileUploaderListProps) {
    if (files.length === 0) return null

    return (
        <div className="space-y-2">
            {files.map((file, i) => (
                <div
                    key={i}
                    className="flex items-center justify-between p-3 border rounded-md bg-background"
                >
                    <div className="flex items-center space-x-3">
                        <div className="p-2 border rounded-md bg-muted/50">
                            <FileIcon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-sm font-medium leading-none max-w-[200px] truncate">
                                {file.name}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                {formatBytes(file.size)}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => onRemove(i)}
                        className="p-1 rounded-md hover:bg-muted transition-colors"
                        aria-label="Remove file"
                    >
                        <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                    </button>
                </div>
            ))}
        </div>
    )
}
