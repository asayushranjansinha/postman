import Link from "next/link";
import {
  ZapIcon,
  ArrowLeftIcon,
  FileTextIcon,
  ScaleIcon,
  AlertCircleIcon,
  UsersIcon,
  CreditCardIcon,
  ShieldIcon,
  BanIcon,
  RefreshCwIcon,
} from "lucide-react";

const sections = [
  {
    id: "acceptance",
    icon: FileTextIcon,
    title: "1. Acceptance of Terms",
    content: `By accessing or using PulseAPI's services, website, or applications (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you are using the Services on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.

These Terms constitute a legally binding agreement between you and PulseAPI, Inc. ("PulseAPI," "we," "us," or "our"). If you do not agree to these Terms, you may not access or use our Services.`,
  },
  {
    id: "description",
    icon: ZapIcon,
    title: "2. Description of Services",
    content: `PulseAPI provides an API testing and development platform that enables developers to design, test, document, and monitor APIs. Our Services include:

• API testing and debugging tools
• Real-time collaboration features
• Performance monitoring and analytics
• Documentation generation
• Integration with third-party development tools
• Cloud-based workspace management

We reserve the right to modify, suspend, or discontinue any part of our Services at any time, with or without notice.`,
  },
  {
    id: "accounts",
    icon: UsersIcon,
    title: "3. User Accounts",
    content: `To access certain features of our Services, you must create an account. When creating an account, you agree to:

• Provide accurate, current, and complete information
• Maintain and promptly update your account information
• Keep your password secure and confidential
• Accept responsibility for all activities under your account
• Notify us immediately of any unauthorized access

You must be at least 16 years old to create an account. We reserve the right to suspend or terminate accounts that violate these Terms or for any other reason at our sole discretion.`,
  },
  {
    id: "usage",
    icon: ScaleIcon,
    title: "4. Acceptable Use Policy",
    content: `You agree to use our Services only for lawful purposes and in accordance with these Terms. You may not:

• Violate any applicable laws or regulations
• Infringe upon intellectual property rights of others
• Transmit malware, viruses, or harmful code
• Attempt to gain unauthorized access to our systems
• Interfere with or disrupt the integrity of our Services
• Use our Services for competitive analysis or to build competing products
• Resell or redistribute our Services without authorization
• Engage in any activity that could harm PulseAPI or its users

We may investigate violations and take appropriate action, including reporting illegal activities to law enforcement.`,
  },
  {
    id: "payment",
    icon: CreditCardIcon,
    title: "5. Payment Terms",
    content: `Certain features of our Services require payment. By subscribing to a paid plan, you agree to:

• Pay all fees according to the pricing in effect at the time of purchase
• Provide valid payment information and authorize recurring charges
• Accept that fees are non-refundable except as required by law

We may change our pricing at any time. Price changes will take effect at the start of your next billing cycle. If you do not agree with a price change, you may cancel your subscription before the change takes effect.

Free trial periods may be offered at our discretion. At the end of a trial, you will be automatically charged unless you cancel.`,
  },
  {
    id: "intellectual",
    icon: ShieldIcon,
    title: "6. Intellectual Property",
    content: `Our Services and all associated content, features, and functionality are owned by PulseAPI and are protected by copyright, trademark, and other intellectual property laws.

You retain ownership of any content you create using our Services. By using our Services, you grant us a limited license to host, store, and display your content solely for the purpose of providing the Services.

You may not copy, modify, distribute, sell, or lease any part of our Services or included software without our written permission.`,
  },
  {
    id: "termination",
    icon: BanIcon,
    title: "7. Termination",
    content: `You may terminate your account at any time by contacting us or using the account settings in our application.

We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason, including:

• Violation of these Terms
• Non-payment of fees
• Fraudulent, illegal, or harmful activity
• Extended periods of inactivity

Upon termination, your right to use the Services will cease immediately. We may delete your data after termination in accordance with our data retention policies.`,
  },
  {
    id: "liability",
    icon: AlertCircleIcon,
    title: "8. Limitation of Liability",
    content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, PULSEAPI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL.

Our total liability for any claims arising from or related to these Terms or our Services shall not exceed the amount you paid us in the twelve (12) months preceding the claim.

Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability, so some of the above limitations may not apply to you.`,
  },
  {
    id: "changes",
    icon: RefreshCwIcon,
    title: "9. Changes to Terms",
    content: `We reserve the right to modify these Terms at any time. We will notify you of material changes by posting a notice on our website or sending you an email.

Your continued use of our Services after changes become effective constitutes your acceptance of the revised Terms. If you do not agree to the revised Terms, you must stop using our Services.

We encourage you to review these Terms periodically for any updates.`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Using standard page padding */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

        {/* Constrain content width using .container */}
        <div className="container mx-auto relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <ScaleIcon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Legal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance max-w-2xl">
            Terms of Service
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Please read these terms carefully before using PulseAPI. By using
            our services, you agree to be bound by these terms.
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

      {/* Table of Contents - Using standard page padding */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border bg-card/30">
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

      {/* Content - Using standard page padding */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto space-y-12">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 rounded-lg bg-secondary border border-border mt-1">
                  {/* Using the section.icon component */}
                  <section.icon className="w-5 h-5 text-primary" />
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
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Questions about these Terms?
            </h2>
            <p className="text-muted-foreground mb-6">
              If you have any questions about these Terms of Service, please
              contact our legal team.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:legal@pulseapi.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Contact Legal Team
              </a>
              <Link
                href="/privacy"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors border border-border"
              >
                View Privacy Policy
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
