// src/components/Hero.tsx

"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon, PlayIcon } from "lucide-react"; // Using Icon variants
import { motion } from "framer-motion"; // Use motion
import { HERO_CONTENT } from "@/constants/marketing";
import { cn } from "@/lib/utils"; // Assuming utility for class merging
import { JSX } from "react";

// Variants for the typing effect
const charVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function Hero() {
  const codeLines = HERO_CONTENT.codeSnippet.split("\n");

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow delay-1000" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[64px_64px]" />
      </div>

      {/* Replaced max-w-7xl mx-auto with container mx-auto */}
      <div className="container mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 group hover:bg-primary/20 transition-colors cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-muted-foreground">
                v3.0 Released — 10x faster test execution
              </span>
              <ArrowRightIcon className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight text-balance mb-6 leading-[1.1]">
              API testing at the{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-accent to-primary animate-gradient text-glow">
                speed of thought
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 text-pretty leading-relaxed">
              The next-generation API platform that makes testing, debugging,
              and monitoring feel instant. Built for developers who refuse to
              wait.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90 glow-blue text-base px-8"
              >
                Start Building Free
                <ArrowRightIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-transparent border-border hover:bg-secondary gap-2 text-base"
              >
                <PlayIcon className="w-4 h-4" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Trusted by engineering teams at
              </p>
              <div className="flex flex-wrap items-center gap-8 opacity-60">
                {HERO_CONTENT.trustedCompanies.map((company) => (
                  <span
                    key={company}
                    className="text-foreground font-semibold tracking-tight"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Code Editor */}
          <div className="relative">
            <div className="absolute -inset-4 bg-linear-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl opacity-50" />
            <div className="relative rounded-xl border border-border overflow-hidden bg-card shadow-2xl glow-blue">
              {/* Editor Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-secondary/50 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2 font-mono">
                    test-api.ts
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-accent font-medium">
                    ● Live
                  </span>
                </div>
              </div>

              {/* TODO: replace with actual image of app and not code */}
              <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                <motion.pre
                  className="text-foreground"
                  initial="hidden"
                  animate="visible"
                  transition={{ staggerChildren: 0.01, delay: 0.3 }}
                >
                  <code>
                    {codeLines.map((line, i) => (
                      <div key={i} className="flex">
                        <span className="text-muted-foreground/50 select-none w-8 text-right mr-4">
                          {i + 1}
                        </span>
                        {/* Map over characters for typing effect */}
                        <motion.span
                          variants={{
                            hidden: { opacity: 0 },
                            visible: {
                              opacity: 1,
                              transition: { staggerChildren: 0.01 },
                            },
                          }}
                          className={cn(
                            line.includes("//") && "text-muted-foreground"
                          )}
                        >
                          {line.split("").map((char, charIndex) => (
                            <motion.span
                              key={charIndex}
                              variants={charVariants}
                            >
                              {char === " "
                                ? "\u00a0"
                                : highlightSyntaxChar(char, line)}
                            </motion.span>
                          ))}
                        </motion.span>
                      </div>
                    ))}
                    <motion.span
                      className="inline-block w-2 h-5 bg-primary ml-1"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                    />
                  </code>
                </motion.pre>
              </div>

              {/* Status Bar */}
              <div className="px-4 py-2 bg-secondary/30 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-accent">
                    ✓ All tests passing
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Response: 23ms
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  TypeScript
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Updated syntax highlighting to return a colored span for each char
function highlightSyntaxChar(char: string, line: string): JSX.Element {
  const text = line.trim();
  let colorClass = "text-foreground";

  // Simple keyword/number/string detection for individual characters
  if (text.startsWith("//")) {
    colorClass = "text-muted-foreground";
  } else if (
    /\b(const|await|console|method|endpoint|headers|body)\b/.test(text)
  ) {
    colorClass = "text-primary";
  } else if (/\b(log|test)\b/.test(text)) {
    colorClass = "text-chart-4";
  } else if (/\d+/.test(char) && /\d+/.test(text)) {
    colorClass = "text-chart-5";
  } else if (/"[^"]*?"/.test(text)) {
    colorClass = "text-accent";
  }

  // Special case for successful tick mark (✓)
  if (char === "✓") {
    colorClass = "text-accent";
  }

  return <span className={colorClass}>{char}</span>;
}

// Keeping the original line-based function for reference/cleaner structure, but it's not strictly used for the char-by-char effect above
function highlightSyntax(line: string): string {
  return line
    .replace(/(\/\/.*)$/g, '<span class="text-muted-foreground">$1</span>')
    .replace(/(".*?")/g, '<span class="text-accent">$1</span>')
    .replace(
      /\b(const|await|console|method|endpoint|headers|body)\b/g,
      '<span class="text-primary">$1</span>'
    )
    .replace(/\b(log|test)\b/g, '<span class="text-chart-4">$1</span>')
    .replace(/(\d+)/g, '<span class="text-chart-5">$1</span>')
    .replace(/(✓)/g, '<span class="text-accent">$1</span>');
}
