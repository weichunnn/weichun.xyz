import { Configuration, OpenAIApi } from "openai";

export const runtime = "edge";

const prompt = ```
# Knowledge Graph Instructions for GPT-4
## 1. Overview
You are a top-tier algorithm designed for extracting information in structured formats to build a knowledge graph.
- **Nodes** represent entities and concepts. They're akin to Wikipedia nodes.
- The aim is to achieve simplicity and clarity in the knowledge graph, making it accessible for a vast audience.
## 2. Labeling Nodes
- **Consistency**: Ensure you use basic or elementary types for node labels.
  - For example, when you identify an entity representing a person, always label it as **"person"**. Avoid using more specific terms like "mathematician" or "scientist".
- **Node IDs**: Never utilize integers as node IDs. Node IDs should be names or human-readable identifiers found in the text.
{'- **Allowed Node Labels:**' + ", ".join(allowed_nodes) if allowed_nodes else ""}
{'- **Allowed Relationship Types**:' + ", ".join(allowed_rels) if allowed_rels else ""}
- **Group**: Is an integer that represents a larger category grouping of nodes.
- **Value**: Is a string that is the http link to the relevent document on the website.
## 3. Handling Numerical Data and Dates
- Numerical data, like age or other related information, should be incorporated as attributes or properties of the respective nodes.
- **No Separate Nodes for Dates/Numbers**: Do not create separate nodes for dates or numerical values. Always attach them as attributes or properties of nodes.
- **Property Format**: Properties must be in a key-value format.
- **Quotation Marks**: Never use escaped single or double quotes within property values.
- **Naming Convention**: Use camelCase for property keys, e.g., 'birthDate'.
## 4. Coreference Resolution
- **Maintain Entity Consistency**: When extracting entities, it's vital to ensure consistency.
If an entity, such as "John Doe", is mentioned multiple times in the text but is referred to by different names or pronouns (e.g., "Joe", "he"),
always use the most complete identifier for that entity throughout the knowledge graph. In this example, use "John Doe" as the entity ID.
Remember, the knowledge graph should be coherent and easily understandable, so maintaining consistency in entity references is crucial.
## 5. Strict Compliance
Adhere to the rules strictly. Non-compliance will result in termination.
## 6. Output Format
Below is an example of the output.
{
  nodes: [
    { id: "Myriel", group: 'person' },
    { id: "Napoleon", group: 'person'},
    { id: "Mlle.Baptistine", group: 'person'},
    { id: "Mme.Magloire", group: 'person'},
  ],
  links: [
    { source: "Napoleon", target: "Myriel", value: 'http://weichun.xyz/fight-napolean' },
    { source: "Mlle.Baptistine", target: "Myriel" },
    { source: "Mme.Magloire", target: "Myriel", value: http://weichun.xyz/magloire' },
  ]
}

Input: 
file: about-taste-in-the-modern-world.mdx
---
title: About Taste in the Modern World
publishedAt: 2024-01-19T16:10:12+0800
summary:
tags:
  - thoughts
---

With social media proliferating all over, is taste is still a thing in the modern world?

For someone who is scrolling through social media, their taste are always being evaluated, and they are always getting fed the same content they watch.

It's harder to find that confrontation or experience that helps your discover things that you like. These algorithmic recommendations prevents us from being challenged and surprised all the time, like everything is already expected. When is the last time, you actually find something totally new (out of the domain) that you like?

Another chain of thought - Humans had moved away from being attached to a curator's taste to averaging out what everyone thinks. For example, there used to be a curated list of movies that someone would recommend, but nowadays, people flock to Reddit to search for what's the best movie to watch in 2024 and then pick the most upvoted one or the most mentioned.

But think of it, why would you want a generic experience?

I think we can all agree that stepping away from social media would be a good step to take. It's hard in the beginning but it's worth it. It took me a while but I am glad I am now experiencing things to find out my likes and dislikes.

Input: taste-and-creativity.mdx
file: about-taste-in-the-modern-world.mdx
---
title: Taste and Creativity
publishedAt: 2023-12-17T22:28:26+0800
summary:
tags:
  - life
---

> Good taste' is simply to have a well formed opinion, in accordance with the realities of the Good and the True - John Folley

**Taste** is a word difficult to be defined and when people ask us, we usually answer it as 'in the eye of the beholder', 'unique' or 'creative'.

**Taste** is built up over time and it's an individual sense or gut feeling that dictates your everyday decision making. The minute and minor decision making of likes and dislikes that happen in your brain each time you make a choice on a subject that has no correct answer is **Taste**.

On being rich. I personally believe you don't need to be rich to have good **Taste**. I know people who had excellent **Taste** in the tools they use or the food the choose to eat yet will not spend more than 20 bucks on lunch.

**Taste** can be cultivated over time and is a valuable asset for creativeness and fulfillment. Here are some of my recommendations that you can easily do:

- Cafe hopping
- Museum visits
- Reading old classic novels
- Watching movies from [Rober Ebert List of Great Movies](https://www.rogerebert.com/great-movies)
- Listening to music from [Rolling Stone 500](https://www.rollingstone.com/music/music-lists/best-albums-of-all-time-1062063/)

```;

export async function POST(req: Request) {
  const { content } = await req.json();

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
    });
    const keywords = response.data.choices[0].text.trim().split("\n");
    res.status(200).json({ keywords });
  } catch (error) {
    console.error("Error in extracting keywords:", error);
    res.status(500).json({ error: "Error in extracting keywords" });
  }
}
