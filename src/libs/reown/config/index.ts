import {cookieStorage, createStorage} from 'wagmi';
import {WagmiAdapter} from '@reown/appkit-adapter-wagmi';
import {SolanaAdapter} from '@reown/appkit-adapter-solana/react';
import type {AppKitNetwork} from '@reown/appkit/networks';
import {arbitrum, mainnet, polygon, solana} from '@reown/appkit/networks';
import {createAppKit} from '@reown/appkit/react';

export const reownProjectId = process.env.NEXT_PUBLIC_PROJECT_ID || 'b56e18d47c72ab683b10814fe9495694';

if(!reownProjectId) {
  throw new Error('reown Project ID is not defined');
}

export const reownMetadata = {
  name: '0w',
  description: '0wallet',
  url: 'https://github.com/bardak-dev/0w',
  icons: ['https://avatars.githubusercontent.com/u/5928632']
};

export const reownNetworks = [mainnet, arbitrum, solana, polygon] as [AppKitNetwork, ...AppKitNetwork[]];

//Set up the Wagmi Adapter (Config)
export const reownWagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId: reownProjectId,
  networks: reownNetworks
});

export const reownSolanaWeb3JsAdapter = new SolanaAdapter();

export const reownAppKit = (theme: any = 'light', accent: any = '#000000') => createAppKit({
  adapters: [reownWagmiAdapter, reownSolanaWeb3JsAdapter],
  projectId: reownProjectId,
  networks: reownNetworks,
  metadata: reownMetadata,
  themeMode: theme,
  features: {
    analytics: false
  },
  themeVariables: {
    '--w3m-accent': accent
  }
});


export const reownConfig = reownWagmiAdapter.wagmiConfig;