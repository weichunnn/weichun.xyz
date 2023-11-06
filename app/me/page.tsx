import Header from "@/components/Header";
import { CustomLink } from "@/components/MDXComponents";

export default function Page() {
  return (
    <>
      <Header title={"Welcome"} />
      <p className="mt-4">Hello, I'm Wei Chun.</p>

      <p className="mt-4">
        I currently work as a platform engineer at{" "}
        <CustomLink href="https://www.moneylion.com/">MoneyLion</CustomLink>.
        There, I build and ship big data infrastructure to support the
        organization's data needs.
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
        in June 2023. Some of the notable things I did include{" "}
        <CustomLink href="https://github.com/weichunnn/soja/tree/main">
          research and implementation of the SOJA algorithm
        </CustomLink>
        ,{" "}
        <CustomLink href="https://handbook.monash.edu/2024/units/FIT2014?year=2024">
          teaching Theory of Computation
        </CustomLink>
        , and{" "}
        <CustomLink href="https://drive.google.com/file/d/1SqZ1HeCXPcry34NxDlm2OJKbznOw_LE8/view?usp=sharing">
          building a next-gen annotation platform.
        </CustomLink>
      </p>
      <p className="mt-4">
        Previously, I worked at{" "}
        <CustomLink href="https://paywithsplit.co/">Split</CustomLink> and{" "}
        <CustomLink href="https://futurelab.my/">FutureLab</CustomLink>.
      </p>
      <h2 className="mt-6 font-bold text-lg">Say hi!</h2>
      <p className="mt-2 mb-4">
        I like meeting new people and learning about you. Let's be friends :)
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
