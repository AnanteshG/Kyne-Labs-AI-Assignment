import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172033",
        muted: "#64748b",
        line: "#d9e2ec",
        canvas: "#f6f8fb",
        panel: "#ffffff",
        cobalt: "#2457c5",
        forest: "#0f766e",
        plum: "#7c3aed",
        clay: "#b45309",
        success: "#118c5a",
        warning: "#b7791f",
        danger: "#c2410c"
      },
      boxShadow: {
        panel: "0 1px 2px rgba(15, 23, 42, 0.06)",
        raised: "0 18px 45px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
