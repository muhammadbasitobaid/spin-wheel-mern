import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // v1 explicit palette (use when semantic mapping isn't enough)
        "v1-black": "#3B3B3B",
        "v1-gray": "#848484",
        "v1-light-gray": "#D6D6D6",
        "v1-slate": "#F8F8F8",
        "v1-blue": "#0089D6",
        "v1-blue-light": "#DFF4FF",
        "v1-alpha": "rgba(217, 217, 217, 0.17)",

        // shadcn semantic tokens mapped to v1 light-mode colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "v1-none": "0px",
        "v1-sm": "8px",
        v1: "20px",
        "v1-lg": "89px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "v1-3xl": "0px 0px 89px 0px rgba(0, 0, 0, 0.11)",
      },
      dropShadow: {
        "v1-4xl": "0px 48px 100px rgba(17, 12, 46, 0.15)",
      },
      keyframes: {
        flick: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(30deg)" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        flick: "flick 1s ease-out forwards infinite",
        fadeOut: "fadeOut 1s ease-in-out forwards",
        fadeIn: "fadeIn 1s ease-in-out forwards 1s",
        fadeOutFast: "fadeOut 0.5s ease-in-out forwards",
        fadeInFast: "fadeIn 0.5s ease-in-out forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
