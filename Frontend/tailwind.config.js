module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        pulseArrow: {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(-4px)", opacity: "0.6" },
        },
      },
      animation: {
        pulseArrow: "pulseArrow 1s infinite ease-in-out",
      },
    },
  },
};
