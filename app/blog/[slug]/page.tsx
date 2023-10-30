import { allBlogs, Blog } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import { format, formatDistance } from "date-fns";
import { Metadata } from "next";
import MDXComponents from "@/components/MDXComponents";
import Header from "@/components/Header";
import { HOST } from "@/constants/constant";

export async function generateStaticParams() {
  return allBlogs.map((blog: Blog) => blog.slug);
}

function BlogHeader({
  title,
  readTime,
  date,
  summary,
  tags,
}: {
  title: string;
  date: string;
  readTime: number;
  summary?: string;
  tags?: string[];
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
      {tags && (
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
      {summary && <p className="text-md">tldr: {summary}</p>}
    </>
  );
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const blog = allBlogs.find((blog: Blog) => blog._raw.flattenedPath === slug);
  if (!blog) throw new Error(`Blog not found for slug: ${slug}`);

  const MDXContent = getMDXComponent(blog.body.code);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blog.structuredData),
        }}
      />
      <article className="prose prose-slate m-0">
        <BlogHeader
          title={blog.title}
          date={blog.publishedAt}
          readTime={blog.readTime}
          summary={blog.summary}
          tags={blog.tags}
        />
        <MDXContent components={MDXComponents} />
      </article>
    </div>
  );
}

export function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Metadata {
  const blog = allBlogs.find((blog) => blog.slug === slug);

  if (!blog) return {};

  const { title, summary, publishedAt } = blog;
  const description = summary;

  return {
    metadataBase: new URL(HOST),
    title,
    description,
    openGraph: {
      type: "article",
      url: `${HOST}/blog/${slug}`,
      title,
      description,
      publishedTime: publishedAt,
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
    },
  };
}
