import { allBlogs } from "contentlayer/generated";
import Header from "@/components/Header";
import BlogList from "@/components/BlogList";
import BlogTags from "@/components/BlogTags";

export default function Page() {
  return (
    <>
      <Header title="Blog Posts" className="mb-4" />
      <BlogTags />
      <BlogList blogs={allBlogs} />
    </>
  );
}
