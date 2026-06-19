import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Lead accent — the "Zindagi" orange from the logo
        brand: {
          DEFAULT: "#FE680F",
          light: "#FE8A1C",
          dark: "#E25600",
        },
        // Support accent — the shield green from the logo
        accent: {
          DEFAULT: "#2D8D46",
          light: "#3FB860",
          dark: "#24793B",
        },
        // Theme-aware orange for TEXT (keeps contrast ≥ AA on both themes)
        brandtext: "var(--brand-text)",
        // Warm tint for soft section bands
        cream: "#FFF7E6",
      },
    },
  },
  plugins: [],
};

export default config;
