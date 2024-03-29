import { EMBEDDING_MODEL, EMBEDDING_URL } from "@/constants/constant";
import { pipeline } from "@xenova/transformers";

export async function getEmbeddingsLocal(text: string) {
  const extractor = await pipeline("feature-extraction", EMBEDDING_MODEL);
  const output = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });

  return JSON.stringify(output.tolist()[0]);
}

export async function getEmbeddingsRemote(text: string) {
  const response = await fetch(EMBEDDING_URL, {
    headers: {
      Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ input: text, model: EMBEDDING_MODEL }),
  });
  const output = await response.json();
  return JSON.stringify(output.data[0].embedding);
}
