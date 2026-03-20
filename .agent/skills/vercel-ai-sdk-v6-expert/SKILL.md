---
name: vercel-ai-sdk-v6-expert
description: Use this skill when the user asks to build an AI agent, implement tool calling, add human-in-the-loop tool approvals, generate structured outputs, or write Next.js/React code using Vercel AI SDK v6.
---

# Vercel AI SDK v6 Expert Skill

This skill equips the agent with the knowledge to write modern, idiomatic code using Vercel AI SDK v6 (Beta/Stable), avoiding outdated v4/v5 patterns.

## Goal
To architect, write, and refactor AI applications using the new `ToolLoopAgent`, `callOptionsSchema`, Human-in-the-loop tool approvals, and stable structured outputs.

## Instructions

1. **Building Agents**:
   - **DO NOT** write manual `while` loops with `generateText` for multi-step tool execution unless explicitly requested.
   - **DO** use the `ToolLoopAgent` class from the `ai` package.
   - Look at `examples/01_tool_loop_agent.ts` for the correct syntax.

2. **Dynamic Configuration (Call Options)**:
   - When an agent needs runtime context (e.g., `userId`, `accountType`, documents for RAG), use `callOptionsSchema` (a Zod schema) and the `prepareCall` callback inside the `ToolLoopAgent` constructor.

3. **Structured Output alongside Tools**:
   - In v6, you can return structured data AND use tools in the same agent. 
   - Use the `output` property with `Output.object({ schema: z.object(...) })`, `Output.array()`, `Output.choice()`, or `Output.text()`.

4. **Human-in-the-Loop (Tool Approvals)**:
   - If the user asks for confirmation before executing a tool, add `needsApproval: true` (or a conditional async function) to the tool definition.
   - In React UIs, handle the `approval-requested` state using `addToolApprovalResponse`. Look at `examples/02_tool_approval_ui.tsx`.

5. **Reranking**:
   - Use the new `rerank` function from the `ai` package to reorder documents by relevance. Look at `examples/03_reranking.ts`.

## Constraints & Rules
- Always import core AI features (`generateText`, `streamText`, `tool`, `ToolLoopAgent`, `Output`, `rerank`) from the `ai` package.
- Always import UI hooks (`useChat`, `useObject`) from `@ai-sdk/react`.
- When using `Output.object()`, the property inside is `schema: z.object(...)`, not just the raw zod object.
