const HOST =
  process.env.NODE_ENV == "production"
    ? "https://weichuntan.com"
    : "http://localhost:3000";

const EMBEDDING_MODEL = "voyageai/voyage-3";

export { HOST, EMBEDDING_MODEL };
