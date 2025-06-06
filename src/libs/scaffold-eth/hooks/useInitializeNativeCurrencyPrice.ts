import scaffoldConfig from "@/libs/scaffold-eth/scaffold.config";
import { useGlobalState } from "@/libs/scaffold-eth/store/store";
import { fetchPriceFromUniswap } from "@/libs/scaffold-eth/utils";
import { useCallback, useEffect } from "react";
import { useInterval } from "usehooks-ts";
import { useTargetNetwork } from "./useTargetNetwork";

const enablePolling = false;

/**
 * Get the price of Native Currency based on Native Token/DAI trading pair from Uniswap SDK
 */
export const useInitializeNativeCurrencyPrice = () => {
  const setNativeCurrencyPrice = useGlobalState((state) => state.setNativeCurrencyPrice);
  const setIsNativeCurrencyFetching = useGlobalState((state) => state.setIsNativeCurrencyFetching);
  const { targetNetwork } = useTargetNetwork();

  const fetchPrice = useCallback(async () => {
    setIsNativeCurrencyFetching(true);
    const price = await fetchPriceFromUniswap(targetNetwork);
    setNativeCurrencyPrice(price);
    setIsNativeCurrencyFetching(false);
  }, [setIsNativeCurrencyFetching, setNativeCurrencyPrice, targetNetwork]);

  // Get the price of ETH from Uniswap on mount
  useEffect(() => {
    fetchPrice();
  }, [fetchPrice]);

  // Get the price of ETH from Uniswap at a given interval
  useInterval(fetchPrice, enablePolling ? scaffoldConfig.pollingInterval : null);
};
