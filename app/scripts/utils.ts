import { EMBEDDING_MODEL } from "@/constants/constant";
import { AutoTokenizer } from "@xenova/transformers";

const MAX_TOKEN = 150;

export function cleanMDXFile(mdxContent: string) {
  const lines = mdxContent.split("\n");
  return lines
    .filter((line) => !line.startsWith("```")) // Remove code block delimiters
    .filter((line) => !/<[^>]+>/.test(line)) // Remove lines with JSX
    .filter((line) => !/<Image[^>\n]*\/>/.test(line)) // Remove lines with Image component
    .join("\n");
}

export async function splitIntoChunks(inputText: string) {
  const paragraphs = inputText.split(/\n\s*\n/);
  let chunks = [];
  let currentChunk = "";
  let currentChunkTokensCount = 0;
  const tokenizer = await AutoTokenizer.from_pretrained(EMBEDDING_MODEL);

  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    const paragraphTokenCount = await tokenizer.encode(paragraph).length;

    const isHeader = paragraph.trim().startsWith("#");
    const isListItem =
      paragraph.trim().startsWith("-") || paragraph.trim().startsWith("*");

    if ((isHeader || isListItem) && currentChunk) {
      chunks.push({ text: currentChunk });
      currentChunk = paragraph;
      currentChunkTokensCount = paragraphTokenCount;
    } else if (currentChunkTokensCount + paragraphTokenCount > MAX_TOKEN) {
      if (paragraphTokenCount > MAX_TOKEN) {
        if (currentChunk) {
          chunks.push({ text: currentChunk });
        }
        chunks.push({ text: paragraph });
        currentChunk = "";
        currentChunkTokensCount = 0;
      } else {
        chunks.push({ text: currentChunk });
        currentChunk = paragraph;
        currentChunkTokensCount = paragraphTokenCount;
      }
    } else {
      currentChunk += (currentChunk ? "\n\n" : "") + paragraph;
      currentChunkTokensCount += paragraphTokenCount;
    }
  }

  if (currentChunk) {
    chunks.push({ text: currentChunk });
  }

  return chunks;
}
