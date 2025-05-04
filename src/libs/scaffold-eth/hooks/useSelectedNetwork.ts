import scaffoldConfig from "@/libs/scaffold-eth/scaffold.config";
import { useGlobalState } from "@/libs/scaffold-eth/store/store";
import type { AllowedChainIds } from "@/libs/scaffold-eth/utils";

export function useSelectedNetwork(chainId?: AllowedChainIds) {
  const targetNetwork = useGlobalState(({ targetNetwork }) => targetNetwork);
  return (
    scaffoldConfig.targetNetworks.find((targetNetwork) => targetNetwork.id === chainId) ??
    targetNetwork
  );
}
