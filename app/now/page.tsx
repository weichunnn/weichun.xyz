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
        <li>Work work work</li>
        <li>Capturing daily learning through writing</li>
        <li>More hackathons</li>
        <li>Applying to Grad School</li>
        <li>Trying to contribute to OSS</li>
      </ul>
    </>
  );
}
