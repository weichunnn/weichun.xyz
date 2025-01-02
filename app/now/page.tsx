import Header from "@/components/Header";
import CustomMarkdown from "@/components/markdown-renderer";
import content from "./content.md";

export default function Page() {
  return (
    <>
      <Header title={"Now"} />
      <CustomMarkdown content={content} />
    </>
  );
}
