module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000000",
      white: "#ffffff",
      primary: {
        DEFAULT: "#111196",
        50: "#f0f0ff",
        100: "#e0e0ff",
        200: "#c7c7ff",
        300: "#9e9eff",
        400: "#6e6ef7",
        500: "#4d4deb",
        600: "#3a3ad9",
        700: "#2e2ebf",
        800: "#2a2a9b",
        900: "#111196",
        950: "#0a0a5c",
      },
      secondary: {
        DEFAULT: "#1a365d",
        50: "#f7fafc",
        100: "#e6f0ff",
        200: "#b3d1ff",
        300: "#80b2ff",
        400: "#4d93ff",
        500: "#1a75ff",
        600: "#0052cc",
        700: "#003d99",
        800: "#002966",
        900: "#001433",
      },
      error: {
        50: "#fef2f2",
        500: "#ef4444",
        700: "#b91c1c",
      },
      warning: {
        50: "#fffbeb",
        500: "#f59e0b",
        700: "#b45309",
      },
      success: {
        50: "#ecfdf5",
        500: "#10b981",
        700: "#047857",
      },
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
    },
    extend: {
      fontFamily: {
        sans: [
          "var(--font-sans, Inter)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: ["var(--font-mono, JetBrains Mono)", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      opacity: {
        15: "0.15",
        85: "0.85",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
