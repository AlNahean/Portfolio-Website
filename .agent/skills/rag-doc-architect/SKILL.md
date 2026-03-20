---
name: rag-doc-architect
description: Generates production-grade, senior-level MDX documentation for Retrieval-Augmented Generation (RAG) techniques using the Vercel AI SDK v6, LangChain, and unpdf. Use this when the user asks to write, generate, or draft a RAG tutorial or documentation file.
---

# RAG Document Architect Skill

Your goal is to generate technical documentation for RAG pipelines that adheres to strict architectural and stylistic guidelines. 

## Context and Scope
We are building a 7-module "Bulletproof RAG" curriculum. The curriculum roadmap is located in `resources/ROADMAP.md`. You must track which file you are currently generating and ensure it fits the overarching narrative.

## Execution Environment & Data
All generated Node.js scripts (`index.js`) inside the MDX files must be written assuming they will be executed from the root of the `testing-rag` directory. 

Use the following test data paths in the code blocks:
- Standard PDF Extraction: `./data/AI_Information.pdf`
- Advanced/Multi-document: `./data/attention_is_all_you_need.pdf`
- Multi-modal/Vision: `./data/reward_plot.png`
- Raw Text: `./data/quantum.txt`

## Technical Stack Requirements
Every script you generate must exclusively use:
1. `unpdf` for PDF extraction.
2. `@langchain/textsplitters` for chunking logic.
3. `ai` (Vercel AI SDK v6) for `embedMany`, `embed`, `cosineSimilarity`, `streamText`, and `generateText`.
4. `@ai-sdk/openai` for the model provider.
5. In-memory arrays for vector storage (unless the specific advanced architecture strictly requires simulating a persistent DB).

## MDX Structure Requirements
Every MDX file MUST follow this exact structure, referencing `examples/template_basic_rag.mdx` for exact syntax:

1. **Frontmatter**: `title`, `description`, `category` (matching the module), `difficulty`.
2. **H1 & Introduction**: Define the technique and the exact engineering problem it solves.
3. **Trade-off Analysis**: A markdown table outlining Pros and Cons.
4. **Architecture Overview**: A precise ASCII text diagram showing data flow.
5. **Implementation Walkthrough**: Use `<Steps>` and `<Step>`. Every step containing code must use `<Tabs>` comparing `Code` and `Expected Output` (logs).
6. **Complete Production Script**: A single, consolidated, runnable `index.js` script with strict, timestamped logging (`[INIT]`, `[DATA]`, `[INDEX]`, `[SEARCH]`, `[GEN]`).
7. **Summary of Impact**: A markdown table comparing the technique to a standard LLM or Naive RAG.
8. **When to Use This**: 3-4 bullet points on real-world production use cases.

## Stylistic Constraints (CRITICAL)
- **Tone**: Senior Developer to Senior Developer. Professional, objective, and highly technical.
- **No Emojis**: Absolutely zero emojis in the text, frontmatter, or code logs.
- **Why over What**: Do not just explain what the code does; explain *why* we chose this specific architectural approach (e.g., why `RecursiveCharacterTextSplitter` is better than a standard string slice).
- **Log Formatting**: Code outputs must look like production server logs, not simple `console.log` statements.
