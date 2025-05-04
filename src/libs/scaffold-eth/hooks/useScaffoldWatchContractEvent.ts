import { useSelectedNetwork } from "@/libs/scaffold-eth/hooks";
import { useDeployedContractInfo } from "@/libs/scaffold-eth/hooks";
import type { AllowedChainIds } from "@/libs/scaffold-eth/utils";
import type {
  ContractAbi,
  ContractName,
  UseScaffoldEventConfig,
} from "@/libs/scaffold-eth/utils/contract";
import type { Abi, ExtractAbiEventNames } from "abitype";
import type { Log } from "viem";
import { useWatchContractEvent } from "wagmi";

/**
 * Wrapper around wagmi's useEventSubscriber hook which automatically loads (by name) the contract ABI and
 * address from the contracts present in deployedContracts.ts & externalContracts.ts
 * @param config - The config settings
 * @param config.contractName - deployed contract name
 * @param config.eventName - name of the event to listen for
 * @param config.chainId - optional chainId that is configured with the scaffold project to make use for multi-chain interactions.
 * @param config.onLogs - the callback that receives events.
 */
export const useScaffoldWatchContractEvent = <
  TContractName extends ContractName,
  TEventName extends ExtractAbiEventNames<ContractAbi<TContractName>>,
>({
  contractName,
  eventName,
  chainId,
  onLogs,
}: UseScaffoldEventConfig<TContractName, TEventName>) => {
  const selectedNetwork = useSelectedNetwork(chainId);
  const { data: deployedContractData } = useDeployedContractInfo({
    contractName,
    chainId: selectedNetwork.id as AllowedChainIds,
  });

  return useWatchContractEvent({
    address: deployedContractData?.address,
    abi: deployedContractData?.abi as Abi,
    chainId: selectedNetwork.id,
    onLogs: (logs: Log[]) => onLogs(logs as Parameters<typeof onLogs>[0]),
    eventName,
  });
};
