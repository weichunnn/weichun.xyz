import Header from "@/components/Header";
import { CustomLink } from "@/components/MDXComponents";

export default function Page() {
  return (
    <>
      <Header title={"Now"} />
      <p>
        Inspired by{" "}
        <CustomLink href="https://nownownow.com/about">Derek Sivers</CustomLink>
        , I'm writing this page to share what I'm doing now.
      </p>
      <h2 className="mt-6 mb-2 font-bold text-lg">On my hands</h2>
      <ul className="list-disc grid gap-2">
        <li>
          <CustomLink href="https://10pm.substack.com/">
            Writing a newsletter {" "}
          </CustomLink>
          (subscribe if you haven't!)
        </li>
        <li>Studying at USFCA</li>
        <li>Attending more events in SF</li>
        <li>Writing/journaling daily</li>
      </ul>
      <p className="mt-6">Last updated -&gt; 6th July 2024</p>
    </>
  );
}
