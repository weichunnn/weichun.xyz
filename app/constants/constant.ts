const HOST =
  process.env.NODE_ENV == "production"
    ? "https://weichun.xyz"
    : "http://localhost:3000";

export { HOST };
