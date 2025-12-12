// src/components/WorkflowStepper.tsx (The file named LiveDemo.tsx in your context)
"use client";

import { Button } from "@/components/ui/button";
import { WORKFLOW_STEPS } from "@/constants/marketing";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRightIcon, Check, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { WorkflowStats } from "./WorkflowStats";

export function WorkflowSteps({
  autoPlayInterval = 4000,
}: {
  autoPlayInterval?: number;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const currentStep = WORKFLOW_STEPS[activeStep];
  const stepCount = WORKFLOW_STEPS.length;

  // --- Auto-Play Logic ---
  useEffect(() => {
    if (isPaused) return;

    const autoPlayTimer = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % stepCount);
    }, autoPlayInterval);

    return () => clearTimeout(autoPlayTimer);
  }, [activeStep, isPaused, stepCount, autoPlayInterval]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsPaused(true);
    const resumeTimer = setTimeout(
      () => setIsPaused(false),
      autoPlayInterval / 2
    );
    return () => clearTimeout(resumeTimer);
  };

  // Define Framer Motion variants
  const contentVariants = {
    enter: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    initial: {
      opacity: 0,
      y: 20,
    },
  } as const;

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="bg-grid-effect">
        <div className="grid-pattern" />
      </div>

      <div className="relative container px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            From Code to Customers in 3 Steps
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Build. Test.{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
              Ship.
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Stop wasting months on API development. Our streamlined workflow
            gets your product to customers in days.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          <div className="space-y-6">
            {WORKFLOW_STEPS.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <motion.button
                  key={step.number}
                  onClick={() => handleStepClick(index)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl flex items-start gap-4 cursor-pointer relative overflow-hidden group",
                    "hover:bg-secondary/30 opacity-60 hover:opacity-100",
                    isActive && "opacity-100"
                  )}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0.6,
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Active Tab Indicator */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="active-step-indicator"
                        className="absolute inset-0 rounded-xl bg-card border border-primary/50 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Step Content */}
                  <div
                    className={cn(
                      "w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-lg font-bold transition-colors mt-1 relative z-10",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                    )}
                  >
                    {isActive ? <Check className="w-5 h-5" /> : step.number}
                  </div>

                  <div className="flex-1 space-y-1 relative z-10">
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </motion.button>
              );
            })}

            {/* General CTA below steps */}
            <div className="pt-4 flex items-center gap-4 pl-4">
              <Button size="lg" aria-label="Get Started Free" asChild>
                <Link href="/workspaces">
                  Get Started Free
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </Button>
              <span
                className="text-sm text-muted-foreground"
                aria-label="No credit card required"
              >
                No credit card required
              </span>
            </div>
          </div>

          {/* Right side - Code Preview with AnimatePresence */}
          {/* TODO: Change to mockup image */}
          <div className="relative lg:sticky lg:top-8 self-start">
            <div className="absolute -inset-4 bg-linear-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-50" />
            <div className="relative rounded-2xl bg-card border border-border overflow-hidden shadow-2xl">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                {/* File/Terminal name transition */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={currentStep.number}
                    className="text-xs text-muted-foreground font-mono ml-2 absolute left-14 pl-2.5"
                    variants={contentVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                  >
                    {activeStep === 0 && "api/routes.ts"}
                    {activeStep === 1 && "tests/user.test.ts"}
                    {activeStep === 2 && "terminal"}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Code content transition */}
              <div className="p-6 font-mono text-sm leading-relaxed min-h-[300px] relative">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.pre
                    key={currentStep.number}
                    className="text-foreground/90 whitespace-pre-wrap absolute inset-6"
                    variants={contentVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                  >
                    {currentStep.codeSnippet.split("\n").map((line, i) => (
                      <div key={i} className="flex">
                        <span className="text-muted-foreground/50 w-8 select-none">
                          {i + 1}
                        </span>
                        <span
                          className={cn(
                            line.includes("//")
                              ? "text-muted-foreground"
                              : line.includes("✓")
                              ? "text-green-400"
                              : line.includes("$")
                              ? "text-accent"
                              : ""
                          )}
                        >
                          {line}
                        </span>
                      </div>
                    ))}
                  </motion.pre>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <WorkflowStats />
      </div>
    </section>
  );
}
