"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { USER_STAGES, INTEREST_OPTIONS, GOAL_OPTIONS, WEEKLY_HOURS_OPTIONS, CONSTRAINT_OPTIONS } from "@/lib/constants";
import type { OnboardingAnswers, UserStage } from "@/types";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TOTAL_STEPS = 5;

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<OnboardingAnswers>({
    stage: "college",
    interests: [],
    goal: "",
    weeklyHours: 5,
    constraints: [],
  });
  const [isComplete, setIsComplete] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const progress = (step / TOTAL_STEPS) * 100;

  const toggleInterest = (interest: string) => {
    setAnswers((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const toggleConstraint = (constraint: string) => {
    setAnswers((prev) => ({
      ...prev,
      constraints: prev.constraints.includes(constraint)
        ? prev.constraints.filter((c) => c !== constraint)
        : [...prev.constraints, constraint],
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!answers.stage;
      case 2: return answers.interests.length > 0;
      case 3: return !!answers.goal;
      case 4: return !!answers.weeklyHours;
      case 5: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      setIsComplete(true);
      // Store answers in localStorage for the dashboard
      localStorage.setItem("scholarsync-onboarding", JSON.stringify(answers));
    }
  };

  const slideVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  if (isComplete) {
    return (
      <div className="min-h-dvh flex items-center justify-center p-4 bg-dots">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-6">
            <Sparkles className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-display font-bold mb-3">Your path is ready!</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Based on your answers, we&apos;ve prepared personalized career recommendations
            and curated free resources just for you.
          </p>
          <div className="space-y-3">
            <Button size="lg" asChild className="w-full h-12 rounded-xl">
              <Link href="/explore">
                Explore Your Roadmap <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {!isAuthenticated && (
              <Button size="lg" variant="outline" asChild className="w-full h-12 rounded-xl">
                <Link href="/signup">Create a Free Account</Link>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col bg-dots">
      {/* Header */}
      <div className="p-4 flex items-center justify-between page-container">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">S</span>
          </div>
          <span className="text-lg font-bold tracking-tight">ScholarSync</span>
        </Link>
        <span className="text-sm text-muted-foreground">
          Step {step} of {TOTAL_STEPS}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-muted">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Stage */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
                    What stage are you at?
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    This helps us tailor recommendations for you.
                  </p>
                  <div className="grid gap-3">
                    {USER_STAGES.map((stage) => (
                      <button
                        key={stage.value}
                        onClick={() => setAnswers({ ...answers, stage: stage.value as UserStage })}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-xl border text-left transition-all",
                          answers.stage === stage.value
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border hover:border-primary/40 hover:bg-muted/50"
                        )}
                      >
                        <span className="text-2xl">{stage.emoji}</span>
                        <span className="font-medium">{stage.label}</span>
                        {answers.stage === stage.value && (
                          <Check className="h-5 w-5 text-primary ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Interests */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
                    What interests you most?
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Select all that apply. You can always change these later.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {INTEREST_OPTIONS.map((interest) => (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={cn(
                          "px-4 py-2.5 rounded-xl text-sm font-medium border transition-all",
                          answers.interests.includes(interest)
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/40 text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Goal */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
                    What&apos;s your primary goal?
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Pick the one that best describes what you&apos;re looking for right now.
                  </p>
                  <div className="grid gap-3">
                    {GOAL_OPTIONS.map((goal) => (
                      <button
                        key={goal}
                        onClick={() => setAnswers({ ...answers, goal })}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-xl border text-left transition-all",
                          answers.goal === goal
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border hover:border-primary/40 hover:bg-muted/50"
                        )}
                      >
                        <span className="font-medium text-sm">{goal}</span>
                        {answers.goal === goal && (
                          <Check className="h-5 w-5 text-primary ml-auto flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Time */}
              {step === 4 && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
                    How much time can you dedicate per week?
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    We&apos;ll pace your roadmap accordingly.
                  </p>
                  <div className="grid gap-3">
                    {WEEKLY_HOURS_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setAnswers({ ...answers, weeklyHours: option.value })}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-xl border text-left transition-all",
                          answers.weeklyHours === option.value
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border hover:border-primary/40 hover:bg-muted/50"
                        )}
                      >
                        <span className="font-medium text-sm">{option.label}</span>
                        {answers.weeklyHours === option.value && (
                          <Check className="h-5 w-5 text-primary ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Constraints */}
              {step === 5 && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
                    Any specific constraints?
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Optional — select any that apply so we can adapt your experience.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {CONSTRAINT_OPTIONS.map((constraint) => (
                      <button
                        key={constraint}
                        onClick={() => toggleConstraint(constraint)}
                        className={cn(
                          "px-4 py-2.5 rounded-xl text-sm font-medium border transition-all",
                          answers.constraints.includes(constraint)
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/40 text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {constraint}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-10">
            <Button
              variant="ghost"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="gap-2 rounded-xl h-11 px-6"
            >
              {step === TOTAL_STEPS ? "See My Results" : "Continue"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
