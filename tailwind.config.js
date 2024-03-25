/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tan: "#e8e6e0",
        green: "#838b64",
        orange: "#986954",
        "brand-grey": "#2E2A2B",
        blue: "#a4b3b8"
      }
    },
  },
  plugins: [],
}

