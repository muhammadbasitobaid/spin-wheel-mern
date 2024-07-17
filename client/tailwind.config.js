/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
      spin: "spin 1s linear infinite",
      loading: "loading 2.5s steps(5, end) infinite",
    },
  },
  plugins: [require("daisyui")],
};
