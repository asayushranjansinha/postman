// src/config/siteConfig.ts

import { SiteConfig } from "@/types/siteConfig";
import { GithubIcon, TwitterIcon } from "lucide-react";

export const SITE_CONFIG: SiteConfig = {
  // Core SEO Fields
  brandName: "PrismaPulse",
  description:
    "A comprehensive API development environment and testing platform, integrated with robust workspace management and collaboration tools.",
  keywords: [
    "API Testing",
    "API Development",
    "Workspace Management",
    "Next.js",
    "Prisma",
    "REST Client",
  ],
  url: "https://www.prismapulse.com",

  // Branding & Display
  tagline: "Develop, Test, and Collaborate on APIs.",
  logoPath: "/images/logo.svg",
  faviconPath: "/favicon.ico",

  // Next.js Metadata Compatibility
  metadataBase: new URL("https://www.prismapulse.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "PrismaPulse",
    images: [
      {
        url: "/images/og-image.jpg", // A large, high-quality image for social media sharing
        width: 1200,
        height: 630,
        alt: "PrismaPulse API Development Platform",
      },
    ],
  },

  // Developer/Legal Info
  developer: {
    name: "Ayush Ranjan Sinha",
    email: "asayushranjansinha@gmail.com",
    website: "http://ayushranjansinha.vercel.app",
  },
  copyrightYear: 2025,
  twitterHandle: "@asayushranjansinha",
  githubRepo: "asayushranjansinha/prismapulse",
};

export const NAVIGATION_LINKS = {
  // Footer Links Structure
  footerLinks: {
    product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Integrations", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Roadmap", href: "#" },
    ],
    developers: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "SDKs", href: "#" },
      { label: "Examples", href: "#" },
      { label: "Community", href: "#" },
    ],
    company: [
      { label: "About Us", href: "/developer" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
    legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Security", href: "/security" },
    ],
  },
  socialLinks: [
    {
      label: "Twitter",
      href: "#",
      icon: TwitterIcon,
      ariaLabel: "Follow us on Twitter",
    },
    {
      label: "GitHub",
      href: "#",
      icon: GithubIcon,
      ariaLabel: "View our code on GitHub",
    },
    // {
    //   label: "Discord",
    //   href: "#",
    //   icon: DiscordIcon,
    //   ariaLabel: "Join our community on Discord",
    // },
  ],
};
