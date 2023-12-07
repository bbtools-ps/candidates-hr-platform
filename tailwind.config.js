/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        "blue-dark": "#2c2c2c",
        blue: "#095aba",
        red: "#dc2626",
        orange: "#e68619",
        green: "#2d9d78",
        gray: "#ccc",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
