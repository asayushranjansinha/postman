"use client";
import React from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { getBrowserClient } from './getQueryClient';

export const TanstackQueryProvider = ({children}: {children: React.ReactNode}) => {
  const client = getBrowserClient();
  return (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  )
}
