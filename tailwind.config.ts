import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        night: '#090D0E',
        'night-light': '#141A1B',
        anthracite: '#2A3031',
        'warm-ivory': '#F3F0E9',
        'stone-warm': '#DDD7CD',
        paper: '#FBFAF7',
        sand: '#C9B991',
        'mediterranean': '#315F67',
        'mediterranean-light': '#76A0A5',
        'logo-yellow': '#F2C94C',
        'logo-green': '#4CAF50',
        'logo-orange': '#FF7F2A',
        'logo-magenta': '#C81A69',
        'logo-blue': '#1976D2',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tighter2: '-0.055em',
      },
      boxShadow: {
        float: '0 20px 70px rgba(9, 13, 14, 0.14)',
        soft: '0 12px 45px rgba(9, 13, 14, 0.08)',
      },
      screens: {
        xs: '320px',
      },
    },
  },
  plugins: [],
};

export default config;
