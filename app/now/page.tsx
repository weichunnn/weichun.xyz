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
        <li>Working</li>
        <li>
          <CustomLink href="https://lu.ma/socraticakl">Socratica in KL </CustomLink>
        </li>
        <li>Reading Almanack of Naval Ravikant</li>
        <li>Building product on the side</li>
        <li>Writing/journaling daily</li>
        <li>Applying to graduate school</li>
      </ul>
      <p className="mt-6">Last updated -> 15th January 2023</p>
    </>
  );
}
