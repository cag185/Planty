/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.vue", "./components/**/*.vue", "./pages/**/*.vue"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e8f5e9",
          100: "#c8e6c9",
          200: "#a5d6a7",
          300: "#81c784",
          400: "#66bb6a",
          500: "#4caf50",
          600: "#43a047",
          700: "#388e3c",
          800: "#2e7d32",
          900: "#1b5e20",
        },
        surface: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#eeeeee",
          300: "#e0e0e0",
        },
        text: {
          primary: "#212121",
          secondary: "#6b7280",
          tertiary: "#9ca3af",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      boxShadow: {
        "material-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        material:
          "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        "material-md":
          "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)",
        "material-lg":
          "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)",
      },
    },
  },
  plugins: [],
};
