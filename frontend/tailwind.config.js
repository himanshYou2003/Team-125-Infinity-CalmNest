// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0a0a',
          800: '#1f1f1f',
          700: '#2d2d2d',
          600: '#3d3d3d',
        },
        primary: '#6366f1', // Indigo
        secondary: '#a855f7' // Purple
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}