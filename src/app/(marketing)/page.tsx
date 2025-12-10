import { ToolTipHint } from "@/components/shared/ToolTipHint";
import React from "react";

function MarketingPage() {
  return (
    <div className="min-h-svh flex items-center justify-center flex-col">
      <ToolTipHint label="edit" side="bottom" align="start" sideOffset={6}>
        <button>Edit</button>
      </ToolTipHint>
    </div>
  );
}

export default MarketingPage;
