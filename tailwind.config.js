/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/pages/*.{js,ts,jsx,tsx,mdx}',
    './src/components/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1600px',
      },
      fontFamily: {
        ZenKrenaido: ['var(--font-ZenKrenaido)'],
        Cinzel: ['var(--font-cinzel)'],
        Murecho: ['var(--font-Murecho)'],
      },
      colors: {
        susutake: '#6b5146',
      },
      width: {
        200: '200rem',
      },
      dropShadow: {
        urSusutake: '10px 10px 0px rgba(107, 81, 70, 0.5)',
        uSusutake: '0px 5px 0px rgba(107, 81, 70, 0.5)',
      },
      backgroundImage: {
        'sakura-pattern': "url('../img/japaper.svg')",
      },
    },
  },
  plugins: [],
}
