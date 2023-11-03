import { format, formatDistance } from "date-fns";
import { Blog } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import Header from "./Header";
import MDXComponents from "./MDXComponents";

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
      {tags && !minimal && (
        <ul className="list-none m-0 p-0">
          {tags.map((tag, index) => (
            <li
              key={index}
              className="bg-zinc-200 text-slate-600 px-3 mr-2 mb-2 inline-block rounded-lg font-bold"
            >
              #{tag}
            </li>
          ))}
        </ul>
      )}
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
