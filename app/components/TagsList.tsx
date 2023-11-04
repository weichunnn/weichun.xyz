import { allBlogs } from "contentlayer/generated";
import Tag from "./Tag";

export default function TagList({ tags = [] }: { tags?: string[] }) {
  let allTags: string[] = tags;

  if (!tags.length) {
    const uniqueTags: any = new Set();
    allBlogs.forEach((blog) => {
      blog.tags.forEach((tag) => uniqueTags.add(tag));
    });
    allTags = Array.from(uniqueTags);
    allTags.sort();
  }

  return (
    <div className="flex flex-wrap gap-1 mb-8">
      {allTags.map((tag, index) => {
        return <Tag key={index} tag={tag} />;
      })}
    </div>
  );
}
