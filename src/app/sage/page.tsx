"use client";

import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Sparkles, User, RotateCcw, MessageSquare,
  Lightbulb, GraduationCap, FileText, Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SageMessage } from "@/types";

const suggestions = [
  { icon: Compass, text: "I'm 22 and confused about my career path. Help me explore options." },
  { icon: GraduationCap, text: "What scholarships am I eligible for as an engineering student in India?" },
  { icon: Lightbulb, text: "How do I transition from software development to product management?" },
  { icon: FileText, text: "Help me create a 6-month roadmap to become a data scientist." },
];

export default function SagePage() {
  const [messages, setMessages] = useState<SageMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMessage: SageMessage = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Try real API first
      const res = await fetch("/api/sage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          conversationHistory: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMessage: SageMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.response,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
        return;
      }
    } catch {}

    // Fallback to mock responses
    setTimeout(() => {
      const aiResponse = generateMockResponse(messageText);
      const aiMessage: SageMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <>
      <Header />
      <div className="flex flex-col h-[calc(100dvh-4rem)]">
        {/* Chat area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center h-full p-4">
              <div className="max-w-2xl w-full text-center">
                <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-6">
                  <Sparkles className="h-10 w-10 text-primary" />
                </div>
                <h1 className="text-3xl font-display font-bold mb-2">Meet Sage</h1>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                  Your AI career counselor. Ask about career paths, scholarships, resources,
                  skill roadmaps, or anything about your professional journey.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-xl mx-auto">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(s.text)}
                      className="flex items-start gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-muted/50 text-left transition-all group"
                    >
                      <s.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {s.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Messages */
            <div className="page-container max-w-3xl py-6 space-y-6">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex gap-3",
                      msg.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-3",
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-muted rounded-bl-md"
                      )}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </div>
                    {msg.role === "user" && (
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-border bg-background/80 backdrop-blur-xl p-4">
          <div className="max-w-3xl mx-auto">
            {messages.length > 0 && (
              <div className="flex justify-center mb-3">
                <Button variant="ghost" size="sm" onClick={resetChat} className="gap-1.5 text-xs text-muted-foreground">
                  <RotateCcw className="h-3 w-3" /> New conversation
                </Button>
              </div>
            )}
            <div className="relative flex items-end gap-2">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Sage anything about your career..."
                  rows={1}
                  className="w-full resize-none bg-muted rounded-xl px-4 py-3 pr-12 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[48px] max-h-[120px]"
                  style={{ height: "auto", overflow: "hidden" }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = Math.min(target.scrollHeight, 120) + "px";
                  }}
                />
              </div>
              <Button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="h-12 w-12 rounded-xl flex-shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-2">
              Sage is an AI assistant. Verify important information independently.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// Mock AI response generator
function generateMockResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes("career") && (lower.includes("confused") || lower.includes("explore"))) {
    return `I understand the feeling of being overwhelmed by career options — it's completely normal! Let's work through this together.\n\nHere's what I'd suggest:\n\n1. **Start with self-reflection**: What activities make you lose track of time? What subjects do you naturally gravitate toward?\n\n2. **Explore broadly first**: Check out our career roadmaps at /explore — we have paths for Technology, Data Science, Finance, Design, Medicine, Law, and more.\n\n3. **Take small experiments**: Try a free introductory course in 2-3 fields that interest you. Our resource library has quality-ranked free courses from MIT, Harvard, Khan Academy, and more.\n\n4. **Consider practical factors**: Think about your timeline, financial constraints, and location. Some careers have faster entry points than others.\n\nWould you like me to suggest some career paths based on your specific interests and background? Tell me a bit more about yourself!`;
  }

  if (lower.includes("scholarship")) {
    return `Great question about scholarships! Here are some options:\n\n🇮🇳 **For Indian Students:**\n- **INSPIRE Scholarship**: ₹80,000/year for top 1% science students\n- **NSP Post-Matric**: For SC/ST/OBC/Minority students\n- **PM Scholarship Scheme**: For wards of ex-servicemen\n- **Aditya Birla Scholarship**: ₹1.65L/year for IIT/IIM students\n\n🌍 **International:**\n- **Rhodes Scholarship**: Full funding at Oxford\n- **Chevening**: Full UK Master's funding\n- **Fulbright-Nehru**: For US studies\n- **DAAD**: For studying in Germany\n- **Erasmus Mundus**: EU-funded Master's programmes\n\nVisit our Scholarships page at /scholarships for the full list with deadlines and eligibility details.\n\nWould you like me to help you narrow down which ones you're eligible for? Tell me about your academic background and field of study!`;
  }

  if (lower.includes("transition") || lower.includes("switch")) {
    return `Career transitions are more common than you think, and many successful professionals have made similar moves!\n\nHere's a structured approach:\n\n1. **Leverage transferable skills**: Your technical background gives you a strong foundation. Product managers who understand engineering are highly valued.\n\n2. **Build PM-specific skills** (3-4 months):\n   - Product thinking & frameworks\n   - User research methods\n   - Data analysis & SQL\n   - PRD writing & roadmapping\n\n3. **Recommended free resources**:\n   - Lenny's Newsletter (product strategy)\n   - Reforge essays (growth frameworks)\n   - Google PM course on Coursera (audit for free)\n\n4. **Build proof of work**:\n   - Write 3 product teardowns\n   - Create a case study solving a real product problem\n   - Ship a side project end-to-end\n\n5. **Network & prepare** (2 months):\n   - Join product communities\n   - Practice PM interview cases\n   - Do informational interviews\n\nCheck out our Product Manager roadmap at /explore/product-manager for the full journey. Shall I dive deeper into any of these steps?`;
  }

  if (lower.includes("roadmap") || lower.includes("data scien")) {
    return `Here's a focused 6-month roadmap to become a data scientist:\n\n**Month 1-2: Foundations**\n📊 Statistics & Probability (Khan Academy — free)\n🐍 Python for Data Science (Kaggle Learn — free)\n📈 SQL fundamentals (Mode Analytics tutorial — free)\n\n**Month 3: Data Wrangling**\n🔧 Pandas & NumPy (freeCodeCamp tutorial)\n📉 Data visualization with Matplotlib/Seaborn\n💡 Work through 2 Kaggle datasets end-to-end\n\n**Month 4-5: Machine Learning**\n🤖 Google ML Crash Course (free)\n🧠 fast.ai Practical Deep Learning (free, excellent)\n🏆 Enter 1-2 Kaggle competitions\n\n**Month 6: Portfolio & Job Prep**\n📁 Build 3 portfolio projects on GitHub\n📝 Write about your projects (blog/LinkedIn)\n🎯 Practice interview questions\n\nAll resources above are free! Check our Resource Library at /resources for quality-ranked materials.\n\nWant me to adjust this based on your current skill level or available time per week?`;
  }

  return `That's a great question! Let me help you think through this.\n\nBased on what you've shared, here are my thoughts:\n\n1. **Start with exploration**: Browse our career roadmaps at /explore to see structured paths across different fields.\n\n2. **Use free resources**: Everything we recommend is free — from MIT OpenCourseWare to freeCodeCamp to Khan Academy.\n\n3. **Set small goals**: Rather than planning years ahead, focus on your next 90 days. What one skill could you start building this week?\n\n4. **Check for scholarships**: If funding is a concern, visit /scholarships — we track 50+ active scholarships.\n\nWould you like me to dig deeper into any specific area? I can help with:\n- Career path exploration\n- Resource recommendations\n- Scholarship eligibility\n- Skill roadmaps\n- Interview preparation\n\nJust tell me more about your situation!`;
}
