import typography from '@tailwindcss/typography';

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: { 0: '#ffffff', 50: '#f9f9f8', 100: '#f2f1ef', 200: '#e8e7e3', 300: '#d4d2cc' },
        dark:    { 0: '#1a1a1a', 50: '#212121', 100: '#2a2a2a', 200: '#333333', 300: '#444444' },
        accent:  { DEFAULT: '#d97706', light: '#fbbf24', dark: '#b45309' },
        ink: { primary: '#111110', secondary: '#6b6b6b', tertiary: '#9d9b96', inverse: '#fafaf9' },
        'ink-dark': { primary: '#f0efec', secondary: '#a8a6a0', tertiary: '#6b6966' },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [typography],
};