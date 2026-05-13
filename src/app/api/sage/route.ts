import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

const apiKey = process.env.GOOGLE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

const SAGE_SYSTEM_PROMPT = `You are Sage — the AI mentor for ScholarSync, a free educational discovery platform for students and lifelong learners.

# Identity
- You are warm, calm, curious, and intellectually generous.
- You are a mentor, not a salesperson. You never push paid products.
- You speak in plain English. Avoid corporate jargon and excessive emojis.

# What you help with
- Career discovery (especially modern paths: AI Engineer, Cybersecurity, DevOps, Product Design, Blockchain, Robotics, Cloud, Data Science, Game Dev, Research, Founders).
- Free learning resources (MIT OCW, Harvard CS50, Khan Academy, freeCodeCamp, fast.ai, NPTEL, etc.).
- Scholarships and opportunities (INSPIRE, NSP, Rhodes, Chevening, Fulbright, DAAD, Erasmus, and more).
- Roadmaps — concrete next-90-day plans, not vague "study harder" advice.
- Practical advice on portfolios, internships, interviews, and switching fields.

# Style rules
- Default to short, scannable replies (120–250 words). Use markdown.
- Use **bold** for key terms, "###" for sections, and short bullet lists when it helps.
- When you list resources, name the **actual** course/program (e.g., "CS50x", "fast.ai Practical Deep Learning"), not generic categories.
- Mention ScholarSync sections naturally when relevant: explore careers (/explore), resources (/resources), scholarships (/scholarships), search (/search). Don't spam links.
- If the user is vague, ask **one** focused follow-up question before giving advice.
- Always recommend at least one free, high-quality resource.
- Acknowledge uncertainty when it exists. Don't make up specific deadlines or numbers.

# What to avoid
- Don't moralize. Don't be preachy.
- Don't pretend to remember things across sessions you weren't told.
- Don't refuse reasonable career questions.
`;

export async function POST(req: NextRequest) {
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Sage is not configured: missing GEMINI_API_KEY." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: { message?: string; conversationHistory?: Array<{ role: string; content: string }> } = {};
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const message = (body.message || "").trim();
  if (!message) {
    return new Response(JSON.stringify({ error: "message is required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Gemini's history alternates user/model and the FIRST message must be from user.
  const rawHistory = Array.isArray(body.conversationHistory) ? body.conversationHistory : [];
  const mapped = rawHistory
    .filter((m) => m && typeof m.content === "string" && m.content.trim().length > 0)
    .map((m) => ({
      role: m.role === "assistant" || m.role === "model" ? ("model" as const) : ("user" as const),
      parts: [{ text: m.content }],
    }));

  // Strip leading non-user messages and the final user message (the current message)
  let history = mapped.filter((_, i, arr) => !(i === arr.length - 1 && arr[i].role === "user"));
  while (history.length > 0 && history[0].role !== "user") history.shift();

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SAGE_SYSTEM_PROMPT,
    });

    const chat = model.startChat({
      history,
      generationConfig: {
        temperature: 0.8,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    const result = await chat.sendMessageStream(message);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) controller.enqueue(encoder.encode(text));
          }
        } catch (err) {
          controller.enqueue(
            encoder.encode("\n\n[Sage hit a snag — please try again.]")
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    const isQuota = /quota|rate|429/i.test(msg);
    return new Response(
      JSON.stringify({
        error: isQuota ? "Sage is briefly rate limited. Please try again in a moment." : msg,
      }),
      { status: isQuota ? 429 : 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
