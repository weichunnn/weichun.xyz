"use client";

import { format, formatDistance } from "date-fns";
import { Blog } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import Link from "next/link";
import Header from "./Header";
import MDXComponents from "./MDXComponents";
import TagList from "./TagsList";
import Graph from "./KnowledgeGraph/NetworkGraph";
import { data } from "./KnowledgeGraph/data";
import React, { useRef, useEffect } from "react";
import { Node, NodeLink } from "./KnowledgeGraph/data";

function BlogHeader({
  title,
  date,
  readTime,
  slug,
  tags = [],
  summary,
  minimal,
}: {
  title: string;
  date: string;
  readTime: number;
  slug: string;
  tags: string[];
  summary?: string;
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
      <Link className="no-underline" href={`/blog/${slug}`}>
        <Header title={title} className="mb-0" />
      </Link>
      <p className="my-2">{timestampInformation}</p>
      <TagList tags={tags} prefix="tag" />
      {summary && !minimal && <p className="text-md">tldr: {summary}</p>}
    </>
  );
}

const KnowledgeGraph = () => {
  const svgRef = useRef(null);

  const chart = Graph(data, {
    nodeGroup: (d: Node) => d.group,
    nodeTitle: (d: Node) => `${d.id}`,
    width: 600,
    height: 500,
  } as any);

  useEffect(() => {
    if (svgRef.current && chart) {
      svgRef.current.innerHTML = ""; // Clear existing content
      svgRef.current.appendChild(chart);
      console.log(chart);
    }
  }, [chart]); // Dependency array includes `icon` to re-run effect when `icon` changes

  return <div ref={svgRef} />;
};

export default function BlogPost({
  blog,
  minimal = false,
}: {
  blog: Blog;
  minimal?: boolean;
}) {
  const MDXContent = getMDXComponent(blog.body.code);

  return (
    <>
      <article className="prose dark:prose-invert prose-sm prose-slate m-0 max-w-[2000px]">
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
      <div
        id="tooltip"
        style={{
          position: "absolute",
          visibility: "hidden",
          backgroundColor: "red",
          padding: "5px",
          borderRadius: "5px",
        }}
      />
      <KnowledgeGraph />
    </>
  );
}
