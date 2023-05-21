/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/pages/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
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
        Alegreya: ['var(--font-alegreya)'],
        KleeOne: ['var(--font-KleeOne)'],
        Mailform: ['var(--font-alegreya)', 'var(--font-KleeOne)'],
      },
      colors: {
        susutake: '#6b5146',
        suou: { DEFAULT: '#9e3d3e', dark: '#5a2323' },
      },
      spacing: {
        15: '3.75rem',
      },
      dropShadow: {
        urSusutake: '10px 10px 0px rgba(107, 81, 70, 0.5)',
        uSusutake: '0px 5px 0px rgba(107, 81, 70, 0.5)',
      },
      backgroundImage: {
        'sakura-pattern': "url('/images/japaper.svg')",
      },
      listStyleType: {
        none: 'none',
        disc: 'disc',
        circle: 'circle',
      },
    },
  },
  plugins: [],
}
