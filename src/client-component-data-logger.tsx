"use client"
import React, { useState } from "react"

type Props = {
    data: any
}

const ClientComponentDataLogger = ({ data }: Props) => {
    const [copied, setCopied] = useState(false)

    const jsonString = JSON.stringify(data ? data : "no data", null, 2)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(jsonString)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000) // reset after 2s
        } catch (err) {
            console.error("Failed to copy JSON:", err)
        }
    }

    return (
        <div style={{ fontFamily: "monospace", padding: "1rem" }}>
            <h1>This is the client component to test</h1>

            <button
                onClick={handleCopy}
                style={{
                    backgroundColor: copied ? "#4caf50" : "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    cursor: "pointer",
                    marginBottom: "10px",
                }}
            >
                {copied ? "Copied!" : "Copy JSON"}
            </button>

            <pre
                style={{
                    background: "#f4f4f4",
                    borderRadius: "8px",
                    padding: "12px",
                    overflowX: "auto",
                }}
            >
                {jsonString}
            </pre>
        </div>
    )
}

export default ClientComponentDataLogger
