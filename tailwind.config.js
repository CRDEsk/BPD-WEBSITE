/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette BPD – institutionnelle, profonde, neutre
        'bpd-red': '#4A1414', // Deep institutional red
        'bpd-red-soft': '#6A1F1F', // Secondary red
        'bpd-ink': '#111111', // Dark ink
        'bpd-paper': '#F8F6F3', // Paper background
        'bpd-grey': '#6F6F6F', // Grey ink
        // Legacy support
        'bpd-gray': '#111111',
        'bpd-light': '#F8F6F3',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'bpd-wide': '0.06em',
        'bpd-medium': '0.03em',
      },
    },
  },
  plugins: [],
}

