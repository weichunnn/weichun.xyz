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
          <CustomLink href="https://lu.ma/luminarykl">
            Socratica in KL
          </CustomLink>
        </li>
        <li>
          <CustomLink href="https://10pm.substack.com/">
            Writing a newsletter {" "}
          </CustomLink>
          (subscribe if you haven't!)
        </li>
        <li>
          Starting a medium publication
        </li>
        <li>
          Reading {" "}
          <CustomLink href="https://www.goodreads.com/book/show/43877.The_Monk_Who_Sold_His_Ferrari">
           The Monk Who Sold His Ferrari
          </CustomLink>
        </li>
        <li>Preparing to head to San Francisco for graduate school</li>
        <li>
          Building {" "}
          <CustomLink href="https://github.com/opebus/yt-university">
          Youtube University
          </CustomLink>
        </li>
        <li>Writing/journaling daily</li>
      </ul>
      <p className="mt-6">Last updated -&gt; 12th April 2024</p>
    </>
  );
}
