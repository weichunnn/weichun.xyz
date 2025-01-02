import Header from "@/components/Header";
import { CustomLink } from "@/components/MDXComponents";

export default function Page() {
  return (
    <>
      <Header title={"I'm weichun!"} />
      <p className="mt-4">Welcome to my little internet garden.</p>
      <p className="mt-4">
        I currently work as a founding engineer at{" "}
        <CustomLink href="https://www.inklink.com/">InkLInk</CustomLink>. I'm
        based out of SF.
      </p>
      <p className="mt-4">
        On a broader note, I am interested in <i>distributed computing</i> and
        how it can be used to speed up processing in databases. I am also deeply
        invested in <i>system design</i> and how each small component build up
        the world around us.
      </p>
      <p className="mt-4">
        I recently graduated with a BS in Computer Science from{" "}
        <CustomLink href="https://www.monash.edu/">
          Monash University
        </CustomLink>{" "}
        in June 2023. I am currently pursuing a MS in Data Science at USF.
      </p>
      <p className="mt-4">
        Previously, I worked at{" "}
        <CustomLink href="https://moneylion.com/">MoneyLion</CustomLink>.
      </p>
    </>
  );
}
