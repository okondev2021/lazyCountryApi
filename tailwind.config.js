/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       "light": {
        "Text": "hsl(200, 15%, 8%)",
        "Input": "hsl(0, 0%, 52%)",
        "Background": "hsl(0, 0%, 98%)"
       },
       "dark":{

       }
      }
    },
  },
  plugins: [],
}

