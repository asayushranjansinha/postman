import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import React from "react";

interface PillProps extends React.ComponentProps<"div"> {
  className?: string;
  icon: LucideIcon;
  label: string;
}
export const Pill = ({ icon: Icon, label, className, ...props }: PillProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit",
        className
      )}
      {...props}
      aria-hidden
    >
      <Icon className="w-4 h-4 text-primary" />
      <span className="text-sm font-medium text-primary">{label}</span>
    </div>
  );
};
