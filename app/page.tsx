import Link from "next/link";
import { allBlogs, Blog } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import BlogPost from "@/components/BlogPost";
import Header from "@/components/Header";
import { HOST } from "./constants/constant";

export default function Page() {
  const sortedBlogs = allBlogs.sort((a, b) =>
    compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))
  );

  const recentBlogs = sortedBlogs.slice(0, 10);
  return (
    <>
      <Header title={"Recent Blogs"} className="mb-4" />
      <meta property="og:image" content={`${HOST}/api/og`} />
      {recentBlogs.map((blog: Blog, index: number) => {
        return (
          <div className="mb-80" key={index}>
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
