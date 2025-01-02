import { NextRequest, NextResponse } from "next/server";
import { Client } from "@neondatabase/serverless";
import { getEmbeddingsRemote } from "@/scripts/embeddings";
export interface SearchResult {
  id: string;
  content: string;
  slug: string;
  title: string;
  similarity: number;
}
export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("q");
    console.log("search queried:", query);
    const matchThreshold = Number(searchParams.get("matchThreshold")) | 0.5;
    const matchCount = Number(searchParams.get("matchCount")) | 10;

    if (!query) {
      return new Response("Missing query parameter", { status: 400 });
    }
    const embedding = await getEmbeddingsRemote(query);

    const databaseClient = new Client(process.env.DATABASE_URL);
    await databaseClient.connect();

    const { rows }: { rows: SearchResult[] } = await databaseClient.query(
      `SELECT * from match_documents($1::vector, $2, $3)`,
      [embedding, matchThreshold, matchCount]
    );
    const uniqueResults = Object.values(
      rows.reduce(
        (acc, curr) => {
          if (!acc[curr.slug] || acc[curr.slug].similarity < curr.similarity) {
            acc[curr.slug] = curr;
          }
          return acc;
        },
        {} as Record<string, SearchResult>
      )
    );
    return NextResponse.json(uniqueResults, { status: 200 });
  } catch (error) {
    console.error("Error fetching search results:", error);
    return NextResponse.json(
      { error: "Unexpected error occurred" },
      { status: 500 }
    );
  }
}
