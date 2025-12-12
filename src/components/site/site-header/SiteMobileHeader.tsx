// SiteMobileHeader.tsx (Refactored with Logo Component)
"use client";

import { Menu } from "lucide-react"; // Zap is no longer needed here
import Link from "next/link";
import { useState } from "react";

import { Logo } from "@/components/shared/Logo"; // Import the Logo component
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Props {
  navLinks: { href: string; label: string }[];
}

export default function SiteMobileHeader({ navLinks }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>

      {/* SheetContent: Added horizontal padding (px-6) and adjusted overall structure */}
      <SheetContent side="right" className="flex flex-col p-0">
        {/* Header/Branding Section inside the Sheet (Replaced inline logo with Logo component) */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          {/* Using the Logo component */}
          <Logo size="sm" />
        </div>

        <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Primary links for mobile users
        </SheetDescription>

        {/* Navigation Section (Added px-6 to nav links) */}
        <nav className="flex flex-col gap-1 overflow-y-auto grow px-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-3 px-3 text-sm font-medium rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-150"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Section (Added px-6 and adjusted margin/padding) */}
        <div className="flex flex-col gap-3 p-6 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className="justify-center w-full text-base font-semibold"
            asChild
          >
            <Link href="/sign-in" onClick={() => setOpen(false)}>
              Sign in
            </Link>
          </Button>

          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 glow-blue w-full text-base font-semibold"
            asChild
          >
            <Link href="/sign-up" onClick={() => setOpen(false)}>
              Start Free
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
