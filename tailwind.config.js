// tailwind.config.js
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {},
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: '#005BC4',
          secondary: '#004493',
          white: '#f8fafc',
          body: '#ECEDEE',
          border:'#E4E4E7',

        },
        
      },
      dark: {

      }
    }
  })]
}