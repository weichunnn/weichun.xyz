import Link from "next/link";

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
        <Link href="/blog">blog</Link>
        <Link href="/now">now</Link>
        <Link href="/favorites">favorites</Link>
        <Link
          href="https://weichunnn.notion.site/Story-of-My-Life-0995d02d3ba0427ba5b957b7f16a46ce"
          target="_blank"
        >
          pictures
        </Link>
      </div>
    </>
  );
}
