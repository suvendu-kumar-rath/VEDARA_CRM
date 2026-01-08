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
        dark: "#111111",
        "dark-light": "#181818",
        accent: "#FFD600",
        "accent-light": "#FFF9C4",
        "gray-border": "#232323",
        "gray-text": "#B0B0B0",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
