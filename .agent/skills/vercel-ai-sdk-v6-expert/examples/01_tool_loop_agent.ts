import { ToolLoopAgent, Output, tool } from 'ai';
import { z } from 'zod';

// 1. Define the Agent
export const supportAgent = new ToolLoopAgent({
  model: 'anthropic/claude-3-7-sonnet-20250219',
  instructions: 'You are a helpful customer support agent.',
  
  // Dynamic Call Options for runtime context
  callOptionsSchema: z.object({
    userId: z.string(),
    accountType: z.enum(['free', 'pro']),
  }),
  
  // Inject context into the instructions dynamically
  prepareCall: ({ options, ...settings }) => ({
    ...settings,
    instructions: settings.instructions + `\nUser context:\n- Account type: ${options.accountType}`
  }),

  // Tools
  tools: {
    checkBalance: tool({
      description: 'Check the account balance',
      inputSchema: z.object({ accountId: z.string() }),
      execute: async ({ accountId }) => ({ balance: 150.00 }),
    }),
  },

  // v6 Structured Output combined with Tool Calling
  output: Output.object({
    schema: z.object({
      summary: z.string().describe('A friendly summary of the resolution'),
      requiresFollowUp: z.boolean(),
    })
  })
});

// 2. Execute the Agent
async function main() {
  const { output } = await supportAgent.generate({
    prompt: 'Check my balance please. My account is ACC123.',
    options: {
      userId: 'user_123',
      accountType: 'pro'
    }
  });

  console.log(output.summary);
  console.log(output.requiresFollowUp);
}
