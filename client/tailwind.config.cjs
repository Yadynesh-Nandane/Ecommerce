/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        amazon: "url('./src/assets/amazon.png')",
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0,0,0,0.3)",
      },
      keyframes: {
        "slide-in": {
          "0%": {
            "-webkit-transform": "translateX(-200px)",
            transform: "translateX(-200px)",
          },
          "100%": {
            "-webkit-transform": "translateX(0px)",
            transform: "translateX(0px)",
          },
        },
        "slide-out": {
          "0%": {
            "-webkit-transform": "translateX(0px)",
            transform: "translateX(0px)",
          },
          "100%": {
            "-webkit-transform": "translateX(-200px)",
            transform: "translateX(-200px)",
          },
        },
      },
      animation: {
        "slide-in": "slide-in 0.5s ease-out",
        "slide-out": "slide-out 0.5s ease-out",
      },
      fontFamily: {
        poppins: "'PT Sans', sans-serif",
      },
    },
  },
  plugins: [],
};
