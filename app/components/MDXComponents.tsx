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
          ? "font-bold no-underline bg-slate-200 py-1 px-2 rounded-lg text-emerald-700 hover:text-emerald-400 whitespace-nowrap"
          : className
      }
    />
  );
};

const CustomImage = (props: any) => {
  return (
    <>
      <Image {...props} className="rounded-xl mb-4" width={600} height={400} />
      <p className="text-center text-sm text-gray-500 mt-0">{props.alt}</p>
    </>
  );
};

const MDXComponents = {
  Image: CustomImage,
  a: CustomLink,
};

export { CustomLink, CustomImage };

export default MDXComponents;
