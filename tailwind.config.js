/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      transitionDuration: {
        '600': '600ms',
      },
      scale: {
        '98': '.98',
      },
      colors: {
        dark: {
          DEFAULT: '#1A2D42',
          50: '#1f3754',
          100: '#243f61',
          200: '#2a476e',
          300: '#2f4f7b',
          400: '#355788',
          500: '#3a5f95',
          600: '#4067a2',
          700: '#456faf',
          800: '#4b77bc',
          900: '#507fc9',
        },
      },
    },
  },
  plugins: [],
};