/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        slidein: "slidein 0.25s ease-in-out",
        slideout: "slideout 0.25s ease-in-out",
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0,0,0,0.3)",
      },
      keyframes: {
        slidein: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        slideout: {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
      },
      fontFamily: {
        poppins: "'PT Sans', sans-serif",
      },
    },
  },
  plugins: [],
};
