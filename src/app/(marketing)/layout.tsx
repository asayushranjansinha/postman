import { SiteFooter } from "@/components/site/SiteFooter";
import SiteHeaderWrapper from "@/components/site/site-header/SiteHeaderWrapper";

import React from "react";

function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh flex flex-col">
      <SiteHeaderWrapper />
      <main className="flex-1"> {children} </main>
      <SiteFooter />
    </div>
  );
}

export default MarketingLayout;
