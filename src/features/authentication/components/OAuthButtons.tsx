"use client";

import { toast } from "sonner";

import { signIn } from "@/lib/auth-client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";

type Provider = "github" | "google";

export const OAuthButtons = () => {
  function signInWithProvider(provider: Provider) {
    signIn
      .social({
        provider,
        callbackURL: "/", // redirect after successful login
      })
      .then(() => {
        toast.success("Logged in successfully", {
          description: "Redirecting to home",
        });
      })
      .catch((error) => {
        toast.error("Failed to log in", {
          description: error.message,
        });
      });
  }

  return (
    <div className="mt-6 space-y-3">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => signInWithProvider("github")}
      >
        <Icons.github className="mr-2 h-4 w-4" />
        Sign in with GitHub
      </Button>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => signInWithProvider("google")}
      >
        <Icons.google className="mr-2 h-4 w-4" />
        Sign in with Google
      </Button>
    </div>
  );
};
