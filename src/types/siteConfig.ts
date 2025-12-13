/**
 * Defines the structure for the application's global metadata, branding,
 * and identity configuration.
 *
 * This config is the single source of truth for:
 * - SEO and social metadata
 * - Product branding
 * - Developer identity
 * - Public contact and social links
 *
 * Designed to integrate cleanly with the Next.js Metadata API
 * and to be safely consumed by both server and client components.
 */
export type SiteConfig = {
  /* ------------------------------------------------------------------ */
  /* Core SEO Fields                                                     */
  /* ------------------------------------------------------------------ */

  /** Public-facing product or application name */
  brandName: string;

  /** Primary SEO description used for meta, OpenGraph, and Twitter */
  description: string;

  /** SEO keywords used by search engines */
  keywords: string[];

  /** Canonical base URL of the deployed application */
  url: string;

  /* ------------------------------------------------------------------ */
  /* Branding & Display                                                  */
  /* ------------------------------------------------------------------ */

  /** Short marketing tagline used in hero sections and metadata */
  tagline: string;

  /** Path to the primary brand logo */
  logoPath: string;

  /** Path to the favicon or application icon */
  faviconPath: string;

  /* ------------------------------------------------------------------ */
  /* Next.js Metadata Compatibility                                      */
  /* ------------------------------------------------------------------ */

  /** Base URL used by Next.js Metadata API to resolve relative paths */
  metadataBase: URL;

  /** OpenGraph metadata configuration for social sharing */
  openGraph: {
    /** Type of OpenGraph resource (usually "website") */
    type: string;

    /** Locale for the site (e.g. en_US, en_IN) */
    locale: string;

    /** Site name displayed in social previews */
    siteName: string;

    /** Social preview images */
    images: {
      /** Relative or absolute image URL */
      url: string;
      /** Image width in pixels */
      width: number;
      /** Image height in pixels */
      height: number;
      /** Accessible description of the image */
      alt: string;
    }[];
  };

  /* ------------------------------------------------------------------ */
  /* Developer / Owner Information                                       */
  /* ------------------------------------------------------------------ */

  /** Primary developer or organization details */
  developer: {
    /** Developer or organization name */
    name: string;
    /** Public contact email */
    email: string;
    /** Personal or company website */
    website: string;
  };

  /** Copyright year displayed in footer/legal areas */
  copyrightYear: number;

  /** Twitter/X handle used for metadata cards */
  twitterHandle: string;

  /** GitHub repository identifier (org/repo) */
  githubRepo: string;

  /* ------------------------------------------------------------------ */
  /* Public Contact & Community                                          */
  /* ------------------------------------------------------------------ */

  /** Primary support or contact email address */
  supportEmail: string;

  /** Public social and community links */
  social: {
    /** GitHub profile or repository URL */
    github: string;
    /** Twitter/X profile URL */
    twitter: string;
    /** Discord or community invite URL */
    discord?: string;
  };

  /* ------------------------------------------------------------------ */
  /* Organization / Office Information                                   */
  /* ------------------------------------------------------------------ */

  /** Optional office or headquarters display information */
  office: {
    /** Display label (e.g. Global HQ, Registered Office) */
    label: string;
    /** Multiline address for UI rendering */
    address: string[];
  };
};
