import { ReownContextProvider } from "@/libs/reown/context";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { headers } from "next/headers";
import type { PropsWithChildren } from "react";
import "./styles.css";
import { MonoHooksStoreNextJS } from "@/app/monohook";

export const metadata: Metadata = {
  title: "0w",
  description: "0wallet",
};

export default async ({ children }: PropsWithChildren) => {
  const headersData = await headers();
  const cookies = headersData.get("cookie");
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <ReownContextProvider cookies={cookies}>
          <ThemeProvider
            attribute="data-theme"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <MonoHooksStoreNextJS />
        </ReownContextProvider>
      </body>
    </html>
  );
};
