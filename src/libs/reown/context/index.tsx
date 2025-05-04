"use client";

import { reownWagmiAdapter } from "@/libs/reown/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { type ReactNode } from "react";
import { type Config, WagmiProvider, cookieToInitialState } from "wagmi";

const queryClient = new QueryClient();

export const ReownContextProvider = ({
  children,
  cookies,
}: { children: ReactNode; cookies: string | null }) => (
  <WagmiProvider
    config={reownWagmiAdapter.wagmiConfig as Config}
    initialState={cookieToInitialState(reownWagmiAdapter.wagmiConfig as Config, cookies)}
  >
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </WagmiProvider>
);
