import { Zap } from "lucide-react";
import React from "react";

interface LiveDemoHeaderProps {
  requestsRemaining: number;
}

export const LiveDemoHeader = ({ requestsRemaining }: LiveDemoHeaderProps) => (
  <div className="text-center mb-16">
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-4">
      <Zap className="w-4 h-4 text-accent" />
      <span className="text-sm text-accent font-medium">Interactive Demo</span>
    </div>
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
      Experience the speed
    </h2>
    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
      Test any public API endpoint directly. Limit: {requestsRemaining} requests
      remaining.
    </p>
  </div>
);