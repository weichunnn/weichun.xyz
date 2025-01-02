"use client";

import Link from "next/link";
import ThemeSwitch from "@/components/ThemeSwitch";

export default function Menubar() {
  return (
    <>
      <div className="flex align-center justify-center md:justify-start">
        <Link className="text-xl mb-6 font-bold" href="/">
          曾伟骏
        </Link>
      </div>
      <div className="flex align-center justify-center flex-wrap space-x-4 md:space-x-0 md:justify-start md:flex-col md:space-y-4">
        <Link href="/me">me</Link>
        <Link href="/now">now</Link>
        <Link href="/blog">blogs</Link>
        <Link href="/search">🔎</Link>
        {/* <Link href="https://10pm.substack.com/">newsletter</Link> */}
        {/* <Link href="/favorites">favorites</Link> */}
        <Link href="/contact">say hi</Link>
        <div className="flex md:mt-0">
          <ThemeSwitch />
        </div>
      </div>
    </>
  );
}
