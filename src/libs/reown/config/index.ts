import type { ThemeMode } from "@reown/appkit";
import { SolanaAdapter } from "@reown/appkit-adapter-solana/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import type { AppKitNetwork } from "@reown/appkit/networks";
import { arbitrum, mainnet, polygon, solana } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { useTheme } from "next-themes";
import { cookieStorage, createStorage } from "wagmi";

export const reownProjectId =
  process.env.NEXT_PUBLIC_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694";

if (!reownProjectId) {
  throw new Error("reown Project ID is not defined");
}

export const reownMetadata = {
  name: "0w",
  description: "0wallet",
  url: "https://github.com/bardak-dev/0w",
  icons: ["https://avatars.githubusercontent.com/u/5928632"],
};

export const reownNetworks = [polygon, mainnet, arbitrum, solana] as [
  AppKitNetwork,
  ...AppKitNetwork[],
];

//Set up the Wagmi Adapter (Config)
export const reownWagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId: reownProjectId,
  networks: reownNetworks,
});

export const reownSolanaWeb3JsAdapter = new SolanaAdapter();

export const useAppKit = () => {
  const { theme } = useTheme();
  const kit = createAppKit({
    adapters: [reownWagmiAdapter, reownSolanaWeb3JsAdapter],
    projectId: reownProjectId,
    networks: reownNetworks,
    metadata: reownMetadata,
    defaultNetwork: reownNetworks[0],
    themeMode: theme as ThemeMode,
    features: {
      analytics: false,
    },
    themeVariables: {
      "--w3m-accent": theme === "dark" ? "#ffffff" : "#000000",
    },
  });
  return kit;
};

export const reownConfig = reownWagmiAdapter.wagmiConfig;
