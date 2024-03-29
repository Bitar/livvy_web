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
        "brand-green": "#838b64",
        "brand-orange": "#986954",
        "brand-grey": "#2E2A2B",
        "brand-blue": "#a4b3b8"
      }
    },
    container: {
      center: true,
    },
  },
  plugins: [],
}

