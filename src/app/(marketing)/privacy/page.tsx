import {
  ArrowLeftIcon,
  BellIcon,
  ClockIcon,
  DatabaseIcon,
  EyeIcon,
  GlobeIcon,
  LockIcon,
  MailIcon,
  Share2Icon,
  ShieldIcon,
  UserCheckIcon
} from "lucide-react";
import Link from "next/link";

const sections = [
  {
    id: "introduction",
    icon: ShieldIcon,
    title: "1. Introduction",
    content: `At PulseAPI, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Services.

This policy applies to all users of PulseAPI's website, applications, and services. By using our Services, you consent to the data practices described in this policy.

We encourage you to read this policy carefully. If you do not agree with our practices, please do not use our Services.`,
  },
  {
    id: "collection",
    icon: DatabaseIcon,
    title: "2. Information We Collect",
    content: `We collect information you provide directly to us, including:

• Account Information: Name, email address, password, and profile details
• Payment Information: Credit card numbers, billing address (processed by secure third-party payment processors)
• Usage Data: API requests, test configurations, workspace settings, and collaboration data
• Communications: Messages you send to us, support requests, and feedback

We also automatically collect:

• Device Information: IP address, browser type, operating system, device identifiers
• Log Data: Access times, pages viewed, features used, and referring URLs
• Cookies and Tracking: Session data, preferences, and analytics information`,
  },
  {
    id: "usage",
    icon: EyeIcon,
    title: "3. How We Use Your Information",
    content: `We use the information we collect to:

• Provide, maintain, and improve our Services
• Process transactions and send related information
• Send technical notices, updates, and security alerts
• Respond to your comments, questions, and support requests
• Monitor and analyze trends, usage, and activities
• Detect, investigate, and prevent fraudulent or unauthorized activities
• Personalize and improve your experience
• Send promotional communications (with your consent)

We process your information based on legitimate business interests, contractual necessity, legal compliance, and your consent where applicable.`,
  },
  {
    id: "sharing",
    icon: Share2Icon,
    title: "4. Information Sharing",
    content: `We do not sell your personal information. We may share your information in the following circumstances:

• Service Providers: With vendors who perform services on our behalf (hosting, analytics, payment processing)
• Business Transfers: In connection with a merger, acquisition, or sale of assets
• Legal Requirements: When required by law or to protect our rights
• With Your Consent: When you explicitly authorize sharing

When sharing with service providers, we ensure they maintain appropriate security measures and only use your data for specified purposes.

We may share aggregated or de-identified information that cannot reasonably be used to identify you.`,
  },
  {
    id: "security",
    icon: LockIcon,
    title: "5. Data Security",
    content: `We implement industry-standard security measures to protect your information:

• Encryption: All data transmitted is encrypted using TLS 1.3
• Access Controls: Strict authentication and authorization protocols
• Infrastructure: SOC 2 Type II certified data centers
• Monitoring: 24/7 security monitoring and threat detection
• Regular Audits: Periodic security assessments and penetration testing

While we strive to protect your information, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.

You are responsible for maintaining the security of your account credentials and reporting any unauthorized access immediately.`,
  },
  {
    id: "retention",
    icon: ClockIcon,
    title: "6. Data Retention",
    content: `We retain your information for as long as necessary to:

• Provide our Services to you
• Comply with legal obligations
• Resolve disputes and enforce agreements
• Maintain business records

Account data is retained for the duration of your account plus 30 days after deletion request. Some information may be retained longer for legal, tax, or audit purposes.

API testing data and logs are retained according to your plan settings, with a maximum retention period of 90 days for standard plans.

You can request deletion of your data at any time through account settings or by contacting us.`,
  },
  {
    id: "international",
    icon: GlobeIcon,
    title: "7. International Data Transfers",
    content: `PulseAPI is based in the United States. If you access our Services from outside the US, your information may be transferred to, stored, and processed in the US or other countries.

We use appropriate safeguards for international transfers, including:

• Standard Contractual Clauses approved by the European Commission
• Data Processing Agreements with service providers
• Compliance with applicable data protection frameworks

By using our Services, you consent to the transfer of your information to countries that may have different data protection laws than your country of residence.`,
  },
  {
    id: "rights",
    icon: UserCheckIcon,
    title: "8. Your Privacy Rights",
    content: `Depending on your location, you may have the following rights:

• Access: Request a copy of your personal information
• Correction: Request correction of inaccurate data
• Deletion: Request deletion of your personal information
• Portability: Receive your data in a portable format
• Objection: Object to certain processing activities
• Restriction: Request limitation of processing
• Withdraw Consent: Withdraw previously given consent

To exercise these rights, contact us at privacy@pulseapi.com or use the privacy controls in your account settings.

California residents have additional rights under the CCPA, including the right to know what personal information is collected and the right to opt-out of the sale of personal information.`,
  },
  {
    id: "cookies",
    icon: DatabaseIcon,
    title: "9. Cookies and Tracking",
    content: `We use cookies and similar technologies to:

• Keep you logged in and remember your preferences
• Understand how you use our Services
• Improve performance and user experience
• Deliver relevant content and advertisements

Types of cookies we use:

• Essential: Required for basic functionality
• Analytics: Help us understand usage patterns
• Functional: Remember your preferences
• Marketing: Used for targeted advertising (with consent)

You can control cookies through your browser settings. Note that disabling certain cookies may affect the functionality of our Services.`,
  },
  {
    id: "updates",
    icon: BellIcon,
    title: "10. Policy Updates",
    content: `We may update this Privacy Policy from time to time. We will notify you of material changes by:

• Posting a notice on our website
• Sending an email to your registered address
• Displaying an in-app notification

The "Last Updated" date at the top of this policy indicates when it was last revised. Your continued use of our Services after changes become effective constitutes acceptance of the revised policy.

We encourage you to review this policy periodically to stay informed about our privacy practices.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Using standard page padding */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border relative overflow-hidden">
        {/* Replaced bg-gradient-to-br with bg-linear-to-br */}
        <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-primary/5" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        
        {/* Constrain content width using .container */}
        <div className="container mx-auto relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
              <ShieldIcon className="w-5 h-5 text-accent" />
            </div>
            <span className="text-sm text-muted-foreground">Legal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance max-w-2xl">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Your privacy is important to us. Learn how PulseAPI collects, uses,
            and protects your personal information.
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
            <span>Last updated: December 12, 2025</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>Effective: December 12, 2025</span>
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
      </section>

      {/* Privacy Highlights */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border bg-card/30">
        <div className="container mx-auto">
          <h2 className="text-sm font-semibold text-foreground mb-4">
            Privacy at a Glance
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-secondary/50 border border-border">
              <LockIcon className="w-5 h-5 text-primary mb-2" />
              <h3 className="text-sm font-medium text-foreground mb-1">
                Encrypted Data
              </h3>
              <p className="text-xs text-muted-foreground">
                All data encrypted in transit and at rest
              </p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/50 border border-border">
              <EyeIcon className="w-5 h-5 text-accent mb-2" />
              <h3 className="text-sm font-medium text-foreground mb-1">
                No Data Sales
              </h3>
              <p className="text-xs text-muted-foreground">
                We never sell your personal information
              </p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/50 border border-border">
              <UserCheckIcon className="w-5 h-5 text-primary mb-2" />
              <h3 className="text-sm font-medium text-foreground mb-1">
                Your Control
              </h3>
              <p className="text-xs text-muted-foreground">
                Access, export, or delete your data anytime
              </p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/50 border border-border">
              <ShieldIcon className="w-5 h-5 text-accent mb-2" />
              <h3 className="text-sm font-medium text-foreground mb-1">
                SOC 2 Certified
              </h3>
              <p className="text-xs text-muted-foreground">
                Industry-standard security compliance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="container mx-auto">
          <h2 className="text-sm font-semibold text-foreground mb-4">
            Table of Contents
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors py-1"
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto space-y-12">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 rounded-lg bg-secondary border border-border mt-1">
                  {/* Using the section.icon component */}
                  <section.icon className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground">
                  {section.title}
                </h2>
              </div>
              <div className="pl-14">
                <div className="prose prose-invert prose-sm max-w-none">
                  {section.content.split("\n\n").map((paragraph, idx) => (
                    // Rendering paragraphs and list items correctly
                    <p
                      key={idx}
                      className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </section>
          ))}

          {/* Contact */}
          <section className="mt-16 p-8 rounded-2xl bg-linear-to-br from-card to-secondary border border-border">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <MailIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Contact Us About Privacy
                </h2>
                <p className="text-muted-foreground mb-6">
                  If you have questions about this Privacy Policy or our data
                  practices, our privacy team is here to help.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 pl-14">
              <a
                href="mailto:privacy@pulseapi.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Contact Privacy Team
              </a>
              <Link
                href="/terms"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors border border-border"
              >
                View Terms of Service
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}