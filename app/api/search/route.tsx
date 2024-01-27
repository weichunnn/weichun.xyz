import { NextRequest, NextResponse } from "next/server";
import { getEmbeddingsRemote } from "@/scripts/embeddings";
import { Client } from "@neondatabase/serverless";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { query, matchThreshold, matchCount } = await req.json();
    const embeddingsVector = await getEmbeddingsRemote(query);
    const embeddings = JSON.stringify(embeddingsVector[0][0]);

    const client = new Client(process.env.DATABASE_URL);
    await client.connect();

    const { rows } = await client.query(
      `SELECT content from match_documents($1, $2, $3)`,
      [embeddings, matchCount, matchThreshold]
    );
    const internalContent = rows.map((row) => row.content);
    return NextResponse.json(internalContent, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unexpected error occurred" },
      { status: 500 }
    );
  }
}
