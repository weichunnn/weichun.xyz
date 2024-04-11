import Header from "@/components/Header";
import { CustomLink } from "@/components/MDXComponents";

export default function Page() {
  return (
    <>
      <Header title={"I'm weichun!"} />
      <p className="mt-4">Welcome to my little internet garden.</p>

      <p className="mt-4">
        I am based of Malaysia 🇲🇾 and I currently work as a platform engineer at{" "}
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
    </>
  );
}
