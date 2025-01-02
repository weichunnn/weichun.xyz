import { VoyageAIClient } from "voyageai";
import { EMBEDDING_MODEL } from "@/constants/constant";

const voyageClient = new VoyageAIClient({
  apiKey: process.env.VOYAGE_AI_API_KEY,
});

export async function getEmbeddingsRemote(text: string) {
  if (!text) return null;

  try {
    const queryEmbedding = await voyageClient.embed({
      model: EMBEDDING_MODEL.split("/")[1],
      input: text,
    });
    const embedding = queryEmbedding?.data?.[0]?.embedding;

    if (!embedding || embedding.length === 0) return null;
    return `[${embedding.join(",")}]`;
  } catch (error) {
    console.error("Error generating embeddings:", error);
    return null;
  }
}
