"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "@phosphor-icons/react";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return <></>;

  var nextTheme = resolvedTheme === "dark" ? "light" : "dark";
  var icon = resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />;

  return (
    <span className="cursor-pointer" onClick={() => setTheme(nextTheme)}>
      {icon}
    </span>
  );
}
