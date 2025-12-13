import type { Metadata } from "next";
import "./globals.css";
import { RootProviders } from "./providers";
import { fontMono, fontSans } from "@/lib/fonts";
import { SITE_CONFIG } from "@/config/siteConfig";

export const metadata: Metadata = {
  metadataBase: SITE_CONFIG.metadataBase,

  title: {
    default: SITE_CONFIG.brandName,
    template: `%s | ${SITE_CONFIG.brandName}`,
  },

  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,

  applicationName: SITE_CONFIG.brandName,
  authors: [{ name: SITE_CONFIG.developer.name }],
  creator: SITE_CONFIG.developer.name,
  publisher: SITE_CONFIG.developer.name,

  openGraph: {
    type: SITE_CONFIG.openGraph.type as "website",
    locale: SITE_CONFIG.openGraph.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.openGraph.siteName,
    images: SITE_CONFIG.openGraph.images,
  },

  twitter: {
    card: "summary_large_image",
    creator: SITE_CONFIG.twitterHandle,
    title: SITE_CONFIG.brandName,
    description: SITE_CONFIG.description,
    images: SITE_CONFIG.openGraph.images.map((img) => img.url),
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: SITE_CONFIG.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontMono.variable} ${fontSans.variable} antialiased`}>
        <RootProviders>{children}</RootProviders>

        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>
      </body>
    </html>
  );
}
