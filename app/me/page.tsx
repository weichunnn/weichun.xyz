import content from "./content.md";
import CustomMarkdown from "@/components/markdown-renderer";

export default function Page() {
  return <CustomMarkdown content={content} />;
}
