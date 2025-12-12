"use client";
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";
import { HotkeysProvider } from "react-hotkeys-hook";

import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

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

interface RootProvidersProps
  extends React.ComponentProps<typeof HotkeysProvider> {
  children: React.ReactNode;
}
export const RootProviders = ({ children, ...props }: RootProvidersProps) => {
  const client = getBrowserClient();

  return (
    <HotkeysProvider {...props}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
        <Toaster closeButton position="top-center" duration={2000} />
      </ThemeProvider>
    </HotkeysProvider>
  );
};
