import { format, formatDistance } from "date-fns";
import { Blog } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import Link from "next/link";
import Header from "./Header";
import MDXComponents from "./MDXComponents";
import TagList from "./TagsList";

function BlogHeader({
  title,
  readTime,
  date,
  summary,
  tags,
  minimal,
  slug,
}: {
  title: string;
  date: string;
  readTime: number;
  summary?: string;
  tags?: string[];
  minimal?: boolean;
  slug: string;
}) {
  const publishedAt = new Date(date);
  const timeAgo = formatDistance(publishedAt, new Date(), {
    addSuffix: true,
  });
  const readPeriod = `${readTime} ${readTime > 1 ? "minutes" : "minute"}`;
  const timestampInformation = `${format(
    publishedAt,
    "MMMM do, y"
  )} (${timeAgo}) • ${readPeriod}`;
  return (
    <>
      <Link className="no-underline" href={`/blog/${slug}`}>
        <Header title={title} className="mb-0" />
      </Link>
      <p className="my-2">{timestampInformation}</p>
      <TagList tags={tags} />
      {summary && !minimal && <p className="text-md">tldr: {summary}</p>}
    </>
  );
}

export default function BlogPost({
  blog,
  minimal = false,
}: {
  blog: Blog;
  minimal?: boolean;
}) {
  const MDXContent = getMDXComponent(blog.body.code);

  return (
    <article className="prose prose-slate m-0">
      <BlogHeader
        title={blog.title}
        date={blog.publishedAt}
        readTime={blog.readTime}
        summary={blog.summary}
        tags={blog.tags}
        minimal={minimal}
        slug={blog.slug}
      />
      <MDXContent components={MDXComponents} />
    </article>
  );
}
