"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Sparkles, RotateCcw, User, Compass, GraduationCap, FileText, Lightbulb, BookOpen, Briefcase,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SageMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  { icon: Compass,       text: "I'm a CS student. Should I focus on AI or Web Dev first?" },
  { icon: GraduationCap, text: "Which scholarships should I apply to as an Indian engineering student?" },
  { icon: Lightbulb,     text: "Help me switch from software development to product management." },
  { icon: FileText,      text: "Give me a 90-day roadmap to become an AI engineer." },
  { icon: BookOpen,      text: "Best free resources to learn machine learning end-to-end?" },
  { icon: Briefcase,     text: "How do I land my first remote internship as a fresher?" },
];

const ruleBasedFallback = (query: string): string => {
  const q = query.toLowerCase();
  if (q.includes("scholarship") || q.includes("grant")) {
    return "To find scholarships, head over to the **Scholarships** tab! I recommend searching by your region to see targeted results. You can filter by merit-based or need-based grants.";
  }
  if (q.includes("career") || q.includes("roadmap") || q.includes("engineer") || q.includes("designer")) {
    return "We have visual roadmaps for modern careers in the **Explore** tab! I highly recommend checking out the AI Engineer or Cloud Engineer roadmaps to see exactly what skills you need to learn step-by-step.";
  }
  if (q.includes("resource") || q.includes("course") || q.includes("learn") || q.includes("study")) {
    return "You can find completely free, high-quality courses and resources in the **Resources** tab. I suggest looking for interactive courses or video tutorials to get started quickly.";
  }
  if (q.includes("job") || q.includes("remote") || q.includes("internship") || q.includes("work")) {
    return "Check out our live **Job Board**! It pulls real-time listings for tech and remote roles globally. Make sure your portfolio is ready before applying.";
  }
  return "I'm currently running in 'Offline Fallback Mode' so I can't generate dynamic answers right now. However, you can still explore all our Careers, Scholarships, and Resources using the navigation menu!";
};

// Simple markdown renderer (bold, headings, code, lists, line breaks)
function renderMarkdown(s: string) {
  const escape = (x: string) =>
    x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let html = escape(s);
  html = html.replace(/```([\s\S]*?)```/g, (_m, c) => `<pre class="mt-2 mb-2 p-3 rounded-lg bg-secondary text-xs overflow-x-auto"><code>${c}</code></pre>`);
  html = html.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-secondary text-[0.85em] font-mono">$1</code>');
  html = html.replace(/^###\s?(.*)$/gm, '<div class="mt-3 mb-1 font-medium text-foreground">$1</div>');
  html = html.replace(/^##\s?(.*)$/gm,  '<div class="mt-3 mb-1 font-semibold text-foreground text-base">$1</div>');
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/(^|\n)[-•]\s+(.*?)(?=\n|$)/g, "$1<li>$2</li>");
  html = html.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul class="list-disc pl-5 my-1.5 space-y-1">$1</ul>');
  html = html.replace(/\n{2,}/g, "</p><p>");
  html = `<p>${html}</p>`;
  return html;
}

export default function SagePage() {
  const [messages, setMessages] = useState<SageMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText]);

  const handleSend = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || streaming) return;

    const userMsg: SageMessage = { id: crypto.randomUUID(), role: "user", content };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput("");
    setStreaming(true);
    setStreamingText("");

    try {
      const res = await fetch("/api/sage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          conversationHistory: newHistory.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error("API failed");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        acc += chunk;
        setStreamingText(acc);
      }

      const finalMsg: SageMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: acc || "(Sage stayed silent. Try again?)",
      };
      setMessages((prev) => [...prev, finalMsg]);
      setStreaming(false);
      setStreamingText("");
    } catch (e) {
      // Fallback mechanism
      const fallbackText = ruleBasedFallback(content);
      let acc = "";
      for (let i = 0; i < fallbackText.length; i++) {
        acc += fallbackText[i];
        setStreamingText(acc);
        await new Promise((r) => setTimeout(r, 20)); // Simulate streaming
      }
      
      const errMsg: SageMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: fallbackText,
      };
      setMessages((prev) => [...prev, errMsg]);
      setStreaming(false);
      setStreamingText("");
    }
  };

  const reset = () => {
    setMessages([]);
    setStreamingText("");
    setInput("");
  };

  return (
    <>
      <Header />
      <div className="flex flex-col h-[calc(100dvh-4rem)]" data-testid="sage-page">
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 && !streaming ? (
            <div className="flex flex-col items-center justify-center h-full p-6">
              <div className="max-w-2xl w-full text-center">
                <div className="inline-flex p-4 rounded-2xl bg-accent/10 mb-6">
                  <Sparkles className="h-8 w-8 text-accent" />
                </div>
                <h1 className="font-serif text-4xl md:text-5xl tracking-tight">Meet Sage.</h1>
                <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
                  Your AI mentor for careers, scholarships, and learning paths. Free, concrete, and friendly.
                </p>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-2xl mx-auto">
                  {SUGGESTIONS.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(s.text)}
                      data-testid={`sage-suggestion-${i}`}
                      className="surface surface-hover p-4 flex items-start gap-3 group text-left"
                    >
                      <s.icon className="h-4 w-4 text-muted-foreground group-hover:text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{s.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="page-container max-w-3xl py-8 space-y-6">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}
                    data-testid={`sage-msg-${msg.role}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Sparkles className="h-4 w-4 text-accent" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed",
                        msg.role === "user"
                          ? "bg-foreground text-background rounded-br-md"
                          : "surface rounded-bl-md"
                      )}
                    >
                      {msg.role === "user" ? (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      ) : (
                        <div
                          className="prose-sage"
                          dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                        />
                      )}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {streaming && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="h-4 w-4 text-accent animate-pulse" />
                  </div>
                  <div className="surface rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%]">
                    {streamingText ? (
                      <div
                        className="prose-sage"
                        dangerouslySetInnerHTML={{ __html: renderMarkdown(streamingText) }}
                      />
                    ) : (
                      <div className="flex gap-1.5 py-1">
                        <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" />
                        <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:.15s]" />
                        <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:.3s]" />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        <div className="border-t border-border glass-nav">
          <div className="page-container max-w-3xl py-4">
            {messages.length > 0 && (
              <div className="flex justify-center mb-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={reset}
                  data-testid="sage-reset"
                  className="gap-1.5 text-xs text-muted-foreground rounded-full"
                >
                  <RotateCcw className="h-3 w-3" /> New conversation
                </Button>
              </div>
            )}
            <div className="relative flex items-end gap-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask Sage about careers, scholarships, learning paths…"
                rows={1}
                disabled={streaming}
                data-testid="sage-input"
                className="flex-1 resize-none bg-secondary rounded-2xl px-4 py-3 pr-12 text-[15px] outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-50 min-h-[48px] max-h-[140px]"
                onInput={(e) => {
                  const el = e.currentTarget;
                  el.style.height = "auto";
                  el.style.height = Math.min(el.scrollHeight, 140) + "px";
                }}
              />
              <Button
                onClick={() => handleSend()}
                disabled={!input.trim() || streaming}
                size="icon"
                data-testid="sage-send"
                className="h-12 w-12 rounded-2xl flex-shrink-0 bg-foreground text-background hover:bg-foreground/90"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-2">
              Sage uses Gemini 2.0. Verify important info — Sage can be confidently wrong sometimes.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .prose-sage p { margin: 0.2rem 0; }
        .prose-sage p + p { margin-top: 0.6rem; }
        .prose-sage strong { font-weight: 600; }
        .prose-sage ul { padding-left: 1.25rem; }
      `}</style>
    </>
  );
}
