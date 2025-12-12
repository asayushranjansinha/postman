// src/types/metadata.ts

/**
 * Defines the structure for the application's global metadata and branding.
 * This structure is designed to integrate cleanly with Next.js Metadata API.
 */
export type SiteConfig = {
  // Core SEO Fields
  brandName: string;
  description: string;
  keywords: string[];
  url: string;

  //  Branding & Display
  tagline: string;
  logoPath: string; // Path to the main logo image
  faviconPath: string; // Path to the favicon/icon.ico

  // Next.js Metadata Compatibility (for Head/Layout)
  metadataBase: URL;
  openGraph: {
    type: string;
    locale: string;
    siteName: string;
    images: {
      url: string;
      width: number;
      height: number;
      alt: string;
    }[];
  };

  // Developer/Legal Info
  developer: {
    name: string;
    email: string;
    website: string;
  };
  copyrightYear: number;
  twitterHandle: string; // e.g., @your_brand
  githubRepo: string; // e.g., your-org/your-repo
};


type LinkItem = {
  label: string;
  href: string;
};

// export type SocialLinkItem = LinkItem & {
//   icon: (props: React.SVGProps<SVGSVGElement> | { className: string }) => JSX.Element | string;
//   ariaLabel: string;
// };

// export type FooterLinks = {
//   product: LinkItem[];
//   developers: LinkItem[];
//   company: LinkItem[];
//   legal: LinkItem[];
// };