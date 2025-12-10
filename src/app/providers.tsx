"use client";
import React from "react";

import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserClient: QueryClient | undefined = undefined;

export function getBrowserClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserClient) {
      browserClient = makeQueryClient();
    }
    return browserClient;
  }
}

export const RootProviders = ({ children }: { children: React.ReactNode }) => {
  const client = getBrowserClient();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
      <Toaster closeButton position="top-center" duration={2000} />
    </ThemeProvider>
  );
};
