import Header from "@/components/Header";
import TagList from "@/components/TagsList";
import fs from "fs";
import YAML from "yaml";

const file = fs.readFileSync("./app/shows/shows.yml", "utf8");
const data = YAML.parse(file);
const categories = Object.keys(data);

export async function generateStaticParams() {
  return Object.keys(data).map((key) => ({
    slug: key,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const shows = data[slug];
  const number = [].concat(shows["movie"]).concat(shows["series"]).length;

  return (
    <div>
      <Header className="capitalize mb-4" title={`${slug} (${number})`} />
      <TagList tags={categories} prefix="shows" />
      {shows["movie"] && (
        <>
          <h2 className="mt-6 mb-2 font-bold text-lg">Movies</h2>
          <ul className="list-disc">
            {shows["movie"].map((show: string, index: number) => (
              <li key={index}>{show}</li>
            ))}
          </ul>
        </>
      )}
      {shows["series"] && (
        <>
          <h2 className="mt-6 mb-2 font-bold text-lg">Series</h2>
          <ul className="list-disc">
            {shows["series"].map((show: string, index: number) => (
              <li key={index}>{show}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
