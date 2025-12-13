import {
  AlertTriangleIcon,
  ArrowLeftIcon,
  BadgeCheckIcon,
  CheckCircle2Icon,
  CloudIcon,
  DatabaseIcon,
  ExternalLinkIcon,
  EyeIcon,
  FileCheckIcon,
  FingerprintIcon,
  GlobeIcon,
  KeyIcon,
  LockIcon,
  MailIcon,
  RefreshCwIcon,
  ServerIcon,
  ShieldCheckIcon,
  ShieldIcon,
  UsersIcon
} from "lucide-react";
import Link from "next/link";

const certifications = [
  {
    name: "SOC 2 Type II",
    description: "Annual audit of security controls",
    icon: BadgeCheckIcon,
    status: "Certified",
  },
  {
    name: "GDPR",
    description: "EU data protection compliance",
    icon: GlobeIcon,
    status: "Compliant",
  },
  {
    name: "ISO 27001",
    description: "Information security management",
    icon: FileCheckIcon,
    status: "Certified",
  },
  {
    name: "HIPAA",
    description: "Healthcare data protection",
    icon: ShieldCheckIcon,
    status: "Available",
  },
];

const securityFeatures = [
  {
    icon: LockIcon,
    title: "End-to-End Encryption",
    description:
      "All data is encrypted in transit using TLS 1.3 and at rest using AES-256. Your API keys and sensitive data are never stored in plain text.",
    highlights: [
      "TLS 1.3 in transit",
      "AES-256 at rest",
      "Zero-knowledge architecture",
    ],
  },
  {
    icon: KeyIcon,
    title: "Advanced Authentication",
    description:
      "Multi-factor authentication, SSO integration, and fine-grained role-based access control keep your account secure.",
    highlights: [
      "SAML 2.0 & OIDC SSO",
      "Hardware key support",
      "Role-based access control",
    ],
  },
  {
    icon: ServerIcon,
    title: "Secure Infrastructure",
    description:
      "Our infrastructure runs on SOC 2 certified data centers with redundancy across multiple regions and 24/7 monitoring.",
    highlights: [
      "Multi-region redundancy",
      "DDoS protection",
      "Private network isolation",
    ],
  },
  {
    icon: EyeIcon,
    title: "Audit Logging",
    description:
      "Comprehensive audit logs track every action in your workspace. Export logs for compliance or integrate with your SIEM.",
    highlights: [
      "Immutable audit trail",
      "SIEM integration",
      "90-day retention",
    ],
  },
  {
    icon: FingerprintIcon,
    title: "API Security",
    description:
      "Secure your API testing with scoped tokens, IP allowlisting, and automatic secret detection to prevent credential leaks.",
    highlights: ["Scoped API tokens", "IP allowlisting", "Secret scanning"],
  },
  {
    icon: RefreshCwIcon,
    title: "Business Continuity",
    description:
      "Automated backups, disaster recovery procedures, and 99.99% uptime SLA ensure your data is always available.",
    highlights: ["Hourly backups", "15-minute RTO", "99.99% uptime SLA"],
  },
];

const practices = [
  {
    title: "Secure Development",
    items: [
      "Code review required for all changes",
      "Automated security scanning in CI/CD",
      "Dependency vulnerability monitoring",
      "Regular penetration testing",
    ],
  },
  {
    title: "Employee Security",
    items: [
      "Background checks for all employees",
      "Security awareness training",
      "Principle of least privilege",
      "Secure remote work policies",
    ],
  },
  {
    title: "Incident Response",
    items: [
      "24/7 security monitoring",
      "Documented response procedures",
      "Customer notification within 72 hours",
      "Post-incident analysis and reporting",
    ],
  },
  {
    title: "Vendor Management",
    items: [
      "Security assessments for all vendors",
      "Data processing agreements",
      "Regular compliance reviews",
      "Minimal data sharing policy",
    ],
  },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border relative overflow-hidden">
        {/* Replaced bg-gradient-to-br with bg-linear-to-br */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

        {/* Constrain content width using .container */}
        <div className="container mx-auto relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <ShieldIcon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-primary">
                Security First
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Enterprise-grade security for your APIs
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8">
              PulseAPI is built with security at its core. We protect your data
              with industry-leading encryption, compliance certifications, and
              continuous monitoring.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#certifications"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                View Certifications
              </a>
              <a
                href="mailto:security@pulseapi.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium border border-border hover:bg-secondary/80 transition-colors"
              >
                <MailIcon className="w-4 h-4" />
                Contact Security Team
              </a>
            </div>
            {/* Back to Home Link added here since the header was removed */}
            <Link
              href="/"
              className="mt-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border bg-card/30">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <LockIcon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <ServerIcon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">99.99% Uptime</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <GlobeIcon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <BadgeCheckIcon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">SOC 2 Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section
        id="certifications"
        className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border scroll-mt-20"
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Compliance & Certifications
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We maintain rigorous compliance standards and undergo regular
              third-party audits to ensure your data is protected.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 w-fit mb-4 group-hover:scale-110 transition-transform">
                  <cert.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {cert.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {cert.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  <CheckCircle2Icon className="w-3 h-3" />
                  {cert.status}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              Download Security Whitepaper
              <ExternalLinkIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Security Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive security controls protect your data at every layer
              of the stack.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((feature) => (
              <div
                key={feature.title}
                // Replaced bg-gradient-to-br with bg-linear-to-br
                className="group p-6 rounded-2xl bg-linear-to-br from-card to-secondary/50 border border-border hover:border-primary/30 transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-accent/10 border border-accent/20 w-fit mb-4">
                  <feature.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2Icon className="w-4 h-4 text-primary shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border bg-card/30">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Secure by Design
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our infrastructure is designed from the ground up with security
                in mind. Every component is hardened, monitored, and regularly
                tested to ensure the highest level of protection.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50 border border-border">
                  <CloudIcon className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">
                      Multi-Cloud Architecture
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Distributed across AWS, GCP, and Azure with automatic
                      failover
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50 border border-border">
                  <DatabaseIcon className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">
                      Data Isolation
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Each customer&apos;s data is logically isolated with
                      dedicated encryption keys
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50 border border-border">
                  <AlertTriangleIcon className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">
                      Threat Detection
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      AI-powered anomaly detection with real-time alerting and
                      response
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Replaced bg-gradient-to-br with bg-linear-to-br */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
              <div className="relative p-8 rounded-2xl bg-card border border-border">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 rounded-xl bg-secondary/50">
                    <div className="text-3xl font-bold text-primary mb-1">
                      99.99%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Uptime SLA
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-secondary/50">
                    <div className="text-3xl font-bold text-accent mb-1">
                      &lt;15min
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Recovery Time
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-secondary/50">
                    <div className="text-3xl font-bold text-primary mb-1">
                      5
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Global Regions
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-secondary/50">
                    <div className="text-3xl font-bold text-accent mb-1">
                      24/7
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Monitoring
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Security Practices
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive security program covers every aspect of our
              operations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {practices.map((practice) => (
              <div
                key={practice.title}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {practice.title}
                </h3>
                <ul className="space-y-3">
                  {practice.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2Icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bug Bounty */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border bg-card/30">
        <div className="container mx-auto">
          {/* Replaced bg-gradient-to-br with bg-linear-to-br */}
          <div className="p-8 sm:p-12 rounded-3xl bg-linear-to-br from-primary/10 via-card to-accent/10 border border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                    <AlertTriangleIcon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-sm font-medium text-accent">
                    Bug Bounty Program
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  Help us stay secure
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We partner with security researchers worldwide through our bug
                  bounty program. Report vulnerabilities responsibly and earn
                  rewards up to $10,000.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  View Bug Bounty Policy
                  <ExternalLinkIcon className="w-4 h-4" />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-card border border-border text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    $10K
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Max Reward
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border text-center">
                  <div className="text-2xl font-bold text-accent mb-1">48h</div>
                  <div className="text-xs text-muted-foreground">
                    Response Time
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    150+
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Reports Resolved
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border text-center">
                  <div className="text-2xl font-bold text-accent mb-1">
                    $75K+
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Rewards Paid
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="container mx-auto text-center">
          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 w-fit mx-auto mb-6">
            <UsersIcon className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Have Security Questions?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Our security team is available to answer questions, discuss your
            compliance requirements, or arrange a security review call.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:security@pulseapi.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              <MailIcon className="w-4 h-4" />
              security@pulseapi.com
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium border border-border hover:bg-secondary/80 transition-colors"
            >
              Schedule Security Review
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
