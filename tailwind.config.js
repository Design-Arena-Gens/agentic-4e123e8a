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
        telegram: {
          blue: '#0088cc',
          lightblue: '#64b5f6',
          darkblue: '#006699',
        }
      }
    },
  },
  plugins: [],
}
