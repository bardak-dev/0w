"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppKit } from "@/libs/reown/config";
import type { ThemeMode } from "@reown/appkit";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const kit = useAppKit();

  useEffect(() => {
    if (kit.getThemeMode() === theme) {
      return;
    }
    kit.setThemeMode(theme as ThemeMode);
    kit.setThemeVariables({
      "--w3m-accent": theme === "dark" ? "#ffffff" : "#000000",
    });
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="" asChild>
        <Button variant="outline" size="icon" className="rounded-xl">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="rounded-t-[10px] cursor-pointer"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="cursor-pointer rounded-b-[10px]"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
