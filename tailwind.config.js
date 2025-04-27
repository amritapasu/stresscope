/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
      extend: {
        keyframes: {
          gradientMove: {
            "0%": { backgroundPosition: "0% 0%" },
            "50%": { backgroundPosition: "50% 100%" },
          },
          fadeInLeft: {
            "0%": { opacity: "0", transform: "translateX(-50px)" },
            "100%": { opacity: "1", transform: "translateX(0)" },
          },
        },
        animation: {
          gradientMove: "gradientMove 30s linear infinite",
          fadeInLeft: "fadeInLeft 1.5s ease-out",
        },
      },
    },
    plugins: [],
  };
  