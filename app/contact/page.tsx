import Header from "@/components/Header";
import { CustomLink } from "@/components/MDXComponents";

export default function Page() {
  return (
    <>
      <Header title={"Say Hi"} />
      <p>
        I like meeting new people and learning about you. Let's be friends :)
      </p>
      <p className="mt-4">Email me at weichuntan1211@gmail[dot]com.</p>
      <h2 className="mt-6 mb-2 font-bold text-md">
        Other platforms you can find me
      </h2>
      <ul className="list-disc grid gap-2">
        <li>
          <CustomLink href="https://www.linkedin.com/in/wei-chun/" product>
            Linkedin
          </CustomLink>{" "}
          |{" "}
          <CustomLink href="https://twitter.com/_weichunnn" product>
            Twitter
          </CustomLink>{" "}
          |{" "}
          <CustomLink
            href="https://discord.com/users/689137626120585302"
            product
          >
            Discord
          </CustomLink>
        </li>
        <li>
          <CustomLink href="https://github.com/weichunnn" product>
            GitHub
          </CustomLink>
        </li>
        <li>
          <CustomLink href="https://medium.com/@weichunnn" product>
            Medium
          </CustomLink>{" "}
          |{" "}
          <CustomLink href="https://substack.com/@weichunnn" product>
            Substack
          </CustomLink>
        </li>
        <li>
          <CustomLink href="https://curius.app/wei-chun-tan" product>
            Curius
          </CustomLink>{" "}
          |{" "}
          <CustomLink
            href="https://open.spotify.com/user/2qbpcaws8vq6s3nqrj9ib2r5v?si=bfe302facec54380"
            product
          >
            Spotify
          </CustomLink>{" "}
          |{" "}
          <CustomLink
            href="https://www.goodreads.com/user/show/174410518-wei-chun"
            product
          >
            Goodreads
          </CustomLink>
        </li>
      </ul>
    </>
  );
}
