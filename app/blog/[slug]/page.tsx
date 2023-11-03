import { allBlogs, Blog } from "contentlayer/generated";
import { Metadata } from "next";
import { HOST } from "@/constants/constant";
import BlogPost from "@/components/BlogPost";

export async function generateStaticParams() {
  return allBlogs.map((blog: Blog) => blog.slug);
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const blog = allBlogs.find((blog: Blog) => blog._raw.flattenedPath === slug);
  if (!blog) throw new Error(`Blog not found for slug: ${slug}`);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blog.structuredData),
        }}
      />
      <BlogPost blog={blog} />
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
