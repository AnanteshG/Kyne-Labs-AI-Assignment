import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        muted: "#6b7280",
        line: "#e5e7eb",
        canvas: "#f8fafc",
        panel: "#ffffff",
        cobalt: "#2563eb",
        forest: "#0f766e",
        plum: "#6d28d9",
        clay: "#b45309",
        success: "#059669",
        warning: "#d97706",
        danger: "#dc2626"
      },
      boxShadow: {
        panel: "0 1px 2px rgba(15, 23, 42, 0.06)",
        raised: "0 18px 45px rgba(15, 23, 42, 0.08)",
        tremor: "0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
