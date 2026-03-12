/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: "#000000",
        "dark-light": "#080808",
        accent: "#FFD600",
        "accent-light": "#FFF9C4",
        "gray-border": "#1A1A1A",
        "gray-text": "#B0B0B0",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
