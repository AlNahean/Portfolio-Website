import { rerank } from 'ai';
import { cohere } from '@ai-sdk/cohere';

async function performReranking() {
  const documents =[
    { id: 1, text: 'Vercel AI SDK v6 introduces ToolLoopAgent.' },
    { id: 2, text: 'React is a library for building UIs.' },
    { id: 3, text: 'You can require user approval for tools using needsApproval.' }
  ];

  const { rerankedDocuments } = await rerank({
    model: cohere.reranking('rerank-v3.5'),
    documents,
    query: 'How do I build an agent in v6?',
    topN: 2,
  });

  // Output will be prioritized to document 1 and 3 based on the query
  console.log(rerankedDocuments);
}
