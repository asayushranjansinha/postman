"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import SiteMobileHeader from "./SiteMobileHeader";
import { useSession } from "@/lib/auth-client";

// 1. Import the constant
import { HEADER_NAV_ITEMS } from "@/config/navigation";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { data: session, isPending } = useSession();
  const user = session?.user;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter links for the main desktop navigation (excluding the final CTA which is handled separately)
  const desktopNavLinks = HEADER_NAV_ITEMS.filter(
    (item) => item.showOnDesktop && item.label !== "Start"
  );

  // Find the CTA link (Start)
  const ctaLink = HEADER_NAV_ITEMS.find((item) => item.label === "Start");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo size="lg" />

          {/* 2. Desktop Navigation: Filtered Links */}
          <nav className="hidden md:flex items-center gap-8">
            {desktopNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* 3. Desktop CTA: Using the dedicated CTA link */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <>
                {/* Placeholder/Disabled Sign In button */}
                <Button
                  variant="ghost"
                  size="sm"
                  disabled
                  className="text-muted-foreground"
                >
                  Sign in
                </Button>
                {/* Placeholder/Disabled Workspaces button */}
                <Button size="sm" disabled className="bg-primary/50">
                  {ctaLink?.label}
                </Button>
              </>
            ) : !user ? (
              <>
                {/* Standard Sign In */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  asChild
                >
                  <Link href="/sign-in">Sign in</Link>
                </Button>
                {/* Primary CTA (Start) */}
                {ctaLink && (
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 glow-blue"
                    asChild
                  >
                    <Link href={ctaLink.href}>{ctaLink.label}</Link>
                  </Button>
                )}
              </>
            ) : (
              // User is logged in, show Go to Workspaces
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 glow-blue"
                asChild
              >
                <Link href="/workspaces">Go to Workspaces</Link>
              </Button>
            )}
          </div>

          {/* 4. Mobile Header: Pass all links (it will handle its own filtering based on showOnMobile) */}
          <SiteMobileHeader navLinks={HEADER_NAV_ITEMS} />
        </div>
      </div>
    </header>
  );
}
