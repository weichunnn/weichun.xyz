import { allBlogs } from "contentlayer/generated";
import { compareDesc, format } from "date-fns";
import Link from "next/link";
import Header from "@/components/Header";

export default function Page() {
  const sortedBlogs = allBlogs.sort((a, b) =>
    compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))
  );

  return (
    <>
      <Header title="Blog Posts" className="mb-4" />
      <div className="grid grid-cols-1 gap-2">
        {sortedBlogs.map((blog, index) => (
          <Link key={index} href={`/blog/${blog.slug}`}>
            <div className="flex flex-row items-center justify-between">
              <span key={blog._id}>{blog.title}</span>
              <span>{format(new Date(blog.publishedAt), "MMMM dd, yyyy")}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
