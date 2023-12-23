import dotenv from "dotenv";
import { allBlogs } from "../.contentlayer/generated/index.mjs";
import algoliasearch from "algoliasearch";

const search = async function () {
  dotenv.config();
  try {
    const blogs = allBlogs.map((blog) => ({
      objectID: blog.slug,
      _id: blog._id,
      slug: blog.slug,
      title: blog.title,
      publishedAt: blog.publishedAt,
      body: blog.body.raw,
    }));
    const client = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
      process.env.ALGOLIA_SEARCH_ADMIN_KEY
    );

    const index = client.initIndex("blogs");
    const algoliaResponse = await index.saveObjects(blogs);

    console.log(
      `🎉 Successfully added ${
        algoliaResponse.objectIDs.length
      } records to Algolia search. Object IDs:\n${algoliaResponse.objectIDs.join(
        "\n"
      )}`
    );
  } catch (error) {
    console.log(error);
  }
};

search();
