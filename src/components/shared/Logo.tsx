// src/components/shared/Logo.tsx

import { SITE_CONFIG } from "@/config/siteConfig"; // Using the new config
import Image from "next/image";
import Link from "next/link";

export function Logo({ size = "lg" }: { size?: "sm" | "lg" }) {
  const textClasses = size === "lg" ? "text-xl" : "text-lg";

  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div
        className={`flex items-center justify-center group-hover:scale-105 transition-transform`}
      >
        <Image src="/logo.svg" alt="Logo" width={24} height={24} />
      </div>
      <span
        className={`${textClasses} font-bold text-foreground tracking-tight`}
      >
        {SITE_CONFIG.brandName.split("API")[0]} {" "}
        <span className="text-primary">API</span>
      </span>
    </Link>
  );
}
