/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        "gray-alpha": "rgba(217, 217, 217, 0.17)",
        black: "#3B3B3B",
        gray: "#848484",
        "light-gray": "#D6D6D6",
        slate: "#F8F8F8",
        blue: "#0089D6",
        "blue-light": "#DFF4FF",
      },
      animation: {
        flick: "flick 1s ease-out forwards infinite",
        fadeOut: "fadeOut 1s ease-in-out forwards",
        fadeIn: "fadeIn 1s ease-in-out forwards 1s",
        fadeOutFast: "fadeOut 0.5s ease-in-out forwards", 
        fadeInFast: "fadeIn 0.5s ease-in-out forwards",
      },
      keyframes: {
        flick: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(30deg)",
          },
        },
        fadeOut: {
          "0%": {
            opacity: "1", // Starting fully visible
          },
          "100%": {
            opacity: "0", // Ending fully transparent
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0", // Starting fully transparent
          },
          "100%": {
            opacity: "1", // Ending fully visible
          },
        },
      },
      dropShadow: {
        "4xl": "0px 48px 100px rgba(17, 12, 46, 0.15)",
      },
      boxShadow: {
        "3xl": "0px 0px 89px 0px rgba(0, 0, 0, 0.11)",
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      margin: {
        "score-divider-custom--sm": "71px",
      },
    },
    borderRadius: {
      "custom-none": "0px",
      "custom-sm": "8px",
      custom: "20px",
      "custom-lg": "89px",
      full: "9999px",
    },
    keyframes: {
      spin: {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
      loading: {
        "0%, 20%": { content: "'loading'" },
        "40%": { content: "'loading.'" },
        "60%": { content: "'loading..'" },
        "80%": { content: "'loading...'" },
        "100%": { content: "'loading....'" },
      },
    },
    animation: {
      spin: "spin 0.7s linear infinite both",
    },
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [require("daisyui")],
};
