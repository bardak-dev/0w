'use client';

import {Button} from '@/components/ui/button';
import {useAppKitAccount} from '@reown/appkit/react';
import {useEnsAvatar, useEnsName} from 'wagmi';
import {reownAppKit} from '@/libs/reown/config';
import {useMemo} from 'react';
import {useTheme} from 'next-themes';

export const ConnectWalletButton = () => {
  const {theme} = useTheme();
  const appKit = useMemo(() => {
    return reownAppKit(theme, theme === 'dark' ? '#ffffff' : undefined);
  }, [theme]);

  const {address} = useAppKitAccount();

  const {data: ensName} = useEnsName({address: address as `0x${string}`});
  const {data: ensAvatar} = useEnsAvatar({name: ensName!});

  return (
    <Button onClick={() => appKit.open()} className="rounded-xl">
      {address ? (
        <>
          {ensAvatar && <img src={ensAvatar} alt="ENS Avatar"/>}
          {address && (
            <span>{ensName ? `${ensName}` : `${address.slice(0, 6)}...${address.slice(-4)}`}</span>
          )}
        </>
      ) : (
        'Connect Wallet'
      )}
    </Button>
  );
};