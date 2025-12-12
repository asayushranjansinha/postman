"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform
} from "motion/react";
import { useEffect, useRef } from "react";

import {
  PERFORMANCE_COMPARISON,
  PERFORMANCE_METRICS,
} from "@/constants/marketing";
import { cn } from "@/lib/utils"; // Assuming cn utility

// Utility component to handle the number counting animation
const AnimatedMetric = ({
  value,
  unit,
  isLargeNumber,
}: {
  value: number;
  unit: string;
  isLargeNumber: boolean;
}) => {
  const count = useMotionValue(0);

  // Use useTransform to handle formatting during animation
  const rounded = useTransform(count, (latest) => {
    if (isLargeNumber) {
      return Math.floor(latest).toLocaleString();
    }
    // Fixed logic for decimal numbers (like 99.99)
    const decimals = value % 1 !== 0 ? 2 : 0;
    return latest.toFixed(decimals);
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      // Animate from 0 to the target value
      const controls = animate(count, value, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, count, value]);

  return (
    <div
      ref={ref}
      className="text-4xl sm:text-5xl font-bold text-foreground mb-2 font-mono"
    >
      <motion.span>{rounded}</motion.span>
      <span className="text-primary">{unit}</span>
    </div>
  );
};

export function Performance() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Bar chart animation variant
  const barVariants = {
    hidden: { width: "0%" },
    visible: (width: number) => ({
      width: `${width}%`,
      transition: { duration: 1, ease: "easeOut" },
    }),
  } as any;

  return (
    <section
      ref={ref}
      id="performance"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/20"
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">
            Performance
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Built for speed obsessives
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every millisecond counts. Our Rust-powered engine delivers
            performance that leaves the competition behind.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {PERFORMANCE_METRICS.map((metric, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-border bg-card text-center"
            >
              <AnimatedMetric
                value={metric.target}
                unit={metric.unit}
                isLargeNumber={metric.target >= 1000}
              />
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Comparison Chart */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
            Average API Test Execution Time
          </h3>
          <div className="space-y-4">
            {PERFORMANCE_COMPARISON.map((item, index) => {
              // Calculate width based on a max time (e.g., 250ms for visualization)
              const barWidth = Math.min((item.time / 250) * 100, 100);

              return (
                <div key={index} className="flex items-center gap-4">
                  <span className="w-32 text-sm text-muted-foreground text-right">
                    {item.name}
                  </span>
                  <div className="flex-1 h-8 bg-secondary rounded-lg overflow-hidden">
                    <motion.div
                      className={cn(
                        "h-full rounded-lg transition-colors duration-1000 ease-out flex items-center justify-end pr-3",
                        item.color
                      )}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      custom={barWidth}
                      variants={barVariants}
                    >
                      <span
                        className={`text-sm font-mono font-medium ${
                          index === 0
                            ? "text-primary-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {item.time}ms
                      </span>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
