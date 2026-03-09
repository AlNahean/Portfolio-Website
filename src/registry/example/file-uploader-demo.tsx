"use client"

import { FileUploader } from "@/registry/ui/file-uploader"

export default function FileUploaderDemo() {
    return (
        <div className="w-full max-w-md mx-auto">
            <FileUploader
                maxFiles={5}
                maxSize={1024 * 1024 * 10} /* 10MB */
                onUpload={(files) => console.log("Uploaded:", files)}
            />
        </div>
    )
}
