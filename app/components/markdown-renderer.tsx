import React from "react";
import ReactMarkdown from "react-markdown";
import { CustomLink } from "@/components/MDXComponents";

interface CustomMarkdownProps {
  content: string;
}

export default function CustomMarkdown({ content }: CustomMarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        a: ({ node, ...props }) => <CustomLink {...props} />,
        p: ({ node, ...props }) => (
          <p style={{ marginBottom: "2em" }} {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="list-disc list-inside grid gap-2" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
