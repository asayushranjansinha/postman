"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "@/lib/auth-client";
import { NavigationItem } from "@/types/navigation";

interface Props {
  navLinks: NavigationItem[];
}

export default function SiteMobileHeader({ navLinks }: Props) {
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // Filter links for mobile display
  const mobileNavLinks = navLinks.filter((item) => item.showOnMobile);

  // Separate the CTA link (Start) from the main links
  const ctaLink = mobileNavLinks.find((item) => item.label === "Start");
  const mainMobileLinks = mobileNavLinks.filter(
    (item) => item.label !== "Start"
  );

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

      <SheetContent side="right" className="flex flex-col p-0">
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <Logo size="sm" />
        </div>

        <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Primary links for mobile users
        </SheetDescription>

        {/* Navigation Section */}
        <nav className="flex flex-col gap-1 overflow-y-auto grow px-4 py-2">
          {mainMobileLinks.map((link) => {
            // Use the Icon variant if available, adhering to your custom instruction
            const IconComponent = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 py-3 px-3 text-sm font-medium rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-150"
                onClick={() => setOpen(false)}
              >
                {IconComponent && (
                  <IconComponent className="w-5 h-5 text-primary shrink-0" />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA Section */}
        <div className="flex flex-col gap-3 p-6 border-t border-border">
          {isPending ? (
            <>
              {/* Sign in Placeholder */}
              <Button
                variant="ghost"
                size="lg"
                disabled
                className="justify-center w-full text-base font-semibold"
              >
                Sign in
              </Button>
              {/* Start Free Placeholder */}
              <Button
                size="lg"
                disabled
                className="bg-primary/50 w-full text-base font-semibold"
              >
                {ctaLink?.label || "Start Free"}
              </Button>
            </>
          ) : !user ? (
            <>
              {/* Actual Sign in Button */}
              <Button
                variant="ghost"
                size="lg"
                className="justify-center w-full text-base font-semibold hover:bg-secondary"
                asChild
              >
                <Link href="/sign-in" onClick={() => setOpen(false)}>
                  Sign in
                </Link>
              </Button>

              {/* Actual CTA Button */}
              {ctaLink && (
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 glow-blue w-full text-base font-semibold"
                  asChild
                >
                  <Link href={ctaLink.href} onClick={() => setOpen(false)}>
                    {ctaLink.label} Free
                  </Link>
                </Button>
              )}
            </>
          ) : (
            // Logged In: Go to Workspaces
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 glow-blue w-full text-base font-semibold"
              asChild
            >
              <Link href="/workspaces" onClick={() => setOpen(false)}>
                Go to Workspaces
              </Link>
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
