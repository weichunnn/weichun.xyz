import { format, formatDistance } from "date-fns";
import { Blog } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
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
}: {
  title: string;
  date: string;
  readTime: number;
  summary?: string;
  tags?: string[];
  minimal?: boolean;
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
      <Header title={title} className="mb-0" />
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
      />
      <MDXContent components={MDXComponents} />
    </article>
  );
}
