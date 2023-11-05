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
          ? "no-underline text-indigo-500 hover:text-indigo-700"
          : className
      }
    />
  );
};

const CustomImage = (props: any) => {
  return (
    <>
      <Image
        width={600}
        height={400}
        className="rounded-xl mb-4 m-auto"
        {...props}
      />
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
