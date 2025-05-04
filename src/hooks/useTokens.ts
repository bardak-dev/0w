'use client';
import {createMonoHook, useLazyFetch} from 'use-mono-hook';
import {useEffect, useState} from 'react';
import {reownProjectId, useAppKit} from '@/libs/reown/config';

const _useTokens = () => {
  const [tokens, setTokens] = useState<any[]>([]);
  const kit = useAppKit();

  const [{data, loading}, fetchTokens] = useLazyFetch({
    withCredentials: false,
    url: `https://rpc.walletconnect.org/v1/convert/tokens`
  });

  useEffect(() => {
    fetchTokens({
      params: {
        st: 'appkit',
        sv: 'react-wagmi,solana-1.7.3',
        projectId: reownProjectId,
        chainId: kit.getCaipNetwork()?.caipNetworkId
      }
    }).catch(console.error);
  }, [fetchTokens]);

  useEffect(() => {
    if(!data) {
      return;
    }
    setTokens(data?.tokens);
  }, [data?.tokens]);

  return {
    loading,
    tokens,
    setTokens
  };
};

export const useTokens = createMonoHook<typeof _useTokens>(_useTokens, {
    defaults: {
      loading: true,
      tokens: []
    }
  }
).useHook;
