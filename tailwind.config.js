/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Tajawal"', '"Cairo"', "system-ui", "sans-serif"],
        sans: ['"Tajawal"', '"Cairo"', "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          950: "#04060c",
          900: "#070a14",
          800: "#0b0f1e",
          700: "#111729",
        },
        cyber: {
          50: "#e6fbff",
          100: "#b8f1ff",
          200: "#7be4ff",
          300: "#3ed3ff",
          400: "#22b8ec",
          500: "#0e8fc0",
          600: "#0a6b94",
        },
        signal: {
          danger: "#ff3b6b",
          warn: "#ffb648",
          safe: "#39f0a0",
        },
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(62,211,255,0.55)",
        "glow-soft": "0 0 80px -20px rgba(62,211,255,0.35)",
        "glow-danger": "0 0 60px -10px rgba(255,59,107,0.5)",
        "glow-safe": "0 0 60px -10px rgba(57,240,160,0.45)",
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(ellipse at center, rgba(62,211,255,0.18), transparent 60%)",
        "grid-fade":
          "linear-gradient(rgba(62,211,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(62,211,255,0.06) 1px, transparent 1px)",
      },
      animation: {
        "spin-slow": "spin 28s linear infinite",
        "spin-slower": "spin 60s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.65" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
