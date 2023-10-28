import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="grid grid-cols-1 gap-2">
      <Link className="text-2xl mb-6 font-bold" href="/">
        weichun
      </Link>
      <Link href="/blog">blog</Link>
      <Link href="/now">now</Link>
    </div>
  );
}
