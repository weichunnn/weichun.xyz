import fs from "fs";
import YAML from "yaml";

import Header from "@/components/Header";
import TagList from "@/components/TagsList";

export default function Page() {
  const file = fs.readFileSync("./app/shows/shows.yml", "utf8");
  const data = YAML.parse(file);
  const categories = Object.keys(data);

  return (
    <>
      <Header title={"Favorite Shows"} className="mb-4" />
      <TagList tags={categories} prefix="shows" />
    </>
  );
}
