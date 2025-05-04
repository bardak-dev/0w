"use client";

import { IconSearch } from "@/assets/icons/Search";
import { ButtonToken } from "@/components/debug-contracts/_components/ButtonToken";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDebugContract } from "@/hooks/useDebugContract";
import { useTokens } from "@/hooks/useTokens";
import { useAppKit } from "@/libs/reown/config";
import { memo, useMemo, useState } from "react";
import { ContractUI } from "~~/components/debug-contracts/_components/contract";

const ChooseToken = memo(() => {
  const { setContract: setSelectedToken } = useDebugContract();
  const { tokens, loading } = useTokens();
  const kit = useAppKit();
  const [search, setSearch] = useState<string>("");
  const topTokens: any[] = [];

  const filteredTokens: any[] = useMemo(() => {
    const networkPrefix = kit.getCaipNetwork()?.caipNetworkId;
    return tokens.reduce((prev, token) => {
      if (
        token.name.toLowerCase().includes(search.toLowerCase()) ||
        token.address.toLowerCase().includes(search.toLowerCase()) ||
        token.symbol.toLowerCase().includes(search.toLowerCase())
      ) {
        prev.push({
          ...token,
          addressChain: token.address.replace(`${networkPrefix}:`, ""),
        });
      }
      return prev;
    }, []);
  }, [tokens, search, kit]);

  return (
    <div className="size-full flex flex-col justify-center items-center gap-[0.5ch] text-center text-muted-foreground bg-white dark:bg-[#171717] rounded-lg">
      <div className="flex p-4 pb-2 items-center justify-between">
        <h1 className="text-primary">Debug token contract</h1>
      </div>
      <div className="p-4 flex flex-col gap-4 size-full">
        <div className="w-full flex bg-base rounded-[12px] py-2.5 px-2 gap-1.5 border-2">
          <IconSearch size={22} />
          <input
            className="w-full border-none outline-none focus:outline-none p-0"
            placeholder="Search for token"
            value={search}
            onChange={({ target: { value } }) => setSearch(value)}
          />
        </div>
        <div className="h-full flex flex-col gap-4 overflow-y-auto box-border">
          {topTokens.length > 0 && (
            <div className="flex flex-col gap-[4px]">
              <p className="text-gray/50 px-4">Popular</p>
              {topTokens.map((item, i) => {
                return (
                  <ButtonToken
                    key={i}
                    tokenName={item.name}
                    icon={item.icon}
                    tokenAmount="149.0"
                    tokenDescription={item.description}
                    type="exchange"
                    onClick={async () => {
                      setSelectedToken(item);
                    }}
                    className={`border`}
                  />
                );
              })}
            </div>
          )}
          {filteredTokens.length > 0 && (
            <ScrollArea className="h-[50vh]">
              <div className="flex flex-col gap-[4px]">
                <p className="px-4">All tokens</p>
                {filteredTokens.map((item, i) => (
                  <ButtonToken
                    key={i}
                    tokenName={`${item.symbol} / ${item.name}`}
                    icon={item.logoUri}
                    tokenAmount=""
                    tokenDescription={item.address}
                    type="exchange"
                    onClick={() => {
                      setSelectedToken(item);
                    }}
                    className={`border`}
                  />
                ))}
              </div>
            </ScrollArea>
          )}
          {topTokens.length + tokens.length === 0 && !loading && <p>Tokens not found 😨</p>}
        </div>
      </div>
    </div>
  );
});

export const DebugContracts = memo(() => {
  const { contract, setContract } = useDebugContract();

  return (
    <>
      <ChooseToken />
      <Drawer open={!!contract} onClose={() => setContract(undefined)}>
        <DrawerContent>
          <ScrollArea className="h-[80vh]">
            <DrawerHeader className="hidden">
              <DrawerTitle />
            </DrawerHeader>
            <div className="mx-auto w-full max-w-screen-lg">
              <div className="flex flex-col gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center items-center">
                <ContractUI />
              </div>
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </>
  );
});
