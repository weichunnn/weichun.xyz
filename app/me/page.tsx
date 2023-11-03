import Header from "@/components/Header";
import { CustomLink } from "@/components/MDXComponents";

export default function Page() {
  return (
    <>
      <Header title={"Welcome"} />
      <p>
        Hi, I'm Wei Chun. I'm a <b>data engineer</b> and an avid reader. I'm
        currently working as a platform engineer at{" "}
        <CustomLink href="https://www.moneylion.com/">MoneyLion</CustomLink>,
        where I build and deploy big data infrastructure to support the
        organization's data needs. Before MoneyLion, I worked as a software
        engineer at{" "}
        <CustomLink href="https://paywithsplit.co/">Split</CustomLink> in
        Singapore.
      </p>
      <p className="mt-4">
        On a broader note, I am interested in distributed computing and how it
        can be used to speed up processing in databases. I did a review &
        implementation on the{" "}
        <CustomLink href="https://github.com/weichunnn/soja/blob/main/reports/Code%20Report.pdf">
          SOJA algorithm
        </CustomLink>{" "}
        implemented by Dr David Tanier. I am looking into deepening my
        understanding in this field through research.
      </p>
      <p className="mt-4">
        I received a BS in Computer Science from{" "}
        <CustomLink href="https://www.monash.edu/">
          Monash University
        </CustomLink>{" "}
        in June 2023.
      </p>
      <h2 className="mt-6 font-bold text-lg">Say hi!</h2>
      <p className="mt-2 mb-4">
        I like meeting new people and learning about your work. Let's be friends
        :)
      </p>
      <ul className="list-disc">
        <li>
          <CustomLink href="https://twitter.com/_weichunnn">Twitter</CustomLink>
        </li>
        <li>
          <CustomLink href="https://github.com/weichunnn">GitHub</CustomLink>
        </li>
        <li>
          <CustomLink href="https://www.linkedin.com/in/wei-chun/">
            LinkedIn
          </CustomLink>
        </li>
        <li>
          <CustomLink href="https://curius.app/wei-chun-tan">Curius</CustomLink>
        </li>
      </ul>
    </>
  );
}
