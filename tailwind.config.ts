/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{ts,js,jsx,tsx,json,md}",
    "./public/**/*.{png,jpg,jpeg,svg,webp,gif,ico,txt,csv,json}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#f5f5f5',
        fg: '#111111',
        muted: '#999999',
        accent: '#2563eb',
        card: '#ffffff',
        border: '#e5e5e5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};