import { Pool } from "pg";

import { allBlogs } from ".contentlayer/generated/index.mjs";
import { cleanMDXFile, splitIntoChunks } from "./utils";
import { getChangedFiles } from "./git";
import { getEmbeddingsLocal } from "./embeddings";
import { parseArgs } from "node:util";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function createEmbeddingsTable() {
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
    console.log("Embedding tables created if not exist successfully");
  } catch (error) {
    console.error("Error creating Embedding tables:", error);
  } finally {
    client.release();
  }
}

export async function storeEmbeddings(
  text: string,
  link: string,
  title: string
) {
  const client = await pool.connect();

  try {
    const vector = await getEmbeddingsLocal(text);

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

async function deleteExistingEmbeddings(url: string) {
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

const args = parseArgs({
  options: {
    refresh: {
      type: "boolean",
    },
  },
});

async function generate() {
  const shouldRefresh = Boolean(args.values.refresh);

  const { allChanges, deletes } = getChangedFiles("mdx");

  allBlogs
    .filter((blog) => deletes.includes(`content/${blog._raw.sourceFilePath}`))
    .forEach((blog) => deleteExistingEmbeddings(blog.structuredData.url));

  let changedBlogs = allBlogs.filter((blog) =>
    allChanges.includes(`content/${blog._raw.sourceFilePath}`)
  );

  if (shouldRefresh) {
    console.log("Refreshing all embeddings");
    const client = await pool.connect();
    await client.query(`drop table if exists "public"."documents"`);
    changedBlogs = allBlogs;
  }

  await createEmbeddingsTable();

  for (const blog of changedBlogs) {
    const { url, headline } = blog.structuredData;
    if (!shouldRefresh) {
      await deleteExistingEmbeddings(url);
    }
    const rawMDX = cleanMDXFile(blog.body.raw);
    const chunks = await splitIntoChunks(rawMDX);
    const storePromises = chunks.map((chunk) =>
      storeEmbeddings(chunk.text, url, headline)
    );
    await Promise.all(storePromises);
    console.log(`Embeddings for ${headline} refreshed successfully`);
  }
}

generate();
