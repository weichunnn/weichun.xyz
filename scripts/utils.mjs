import { AutoTokenizer } from "@xenova/transformers";

const MAX_TOKEN = 100;

function removeJSX(text) {
  const regex = /<[^>]+>/g;
  return text.replace(regex, "");
}

// Extract the link text from a markdown link
function extractLink(text) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  return text.replace(regex, (match, p1, p2) => p1);
}

// Replace newline characters with spaces within a string
function replaceNewlineWithSpace(text) {
  return text.replace(/\n/g, " ");
}

export function cleanMDXFile(mdxContent) {
  const lines = mdxContent.split("\n");
  let currentContent = "";
  let inCodeBlock = false;

  for (const line of lines) {
    // Toggle the inCodeBlock flag when encountering code blocks
    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
    }

    if (!inCodeBlock) {
      // Extract the link text from the line, remove any JSX syntax, and append it to the current section content
      const processed = extractLink(removeJSX(line));
      currentContent += `${processed}\n`;
    } else {
      // Append the line to the current section content when inside a code block
      currentContent += `${line}\n`;
    }

    // Replace newline characters with spaces in the current section content
    currentContent = replaceNewlineWithSpace(currentContent);
  }

  return currentContent;
}

// export async function splitIntoChunks(inputText) {
//   const chunks = [];
//   let chunk = {
//     tokens: [],
//     start: 0,
//     end: 0,
//   };

//   let start = 0;

//   const tokenizer = await AutoTokenizer.from_pretrained(
//     "Xenova/bert-base-uncased"
//   );

//   const tokenized = await tokenizer.encode(inputText);
//   const tokens = await tokenizer.model.convert_ids_to_tokens(tokenized);

//   for (let i = 1; i < tokens.length - 1; i++) {
//     const word = tokens[i];
//     const newChunkTokens = [...chunk.tokens, word];
//     if (newChunkTokens.length > MAX_TOKEN) {
//       const text = chunk.tokens.join("");

//       chunks.push({
//         text,
//         start,
//         end: start + text.length,
//       });

//       start += text.length + 1;

//       chunk = {
//         tokens: [word],
//         start,
//         end: start,
//       };
//     } else {
//       chunk = {
//         ...chunk,
//         tokens: newChunkTokens,
//       };
//     }
//   }

//   chunks.push({
//     ...chunk,
//     text: chunk.tokens.join(""),
//   });

//   return chunks;
// }

export async function splitIntoChunks(inputText) {
  const sentences = inputText.split(/(?<!\d)\.(?!\d) +|(?<=[!?]) +/);

  let chunks = [];
  let currentChunk = "";
  let currentChunkTokens = 0;

  const tokenizer = await AutoTokenizer.from_pretrained(
    "Xenova/bert-base-uncased"
  );

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
