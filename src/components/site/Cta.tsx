import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background: Replaced bg-gradient-to-br with bg-linear-to-br (assuming definition) */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-background to-accent/20" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[64px_64px]" />

      {/* Container class with inner width constraint */}
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center relative">
          {/* Icon */}
          <div className="mx-auto flex items-center justify-center">
            <Image src="/logo.svg" alt="Logo" width={64} height={64} />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance leading-tight">
            Ready to test at the speed of thought?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
            Join 50,000+ developers who{"'"}ve already made the switch. Start
            building faster APIs today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90 glow-blue text-base px-8"
            >
              Start Building Free
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-transparent border-border hover:bg-secondary text-base"
            >
              Talk to Sales
            </Button>
          </div>

          {/* Trust Note */}
          <p className="mt-8 text-sm text-muted-foreground">
            No credit card required • Free forever tier • Setup in 2 minutes
          </p>
        </div>
      </div>
    </section>
  );
}
