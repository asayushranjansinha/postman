import Link from "next/link";
import {
  MailIcon,
  MapPinIcon,
  MessageSquareIcon,
  GithubIcon,
  TwitterIcon,
} from "lucide-react";
import { ContactForm } from "./ContactForm";
import { SITE_CONFIG } from "@/config/siteConfig";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="bg-grid-effect opacity-50 absolute inset-0" />
        <div className="grid-pattern opacity-30 absolute inset-0" />

        <div className="block dark:hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse-glow delay-1000" />
        </div>

        <div className="dark:block hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow delay-1000" />
        </div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
            <span className="text-xs font-medium text-primary">
              24/7 Developer Support
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Let&apos;s build something{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-accent to-primary animate-gradient">
              extraordinary
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question about {SITE_CONFIG.brandName}? Found a bug? We
            respond faster than a cached GET request.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-10">
            <div className="grid gap-6">
              {/* Email */}
              <div
                className="group flex items-start gap-4 p-6 rounded-2xl border bg-card
                  hover:border-primary/50 hover:bg-secondary/30
                  transition-colors duration-300"
              >
                <div
                  className="p-3 rounded-lg bg-primary/10 text-primary
                    transition-transform duration-300 group-hover:scale-110"
                >
                  <MailIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email Support</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    General inquiries and billing
                  </p>
                  <a
                    href={`mailto:${SITE_CONFIG.supportEmail}`}
                    className="text-sm font-medium text-primary hover:text-accent transition-colors"
                  >
                    {SITE_CONFIG.supportEmail}
                  </a>
                </div>
              </div>

              {/* Community */}
              <div
                className="group flex items-start gap-4 p-6 rounded-2xl border bg-card
                  hover:border-primary/50 hover:bg-secondary/30
                  transition-colors duration-300"
              >
                <div
                  className="p-3 rounded-lg bg-accent/10 text-accent
                    transition-transform duration-300 group-hover:scale-110"
                >
                  <MessageSquareIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Community</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Developer discussions & support
                  </p>
                  <Link
                    href={SITE_CONFIG.social.discord ?? "#"}
                    className="text-sm font-medium text-primary hover:text-accent transition-colors"
                  >
                    Join Discord
                  </Link>
                </div>
              </div>

              {/* Office */}
              <div
                className="group flex items-start gap-4 p-6 rounded-2xl border bg-card
                  hover:border-primary/50 hover:bg-secondary/30
                  transition-colors duration-300"
              >
                <div
                  className="p-3 rounded-lg bg-secondary text-muted-foreground
                    transition-transform duration-300 group-hover:scale-110"
                >
                  <MapPinIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    {SITE_CONFIG.office.label}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {SITE_CONFIG.office.address.map((line) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Follow
              </h3>
              <div className="flex gap-4">
                <Link
                  href={SITE_CONFIG.social.github}
                  target="_blank"
                  className="group p-3 rounded-full border bg-card
                    hover:bg-primary/10 hover:border-primary/30
                    transition-colors duration-300"
                >
                  <GithubIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </Link>

                <Link
                  href={SITE_CONFIG.social.twitter}
                  target="_blank"
                  className="group p-3 rounded-full border bg-card
                    hover:bg-primary/10 hover:border-primary/30
                    transition-colors duration-300"
                >
                  <TwitterIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </Link>
              </div>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
