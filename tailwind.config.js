/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'big': {'max': '1300px'},
      // => @media (max-width: 1300px) { ... }
      'md': {'max': '1030px'},
      // => @media (max-width: 1030px) { ... }
      'tab': {'max': '790px'},
      // => @media (max-width: 1030px) { ... }
      'mobile': {'max': '430px'},
      // => @media (max-width: 430px) { ... }
    },
    fontFamily:{
      body: ['Nunito Sans']
    },
    extend: {
      colors: {
       "light": {
        "Text": "hsl(200, 15%, 8%)",
        "Input": "hsl(0, 0%, 52%)",
        "Background": "hsl(0, 0%, 98%)"
       },
       "dark":{
        "Elements":"hsl(209, 23%, 22%)",
        "Background": "hsl(207, 26%, 17%)",
       },
       "neutral":"hsl(0, 0%, 100%)"
      }
    },
  },
  plugins: [],
}

