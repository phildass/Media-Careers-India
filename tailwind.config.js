/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          lavender: '#E6E6FA',
          'lavender-dark': '#9370DB',
        },
        accent: {
          red: '#DC143C',
          'red-dark': '#B22222',
        },
      },
    },
  },
  plugins: [],
}
