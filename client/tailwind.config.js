/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          50:  '#fdf8f3',
          100: '#f5e6d3',
          200: '#e8c99a',
          300: '#d4a96a',
          400: '#c0893a',
          500: '#a06830',
          600: '#7d4f22',
          700: '#5c3716',
          800: '#3d230d',
          900: '#1f1007',
        },
        gold: {
          50:  '#fffdf0',
          100: '#fff8cc',
          200: '#ffed85',
          300: '#ffd93d',
          400: '#ffc61a',
          500: '#e6a800',
          600: '#b37f00',
          700: '#7f5a00',
          800: '#4d3600',
          900: '#1a1200',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
    },
  },
  plugins: [],
}
