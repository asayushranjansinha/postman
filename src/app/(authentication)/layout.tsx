import Link from "next/link";
import { ActivityIcon, ShieldIcon, SparklesIcon, ZapIcon } from "lucide-react";
import type React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding & Features (Extracted Layout) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-background to-accent/10" />

        {/* Animated grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(oklch(0.7 0.18 250 / 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, oklch(0.7 0.18 250 / 0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/30 rounded-full blur-[100px] animate-pulse-glow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mb-12 group">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center glow-blue group-hover:scale-105 transition-transform">
              <ZapIcon className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-3xl font-bold text-foreground tracking-tight">
              Pulse<span className="text-primary">API</span>
            </span>
          </Link>

          {/* Headline */}
          <h1 className="text-4xl xl:text-5xl font-bold text-foreground leading-tight mb-6">
            Welcome back to the
            <span className="block text-primary text-glow">
              future of API testing
            </span>
          </h1>

          <p className="text-lg text-muted-foreground mb-12 max-w-md">
            Sign in to access your workspaces, monitor API performance, and
            collaborate with your team.
          </p>

          {/* Feature highlights */}
          <div className="space-y-6">
            {[
              {
                icon: ActivityIcon,
                title: "Real-time Monitoring",
                desc: "Track API health instantly",
              },
              {
                icon: ShieldIcon,
                title: "Enterprise Security",
                desc: "SOC 2 Type II compliant",
              },
              {
                icon: SparklesIcon,
                title: "AI-Powered Insights",
                desc: "Smart anomaly detection",
              },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className="flex items-center gap-4 group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-secondary/50 border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{feature.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
              Trusted by 10,000+ developers
            </p>
            <div className="flex items-center gap-6">
              {["Vercel", "Stripe", "Linear", "Notion"].map((company) => (
                <span
                  key={company}
                  className="text-muted-foreground/60 text-sm font-medium"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}