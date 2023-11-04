import { allBlogs } from "contentlayer/generated";
import Header from "@/components/Header";
import BlogList from "@/components/BlogList";
import TagList from "@/components/TagsList";

export default function Page() {
  return (
    <>
      <Header title="Blog Posts" className="mb-4" />
      <TagList />
      <BlogList blogs={allBlogs} />
    </>
  );
}
