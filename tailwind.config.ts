import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          dark: "hsl(var(--primary-dark))",
          light: "hsl(var(--primary-light))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        navy: {
          DEFAULT: "hsl(var(--navy))",
          light: "hsl(var(--navy-light))",
          dark: "hsl(var(--navy-dark))",
        },
        cyan: {
          DEFAULT: "hsl(var(--cyan))",
          light: "hsl(var(--cyan-light))",
          dark: "hsl(var(--cyan-dark))",
        },
        // Enhanced Green Colors
        green: {
          DEFAULT: "hsl(var(--green))",
          light: "hsl(var(--green-light))",
          dark: "hsl(var(--green-dark))",
          neon: "hsl(var(--green-neon))",
          electric: "hsl(var(--green-electric))",
          cyber: "hsl(var(--green-cyber))",
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "hsl(var(--green))", // Electric green
          600: "hsl(var(--green-dark))",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        // NEW: Electric Red Spectrum
        red: {
          DEFAULT: "hsl(var(--red))",
          light: "hsl(var(--red-light))",
          dark: "hsl(var(--red-dark))",
          neon: "hsl(var(--red-neon))",
          electric: "hsl(var(--red-electric))",
          cyber: "hsl(var(--red-cyber))",
          crimson: "hsl(var(--red-crimson))",
          scarlet: "hsl(var(--red-scarlet))",
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "hsl(var(--red))", // Electric red
          600: "hsl(var(--red-dark))",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        // Enhanced Blue Spectrum
        blue: {
          DEFAULT: "hsl(var(--blue))",
          light: "hsl(var(--blue-light))",
          dark: "hsl(var(--blue-dark))",
          neon: "hsl(var(--blue-neon))",
          electric: "hsl(var(--blue-electric))",
          cyan: "hsl(var(--blue-cyan))",
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "hsl(var(--blue))", // Electric blue
          600: "hsl(var(--blue-dark))",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        // Define black colors properly
        black: {
          DEFAULT: "hsl(var(--black))",
          light: "hsl(var(--black-light))",
          dark: "hsl(var(--black-dark))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "color-cycle": {
          "0%": { filter: "hue-rotate(0deg)" },
          "33%": { filter: "hue-rotate(120deg)" },
          "66%": { filter: "hue-rotate(240deg)" },
          "100%": { filter: "hue-rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease-in-out infinite",
        "color-cycle": "color-cycle 10s linear infinite",
      },
      fontFamily: {
        space: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
