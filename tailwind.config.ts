import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        archive: {
          ink: "#070707",
          coal: "#111113",
          graphite: "#1d1d20",
          ash: "#a8a29e",
          paper: "#f3ead8",
          ember: "#f97316",
          gold: "#f6c453",
          rust: "#7f1d1d",
          blood: "#450a0a",
        },
      },
      boxShadow: {
        ember: "0 0 32px rgba(249, 115, 22, 0.18)",
        memorial: "0 24px 80px rgba(0, 0, 0, 0.42)",
      },
      backgroundImage: {
        "archive-radial":
          "radial-gradient(circle at 18% 12%, rgba(249, 115, 22, 0.16), transparent 32%), radial-gradient(circle at 82% 18%, rgba(127, 29, 29, 0.28), transparent 38%), linear-gradient(135deg, #070707 0%, #111113 48%, #1b0b0b 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
