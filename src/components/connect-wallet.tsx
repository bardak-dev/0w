'use client';

import {Button} from '@/components/ui/button';
import {useAppKitAccount} from '@reown/appkit/react';
import {useEnsAvatar, useEnsName} from 'wagmi';
import {useAppKit} from '@/libs/reown/config';
import {useTokens} from '@/hooks/useTokens';

export const ConnectWallet = () => {
  const tokens = useTokens();
  const appKit = useAppKit();

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