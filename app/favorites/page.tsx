import Header from "@/components/Header";
import { CustomLink } from "@/components/MDXComponents";
import TagList from "@/components/TagsList";
import fs from "fs";
import YAML from "yaml";

export default function Page() {
  const file = fs.readFileSync("./app/shows/shows.yml", "utf8");
  const data = YAML.parse(file);
  const categories = Object.keys(data);

  return (
    <>
      <Header title={"Favorites"} />
      <p>A list of things I like ❤️</p>
      <h2 className="mt-6 mb-2 font-bold text-lg">Phone apps</h2>
      <div className="grid md:grid-cols-2 mt-2">
        <li>
          <CustomLink href="https://artifact.news/">Artifact</CustomLink>
        </li>
      </div>
      <h2 className="mt-6 mb-2 font-bold text-lg">Mac apps</h2>
      <p>Things I installed on Mac that I use on a daily basis</p>
      <>
        <div className="grid md:grid-cols-2 mt-2">
          <li>
            <CustomLink href="https://www.raycast.com/">Raycast</CustomLink>
          </li>
          <li>
            <CustomLink href="https://amie.so">Amie</CustomLink>
          </li>

          <li>
            <CustomLink href="https://arc.net/">Arc</CustomLink>
          </li>
          <li>
            <CustomLink href="https://www.warp.dev/">Warp</CustomLink>
          </li>
          <li>
            <CustomLink href="https://bear.app/">Bear</CustomLink>
          </li>
          <li>
            <CustomLink href="https://mos.caldis.me/">Mos</CustomLink>
          </li>
          <li>
            <CustomLink href="https://fig.io/">Fig</CustomLink>
          </li>
          <li>
            <CustomLink href="https://micropixels.software/batfi">
              Batfi
            </CustomLink>
          </li>
          <li>
            <CustomLink href="https://breaktimer.app/">Breaktimer</CustomLink>
          </li>
          <li>
            <CustomLink href="https://freemacsoft.net/appcleaner/">
              AppCleaner
            </CustomLink>
          </li>
          <li>
            <CustomLink href="https://www.prettyclean.cc/">
              PrettyClean
            </CustomLink>
          </li>
        </div>
      </>

      <h2 className="mt-6 mb-2 font-bold text-lg">Movies & Series</h2>
      <TagList tags={categories} prefix="shows" />
    </>
  );
}
