import { EMBEDDING_MODEL } from "@/constants/constant";
import { AutoTokenizer } from "@xenova/transformers";

const MAX_TOKEN = 256;

function removeJSX(text: string) {
  const regex = /<[^>]+>/g;
  return text.replace(regex, "");
}

function extractLink(text: string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  return text.replace(regex, (match, p1, p2) => p1);
}

function replaceNewlineWithSpace(text: string) {
  return text.replace(/\n/g, " ");
}

export function cleanMDXFile(mdxContent: string) {
  const lines = mdxContent.split("\n");
  let currentContent = "";
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
    }

    if (!inCodeBlock) {
      const processed = extractLink(removeJSX(line));
      currentContent += `${processed}\n`;
    } else {
      currentContent += `${line}\n`;
    }

    currentContent = replaceNewlineWithSpace(currentContent);
  }

  return currentContent;
}

export async function splitIntoChunks(inputText: string) {
  const sentences = inputText.split(/(?<!\d)\.(?!\d) +|(?<=[!?]) +/);

  let chunks = [];
  let currentChunk = "";
  let currentChunkTokens = 0;

  const tokenizer = await AutoTokenizer.from_pretrained(EMBEDDING_MODEL);

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    const sentenceTokens = await tokenizer.encode(sentence).length;

    if (currentChunkTokens + sentenceTokens > MAX_TOKEN) {
      chunks.push({ text: currentChunk });
      currentChunk = sentence;
      currentChunkTokens = sentenceTokens;
    } else {
      currentChunk += (currentChunk ? " " : "") + sentence;
      currentChunkTokens += sentenceTokens;
    }
  }

  if (currentChunk) {
    chunks.push({ text: currentChunk });
  }

  return chunks;
}
