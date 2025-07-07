/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        petrol: "#355C7D",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        spicy: ['"Spicy Rice"', 'cursive'],
      },
    },
  },
  plugins: [],
};

