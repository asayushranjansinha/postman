import { ShieldIcon, ZapIcon } from "lucide-react";
import Link from "next/link";
import { SignUpForm } from "@/features/authentication/components/forms/SignUpForm";
import { OAuthButtons } from "@/features/authentication/components/OAuthButtons";

export default function SignUpPage() {
  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-lg">
        <Link
          href="/"
          className="flex lg:hidden items-center gap-2 mb-8 justify-center"
        >
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary to-accent flex items-center justify-center">
            <ZapIcon className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">
            Pulse<span className="text-primary">API</span>
          </span>
        </Link>

        <div className="text-center lg:text-left mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Create your account
          </h2>
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        <SignUpForm />

        <div className="mt-6 mb-4">
          <div className="flex items-center">
            <div className="grow border-t border-border" />
            <span className="shrink mx-4 text-xs text-muted-foreground uppercase">
              or continue with
            </span>
            <div className="grow border-t border-border" />
          </div>
        </div>

        <OAuthButtons />

        <div className="mt-8 p-4 rounded-lg bg-secondary/20 border border-border">
          <div className="flex items-start gap-3">
            <ShieldIcon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Your data is secure
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                We use industry-standard encryption and never share your
                information with third parties.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
