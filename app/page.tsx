import Link from "next/link";
import { allBlogs, Blog } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import BlogPost from "@/components/BlogPost";
import Header from "@/components/Header";

export default function Page() {
  const sortedBlogs = allBlogs.sort((a, b) =>
    compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))
  );

  const recentBlogs = sortedBlogs.slice(0, 5);
  return (
    <>
      <Header title={"Recent Blogs"} className="mb-8" />

      {recentBlogs.map((blog: Blog, index: number) => {
        return (
          <div className="mb-32" key={index}>
            <BlogPost blog={blog} minimal />
          </div>
        );
      })}
      <p className="text-center">
        <Link href="/blog">Others ➡️</Link>
      </p>
    </>
  );
}
