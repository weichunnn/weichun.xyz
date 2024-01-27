const HOST =
  process.env.NODE_ENV == "production"
    ? "https://weichun.xyz"
    : "http://localhost:3000";

const EMBEDDING_URL = "https://api-inference.huggingface.co/models/";

const EMBEDDING_MODEL = "WhereIsAI/UAE-Large-V1";

const MATCH_THRESHOLD = 0.6;

const MATCH_COUNT = 5;

export { HOST, EMBEDDING_URL, EMBEDDING_MODEL, MATCH_THRESHOLD, MATCH_COUNT };
