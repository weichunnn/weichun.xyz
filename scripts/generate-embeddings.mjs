import pkg from "pg";
const { Pool } = pkg;
import { pipeline } from "@xenova/transformers";

import { allBlogs } from "../.contentlayer/generated/index.mjs";
import { cleanMDXFile, splitIntoChunks } from "./utils.mjs";
import { getChangedFiles } from "./git.mjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function createTable() {
  const client = await pool.connect();

  try {
    await client.query(`
      create extension if not exists vector with schema public;

      create table if not exists "public"."documents" (
        id bigserial primary key,
        content text,
        url text,
        title text,
        embedding vector(1024)
      );
    `);
    console.log("Embedding tables created successfully");
  } catch (error) {
    console.error("Error creating Embedding tables:", error);
  } finally {
    client.release();
  }
}

async function storeEmbeddings(text, link, title) {
  const client = await pool.connect();

  try {
    const vector = await getEmbeddings(text);

    await client.query(
      `insert into "public"."documents" (content, url, title, embedding) values ($1, $2, $3, $4)`,
      [text, link, title, vector]
    );
  } catch (error) {
    console.error(`Error storing ${title}:`, error);
  } finally {
    client.release();
  }
}

async function getEmbeddings(text) {
  const extractor = await pipeline(
    "feature-extraction",
    "WhereIsAI/UAE-Large-V1"
  );
  const output = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });

  return JSON.stringify(output.tolist()[0]);
}

async function main() {
  await createTable();

  const gitChanges = getChangedFiles("mdx");
  const changedBlogs = allBlogs.filter((blog) =>
    gitChanges.includes(`content/${blog._raw.sourceFilePath}`)
  );

  for (const blog of changedBlogs) {
    const { url, headline } = blog.structuredData;
    await deleteExistingEmbeddings(url);

    const rawMDX = cleanMDXFile(blog.body.raw);
    const chunks = await splitIntoChunks(rawMDX);
    const storePromises = chunks.map((chunk) =>
      storeEmbeddings(chunk.text, url, headline)
    );
    await Promise.all(storePromises);
  }
}

async function deleteExistingEmbeddings(url) {
  const client = await pool.connect();

  try {
    await client.query(`delete from "public"."documents" where url = $1`, [
      url,
    ]);
    console.log(`Deleted existing embeddings for URL: ${url}`);
  } catch (error) {
    console.error(`Error deleting embeddings for URL ${url}:`, error);
  } finally {
    client.release();
  }
}

main();
