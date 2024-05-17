"use client";

import { ThemeProvider } from "next-themes";
import CommandBar from "@/components/KBar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme='light'>
      <CommandBar>{children}</CommandBar>
    </ThemeProvider>
  );
}
