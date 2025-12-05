import { ThemeProvider } from "@/features/theme/components/ThemeProvider";
import React from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
