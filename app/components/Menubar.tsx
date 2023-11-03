import Link from "next/link";

export default function Menubar() {
  return (
    <>
      <div className="flex align-center justify-center md:justify-start">
        <Link className="text-2xl mb-6 font-bold" href="/">
          weichun
        </Link>
      </div>
      <div className="flex align-center justify-center flex-wrap space-x-4 md:space-x-0 md:justify-start md:flex-col md:space-y-4">
        <Link href="/me">me</Link>
        <Link href="/now">now</Link>
        <Link href="/blog">blog</Link>
      </div>
    </>
  );
}
