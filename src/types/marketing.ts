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

export interface ProductFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  highlight: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}
