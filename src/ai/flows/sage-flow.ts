import { ai } from '../genkit';
import { z } from 'zod';

// ============================================
// Sage AI Career Counselor — Genkit Flow
// ============================================

const SageInputSchema = z.object({
  message: z.string().describe('The user message to respond to'),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional().describe('Previous conversation messages for context'),
  userProfile: z.object({
    stage: z.string().optional(),
    interests: z.array(z.string()).optional(),
    goal: z.string().optional(),
  }).optional().describe('User profile data from onboarding'),
});

const SageOutputSchema = z.object({
  response: z.string().describe('The AI counselor response'),
});

export const sageConversationFlow = ai.defineFlow(
  {
    name: 'sageConversationFlow',
    inputSchema: SageInputSchema,
    outputSchema: SageOutputSchema,
  },
  async (input) => {
    const systemPrompt = `You are "Sage", the AI career counselor for ScholarSync — a free learning and career discovery platform.

## Your personality:
- Warm, knowledgeable, and encouraging — like a wise mentor
- You use clear, structured responses with bullet points and sections when helpful
- You never recommend paid resources without mentioning free alternatives
- You're especially knowledgeable about Indian education (JEE, NEET, UPSC, IITs, NITs) AND global opportunities
- You use emojis sparingly and tastefully (not excessively)

## Your capabilities:
- Career path exploration and recommendations
- Resource recommendations (always free: MIT OCW, Khan Academy, freeCodeCamp, OSSU, fast.ai, NCERT, etc.)
- Scholarship guidance (Indian: NSP, INSPIRE, PMSS, KVPY; Global: Rhodes, Chevening, Fulbright, DAAD, Erasmus)
- Roadmap creation (step-by-step learning plans with timeframes)
- Resume and portfolio advice
- Interview preparation guidance
- Helping with career transitions

## Rules:
- ALWAYS recommend free resources. If a paid resource is mentioned, always provide a free alternative.
- Be specific — don't give generic advice. Name actual courses, platforms, books, and tools.
- If the user seems lost, ask clarifying questions about their interests, background, and goals.
- Encourage users to explore careers at /explore, resources at /resources, and scholarships at /scholarships on ScholarSync.
- When relevant, mention that ScholarSync has curated career roadmaps.
- Keep responses concise but thorough — aim for 150-300 words unless a detailed plan is requested.

${input.userProfile ? `## User Context:
- Stage: ${input.userProfile.stage || 'Unknown'}
- Interests: ${input.userProfile.interests?.join(', ') || 'Not specified'}
- Goal: ${input.userProfile.goal || 'Not specified'}` : ''}`;

    const history = input.conversationHistory?.map((msg) => ({
      role: msg.role as 'user' | 'model',
      content: [{ text: msg.content }],
    })) || [];

    // Map 'assistant' role to 'model' for Gemini
    const mappedHistory = history.map((msg) => ({
      role: msg.role === ('assistant' as any) ? 'model' as const : msg.role,
      content: msg.content,
    }));

    const { text } = await ai.generate({
      system: systemPrompt,
      history: mappedHistory,
      prompt: input.message,
    });

    return { response: text };
  }
);
