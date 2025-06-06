import { ReadOnlyFunctionForm } from "@/components/debug-contract/_components/contract";
import type {
  Contract,
  ContractName,
  GenericContract,
  InheritedFunctions,
} from "@/libs/scaffold-eth/utils/contract";
import type { Abi, AbiFunction } from "abitype";

export const ContractReadMethods = ({
  deployedContractData,
}: { deployedContractData: Contract<ContractName> }) => {
  if (!deployedContractData) {
    return null;
  }

  const functionsToDisplay = (
    ((deployedContractData.abi || []) as Abi).filter(
      (part) => part.type === "function",
    ) as AbiFunction[]
  )
    .filter((fn) => {
      const isQueryableWithParams =
        (fn.stateMutability === "view" || fn.stateMutability === "pure") && fn.inputs.length > 0;
      return isQueryableWithParams;
    })
    .map((fn) => {
      return {
        fn,
        inheritedFrom: (
          (deployedContractData as GenericContract)?.inheritedFunctions as InheritedFunctions
        )?.[fn.name],
      };
    })
    .sort((a, b) => (b.inheritedFrom ? b.inheritedFrom.localeCompare(a.inheritedFrom) : 1));

  if (!functionsToDisplay.length) {
    return <>No read methods</>;
  }

  return (
    <>
      {functionsToDisplay.map(({ fn, inheritedFrom }) => (
        <ReadOnlyFunctionForm
          abi={deployedContractData.abi as Abi}
          contractAddress={deployedContractData.address}
          abiFunction={fn}
          key={fn.name}
          inheritedFrom={inheritedFrom}
        />
      ))}
    </>
  );
};
