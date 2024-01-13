import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};
export default config;
