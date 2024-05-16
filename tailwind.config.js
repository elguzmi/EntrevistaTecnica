/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        color_blue: '#1e57f8',
        color_yellow: '#f8bf1e',
        color_dark: '#212121',
        color_white: '#ffffff'
      }
    }
  },
  plugins: []
}
