/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Force dark mode to be enabled
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Define your theme colors here to match the CSS variables
        background: '#1a1a1a',
        foreground: '#f5f5f5',
        card: '#262626',
        'card-foreground': '#f5f5f5',
        primary: '#d2b48c', // Sand color
        'primary-foreground': '#262626',
        secondary: '#e6d2b5', // Lighter sand
        'secondary-foreground': '#262626',
        muted: '#404040',
        'muted-foreground': '#a0a0a0',
        accent: '#d2b48c',
        'accent-foreground': '#262626',
        border: '#404040',
      },
    },
  },
  plugins: [],
};