import Link from "next/link";
import Image from "next/image";
import LinkAttributeType from "@/interface/LinkAttributeType";

const CustomLink = (props: any) => {
  const { href, className } = props;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  let linkAttributes: LinkAttributeType = {};
  if (!isInternalLink) {
    linkAttributes.target = "_blank";
    linkAttributes.rel = "noopener noreferrer";
  }

  return (
    <Link
      href={href}
      {...props}
      {...linkAttributes}
      className={
        className != "anchor"
          ? "font-bold no-underline bg-slate-200 py-1 px-2 rounded-lg text-emerald-700 hover:text-emerald-300"
          : className
      }
    />
  );
};

const MDXComponents = {
  Image,
  a: CustomLink,
};

export { CustomLink };

export default MDXComponents;
