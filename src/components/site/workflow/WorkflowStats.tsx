import { WORKFLOW_STATS } from "@/constants/marketing";
import React from "react";

export function WorkflowStats() {
  return (
    <section className="grid md:grid-cols-3 gap-6 pt-12 border-t border-border">
      {WORKFLOW_STATS.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-4 p-6 rounded-2xl bg-card/50 border border-border"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <stat.icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-sm text-muted-foreground">{stat.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
