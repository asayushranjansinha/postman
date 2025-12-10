import { ToolTipHint } from "@/components/shared/ToolTipHint";
import Link from "next/link";
import React from "react";

function MarketingPage() {
  return (
    <div className="min-h-svh flex items-center justify-center flex-col">
      <ToolTipHint label="Workspaces" side="bottom" align="start" sideOffset={6}>
        <Link href="/workspaces">Workspaces</Link>
      </ToolTipHint>
    </div>
  );
}

export default MarketingPage;
