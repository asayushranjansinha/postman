"use client";

import { ArrowRightIcon, PlayIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HERO_CONTENT } from "@/constants/marketing";
import { SafariMockup } from "@/components/mockups/safari-mockup";

export function Hero() {
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

          {/* Right Column - Image */}
          <div className="relative w-full flex justify-center lg:justify-end">
            <SafariMockup image="/sample.webp" className="w-full max-w-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
