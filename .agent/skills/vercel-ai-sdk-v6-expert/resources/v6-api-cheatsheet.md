# Vercel AI SDK v6 Cheatsheet

## Core Imports
```typescript
import { 
  ToolLoopAgent, 
  Output, 
  tool, 
  createAgentUIStreamResponse,
  InferAgentUIMessage,
  rerank,
  stepCountIs,
  lastAssistantMessageIsCompleteWithApprovalResponses
} from 'ai';
```

## Output Types (Structured Outputs)
```typescript
output: Output.object({ schema: z.object({ summary: z.string() }) })
output: Output.array({ element: z.object({ name: z.string() }) })
output: Output.choice({ options: ['sunny', 'rainy'] })
output: Output.text() // Default
```

## Tool Approval State (React UI)
When iterating over `message.parts`, if `part.type === 'tool-invocation'`, check `part.state`:
- `approval-requested`: User needs to approve/deny.
- `input-available`: Tool is executing.
- `output-available`: Tool finished successfully.
- `output-error`: Tool threw an error.
