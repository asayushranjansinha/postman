import React from "react";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/features/theme/components/ThemeProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster closeButton position="top-right" />
    </ThemeProvider>
  );
};
