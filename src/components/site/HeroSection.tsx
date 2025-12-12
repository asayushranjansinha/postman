// src/components/Hero.tsx

"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon, PlayIcon } from "lucide-react";
import { motion } from "framer-motion";
import { HERO_CONTENT } from "@/constants/marketing";
import { cn } from "@/lib/utils";
import { JSX } from "react";

const charVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function Hero() {
  const codeLines = HERO_CONTENT.codeSnippet.split("\n");

  return (
    <section className="relative pt-20 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="bg-grid-effect">
        <div className="grid-pattern" />

        <div className="block dark:hidden">
          <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-secondary/70 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-muted/70 rounded-full blur-3xl animate-pulse-glow delay-1000" />
        </div>

        <div className="dark:block hidden">
          <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow delay-1000" />
        </div>
      </div>

      <div className="container mx-auto relative max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 sm:mb-8 group hover:bg-primary/20 transition-colors cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
              <span className="text-xs sm:text-sm text-muted-foreground truncate">
                v3.0 Released — 10x faster test execution
              </span>
              <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4 text-primary group-hover:translate-x-1 transition-transform shrink-0" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight text-balance mb-4 sm:mb-6 leading-[1.1]">
              API testing at the{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-accent to-primary animate-gradient text-glow">
                speed of thought
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mb-8 sm:mb-10 text-pretty leading-relaxed">
              The next-generation API platform that makes testing, debugging,
              and monitoring feel instant. Built for developers who refuse to
              wait.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90 glow-blue text-sm sm:text-base px-6 sm:px-8"
              >
                Start Building Free
                <ArrowRightIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-transparent border-border hover:bg-secondary gap-2 text-sm sm:text-base"
              >
                <PlayIcon className="w-4 h-4" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                Trusted by engineering teams at
              </p>
              <div className="flex flex-wrap items-center gap-4 sm:gap-8 opacity-60">
                {HERO_CONTENT.trustedCompanies.map((company) => (
                  <span
                    key={company}
                    className="text-sm sm:text-base text-foreground font-semibold tracking-tight"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Code Editor */}
          <div className="relative w-full">
            <div className="absolute -inset-2 sm:-inset-4 bg-linear-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl opacity-50" />
            <div className="relative rounded-lg sm:rounded-xl border border-border overflow-hidden bg-card shadow-2xl glow-blue">
              {/* Editor Header */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-secondary/50 border-b border-border">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex gap-1 sm:gap-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-[10px] sm:text-xs text-muted-foreground ml-1 sm:ml-2 font-mono truncate">
                    test-api.ts
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] sm:text-xs text-accent font-medium">
                    ● Live
                  </span>
                </div>
              </div>

              <div className="p-3 sm:p-4 md:p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto max-w-full scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                <motion.pre
                  className="text-foreground min-w-max"
                  initial="hidden"
                  animate="visible"
                  transition={{ staggerChildren: 0.01, delay: 0.3 }}
                >
                  <code className="whitespace-pre block">
                    {codeLines.map((line, i) => (
                      <div key={i} className="flex">
                        <span className="text-muted-foreground/50 select-none w-6 sm:w-8 text-right mr-2 sm:mr-4 shrink-0">
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
                            line.includes("//") && "text-muted-foreground",
                            "inline-block"
                          )}
                        >
                          {line.split("").map((char, charIndex) => (
                            <motion.span
                              key={charIndex}
                              variants={charVariants}
                              className="inline-block"
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
                      className="inline-block w-1.5 sm:w-2 h-4 sm:h-5 bg-primary ml-1"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                    />
                  </code>
                </motion.pre>
              </div>

              {/* Status Bar */}
              <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary/30 border-t border-border flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                  <span className="text-[10px] sm:text-xs text-accent whitespace-nowrap">
                    ✓ All tests passing
                  </span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
                    Response: 23ms
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-muted-foreground shrink-0">
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
