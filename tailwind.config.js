/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "Apple Color Emoji", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
