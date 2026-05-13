import { sageConversationFlow } from '@/ai/flows/sage-flow';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = await sageConversationFlow(body);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Sage API error:', error?.message || error);

    // Check for rate limit errors
    if (error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('quota')) {
      return NextResponse.json(
        { error: 'AI is temporarily rate limited. Please wait a moment and try again.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate response. Using fallback mode.' },
      { status: 500 }
    );
  }
}
