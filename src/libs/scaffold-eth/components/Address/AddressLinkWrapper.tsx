import { useTargetNetwork } from "@/libs/scaffold-eth/hooks";
import Link from "next/link";
import { hardhat } from "viem/chains";

type AddressLinkWrapperProps = {
  children: React.ReactNode;
  disableAddressLink?: boolean;
  blockExplorerAddressLink: string;
};

export const AddressLinkWrapper = ({
  children,
  disableAddressLink,
  blockExplorerAddressLink,
}: AddressLinkWrapperProps) => {
  const { targetNetwork } = useTargetNetwork();

  return disableAddressLink ? (
    <>{children}</>
  ) : (
    <Link
      href={blockExplorerAddressLink}
      target={targetNetwork.id === hardhat.id ? undefined : "_blank"}
      rel={targetNetwork.id === hardhat.id ? undefined : "noopener noreferrer"}
    >
      {children}
    </Link>
  );
};
