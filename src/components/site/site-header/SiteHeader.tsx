"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import SiteMobileHeader from "./SiteMobileHeader";
import { useSession } from "@/lib/auth-client";

const navLinks = [
  { href: "#demo", label: "Live Demo" },
  { href: "#features", label: "Features" },
  { href: "#performance", label: "Performance" },
  { href: "#pricing", label: "Pricing" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { data: session, isPending } = useSession();
  const user = session?.user;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Replaced inline logo structure with the reusable Logo component */}
          <Logo size="lg" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
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

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled
                  className="text-muted-foreground"
                >
                  Sign in
                </Button>
                <Button size="sm" disabled className="bg-primary/50">
                  Go to Workspaces
                </Button>
              </>
            ) : !user ? (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                asChild
              >
                <Link href="/sign-in">Sign in</Link>
              </Button>
            ) : (
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 glow-blue"
                asChild
              >
                <Link href="/workspaces">Go to Workspaces</Link>
              </Button>
            )}
          </div>

          <SiteMobileHeader navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}
