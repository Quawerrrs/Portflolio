/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        subtleGradientMove: "subtleGradientMove 20s ease infinite",
      },
    },
  },
  plugins: [],
};
