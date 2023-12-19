import Link from "next/link";

export default function Tag({ tag, prefix }: { tag: string; prefix: string }) {
  return (
    <span className="bg-slate-100 font-medium m-0 text-indigo-500 hover:bg-indigo-500 hover:text-white hover:cursor-pointer px-2 py-1 mr-2 mb-2 inline-block rounded-lg not-prose">
      <Link href={`/${prefix}/${tag}`}>#{tag}</Link>
    </span>
  );
}
