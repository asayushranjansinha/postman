import React from "react";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/features/theme/components/ThemeProvider";
import { TanstackQueryProvider } from "@/components/tanstack-query/TanstackQueryProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TanstackQueryProvider>
        {children}
        <Toaster closeButton position="top-center" />
      </TanstackQueryProvider>
    </ThemeProvider>
  );
};
