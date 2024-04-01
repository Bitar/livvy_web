/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "liv-tan": "#e8e6e0",
        "liv-green": "#838b64",
        "liv-orange": "#986954",
        "liv-grey": "#2E2A2B",
        "liv-blue": "#a4b3b8"
      }
    },
    container: {
      center: true,
    },
  },
  plugins: [],
}

