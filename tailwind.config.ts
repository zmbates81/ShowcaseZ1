import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm "paper" document feel
        paper: "#FAF8F3",
        "paper-2": "#F2EDE2",
        // Deep ink navy
        ink: "#0C1B2A",
        "ink-2": "#15293D",
        "ink-soft": "#3A4F63",
        muted: "#6B7C8C",
        // Warm brass/gold accent (a nod to Ohio + a "premium ledger" feel)
        gold: "#C29A4C",
        "gold-deep": "#9A7530",
        // Semantic
        profit: "#15876A",
        "profit-soft": "#1AA17F",
        loss: "#C24E3A",
        "loss-soft": "#D9694F",
        line: "#E7E0D2",
        "line-dark": "#23384C",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        prose: "42rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(12,27,42,0.04), 0 12px 40px -12px rgba(12,27,42,0.18)",
        "card-dark": "0 1px 2px rgba(0,0,0,0.3), 0 24px 60px -20px rgba(0,0,0,0.6)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "bob": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.5" },
          "50%": { transform: "translateY(6px)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 0.9s ease both",
        float: "float 6s ease-in-out infinite",
        bob: "bob 1.8s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
