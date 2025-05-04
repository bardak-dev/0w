'use client';
import {createMonoHook, useLazyFetch} from 'use-mono-hook';
import {useEffect, useMemo, useState} from 'react';

const _useDebugContract = () => {
  const [contract, setContract] = useState<any>();
  const [{data, loading: deployedContractLoading}, fetchContractAbi] = useLazyFetch({
    baseURL: '/api/polygonscan'
  });

  const deployedContractData = useMemo(() => ({
    address: contract?.addressChain,
    abi: JSON.parse(data?.result ?? '[]'),
    external: true
  }), [data, contract]);

  useEffect(() => {

    if(!contract) {
      return;
    }
    fetchContractAbi({
      params: {
        module: 'contract',
        action: 'getabi',
        address: contract.addressChain
      }
    }).catch(console.error);
  }, [contract]);

  return {
    deployedContractData,
    deployedContractLoading,
    contract,
    setContract
  };
};

export const useDebugContract = createMonoHook<typeof _useDebugContract>(_useDebugContract, {
    defaults: {}
  }
).useHook;
