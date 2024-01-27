"use client";

import Link from "next/link";
import ThemeSwitch from "@/components/ThemeSwitch";
import { useKBar, useRegisterActions } from "kbar";
import { useEffect, useState } from "react";
import { useCompletion } from "ai/react";
import { Binoculars, Command } from "@phosphor-icons/react";

export default function Menubar() {
  const { complete, completion } = useCompletion();
  const [now, setNow] = useState("");

  const { search, currentRootActionId, query } = useKBar((state) => ({
    search: state.searchQuery,
    currentRootActionId: state.currentRootActionId,
  }));

  useEffect(() => {
    if (search != "") setNow(search);
    if (currentRootActionId === "initial-search") {
      console.log("searching for", now);
      complete(now);
    }
  }, [search]);

  useRegisterActions(
    [
      {
        id: "initial-search",
        name: `Search ${now}`,
        shortcut: ["s"],
        keywords: "search-blogs",
        section: "General",
        icon: <Binoculars size={20} />,
        subtitle: "Search for something",
        priority: 100,
      },
      {
        id: "completion",
        name: `${completion}`,
        parent: "initial-search",
        completion: true,
      } as any,
    ],
    [now, completion]
  );

  return (
    <>
      <div className="flex align-center justify-center md:justify-start">
        <Link className="text-xl mb-6 font-bold" href="/">
          曾伟骏
        </Link>
      </div>
      <div className="flex align-center justify-center flex-wrap space-x-4 md:space-x-0 md:justify-start md:flex-col md:space-y-4">
        <Link href="/me">me</Link>
        <Link href="/blog">blog</Link>
        <Link href="/now">now</Link>
        <Link href="/favorites">favorites</Link>
        <div className="flex gap-4">
          <ThemeSwitch />
          <Command
            size={20}
            onClick={query.toggle}
            className="cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}
