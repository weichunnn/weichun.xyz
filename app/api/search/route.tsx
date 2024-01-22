import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getEmbeddingsRemote } from "@/scripts/embeddings";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { query, matchThreshold, matchCount } = await req.json();

  const embeddingsVector = await getEmbeddingsRemote(query);
  const embeddings = embeddingsVector[0][0];

  const supabaseClient = createClient(
    process.env.SUPABASE_PROJECT_URL as string,
    process.env.SUPABASE_KEY as string
  );

  try {
    const { data, error } = await supabaseClient.rpc("match_documents", {
      query_embedding: embeddings,
      match_threshold: matchThreshold,
      match_count: matchCount,
    });

    if (error) {
      console.error("Error calling match_documents:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Unexpected error occurred" },
      { status: 500 }
    );
  }
}
