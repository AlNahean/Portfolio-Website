'use client';

import { useChat } from '@ai-sdk/react';
import { lastAssistantMessageIsCompleteWithApprovalResponses } from 'ai';

export default function ChatWithApprovals() {
  const { messages, sendMessage, addToolApprovalResponse } = useChat({
    // Automatically submit once the user clicks approve/deny
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses,
  });

  return (
    <div>
      {messages.map(message => (
        <div key={message.id}>
          {message.parts.map((part, idx) => {
            if (part.type === 'text') return <p key={idx}>{part.text}</p>;

            if (part.type === 'tool-invocation') {
              // Handle v6 Tool Approval State
              if (part.state === 'approval-requested') {
                return (
                  <div key={idx} className="border p-4">
                    <p>Approve tool: {part.toolName}?</p>
                    <pre>{JSON.stringify(part.input, null, 2)}</pre>
                    <button onClick={() => addToolApprovalResponse({ 
                      id: part.approval.id, approved: true 
                    })}>Approve</button>
                    <button onClick={() => addToolApprovalResponse({ 
                      id: part.approval.id, approved: false 
                    })}>Deny</button>
                  </div>
                );
              }
              
              if (part.state === 'output-available') {
                return <p key={idx}>Tool result: {JSON.stringify(part.output)}</p>;
              }
            }
          })}
        </div>
      ))}
    </div>
  );
}
