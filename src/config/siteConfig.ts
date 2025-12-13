import { SiteConfig } from "@/types/siteConfig";
import { GithubIcon, TwitterIcon } from "lucide-react";

export const SITE_CONFIG: SiteConfig = {
  /* ------------------------------------------------------------------ */
  /* Core SEO Fields                                                     */
  /* ------------------------------------------------------------------ */

  brandName: "PrismaPulse API",
  description:
    "A modern, Postman-like API development and testing platform built with Next.js, Prisma, and TypeScript. Supports workspaces, collections, environments, AI-assisted requests, and enterprise-grade authentication.",
  keywords: [
    "API Client",
    "API Testing Tool",
    "Postman Alternative",
    "API Development Platform",
    "REST Client",
    "Next.js",
    "Prisma",
    "TypeScript",
    "Monaco Editor",
    "API Workspaces",
  ],
  url: "https://ayushranjansinha-prismapulseapi.vercel.app",

  /* ------------------------------------------------------------------ */
  /* Branding & Display                                                  */
  /* ------------------------------------------------------------------ */

  tagline: "Build, Test, and Organize APIs at Scale.",
  logoPath: "/images/logo.svg",
  faviconPath: "/favicon.ico",

  /* ------------------------------------------------------------------ */
  /* Next.js Metadata Compatibility                                      */
  /* ------------------------------------------------------------------ */

  metadataBase: new URL("https://ayushranjansinha-prismapulseapi.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "PrismaPulse API",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "PrismaPulse API - Modern API Development Platform",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Developer / Legal                                                   */
  /* ------------------------------------------------------------------ */

  developer: {
    name: "Ayush Ranjan Sinha",
    email: "asayushranjansinha@gmail.com",
    website: "https://ayushranjansinha.vercel.app",
  },
  copyrightYear: 2025,
  twitterHandle: "@asayushranjansinha",
  githubRepo: "asayushranjansinha/postman",

  /* ------------------------------------------------------------------ */
  /* Public Contact & Community                                          */
  /* ------------------------------------------------------------------ */

  supportEmail: "asayushranjansinha@gmail.com",

  social: {
    github: "https://github.com/asayushranjansinha/postman",
    twitter: "https://twitter.com/asayushranjan",
    discord: undefined, // add later if needed
  },

  /* ------------------------------------------------------------------ */
  /* Organization / Office                                               */
  /* ------------------------------------------------------------------ */

  office: {
    label: "Remote / Open Source",
    address: ["India", "Open to global collaboration"],
  },
};

/* ------------------------------------------------------------------ */
/* Navigation Links                                                     */
/* ------------------------------------------------------------------ */

export const NAVIGATION_LINKS = {
  footerLinks: {
    product: [
      { label: "Features", href: "#features" },
      { label: "Architecture", href: "#architecture" },
      { label: "AI Integration", href: "#ai" },
      { label: "Changelog", href: "#" },
      { label: "Roadmap", href: "#" },
    ],
    developers: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Examples", href: "#" },
      { label: "GitHub", href: SITE_CONFIG.social.github },
      { label: "Community", href: "#" },
    ],
    company: [
      { label: "About Developer", href: "/developer" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#contact" },
    ],
    legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Security", href: "/security" },
    ],
  },

  socialLinks: [
    {
      label: "GitHub",
      href: SITE_CONFIG.social.github,
      icon: GithubIcon,
    },
    {
      label: "Twitter",
      href: SITE_CONFIG.social.twitter,
      icon: TwitterIcon,
    },
  ],
};
