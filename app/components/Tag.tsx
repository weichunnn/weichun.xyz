import Link from "next/link";

export default function Tag({ tag, prefix }: { tag: string; prefix: string }) {
  return (
    <span className="bg-[#EEF2F6] hover:bg-[#E3E8EF] text-indigo-500  dark:hover:bg-[#40444D] dark:bg-[#2D313C] dark:text-indigo-400 font-medium m-0 hover:cursor-pointer px-2 py-1 mr-2 mb-2 inline-block rounded-lg not-prose">
      <Link href={`/${prefix}/${tag}`}>#{tag}</Link>
    </span>
  );
}
