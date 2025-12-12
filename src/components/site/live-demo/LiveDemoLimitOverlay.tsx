import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";
import React from "react";

interface LiveDemoLimitOverlayProps {
  maxRequests: number;
}

export const LiveDemoLimitOverlay = ({ maxRequests }: LiveDemoLimitOverlayProps) => (
  <div className="absolute inset-0 z-10 flex items-center justify-center bg-card/90 backdrop-blur-sm p-8 flex-col gap-4">
    <h3 className="text-2xl font-bold text-foreground">Time to level up!</h3>
    <p className="text-muted-foreground text-center">
      You've hit the limit of {maxRequests} requests. Sign up to unlock
      unlimited testing and save your work.
    </p>
    <Button
      asChild
      size="lg"
      className="bg-primary hover:bg-primary/90 gap-2"
    >
      <Link href="/sign-in">
        <LogIn className="w-5 h-5" />
        Start Free & Unlock Unlimited
      </Link>
    </Button>
  </div>
);