
import {
  ExternalLinkIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  ZapIcon,
  ArrowLeftIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";


const socialLinks = {
  github: "https://github.com/asayushranjansinha",
  linkedin: "https://linkedin.com/in/asayushranjansinha",
  mail: "mailto:asayushranjansinha@gmail.com",
  portfolio: "https://ayushranjansinha.vercel.app",
};

export default function DeveloperPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-20">
      <section className="relative py-20 overflow-hidden w-full">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Back to Home Link */}
            <Link
              href="/"
              className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Home
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              <span className="text-glow bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                Meet the Developer
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              PulseAPI was crafted by Full Stack Developer, Ayush Ranjan. Find
              all my work, projects, and contact information on my personal
              portfolio.
            </p>

            {/* Primary Action Button: Portfolio Link */}
            <Link href={socialLinks.portfolio} target="_blank">
              <Button size="lg" className="glow-blue text-lg px-8 py-3">
                <ExternalLinkIcon className="w-5 h-5 mr-2" />
                View Full Portfolio
              </Button>
            </Link>

            {/* Secondary Action: Direct Contact/Socials */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Link
                href={socialLinks.github}
                target="_blank"
                className="w-12 h-12 rounded-xl bg-card border border-border hover:border-primary/50 flex items-center justify-center transition-all hover:scale-105"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-5 h-5" />
              </Link>
              <Link
                href={socialLinks.linkedin}
                target="_blank"
                className="w-12 h-12 rounded-xl bg-card border border-border hover:border-primary/50 flex items-center justify-center transition-all hover:scale-105"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-5 h-5" />
              </Link>
              <Link
                href={socialLinks.mail}
                className="w-12 h-12 rounded-xl bg-card border border-border hover:border-primary/50 flex items-center justify-center transition-all hover:scale-105"
                aria-label="Email Ayush Ranjan"
              >
                <MailIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
