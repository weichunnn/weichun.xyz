import { allBlogs } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import Link from "next/link";
import Header from "@/components/Header";

export default function Page() {
  const sortedBlogs = allBlogs.sort((a, b) =>
    compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))
  );

  return (
    <div>
      <Header title="Blog Posts" />
      {sortedBlogs.map((blog, index) => (
        <Link key={index} href={`/blog/${blog.slug}`}>
          <div className="flex flex-row items-center justify-between">
            <span key={blog._id}>{blog.title}</span>
            <span>{blog.publishedAt}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
