import { Blog } from "contentlayer/generated";
import { compareDesc, format } from "date-fns";
import Link from "next/link";

export default function BlogList({ blogs }: { blogs: Blog[] }) {
  const sortedBlogs = blogs.sort((a, b) =>
    compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))
  );

  return (
    <div className="grid grid-cols-1 gap-2">
      {sortedBlogs.map((blog, index) => (
        <Link key={index} href={`/blog/${blog.slug}`}>
          <div className="flex flex-row  justify-between gap-4">
            <span className="flex-1" key={blog._id}>
              {blog.title}
            </span>
            <span>{format(new Date(blog.publishedAt), "MMM dd, yyyy")}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
