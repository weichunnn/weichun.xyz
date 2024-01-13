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
          ? "no-underline text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-200"
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

const Embed = ({ src, ...props }: { src: string; props: any }) => {
  return (
    <iframe
      className="aspect-video w-full rounded-xl"
      src={src}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      {...props}
    />
  );
};

const BlockQuote = (props: any) => {
  return (
    <div className="flex h-auto px-4 py-2">
      <div className="bg-indigo-500 rounded w-1" />
      <div className="pl-4 flex-1 m-1">
        {props.children.map((child: any, index: number) => {
          if (child.props) {
            return <p key={index}>{child.props.children}</p>;
          }
        })}
      </div>
    </div>
  );
};

const MDXComponents = {
  Embed: Embed,
  Image: CustomImage,
  a: CustomLink,
  blockquote: BlockQuote,
};

export { CustomLink };

export default MDXComponents;
