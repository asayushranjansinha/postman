import { LucideIcon } from "lucide-react";

export interface WorkflowStep {
  number: number;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  color: string;
  codeSnippet: string;
}

export interface WorkflowStat {
  icon: LucideIcon;
  value: string;
  label: string;
  description: string;
}
