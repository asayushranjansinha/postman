// src/components/shared/Logo.tsx

import Link from "next/link";
import { Zap } from "lucide-react";
import { SITE_CONFIG } from "@/config/siteConfig"; // Using the new config

export function Logo({ size = "lg" }: { size?: "sm" | "lg" }) {
  const iconClasses = size === "lg" ? "w-5 h-5" : "w-4 h-4";
  const containerClasses = size === "lg" ? "w-9 h-9" : "w-7 h-7";
  const textClasses = size === "lg" ? "text-xl" : "text-lg";

  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div
        className={`${containerClasses} rounded-lg bg-linear-to-br from-primary to-accent flex items-center justify-center group-hover:scale-105 transition-transform`}
      >
        <Zap className={`${iconClasses} text-primary-foreground`} />
      </div>
      <span
        className={`${textClasses} font-bold text-foreground tracking-tight`}
      >
        {SITE_CONFIG.brandName.split("API")[0]}
        <span className="text-primary">API</span>
      </span>
    </Link>
  );
}
