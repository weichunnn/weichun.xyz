"use client";

import Link from "next/link";
import ThemeSwitch from "@/components/ThemeSwitch";

export default function Menubar() {
  return (
    <div className="flex align-center justify-between">
      <Link className="text-xl font-bold" href="/">
        曾伟骏
      </Link>
      <div className="space-x-6">
        <Link href="/blog">blogs</Link>
        <Link href="/me">me</Link>
        {/* <Link href="/now">now</Link> */}
        {/* <Link href="https://10pm.substack.com/">newsletter</Link> */}
        {/* <Link href="/favorites">favorites</Link> */}
        <Link href="/contact">contact</Link>
        <Link href="/search">🔎</Link>
        <ThemeSwitch />
      </div>
    </div>
  );
}
