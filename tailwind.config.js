/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'ui-sans-serif', 'system-ui'],
        display: ['Manrope', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        ink: '#142b2a',
        mint: '#dcefe9',
        teal: '#0d4f4a',
        coral: '#ef846d',
        paper: '#f7faf7',
      },
      boxShadow: {
        soft: '0 18px 50px rgba(21, 61, 56, 0.10)',
      },
    },
  },
  plugins: [],
}
