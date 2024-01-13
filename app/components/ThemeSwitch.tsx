"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return <></>;

  var nextTheme = resolvedTheme === "dark" ? "light" : "dark";
  var icon = resolvedTheme === "dark" ? "sun" : "moon";

  return (
    <span className="cursor-pointer" onClick={() => setTheme(nextTheme)}>
      {icon}
    </span>
  );
}
