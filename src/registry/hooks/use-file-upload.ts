import * as React from "react"

export interface UseFileUploadProps {
  accept?: Record<string, string[]>
  maxSize?: number // in bytes
  maxFiles?: number
  onUpload?: (files: File[]) => void
}

export function useFileUpload({
  accept,
  maxSize = 1024 * 1024 * 2, // 2MB
  maxFiles = 1,
  onUpload,
}: UseFileUploadProps = {}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [isHovering, setIsHovering] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    setIsHovering(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsHovering(false)
  }
  
  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsHovering(false)
      setError(null)

      const droppedFiles = Array.from(e.dataTransfer.files)
      
      if (droppedFiles.length + files.length > maxFiles) {
        setError(`You can only upload up to ${maxFiles} files.`)
        return
      }

      const validFiles = droppedFiles.filter((file) => {
        if (file.size > maxSize) {
          setError(`File > ${Math.round(maxSize / 1024 / 1024)}MB.`)
          return false
        }
        return true
      })

      if (validFiles.length) {
        setFiles((prev) => [...prev, ...validFiles])
        onUpload?.(validFiles)
      }
    },
    [files.length, maxFiles, maxSize, onUpload]
  )

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return {
    files,
    isHovering,
    error,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    removeFile,
  }
}
