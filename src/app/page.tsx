import { ThemeToggle } from "@/app/theme-toogle";
import { ConnectWallet } from "@/components/connect-wallet";
import { DebugContracts } from "@/components/debug-contracts";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-3.5">
      <main className="flex flex-col items-center gap-y-9 pb-12">
        <div className="max-w-lg space-y-3.5 text-center">
          <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">0wallet</h1>
          <p className="md:text-balance text-muted-foreground md:text-xl">
            connect wallet with <span className="font-mono">reown</span> and get desired info from{" "}
            <span className="font-mono">polygon</span> contract also{" "}
            <span className="font-mono">read</span> and <span className="font-mono">write</span>{" "}
            calls to contract
          </p>
        </div>
        <div className="flex items-center gap-3.5">
          <ThemeToggle />
          <ConnectWallet />
          <Link href="https://github.com/bardak-dev/0w" target="_blank">
            <Button variant="ghost" className="rounded-xl">
              GitHub &rarr;
            </Button>
          </Link>
        </div>
        <div className="size-full flex justify-center">
          <DebugContracts />
        </div>
      </main>

      <footer className="absolute bottom-3.5 mx-auto flex items-center gap-[0.5ch] text-center text-muted-foreground">
        <Link
          href="https://github.com/bardak-dev"
          target="_blank"
          className="group flex items-center gap-[0.5ch] underline-offset-4 hover:underline"
        >
          <div className="flex items-center gap-2">
            <div className="flex size-6 justify-center items-center">
              <Image
                src="https://avatars.githubusercontent.com/u/5928632"
                alt="bardak-dev logo"
                width={32}
                height={32}
                unoptimized
                className="size-5 group-hover:size-6 transition-all rounded-full"
              />
            </div>
            <span>bardak-dev</span>
          </div>
        </Link>
      </footer>
    </div>
  );
};
